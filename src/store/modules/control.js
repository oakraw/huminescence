/* eslint no-shadow: 0 */
/* eslint function-paren-newline: 0 */
/* eslint object-curly-newline: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint guard-for-in: 0 */

import { GET_DEVICES, GET_DEVICES_SUCCESS, CHANGE_DEVICES_COLOR } from '../actions/control';
import { ControlService } from '../../common/api';
import controlStore from './bridge';

const state = {
  devices: [],
};

const getters = {
  devices: (state) => state.devices,
};

const bridgeId = () => controlStore.state.bridgeId;

const actions = {
  [GET_DEVICES]: ({ commit }) => {
    commit(GET_DEVICES);
    return new Promise((resolve) => {
      ControlService.getDevices(bridgeId()).then((devices) => {
        commit(GET_DEVICES_SUCCESS, devices);
        resolve(devices);
      });
    });
  },
  [CHANGE_DEVICES_COLOR]: async ({ dispatch }, payload) => {
    if (state.devices.length === 0) {
      await dispatch(GET_DEVICES);
    }

    const promises = [];
    for (const deviceId in state.devices) {
      promises.push(
        new Promise((resolve) => {
          ControlService.commandLight(bridgeId(), deviceId, payload).then((devices) => {
            resolve(devices);
          });
        }),
      );
    }

    return Promise.all(promises);
  },
};

const mutations = {
  [GET_DEVICES]: () => {},
  [GET_DEVICES_SUCCESS]: (state, devices) => {
    state.devices = devices;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
