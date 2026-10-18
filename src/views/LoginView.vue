<script setup lang="ts">
import LoginForm from '@/features/auth/LoginForm.vue';
</script>

<template>
  <div class="login-view">
    <LoginForm />
  </div>
</template>

<style scoped>
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 2rem;
}
</style>