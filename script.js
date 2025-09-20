const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");

//grid color
ctx.strokeStyle = "#ddd";
ctx.lineWidth = 1;

const size = 20;
let snake = [
  { x: 100, y: 100, width: size, height: size },
  { x: 80, y: 100, width: size, height: size },
  { x: 60, y: 100, width: size, height: size },
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let food = {
  x: getRandomInt(0, canvas.width / size - 1) * size,
  y: getRandomInt(0, canvas.height / size - 1) * size,
  width: size,
  height: size,
};

let dx = size;
let dy = 0;

let score = 0;
let isOver = false;

function draw() {
  //reset screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();

  //draw snake
  ctx.fillStyle = "green";
  snake.forEach((obj) => {
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
  });

  //draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, food.width, food.height);

  //GameOver
  if (isOver) {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(
      "Press Space To Restart",
      canvas.width / 2 - 100,
      canvas.height / 2 + 50
    );
  }
}

function drawGrid() {
  for (let x = size; x < canvas.width; x += size) {
    ctx.beginPath();
    ctx.moveTo(x, size);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += size) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function move() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" && dy === 0) {
      dx = 0;
      dy = size;
    }
    if (e.key === "ArrowUp" && dy === 0) {
      dx = 0;
      dy = -size;
    }
    if (e.key === "ArrowLeft" && dx === 0) {
      dx = -size;
      dy = 0;
    }
    if (e.key === "ArrowRight" && dx === 0) {
      dx = size;
      dy = 0;
    }
  });
}
move();

function restart() {
  clearInterval(Interval);

  if (isOver) isOver = false;
  snake = [
    { x: 100, y: 100, width: size, height: size },
    { x: 80, y: 100, width: size, height: size },
    { x: 60, y: 100, width: size, height: size },
  ];
  food = {
    x: getRandomInt(0, canvas.width / size - 1) * size,
    y: getRandomInt(0, canvas.height / size - 1) * size,
    width: size,
    height: size,
  };
  dx = size;
  dy = 0;

  Interval = setInterval(loop, 100);
  isOver = false;
  score = 0;
}

document.addEventListener("keydown", (e) => {
  if (isOver && e.code === "Space") {
    restart();
  }
});

function update() {
  if (isOver) return;
  let newHead = {
    x: snake[0].x + dx,
    y: snake[0].y + dy,
    width: size,
    height: size,
  };

  for (let i = 0; i < snake.length; i++) {
    //Condition to check gameOver
    if (
      newHead.x < 0 ||
      newHead.x >= canvas.width ||
      newHead.y < 0 ||
      newHead.y >= canvas.height ||
      (snake[i].x === newHead.x && snake[i].y === newHead.y)
    ) {
      isOver = true;
      clearInterval(Interval);
      return;
    }
  }

  //Add snake head and tail
  snake.unshift(newHead);
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    food = {
      x: getRandomInt(0, canvas.width / size - 1) * size,
      y: getRandomInt(0, canvas.height / size - 1) * size,
      width: size,
      height: size,
    };
  } else snake.pop();
  //Collision
  // if(newHead.){

  // }
}

let Interval = setInterval(loop, 100);

function loop() {
  if (!isOver) {
    update();
  }

  draw();
}
