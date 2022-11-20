//snake game
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let x = 295, y = 295, speed = 500, gameOver = 0, currentDirection = 1, countSteps = 0;
let gameCanvas = document.getElementById('game');

ctx.fillStyle = 'green';
ctx.fillRect(x, y, 10, 10);

function moveRight() {
	x += 10;
	ctx.clearRect(0, 0, 600, 600);
	ctx.fillRect(x, y, 10, 10);
}

function moveLeft() {
	x -= 10;
	ctx.clearRect(0, 0, 600, 600);
	ctx.fillRect(x, y, 10, 10);
}

function moveUp() {
	y -= 10;
	ctx.clearRect(0, 0, 600, 600);
	ctx.fillRect(x, y, 10, 10);
}

function moveDown() {
	y += 10;
	ctx.clearRect(0, 0, 600, 600);
	ctx.fillRect(x, y, 10, 10);
}

function move(Dir) {
	if (Dir == 1) {
		moveRight();
	} else if (Dir == 2) {
		moveDown();
	} else if (Dir == 3) {
		moveLeft();
	} else {
		moveUp();
	}
}

function changeDirection(event) {// key listeners
	if (event.key === 'ArrowRight') {
		currentDirection = 1;
	} else if (event.key === 'ArrowDown') {
		currentDirection = 2;
	} else if (event.key === 'ArrowLeft') {
		currentDirection = 3;
	} else if (event.key === 'ArrowUp') {
		currentDirection = 4;
	}
}

function passMoveParam() {
	move(currentDirection);
}

document.addEventListener('keydown', changeDirection);
//document.addEventListener('keydown', passMoveParam); // by using this listener with all the following code commented out I am able to simply move the
//square on the canvas using the arrow keys

function delayedMove() {
	setTimeout(move, 500 * countSteps, currentDirection);
}

/*
while (!gameOver) {				// If I use a flag variable as the game condition (the gameOver variable declared on line 4)...
	delayedMove();
	if (x > 590 || x < 0 || y > 590 || y < 0) {		// and the if statement here which checks for the square being out of bounds...
		gameOver = 1;								// I crash the game
		alert('Game Over');
	}
}
*/

while (countSteps < 20) {	// I can only get the square to move a fixed number of steps (which isn't what I need for the implementation)
	delayedMove();			// but the motion is not in even intervals
	++countSteps;			// for a limit of 20 the first 10 movements are correct at 10px distance but the next 10 steps the square moves at
} // double that distance (20px) as far as I can tell
