<template>
  <v-container fill-height>
    <v-layout
      fill-height
      align-center
      justify-center
    >
      <v-layout
        row
        wrap
      >
        <v-flex xs4>
          <v-card @click="launchCamera" ripple>
            <v-img
              src="https://www.techlicious.com/images/av/family-watching-movie-700px.jpg"
              aspect-ratio="1"
            ></v-img>

            <v-card-title>
              <span class="title">Movie Experience</span>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import address from '../router/address';

export default {
  created() {
    if (this.$store.getters.bridgeId === null) {
      this.$router.push({ name: 'register' });
    }
  },
  methods: {
    launchCamera() {
      this.$router.push({ name: address.CAMERA });
    },
  },
};
</script>

<style>
</style>
