
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
  key('w', function(){ ship.power([0,-1]); });
  key('s', function(){ ship.power([0,1]); });
  key('a', function(){ ship.power([-1,0]); });
  key('d', function(){ ship.power([1,0]); });
};

module.exports = GameView; 
