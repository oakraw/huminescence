<template>
  <v-app>
    <router-view></router-view>
    <v-alert
      :value="errorMessage"
      type="error"
      class="ma-0"
      persistent
      style="z-index:1000; position: fixed; width: 100vw;"
    >
      {{errorMessage}}
    </v-alert>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import { FIND_BRIDGE } from './store/actions/bridge';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['errorMessage']),
  },
  data() {
    return {
      snackbar: false,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      await this.$store.dispatch(FIND_BRIDGE);
    },
  },
};
</script>
