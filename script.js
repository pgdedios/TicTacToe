// 1. DOM ELEMENT SELECTION

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
const themeToggle = document.getElementById("themeToggle");


// 2. GAME STATE VARIABLES

let gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];
let state = [[['', '', ''], ['', '', ''],	['', '', '']]];
let moves = 0;
let xWin = 0
let oWin = 0
let choice = true;
let playerTurn1 = true;

xScore.innerHTML = xWin;
oScore.innerHTML = oWin;


// 3. THEME TOGGLE LOGIC (Dark/Light Mode)

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
});

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
}


// 4. GAME INITIALIZATION & START SCREEN

// Sets up the click listeners for the "Choose who starts" overlay buttons
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

// Updates the UI to show whose turn it is at the start of a game
function startingPlayer(){
	playerTurn.classList.remove('turn-x', 'turn-o', 'turn-history');

	if(choice){
		playerTurn1 = true;
		playerTurn.innerHTML = "X is playing"
		playerTurn.classList.add('turn-x')
	}
	if (!choice){
		playerTurn1 = false;
		playerTurn.innerHTML = "O is playing";
		playerTurn.classList.add('turn-o');
	}
}


// 5. BOARD CREATION & CLICK HANDLING

// Dynamically generates the 9 cells of the Tic Tac Toe board
function createBoard(){
	for(let i = 0; i < 9; i++){
		let tictactoeGrid = document.createElement("div");
		tictactoeGrid.classList.add("tictactoeBox");
		let gridId = `box${i}`;
		tictactoeGrid.setAttribute("id", gridId);
		board.appendChild(tictactoeGrid);
		tictactoeGrid.addEventListener("click", () => addMove(gridId, i));
	}
}

// Handles what happens when a player clicks on an empty cell
function addMove(element, boxNumber){
	let specificGrid = document.getElementById(element);
	if(!specificGrid.textContent){
		moves++;
		if(playerTurn1){
			specificGrid.textContent = "X";
			specificGrid.classList.add("x-mark"); 
			specificGrid.style.pointerEvents = "none";
			playerTurn1 = false;
			playerTurn.innerHTML = "O is playing";
			playerTurn.classList.remove('turn-x', 'turn-history');
			playerTurn.classList.add('turn-o');
		} else {
			specificGrid.textContent = "O";
			specificGrid.classList.add("o-mark");
			specificGrid.style.pointerEvents = "none";
			playerTurn1 = true;
			playerTurn.innerHTML = "X is playing"
			playerTurn.classList.remove('turn-o', 'turn-history');
			playerTurn.classList.add('turn-x');
		}
	}
	// Update the internal data representations
	updateBoard(specificGrid, boxNumber);
}


// 6. STATE MANAGEMENT

// Translates the 1D click index (0-8) into 2D array coordinates (row/col)
function updateBoard(element, boxNumber){
	let row = Math.floor(boxNumber/3);
	let column = boxNumber%3;
	gameBoard[row][column] = element.innerText;
	updateState(gameBoard);
}

// Creates a deep copy of the current board and pushes it to the history array
function updateState(boardCopy){
	// const newBoard = [];
	// for(let i = 0; i<boardCopy.length; i++){
	// 	const row = [];
	// 	for(let j = 0; j<boardCopy[i].length; j++){
	// 		row.push(boardCopy[i][j]);
	// 	}
	// 	newBoard.push(row);
	// }
	const newBoard = boardCopy.map(row => [...row]);
	state.push(newBoard);
	checkEndGame();
}


// 7. WIN / DRAW DETECTION & HIGHLIGHTING

function checkEndGame(){

	const winConditions = [
			[[0,0], [0,1], [0,2]], [[1,0], [1,1], [1,2]], [[2,0], [2,1], [2,2]], // Rows
			[[0,0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]], // Cols
			[[0,0], [1,1], [2,2]], [[0,2], [1,1], [2,0]]                         // Diagonals
	];

	// Loop through every winning condition
	for (let condition of winConditions) {
		const [a, b, c] = condition;
		const valA = gameBoard[a[0]][a[1]];
		const valB = gameBoard[b[0]][b[1]];
		const valC = gameBoard[c[0]][c[1]];
		
		// Check if all 3 cells match AND are not empty strings
		if (valA && valA === valB && valA === valC) {
			highlightWin(condition); // Visually highlight the winning blocks
			
			if (valA === 'X') player1Wins();
			else player2Wins();
			return; // Exit function immediately since the game is over
		}
	}

	if(moves === 9){
		draw();
	}
}

