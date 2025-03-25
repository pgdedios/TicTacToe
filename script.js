let board = document.getElementById("board");
let buttons = document.getElementById("buttons");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let reset = document.getElementById("reset");
let winner1 = document.getElementById("winner1");
let winner2 = document.getElementById("winner2");
let gameDraw = document.getElementById("gameDraw");
let playerTurn = document.getElementById("playerTurn");
let xScore = document.getElementById("xScore");
let oScore = document.getElementById("oScore");
let xButton = document.getElementById("xButton");
let oButton = document.getElementById("oButton");
let startPage = document.getElementById("startPage")

let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let state = [[
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]]

let moves = 0;

let xWin = 0

let oWin = 0

xScore.innerHTML = xWin;

oScore.innerHTML = oWin;


function gameStart(){
    xButton.addEventListener("click", () => {
        choice = true;
        startPage.classList.add("hide");
        startingPlayer()
    })
    oButton.addEventListener("click", () => {
        choice = false;
        startPage.classList.add("hide");
        startingPlayer()
    })

}

function startingPlayer(){
    if(choice){
        playerTurn1 = true;
        playerTurn.innerHTML = "X is playing"
        playerTurn.style.color = "white";
        playerTurn.style.backgroundColor = "rgb(15, 82, 158)";
        playerTurn.style.borderColor = "rgb(15, 82, 158)";
    }
    if (!choice){
        playerTurn1 = false;
        playerTurn.innerHTML = "O is playing";
        playerTurn.style.color = "rgb(15, 82, 158)";
        playerTurn.style.backgroundColor = "white";
        playerTurn.style.borderColor = "rgb(15, 82, 158)";
    }
}

function createBoard(){
    for(let i = 0; i < 9; i++){
        let tictactoeGrid = document.createElement("div");
        tictactoeGrid.classList.add("tictactoeBox");
        let gridId = `box${i}`;
        tictactoeGrid.setAttribute("id", gridId);
        board.appendChild(tictactoeGrid);
        tictactoeGrid.addEventListener("click", () => {
            addMove(gridId, i);
        });
    }
}

function addMove(element, boxNumber){
    moves++;
    let specificGrid = document.getElementById(element);
    if(!specificGrid.textContent){
        if(playerTurn1){
            specificGrid.textContent = "X";
            specificGrid.style.pointerEvents = "none";
            specificGrid.style.color = "red";
            playerTurn1 = false;
            playerTurn.innerHTML = "O is playing";
            playerTurn.style.color = "rgb(15, 82, 158)";
            playerTurn.style.backgroundColor = "white";
            playerTurn.style.borderColor = "rgb(15, 82, 158)";
        } else {
            specificGrid.textContent = "O";
            specificGrid.style.pointerEvents = "none";
            specificGrid.style.color = "black"
            playerTurn1 = true;
            playerTurn.innerHTML = "X is playing"
            playerTurn.style.color = "white";
            playerTurn.style.backgroundColor = "rgb(15, 82, 158)";
            playerTurn.style.borderColor = "rgb(15, 82, 158)";
        }
    }
    updateBoard(specificGrid, boxNumber);
}


function updateBoard(element, boxNumber){
    let row = Math.floor(boxNumber/3);
    let column = boxNumber%3;
    gameBoard[row][column] = element.innerText;
    updateState(gameBoard);
}

function updateState(boardCopy){
    const newBoard = [];
    for(let i = 0; i<boardCopy.length; i++){
        const row = [];
        for(let j = 0; j<boardCopy[i].length; j++){
            row.push(boardCopy[i][j]);
        }
        newBoard.push(row);
    }

    state.push(newBoard);
    console.log(state);
    checkEndGame();
}

