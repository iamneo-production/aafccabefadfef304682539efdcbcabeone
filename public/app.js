// JavaScript code for the Tic Tac Toe game
let currentPlayer = 'X';
const board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function handleMove(cell, index) {
    if (!cell.textContent && !gameOver) {
        cell.textContent = currentPlayer;
        board[index] = currentPlayer;

        if (checkWin() || checkDraw()) {
            displayResult();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnText();
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            return true;
        }
    }

    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function displayResult() {
    const resultContainer = document.querySelector('.result-container');
    if (checkWin()) {
        resultContainer.textContent = `Player ${currentPlayer} wins!`;
    } else {
        resultContainer.textContent = "It's a draw!";
    }
}

function updateTurnText() {
    const resultContainer = document.querySelector('.result-container');
    resultContainer.textContent = `Player ${currentPlayer}'s turn`;
}

const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleMove(cell, index);
    });
});

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    cells.forEach(cell => (cell.textContent = ''));
    board.fill('');
    currentPlayer = 'X';
    gameOver = false;
    updateTurnText();
    document.querySelector('.result-container').textContent = "Let's play!";
});