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
