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
import Color from 'color';
import ColorThief from '../lib/color-thief';

let video = null;
let canvas = null;
let context = null;

export default {
  data() {
    return {
      pickedColor: '',
    };
  },
  mounted() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.addEventListener('timeupdate', this.frameProcess);
      });
    }
  },
  methods: {
    frameProcess() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const colorThief = new ColorThief();
      const rgb = colorThief.getColor(canvas);
      this.pickedColor = Color.rgb(rgb);
    },
  },
};
</script>

<style>
</style>
