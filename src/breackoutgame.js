class BreaakOut {
  constructor(canvas, ...settings) {
    this.canvas = canvas;
    this._ctx = canvas.getContext("2d");
    this.ballRadius = settings.ballRadius || 10;
    this._brickRowCount = settings.brickRowCount || 5;
    this._brickColumnCount = settings.brickColumnCount || 3;
    this._brickWidth = 75;
    this._brickHeight = 20;
    this._brickPadding = 10;
    this._brickOffsetTop = 30;
    this._brickOffsetLeft = 30;
    this.x = canvas.width / 2;
    this.y = canvas.height - 30;
    this.dx = 2.1;
    this.dy = 2.1;
    this._paddleHeight = 10;
    this._paddleWidth = 75;
    this._paddleX = (canvas.width - paddleWidth) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
    this.score = 0;
    this.tick = 0;
  }
  init() {
    this.bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 3 };
      }
    }
    dx = dy = (4 * document.querySelector("#speed").value) / 100;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    interval = setInterval(draw, 10);
  }
  keyDownHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = true;
    } else if (e.keyCode == 37) {
      leftPressed = true;
    }
  }
  keyUpHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 37) {
      leftPressed = false;
    }
  }
  mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }
  collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        var b = bricks[c][r];
        if (b.status > 0) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            b.status -= 1;
            score++;
            if (score == brickRowCount * brickColumnCount * 3) {
              alert("YOU WIN, CONGRATS!");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status > 0) {
          var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
          var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          bricks[c][r].status == 3
            ? (ctx.fillStyle = "#0095DD")
            : bricks[c][r].status == 2
            ? (ctx.fillStyle = "yellow")
            : (ctx.fillStyle = "red");
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
  drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
    checkCollision();
    move();
  }
  checkCollision = () => {
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        LooseEvent();
      }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }
  };
  move() {
    x += dx;
    y += dy;
  }
  LooseEvent() {
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.border = "solid 1px red";
    looseinterval = setInterval(timer, 800);
  }
  timer() {
    if (tick == 0) {
      clearInterval(looseinterval);
      document.location.reload();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "21px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(
      "Game Over" + tick,
      canvas.height / 2 - 10,
      canvas.width / 2 - 10
    );
    tick--;
  }
}

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status > 0) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status -= 1;
          score++;
          if (score == brickRowCount * brickColumnCount * 3) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}
