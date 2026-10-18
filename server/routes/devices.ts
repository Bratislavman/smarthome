import { Router, Request, Response } from 'express';
import { devices } from '../data/mockData';

const router = Router();

// GET /api/devices
router.get('/', (req: Request, res: Response) => {
  res.json(devices);
});

// GET /api/analytics
router.get('/analytics', (req: Request, res: Response) => {
  // Моковая аналитика
  res.json({
    temperature: [
      { time: '10:00', value: 21 },
      { time: '11:00', value: 22 },
      { time: '12:00', value: 23.5 },
      { time: '13:00', value: 22.8 },
      { time: '14:00', value: 21.5 }
    ],
    stats: {
      avgTemperature: 22.1,
      maxTemperature: 23.5,
      minTemperature: 21.0,
      totalEnergy: 145.2
    }
  });
});

// GET /api/devices/:id
router.get('/:id', (req: Request, res: Response) => {
  const device = devices.find(d => d.id === req.params.id);
  if (device) {
    res.json(device);
  } else {
    res.status(404).json({ message: 'Device not found1' });
  }
});

// PUT /api/devices/:id
router.put('/:id', (req: Request, res: Response) => {
  const deviceIndex = devices.findIndex(d => d.id === req.params.id);
  if (deviceIndex !== -1) {
    devices[deviceIndex] = { ...devices[deviceIndex], ...req.body };
    res.json(devices[deviceIndex]);
  } else {
    res.status(404).json({ message: 'Device not found0' });
  }
});



export default router;