<template>
  <v-layout
    fill-height
    :style="{ background: pickedColor }"
    row
    wrap
  >
    <v-flex xs12>
      <div class="demo-frame">
        <div class="demo-container">
          <video
            id="video"
            width="100%"
            height="450"
            autoplay
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
    </v-flex>
    <v-flex
      xs12
      pa-4
    >
      <v-select
        v-model="selectedCamera"
        v-if="cameras.length > 0"
        :items="cameras"
        item-text="name"
        label="Camera"
        box
      ></v-select>
    </v-flex>
    <v-flex
      xs12
      d-flex
    >
      <v-btn
        color="primary"
        @click="init"
        large
      >
        Start
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint no-restricted-properties: 0 */
/* eslint prefer-destructuring: 0 */

import Color from 'color';
import ColorThief from '../lib/color-thief';
import { SHOW_ERROR } from '../store/actions/ui';
import controlLight from '../mixins/controlLight';

let video = null;
let canvas = null;
let context = null;

let timeInterval = 0;

export default {
  mixins: [controlLight],
  data() {
    return {
      currentStream: null,
      selectedCamera: null,
      cameras: [],
      pickedColor: '',
    };
  },
  created() {
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      mediaDevices.forEach((device) => {
        const mediaDevice = device;
        if (mediaDevice.kind === 'videoinput') {
          this.cameras.push(mediaDevice);
        }
      });

      this.cameras.forEach((mediaDevice, index) => {
        const camera = mediaDevice;
        camera.name = camera.label || `camera ${index + 1}`;
      });
      if (this.cameras.length > 0) {
        this.selectedCamera = this.cameras[0];
      }

      console.log(this.cameras);
    });
  },
  methods: {
    async init() {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      context = canvas.getContext('2d');

      this.stopMediaTracks();

      const videoConstraints = {};
      if (this.selectedCamera.deviceId === '') {
        videoConstraints.facingMode = 'environment';
      } else {
        videoConstraints.deviceId = { exact: this.selectedCamera.deviceId };
      }
      const constraints = {
        video: videoConstraints,
        audio: false,
      };

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          this.currentStream = stream;
          video.srcObject = stream;
          video.addEventListener('timeupdate', this.frameProcess);
          video.play();
        });
      } else {
        this.$store.dispatch(SHOW_ERROR, 'Camera not support');
      }
    },
    stopMediaTracks() {
      if (this.currentStream) {
        this.currentStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
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
