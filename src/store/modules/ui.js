/* eslint no-shadow: 0 */
/* eslint function-paren-newline: 0 */
/* eslint object-curly-newline: 0 */

import { SHOW_ERROR, HIDE_ERROR } from '../actions/ui';

const state = {
  errorMessage: '',
};

const getters = {
  errorMessage: (state) => state.errorMessage,
};

const actions = {
  [SHOW_ERROR]: ({ commit }, message) => {
    commit(SHOW_ERROR, message);
    setTimeout(() => {
      commit(HIDE_ERROR);
    }, 3000);
  },
};

const mutations = {
  [SHOW_ERROR]: (state, message) => {
    state.errorMessage = message;
  },
  [HIDE_ERROR]: (state) => {
    state.errorMessage = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
