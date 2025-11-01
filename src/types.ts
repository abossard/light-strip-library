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

export const defaultParameters: Required<DefaultParameters> = {
  length: 100,
  numLEDs: 10,
  addressableLEDs: 10,
  colorSetup: defaultColorSetup,
};

export type SmoothAnimation = {
  duration: number;
  easingFunction: (t: number) => number;
};

// Interface for light strip with control methods
export interface ILightStripController extends LightStripDetails {
  setLEDColor(index: number, color: string): void;
}

// TODO: Implement preconfigured light patterns with proper ILightStripController interface
// These would allow users to easily apply common animation patterns
export type PreconfiguredLightPattern = {
  name: string;
  pattern: (lightStrip: ILightStripController) => void;
};
