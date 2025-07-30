import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import VueMaterial from './vue-materials';
import './vue-materials/base/index.scss';
import './vue-materials/theme/default.css';
import './vue-materials/theme/all.scss';
import './registerServiceWorker';
import router from './router';
import store from './store';
import apolloClient from './modules/gql/apolloClient';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(VueMaterial);
app.use(store);
app.use(router);
app.mount('#app');
