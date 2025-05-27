let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let scores = { X: 0, O: 0 };

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const statusText = document.getElementById("status");
const gameContainer = document.getElementById("game");
const cells = document.querySelectorAll(".cell");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

startBtn.addEventListener("click", () => {
  gameActive = true;
  gameContainer.classList.remove("hidden");
  resetBoard();
  statusText.textContent = "Player X's turn";
});

resetBtn.addEventListener("click", resetBoard);

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      scores[currentPlayer]++;
      updateScores();
      statusText.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (board.every(cell => cell !== "")) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  });
});

function checkWinner() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => (cell.textContent = ""));
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
  gameActive = true;
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}
