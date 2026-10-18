export interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';
  temperature?: number;
  humidity?: number;
  power?: number;
  settings?: DeviceSettings;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceSettings {
  minTemperature?: number;
  maxTemperature?: number;
  autoMode?: boolean;
  schedule?: DeviceSchedule;
}

export interface DeviceSchedule {
  enabled: boolean;
  startTime: string;
  endTime: string;
  days: number[];
}

export interface DeviceCommand {
  command: string;
  payload?: any;
}