# Project Overview - Light Strip Library

## Quick Summary

**Purpose:** A TypeScript/React library for simulating and controlling LED light strips with support for various configurations, animations, and professional lighting protocols (ArtNet, E1.31).

**Target Users:** 
- Web developers building LED simulation interfaces
- Lighting designers prototyping light shows
- Hobbyists creating virtual LED displays
- Integration with professional lighting software (xLights)

**Key Features:**
- 🎨 SVG-based LED rendering with glow effects
- 🎬 Built-in animation framework
- 🔧 Configurable LED strip layouts (straight, circular, square, custom bends)
- 🌈 Multiple color channel support (RGB, RGBW, custom)
- 🌐 Protocol listeners (ArtNet, E1.31)
- 📊 Performance benchmarking
- ⚛️ React components for easy integration

## Technology Stack

- **Language:** TypeScript
- **Framework:** React 18
- **Build:** Webpack, TypeScript Compiler
- **Testing:** Playwright
- **Protocols:** WebSocket, ArtNet, E1.31
- **Rendering:** SVG

## Project Statistics

- **Lines of Code:** ~2,500
- **Components:** 6 main components + 3 examples
- **Dependencies:** React, TypeScript, ws, Playwright
- **Test Coverage:** Screenshot tests for visual regression

## Entry Points

### For Library Users
- `src/index.ts` - Main public API
- `README.md` - Usage documentation
- `demo/` - Interactive demo application

### For Contributors
- `CONTRIBUTING.md` - Development setup and guidelines
- `ARCHITECTURE.md` - Architecture and design patterns
- `.github/copilot-instructions.md` - Copilot-specific guidance

## Core Concepts

### 1. LED Strip Representation
LED strips are represented as React components with:
- Physical properties (length, number of LEDs)
- Visual rendering (SVG circles with glow)
- State management (color of each LED)
- Animation support (color/brightness changes)

### 2. Animation Framework
Simple interval-based animation system:
- Named animations for multiple concurrent patterns
- Callback-based updates
- Start/stop controls
- Configurable timing

### 3. Protocol Integration
WebSocket-based protocol listeners:
- Receive messages from external software
- Parse protocol data (ArtNet, E1.31)
- Update LED colors in real-time
- Enable integration with professional lighting tools

### 4. Flexible Configuration
Supports various LED configurations:
- Different strip shapes (straight, circular, square)
- Custom bends and angles
- Multiple color channels (RGB, RGBW, custom)
- Scalable from few to many LEDs

## Directory Structure

```
├── src/                      # Source code
│   ├── LightStrip.tsx       # Main component (React + SVG)
│   ├── AnimationFramework.ts # Animation utilities
│   ├── Benchmark.ts         # Performance measurement
│   ├── ArtNetListener.ts    # ArtNet protocol support
│   ├── E131Listener.ts      # E1.31 protocol support
│   ├── Server.ts            # WebSocket server
│   ├── types.ts             # Type definitions
│   ├── logger.ts            # Debug logging
│   ├── examples/            # Example implementations
│   └── index.ts             # Public API
├── demo/                     # Demo application
├── tests/                    # Playwright tests
├── .github/                  # GitHub configuration
│   ├── workflows/           # CI/CD
│   └── copilot-instructions.md
├── screenshots/              # Test screenshots
├── dist/                     # Build output
├── README.md                 # User documentation
├── CONTRIBUTING.md           # Contributor guide
├── ARCHITECTURE.md           # Architecture docs
└── package.json              # Dependencies & scripts
```

## Development Workflow

1. **Setup:** `npm install`
2. **Develop:** `npm run dev` (opens demo at localhost:3000)
3. **Build:** `npm run build` (compiles TypeScript)
4. **Test:** `npm run screenshot` (runs visual tests)
5. **Commit:** Follow conventional commits
6. **PR:** CI runs automatically

## Common Development Tasks

### Adding a New Animation Pattern
```typescript
// In your component or example
framework.startAnimation('myPattern', () => {
  // Update LED colors here
  setLEDColor(index, color);
}, intervalMs);
```

