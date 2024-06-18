// utility/GameOver.js

export const GameOver = (snakeHead, bounds) => {
    return (
      snakeHead.x < bounds.xMin ||
      snakeHead.x > bounds.xMax ||
      snakeHead.y < bounds.yMin ||
      snakeHead.y > bounds.yMax
    );
  };
  