import { api } from './api';
import type { Device } from '@/types/device';

export const deviceService = {
  async getDevices() {
    return api.get<Device[]>('/devices');
  },

  async getDevice(id: string): Promise<Device> {
    return api.get<Device>(`/devices/${id}`);
  },

  async createDevice(data: Partial<Device>): Promise<Device> {
    return api.post<Device>('/devices', data);
  },

  async updateDevice(id: string, data: Partial<Device>): Promise<Device> {
    return api.put<Device>(`/devices/${id}`, data);
  },

  async deleteDevice(id: string): Promise<void> {
    return api.delete(`/devices/${id}`);
  },

  async getAnalytics(period: 'day' | 'week' | 'month') {
    return api.get('/devices/analytics', { period });
  },

  async controlDevice(id: string, command: string, payload?: any) {
    return api.post(`/devices/${id}/control`, { command, payload });
  }
};