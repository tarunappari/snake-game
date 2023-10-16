const CANVAS_SIZE = [800, 450];
const SNAKE_START = [
  [0, 0],
  [1, 0],
  [2,0],
  [3,0],
  [4,0]
];
const FOOD_START = [8, 3]; 
const SCALE = 25;
const SPEED = 100; //speed of snake
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

export {
  CANVAS_SIZE,
  SNAKE_START,
  FOOD_START,
  SCALE,
  SPEED,
  DIRECTIONS
};