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
    this.size = 6;
  };

  Apple.prototype.randNumX = function(type) {
    return (Math.floor(Math.random() * 160) + 1);  
  };

    Apple.prototype.randNumY = function(type) {
    return (Math.floor(Math.random() * 90) + 1);  
  };


  Apple.prototype.randomPosition = function() {
    var goodPos = true;
    while (goodPos) {
      var blocks = this.blocks.length;
      this.x = this.randNumX();
      this.y = this.randNumY();
      for (var i = 0; i < blocks; i++) {
        var blockX = this.blocks[i].intX;
        var blockY = this.blocks[i].intY;
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