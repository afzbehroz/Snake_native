import * as React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Colors } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import Snake from "../components/Snake";
import Fruites from "../components/Fruites";
import { Direction } from "../types/types";
import { GameOver } from "../utility/GameOver";
import { EatFruite } from "../utility/EatFruite";
import Header from "../components/TopSection"; 

const SNAKE_INITIAL_POSITION = [{ x: 4, y: 10 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 19, yMin: 0, yMax: 37 };
const MOVE_INTERVAL = 60;
const SCORE_INCREMENT = 1;
const INTERPOLATION_STEPS = 10;

const randomFruiteSpawn = (xMax, yMax) => {
  const x = Math.floor(Math.random() * (xMax + 1));
  const y = Math.floor(Math.random() * (yMax + 1));
  return { x, y };
};

export default function Game() {
  const [direction, setDirection] = React.useState(Direction.Right);
  const [snake, setSnake] = React.useState(SNAKE_INITIAL_POSITION);
  const [food, setFood] = React.useState(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        if (!isPaused) {
          if (progress < INTERPOLATION_STEPS - 1) {
            setProgress((prev) => prev + 1);
          } else {
            moveSnake();
            setProgress(0);
          }
        }
      }, MOVE_INTERVAL / INTERPOLATION_STEPS);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused, progress]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead };

    if (GameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(true);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    // Check if snake has eaten the food
    if (EatFruite(newHead, food)) {
      setSnake([newHead, ...snake]);
      setFood(randomFruiteSpawn(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax)); // Spawn fruit at a random position
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const getInterpolatedSnake = () => {
    if (progress === 0) return snake;

    const snakeHead = snake[0];
    const nextHead = { ...snakeHead };

    switch (direction) {
      case Direction.Up:
        nextHead.y -= 1;
        break;
      case Direction.Down:
        nextHead.y += 1;
        break;
      case Direction.Left:
        nextHead.x -= 1;
        break;
      case Direction.Right:
        nextHead.x += 1;
        break;
      default:
        break;
    }

    const interpolatedHead = {
      x:
        snakeHead.x +
        (nextHead.x - snakeHead.x) * (progress / INTERPOLATION_STEPS),
      y:
        snakeHead.y +
        (nextHead.y - snakeHead.y) * (progress / INTERPOLATION_STEPS),
    };

    return [interpolatedHead, ...snake.slice(1)];
  };

  const handleGesture = (event) => {
    const { translationX, translationY } = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right);
      } else {
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          isPaused={isPaused}
          pauseGame={pauseGame}
          reloadGame={reloadGame}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold", // Corrected typo
              color: Colors.primary,
            }}
          >
            {score}
          </Text>
        </Header>

        <View style={styles.boundaries}>
          <Snake snake={getInterpolatedSnake()} />
          <Fruites x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.first,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.first,
    borderWidth: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: Colors.background,
  },
});
