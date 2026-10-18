import { User, Device } from '../types';

export const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'password123', // Plaintext for demo only!
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'password123',
    name: 'Regular User',
    role: 'user'
  }
];

export const devices: Device[] = [
  {
    id: 'dev-1',
    name: 'Living Room Thermostat',
    type: 'Thermostat',
    status: 'online',
    temperature: 22.5,
    humidity: 45
  },
  {
    id: 'dev-2',
    name: 'Kitchen Smart Plug',
    type: 'Smart Plug',
    status: 'online',
    power: 120.5
  },
  {
    id: 'dev-3',
    name: 'Bedroom Light',
    type: 'Light',
    status: 'offline'
  },
  {
    id: 'dev-4',
    name: 'Garden Sensor',
    type: 'Sensor',
    status: 'warning',
    temperature: 18.2,
    humidity: 60
  }
];

for (let i = 5; i <= 1000; i++) {
  devices.push({
    id: `dev-${i}`,
    name: `Device ${i}`,
    type: 'Sensor',
    status: i % 3 === 0 ? 'offline' : 'online',
    temperature: 20 + Math.random() * 5
  });
}