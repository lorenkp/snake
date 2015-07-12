(function() {
  if (typeof Snake === 'undefined') {
    window.Snake = {};
  }

  var Apple = Snake.Apple = function(game) {
    this.canvas = game.canvas;
    this.blocks = game.blocks;
    this.x = 0;
    this.y = 0;
    this.randomPosition();
    this.size = 5;
  };

  Apple.prototype.randNumX = function() {
    return (Math.floor(Math.random() * 16) + 1);
  };

  Apple.prototype.randNumY = function() {
    return (Math.floor(Math.random() * 9) + 1);
  };


  Apple.prototype.randomPosition = function() {
    var goodPos = true;
    while (goodPos) {
      var blocks = this.blocks.length;
      this.x = this.randNumX() * 10;
      this.y = this.randNumY() * 10;
      for (var i = 0; i < blocks; i++) {
        var blockX = this.blocks[i].x;
        var blockY = this.blocks[i].y;
        if (blockX !== this.x && blockY !== this.y) {
          goodPos = false;
        }
      }
    }
  };

  Apple.prototype.render = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  };
})();
