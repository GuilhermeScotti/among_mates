export interface Mate {
  id: number;
  created_at: string;
  name: string;
  color: MateColor;
  class: MateClass;
}

export enum MateColor {
  RED = "red",
  BLUE = "blue",
  GREEN = "green",
  YELLOW = "yellow",
  PURPLE = "purple",
  ORANGE = "orange",
}

export enum MateClass {
  COWBOY = "cowboy",
  ROBOT = "robot",
  PIRATE = "pirate",
  CHEF = "chef",
}

export const INITIAL_MATE: Mate = {
  id: 0,
  created_at: new Date().toISOString(),
  name: "",
  color: MateColor.RED,
  class: MateClass.COWBOY,
};

export const CLASS_ALLOWED_COLORS: Record<MateClass, MateColor[]> = {
  [MateClass.COWBOY]: [MateColor.RED, MateColor.ORANGE],
  [MateClass.ROBOT]: [MateColor.BLUE, MateColor.PURPLE],
  [MateClass.PIRATE]: [MateColor.GREEN, MateColor.YELLOW],
  [MateClass.CHEF]: [MateColor.YELLOW, MateColor.GREEN],
};

export interface ColorPercentages {
  [MateColor.RED]: number;
  [MateColor.BLUE]: number;
  [MateColor.GREEN]: number;
  [MateColor.YELLOW]: number;
  [MateColor.PURPLE]: number;
  [MateColor.ORANGE]: number;
}
