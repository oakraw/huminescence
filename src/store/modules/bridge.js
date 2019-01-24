/* eslint no-shadow: 0 */
/* eslint function-paren-newline: 0 */
/* eslint object-curly-newline: 0 */

import {
  FIND_BRIDGE,
  BRIDGE_FOUND,
  PAIR_BRIDGE,
  GET_IP,
  CLEAR_BRIDGE,
  PAIRING_BRIDGE,
  PAIR_BRIDGE_SUCCESS,
  PAIR_BRIDGE_ERROR,
} from '../actions/bridge';
import { ApiService, BridgeService } from '../../common/api';

const BRIDGE_ID = 'BRIDGE_ID';

const state = {
  bridgeId: localStorage.getItem(BRIDGE_ID) || null,
  pairing: false,
  bridgeIP: null,
  finding: false,
};

const getters = {
  finding: (state) => state.finding,
  bridgeId: (state) => state.bridgeId,
  bridgeIP: (state) => state.bridgeIP,
  bridgePairing: (state) => state.pairing,
};

const saveLocalStorage = (bridgeId) => {
  localStorage.setItem(BRIDGE_ID, bridgeId);
};

const actions = {
  [FIND_BRIDGE]: ({ commit }) => {
    commit(FIND_BRIDGE);
    return new Promise(async (resolve, reject) => {
      try {
        const availableBridges = await BridgeService.findBridge();
        if (availableBridges.length > 0) {
          const ip = availableBridges[0].internalipaddress;
          ApiService.setIPEndpoint(ip);
          commit(BRIDGE_FOUND, ip);
          resolve(ip);
        } else {
          reject();
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  [PAIR_BRIDGE]: ({ commit }) => {
    commit(PAIRING_BRIDGE);
    return new Promise((resolve, reject) =>
      BridgeService.getBridgeId()
        .then((resp) => {
          if (resp.length > 0) {
            const bridgeResp = resp[0];
            if (bridgeResp.success) {
              const bridgeId = bridgeResp.success.username;
              saveLocalStorage(bridgeId);
              commit(PAIR_BRIDGE_SUCCESS, bridgeId);
            } else {
              commit(PAIR_BRIDGE_ERROR);
              reject(bridgeResp.error.description);
            }
          }
          resolve(resp);
        })
        .catch((error) => {
          commit(PAIR_BRIDGE_ERROR);
          reject(error);
        }),
    );
  },
  [CLEAR_BRIDGE]: ({ commit }) => {
    commit(CLEAR_BRIDGE);
    saveLocalStorage(null);
  },
  [GET_IP]: ({ dispatch }) =>
    new Promise(async (resolve, reject) => {
      if (state.bridgeIP) {
        resolve(state.bridgeIP);
      } else {
        try {
          const ip = await dispatch(FIND_BRIDGE);
          resolve(ip);
        } catch (error) {
          reject(error);
        }
      }
    }),
};

const mutations = {
  [FIND_BRIDGE]: (state) => {
    state.finding = true;
  },
  [BRIDGE_FOUND]: (state, bridgeIP) => {
    state.finding = false;
    state.bridgeIP = bridgeIP;
  },
  [CLEAR_BRIDGE]: (state) => {
    state.bridgeId = null;
  },
  [PAIRING_BRIDGE]: (state) => {
    state.pairing = true;
  },
  [PAIR_BRIDGE_SUCCESS]: (state, bridgeId) => {
    state.pairing = false;
    state.bridgeId = bridgeId;
  },
  [PAIR_BRIDGE_ERROR]: (state) => {
    state.pairing = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
