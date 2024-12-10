export class AnimationFramework {
  private animations: { [key: string]: number } = {};

  startAnimation(name: string, callback: () => void, interval: number) {
    if (!this.animations[name]) {
      this.animations[name] = window.setInterval(callback, interval);
    }
  }

  stopAnimation(name: string) {
    if (this.animations[name]) {
      window.clearInterval(this.animations[name]);
      delete this.animations[name];
    }
  }

  manageAnimations() {
    // This method can be used to manage animations if needed
  }

  smoothColorChange(
    element: HTMLElement,
    startColor: string,
    endColor: string,
    duration: number
  ) {
    const start = performance.now();
    const [r1, g1, b1] = this.hexToRgb(startColor);
    const [r2, g2, b2] = this.hexToRgb(endColor);

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const r = Math.round(r1 + (r2 - r1) * progress);
      const g = Math.round(g1 + (g2 - g1) * progress);
      const b = Math.round(b1 + (b2 - b1) * progress);
      element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  smoothBrightnessChange(
    element: HTMLElement,
    startBrightness: number,
    endBrightness: number,
    duration: number
  ) {
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const brightness = startBrightness + (endBrightness - startBrightness) * progress;
      element.style.filter = `brightness(${brightness})`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  private hexToRgb(hex: string): [number, number, number] {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }
}
