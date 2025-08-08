import { App } from 'vue';
import MdEmptyState from './MdEmptyState.vue';

export default (app: App) => {
  app.component(MdEmptyState.name || 'MdEmptyState', MdEmptyState);
};

export { MdEmptyState };