### Creating a New LED Configuration
```typescript
const MyLEDStrip = () => {
  const lightStrip = new LightStrip(length, numLEDs, addressableLEDs);
  lightStrip.addBend(25, 90); // Add bends for custom shapes
  return <div>{/* Render logic */}</div>;
};
```

### Integrating with External Software
```typescript
// Setup protocol listener
const listener = new ArtNetListener('ws://localhost:8080/artnet', (data) => {
  setLEDColor(data.index, data.color);
});
```

## Build Outputs

### Library (`dist/`)
Compiled TypeScript → JavaScript modules for npm distribution

### Demo (`demo/`)
Bundled application demonstrating library features

### Screenshots (`screenshots/`)
Generated test screenshots for visual regression testing

## Testing Strategy

### Current: Visual Regression
- Playwright screenshot tests
- Compare rendered LED strips
- Detect visual changes
- Test different configurations and animations

### Future Considerations
- Unit tests for utilities
- Integration tests for protocol handling
- Performance benchmarks
- Cross-browser testing

## Performance Characteristics

- **Rendering:** ~60 FPS with <50 LEDs (SVG)
- **Memory:** Minimal for typical use cases
- **Scalability:** Works well up to ~100 LEDs, consider Canvas for more
- **Animation:** Smooth transitions with requestAnimationFrame

## Integration Points

### As npm Package
```bash
npm install light-strip-library
```
```typescript
import { LightStrip, AnimationFramework } from 'light-strip-library';
```

### With xLights
1. Start Server.js
2. Configure xLights for E1.31 output
3. Point to server address
4. Control LEDs from xLights

### In React Applications
```tsx
import { LightStrip } from 'light-strip-library';

function App() {
  return <LightStrip numLEDs={20} />;
}
```

## Known Limitations

1. **Performance:** SVG rendering limits to ~100 LEDs before slowdown
2. **3D Support:** No 3D rendering capabilities currently
3. **Protocols:** Limited to ArtNet and E1.31 (no DMX, OSC)
4. **Type Safety:** Some areas have `any` types or loose typing
5. **Browser Support:** Requires modern browsers with SVG support

## Future Roadmap

- [ ] Canvas rendering for better performance
- [ ] 3D LED arrangements with Three.js
- [ ] More animation patterns and effects
- [ ] Additional protocol support (DMX, OSC)
- [ ] Recording and playback functionality
- [ ] Mobile-responsive improvements
- [ ] Unit test coverage
- [ ] Performance optimizations

## Key Files to Understand

1. **src/LightStrip.tsx** - Start here to understand LED rendering
2. **src/types.ts** - Understand the data structures
3. **src/examples/straight.tsx** - See a complete example
4. **README.md** - Learn usage patterns
5. **ARCHITECTURE.md** - Deep dive into design

## Helpful Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Building
npm run build           # Compile TypeScript to dist/
npm run build-demo      # Build demo application

# Testing
npm run screenshot      # Run Playwright screenshot tests
npx playwright show-report  # View test results

# Maintenance
npm install             # Install/update dependencies
npm audit               # Check for security issues
```

## Contact & Resources

- **Repository:** https://github.com/abossard/light-strip-library
- **Issues:** Use GitHub Issues for bugs and features
- **Discussions:** Use GitHub Discussions for questions

## Quick Reference: Main Classes

```typescript
// LightStrip - Main component
<LightStrip 
  length={100} 
  numLEDs={20} 
  addressableLEDs={20} 
  colorSetup={customSetup} 
/>

// AnimationFramework - Animations
const fw = new AnimationFramework();
fw.startAnimation(name, callback, interval);
fw.stopAnimation(name);

// Benchmark - Performance
const bm = new Benchmark();
bm.start();
bm.incrementFrameCount();
bm.stop();
console.log(bm.getRefreshRate());

// ArtNetListener - Protocol
const listener = new ArtNetListener(url, callback);

// E131Listener - Protocol
const listener = new E131Listener(url, callback);
```

---

This overview provides a high-level understanding of the project. For detailed information, see the other documentation files.
