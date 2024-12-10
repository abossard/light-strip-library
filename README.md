# Light Strip Library

This library allows you to create and control light strips with various configurations, including straight, square, and circular light strips with bends. It provides functionality for animations, ArtNet and E1.31 protocol listeners, and benchmarking the refresh rate.

## Features

- Specify light strip details such as length, number of LEDs, and addressable LEDs
- Handle bends in the light strip, including length and angle
- Draw the light strip using SVG, with each LED being round and having a little glow
- Change the color of each addressable LED group
- Simple framework for animations
- Listener for ArtNet and E1.31 protocols
- Benchmarking the refresh rate
- Configurable color setup with different channels for each color (default: Red, Green, Blue)

## Installation

To install the library, run:

```bash
npm install light-strip-library
```

## Usage

### Creating a Light Strip

```typescript
import { LightStrip } from 'light-strip-library';

const lightStrip = new LightStrip(100, 10, 10);
lightStrip.setLEDColor(0, '#FF0000'); // Set the color of the first LED to red
document.body.appendChild(lightStrip.draw());
```

### Adding Bends

```typescript
const lightStrip = new LightStrip(100, 20, 20);
lightStrip.addBend(25, 90);
lightStrip.addBend(25, 90);
lightStrip.addBend(25, 90);
document.body.appendChild(lightStrip.draw());
```

### Configuring Color Setup

```typescript
import { LightStrip, ColorSetup } from 'light-strip-library';

const customColorSetup: ColorSetup = {
  channels: [
    { name: 'Red', value: 0 },
    { name: 'Green', value: 0 },
    { name: 'Blue', value: 0 },
    { name: 'White', value: 0 },
  ],
};

const lightStrip = new LightStrip(100, 10, 10, customColorSetup);
lightStrip.setLEDColor(0, '#FF0000'); // Set the color of the first LED to red
document.body.appendChild(lightStrip.draw());
```

### Animations

```typescript
import { AnimationFramework } from 'light-strip-library';

const animationFramework = new AnimationFramework();

function startAnimation() {
  animationFramework.startAnimation('example', () => {
    lightStrip.setLEDColor(Math.floor(Math.random() * 10), getRandomColor());
    document.body.innerHTML = '';
    document.body.appendChild(lightStrip.draw());
  }, 1000);
}

function stopAnimation() {
  animationFramework.stopAnimation('example');
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
```

### ArtNet Listener

```typescript
import { ArtNetListener } from 'light-strip-library';

const artNetListener = new ArtNetListener('ws://localhost:8080/artnet', (data) => {
  lightStrip.setLEDColor(data.index, data.color);
  document.body.innerHTML = '';
  document.body.appendChild(lightStrip.draw());
});
```

### E1.31 Listener

```typescript
import { E131Listener } from 'light-strip-library';

const e131Listener = new E131Listener('ws://localhost:8080/e131', (data) => {
  lightStrip.setLEDColor(data.index, data.color);
  document.body.innerHTML = '';
  document.body.appendChild(lightStrip.draw());
});
```

### Benchmarking

```typescript
import { Benchmark } from 'light-strip-library';

const benchmark = new Benchmark();

function startBenchmark() {
  benchmark.start();
  animationFramework.startAnimation('benchmark', () => {
    benchmark.incrementFrameCount();
    lightStrip.setLEDColor(Math.floor(Math.random() * 10), getRandomColor());
    document.body.innerHTML = '';
    document.body.appendChild(lightStrip.draw());
  }, 1000);
}

function stopBenchmark() {
  animationFramework.stopAnimation('benchmark');
  benchmark.stop();
  alert(`Refresh Rate: ${benchmark.getRefreshRate()} FPS`);
}
```

## Example Web Page

To run the example web page, open `example/index.html` in your browser. This page showcases different light strip configurations, including straight, square, and circular light strips with 12 bends. It also includes buttons to start and stop animations and benchmarks.

## Full-Fledged Kitchen Sink Example

To run the full-fledged kitchen sink example, open `example/kitchen-sink.html` in your browser. This page demonstrates all features of the library, including animations and ArtNet/E1.31 listeners.

## Running the Backend Server

To host the kitchen sink example, you need to run the backend server. Follow these steps:

1. Ensure you have Node.js installed on your system.
2. Navigate to the project directory.
3. Run the following command to start the server:

```bash
node dist/src/Server.js
```

The server will start listening on port 8080. You can then access the kitchen sink example by navigating to `http://localhost:8080/kitchen-sink` in your browser.
