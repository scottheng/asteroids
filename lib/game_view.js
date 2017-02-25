
const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function() {
  let game = this.game;
  let ctx = this.ctx;
  setInterval(function () {
    game.moveObjects();
    game.draw(ctx);
  }, 19);

};

module.exports = GameView;
