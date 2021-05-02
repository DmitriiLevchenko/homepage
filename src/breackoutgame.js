class BreaakOut {
  constructor(...settings) {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    console.log("this", this);
    console.log(this.ctx);
    console.log(this.ctx.clearRect);
    this.ballRadius = settings.ballRadius || 10;
    this.brickRowCount = settings.brickRowCount || 5;
    this.brickColumnCount = settings.brickColumnCount || 3;
    this.brickWidth = 75;
    debugger;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.dx = 2.1;
    this.dy = 2.1;
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.paddleX = (canvas.width - this.paddleWidth) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
    this.score = 0;
    this.tick = 0;
    this.init().bind(this);
  }
  init() {
    this.bricks = [];
    for (var c = 0; c < this._brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < this._brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 3 };
      }
    }

    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
    document.addEventListener("mousemove", this.mouseMoveHandler, false);

    setInterval(this.draw, 10);
  }
  keyDownHandler(e) {
    if (e.keyCode == 39) {
      this.rightPressed = true;
    } else if (e.keyCode == 37) {
      this.leftPressed = true;
    }
  }
  keyUpHandler(e) {
    if (e.keyCode == 39) {
      this.rightPressed = false;
    } else if (e.keyCode == 37) {
      this.leftPressed = false;
    }
  }
  mouseMoveHandler(e) {
    var relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddleX = relativeX - this.paddleWidth / 2;
    }
  }
  collisionDetection() {
    for (var c = 0; c < this.brickColumnCount; c++) {
      for (var r = 0; r < this.brickRowCount; r++) {
        var b = bricks[c][r];
        if (b.status > 0) {
          if (
            this.x > b.x &&
            this.x < b.x + this.brickWidth &&
            this.y > b.y &&
            this.y < b.y + this.brickHeight
          ) {
            this.dy = -dy;
            b.status -= 1;
            this.score++;
            if (score == this.brickRowCount * this.brickColumnCount * 3) {
              alert("YOU WIN, CONGRATS!");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(x, this.y, this.ballRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(
      paddleX,
      this.canvas.height - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight
    );
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawBricks() {
    for (var c = 0; c < this.brickColumnCount; c++) {
      for (var r = 0; r < this.brickRowCount; r++) {
        if (bricks[c][r].status > 0) {
          var brickX =
            r * (brickWidth + this.brickPadding) + this.brickOffsetLeft;
          var brickY =
            c * (brickHeight + this.brickPadding) + this.brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          bricks[c][r].status == 3
            ? (ctx.fillStyle = "#0095DD")
            : bricks[c][r].status == 2
            ? (ctx.fillStyle = "yellow")
            : (ctx.fillStyle = "red");
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }
  drawScore() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Score: " + this.score, 8, 20);
  }

  draw() {
    console.log(this);
    debugger;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.drawScore();
    this.collisionDetection();
    this.checkCollision();
    this.move();
  }
  checkCollision = () => {
    if (
      x + this.dx > this.canvas.width - this.ballRadius ||
      this.x + this.dx < this.ballRadius
    ) {
      this.dx = -dx;
    }
    if (y + this.dy < this.ballRadius) {
      this.dy = -dy;
    } else if (y + this.dy > this.canvas.height - this.ballRadius) {
      if (x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
        this.dy = -dy;
      } else {
        this.LooseEvent();
      }
    }

    if (rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
      this.paddleX += 7;
    } else if (leftPressed && this.paddleX > 0) {
      this.paddleX -= 7;
    }
  };
  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
  LooseEvent() {
    clearInterval(interval);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.style.border = "solid 1px red";
    this.looseinterval = setInterval(this.timer, 800);
  }
  timer() {
    if (tick == 0) {
      clearInterval(looseinterval);
      document.location.reload();
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "21px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText(
      "Game Over" + this.tick,
      this.canvas.height / 2 - 10,
      this.canvas.width / 2 - 10
    );
    this.tick--;
  }
}
