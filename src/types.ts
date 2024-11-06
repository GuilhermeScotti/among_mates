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
