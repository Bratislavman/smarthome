import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/*",
      meta: { requiresAuth: true },
      children: [
        {
          path: "/",
          name: "dashboard",
          component: () => import("@/views/DashboardView.vue"),
        },
        {
          path: "/devices",
          name: "devices",
          component: () => import("@/views/DevicesView.vue"),
        },
        {
          path: "/devices/:id",
          name: "device-details",
          component: () => import("@/features/devices/DeviceDetails.vue"),
        },
        {
          path: "/analytics",
          name: "analytics",
          component: () => import("@/views/AnalyticsView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: { guestOnly: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  if (authStore.token && !authStore.user) {
    await authStore.fetchUser();
  }
  
  const isAuthenticated = authStore.isAuthenticated;
  

  if (to.meta.guestOnly && isAuthenticated) {
    return next({ name: 'dashboard' });
  }
  

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });
  }
  
  next();
});

export default router;
