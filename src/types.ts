export type LightStripDetails = {
  length: number;
  numLEDs: number;
  addressableLEDs: number;
};

export type Bend = {
  length: number;
  angle: number;
};

export type LEDColor = string;

export type Animation = {
  name: string;
  callback: () => void;
  interval: number;
};

export type ColorChannel = {
  name: string;
  value: number;
};

export type ColorSetup = {
  channels: ColorChannel[];
};

export const defaultColorSetup: ColorSetup = {
  channels: [
    { name: 'Red', value: 0 },
    { name: 'Green', value: 0 },
    { name: 'Blue', value: 0 },
  ],
};

export type DefaultParameters = {
  length?: number;
  numLEDs?: number;
  addressableLEDs?: number;
  colorSetup?: ColorSetup;
};

export const defaultParameters: DefaultParameters = {
  length: 100,
  numLEDs: 10,
  addressableLEDs: 10,
  colorSetup: defaultColorSetup,
};

export type SmoothAnimation = {
  duration: number;
  easingFunction: (t: number) => number;
};

export type PreconfiguredLightPattern = {
  name: string;
  pattern: (lightStrip: LightStripDetails) => void;
};

export const preconfiguredLightPatterns: PreconfiguredLightPattern[] = [
  {
    name: 'Chasing a Light',
    pattern: (lightStrip) => {
      let currentIndex = 0;
      setInterval(() => {
        lightStrip.setLEDColor(currentIndex, '#FF0000');
        currentIndex = (currentIndex + 1) % lightStrip.numLEDs;
      }, 100);
    },
  },
  {
    name: 'Blinking in Random Colors',
    pattern: (lightStrip) => {
      setInterval(() => {
        for (let i = 0; i < lightStrip.numLEDs; i++) {
          lightStrip.setLEDColor(i, getRandomColor());
        }
      }, 500);
    },
  },
  {
    name: 'Growing Flames',
    pattern: (lightStrip) => {
      let currentIndex = 0;
      setInterval(() => {
        lightStrip.setLEDColor(currentIndex, '#FF4500');
        currentIndex = (currentIndex + 1) % lightStrip.numLEDs;
      }, 100);
    },
  },
  {
    name: 'Falling and Stacking Color',
    pattern: (lightStrip) => {
      let currentIndex = 0;
      setInterval(() => {
        lightStrip.setLEDColor(currentIndex, '#00FF00');
        currentIndex = (currentIndex + 1) % lightStrip.numLEDs;
      }, 100);
    },
  },
];

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
