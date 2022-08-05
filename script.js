////////////RULE__BTN/////////
const overlay = document.querySelector(".overlay");
const ruleBtn = document.querySelector(".ruleBtn");
const ruleCloseBtn = document.querySelector(".btnClose");
const playAgainBtn = document.querySelector(".btnPlayAgain");

////////////RULE__BTN/////////
ruleBtn.addEventListener("click", function () {
  console.log("click");
  overlay.classList.remove("hidden");
});
ruleCloseBtn.addEventListener("click", function () {
  overlay.classList.add("hidden");
});

/////////////GAMESTART/////////
const actBox = document.querySelector(".action-box");
const gameStart = document.querySelector(".game");
const actions = document.querySelectorAll(".action");
const userChoice = document.querySelector(".game__user");
const computerChoice = document.querySelector(".game__computer");
const empty = document.querySelector(".empty");

/////////GAME-END////////
const gameEnd = document.querySelector(".game-end");

const gameResult = document.querySelector(".game-end__result-heading");

const values = ["paper", "scissors", "rock"];
const scoreContainer = document.querySelector(".container__score");

const userColorCircle = document.querySelector(".user");

let choosen;
const randomIndex = () => Math.trunc(Math.random() * 3);

/////////////GAMESTART/////////
const renderTemplate = function (parentElement, choice, own = false) {

  const type = own ? "you" : "house"

  const html = `<h2 class="game__heading">
      ${type} picked
    </h2>
    <button class="color-circle  color-circle--${choice} ${type} game__mood " value="paper">
    <div class="circle">
      <img src="images/icon-${choice}.svg" alt="" class="
      action-icons">
    </div>
    </button>`;

  // let choosen
  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("beforeend", html);
};
//////FINDING WINNER/CALCUALTING SCORE
let score = 0;
scoreContainer.textContent = score;
const gameResultFinder = (result) => {
  gameEnd.classList.remove("hidden");
  gameResult.textContent = `You ${result}`;
  if (result === "win") {
    score++;
    scoreContainer.textContent = score;
    console.log(document.querySelector(".you").parentElement)
    document.querySelector(".you").classList.add("shadow");
  } else {
    score = 0;
    scoreContainer.textContent = score;
    console.log(document.querySelector(".you").parentElement)
    document.querySelector(".house").classList.add("shadow");
  }
};
////////////RENDERING ELEMENTS TO HTML/////
let compChoosen = values[randomIndex()];
actions.forEach((action) => {
  action.addEventListener("click", function () {
    actBox.classList.add("hidden");
    gameStart.classList.remove("hidden");
    renderTemplate(userChoice, action.value, true);
    setTimeout(() => {
      empty.classList.add("hidden");
      renderTemplate(computerChoice, compChoosen);
    }, 3000);

    setTimeout(() => {
      if (action.value === "scissors" && compChoosen === "rock") {
        gameResultFinder("lost");
      } else if (action.value === "scissors" && compChoosen === "paper") {
        gameResultFinder("win");
      } else if (action.value === compChoosen) {
        gameEnd.classList.remove("hidden");
        gameResult.textContent = `It is Draw  `;
      } else if (action.value === "rock" && compChoosen === "scissors") {
        gameResultFinder("win");
      } else if (action.value === "rock" && compChoosen === "paper") {
        gameResultFinder("lost");
      } else if (action.value === "paper" && compChoosen === "scissors") {
        gameResultFinder("lost");
      } else if (action.value === "paper" && compChoosen === "rock") {
        gameResultFinder("win");
      }
    }, 3000);

    // console.log(action.value)
  });
});

/////////PLAYAGAIN//////
playAgainBtn.addEventListener("click", function () {
  gameStart.classList.add("hidden");
  actBox.classList.remove("hidden");
  computerChoice.innerHTML = "";
  gameEnd.classList.add("hidden");
  compChoosen = values[randomIndex()];
});
