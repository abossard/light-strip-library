import React, { useState, useEffect, useRef } from 'react';

interface LightStripProps {
  numLEDs?: number;
  shape?: 'straight' | 'circular' | 'square';
  width?: number;
  height?: number;
}

const EnhancedLightStrip: React.FC<LightStripProps> = ({ 
  numLEDs = 20, 
  shape = 'straight',
  width = 600,
  height = 200
}) => {
  const [ledColors, setLedColors] = useState<string[]>(Array(numLEDs).fill('#333333'));
  const animationRef = useRef<NodeJS.Timeout | undefined>();
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPattern, setCurrentPattern] = useState<string>('none');

  const setLEDColor = (index: number, color: string) => {
    setLedColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  };

  const clearAllLEDs = () => {
    setLedColors(Array(numLEDs).fill('#333333'));
  };

  const generatePositions = () => {
    const positions: { x: number; y: number }[] = [];
    const centerX = width / 2;
    const centerY = height / 2;

    switch (shape) {
      case 'straight':
        for (let i = 0; i < numLEDs; i++) {
          positions.push({
            x: 50 + (i * (width - 100)) / (numLEDs - 1),
            y: centerY
          });
        }
        break;
      
      case 'circular':
        const radius = Math.min(width, height) / 3;
        for (let i = 0; i < numLEDs; i++) {
          const angle = (i * 2 * Math.PI) / numLEDs;
          positions.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
          });
        }
        break;
      
      case 'square':
        const sideLength = Math.min(width, height) / 2;
        const perimeter = 4 * sideLength;
        const spacing = perimeter / numLEDs;
        
        for (let i = 0; i < numLEDs; i++) {
          const distance = i * spacing;
          let x, y;
          
          if (distance < sideLength) {
            // Top side
            x = centerX - sideLength/2 + distance;
            y = centerY - sideLength/2;
          } else if (distance < 2 * sideLength) {
            // Right side
            x = centerX + sideLength/2;
            y = centerY - sideLength/2 + (distance - sideLength);
          } else if (distance < 3 * sideLength) {
            // Bottom side
            x = centerX + sideLength/2 - (distance - 2 * sideLength);
            y = centerY + sideLength/2;
          } else {
            // Left side
            x = centerX - sideLength/2;
            y = centerY + sideLength/2 - (distance - 3 * sideLength);
          }
          
          positions.push({ x, y });
        }
        break;
    }
    return positions;
  };

  const startChasingAnimation = () => {
    let currentIndex = 0;
    clearAllLEDs();
    setCurrentPattern('chasing');
    setIsAnimating(true);
    
    const animate = () => {
      setLedColors(prev => {
        const newColors = [...prev];
        // Clear previous LED
        newColors.fill('#333333');
        // Light up current LED
        newColors[currentIndex] = '#ff0000';
        return newColors;
      });
      
      currentIndex = (currentIndex + 1) % numLEDs;
      animationRef.current = setTimeout(animate, 100);
    };
    animate();
  };

  const startRainbowAnimation = () => {
    let hueOffset = 0;
    setCurrentPattern('rainbow');
    setIsAnimating(true);
    
    const animate = () => {
      setLedColors(prev => {
        const newColors = [...prev];
        for (let i = 0; i < numLEDs; i++) {
          const hue = (hueOffset + (i * 360) / numLEDs) % 360;
          newColors[i] = `hsl(${hue}, 100%, 50%)`;
        }
        return newColors;
      });
      
      hueOffset = (hueOffset + 10) % 360;
      animationRef.current = setTimeout(animate, 50);
    };
    animate();
  };

  const startRandomBlinkAnimation = () => {
    setCurrentPattern('random');
    setIsAnimating(true);
    
    const animate = () => {
      setLedColors(prev => {
        const newColors = [...prev];
        for (let i = 0; i < numLEDs; i++) {
          if (Math.random() > 0.7) {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            newColors[i] = colors[Math.floor(Math.random() * colors.length)];
          } else {
            newColors[i] = '#333333';
          }
        }
        return newColors;
      });
      
      animationRef.current = setTimeout(animate, 200);
    };
    animate();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsAnimating(false);
    setCurrentPattern('none');
    clearAllLEDs();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const positions = generatePositions();

  return (
    <div className="strip-section">
      <h2>{shape.charAt(0).toUpperCase() + shape.slice(1)} LED Strip ({numLEDs} LEDs)</h2>
      
      <div className="controls">
        <button onClick={startChasingAnimation} disabled={isAnimating}>
          🏃 Chasing Light
        </button>
        <button onClick={startRainbowAnimation} disabled={isAnimating}>
          🌈 Rainbow Wave
        </button>
        <button onClick={startRandomBlinkAnimation} disabled={isAnimating}>
          ✨ Random Blink
        </button>
        <button onClick={stopAnimation} disabled={!isAnimating}>
          ⏹️ Stop
        </button>
        <button onClick={clearAllLEDs} disabled={isAnimating}>
          🧹 Clear
        </button>
      </div>

      <div className="strip-display">
        <svg width={width} height={height} style={{ backgroundColor: '#000', display: 'block' }}>
          <defs>
            <filter id={`glow-${shape}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {positions.map((pos, i) => (
            <circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r={8}
              fill={ledColors[i]}
              filter={`url(#glow-${shape})`}
              stroke={ledColors[i] === '#333333' ? '#666' : 'none'}
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div style={{ marginTop: '10px', fontSize: '14px', color: '#aaa' }}>
        Current Pattern: {currentPattern === 'none' ? 'None' : currentPattern}
        {isAnimating && ' (Running...)'}
      </div>
    </div>
  );
};

export default EnhancedLightStrip;