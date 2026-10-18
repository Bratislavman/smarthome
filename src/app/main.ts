import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@/assets/styles/main.css';
import VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VueVirtualScroller);

app.mount('#app');