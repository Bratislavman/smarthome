export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidTemperature = (temp: number): boolean => {
  return temp >= -50 && temp <= 100;
};

export const isValidHumidity = (humidity: number): boolean => {
  return humidity >= 0 && humidity <= 100;
};

export const isValidPower = (power: number): boolean => {
  return power >= 0;
};