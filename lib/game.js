(function() {
  if (typeof Snake === 'undefined') {
    window.Snake = {};
  }

  var requestID;

  var Game = Snake.Game = function(canvas) {
    this.canvas = canvas;
    this.bindKeyHandler();
    setTimeout(function() {
      this.welcome();
    }.bind(this), 10);
  };

  Game.prototype.addHead = function() {
    var oldHead = this.blocks[this.blocks.length - 1];
    var oldHeadX = oldHead.x;
    var oldHeadY = oldHead.y;
    var newPos = [oldHeadX + this.direction[0],
      oldHeadY + this.direction[1]
    ];
    var newBlock = new Snake.SnakeBlock(this.canvas, newPos);
    this.blocks.push(newBlock);
  };

  var listener = new window.keypress.Listener();

  Game.prototype.bindKeyHandler = function() {
    listener.simple_combo("enter", function() {
      this.initializeGame();
    }.bind(this));

    listener.simple_combo("left", function() {
      if (this.validateMove([-5, 0])) {
        this.direction = [-5, 0];
        this.semanticDir = 'left';
      }
    }.bind(this));

    listener.simple_combo("right", function() {
      if (this.validateMove([5, 0])) {
        this.direction = [5, 0];
        this.semanticDir = 'right';
      }
    }.bind(this));

    listener.simple_combo("up", function() {
      if (this.validateMove([0, -5])) {
        this.direction = [0, -5];
        this.semanticDir = 'up';
      }
    }.bind(this));

    listener.simple_combo("down", function() {
      if (this.validateMove([0, 5])) {
        this.direction = [0, 5];
        this.semanticDir = 'down';
      }
    }.bind(this));
  };

  Game.prototype.checkApple = function() {
    for (var i = 0; i < this.blocks.length; i++) {
      var blockX = this.blocks[i].x;
      var blockY = this.blocks[i].y;
      if (blockX === this.apple[0].x && blockY === this.apple[0].y) {
        this.points += 9;
        this.lengthenSnake = true;
        this.apple.splice(0, 1);
        this.apple.push(new Snake.Apple(this));
        this.addHead();
      }
    }
    this.apple[0].render();
  };

  Game.prototype.collisionSelf = function(headX, headY) {
    for (var i = 0; i < this.blocks.length - 1; i++) {
      var bodyX = this.blocks[i].x;
      var bodyY = this.blocks[i].y;
      if (headX === bodyX && headY === bodyY) {
        return true;
      }
    }
    return false;
  };

  Game.prototype.collisionWall = function(headX, headY) {
    if (headX === 165 || headX < 0 || headY < 0 || headY === 110) {
      return true;
    }
    return false;
  };

  Game.prototype.drawBackground = function() {
    this.canvas.width = 328;
    this.canvas.height = 220;
    this.canvas.style.width = '164px';
    this.canvas.style.height = '110px';
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#A0D0B4';
    ctx.scale(2, 2);

    ctx.fillRect(0, 0, 164, 110);
    this.drawBorder();
  };

  Game.prototype.drawBorder = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 164);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(165, 0);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(1, 109);
    ctx.lineTo(164, 109);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(164, 0);
    ctx.lineTo(164, 164);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

  };

  Game.prototype.drawGameOver = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.font = '10px Nokia';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Game over!', 164 / 2, 110 / 2 - 10);
    ctx.fillText('Score: ' + this.points, 164 / 2,
      110 / 2 + 10);
    setTimeout(function() {
      this.playAgain();
    }.bind(this), 2000);
  };

  Game.prototype.drawSnake = function() {
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].render();
    }
  };

  Game.prototype.gameOver = function() {
    window.cancelAnimationFrame(requestID);
    requestID = undefined;
    this.drawBackground();
    this.drawGameOver();
  };

  Game.prototype.initializeGame = function() {
    this.points = 0;
    this.stopGame = false;
    this.lengthenSnake = false;
    this.blocks = [];
    this.apple = [];
    this.initialSnake();
    this.drawBackground();
    this.drawSnake();
    this.direction = [5, 0];
    this.semanticDir = 'right';
    this.apple.push(new Snake.Apple(this));
    this.refresh();
  };

  Game.prototype.initialSnake = function() {
    var blockOne = new Snake.SnakeBlock(this.canvas, [0, 0]);
    var blockTwo = new Snake.SnakeBlock(this.canvas, [5, 0]);
    this.blocks.push(blockOne, blockTwo);
  };

  Game.prototype.isCollision = function() {
    var headX = this.blocks[this.blocks.length - 1].x;
    var headY = this.blocks[this.blocks.length - 1].y;
    if (this.collisionSelf(headX, headY) || this.collisionWall(headX, headY)) {
      this.stopGame = true;
      return true;
    }
    return false;
  };

  Game.prototype.playAgain = function() {
    var ctx = this.canvas.getContext('2d');
    this.drawBackground();
    ctx.font = '10px Nokia';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Play again?', 164 / 2, 110 / 2 - 10);
    setTimeout(function() {
      ctx.fillText('Press enter', 164 / 2, 110 / 2 + 10);
    }.bind(this), 1500);

  };

  Game.prototype.refresh = function() {
    if (this.isCollision()) {
      this.gameOver();
    }
    setTimeout(function() {
      if (this.stopGame === false) {
        requestID = window.requestAnimationFrame(this.refresh.bind(this));
      }
    }.bind(this), 80);
    if (this.stopGame === false) {
      this.drawBackground();
      this.addHead();
      this.checkApple();
      if (this.lengthenSnake === false) {
        this.spliceTail();
      }
      this.lengthenSnake = false;
      this.drawSnake();
    }
  };

  Game.prototype.spliceTail = function() {
    this.blocks.splice(0, 1);
  };

  Game.prototype.validateMove = function(dir) {
    var headX = this.blocks[this.blocks.length - 1].x;
    var headY = this.blocks[this.blocks.length - 1].y;
    var nextLastX = this.blocks[this.blocks.length - 2].x;
    var nextLastY = this.blocks[this.blocks.length - 2].y;
    if (headX + dir[0] === nextLastX && headY + dir[1] === nextLastY) {
      return false;
    }
    return true;
  };

  Game.prototype.welcome = function() {
    this.drawBackground();
    this.drawBorder();
    var ctx = this.canvas.getContext('2d');
    ctx.font = '10px Nokia';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Press enter to play', 164 / 2,
      110 / 2);

  };
})();
