<template>
  <v-layout
    fill-height
    :style="{ background: pickedColor }"
  >
    <div class="demo-frame">
      <div class="demo-container">
        <video
          id="video"
          width="600"
          height="450"
          preload
          autoplay
          loop
          muted
          controls
        ></video>
        <canvas
          id="canvas"
          width="600"
          height="400"
          style="display: none;"
        ></canvas>
      </div>
    </div>
  </v-layout>
</template>

<script>
/* eslint no-restricted-properties: 0 */
import Color from 'color';
import ColorThief from '../lib/color-thief';
import { SHOW_ERROR } from '../store/actions/ui';
import { GET_DEVICES, CHANGE_DEVICES_COLOR } from '../store/actions/control';

let video = null;
let canvas = null;
let context = null;

let previousHue = -9999;

export default {
  data() {
    return {
      pickedColor: '',
    };
  },
  created() {
    this.fetch();
  },
  mounted() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          video.srcObject = stream;
          video.addEventListener('timeupdate', this.frameProcess);
          video.play();
        });
    } else {
      this.$store.dispatch(SHOW_ERROR, 'Camera not support');
    }
  },
  methods: {
    async fetch() {
      await this.$store.dispatch(GET_DEVICES);
    },
    frameProcess() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const colorThief = new ColorThief();
      const rgb = colorThief.getColor(canvas);
      this.pickedColor = Color.rgb(rgb);
      this.command();
    },
    async command() {
      const hsl = Color.rgb(this.pickedColor).hsl();
      const hue = hsl.color[0] * 182;
      const sat = hsl.color[1] * 255 / 100;

      if (Math.abs(hue - previousHue) > 2000) {
        previousHue = hue;
        console.log(hue);
        this.$store.dispatch(CHANGE_DEVICES_COLOR, {
          on: true,
          sat: 254,
          bri: 254,
          hue,
        });
      }
    },
  },
};
</script>

<style>
</style>
