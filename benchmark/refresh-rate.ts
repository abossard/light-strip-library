import { LightStrip } from '../src/LightStrip';
import { AnimationFramework } from '../src/AnimationFramework';
import { Benchmark } from '../src/Benchmark';

const lightStrip = new LightStrip(100, 10, 10);
const animationFramework = new AnimationFramework();
const benchmark = new Benchmark();

function startBenchmark() {
  benchmark.start();
  animationFramework.startAnimation('benchmark', () => {
    benchmark.incrementFrameCount();
    lightStrip.setLEDColor(Math.floor(Math.random() * 10), getRandomColor());
    document.body.innerHTML = '';
    document.body.appendChild(lightStrip.draw());
  }, 1000);
}

function stopBenchmark() {
  animationFramework.stopAnimation('benchmark');
  benchmark.stop();
  alert(`Refresh Rate: ${benchmark.getRefreshRate()} FPS`);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.getElementById('start-benchmark').addEventListener('click', startBenchmark);
document.getElementById('stop-benchmark').addEventListener('click', stopBenchmark);
