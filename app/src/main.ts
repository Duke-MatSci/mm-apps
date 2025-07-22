import { createApp } from 'vue';
import App from './App.vue';
import VueMaterial from './vue-materials';
import '@/vue-materials/css/vue-material.min.css';
import '@/vue-materials/css/default.css';
import './registerServiceWorker';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(VueMaterial);
app.use(store);
app.use(router);
app.mount('#app');
