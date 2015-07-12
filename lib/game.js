(function() {
  if (typeof Snake === 'undefined') {
    window.Snake = {};
  }

  var Game = Snake.Game = function(canvas) {
    this.lengthenSnake = false;
    this.canvas = canvas;
    this.blocks = [];
    this.apple = [];
    this.initialSnake();
    this.drawBackground();
    this.drawSnake();
    this.direction = [1, 0];
    this.semanticDir = 'right';
    this.bindKeyHandler();
    this.apple.push(new Snake.Apple(this));
    window.requestAnimationFrame(this.refresh.bind(this));
  };

  Game.prototype.addHead = function() {
    var oldHead = this.blocks[this.blocks.length - 1];
    var oldHeadX = oldHead.intX;
    var oldHeadY = oldHead.intY;
    var newPos = [oldHeadX + this.direction[0] * 5,
      oldHeadY + this.direction[1] * 5
    ];
    var newBlock = new Snake.SnakeBlock(this.canvas, newPos);
    this.blocks.push(newBlock);
  };

  Game.prototype.bindKeyHandler = function() {
    kd.LEFT.down(function() {
      var dir = 'left';
      if (this.validateMove(dir)) {
        this.direction = [-1, 0];
        this.semanticDir = 'left';
      }
    }.bind(this));

    kd.RIGHT.down(function() {
      var dir = 'right';
      if (this.validateMove(dir)) {
        this.direction = [1, 0];
        this.semanticDir = 'right';
      }
    }.bind(this));

    kd.UP.down(function() {
      var dir = 'up';
      if (this.validateMove(dir)) {
        this.direction = [0, -1];
        this.semanticDir = 'up';
      }
    }.bind(this));

    kd.DOWN.down(function() {
      var dir = 'down';
      if (this.validateMove(dir)) {
        this.direction = [0, 1];
        this.semanticDir = 'down';
      }
    }.bind(this));
  };

  Game.prototype.checkApple = function() {
    for (var i = 0; i < this.blocks.length; i++) {
      var blockX = this.blocks[i].intX;
      var blockY = this.blocks[i].intY;
      if (blockX === this.apple[0].x && blockY === this.apple[0].y) {
        this.lengthenSnake = true;
        this.apple.splice(0, 1);
        this.apple.push(new Snake.Apple(this));
      }
    }
    this.apple[0].render();
  };

  Game.prototype.drawBackground = function() {
    this.canvas.width = 168;
    this.canvas.height = 96;
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#BCC900';
    ctx.fillRect(0, 0, 168, 96);
  };

  Game.prototype.drawSnake = function() {
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].render();
    }
  };

  Game.prototype.initialSnake = function() {
    var blockOne = new Snake.SnakeBlock(this.canvas, [0, 0]);
    var blockTwo = new Snake.SnakeBlock(this.canvas, [5, 0]);
    this.blocks.push(blockOne, blockTwo);
  };

  Game.prototype.refresh = function() {
    kd.tick();
    this.drawBackground();
    this.addHead();
    this.checkApple();
    if (this.lengthenSnake === false) {
      this.spliceTail();
    }
    this.lengthenSnake = false;
    this.drawSnake();
    setTimeout(function() {
      window.requestAnimationFrame(this.refresh.bind(this));
    }.bind(this), 50);
  };

  Game.prototype.spliceTail = function() {
    this.blocks.splice(0, 1);
  };

  Game.prototype.validateMove = function(dir) {
    if (dir === 'left' && this.semanticDir === 'right') {
      return false;
    }

    if (dir === 'right' && this.semanticDir === 'left') {
      return false;
    }

    if (dir === 'down' && this.semanticDir === 'up') {
      return false;
    }

    if (dir === 'up' && this.semanticDir === 'down') {
      return false;
    }
    return true;
  };
})();
