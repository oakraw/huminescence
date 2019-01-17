<template>
  <v-container fill-height>
    <v-layout
      fill-height
      align-center
      justify-center
    >
      <v-layout v-if="bridgeIP" align-center column>
        <span class="title mb-3">Press the button on Philip Bridge.</span>
        <v-btn
          color="primary"
          large
          dark
          @click="pairBridge"
        >
          I already pressed it
        </v-btn>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { PAIR_BRIDGE } from '../store/actions/bridge';

export default {
  computed: {
    ...mapGetters(['bridgeIP']),
  },
  created() {
  },
  methods: {
    pairBridge() {
      this.$store.dispatch(PAIR_BRIDGE);
    },
  },
};
</script>
