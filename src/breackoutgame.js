function initBreakOutGame(canvas, ...settings) {
  var ballRadius = settings.ballRadius || 10;
  var ctx = canvas.getContext("2d");
  var x = canvas.width / 2;
  var y = canvas.height - 30;
  var mindy = settings.mindy || -3;
  var mindx = settings.mindx || -3;
  var dx = mindx;
  var dy = mindy;
  var paddleHeight = 10;
  var paddleWidth = 90;
  var paddleX = (canvas.width - paddleWidth) / 2;
  var rightPressed = false;
  var leftPressed = false;
  var brickRowCount = 6;
  var brickColumnCount = 4;
  var brickWidth = settings.brickWidth || 90;
  var brickHeight = settings.brickHeight || 25;
  var brickPadding = settings.brickPadding || 10;
  var brickOffsetTop = settings.brickOffsetTop || canvas.height / 5;
  var brickOffsetLeft =
    settings.brickOffsetTop ||
    (canvas.width - (brickWidth + brickPadding) * brickRowCount) / 2;
  var score = 0;
  var tick = 3;

  var bricks = [];
  for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 3 };
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

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
            if (score == brickRowCount * brickColumnCount * tick) {
              alert("YOU WIN, CONGRATS!");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle() {
    ctx.beginPath();
    if (paddleX > canvas.width - paddleWidth) {
      paddleX = canvas.width - paddleWidth;
    } else if (paddleX < 0) {
      paddleX = 0;
    }

    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  function drawBricks() {
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
  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score + "(score raise speed)", 8, 20);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setParams();
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
    checkCollision();
    move();
  }
  function setParams() {
    dx = dx > 0 ? -1 * (mindx * (1 + score / 100)) : mindx * (1 + score / 100);
    dy = dy > 0 ? -1 * (mindy * (1 + score / 100)) : mindy * (1 + score / 100);
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
  move = () => {
    x += dx;
    y += dy;
  };
  LooseEvent = () => {
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.border = "solid 1px red";
    looseinterval = setInterval(timer, 800);
  };
  timer = () => {
    if (tick == 0) {
      clearInterval(looseinterval);
      document.location.reload();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "21px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(
      "You lose" + tick,
      canvas.height / 2 - 10,
      canvas.width / 2 - 10
    );
    tick--;
  };
  interval = setInterval(draw, 10);
}
