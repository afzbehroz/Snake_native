// utility/EatFruite.js

export const EatFruite = (snakeHead, foodPosition) => {
    return snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y;
  };
  