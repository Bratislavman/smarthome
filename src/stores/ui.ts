import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
  const sidebarOpen = ref(true);
  const notifications = ref<Array<{ id: string; message: string; type: 'info' | 'success' | 'error' }>>([]);

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };

  const addNotification = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const id = Date.now().toString();
    notifications.value.push({ id, message, type });
    
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  };

  return {
    sidebarOpen,
    notifications,
    toggleSidebar,
    addNotification,
    removeNotification
  };
});