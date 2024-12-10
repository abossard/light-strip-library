import React from 'react';
import { LightStrip, AnimationFramework, Benchmark } from '../index';

const SquareLEDStripExample: React.FC = () => {
  const lightStrip = new LightStrip(100, 20, 20);
  lightStrip.addBend(25, 90);
  lightStrip.addBend(25, 90);
  lightStrip.addBend(25, 90);

  const animationFramework = new AnimationFramework();
  const benchmark = new Benchmark();

  const startAnimation = () => {
    animationFramework.startAnimation('square', () => {
      lightStrip.setLEDColor(Math.floor(Math.random() * 20), getRandomColor());
      document.getElementById('square-light-strip')!.innerHTML = '';
      document.getElementById('square-light-strip')!.appendChild(lightStrip.draw());
    }, 1000);
  };

  const stopAnimation = () => {
    animationFramework.stopAnimation('square');
  };

  const startBenchmark = () => {
    benchmark.start();
    animationFramework.startAnimation('squareBenchmark', () => {
      benchmark.incrementFrameCount();
      lightStrip.setLEDColor(Math.floor(Math.random() * 20), getRandomColor());
      document.getElementById('square-light-strip')!.innerHTML = '';
      document.getElementById('square-light-strip')!.appendChild(lightStrip.draw());
    }, 1000);
  };

  const stopBenchmark = () => {
    animationFramework.stopAnimation('squareBenchmark');
    benchmark.stop();
    alert(`Square Light Strip Refresh Rate: ${benchmark.getRefreshRate()} FPS`);
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
      <h1>Square LED Strip Example</h1>
      <div id="square-light-strip" />
      <div className="controls">
        <button onClick={startAnimation}>Start Animation</button>
        <button onClick={stopAnimation}>Stop Animation</button>
        <button onClick={startBenchmark}>Start Benchmark</button>
        <button onClick={stopBenchmark}>Stop Benchmark</button>
      </div>
    </div>
  );
};

export default SquareLEDStripExample;