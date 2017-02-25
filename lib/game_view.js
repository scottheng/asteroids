
const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function() {
  let game = this.game;
  let ctx = this.ctx;
  this.bindKeyHandlers();
  setInterval(function () {
    game.step();
    game.draw(ctx);
  }, 19);

};

GameView.prototype.bindKeyHandlers = function () {
  let ship = this.game.ship;
  key('up', function(){ ship.power([0,-1]); });
  key('down', function(){ ship.power([0,1]); });
  key('left', function(){ ship.power([-1,0]); });
  key('right', function(){ ship.power([1,0]); });
};

module.exports = GameView;
