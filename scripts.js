//snake game
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let x = 240, y = 240, speed = 70,target_x = x, target_y = y, score = 0, high_score = 0, high_score_alert = 0;
let currentDirection = 1;
let snakeTrail = [[240, 230, 220],[240, 240, 240]];

function generateTarget() { // generates target and avoids a space occupied by the snake's body
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
    
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //min-max inclusive
}

function runGame() {
	document.getElementById("start_game").hidden = true;
	document.getElementById("reset_game").hidden = true;
	generateTarget();
	document.addEventListener('keydown', changeDirection);
	let intervalID = setInterval(moveOnce, speed);

	function drawTarget() {
		ctx.fillStyle = 'orange';
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
			} else if (i == snakeTrail[0].length - 1) {
				ctx.fillRect(snakeTrail[0][i] + 2, snakeTrail[1][i] + 2, 6, 6);
			} else {
				ctx.fillRect(snakeTrail[0][i] + 1, snakeTrail[1][i] + 1, 8, 8);
			}
		}
	}
    
	function drawHighScoreAlert() {
		ctx.globalAlpha = 0.2;
		ctx.fillStyle = 'silver';
		ctx.font = "bold 60px sans-serif";
		ctx.fillText('HIGH SCORE!', 50, 250);
		ctx.globalAlpha = 1.0;
		ctx.font = "15px sans-serif";
	}

	function drawGameCanvas() {
		drawSnake();
		drawTarget();
		if (high_score_alert && high_score > 0) {
			drawHighScoreAlert();
		}
	}

	function checkTargetCollision() {
		if (target_x == x && target_y == y) {
			score += 100;
			document.getElementById("score_value").innerHTML = " " + score;
			snakeTrail[0].unshift(x);
			snakeTrail[1].unshift(y);
			generateTarget();
			if (score > high_score) {
				high_score_alert = 1;
				if (high_score > 0) {
					high_score = score;
					document.getElementById("high_score").innerHTML = " " + score;
				}
			}
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
		ctx.globalAlpha = 0.2;
		ctx.fillStyle = '#919191';
		ctx.fillRect(196, 235, 100, 20);
		ctx.fillStyle = 'orange';
		ctx.globalAlpha = 0.5;
		ctx.font = "15px sans-serif";
		ctx.fillText('GAME OVER', 200, 250);
		ctx.globalAlpha = 1.0;
		clearInterval(intervalID);
		document.getElementById("reset_game").hidden = false;
		if (high_score == 0 && score > high_score) {
			high_score = score;
			document.getElementById("high_score").innerHTML = " " + score;
		}
		high_score_alert = 0;
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
}

function resetGame() {
	ctx.clearRect(0, 0, 500, 500);
	x = 240;
	y = 240;
	score = 0;
	document.getElementById("score_value").innerHTML = " " + score;
	currentDirection = 1;
	snakeTrail[0] = snakeTrail[0].slice(0,3);
	snakeTrail[1] = snakeTrail[1].slice(0,3);
	snakeTrail[0][0] = 240;
	snakeTrail[0][1] = 230;
	snakeTrail[0][2] = 220;
	snakeTrail[1][0] = 240;
	snakeTrail[1][1] = 240;
	snakeTrail[1][2] = 240;
	generateTarget();
	runGame();
}
