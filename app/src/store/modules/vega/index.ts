import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state(): any {
    return {
      // Vega state will be defined here
    };
  },
  mutations,
  actions,
  getters,
};
