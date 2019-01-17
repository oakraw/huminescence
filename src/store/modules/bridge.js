/* eslint no-shadow: 0 */
/* eslint function-paren-newline: 0 */
/* eslint object-curly-newline: 0 */

import { FIND_BRIDGE, BRIDGE_FOUND, PAIR_BRIDGE, SET_IP, PAIR_BRIDGE_SUCCESS } from '../actions/bridge';
import { ApiService, BridgeService } from '../../common/api';

const BRIDGE_ID = 'BRIDGE_ID';

const state = {
  bridgeId: localStorage.getItem(BRIDGE_ID) || null,
  bridgeIP: null,
  finding: false,
};

const getters = {
  finding: (state) => state.finding,
  bridgeId: (state) => state.bridgeId,
  bridgeIP: (state) => state.bridgeIP,
};

const saveLocalStorage = (bridgeId) => {
  localStorage.setItem(BRIDGE_ID, bridgeId);
};

const actions = {
  [FIND_BRIDGE]: ({ dispatch, commit }) => {
    commit(FIND_BRIDGE);
    BridgeService.findBridge().then((availableBridges) => {
      if (availableBridges.length > 0) {
        const ip = availableBridges[0].internalipaddress;
        dispatch(SET_IP, ip);
        commit(BRIDGE_FOUND, availableBridges[0].internalipaddress);
      }
    });
  },
  [PAIR_BRIDGE]: ({ commit }) =>
    new Promise((resolve, reject) =>
      BridgeService.getBridgeId()
        .then((resp) => {
          if (resp.length > 0) {
            const bridgeId = resp[0].success.username;
            saveLocalStorage(bridgeId);
            commit(PAIR_BRIDGE_SUCCESS, bridgeId);
          }
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        }),
    ),
  [SET_IP]: (_, ip) => {
    ApiService.setEndpoint(`http://${ip}/api/`);
  },
};

const mutations = {
  [FIND_BRIDGE]: (state) => {
    state.finding = true;
  },
  [BRIDGE_FOUND]: (state, bridgeIP) => {
    state.finding = false;
    state.bridgeIP = bridgeIP;
  },
  [PAIR_BRIDGE_SUCCESS]: (state, bridgeId) => {
    state.bridgeId = bridgeId;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
