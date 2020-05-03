const GAME = document.getElementById("canvas");
const CTX = GAME.getContext("2d");

const GROUND = new Image();
GROUND.src = "img/ground.png";

const HEAD = new Image();
HEAD.src = "img/head.png";

const FOOD = new Image();
FOOD.src = "img/food.png";

const CAPS = new Image();
CAPS.src = "img/caps.png";

const xBegin = 42;
const yBegin = 123;

let box = 41;
let score = 0;
let capsuleCount = 0;

let food = {
x: xBegin + Math.floor(Math.random() * 17 ) * box,
y: yBegin + Math.floor(Math.random() * 15 ) * box
}

let capsule = {
x: xBegin + Math.floor(Math.random() * 17 ) * box,
y: yBegin + Math.floor(Math.random() * 15 ) * box
}

document.addEventListener("keydown", direction);
let dir;

function sound(src) {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = src; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}

function direction(event)
  {
      if(event.keyCode == 37 && dir != "right") dir = "left";
      if(event.keyCode == 38 && dir != "down")  dir = "up";
      if(event.keyCode == 39 && dir != "left")  dir = "right";
      if(event.keyCode == 40 && dir != "up")    dir = "down";
  }

function eatTail(headArr, array)
    {
      for(let i = 0; i < array.length; i++)
        {
          if( headArr.x == array[i].x && headArr.y == array[i].y )
            {
               clearInterval(interval);
               alert("ПОЗОР AND SHAME");
            }
        }
    }

function drawGame(){
  CTX.drawImage(GROUND, 0, 0);
  CTX.drawImage(FOOD, food.x, food.y);
  CTX.drawImage(HEAD, snake[0].x, snake[0].y);

  for(let i = 1; i < snake.length; i++)
    {
      CTX.fillStyle = "white";
      CTX.fillRect(snake[i].x, snake[i].y, box, box);
    }
  CTX.fillStyle = "white";
  CTX.font = "50px Lato Bold";
  CTX.fillText(score + " score", box * 3, box * 1.5);
  CTX.fillText(capsuleCount + " caps.", box * 12, box * 1.5);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;


  if(snakeX == food.x && snakeY == food.y)
    {
      sound("sound/cov19.mp3");
      score++;
      food = {
              x: xBegin + Math.floor(Math.random() * 17 ) * box,
              y: yBegin + Math.floor(Math.random() * 15 ) * box
            }
    }
    else{
      snake.pop();
    }

    if(capsuleCount == score) CTX.drawImage(CAPS, capsule.x, capsule.y);
    if(score > capsuleCount)
    {
        clearInterval(interval);
        alert("COVID 19 WIN! ПОЗОР AND SHAME\nCapsules should be more than score");
     }
    if(snakeX == capsule.x && snakeY == capsule.y)
        {
            capsuleCount++;
            sound("sound/caps.mp3");
        }

    if(snakeX <= 0 || snakeX > box * 19 || snakeY > box * 18 || snakeY < box * 2)
      {
            clearInterval(interval); alert("ПОЗОР AND SHAME");
      }

  if(dir == "left")   snakeX  -=  box;
  if(dir == "right")  snakeX  +=  box;
  if(dir == "up")     snakeY  -=  box;
  if(dir == "down")   snakeY  +=  box;

  let newHead =
      {
        x: snakeX,
        y: snakeY
      }

   eatTail(newHead, snake);
   snake.unshift(newHead);
}

let interval = setInterval(drawGame, 100);

let snake = [];
snake[0] = {
  x: 10 * box + xBegin,
  y: 12 * box + yBegin
};

//alert('HELLO WORLD');
