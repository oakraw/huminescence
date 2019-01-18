import store from '../store';
import address from './address';

// export const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     next();
//   } else {
//     next('/admin/myorder');
//   }
// };

export const bridgeRequired = (to, from, next) => {
  if (store.getters.bridgeId) {
    next();
  } else {
    next({ name: address.REGISTER });
  }
};

export default {};
