import React from 'react';
import { LightStrip, AnimationFramework, Benchmark } from '../index';

const StraightLEDStripExample: React.FC = () => {
  const lightStrip = new LightStrip(100, 10, 10);
  const animationFramework = new AnimationFramework();
  const benchmark = new Benchmark();

  const startAnimation = () => {
    animationFramework.startAnimation('straight', () => {
      lightStrip.setLEDColor(Math.floor(Math.random() * 10), getRandomColor());
      document.getElementById('straight-light-strip')!.innerHTML = '';
      document.getElementById('straight-light-strip')!.appendChild(lightStrip.draw());
    }, 1000);
  };

  const stopAnimation = () => {
    animationFramework.stopAnimation('straight');
  };

  const startBenchmark = () => {
    benchmark.start();
    animationFramework.startAnimation('straightBenchmark', () => {
      benchmark.incrementFrameCount();
      lightStrip.setLEDColor(Math.floor(Math.random() * 10), getRandomColor());
      document.getElementById('straight-light-strip')!.innerHTML = '';
      document.getElementById('straight-light-strip')!.appendChild(lightStrip.draw());
    }, 1000);
  };

  const stopBenchmark = () => {
    animationFramework.stopAnimation('straightBenchmark');
    benchmark.stop();
    alert(`Straight Light Strip Refresh Rate: ${benchmark.getRefreshRate()} FPS`);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <h1>Straight LED Strip Example</h1>
      <div id="straight-light-strip" />
      <div className="controls">
        <button onClick={startAnimation}>Start Animation</button>
        <button onClick={stopAnimation}>Stop Animation</button>
        <button onClick={startBenchmark}>Start Benchmark</button>
        <button onClick={stopBenchmark}>Stop Benchmark</button>
      </div>
    </div>
  );
};

export default StraightLEDStripExample;
