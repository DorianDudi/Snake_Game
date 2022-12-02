//snake game
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let x = 240, y = 240, speed = 200,target_x = x, target_y = y, score = 0;
let currentDirection = 1;
let snakeTrail = [[240, 230],[240, 240]];
let gameCanvas = document.getElementById('game');

generateTarget();

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //min-max inclusive
}

function generateTarget() { // generates target in an empty space of the game canvas
	target_x = getRandomIntInclusive(0,49) * 10;
	target_y = getRandomIntInclusive(0,49) * 10;
	let targetCollision = 1;
	while (targetCollision) {
		targetCollision = 0;
		for (let i = 0; i < snakeTrail[0].length; ++i) {
			if (target_x == snakeTrail[0][i] && target_y == snakeTrail[1][i]) {
				targetCollision = 1;
				target_x = getRandomIntInclusive(0,49) * 10;
				target_y = getRandomIntInclusive(0,49) * 10;
			}
		}
	}
}

/*
function generateTarget() {
    while(target_x == x && target_y == y) {
    	target_x = getRandomIntInclusive(0,49) * 10;
        //console.log(target_x);
        target_y = getRandomIntInclusive(0,49) * 10;
		//console.log(target_y);
	}
}
*/

function drawTarget() {
	ctx.fillStyle = 'red';
	ctx.beginPath();
	ctx.arc(target_x + 5, target_y + 5, 6, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}

function drawSnake() {
	ctx.fillStyle = 'green';
	ctx.clearRect(0, 0, 500, 500);
	for (let i = 0; i < snakeTrail[0].length; ++i) {
		if (i == 0) {
			ctx.fillRect(snakeTrail[0][i], snakeTrail[1][i], 10, 10);
		} else {
			ctx.fillRect(snakeTrail[0][i] + 1, snakeTrail[1][i] + 1, 8, 8);
		}
	}
}

function drawGameCanvas() {
	drawSnake();
	drawTarget();
}

function checkTargetCollision() {
	if (target_x == x && target_y == y) {
		score += 100;
		document.getElementById("score_value").innerHTML = " " + score;
		snakeTrail[0].unshift(x);
		snakeTrail[1].unshift(y);
		generateTarget();
	}
}

function hasSelfCollision() {
	let selfCollision = 0;
	if (snakeTrail[0].length > 3) {
		for (let i = 2; i < snakeTrail[0].length; ++i) {
			if (snakeTrail[0][i] == x && snakeTrail[1][i] == y) {
				selfCollision = 1;
				break;
			}
		}
	}
	return selfCollision;
}

function remapSnakeTrail() {
	for (let i = snakeTrail[0].length - 1; i > 0 ; --i) {
		snakeTrail[0][i] = snakeTrail[0][i - 1];
		snakeTrail[1][i] = snakeTrail[1][i - 1];
	}
	snakeTrail[0][0] = x;
	snakeTrail[1][0] = y;
}

function moveRight() {
	x += 10;
	remapSnakeTrail();
}

function moveLeft() {
	x -= 10;
	remapSnakeTrail();
}

function moveUp() {
	y -= 10;
	remapSnakeTrail();
}

function moveDown() {
	y += 10;
	remapSnakeTrail();
}

function endGame() {
	ctx.fillStyle = 'green';
	ctx.fillText('GAME OVER', 220, 250);
	clearInterval(intervalID);
}

function isOutOfBounds(currentX, currentY, direction) {
	let outOfBounds = 0;
	if (direction == 1) {
		if (currentX + 10 > 490) {
			outOfBounds = 1;
		}
	} else if (direction == 2) {
		if (currentY + 10 > 490) {
			outOfBounds = 1;
		}
	} else if (direction == 3) {
		if (currentX - 10 < 0) {
			outOfBounds = 1;
		}
	} else {
		if (currentY - 10 < 0) {
			outOfBounds = 1;
		}
	}
	return outOfBounds;
}

function move(Dir) {
	if (isOutOfBounds(x, y, Dir) || hasSelfCollision()) {
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
		checkTargetCollision();
		drawGameCanvas();
	}
}

function changeDirection(event) {	// key listeners
	let newDirection = 0;
	if (event.key === 'ArrowRight') { // the conditionals prevent the snake from moving in opposite directions
    	newDirection = 1;				
        if (currentDirection != 3) {	// going back should only be done through a "U" turn
        	currentDirection = newDirection;
        }
    } else if (event.key === 'ArrowDown') {
		newDirection = 2;
		if (currentDirection != 4) {
			currentDirection = newDirection;
		}
    } else if (event.key === 'ArrowLeft') {
    	newDirection = 3;
        if (currentDirection != 1) {
			currentDirection = newDirection;
		}
    } else if (event.key === 'ArrowUp') {
    	newDirection = 4;
		if (currentDirection != 2) {
			currentDirection = newDirection;
		}
	}
}

function moveOnce() {
	move(currentDirection);
}

document.addEventListener('keydown', changeDirection);
const intervalID = setInterval(moveOnce, speed);
