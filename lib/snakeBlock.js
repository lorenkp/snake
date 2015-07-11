(function() {
  if (typeof Snake === 'undefined') {
    window.Snake = {};
  }

  var SnakeBlock = Snake.SnakeBlock = function(canvas, position) {
    this.canvas = canvas;
    this.intX = position[0] * 4;
    this.intY = position[1] * 4;
    this.endX = this.intX + 4;
    this.endY = this.intY + 4;
  };

  SnakeBlock.prototype.render = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(this.intX, this.intY, this.endX, this.endY);
  };
})();
