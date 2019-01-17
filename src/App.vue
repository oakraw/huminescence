<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { FIND_BRIDGE } from './store/actions/bridge';

export default {
  name: 'App',
  data() {
    return {};
  },
  created() {
    this.$store.dispatch(FIND_BRIDGE);
  },
};
</script>
