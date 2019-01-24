import Color from 'color';
import { CHANGE_DEVICES_COLOR, GET_DEVICES } from '../store/actions/control';

/* eslint no-restricted-properties: 0 */
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
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      await this.$store.dispatch(GET_DEVICES);
    },
    async command(pickedColor) {
      const rgb = Color.rgb(pickedColor).color;
      const luminosity = Color.rgb(pickedColor).luminosity();
      const xy = RGBtoXY(rgb[0], rgb[1], rgb[2]);
      if (Math.abs(previousXY[0] - xy[0]) > 0.005 || Math.abs(previousXY[1] - xy[1]) > 0.005) {
        previousXY = xy;
        this.$store.dispatch(CHANGE_DEVICES_COLOR, {
          on: true,
          bri: Math.round(luminosity * 254),
          xy,
        });
      }
    },
  },
};
