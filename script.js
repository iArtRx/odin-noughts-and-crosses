const NoughtsAndCrosses = (() => {
  const gameArena = document.querySelector(".game-arena");
  const startMenu = document.querySelector(".start-menu");
  const playerOne = document.getElementById("player-one");
  const playerTwo = document.getElementById("player-two");
  const endMenu = document.querySelector(".end-menu");
  
  // Function for Start Button.
  const startGame = () => {
    gameArena.style.display = "grid";
    startMenu.style.display = "none";
    PlayerTurn.randomizeTurn();
    renderScoreboard(playerOne, playerTwo);
  }

  document.querySelector("#start").addEventListener("click", startGame);
  
  // Renders Scoreboard, changes icon depending on the active player.
  const renderScoreboard = (playerOne, playerTwo) => {
    document.getElementById("player-one-name").textContent = playerOne.value;
    document.getElementById("player-two-name").textContent = playerTwo.value;

    const activePlayer = PlayerTurn.getTurn();

    let playerOneIcon = document.querySelector("#player-one-score .user-icon");
    let playerTwoIcon = document.querySelector("#player-two-score .user-icon");

    playerOneIcon.src = (activePlayer === "X") ? "./images/user-navy-full.png" : "./images/user-navy.png";
    playerTwoIcon.src = (activePlayer === "X") ? "./images/user-pink.png" : "./images/user-pink-full.png";
  }

  // Initialises gameboard display.
  const gameboardDisplay = document.querySelector(".gameboard");
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const renderGameboard = () => {
      for (let i = 0; i < gameboard.length; i++) {
          let square = document.createElement("div");
          square.classList.add("board-square");
          square.setAttribute("data-index", i);
          square.classList.add("mark-value");
          gameboardDisplay.appendChild(square);
      }
    }
  
  // Variable determines end of game, boolean ensures that gameboard is locked after game has ended.  
  let gameover = false;

  const addMark = () => {  
    document.querySelectorAll(".board-square").forEach((square) => {
      square.addEventListener("click", () => {
        if (!gameover) {
          const squareIndex = square.getAttribute("data-index");
          
          // Check to see if square is occupied, if not then place the active player's mark with animation.
          if (gameboard[squareIndex] == "") {
            const mark = PlayerTurn.getTurn();
            gameboard[squareIndex] = mark;;
            square.animate(
              [
                { transform: "scale(1)" },
                { transform: "scale(1.2)" },
                { transform: "scale(1)" },
              ],
              {
                duration: 300,
                easing: "ease-out",
              }
            );
            
            // Image used to mark player and its folder location.  
            const markURL = (mark === "X") ? "./images/delete-cross.png": "./images/moon-hand-drawn-circle.png";
            const markIcon = new Image();
            markIcon.src = markURL;
            square.appendChild(markIcon);
            square.setAttribute("mark-value", mark);
            
            // Toggle player turn and updates the scoreboard to indicate this.
            PlayerTurn.toggleTurn();
            renderScoreboard(playerOne, playerTwo);
            
            // Check result and displays appropitate message.
            const winner = checkWinner();
            const resultDisplay = document.querySelector(".result-display");
            const winnerMark = gameboard[winner[0]];
  
            if (winner === "Draw") {
              resultDisplay.innerHTML = "It's a Draw!";
              gameover = true;
            }
            else
            {   
                const winnerString = "The Winner was";
                resultDisplay.innerHTML = (winnerMark === "X") ? `${winnerString} ${playerOne.value}!` : `${winnerString} ${playerTwo.value}!`;

                // Iterates winning combination, selects square by data-index and adds a class based on victory mark.
                for (let index of winner) {
                  const winSquare = document.querySelector(`[data-index="${index}"]`);
                  winSquare.classList.add((winnerMark === "X" ? "winner-navy" : "winner-pink"));
                }
                gameover = true;
            }

            endMenu.style.display = "flex";
            
            document.querySelector("#replay").addEventListener("click", restart);
            document.querySelector("#return-main").addEventListener("click", returnToMain);

          }      
        }
      });
    });
  }
  
  const restart = () => {
    // Reset the gameboard to remove winner classes and values for all squares
    document.querySelectorAll('.board-square').forEach((square) => {
      square.innerHTML = '';
      square.setAttribute('mark-value', '');
      square.classList.remove("winner-navy", "winner-pink")
    });
    gameboard = ['', '', '', '', '', '', '', '', ''];
    gameover = false;
    
    // Clear the result display and hide buttons
    const resultDisplay = document.querySelector('.result-display');
    resultDisplay.innerHTML = '';
    endMenu.style.display = 'none';
  
    // Reset and randomise turn order
    PlayerTurn.resetTurn();
    PlayerTurn.randomizeTurn();

    renderScoreboard(playerOne, playerTwo);
  }

  const returnToMain = () => {
    restart();
    gameArena.style.display = "none";
    startMenu.style.display = "flex";
  }
  
    const checkWinner = () => {
    const combinations = [    
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i];
      if (gameboard[a] !== "" && gameboard[a] === gameboard[b] && gameboard[b] === gameboard[c]) {
        return combinations[i];
      }
    }
    return gameboard.every((square) => square !== "") ? "Draw" : null;
  };
  

  const PlayerTurn = (() => {
    let currentTurn = "X";
      
    const toggleTurn = () => {
      currentTurn = (currentTurn === "X") ? "O" : "X";
    }
  
    const getTurn = () => currentTurn;
  
    const resetTurn = () => turn = "X";
  
    const randomizeTurn = () => {
      currentTurn = (Math.random() < 0.5) ? "X" : "O";
    }
  
    return {
      toggleTurn: toggleTurn,
      getTurn: getTurn,
      resetTurn: resetTurn,
      randomizeTurn: randomizeTurn
    }
  })();
  

  return {
    startGame: startGame,
    renderGameboard: renderGameboard,
    addMark: addMark,
    renderScoreboard : renderScoreboard,
  }
})();

// Render Gameboard and initialise addMark function
NoughtsAndCrosses.renderGameboard();
NoughtsAndCrosses.addMark();

  