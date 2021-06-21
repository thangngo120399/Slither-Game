import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Snake from "./components/Snake/Snake.jsx";
import Food from "./components/Food/Food.jsx";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

function App() {
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [food, setFood] = useState(getRandomCoordinates);

  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const clockInterval = setInterval(SnakeMove, speed);
    document.onkeydown = OnKeyDown;
    checkIfOutOfBorders();
    checkIfEat();
    checkIfCollapsed();
    return () => {
      //cleanup
      console.log("Clock cleanup complete");
      clearInterval(clockInterval);
    };
  });

  function initialState() {
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setDirection("RIGHT");
    setFood(getRandomCoordinates());
    setSpeed(100);
  }

  const OnKeyDown = (e) => {
    e = e || window.event;
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 38:
        setDirection("UP");
        break;
      case 40:
        setDirection("DOWN");
        break;
      case 37:
        setDirection("LEFT");
        break;
      case 39:
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  function checkIfOutOfBorders() {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  }

  function checkIfEat() {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] == food[0] && head[1] == food[1]) {
      EnlargeSnake();
      setFood(getRandomCoordinates());
      IncreaseSpeed();
    }
  }

  function EnlargeSnake() {
    let newSnake = [...snakeDots];
    newSnake.unshift([newSnake[0], newSnake[0] - 2]);
    setSnakeDots(newSnake);
  }
  function onGameOver() {
    alert(`Game over, Snake lenght is  ${snakeDots.length}`);
    initialState();
  }

  function checkIfCollapsed() {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
  }

  function IncreaseSpeed() {
    if (speed > 10) {
      setSpeed((speed) => speed - 5);
    }
  }

  function SnakeMove() {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  }

  return (
    <div className="game-area">
      <Snake snakeDot={snakeDots} />
      <Food dot={food} />
    </div>
  );
}

export default App;
