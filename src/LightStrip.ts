export class LightStrip {
  length: number;
  numLEDs: number;
  addressableLEDs: number;
  bends: { length: number; angle: number }[];
  ledColors: string[];

  constructor(length: number, numLEDs: number, addressableLEDs: number) {
    this.length = length;
    this.numLEDs = numLEDs;
    this.addressableLEDs = addressableLEDs;
    this.bends = [];
    this.ledColors = Array(numLEDs).fill("#000000");
  }

  addBend(length: number, angle: number) {
    this.bends.push({ length, angle });
  }

  setLEDColor(index: number, color: string) {
    if (index >= 0 && index < this.numLEDs) {
      this.ledColors[index] = color;
    }
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

    return svg;
  }
}
