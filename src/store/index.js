import Vue from 'vue';
import Vuex from 'vuex';
import bridge from './modules/bridge';
import control from './modules/control';
import ui from './modules/ui';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    bridge,
    control,
    ui,
  },
  strict: debug,
});
