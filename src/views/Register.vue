<template>
  <v-container fill-height>
    <v-layout
      fill-height
      align-center
      justify-center
    >
      <div v-if="bridgeIP">
        <v-btn
          color="primary"
          large
          dark
          @click="pairBridge"
        >
          กด Bridge แล้ว
        </v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { FIND_BRIDGE, PAIR_BRIDGE } from '../store/actions/bridge';

export default {
  computed: {
    ...mapGetters(['bridgeIP']),
  },
  created() {
    this.$store.dispatch(FIND_BRIDGE);
  },
  methods: {
    pairBridge() {
      this.$store.dispatch(PAIR_BRIDGE);
    },
  },
};
</script>
