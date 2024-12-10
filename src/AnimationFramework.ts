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
}
