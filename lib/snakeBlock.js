(function() {
  if (typeof Snake === 'undefined') {
    window.Snake = {};
  }

  var SnakeBlock = Snake.SnakeBlock = function(canvas, position) {
    this.canvas = canvas;
    this.intX = position[0];
    this.intY = position[1];
    this.endX = 6;
    this.endY = 6;
  };

  SnakeBlock.prototype.render = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(this.intX, this.intY, this.endX, this.endY);
  };
})();
