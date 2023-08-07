const canvas = document.querySelector(".canvas");
const c = canvas.getContext("2d");
canvas.width = 392;
canvas.height = 720;
const body = document.querySelector("body");
const hitSound = document.querySelector(".hit-sound");
const jumpSound = document.querySelector(".jump-sound");
const scoreSound = document.querySelector(".score-sound");
const dieSound = document.querySelector(".die-sound");
const counter = document.querySelector(".counter");
const retryBtn = document.querySelector(".retry");
const deathScreen = document.querySelector(".death");
const record = document.querySelector(".record");
retryBtn.onclick = retry;
const startScreen = document.querySelector(".start-screen");
const btnStart = document.querySelector(".btn-start");
btnStart.onclick = start;
let gravity = 0;
let score = 0;
let random = 0;
let velocity = 2;
let isDeadTrue = 0;
let isGameStart = false;
backgroundImg = new Image();
backgroundImg.src = './assets/images/background.png';
backgroundImg.position = 0;
backgroundImg.velocity = 1;
groundImg = new Image();
groundImg.src = './assets/images/ground.png';
groundImg.position = 0;
groundImg.velocity = 2;
birdImg = new Image();
birdImg.src = './assets/images/bird.png';
birdImg.position = 0;
const columnTopImg = document.querySelector('.column-top');
const columnBottomImg = document.querySelector('.column-bottom');
class Sprite {
   constructor(xPos,yPos,width,height) {
      this.height = height;
      this.width = width;
      this.xPos = xPos;
      this.yPos = yPos;
      this.yVel = 0;
      this.spritePos = 0;
   }
   draw() {
      c.drawImage(columnTopImg, 0, 0, 52, 320, column1.xPosition, column1.yPosition, 52, column1.height);
      c.drawImage(columnBottomImg, 0, 0, 52, 320, column11.xPosition, column11.yPosition, 52, column11.height);
   }
   update() {
      column1.xPosition -= velocity;
      column11.xPosition -= velocity;
      draw();
   }
}
let column111 = new Sprite(400,-100,52,380)
let player = {
  width: 40,
  height: 30,
  xPosition: 176,
  yPosition: 400,
  yVelocity: 0,
};
let column1 = {
  width: 52,
  height: 380,
  xPosition: 400,
  yPosition: -100,
};
let column11 = {
  width: 52,
  height: 380,
  xPosition: 400,
  yPosition: 440,
};
let column2 = {
  width: 52,
  height: 380,
  xPosition: 400,
  yPosition: 0,
};
let column22 = {
  width: 52,
  height: 380,
  xPosition: 400,
  yPosition: 540,
};
let column3 = {
  width: 52,
  height: 380,
  yPosition: -200,
  xPosition: 400,
};
let column33 = {
  width: 52,
  height: 380,
  yPosition: 340,
  xPosition: 400,
};
let column4 = {
  width: 52,
  height: 380,
  xPosition: 636,
  yPosition: -100,
};
let column44 = {
  width: 52,
  height: 380,
  xPosition: 636,
  yPosition: 440,
};
function columnFirst() {
  c.drawImage(columnTopImg, 0, 0, 52, 320, column1.xPosition, column1.yPosition, 52, column1.height);
  c.drawImage(columnBottomImg, 0, 0, 52, 320, column11.xPosition, column11.yPosition, 52, column11.height);
  column1.xPosition -= velocity;
  column11.xPosition -= velocity;
}
function columnSecond() {
  c.drawImage(columnTopImg, 0, 0, 52, 320, column2.xPosition, column2.yPosition, 52, column2.height);
  c.drawImage(columnBottomImg, 0, 0, 52, 320, column22.xPosition, column22.yPosition, 52, column22.height);
  column2.xPosition -= velocity;
  column22.xPosition -= velocity;
}
function columnThird() {
  c.drawImage(columnTopImg, 0, 0, 52, 320, column3.xPosition, column3.yPosition, 52, column3.height);
  c.drawImage(columnBottomImg, 0, 0, 52, 320, column33.xPosition, column33.yPosition, 52, column33.height);
  column3.xPosition -= velocity;
  column33.xPosition -= velocity;
}
function columnFourth() {
   c.drawImage(columnTopImg, 0, 0, 52, 320, column4.xPosition, column4.yPosition, 52, column4.height);
  c.drawImage(columnBottomImg, 0, 0, 52, 320, column44.xPosition, column44.yPosition, 52, column44.height);
  column4.xPosition -= velocity;
  column44.xPosition -= velocity;
}
let functions = [columnFirst, columnSecond, columnThird];
function reset() {
  column1.xPosition = 400;
  column11.xPosition = 400;
  column2.xPosition = 400;
  column22.xPosition = 400;
  column3.xPosition = 400;
  column33.xPosition = 400;
  random = Math.floor(Math.random() * functions.length);
}
function retry() {
  reset();
  score = 0;
  counter.classList.remove("hidden");
  counter.innerHTML = score;
  deathScreen.classList.remove("show");
  player.yPosition = 400;
  velocity = 2;
  groundImg.velocity = 2;
  backgroundImg.velocity = 1;
  player.yVelocity = 0;
  localStorage.setItem('dead', false);
  isDeadTrue = 0;
  column4.xPosition = 600;
  column44.xPosition = 600;
}
function draw() {
  c.drawImage(backgroundImg, 0, 0, 2000, 815, backgroundImg.position, 0, 2000, canvas.height);
  if (startScreen.classList.contains("hidden")) {
    functions[random]();
    columnFourth();
  }
  c.drawImage(groundImg, 0, 0, 2000, 815, groundImg.position, 0, 2000, canvas.height);
  
  c.drawImage(birdImg, birdImg.position, 0, 34, 24, player.xPosition, player.yPosition, 40, 30);
}
function animate() {
  window.requestAnimationFrame(animate);
  player.yPosition += player.yVelocity;
  // background
backgroundImg.position -= backgroundImg.velocity;
  if (backgroundImg.position < -437) {
    backgroundImg.position = 0;
  }
  // ground
  groundImg.position -= groundImg.velocity;
  if (groundImg.position < -437) {
    groundImg.position = 0;
  }
  //give score
  if (column1.xPosition + column1.width < 0 || column2.xPosition + column2.width < 0 || column3.xPosition + column3.width < 0) {
    scoreSound.currentTime = 0;
    reset();
    giveScore();
  }
  if (column4.xPosition + column4.width < 0) {
     scoreSound.currentTime = 0;
     giveScore();
     column4.xPosition = 400;
     column44.xPosition = 400;
  }
  // player movement
  if (player.yPosition <= 0) {
    player.yVelocity = 0;
    player.yPosition = 0;
  }
  if (player.yPosition >= canvas.height - player.height -20) {
    player.yVelocity = 0;
    player.yPosition = canvas.height - player.height -20;
  } else {
    player.yVelocity += gravity;
  }
  // collision & death
  if (player.yPosition <= column1.yPosition + column1.height && player.xPosition + player.width >= column1.xPosition && player.xPosition <= column1.xPosition + column1.width || player.yPosition + player.height >= column11.yPosition && player.xPosition + player.width >= column11.xPosition && player.xPosition <= column11.xPosition + column11.width || player.yPosition <= column2.yPosition + column2.height && player.xPosition + player.width >= column2.xPosition && player.xPosition <= column2.xPosition + column2.width || player.yPosition + player.height >= column22.yPosition && player.xPosition + player.width >= column22.xPosition && player.xPosition <= column22.xPosition + column22.width || player.yPosition <= column3.yPosition + column3.height && player.xPosition + player.width >= column3.xPosition && player.xPosition <= column3.xPosition + column3.width || player.yPosition + player.height >= column33.yPosition && player.xPosition + player.width >= column33.xPosition && player.xPosition <= column33.xPosition + column33.width || player.yPosition <= column4.yPosition + column4.height && player.xPosition + player.width >= column4.xPosition && player.xPosition <= column4.xPosition + column4.width || player.yPosition + player.height >= column44.yPosition && player.xPosition + player.width >= column44.xPosition && player.xPosition <= column44.xPosition + column44.width) {
    death();
  }
  if (deathScreen.classList.contains('show')) {
     death();
  }
  draw();
}
function start() {
  startScreen.classList.add("hidden");
  gravity = 0.4;
  counter.classList.remove("hidden");
  player.xPosition = 40;
}
function death() {
  if (deathScreen.classList.contains("show")) {
    isDeadTrue++;
    if (isDeadTrue === 1) {
      player.yVelocity = -5;
      hitSound.play();
      setTimeout(function() {  
        dieSound.play();
      }, 400);
    };
    backgroundImg.velocity = 0;
    groundImg.velocity = 0;
    velocity = 0;
  };
  counter.classList.add("hidden");
  localStorage.setItem('dead', true);
  deathScreen.classList.add("show");
  document.querySelector(".score").innerHTML = score;
  if (localStorage.getItem("record") === null) {
    localStorage.setItem("record", score);
    record.innerHTML = score;
  } else if (score > localStorage.getItem("record")) {
    localStorage.setItem("record", score);
    record.innerHTML = score;
  } else {
    record.innerHTML = localStorage.getItem("record");
  }
}
function giveScore() {
  if (deathScreen.classList.contains("show")) {
    return;
  }
  score++;
  counter.innerHTML = score;
  scoreSound.play();
}
// bird animation
setInterval(function() {
  if (!deathScreen.classList.contains("show")) {
    birdImg.position += 34;
    if (birdImg.position >= 102) {
      birdImg.position = 0;
    };
  } else {
    birdImg.position = 34;
  }
}, 100);
window.onload = animate;
// jump
body.addEventListener("touchstart", function () {
    if (!deathScreen.classList.contains("show") && startScreen.classList.contains("hidden")) {
      jumpSound.currentTime = 0;
      jumpSound.play();
      player.yVelocity = -7;
    }
  });
