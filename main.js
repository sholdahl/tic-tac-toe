const gameBoard = (() => {
    let positions = ["", "", "", "", "", "", "", "", ""];
    const titleArea = document.querySelector("#title");
    return { positions, titleArea }
})();

const player = (name, symbol) => {
    return { name, symbol }
}
const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");
let gameFlow = {};

const play = (() => {
    const board = gameBoard.positions;
    const boxes = Array.from(document.querySelectorAll(".board-position"));
    let playerCards = Array.from(document.querySelectorAll(".player-title"));

    function addMark() {
        boxes.forEach(box => {
            box.addEventListener("click", markBox)
        });
    };

    function removeListener() {
        boxes.forEach(box => {
            box.removeEventListener("click", markBox)
        });
    }

    addMark();

    function markBox() {
        let boxContent = this.childNodes[0].textContent;
        let boxLocation = this.id[1]
        let activePlayer = document.querySelector(".active").childNodes[0].textContent
        if (boxContent == "") {
            if (activePlayer == "Player 1") {
                gameBoard.positions[boxLocation] = player1.symbol;
            } else {
                gameBoard.positions[boxLocation] = player2.symbol;
            }
            playerCards[0].classList.toggle("active");
            playerCards[1].classList.toggle("active");
            render.renderBoard()
        }
        checkForWinner(activePlayer)
    }

    function checkForWinner(activePlayer) {
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') { removeListener(); gameBoard.titleArea.textContent = `${activePlayer} Wins!`; return };
        if (board[3] === board[4] && board[4] === board[5] && board[3] !== '') { removeListener(); gameBoard.titleArea.textContent = `${activePlayer} Wins!`; return };
        if (board[6] === board[7] && board[7] === board[8] && board[6] !== '') { removeListener(); gameBoard.titleArea.textContent = `${activePlayer} Wins!`; return };
        if (board[0] === board[3] && board[3] === board[6] && board[0] !== '') { removeListener(); gameBoard.titleArea.textContent = `${activePlayer} Wins!`; return };
        if (board[1] === board[4] && board[4] === board[7] && board[1] !== '') { removeListener(); gameBoard.titleArea.textContent = `${activePlayer} Wins!`; return };
        if (board[2] === board[5] && board[5] === board[8] && board[2] !== '') { removeListener(); gameBoard.titleArea.textContent = `${activePlayer} Wins!`; return };
        if (board[0] === board[4] && board[4] === board[8] && board[8] !== '') { removeListener(); gameBoard.titleArea.textContent = `${activePlayer} Wins!`; return };
        if (board[6] === board[4] && board[4] === board[2] && board[6] !== '') { removeListener(); gameBoard.titleArea.textContent = `${activePlayer} Wins!`; return };
        if (board[0] !== '' && board[1] !== '' && board[2] !== '' && board[3] !== '' && board[4] !== '' && board[5] !== '' && board[6] !== '' && board[7] !== '' && board[8] !== '') { removeListener(); titleArea.textContent = "DRAW!" };
    }

    return { addMark }
})()

const render = (() => {
    const board = gameBoard.positions;

    function renderBoard() {
        for (let i = 0; i < board.length; i++) {
            const box = document.querySelector("#p" + i);
            box.childNodes[0].textContent = board[i];
        }
    };
    return { renderBoard };
})();

const restart = (() => {
    const resetBtn = document.querySelector(".restart-btn");
    let playerCards = Array.from(document.querySelectorAll(".player-title"));
    resetBtn.addEventListener("click", resetBoard);
    function resetBoard() {
        let activePlayer = document.querySelector(".active").childNodes[0].textContent;
        for (let i = 0; i < gameBoard.positions.length; i++) {
            gameBoard.positions[i] = "";
            gameBoard.titleArea.textContent = "Tic-Tac-Toe"
        };
        if(activePlayer == "Player 2") {
            playerCards[0].classList.toggle("active");
            playerCards[1].classList.toggle("active");
        }
        render.renderBoard()
        play.addMark()
    }})()



// restart and rename