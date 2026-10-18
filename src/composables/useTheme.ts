import { ref, watch } from 'vue';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'app-theme';

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

const theme = ref<Theme>(getInitialTheme());

watch(theme, (newTheme) => {
  localStorage.setItem(STORAGE_KEY, newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
}, { immediate: true });

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
  };

  return {
    theme,
    toggleTheme,
    setTheme
  };
}