const Asteroid = require("./asteroid.js");


function Game() {
  this.asteroids = [];
  this.addAsteroids();
}
Game.NUM_ASTEROIDS = 100;
Game.DIM_X = 600;
Game.DIM_Y = 1000;

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let randPos = this.randomPosition();
    this.asteroids.push(new Asteroid({ 'pos': randPos, 'game': this }));
  }
};

Game.prototype.randomPosition = function () {
  const xPos = Math.floor(Math.random() * Game.DIM_X);
  const yPos = Math.floor(Math.random() * Game.DIM_Y);
  return [xPos, yPos];
};

Game.prototype.draw = function(ctx) {
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

Game.prototype.wrap = function(pos) {
  let wrappedX = pos[0];
  let wrappedY = pos[1];


  if (wrappedX > Game.DIM_X) {
    wrappedX = wrappedX % Game.DIM_X;
  }
  else if (wrappedX < 0) {
    wrappedX = Game.DIM_X - (wrappedX % Game.DIM_X);
  }

  if (wrappedY > Game.DIM_Y) {
    wrappedY = wrappedY % Game.DIM_Y;
  }
  else if (wrappedY < 0) {
    wrappedY = Game.DIM_Y - (wrappedY % Game.DIM_Y);
  }

  return [wrappedX, wrappedY];
};

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.asteroids.length-1; i++) {
    for (let j = i+1; j < this.asteroids.length; j++) {
      if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
        // alert("COLLISON");
        this.asteroids[i].collideWith(this.asteroids[j]);
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid) {
  const index = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(index, 1);
};

module.exports = Game;
