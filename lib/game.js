(function() {
  if (typeof Snake === 'undefined') {
    window.Snake = {};
  }

  var requestID;

  var Game = Snake.Game = function(canvas) {
    this.stopGame = false;
    this.lengthenSnake = false;
    this.canvas = canvas;
    this.blocks = [];
    this.apple = [];
    this.initialSnake();
    this.drawBackground();
    this.drawSnake();
    this.direction = [5, 0];
    this.semanticDir = 'right';
    this.bindKeyHandler();
    this.apple.push(new Snake.Apple(this));
    this.refresh();
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

  Game.prototype.bindKeyHandler = function() {
    kd.LEFT.down(function() {
      if (this.validateMove([-5, 0])) {
        this.direction = [-5, 0];
        this.semanticDir = 'left';
      }
    }.bind(this));

    kd.RIGHT.down(function() {
      if (this.validateMove([5, 0])) {
        this.direction = [5, 0];
        this.semanticDir = 'right';
      }
    }.bind(this));

    // setTime out preventing lock out if direction change is too early

    kd.UP.down(function() {
      if (this.validateMove([0, -5])) {
        this.direction = [0, -5];
        this.semanticDir = 'up';
      }
    }.bind(this));

    kd.DOWN.down(function() {
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
        this.lengthenSnake = true;
        this.apple.splice(0, 1);
        this.apple.push(new Snake.Apple(this));
        this.addHead();
      }
    }
    this.apple[0].render();
  };

  Game.prototype.drawBackground = function() {
    this.canvas.width = 165;
    this.canvas.height = 95;
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#BCC900';
    ctx.fillRect(0, 0, 165, 95);
  };

  Game.prototype.drawGameOver = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.font = '12pt Calibri';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Game over!', this.canvas.width / 2, this.canvas.height / 2);
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

  Game.prototype.initialSnake = function() {
    var blockOne = new Snake.SnakeBlock(this.canvas, [0, 0]);
    var blockTwo = new Snake.SnakeBlock(this.canvas, [5, 0]);
    this.blocks.push(blockOne, blockTwo);
  };

  Game.prototype.isCollision = function() {
    var headX = this.blocks[this.blocks.length - 1].x;
    var headY = this.blocks[this.blocks.length - 1].y;
    for (var i = 0; i < this.blocks.length - 1; i++) {
      var bodyX = this.blocks[i].x;
      var bodyY = this.blocks[i].y;
      if (headX === bodyX && headY === bodyY) {
        this.stopGame = true;
        return true;
      }
    }
    return false;
  };

  Game.prototype.refresh = function() {
    kd.tick();
    if (this.isCollision()) {
      this.gameOver();
    }
    setTimeout(function() {
      if (this.stopGame === false) {
        requestID = window.requestAnimationFrame(this.refresh.bind(this));
      }
    }.bind(this), 75);
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
})();
