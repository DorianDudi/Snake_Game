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
    //console.log("movingRight");
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
	if	(Dir == 1) {
    	moveRight();
    } else if (Dir == 2) {
    	moveDown();
    } else if (Dir == 3) {
    	moveLeft();
    } else {
    	moveUp();
    }
}

function changeDirection(event) {	// key listeners
	if (event.key === 'ArrowRight') {
    	currentDirection = 1;
    } else if (event.key === 'ArrowDown') {
    	currentDirection = 2;
    } else if (event.key === 'ArrowLeft') {
    	currentDirection = 3;
    } else if (event.key === 'ArrowUp') {
    	currentDirection = 4;
	}
    //console.log(currentDirection);
}
//document.addEventListener('keydown', move);
function passMoveParam() {
	move(currentDirection);
}

document.addEventListener('keydown', changeDirection);
//document.addEventListener('keydown', passMoveParam);


function delayedMove() {
    setTimeout(move, 500 * countSteps, currentDirection);
    ++countSteps;
}

while (countSteps < 20) {
	delayedMove();
}

/*
while (countSteps < 20) {
	delayedMove();
    if (x > 590 || x < 0 || y > 590 || y < 0) {
		gameOver = 1;
        alert('Game Over');
    }

    if (countSteps < 10) {
		gameOver = 1;
        alert('Game Over');
    }
}
*/