import React, { useState } from 'react';

const LightStripComponent: React.FC = () => {
  const [ledColors, setLedColors] = useState<string[]>(Array(10).fill('#000000'));
  const [bends, setBends] = useState<{ length: number; angle: number }[]>([]);

  const setLEDColor = (index: number, color: string) => {
    setLedColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  };

  const addBend = (length: number, angle: number) => {
    setBends((prevBends) => [...prevBends, { length, angle }]);
  };

  const draw = () => {
    const elements = [];
    let currentX = 0;
    let currentY = 0;
    let currentAngle = 0;

    const bendInterval = bends.length > 0 ? Math.floor(ledColors.length / (bends.length + 1)) : ledColors.length;
    let bendIndex = 0;
    for (let i = 0; i < ledColors.length; i++) {
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

      currentX += Math.cos((currentAngle * Math.PI) / 180) * (100 / ledColors.length);
      currentY += Math.sin((currentAngle * Math.PI) / 180) * (100 / ledColors.length);

      if (bends[bendIndex] && i === bendInterval * (bendIndex + 1)) {
        currentAngle += bends[bendIndex].angle;
        bendIndex++;
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

  return (
    <div>
      {draw()}
    </div>
  );
};

export default LightStripComponent;
