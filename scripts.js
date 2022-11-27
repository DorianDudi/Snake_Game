//snake game
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let x = 250, y = 220, speed = 200, currentDirection = 1;
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

function endGame() {
    ctx.fillText('GAME OVER', 220, 250);
    clearInterval(intervalID);
}

function isOutOfBounds(currentX, currentY, direction) {
	let outOfBounds = 0;
	if (direction == 1 && (currentX + 10 > 490)) {
		outOfBounds = 1;
	} else if (direction == 2 && (currentY + 10 > 490)) {
		outOfBounds = 1;
	} else if (direction == 3 && (currentX - 10 < 0)) {
		outOfBounds = 1;
	} else {
		if (currentY - 10 < 0) {
			outOfBounds = 1;
		}
	}
	return outOfBounds;
}

function move(Dir) {
	if (isOutOfBounds(x, y, Dir)) {
		endGame();
	} else {
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

function moveOnce() {
	move(currentDirection);
}

document.addEventListener('keydown', changeDirection);
const intervalID = setInterval(moveOnce, speed);
