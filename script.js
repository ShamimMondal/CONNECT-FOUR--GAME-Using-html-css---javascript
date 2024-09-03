const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let board = [];
let gameBoard = document.getElementById('gameBoard');
let message = document.getElementById('message');

// Initialize the board
function initBoard() {
    board = [];
    gameBoard.innerHTML = '';
    for (let r = 0; r < ROWS; r++) {
        board.push(Array(COLS).fill(null));
        for (let c = 0; c < COLS; c++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', handleClick);
            gameBoard.appendChild(cell);
        }
    }
    message.textContent = `Player ${currentPlayer.toUpperCase()}'s turn!`;
}

// Handle cell click
function handleClick(event) {
    let col = event.target.dataset.col;
    let row = getAvailableRow(col);
    if (row !== -1) {
        board[row][col] = currentPlayer;
        let cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add(currentPlayer);

        if (checkWin(row, col)) {
            message.textContent = `Player ${currentPlayer.toUpperCase()} wins!`;
            disableBoard();
        } else {
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            message.textContent = `Player ${currentPlayer.toUpperCase()}'s turn!`;
        }
    }
}

// Get the lowest available row in a column
function getAvailableRow(col) {
    for (let r = ROWS - 1; r >= 0; r--) {
        if (!board[r][col]) {
            return r;
        }
    }
    return -1;
}

// Check for a win
function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, 1, -1)   // Diagonal \
    );
}


function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    let r = row;
    let c = col;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
        r += rowDir;
        c += colDir;
    }
    r = row - rowDir;
    c = col - colDir;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
        r -= rowDir;
        c -= colDir;
    }
    return count >= 4;
}


function disableBoard() {
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}


document.getElementById('restartBtn').addEventListener('click', () => {
    currentPlayer = 'red';
    initBoard();
});

initBoard();