
const myDOM = (function createDOM() {

    const gridBoard = document.querySelectorAll(".game-board-grid");
    const newGameBtn = document.querySelector(".new-game-btn");
    const winnerContainer = document.querySelector(".winner-container");

    newGameBtn.addEventListener("click", () => {
        gameBoard.newGame();
    })

    gridBoard.forEach(grid => {
        grid.addEventListener("click", (e) => {
            //place corresponding player tile to clicked grid
            if(e.target.children[0].textContent === "" && gameBoard.isGameInProgress() ){
                e.target.children[0].textContent = gameBoard.placeTile(+e.target.getAttribute("id"));
                if(gameBoard.hasWinner()) {
                    winnerContainer.textContent = gameBoard.determineWinner(); 
                }
            }
        })
    })

    return {gridBoard, newGameBtn, winnerContainer};
})();

function createPlayer(isTurn, tile) {

    let playerObj = {
        getTurn() {
            return isTurn;
        }, 

        setTurn(newTurn) {
            isTurn = newTurn;
        },

        getTile() {
            return tile;
        }
    }

    return playerObj;
}

const gameBoard = (function createGameBoard() {
    let gameBoard = new Array(9);
    let gameInProgress = false;

    const playerOne = createPlayer(true, "X");
    const playerTwo = createPlayer(false, "O");

    let gameBoardObj = {
        getGameBoard() {
            return gameBoard;
        },

        isGameInProgress() {
            return gameInProgress;
        },

        placeTile(index) {
            if(playerOne.getTurn() === true) {
                gameBoard[index] = playerOne.getTile(); 
                playerOne.setTurn(false);
                playerTwo.setTurn(true);
                console.log(gameBoard);
                return playerOne.getTile();
            }
            if(playerTwo.getTurn() === true) {
                gameBoard[index] = playerTwo.getTile();
                playerTwo.setTurn(false);
                playerOne.setTurn(true);
                console.log(gameBoard);
                return playerTwo.getTile();
            }
        },

        hasWinner() {
            //horizontal
            for(let i=0; i < 8; i+=3) {
                if (gameBoard[i] !== "") {
                    if ((gameBoard[i] === gameBoard[i + 1]) && (gameBoard[i] === gameBoard[i + 2])) {
                        gameInProgress = false;
                        return true;
                    }
                }
            }

            //vertical
            for(let i=0; i < 3; i++) {
                if(gameBoard[i] !== "") {
                    if((gameBoard[i] === gameBoard[i+3]) && (gameBoard[i] === gameBoard[i+6]) ) {
                        gameInProgress = false;
                        return true;
                    }
                }
            }

            //diagonal
            if(gameBoard[4] !== "") {
                if((gameBoard[0] === gameBoard[4]) && (gameBoard[0] === gameBoard[8]) ) {
                    gameInProgress = false;
                    return true;
                }
                if((gameBoard[2] === gameBoard[4]) && (gameBoard[2] === gameBoard[6]) ) {
                    gameInProgress = false;
                    return true;
                }
            }

            //draw or not
            return gameBoard.every(value => value !== "");

        },

        determineWinner() {
            myDOM.newGameBtn.removeAttribute("disabled");
            //draw
            if(gameBoard.every(value => value !== "" )) return "It is a Draw.";

            //winner's turn will be false since he just placed
            else if (playerOne.getTurn()) return "Player Two Has Won.";
            else return "Player One Has Won.";
        },

        newGame() {

            for(let i=0; i < 9; i++) {
                gameBoard[i] = "";
            }

            myDOM.gridBoard.forEach(grid => {
                grid.children[0].textContent = "";
            })

            myDOM.winnerContainer.textContent = "";
            gameInProgress = true;
            myDOM.newGameBtn.setAttribute("disabled", true);
        }

    }
    return gameBoardObj;
})();