// Adds a special CSS class to the 3 winning cells to make them glow/pulse
function highlightWin(condition) {
	condition.forEach(coord => {
		const index = coord[0] * 3 + coord[1];
		document.getElementById(`box${index}`).classList.add('winning-cell');
	});
}


// 8. END GAME UI UPDATES

function player1Wins() {
	buttons.classList.remove("hide");
	winner1.classList.remove("hide");
	clickDisable();
	buttonFunction();
	xWin++
	xScore.innerHTML = xWin;
	endGameUI();
}

function player2Wins() {
	buttons.classList.remove("hide");
	winner2.classList.remove("hide");
	clickDisable();
	buttonFunction();
	oWin++
	oScore.innerHTML = oWin;
	endGameUI();
}

function draw() {
	buttons.classList.remove("hide");
	gameDraw.classList.remove("hide");
	clickDisable();
	buttonFunction();
	endGameUI();
}

// Changes the turn indicator to show that the user is now viewing history
function endGameUI() {
	playerTurn.classList.remove('turn-x', 'turn-o');
	playerTurn.classList.add('turn-history');
	playerTurn.innerHTML = "Viewing game history";
}

// Disables clicking on the board cells once the game is over
function clickDisable() {
	for(let i = 0; i < 9; i++){
		document.getElementById(`box${i}`).style.pointerEvents = "none";
	}
}


// 9. HISTORY REPLAY LOGIC (Previous / Next Buttons)

// Reverts the visual board to match a specific snapshot in the 'state' history array
function reflectBoard(index){
	let tempBoard = state[index];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			let gridIndex = i * 3 + j;
			let box = document.getElementById(`box${gridIndex}`);
			box.textContent = tempBoard[i][j];
			box.classList.remove("x-mark", "o-mark", "winning-cell");
			if (tempBoard[i][j] === 'X') box.classList.add("x-mark");
			if (tempBoard[i][j] === 'O') box.classList.add("o-mark");
		}
	}
	
	// Re-highlight wins if viewing the final state
	const winConditions = [
		[[0,0], [0,1], [0,2]], [[1,0], [1,1], [1,2]], [[2,0], [2,1], [2,2]],
		[[0,0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]],
		[[0,0], [1,1], [2,2]], [[0,2], [1,1], [2,0]]
	];
	for (let condition of winConditions) {
		const [a, b, c] = condition;
		const valA = tempBoard[a[0]][a[1]];
		const valB = tempBoard[b[0]][b[1]];
		const valC = tempBoard[c[0]][c[1]];
		if (valA && valA === valB && valA === valC) {
			condition.forEach(coord => {
				const idx = coord[0] * 3 + coord[1];
				document.getElementById(`box${idx}`).classList.add('winning-cell');
			});
			break; 
		}
	}
}

// Sets up the logic for the Replay buttons (Prev, Next, Reset)
function buttonFunction() {
	let stateIndex = moves;
	next.disabled = true;

	prev.addEventListener("click", () => {
		reflectBoard(--stateIndex);
		prev.disabled = (stateIndex === 0);
		next.disabled = false;
	});
	
	next.addEventListener("click", () => {
		reflectBoard(++stateIndex);
		next.disabled = (stateIndex === state.length - 1);
		prev.disabled = false;
	});

	reset.addEventListener("click", () => {
		buttons.classList.add("hide");
		winner1.classList.add("hide");
		winner2.classList.add("hide");
		gameDraw.classList.add("hide");
		playerTurn1 = choice;
		moves = 0;

		for(let i = 0; i < 9; i++){
			let box = document.getElementById(`box${i}`);
			box.innerHTML = "";
			box.style.pointerEvents = "auto";
			box.classList.remove("x-mark", "o-mark", "winning-cell");
		}

		for(let i = 0; i<gameBoard.length; i++){
			for(let j = 0; j<gameBoard[i].length; j++){
				gameBoard[i][j] = '';
			}
		}

		for (let i = state.length-1; i >= 1; i--) {
			state.pop();
		}
		
		state = [[['', '', ''], ['', '', ''], ['', '', '']]];
		startingPlayer();
		startingPlayer();
	});
}

createBoard();
gameStart();