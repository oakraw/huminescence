<template>
  <v-layout fill-height :style="{ background: pickedColor }" row wrap>
    <v-flex xs12>
      <div class="demo-frame">
        <div class="demo-container">
          <video id="video" width="100%" height="450" autoplay controls>
              <source :src="require('../assets/sample_video.mp4')" type="video/mp4">
          </video>
          <canvas id="canvas" width="600" height="400" style="display: none;"></canvas>
        </div>
      </div>
    </v-flex>
    <v-flex xs12 d-flex>
      <v-btn color="primary" @click="init" large>Start</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint no-restricted-properties: 0 */
/* eslint prefer-destructuring: 0 */

import Color from 'color';
import ColorThief from '../lib/color-thief';
import controlLight from '../mixins/controlLight';

let video = null;
let canvas = null;
let context = null;

let timeInterval = 0;

export default {
  mixins: [controlLight],
  data() {
    return {
      pickedColor: '',
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      video = document.querySelector('video');
      canvas = document.getElementById('canvas');
      context = canvas.getContext('2d');

      video.addEventListener('timeupdate', this.frameProcess);
    },
    frameProcess() {
      timeInterval += 1;
      if (timeInterval % 5 === 0) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const colorThief = new ColorThief();
        const rgb = colorThief.getColor(canvas);
        this.pickedColor = Color.rgb(rgb);
        this.command(this.pickedColor);
      }
    },
  },
};
</script>

<style>
</style>
