import Vue from 'vue';
import './plugins/vuetify';
import App from './App';
import router from './router';
import store from './store';
import ApiService from './common/api/service';


Vue.config.productionTip = false;

ApiService.init();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
