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

// Note: PreconfiguredLightPattern is currently not used but kept for potential future implementation
// To be functional, it would need a proper interface with setLEDColor method
export type PreconfiguredLightPattern = {
  name: string;
  pattern: (lightStrip: LightStripDetails) => void;
};

export const preconfiguredLightPatterns: PreconfiguredLightPattern[] = [];