function checkEndGame(){

    if(gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][0] === gameBoard[0][2] && gameBoard[0][0] === 'X') {
        player1Wins();
    } else if(gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][0] === gameBoard[1][2] && gameBoard[1][0] === 'X') {
        player1Wins();
    } else if(gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][0] === gameBoard[2][2] && gameBoard[2][0] === 'X') {
        player1Wins();
    } else if(gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][0] === gameBoard[0][2] && gameBoard[0][0] === 'O') {
        player2Wins();
    } else if(gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][0] === gameBoard[1][2] && gameBoard[1][0] === 'O') {
        player2Wins();
    } else if(gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][0] === gameBoard[2][2] && gameBoard[2][0] === 'O') {
        player2Wins();
    } 

    else if(gameBoard[0][0] === gameBoard[1][0] && gameBoard[0][0] === gameBoard[2][0] && gameBoard[0][0] === 'X') {
        player1Wins();
    } else if(gameBoard[0][1] === gameBoard[1][1] && gameBoard[0][1] === gameBoard[2][1] && gameBoard[0][1] === 'X') {
        player1Wins();
    } else if(gameBoard[0][2] === gameBoard[1][2] && gameBoard[0][2] === gameBoard[2][2] && gameBoard[0][2] === 'X') {
        player1Wins();
    } else if(gameBoard[0][0] === gameBoard[1][0] && gameBoard[0][0] === gameBoard[2][0] && gameBoard[0][0] === 'O') {
        player2Wins();
    } else if(gameBoard[0][1] === gameBoard[1][1] && gameBoard[0][1] === gameBoard[2][1] && gameBoard[0][1] === 'O') {
        player2Wins();
    } else if(gameBoard[0][2] === gameBoard[1][2] && gameBoard[0][2] === gameBoard[2][2] && gameBoard[0][2] === 'O') {
        player2Wins();
    } 

    else if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2] && gameBoard[0][0] === 'X') {
        player1Wins();
    } else if(gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0] && gameBoard[0][2] === 'X') {
        player1Wins();
    } else if(gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2] && gameBoard[0][0] === 'O') {
        player2Wins();
    } else if(gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0] && gameBoard[0][2] === 'O') {
        player2Wins();
    }

    else if(moves === 9){
        draw();
    }
}

function player1Wins() {
    buttons.classList.remove("hide");
    winner1.classList.remove("hide");
    clickDisable();
    buttonFunction();
    xWin++
    xScore.innerHTML = xWin;
    playerTurn.style.color = "lightgray"
    playerTurn.style.backgroundColor = "white";
    playerTurn.style.borderColor = "white";
    playerTurn.innerHTML = "You are currently viewing the game history."
}

function player2Wins() {
    buttons.classList.remove("hide");
    winner2.classList.remove("hide");
    clickDisable();
    buttonFunction();
    oWin++
    oScore.innerHTML = oWin;
    playerTurn.style.color = "lightgray"
    playerTurn.style.backgroundColor = "white";
    playerTurn.style.borderColor = "white";
    playerTurn.innerHTML = "You are currently viewing the game history."
}

function draw() {
    buttons.classList.remove("hide");
    gameDraw.classList.remove("hide");
    clickDisable();
    buttonFunction();
    playerTurn.style.color = "lightgray"
    playerTurn.style.backgroundColor = "white";
    playerTurn.style.borderColor = "white";
    playerTurn.innerHTML = "You are currently viewing the game history."
}

function clickDisable() {
    for(let i = 0; i < 9; i++){
        document.getElementById(`box${i}`).style.pointerEvents = "none";
    }
}

function reflectBoard(index){
    let tempBoard = state[index];
    let moveString = [];
    for(let i = 0; i<tempBoard.length; i++){
        for(let j = 0; j<tempBoard[i].length; j++){
            moveString.push(tempBoard[i][j]);
        }
    }

    for(let grid = 0; grid < moveString.length; grid++){
        document.getElementById(`box${grid}`).textContent = moveString[grid];
    }
}

function buttonFunction() {
    let stateIndex = moves;
    next.disabled = true;
    prev.addEventListener("click", () => {
        reflectBoard(--stateIndex);
        console.log(stateIndex)
        if(stateIndex === 0) {
            prev.disabled = true;   
        } else if (stateIndex === state.length - 1) {
            next.disabled = true;
        } else {
            prev.disabled = false;
            next.disabled = false;
        }
        }
    );
    next.addEventListener("click", () => {
        reflectBoard(++stateIndex);
        console.log(stateIndex);
        if(stateIndex === 0) {
            prev.disabled = true;   
        } else if (stateIndex === state.length - 1) {
            next.disabled = true;
        } else {
            prev.disabled = false;
            next.disabled = false;
        }
        }
    )
    reset.addEventListener("click", () => {

        buttons.classList.add("hide");
        winner1.classList.add("hide");
        winner2.classList.add("hide");
        gameDraw.classList.add("hide");
        playerTurn1 = true;
        moves = 0;

        console.log(moves);

        for(let i = 0; i < 9; i++){
            document.getElementById(`box${i}`).innerHTML = "";
            document.getElementById(`box${i}`).style.pointerEvents = "auto";
        }

        for(let i = 0; i<gameBoard.length; i++){
            for(let j = 0; j<gameBoard[i].length; j++){
                gameBoard[i][j] = '';
            }
        }

        for (let i = state.length-1; i >= 1; i--) {
            state.pop();
        }
        
        startingPlayer();

    })

}

createBoard();
gameStart();