const NoughtsAndCrosses = (() => {
  const gameArena = document.querySelector(".game-arena");
  const startMenu = document.querySelector(".start-menu");

  const startGame = () => {
    gameArena.style.display = "grid";
    startMenu.style.display = "none";
    const playerOne = document.getElementById("player-one");
    const playerTwo = document.getElementById("player-two");
  }

  const start = document.querySelector("#start");
  start.addEventListener("click", startGame)

  const scoreboard = document.querySelectorAll(".scoreboard");
  const renderScoreboard = () => {
    
  }

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

  const addMark = () => {
    const squares = document.querySelectorAll(".board-square");
    squares.forEach((square) => {
      square.addEventListener("click", () => {
        const squareIndex = square.getAttribute("data-index");
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

          const imgURL = (mark === "X") ? "./images/delete-cross.png": "./images/moon-hand-drawn-circle.png";
          const markIcon = new Image();
          markIcon.src = imgURL;
          square.appendChild(markIcon);
          square.setAttribute("mark-value", mark);
          PlayerTurn.toggleTurn();
          const winner = checkWinner();
          if (winner !== null) {
            alert(winner);
          }      
        }
      });
    });

  }

  const checkWinner = () => {
    const combinations = [    [0, 1, 2],
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
        return `Player ${gameboard[a]} wins!`;
      }
    }
    return null;
  };
  

const PlayerTurn = (() => {
  let currentTurn = "X";
    
  const toggleTurn = () => {
    currentTurn = (currentTurn === "X") ? "O" : "X";
  }

  const getTurn = () => currentTurn;

  return {
    toggleTurn: toggleTurn,
    getTurn: getTurn,
  }
})();


   

  return {
    startGame: startGame,
    renderGameboard: renderGameboard,
    addMark: addMark,
  }
})();



// To render the gameboard
NoughtsAndCrosses.renderGameboard();
NoughtsAndCrosses.addMark();


  