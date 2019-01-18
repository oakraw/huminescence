/* eslint no-underscore-dangle: 0 */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { REGISTER_URL } from './config';
import store from '../../store';
import { GET_IP } from '../../store/actions/bridge';

function setEndpoint(endpoint) {
  Vue.axios.defaults.baseURL = endpoint;
}

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.interceptors.request.use(this.interceptRequest, (error) => Promise.reject(error));
  },
  setEndpointForfindIP() {
    setEndpoint(REGISTER_URL);
  },
  get(resource, query) {
    return Vue.axios.get(resource, query);
  },
  post(resource, params, headers) {
    return Vue.axios.post(resource, params, headers);
  },
  patch(resource, params) {
    return Vue.axios.patch(`${resource}`, params);
  },
  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },
  delete(resource, params) {
    return Vue.axios.delete(`${resource}`, params);
  },
  async interceptRequest(config) {
    const newConfig = config;
    if (config.url && !config.url.includes(REGISTER_URL)) {
      try {
        const ip = await store.dispatch(GET_IP);
        newConfig.url = `http://${ip}/api/${newConfig.url}`;
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return newConfig;
  },
};

export default ApiService;
