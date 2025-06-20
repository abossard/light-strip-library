import React from 'react';
import { LightStrip, AnimationFramework, Benchmark } from '../index';

const LightStripComponent: React.FC = () => {
  const lightStrip = new LightStrip(100, 10, 10);
  const animationFramework = new AnimationFramework();
  const benchmark = new Benchmark();

  const startAnimation = () => {
    animationFramework.startAnimation('example', () => {
      lightStrip.setLEDColor(Math.floor(Math.random() * 10), getRandomColor());
      document.getElementById('light-strip')!.innerHTML = '';
      document.getElementById('light-strip')!.appendChild(lightStrip.draw());
    }, 1000);
  };

  const stopAnimation = () => {
    animationFramework.stopAnimation('example');
  };

  const startBenchmark = () => {
    benchmark.start();
    animationFramework.startAnimation('benchmark', () => {
      benchmark.incrementFrameCount();
      lightStrip.setLEDColor(Math.floor(Math.random() * 10), getRandomColor());
      document.getElementById('light-strip')!.innerHTML = '';
      document.getElementById('light-strip')!.appendChild(lightStrip.draw());
    }, 1000);
  };

  const stopBenchmark = () => {
    animationFramework.stopAnimation('benchmark');
    benchmark.stop();
    alert(`Refresh Rate: ${benchmark.getRefreshRate()} FPS`);
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
      <h1>Light Strip Example</h1>
      <div id="light-strip" />
      <div className="controls">
        <button onClick={startAnimation}>Start Animation</button>
        <button onClick={stopAnimation}>Stop Animation</button>
        <button onClick={startBenchmark}>Start Benchmark</button>
        <button onClick={stopBenchmark}>Stop Benchmark</button>
      </div>
    </div>
  );
};

export default LightStripComponent;
