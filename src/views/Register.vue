<template>
  <v-container fill-height>
    <v-layout
      fill-height
      align-center
      justify-center
    >
      <v-layout
        v-if="bridgeIP"
        align-center
        column
      >
        <span class="title mb-3">Press the button on Philips Bridge.</span>
        <v-btn
          v-if="!bridgePairing"
          color="primary"
          large
          dark
          @click="pairBridge"
        >
          I already pressed it
        </v-btn>
        <v-progress-circular
          v-else
          indeterminate
          color="primary"
          class="text-sm-center"
        />
        <span v-if="error" class="error--text mt-3">{{error}}</span>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { PAIR_BRIDGE } from '../store/actions/bridge';
import address from '../router/address';

export default {
  computed: {
    ...mapGetters(['bridgeIP', 'bridgePairing']),
  },
  data() {
    return {
      error: null,
    };
  },
  created() {},
  methods: {
    async pairBridge() {
      try {
        const success = await this.$store.dispatch(PAIR_BRIDGE);
        if (success) {
          this.$router.push({ name: address.HOME });
        }
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>
