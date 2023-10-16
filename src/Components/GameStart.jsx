import { useEffect, useRef, useState } from "react";
import {
  CANVAS_SIZE,
  SNAKE_START,
  FOOD_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "../Assests/constants";
import { useInterval } from "../Assests/useInterval";
import styled from "styled-components";
import {motion} from 'framer-motion'

const GameStart = () => {
  let canvasRef = useRef();
  let [snake, setSnake] = useState(SNAKE_START);
  let [food, setFood] = useState(FOOD_START);
  let [direction, setDirection] = useState([0, -1]);
  let [speed, setSpeed] = useState(null);
  let [gameOver, setGameOver] = useState(false);
  let [gameStarted,setGameStarted] = useState(true)
  let [score,setSore] = useState(0)

  let startGame = () => { //whenver user click on start button this will trigger
    setSnake(SNAKE_START);
    setFood(FOOD_START);
    setDirection(0, -1);
    setSpeed(SPEED);
    setGameOver(false);
    setSore(0)
  };

  let endGame = () => { // used to end the game
    setSpeed(null);
    setGameOver(true);
  };

  //moving the snake based on keycode that user clicks only arrow will work
  let moveSnake = ({ keyCode }) => (
    keyCode >= 37 && keyCode <= 40 && setDirection(DIRECTIONS[keyCode])
  ) 
     
  
  //this func will creates food at random locations in the canvas
  let createFood = () => (
    food.map((e, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)))
  )
    
  //here we are checking collisions that happens with the head of snake to the walls on both x , y-axis
  let checkCollison = (head, snk = snake) => {
    if (
      head[0] * SCALE >= CANVAS_SIZE[0] ||
      head[0] < 0 ||
      head[1] * SCALE >= CANVAS_SIZE[1] ||
      head[1] < 0
    ) {
      return true;
    }

    for (let segment of snk) {
      if (head[0] === segment[0] && head[1] === segment[1]) {
        return true;
      }
    }

    return false;
  };

  //this will check wheather the snake at the food or not if yes this will call the create food func and make new food
  let checkFoodCollison = (newSnake) => {
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newFood = createFood();
      while (checkCollison(newFood, newSnake)) { //this will call createfood until snake make the collison
        newFood = createFood();
      }
      setSore(score => score+1)
      setFood(newFood);
      return true;
    }

    return false;
  };

  //here we are making the copy of the snake and checking collisons and foodcollisons and making changes to the
  //snake size
  let gameLoop = () => {
    let snakeCopy = JSON.parse(JSON.stringify(snake));
    let newSnakeHead = [
      snakeCopy[0][0] + direction[0],
      snakeCopy[0][1] + direction[1],
    ];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollison(newSnakeHead)) endGame();
    if (!checkFoodCollison(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  //this trigger whenver snake,food,gameover will change
  //this will give the current references of the snake, food
  useEffect(() => {
    let context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    context.fillStyle = "pink";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "lightblue";
    context.fillRect(food[0], food[1], 1, 1);
  }, [snake, food, gameOver]);

  //making call to the use interval func
  useInterval(() => gameLoop(), speed);

  return (
    <GameContainer role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
        <div>
        <h1 style={{padding:'0.8rem'}}>Snake Game</h1>
        <canvas
          style={{ border: "5px solid black" }}
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
      </div>
      <div className="buttonsContainer">
      {gameOver && (
        <div>
          <motion.h1
          style={{width:'100%'}}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}>Game Over!</motion.h1>
        </div>
      )}
      <motion.h2
       style={{width:'100%'}}
       initial={{ opacity: 0, x: -50 }}
       whileInView={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.5, delay: 0.5 }}>Score : {score}</motion.h2>
      <motion.button
      style={{width:'100%'}}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      onClick={startGame}>start game</motion.button>
      </div>
    </GameContainer>
  );
};

export default GameStart;

let GameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    .buttonsContainer{
        padding: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3rem;
        button{
            padding: 0.5rem 1rem;
            font-size: 1.2rem;
            border: 1px solid black;
            border-radius: 0.5rem;
        }
    }
`