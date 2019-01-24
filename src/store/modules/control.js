/* eslint no-shadow: 0 */
/* eslint function-paren-newline: 0 */
/* eslint object-curly-newline: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint guard-for-in: 0 */

import { GET_DEVICES, GET_DEVICES_SUCCESS, GET_GROUP, GET_GROUP_SUCCESS, CHANGE_DEVICES_COLOR, CHANGE_GROUP_COLOR } from '../actions/control';
import { ControlService } from '../../common/api';
import controlStore from './bridge';

const state = {
  devices: {},
  group: {},
};

const getters = {
  devices: (state) => state.devices,
  group: (state) => state.group,
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
  [GET_GROUP]: ({ commit }) => {
    commit(GET_GROUP);
    return new Promise((resolve) => {
      ControlService.getGroup(bridgeId()).then((group) => {
        console.log(group);
        commit(GET_GROUP_SUCCESS, group);
        resolve(group);
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
  [CHANGE_GROUP_COLOR]: async ({ dispatch }, payload) => {
    if (state.group.length === 0) {
      await dispatch(GET_GROUP);
    }

    const promises = [];
    for (const groupId in state.group) {
      promises.push(
        new Promise((resolve) => {
          ControlService.commandGroup(bridgeId(), groupId, payload).then((group) => {
            resolve(group);
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
  [GET_GROUP]: () => {},
  [GET_GROUP_SUCCESS]: (state, group) => {
    state.group = group;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
