const Asteroid = require("./asteroid.js");
const Ship = require("./ship.js");


function Game() {
  this.asteroids = [];
  this.ship = new Ship({'pos': this.randomPosition(), 'game': this});
  this.addAsteroids();
}
Game.NUM_ASTEROIDS = 10;
Game.DIM_X = 600;
Game.DIM_Y = 1000;

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let randPos = this.randomPosition();
    this.asteroids.push(new Asteroid({ 'pos': randPos, 'game': this }));
  }
};

Game.prototype.randomPosition = function () {
  const xPos = Math.random() * Game.DIM_X;
  const yPos = Math.random() * Game.DIM_Y;

  return this.wrap([xPos, yPos]);
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  let objects = this.allObjects();
  objects.forEach( (object) => {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  let objects = this.allObjects();
  objects.forEach( (object) => {
    object.move();
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
  let objects = this.allObjects();
  for (let i = 0; i < objects.length-1; i++) {
    for (let j = i+1; j < objects.length; j++) {
      if (objects[i].isCollidedWith(objects[j])) {
        // alert("COLLISON");
        objects[i].collideWith(objects[j]);
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

Game.prototype.allObjects = function() {
  return this.asteroids.concat(this.ship);
};

module.exports = Game;
