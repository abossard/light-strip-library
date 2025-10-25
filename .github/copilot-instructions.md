# GitHub Copilot Instructions for Light Strip Library

This file provides guidance for GitHub Copilot when assisting with development in this repository.

## Project Context

This is a TypeScript/React library for simulating and controlling LED light strips with various configurations, animations, and protocol integrations (ArtNet, E1.31).

## Code Style Guidelines

### TypeScript
- Always use TypeScript for new code
- Prefer explicit types over `any`
- Use interfaces for object shapes
- Define return types for functions
- Use type guards when narrowing types

### React
- Use functional components with hooks
- Prefer `useState` and `useEffect` for state/side effects
- Keep components focused and single-purpose
- Extract complex logic into custom hooks
- Use TypeScript for prop types

### Naming Conventions
- **Components:** PascalCase (e.g., `LightStripComponent`)
- **Functions/Variables:** camelCase (e.g., `setLEDColor`, `currentIndex`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `DEFAULT_LED_COUNT`)
- **Types/Interfaces:** PascalCase (e.g., `ColorSetup`, `LightStripDetails`)
- **Files:** PascalCase for components (.tsx), camelCase for utilities (.ts)

### Code Formatting
- Use 2 spaces for indentation
- Use semicolons at end of statements
- Use single quotes for strings
- Keep lines under 100 characters when practical
- Add blank lines between logical sections

## Project-Specific Patterns

### LED Color Management
When working with LED colors:
```typescript
// Use hex color strings
setLEDColor(index, '#FF0000');

// Update multiple LEDs in a loop
for (let i = 0; i < numLEDs; i++) {
  setLEDColor(i, color);
}

// Use helper for random colors
function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}
```

### Animation Patterns
When creating animations:
```typescript
const framework = new AnimationFramework();

// Start animation with name, callback, and interval (ms)
framework.startAnimation('pattern-name', () => {
  // Animation logic here
  setLEDColor(index, color);
}, 16); // ~60 FPS

// Always provide stop functionality
framework.stopAnimation('pattern-name');
```

### Component Structure
For new React components:
```typescript
import React, { useState, useEffect } from 'react';
import { /* types */ } from './types';

interface Props {
  // Define props with TypeScript
}

export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // State
  const [state, setState] = useState<Type>(initialValue);
  
  // Effects
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = () => {
    // Logic
  };
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### SVG Rendering
When rendering LEDs:
```typescript
<svg width="100%" height="100%">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  {leds.map((led, i) => (
    <circle
      key={i}
      cx={led.x}
      cy={led.y}
      r={5}
      fill={led.color}
      filter="url(#glow)"
    />
  ))}
</svg>
```

## Common Tasks

### Adding a New Animation Pattern
1. Create callback function that manipulates LED colors
2. Register with AnimationFramework
3. Provide start/stop controls
4. Add to examples if appropriate

### Adding a New LED Strip Configuration
1. Define strip parameters (length, numLEDs, bends)
2. Create example component in `src/examples/`
3. Implement unique layout logic
4. Add to demo page

### Protocol Integration
1. Create listener class extending pattern from existing listeners
2. Implement WebSocket message parsing
3. Map protocol data to `setLEDColor` calls
4. Register with Server.ts

### Adding Tests
1. Use Playwright for screenshot tests
2. Test visual output of components
3. Test animations at key frames
4. Compare against baseline screenshots

## Important Files

### Core Library
- `src/LightStrip.tsx` - Main React component
- `src/AnimationFramework.ts` - Animation utilities
- `src/types.ts` - Type definitions
- `src/index.ts` - Public API exports

### Examples
- `src/examples/straight.tsx` - Straight LED strip
- `src/examples/circular.tsx` - Circular LED strip
- `src/examples/square.tsx` - Square LED strip

### Testing
- `tests/screenshots.spec.ts` - Playwright screenshot tests

### Configuration
- `tsconfig.json` - TypeScript configuration
- `webpack.config.js` - Webpack bundling
- `package.json` - Dependencies and scripts

## Development Commands

```bash
# Start development server
npm run dev

# Build library
npm run build

# Build demo
npm run build-demo

# Run tests
npm run screenshot
```

## Type Definitions Reference

### Key Types
```typescript
// LED strip configuration
type LightStripDetails = {
  length: number;
  numLEDs: number;
  addressableLEDs: number;
};

// Bend in the strip
type Bend = {
  length: number;
  angle: number;
};

// Color string (hex format)
type LEDColor = string; // e.g., "#FF0000"

// Color channel configuration
type ColorSetup = {
  channels: ColorChannel[];
};

type ColorChannel = {
  name: string;
  value: number; // 0-255
};
```

## Best Practices

### Performance
- Batch LED updates when possible
- Use appropriate animation intervals (16ms for 60 FPS)
- Clean up animations on component unmount
- Avoid unnecessary re-renders

### Error Handling
- Validate LED indices before updating
- Check for null/undefined before accessing properties
- Handle WebSocket connection errors
- Log errors for debugging

### Documentation
- Add JSDoc comments for public APIs
- Document complex algorithms
- Include usage examples in comments
- Keep README.md updated

### Testing
- Test edge cases (empty strips, single LED, many LEDs)
- Test all animation patterns
- Verify color transitions
- Check for memory leaks

## Common Pitfalls to Avoid

1. **Case Sensitivity:** File names must match imports exactly (TypeScript is case-sensitive)
2. **JSX in .ts files:** Use .tsx extension for files containing JSX
3. **Missing Cleanup:** Always clean up intervals, timeouts, and event listeners
4. **State Mutations:** Never mutate state directly, use setState
5. **Infinite Loops:** Be careful with useEffect dependencies

## Examples of Good Code

### Animation with Cleanup
```typescript
useEffect(() => {
  const framework = new AnimationFramework();
  framework.startAnimation('demo', updateLEDs, 50);
  
  return () => {
    framework.stopAnimation('demo');
  };
}, []);
```

### Type-Safe LED Update
```typescript
const setLEDColor = (index: number, color: string): void => {
  if (index >= 0 && index < numLEDs) {
    setLedColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  }
};
```

### Responsive SVG
```typescript
<svg 
  width="100%" 
  height="100%" 
  viewBox="0 0 800 600"
  preserveAspectRatio="xMidYMid meet"
  style={{ backgroundColor: 'black' }}
>
  {/* SVG content */}
</svg>
```

## Questions to Ask When Coding

1. Is this component doing too much? Should it be split?
2. Are types properly defined?
3. Is cleanup handled correctly?
4. Will this work with different LED counts?
5. Is this performant for 100+ LEDs?
6. Are edge cases handled?
7. Is the code documented?

## Getting More Context

- See [ARCHITECTURE.md](../ARCHITECTURE.md) for architecture details
- See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines
- See [README.md](../README.md) for usage examples
- Check `src/examples/` for working examples

---

When in doubt, follow existing patterns in the codebase and keep changes minimal and focused.
