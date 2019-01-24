import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import Register from '../views/Register';
import Camera from '../views/Camera';
import Player from '../views/Player';
import address from './address';
import { bridgeRequired } from './guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: address.HOME,
      component: Home,
      beforeEnter: bridgeRequired,
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
      beforeEnter: bridgeRequired,
    },
    {
      path: '/player',
      name: address.PLAYER,
      component: Player,
      beforeEnter: bridgeRequired,
    },
  ],
});
