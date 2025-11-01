import React, { useState, useEffect } from 'react';
import { LightStripDetails, Bend, LEDColor, ColorSetup, defaultColorSetup, defaultParameters, SmoothAnimation, preconfiguredLightPatterns } from './types';
import { Logger } from './logger';

export const LightStrip: React.FC<{ length?: number; numLEDs?: number; addressableLEDs?: number; colorSetup?: ColorSetup }> = ({
  length = defaultParameters.length,
  numLEDs = defaultParameters.numLEDs,
  addressableLEDs = defaultParameters.addressableLEDs,
  colorSetup = defaultParameters.colorSetup,
}) => {
  // Assert non-null since we have defaults
  const stripLength = length!;
  const stripNumLEDs = numLEDs!;
  const stripAddressableLEDs = addressableLEDs!;
  
  const [bends, setBends] = useState<Bend[]>([]);
  const [ledColors, setLedColors] = useState<LEDColor[]>(Array(stripNumLEDs).fill("#000000"));

  const addBend = (length: number, angle: number) => {
    setBends((prevBends) => [...prevBends, { length, angle }]);
  };

  const setLEDColor = (index: number, color: string) => {
    if (index >= 0 && index < stripNumLEDs) {
      setLedColors((prevColors) => {
        const newColors = [...prevColors];
        newColors[index] = color;
        return newColors;
      });
      Logger.debug(`LED ${index} color set to ${color}`);
    }
  };

  const draw = () => {
    const svgNS = "http://www.w3.org/2000/svg";
    const elements = [];

    let currentX = 0;
    let currentY = 0;
    let currentAngle = 0;

    for (let i = 0; i < stripNumLEDs; i++) {
      elements.push(
        <circle
          key={i}
          cx={currentX}
          cy={currentY}
          r={5}
          fill={ledColors[i]}
          filter="url(#glow)"
        />
      );

      currentX += Math.cos((currentAngle * Math.PI) / 180) * (stripLength / stripNumLEDs);
      currentY += Math.sin((currentAngle * Math.PI) / 180) * (stripLength / stripNumLEDs);

      if (bends.length > 0 && i === Math.floor(stripNumLEDs / bends.length)) {
        const bend = bends.shift();
        if (bend) {
          currentAngle += bend.angle;
        }
      }
    }

    return (
      <svg width="100%" height="100%" style={{ backgroundColor: 'black' }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {elements}
      </svg>
    );
  };

  const animateColorChange = (index: number, targetColor: string, duration: number, easingFunction: (t: number) => number) => {
    const startColor = ledColors[index];
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easingFunction(progress);

      const startColorValues = startColor.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];
      const targetColorValues = targetColor.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];

      const currentColorValues = startColorValues.map((startValue, i) => {
        const targetValue = targetColorValues[i];
        return Math.round(startValue + (targetValue - startValue) * easedProgress);
      });

      const currentColor = `#${currentColorValues.map((value) => value.toString(16).padStart(2, '0')).join('')}`;
      setLEDColor(index, currentColor);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const animateBrightnessChange = (index: number, targetBrightness: number, duration: number, easingFunction: (t: number) => number) => {
    const startColor = ledColors[index];
    const startBrightness = getBrightness(startColor);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easingFunction(progress);

      const currentBrightness = startBrightness + (targetBrightness - startBrightness) * easedProgress;
      const currentColor = setBrightness(startColor, currentBrightness);
      setLEDColor(index, currentColor);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const getBrightness = (color: string): number => {
    const colorValues = color.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];
    return (colorValues[0] + colorValues[1] + colorValues[2]) / 3;
  };

  const setBrightness = (color: string, brightness: number): string => {
    const colorValues = color.match(/\w\w/g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];
    const adjustedColorValues = colorValues.map((value) => Math.min(255, Math.round(value * brightness / 255)));
    return `#${adjustedColorValues.map((value) => value.toString(16).padStart(2, '0')).join('')}`;
  };

  const startPreconfiguredPattern = (patternName: string) => {
    const pattern = preconfiguredLightPatterns.find(p => p.name === patternName);
    if (pattern) {
      pattern.pattern({ length: stripLength, numLEDs: stripNumLEDs, addressableLEDs: stripAddressableLEDs });
    }
  };

  return (
    <div>
      {draw()}
    </div>
  );
};
