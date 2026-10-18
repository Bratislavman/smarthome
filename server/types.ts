export interface User {
  id: string;
  email: string;
  password: string; // В реальном проекте хешируем!
  name: string;
  role: 'admin' | 'user';
}

export interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';
  temperature?: number;
  humidity?: number;
  power?: number;
}