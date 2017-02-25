const Asteroid = require("./asteroid.js");

Game.NUM_ASTEROIDS = 10;
Game.DIM_X = 500;
Game.DIM_Y = 500;

function Game() {
  this.asteroids = [];
}

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    const asteroid = new Asteroid({pos: this.randomPosition});
    this.asteroids.push(asteroid);
  }
};

Game.prototype.randomPosition = function () {
  const xPos = Math.floor(Math.random() * Game.DIM_X);
  const yPos = Math.floor(Math.random() * Game.DIM_Y);
  return [xPos, yPos];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach( (asteroid) => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach( (asteroid) => {
    asteroid.move();
  });
};

module.exports = Game;
