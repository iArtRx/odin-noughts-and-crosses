const NoughtsAndCrosses = (() => {
  const gameboardDisplay = document.querySelector(".gameboard");
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const renderBoard = () => {
      for (let i = 0; i < gameboard.length; i++) {
          let square = document.createElement("div");
          square.classList.add("board-square");
          square.setAttribute("data-index", i);
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
          square.textContent = mark;
          square.style.color = (mark === "X") ? "#cedcff" : "#ffcede";
          PlayerTurn.toggleTurn();
        }
      });
    });
  }  

  return {
    renderBoard: renderBoard,
    addMark: addMark,
  }
})();

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

// To render the gameboard:
NoughtsAndCrosses.renderBoard();
NoughtsAndCrosses.addMark();

  