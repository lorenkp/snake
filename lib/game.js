(function() {
  if (typeof Snake === 'undefined') {
    window.Snake = {};
  }

  var Game = Snake.Game = function(canvas) {
    this.canvas = canvas;
    this.blocks = [];
    this.initialSnake();
    this.drawBackground();
    this.drawSnake();
    this.direction = [1, 0];
  };

  Game.prototype.addHead = function() {
    var oldHead = this.blocks[this.blocks.length - 1];
    var newHead = [oldHead[0] + this.direction[0],
        oldHead[1] + this.direction[1]];
    var newBlock = new Snake.SnakeBlock(this.canvas, newHead);
    this.blocks.push(newBlock);
  };

  Game.prototype.drawBackground = function() {
    this.canvas.width = 168;
    this.canvas.height = 96;
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#BCC900';
    ctx.fillRect(0, 0, 168, 96);
  };

  Game.prototype.initialSnake = function() {
    var blockOne = new Snake.SnakeBlock(this.canvas, [1, 1]);
    var blockTwo = new Snake.SnakeBlock(this.canvas, [2, 1]);
    this.blocks.push(blockOne, blockTwo);
  };

  Game.prototype.drawSnake = function() {
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].render();
    }
  };

  Game.prototype.refresh = function() {
    this.drawBackground();
    this.spliceTail();
    this.addHead();
    this.drawSnake();
  };

  Game.prototype.spliceTail = function() {
    this.blocks.splice(0, 1);
  };

})();
