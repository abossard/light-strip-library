import { Bend, LEDColor, ColorSetup, defaultParameters, preconfiguredLightPatterns } from './types';
import { Logger } from './logger';

export class LightStrip {
  length: number;
  numLEDs: number;
  addressableLEDs: number;
  bends: Bend[];
  ledColors: LEDColor[];
  colorSetup: ColorSetup;

  constructor(length: number = defaultParameters.length, numLEDs: number = defaultParameters.numLEDs, addressableLEDs: number = defaultParameters.addressableLEDs, colorSetup: ColorSetup = defaultParameters.colorSetup) {
    this.length = length!;
    this.numLEDs = numLEDs!;
    this.addressableLEDs = addressableLEDs!;
    this.bends = [];
    this.ledColors = Array(numLEDs).fill("#000000");
    this.colorSetup = colorSetup!;
  }

  addBend(length: number, angle: number) {
    this.bends.push({ length, angle });
  }

  setLEDColor(index: number, color: string) {
    if (index >= 0 && index < this.numLEDs) {
      this.ledColors[index] = this.mixColors(color);
      Logger.debug(`LED ${index} color set to ${this.ledColors[index]}`);
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
    svg.setAttribute("style", "background-color: black;");

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

    Logger.debug("Light strip drawn");

    return svg;
  }

  animateColorChange(index: number, targetColor: string, duration: number, easingFunction: (t: number) => number) {
    const startColor = this.ledColors[index];
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easingFunction(progress);

      const startColorValues = startColor.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];
      const targetColorValues = targetColor.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];

      const currentColorValues = startColorValues.map((startValue, i) => {
        const targetValue = targetColorValues[i];
        return Math.round(startValue + (targetValue - startValue) * easedProgress);
      });

      const currentColor = `#${currentColorValues.map((value) => value.toString(16).padStart(2, '0')).join('')}`;
      this.setLEDColor(index, currentColor);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  animateBrightnessChange(index: number, targetBrightness: number, duration: number, easingFunction: (t: number) => number) {
    const startColor = this.ledColors[index];
    const startBrightness = this.getBrightness(startColor);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easingFunction(progress);

      const currentBrightness = startBrightness + (targetBrightness - startBrightness) * easedProgress;
      const currentColor = this.setBrightness(startColor, currentBrightness);
      this.setLEDColor(index, currentColor);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  getBrightness(color: string): number {
    const colorValues = color.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];
    return (colorValues[0] + colorValues[1] + colorValues[2]) / 3;
  }

  setBrightness(color: string, brightness: number): string {
    const colorValues = color.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];
    const adjustedColorValues = colorValues.map((value) => Math.min(255, Math.round(value * brightness / 255)));
    return `#${adjustedColorValues.map((value) => value.toString(16).padStart(2, '0')).join('')}`;
  }

  startPreconfiguredPattern(patternName: string) {
    const pattern = preconfiguredLightPatterns.find(p => p.name === patternName);
    if (pattern) {
      pattern.pattern(this);
    }
  }
}
