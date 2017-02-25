function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  window.setInterval(this.game.moveObjects, 20);
  window.setInterval(this.game.draw, 20);
};
