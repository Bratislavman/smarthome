<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { useTheme } from "@/composables/useTheme";
import { useAuthStore } from "@/stores/auth"; // <-- Импортируем стор
import { computed } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const router = useRouter();

const { theme, toggleTheme } = useTheme();
const authStore = useAuthStore();

// Проверяем, авторизован ли пользователь
const isAuthenticated = computed(() => authStore.isAuthenticated);

const handleLogout = async () => {
  await authStore.logout();
  router.push("/");
};
</script>

<template>
  <div :class="['app', `theme-${theme}`]">
    <header class="app-header">
      <div class="header-left">
        <h1>Smart Home Dashboard</h1>
      </div>

      <div class="header-right">
        <BaseButton
          v-if="isAuthenticated"
          @click="handleLogout"
          class="submit-button"
        >
          Выход
        </BaseButton>

        <BaseButton @click="toggleTheme" class="theme-toggle">
          {{ theme === "light" ? "🌙" : "☀️" }}
        </BaseButton>
      </div>
    </header>

    <nav class="app-nav">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/devices">Devices</router-link>
      <router-link to="/analytics">Analytics</router-link>
    </nav>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
}

.app-nav {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background: var(--bg-secondary);
}

.app-nav a {
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.app-nav a:hover,
.app-nav a.router-link-active {
  background: var(--accent-color);
  color: white;
}

.app-main {
  flex: 1;
  padding: 2rem;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
