const statusDisplay = document.querySelector('.game-status');
let gameActive = true;
let currentPlayer = "X";
let gamestate = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has Won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gamestate[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gamestate[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleResultValidation() {
    let roundWon = false;
    let winningCombination = [];

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gamestate[winCondition[0]];
        let b = gamestate[winCondition[1]];
        let c = gamestate[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningCombination = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        highlightWinningCells(winningCombination);
        return;
    }

    let roundDraw = !gamestate.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gamestate = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove("winning-cell");
    });
}

function highlightWinningCells(winningCombination) {
    winningCombination.forEach(index => {
        document.querySelectorAll('.cell')[index].classList.add("winning-cell");
    });
}

// Optional: Uncomment and update the path if a service worker is set up
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/pwabuilder-adv-sw.js')
//         .then(() => console.log('Service Worker Registered'))
//         .catch(error => console.error('Service Worker Registration Failed:', error));
// }
