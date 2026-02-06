const input = document.getElementById("input");
const guessBtn = document.getElementById("guessBtn");
const result = document.getElementById("para");
const startBtn = document.getElementById("startBtn");
const startBoard = document.querySelector(".start");
const gameBoard = document.querySelector(".game");
const restartBoard = document.querySelector(".restart");
const restartBtn = document.getElementById("restartBtn");
const resultHeader = document.getElementById("resultHeader");
const resultPara = document.getElementById("resultPara");
const resultNum = document.getElementById('resultNum');
const countAtempt = document.getElementById('count')

let number = 0;
let attemp = 0;
let disable = false;
let lastGuess = null;
let lefatemp;



input.addEventListener("input", function () {
  let value = parseInt(this.value);
  if (isNaN(value)) {
    this.value = "";
    return;
  }
  if (value < 1) this.value = 1;
  if (value > 100) this.value = 100;
});

function num() {
  let guess = input.value;

  if (isNaN(guess) || guess == "") {
    return;
  }

  if(guess == lastGuess) {
    result.textContent = "You Already Tried This Number!";
    return;
  }

  lastGuess = guess

  attemp++;

  if (guess > number && guess <= number + 10) {
    result.textContent = "Your Number Is  Little High";
  } else if (guess > number) {
    result.textContent = "Your Number Is Too High";
  } else if (guess < number && guess >= number - 10) {
    result.textContent = "Your Number Is  Little Low";
  } else if (guess < number) {
    result.textContent = "Your Number Is Too Low";
  } else if (guess == number) {
    gameBoard.classList.add("hidden");
    restartBoard.classList.remove("hidden");

    resultHeader.textContent = `Congrats You Won!`;
    resultPara.textContent = `You won between ${attemp} attmepts 🎉🥳 `;
    resultNum.textContent = `The Number is ${number}`;
    attemp = 0;
    generateNum();
    lastGuess = null;
  }
  updateCount();
  resultPage();
}

function generateNum() {
  number = Math.floor(Math.random() * 100) + 1;
}

function starGame() {
  startBoard.classList.add("hidden");
  gameBoard.classList.remove("hidden");

  if (number == "") {
    generateNum();
  }

  //remove console
//   console.log(number);
}

function restartGame() {
  restartBoard.classList.add("hidden");
  gameBoard.classList.remove("hidden");
 
  input.value = "";
  lastGuess = null;
  attemp = 0;

   if (number == "") {
    generateNum();
  }
  //remoce console
//   console.log(number);
}

function resultPage() {
//   console.log(attemp);

  if (attemp === 10) {
    gameBoard.classList.add("hidden");
    restartBoard.classList.remove("hidden");

    resultHeader.textContent = `Game Over!`;
    resultPara.textContent = `You lost limited attempts reached`;
    resultNum.textContent = `The Number is ${number}`;

    attemp = 0;
    generateNum();
    input.value = "";
  }
}

function updateCount(){
  lefatemp = 10 - attemp;
  countAtempt.textContent = lefatemp;
}

restartBtn.addEventListener("click", restartGame);

guessBtn.addEventListener("click", num);

startBtn.addEventListener("click", starGame);
