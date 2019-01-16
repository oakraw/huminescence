import Vue from 'vue';
import Vuex from 'vuex';
import bridge from './modules/bridge';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    bridge,
  },
  strict: debug,
});
