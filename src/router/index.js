import Vue from 'vue';
import Router from 'vue-router';
import Register from '../views/Register';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});
