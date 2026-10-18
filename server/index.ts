import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io'; // <-- Импортируем Socket.IO
import authRoutes from './routes/auth';
import deviceRoutes from './routes/devices';
import { devices } from './data/mockData';

const app = express();
const PORT = process.env.PORT || 3000;


//////////
app.use(cors({
  origin: 'http://localhost:5173', // Разрешаем запросы с Vite
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

//////////////////////
// --- SOCKET.IO SETUP ---
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Клиент подписывается на конкретное устройство
  socket.on('subscribe', (deviceId: string) => {
    socket.join(deviceId); // Добавляем сокет в "комнату" с ID устройства
    console.log(`Socket ${socket.id} subscribed to room: ${deviceId}`);
  });

  // Эмуляция данных каждые 2 секунды
  const interval = setInterval(() => {
    devices.forEach(device => {
      if (device.temperature !== undefined) {
        const change = (Math.random() - 0.5) * 0.5;
        const newTemp = Number((device.temperature + change).toFixed(1));
        device.temperature = newTemp;

        // Отправляем данные ТОЛЬКО тем, кто подписан на это устройство
        io.to(device.id).emit('temperature', {
          type: 'temperature',
          deviceId: device.id,
          value: newTemp,
          timestamp: new Date().toISOString()
        });
      }
    });
  }, 2000);

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Запускаем сервер
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🔌 Socket.IO is ready`);
});