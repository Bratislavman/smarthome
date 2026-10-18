import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

export function useAuth() {
  const store = useAuthStore();
  
  const isAuthenticated = computed(() => store.isAuthenticated);
  const user = computed(() => store.user);
  const loading = computed(() => store.loading);

  const login = async (email: string, password: string) => {
    await store.login(email, password);
  };

  const logout = async () => {
    await store.logout();
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };
}