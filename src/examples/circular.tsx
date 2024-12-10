import React from 'react';
import { LightStrip, AnimationFramework, Benchmark } from '../index';

const CircularLEDStripExample: React.FC = () => {
  const lightStrip = new LightStrip(100, 12, 12);
  for (let i = 0; i < 12; i++) {
    lightStrip.addBend(8.33, 30);
  }

  const animationFramework = new AnimationFramework();
  const benchmark = new Benchmark();

  const startAnimation = () => {
    animationFramework.startAnimation('circular', () => {
      lightStrip.setLEDColor(Math.floor(Math.random() * 12), getRandomColor());
      document.getElementById('circular-light-strip')!.innerHTML = '';
      document.getElementById('circular-light-strip')!.appendChild(lightStrip.draw());
    }, 1000);
  };

  const stopAnimation = () => {
    animationFramework.stopAnimation('circular');
  };

  const startBenchmark = () => {
    benchmark.start();
    animationFramework.startAnimation('circularBenchmark', () => {
      benchmark.incrementFrameCount();
      lightStrip.setLEDColor(Math.floor(Math.random() * 12), getRandomColor());
      document.getElementById('circular-light-strip')!.innerHTML = '';
      document.getElementById('circular-light-strip')!.appendChild(lightStrip.draw());
    }, 1000);
  };

  const stopBenchmark = () => {
    animationFramework.stopAnimation('circularBenchmark');
    benchmark.stop();
    alert(`Circular Light Strip Refresh Rate: ${benchmark.getRefreshRate()} FPS`);
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
      <h1>Circular LED Strip Example</h1>
      <div id="circular-light-strip" />
      <div className="controls">
        <button onClick={startAnimation}>Start Animation</button>
        <button onClick={stopAnimation}>Stop Animation</button>
        <button onClick={startBenchmark}>Start Benchmark</button>
        <button onClick={stopBenchmark}>Stop Benchmark</button>
      </div>
    </div>
  );
};

export default CircularLEDStripExample;
