import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import Register from '../views/Register';
import Camera from '../views/Camera';
import address from './address';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: address.HOME,
      component: Home,
    },
    {
      path: '/register',
      name: address.REGISTER,
      component: Register,
    },
    {
      path: '/movie',
      name: address.CAMERA,
      component: Camera,
    },
  ],
});
