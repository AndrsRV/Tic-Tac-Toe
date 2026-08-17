const WIN_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

const statusEl = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

function handleCellClick(event) {
    const index = Number(event.target.dataset.index);

    if (gameOver || board[index]) {
        return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winningLine = getWinningLine();

    if (winningLine) {
        gameOver = true;
        statusEl.textContent = `Player ${currentPlayer} wins!`;
        winningLine.forEach(i => cells[i].classList.add('win'));
        return;
    }

    if (board.every(cell => cell)) {
        gameOver = true;
        statusEl.textContent = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
}

function getWinningLine() {
    return WIN_COMBINATIONS.find(([a, b, c]) =>
        board[a] && board[a] === board[b] && board[a] === board[c]
    );
}

function restartGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    statusEl.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
