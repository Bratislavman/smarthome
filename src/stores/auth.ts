import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { AuthResponse, User } from "@/types/user";
import { api, setAuthToken } from "@/services/api";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("auth_token"));
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      const { user: userData, token: tokenData } = response.data;
      user.value = userData;
      token.value = tokenData;
      localStorage.setItem("auth_token", tokenData);
      setAuthToken(tokenData);
    } catch (err) {
      error.value = "Invalid credentials";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      user.value = null;
      token.value = null;
      localStorage.removeItem("auth_token");
      setAuthToken(null);
    }
  };

  const fetchUser = async () => {
    if (!token.value) return;

    try {
      const response = await api.get<User>("/auth/me");
      user.value = response.data;
    } catch (err) {
      console.error("Failed to fetch user:", err);
      await logout();
    }
  };

  if (token.value) {
    fetchUser();
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    fetchUser,
  };
});
