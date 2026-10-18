// src/composables/useSocket.ts
import { ref, onMounted, onUnmounted } from 'vue';
import { io, Socket } from 'socket.io-client';

export function useSocket(deviceId: string, onMessage: (data: any) => void) {
  const socket = ref<Socket | null>(null);
  const isConnected = ref(false);

  onMounted(() => {
    // Подключаемся к серверу. В режиме dev указываем прямой URL, чтобы избежать проблем с прокси
    const url = import.meta.env.DEV 
      ? 'http://localhost:3000' 
      : import.meta.env.VITE_API_URL;

    socket.value = io(url, {
      transports: ['websocket', 'polling'], // Сначала пробуем WebSocket, потом fallback
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socket.value.on('connect', () => {
      isConnected.value = true;
      console.log('Socket.IO connected');
      
      // Сразу подписываемся на устройство после подключения
      socket.value?.emit('subscribe', deviceId);
    });

    socket.value.on('disconnect', () => {
      isConnected.value = false;
      console.log('Socket.IO disconnected');
    });

    // Слушаем конкретное событие
    socket.value.on('temperature', (data) => {
      onMessage(data);
    });

    socket.value.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err.message);
    });
  });

  onUnmounted(() => {
    if (socket.value) {
      socket.value.disconnect();
      console.log('Socket.IO manually disconnected');
    }
  });

  return { isConnected };
}