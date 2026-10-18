<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: '',
  password: ''
});

const errors = reactive({
  email: '',
  password: ''
});

const loading = ref(false);

const validate = (): boolean => {
  let isValid = true;
  
  errors.email = '';
  errors.password = '';
  
  if (!form.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Invalid email format';
    isValid = false;
  }
  
  if (!form.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validate()) return;
  
  loading.value = true;
  
  try {
    await authStore.login(form.email, form.password);
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h2>Login</h2>
    
    <BaseInput
      v-model="form.email"
      label="Email"
      type="email"
      placeholder="Enter your email"
      :error="errors.email"
    />
    
    <BaseInput
      v-model="form.password"
      label="Password"
      type="password"
      placeholder="Enter your password"
      :error="errors.password"
    />
    
    <BaseButton
      type="submit"
      :loading="loading"
      class="submit-button"
    >
      Login
    </BaseButton>
    
    <p v-if="authStore.error" class="error-message">
      {{ authStore.error }}
    </p>
  </form>
</template>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.submit-button {
  width: 100%;
}

.error-message {
  color: var(--error-color);
  text-align: center;
  font-size: 0.875rem;
}
</style>