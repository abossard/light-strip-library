import React, { useState, useEffect } from 'react';
import { LightStrip, AnimationFramework, Benchmark } from '../index';

const StraightLEDStripExample: React.FC = () => {
  const [lightStrip] = useState(() => new LightStrip(100, 10, 10));
  const [animationFramework] = useState(() => new AnimationFramework());
  const [benchmark] = useState(() => new Benchmark());
  const [refreshRate, setRefreshRate] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      animationFramework.stopAnimation('straight');
      animationFramework.stopAnimation('straightBenchmark');
    };
  }, [animationFramework]);

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
    setRefreshRate(benchmark.getRefreshRate());
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
      {refreshRate !== null && (
        <div>
          <p>Refresh Rate: {refreshRate} FPS</p>
        </div>
      )}
    </div>
  );
};

export default StraightLEDStripExample;
