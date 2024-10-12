let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = true;
let isMultiplayer = true;

const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
const modeSelection = document.getElementById("mode-selection");
const gameBoard = document.getElementById("game-board");
const modal = document.getElementById("modal");
const winnerMessage = document.getElementById("winner-message");
const closeModalButton = document.getElementById("close-modal");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Event Listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
closeModalButton.addEventListener("click", closeModal);
document
  .getElementById("multiplayer")
  .addEventListener("click", () => startGame(true));
document
  .getElementById("vs-bot")
  .addEventListener("click", () => startGame(false));

function startGame(multiplayer) {
  isMultiplayer = multiplayer;
  modeSelection.classList.add("hidden");
  gameBoard.classList.remove("hidden");
  restartButton.classList.remove("hidden");
  resetBoard();
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (board[index] || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    showWinner(currentPlayer);
  } else if (board.every((cell) => cell)) {
    showWinner("Draw");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (!isMultiplayer && currentPlayer === "O") {
      setTimeout(aiMove, 1500); // 1.5 second delay for AI move
    }
  }
}

function aiMove() {
  const availableCells = board
    .map((val, index) => (val === null ? index : null))
    .filter((val) => val !== null);
  const randomIndex =
    availableCells[Math.floor(Math.random() * availableCells.length)];
  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";

  if (checkWin()) {
    showWinner("O");
  } else if (board.every((cell) => cell)) {
    showWinner("Draw");
  } else {
    currentPlayer = "X";
  }
}

function checkWin() {
  return winConditions.some((condition) => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function showWinner(winner) {
  isGameActive = false;
  winnerMessage.textContent =
    winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`;
  modal.classList.remove("hidden"); // Show modal
}

function closeModal() {
  modal.classList.add("hidden"); // Hide modal
  restartGame(); // Restart the game after modal is closed
}

function restartGame() {
  resetBoard();
  modeSelection.classList.remove("hidden");
  gameBoard.classList.add("hidden");
  restartButton.classList.add("hidden");
}

function resetBoard() {
  board.fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  isGameActive = true;
}