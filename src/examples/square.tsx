import React, { useState, useEffect } from 'react';
import { LightStrip, AnimationFramework, Benchmark } from '../index';

const SquareLEDStripExample: React.FC = () => {
  const [lightStrip] = useState(() => {
    const strip = new LightStrip(100, 20, 20);
    strip.addBend(25, 90);
    strip.addBend(25, 90);
    strip.addBend(25, 90);
    return strip;
  });

  const [animationFramework] = useState(() => new AnimationFramework());
  const [benchmark] = useState(() => new Benchmark());
  const [refreshRate, setRefreshRate] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      animationFramework.stopAnimation('square');
      animationFramework.stopAnimation('squareBenchmark');
    };
  }, [animationFramework]);

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
      <h1>Square LED Strip Example</h1>
      <div id="square-light-strip" />
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

export default SquareLEDStripExample;
