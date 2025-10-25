# Architecture Overview

This document describes the architecture and design of the Light Strip Library.

## Table of Contents

- [High-Level Architecture](#high-level-architecture)
- [Core Components](#core-components)
- [Data Flow](#data-flow)
- [Technology Stack](#technology-stack)
- [Design Patterns](#design-patterns)

## High-Level Architecture

The Light Strip Library is a TypeScript/React library for simulating and controlling LED light strips. It consists of several layers:

```
┌─────────────────────────────────────┐
│   Demo Application / Examples       │
│   (React Components)                │
└────────────┬────────────────────────┘
             │
┌────────────┴────────────────────────┐
│   Core Library (Public API)         │
│   - LightStrip Component            │
│   - AnimationFramework              │
│   - Protocol Listeners              │
└────────────┬────────────────────────┘
             │
┌────────────┴────────────────────────┐
│   Rendering & State Management      │
│   - SVG Rendering                   │
│   - React Hooks                     │
│   - LED State Management            │
└────────────┬────────────────────────┘
             │
┌────────────┴────────────────────────┐
│   External Protocols (Optional)     │
│   - ArtNet Protocol                 │
│   - E1.31 (sACN) Protocol           │
└─────────────────────────────────────┘
```

## Core Components

### 1. LightStrip Component (`src/LightStrip.tsx`)

The main React component that renders LED strips using SVG.

**Key Features:**
- React functional component with hooks
- SVG-based rendering with glow effects
- Support for multiple LED configurations
- Configurable color channels (RGB, RGBW, etc.)
- Animation support via color/brightness changes

**Component Props:**
```typescript
{
  length?: number;          // Physical length in units
  numLEDs?: number;         // Number of LED elements
  addressableLEDs?: number; // Number of addressable LEDs
  colorSetup?: ColorSetup;  // Color channel configuration
}
```

**State Management:**
- Uses `useState` for bends and LED colors
- Provides `setLEDColor` method for external control
- Supports dynamic bend additions

### 2. AnimationFramework (`src/AnimationFramework.ts`)

Manages animation loops and timing.

**Key Features:**
- Named animation registration
- Interval-based animation timing
- Multiple concurrent animations
- Animation start/stop control

**Usage Pattern:**
```typescript
const framework = new AnimationFramework();
framework.startAnimation('rainbow', updateColors, 16); // ~60 FPS
framework.stopAnimation('rainbow');
```

### 3. Protocol Listeners

#### ArtNetListener (`src/ArtNetListener.ts`)
Listens for ArtNet protocol messages via WebSocket.

**Purpose:** Integration with professional lighting control software like xLights.

#### E131Listener (`src/E131Listener.ts`)
Listens for E1.31 (sACN) protocol messages via WebSocket.

**Purpose:** Integration with streaming ACN lighting control systems.

### 4. Server (`src/Server.ts`)

WebSocket server for protocol integration.

**Features:**
- HTTP server for demo pages
- WebSocket server for real-time communication
- Protocol message routing
- Client connection management

### 5. Benchmark (`src/Benchmark.ts`)

Performance measurement utility.

**Features:**
- Frame rate calculation
- Start/stop timing
- FPS reporting

### 6. Type Definitions (`src/types.ts`)

Central type definitions for the library.

**Key Types:**
```typescript
// Physical LED strip configuration
type LightStripDetails = {
  length: number;
  numLEDs: number;
  addressableLEDs: number;
};

// Bend in the strip
type Bend = {
  length: number;
  angle: number;  // in degrees
};

// Color channel configuration
type ColorSetup = {
  channels: ColorChannel[];
};

type ColorChannel = {
  name: string;   // e.g., "Red", "Green", "Blue", "White"
  value: number;  // 0-255
};
```

### 7. Logger (`src/logger.ts`)

Debug logging utility.

**Features:**
- Console-based logging
- Debug level filtering
- Color change tracking
- Animation event logging

## Data Flow

### LED Color Update Flow

```
User/Animation
     ↓
setLEDColor(index, color)
     ↓
Update React State (ledColors)
     ↓
React Re-render
     ↓
SVG Circle Elements Update
     ↓
Browser Renders Updated LEDs
```

### Animation Flow

```
AnimationFramework.startAnimation()
     ↓
window.setInterval(callback, interval)
     ↓
Callback executes (e.g., setLEDColor)
     ↓
LED state updates
     ↓
Visual update (see LED Color Update Flow)
```

### Protocol Integration Flow

```
External Software (xLights, etc.)
     ↓
ArtNet/E1.31 Message
     ↓
WebSocket Connection
     ↓
Server.ts receives message
     ↓
Protocol Listener processes message
     ↓
setLEDColor updates LED state
     ↓
Visual update
```

## Technology Stack

### Frontend
- **React 18:** UI component framework
- **TypeScript:** Type-safe JavaScript
- **SVG:** Vector graphics for LED rendering

### Build Tools
- **TypeScript Compiler (tsc):** Type checking and compilation
- **Webpack:** Module bundling and dev server
- **webpack-dev-server:** Development server with hot reload

### Testing
- **Playwright:** Browser automation and screenshot testing
- **@playwright/test:** Testing framework

### Development
- **GitHub Actions:** CI/CD pipeline
- **GitHub Copilot:** AI-assisted development

## Design Patterns

### 1. Component-Based Architecture

React components encapsulate LED strip logic and rendering.

**Benefits:**
- Reusable components
- Clear separation of concerns
- Easy to test and maintain

### 2. Declarative Rendering

SVG elements are rendered declaratively based on state.

**Example:**
```tsx
{elements.map((led, i) => (
  <circle key={i} cx={led.x} cy={led.y} fill={led.color} />
))}
```

### 3. Observer Pattern (via WebSocket)

Protocol listeners observe WebSocket messages and update state.

**Flow:**
```
WebSocket (Observable) → Listener (Observer) → State Update
```

### 4. Strategy Pattern (Color Setups)

Different color channel configurations can be plugged in.

**Example:**
```typescript
// RGB
const rgbSetup = { channels: [R, G, B] };

// RGBW
const rgbwSetup = { channels: [R, G, B, W] };
```

### 5. Factory Pattern (Animation Patterns)

Preconfigured animation patterns are created via factory functions.

**Example:**
```typescript
const patterns = [
  { name: 'Chasing', pattern: createChasingPattern },
  { name: 'Rainbow', pattern: createRainbowPattern }
];
```

## Extension Points

### Adding New Animation Patterns

1. Create animation callback function
2. Register with AnimationFramework
3. Control timing via interval parameter

### Adding New Protocol Support

1. Create new listener class (extend pattern from ArtNetListener)
2. Implement message parsing
3. Map protocol data to LED colors
4. Register with Server.ts

### Custom Color Channels

1. Define ColorSetup with desired channels
2. Pass to LightStrip component
3. Handle channel mapping in rendering logic

## Performance Considerations

### Rendering Optimization

- **SVG vs Canvas:** SVG chosen for glow effects, but Canvas could improve performance for >100 LEDs
- **React Memoization:** Consider `useMemo` for expensive calculations
- **Batch Updates:** Group multiple LED updates when possible

### Animation Performance

- **Frame Rate:** Default 60 FPS (16ms interval)
- **RAF vs setInterval:** Consider `requestAnimationFrame` for smoother animations
- **State Batching:** React batches state updates automatically

### Memory Management

- **Animation Cleanup:** Always stop animations when unmounting
- **WebSocket Cleanup:** Close connections properly
- **Event Listener Cleanup:** Remove listeners in cleanup functions

## Testing Strategy

### Unit Tests (Future)

- Test individual functions
- Mock React hooks
- Test color calculations

### Integration Tests

- Test component interactions
- Test animation sequences
- Test protocol message handling

### Visual Regression Tests (Current)

- Playwright screenshot tests
- Compare against baseline images
- Detect visual changes

## Build Process

### Development Build

```
Source (.ts/.tsx) → TypeScript Compiler → JavaScript (.js)
                         ↓
                    webpack-dev-server (hot reload)
```

### Production Build

```
Source (.ts/.tsx) → TypeScript Compiler → JavaScript (.js)
                         ↓
                      Webpack → Bundled output (dist/)
```

## Deployment

The library can be:
1. **Published to npm:** As a package for use in other projects
2. **Served as demo:** Via GitHub Pages or similar hosting
3. **Integrated:** Into lighting control systems via protocols

## Future Enhancements

### Potential Improvements

1. **Canvas Rendering:** For better performance with many LEDs
2. **3D Rendering:** Three.js integration for 3D LED arrangements
3. **More Protocols:** DMX, OSC support
4. **Effects Library:** Expanded animation pattern collection
5. **Recording/Playback:** Save and replay animation sequences
6. **WebGL Shaders:** GPU-accelerated effects

### Architectural Considerations

- Keep core library protocol-agnostic
- Maintain separation between rendering and state
- Support tree-shaking for bundle size optimization
- Consider Web Workers for animation calculations

---

For implementation details and examples, see the [README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
