import { Coordinate } from "../types/types";

export const randomFruiteSpawn = (maxX, maxY) => {
  return {
    x: Math.floor(Math.random() * maxX), // Fixed typo: Math.floor
    y: Math.floor(Math.random() * maxY), // Fixed typo: Math.floor
  };
};
