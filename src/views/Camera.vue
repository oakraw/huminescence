<template>
  <v-layout
    fill-height
    :style="{ background: pickedColor }"
    column
  >
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
    <v-btn
      color="primary"
      @click="init"
    >
      Start
    </v-btn>
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

let timeInterval = 0;
let previousXY = [-999, -999];

function enhanceColor(normalized) {
  if (normalized > 0.04045) {
    return Math.pow((normalized + 0.055) / (1.0 + 0.055), 2.4);
  }
  return normalized / 12.92;
}

function RGBtoXY(r, g, b) {
  const rNorm = r / 255.0;
  const gNorm = g / 255.0;
  const bNorm = b / 255.0;

  const rFinal = enhanceColor(rNorm);
  const gFinal = enhanceColor(gNorm);
  const bFinal = enhanceColor(bNorm);

  const X = rFinal * 0.649926 + gFinal * 0.103455 + bFinal * 0.197109;
  const Y = rFinal * 0.234327 + gFinal * 0.743075 + bFinal * 0.022598;
  const Z = rFinal * 0.0 + gFinal * 0.053077 + bFinal * 1.035763;

  if (X + Y + Z === 0) {
    return [0, 0];
  }
  const xFinal = X / (X + Y + Z);
  const yFinal = Y / (X + Y + Z);

  return [xFinal, yFinal];
}

export default {
  data() {
    return {
      pickedColor: '',
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async init() {
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
    // handleSuccess(stream) {
    //   const videoTracks = stream.getVideoTracks();
    //   console.log('Got stream with constraints:', constraints);
    //   console.log(`Using video device: ${videoTracks[0].label}`);
    //   window.stream = stream; // make variable available to browser console
    //   video.srcObject = stream;
    // },
    // handleError(error) {
    //   if (error.name === 'ConstraintNotSatisfiedError') {
    //     const v = constraints.video;
    //     this.errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
    //   } else if (error.name === 'PermissionDeniedError') {
    //     this.errorMsg(
    //       'Permissions have not been granted to use your camera and microphone, you need to allow the page access to your devices in order for the demo to work.',
    //     );
    //   }
    //   this.errorMsg(`getUserMedia error: ${error.name}`, error);
    // },
    errorMsg(msg, error) {
      const errorElement = document.querySelector('#errorMsg');
      errorElement.innerHTML += `<p>${msg}</p>`;
      if (typeof error !== 'undefined') {
        console.error(error);
      }
    },
    async fetch() {
      await this.$store.dispatch(GET_DEVICES);
    },
    frameProcess() {
      timeInterval += 1;
      if (timeInterval % 5 === 0) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const colorThief = new ColorThief();
        const rgb = colorThief.getColor(canvas);
        this.pickedColor = Color.rgb(rgb);
        this.command();
      }
    },
    async command() {
      const rgb = Color.rgb(this.pickedColor).color;
      const xy = RGBtoXY(rgb[0], rgb[1], rgb[2]);
      if (Math.abs(previousXY[0] - xy[0]) > 0.005 || Math.abs(previousXY[1] - xy[1]) > 0.005) {
        previousXY = xy;
        console.log(xy);
        this.$store.dispatch(CHANGE_DEVICES_COLOR, {
          on: true,
          // sat: 254,
          bri: 254,
          xy,
        });
      }
      // console.log(
      //   Color.rgb(this.pickedColor)
      //     .hsl()
      //     .string(),
      // );
    },
  },
};
</script>

<style>
</style>
