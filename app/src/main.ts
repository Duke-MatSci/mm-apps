import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/styles/theme.scss';
import './registerServiceWorker';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).mount('#app');
