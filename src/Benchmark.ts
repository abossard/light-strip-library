export class Benchmark {
  private startTime: number | null = null;
  private endTime: number | null = null;
  private frameCount: number = 0;

  start() {
    this.startTime = performance.now();
    this.frameCount = 0;
  }

  stop() {
    this.endTime = performance.now();
  }

  incrementFrameCount() {
    this.frameCount++;
  }

  getRefreshRate(): number {
    if (this.startTime === null || this.endTime === null) {
      throw new Error("Benchmark has not been started or stopped properly.");
    }
    const durationInSeconds = (this.endTime - this.startTime) / 1000;
    return this.frameCount / durationInSeconds;
  }
}
