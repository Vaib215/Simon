let buttonColors = ['red','blue','green','yellow']
let gamePattern = []
let userClickedPattern = []
let level=0
function nextSequence() {
    let randomNumber = Math.floor((Math.random()*4))
    let randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)
    let btn = document.getElementById(randomChosenColour)
    playSound(randomChosenColour)
    btn.classList.add('animate')
    setTimeout(() => {
        btn.classList.remove('animate')
    }, 200);
    level++;
    document.querySelector('h1').innerHTML="Level "+level
    // console.log(btn)
}
let buttons = document.querySelectorAll('.btn')
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',handler)
}
function handler(){
    let userChosenColour = this.id
    userClickedPattern.push(userChosenColour)
    // console.log(userClickedPattern)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
}

function playSound(name){
    let song = new Audio('sounds/'+name+'.mp3')
    song.play()
}
function animatePress(color){
    document.querySelector('#'+color).classList.add('pressed')
    setTimeout(() => {
        document.querySelector('#'+color).classList.remove('pressed')
    }, 100);
}
document.addEventListener('keypress',startGame,{once:true})

function startGame(){
    level=0
    setTimeout(() => {
        nextSequence();
    }, 200);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success")
    }
    else{
        console.log("false")
        gameOver()
    }
    if(currentLevel===gamePattern.length-1){
        console.log("end")
        setTimeout(() => {
            nextSequence()
        }, 1000);
        userClickedPattern=[]
    }
}
function gameOver(){
    let song = new Audio('sounds/wrong.mp3')
    song.play();
    document.querySelector("body").classList.add("game-over")
    setTimeout(() => {
        document.querySelector("body").classList.remove("game-over")
    }, 200);
    document.querySelector('h1').innerHTML="Game Over, Press Any Key to Restart"
    startOver();
}
function startOver(){
    gamePattern=[]
    userClickedPattern=[]
    level=0
    document.addEventListener('keypress',startGame,{once:true})
}