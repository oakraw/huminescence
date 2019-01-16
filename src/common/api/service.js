/* eslint no-underscore-dangle: 0 */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { REGISTER_URL } from './config';

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
  },
  findIP() {
    Vue.axios.defaults.baseURL = REGISTER_URL;
  },
  setEndpoint(endpoint) {
    Vue.axios.defaults.baseURL = endpoint;
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
};

export default ApiService;
