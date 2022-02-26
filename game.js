const body = document.querySelector("body");
const buttons = document.querySelectorAll(".btn");
const h1 = document.querySelector("h1");
const footer = document.querySelector("footer");

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let highscore = 0;

let GAME_STARTED = false;

if (localStorage.getItem("memory-game-vaibhav") != null) {
  highscore = JSON.parse(localStorage.getItem("memory-game-vaibhav")).highscore;
  footer.innerHTML = `High Score: ${highscore} <br/> Made By Vaib`;
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  const btn = document.getElementById(randomChosenColour);
  btn.classList.add("animate");
  setTimeout(() => {
    btn.classList.remove("animate");
  }, 200);
  level++;
  highscore = Math.max(highscore, level);
  h1.innerHTML = "Level " + level;
  footer.innerHTML = `High Score: ${highscore} <br/> Made By Vaib`;

  // set it to local storage
  localStorage.setItem(
    "memory-game-vaibhav",
    JSON.stringify({ highscore: highscore })
  );
}

buttons.forEach((e) => e.addEventListener("click", handler));

function handler() {
  if (!GAME_STARTED) return;
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern)
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}

function playSound(name) {
  let song = new Audio("sounds/" + name + ".mp3");
  song.play();
}

function animatePress(color) {
  document.querySelector("#" + color).classList.add("pressed");
  setTimeout(() => {
    document.querySelector("#" + color).classList.remove("pressed");
  }, 100);
}

body.addEventListener("keypress", startGame);
body.addEventListener("click", startGame);

function startGame() {
  if (GAME_STARTED) return;
  GAME_STARTED = true;

  level = 0;
  setTimeout(() => {
    nextSequence();
  }, 200);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    gameOver();
  }
  if (currentLevel === gamePattern.length - 1) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
    userClickedPattern = [];
  }
}

function gameOver() {
  let song = new Audio("sounds/wrong.mp3");
  song.play();

  body.classList.add("game-over");
  setTimeout(() => {
    body.classList.remove("game-over");
  }, 200);

  document.querySelector("h1").innerHTML =
    "Game Over, Press Any Key to Restart";
  highscore = Math.max(highscore, level);

  startOver();
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  highscore = Math.max(highscore, level);

  // handle it asynchronously
  setTimeout(() => {
    GAME_STARTED = false;
  }, 1000);
}
