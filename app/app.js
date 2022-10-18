// you !!! or me .....
class Player {
  constructor() {
    //   select options from div containing rock, paper, or scissors
    this.options = document.querySelectorAll("svg");
    this.playerChoice = "";
  }
  definePlayerChoice() {
    this.options.forEach((option) => {
      option.addEventListener("click", (e) => {
        this.options.forEach((option) => option.classList.remove("selected"));
        e.target.classList.add("selected");
        this.playerChoice = e.target.dataset.option;
      });
      return this.playerChoice;
    });
  }
}

// computer player class
class Computer {
  constructor() {
    this.options = ["paper", "rock", "scissors"];
    this.compChoice = "";
  }
  // randomly decide what comp chooses from options array
  defineCompChoice() {
    this.compChoice =
      this.options[Math.floor(Math.random() * this.options.length)];
    //   display choice
    document.querySelector(".ai-choice").textContent = this.compChoice;
    return this.compChoice;
  }
}

// results class
class Result {
  constructor() {
    this.result = "";
  }
  defineResult(playerChoice, compChoice) {
    //   if player and comp chose same, result is draw
    if (playerChoice === compChoice) {
      this.result = "draw";
      return;
      // if player chose paper...
    } else if (playerChoice === "paper") {
      // if comp chose rock, player won, else player lost
      compChoice === "rock" ? (this.result = "win") : (this.result = "loss");

      // if player chose rock ...
    } else if (playerChoice === "rock") {
      // if comp chose scissors, player won, else player lost
      compChoice === "scissors"
        ? (this.result = "win")
        : (this.result = "loss");

      // if player chose scissors...
    } else if (playerChoice === "scissors") {
      // if comp chose paper, player won, else player lost
      compChoice === "paper" ? (this.result = "win") : (this.result = "loss");
    }
    return this.result;
  }

  showStats(result) {
    const winner = document.querySelector(".winner");
    if (result === "win") {
      winner.textContent = "you!!";
    } else if (result === "loss") {
      winner.textContent = "computer /:";
    } else if (result === "draw") {
      winner.textContent = "it's a tie!";
    }
  }
}

// game class
class Game {
  constructor() {
    this.player = new Player();
    this.comp = new Computer();
    this.result = new Result();
    this.gameStats = new Result();

    this.startGameBtn = document.querySelector(".start");
    this.restartGameBtn = document.querySelector(".restart");
    this.playerChoice = document.querySelector(".your-choice");
    this.aiChoice = document.querySelector(".ai-choice");
  }

  // start game
  startGame() {
    const { player, comp, result } = this;
    player.definePlayerChoice();

    // on button click
    this.startGameBtn.addEventListener("click", () => {
      // if nothing chosen, alert player to choose
      if (!player.playerChoice) return alert("please choose one!");

      // show choices made
      this.playerChoice.textContent = player.playerChoice;
      comp.defineCompChoice();
      result.defineResult(player.playerChoice, comp.compChoice);
      player.playerChoice = "";
      player.options.forEach((option) => option.classList.remove("selected"));
      result.showStats(result.result);
    });

    // restart
    this.restartGameBtn.addEventListener("click", () => {
      let { aiChoice, playerChoice } = this;
      const whoWin = document.querySelector(".winner");

      result.showStats();

      whoWin.textContent = "";
      aiChoice.textContent = "";
      playerChoice.textContent = "";
      document.querySelector(".selected").classList.remove("selected");
    });
  }
}
const game = new Game();
game.startGame();
