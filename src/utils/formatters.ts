export const formatTemperature = (value: number): string => {
  return `${value.toFixed(1)}°C`;
};

export const formatHumidity = (value: number): string => {
  return `${value.toFixed(0)}%`;
};

export const formatPower = (value: number): string => {
  return `${value.toFixed(2)} W`;
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (date: string | Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};