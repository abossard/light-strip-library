import { LightStripDetails, Bend, LEDColor, ColorSetup, defaultColorSetup } from './types';

export class LightStrip {
  length: number;
  numLEDs: number;
  addressableLEDs: number;
  bends: Bend[];
  ledColors: LEDColor[];
  colorSetup: ColorSetup;

  constructor(length: number, numLEDs: number, addressableLEDs: number, colorSetup: ColorSetup = defaultColorSetup) {
    this.length = length;
    this.numLEDs = numLEDs;
    this.addressableLEDs = addressableLEDs;
    this.bends = [];
    this.ledColors = Array(numLEDs).fill("#000000");
    this.colorSetup = colorSetup;
  }

  addBend(length: number, angle: number) {
    this.bends.push({ length, angle });
  }

  setLEDColor(index: number, color: string) {
    if (index >= 0 && index < this.numLEDs) {
      this.ledColors[index] = this.mixColors(color);
      console.debug(`LED ${index} color set to ${this.ledColors[index]}`);
    }
  }

  mixColors(color: string): string {
    const colorChannels = this.colorSetup.channels;
    const colorValues = color.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];
    const mixedColor = colorChannels.map((channel, index) => {
      return Math.min(255, Math.floor(channel.value * colorValues[index] / 255));
    });
    return `#${mixedColor.map((value) => value.toString(16).padStart(2, '0')).join('')}`;
  }

  draw() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    let currentX = 0;
    let currentY = 0;
    let currentAngle = 0;

    for (let i = 0; i < this.numLEDs; i++) {
      const led = document.createElementNS(svgNS, "circle");
      led.setAttribute("cx", currentX.toString());
      led.setAttribute("cy", currentY.toString());
      led.setAttribute("r", "5");
      led.setAttribute("fill", this.ledColors[i]);
      led.setAttribute("filter", "url(#glow)");

      svg.appendChild(led);

      currentX += Math.cos((currentAngle * Math.PI) / 180) * (this.length / this.numLEDs);
      currentY += Math.sin((currentAngle * Math.PI) / 180) * (this.length / this.numLEDs);

      if (this.bends.length > 0 && i === Math.floor(this.numLEDs / this.bends.length)) {
        const bend = this.bends.shift();
        if (bend) {
          currentAngle += bend.angle;
        }
      }
    }

    const defs = document.createElementNS(svgNS, "defs");
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", "glow");
    const feGaussianBlur = document.createElementNS(svgNS, "feGaussianBlur");
    feGaussianBlur.setAttribute("stdDeviation", "2.5");
    feGaussianBlur.setAttribute("result", "coloredBlur");
    filter.appendChild(feGaussianBlur);
    const feMerge = document.createElementNS(svgNS, "feMerge");
    const feMergeNode1 = document.createElementNS(svgNS, "feMergeNode");
    feMergeNode1.setAttribute("in", "coloredBlur");
    const feMergeNode2 = document.createElementNS(svgNS, "feMergeNode");
    feMergeNode2.setAttribute("in", "SourceGraphic");
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    console.debug("Light strip drawn");

    return svg;
  }
}
