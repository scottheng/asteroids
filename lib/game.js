const Asteroid = require("./asteroid.js");

Game.NUM_ASTEROIDS = 10;
Game.DIM_X = 600;
Game.DIM_Y = 1000;

function Game() {
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let randPos = this.randomPosition();
    this.asteroids.push(new Asteroid({ 'pos': randPos }));
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
    console.log(asteroid);
  });
};

module.exports = Game;
