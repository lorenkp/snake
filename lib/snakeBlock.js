(function() {
  if (typeof Snake === 'undefined') {
    window.Snake = {};
  }

  var SnakeBlock = Snake.SnakeBlock = function(canvas, position) {
    this.canvas = canvas;
    this.x = position[0];
    this.y = position[1];
    this.size = 5;
  };

  SnakeBlock.prototype.render = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  };
})();
