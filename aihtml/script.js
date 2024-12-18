let board = ["", "", "", "", "", "", "", "", ""];
let playerTurn = true; // true for player, false for computer
let playerWins = 0;
let computerWins = 0;
let lastStartedByPlayer = true; // Track who started the previous game

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

const cells = document.querySelectorAll(".cell");
const turnMessage = document.getElementById("turnMessage");  // Get the turn message element

function startGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    // Alternate who starts the game
    playerTurn = !lastStartedByPlayer; // If last game was started by the player, computer starts this one
    lastStartedByPlayer = playerTurn;  // Update the lastStartedByPlayer to reflect the current start

    document.getElementById("startGame").disabled = true;
    renderBoard();
    updateTurnMessage();  // Update the message when the game starts

    if (!playerTurn) {
        setTimeout(computerMove, 500);  // Computer moves first if it's the computer's turn
        updateTurnMessage();  // Update the message for computer's turn
    }
}

function resetGame() {
    playerWins = 0;
    computerWins = 0;
    document.getElementById("playerWins").innerText = playerWins;
    document.getElementById("computerWins").innerText = computerWins;
    startGame();
}

function renderBoard() {
    cells.forEach((cell, index) => {
        cell.innerText = board[index];
        cell.style.pointerEvents = board[index] === "" ? "auto" : "none";
    });
}

function updateTurnMessage() {
    if (playerTurn) {
        turnMessage.innerText = "Your turn";
    } else {
        turnMessage.innerText = "Computer's turn";
    }
}

function playerMove(index) {
    if (board[index] === "" && playerTurn) {
        board[index] = "X";
        playerTurn = false;
        renderBoard();
        updateTurnMessage();  // Update the turn message after player's move
        checkWinner();
        if (!gameOver()) {
            setTimeout(computerMove, 500);
            updateTurnMessage();  // Update the message for computer's turn
        }
    }
}

function computerMove() {
    let emptyCells = [];
    board.forEach((cell, index) => {
        if (cell === "") {
            emptyCells.push(index);
        }
    });

    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomMove] = "O";
    playerTurn = true;
    renderBoard();
    updateTurnMessage();  // Update the message for player's turn
    checkWinner();
}

function checkWinner() {
    let winner = null;
    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
        }
    });

    if (winner) {
        if (winner === "X") {
            playerWins++;
            document.getElementById("playerWins").innerText = playerWins;
        } else {
            computerWins++;
            document.getElementById("computerWins").innerText = computerWins;
        }
        alert(winner === "X" ? "You win!" : "Computer wins!");
        setTimeout(startGame, 1000);
    } else if (board.every(cell => cell !== "")) {
        alert("It's a tie!");
        setTimeout(startGame, 1000);
    }
}

function gameOver() {
    return board.every(cell => cell !== "") || winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
