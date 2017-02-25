const Game = require("./game.js");
const Util = require("./utils.js");

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  const totalRad = this.radius + otherObject.radius;
  if (Util.distance(this.pos, otherObject.pos) < totalRad) {
    return true;
  }
  return false;
};

MovingObject.prototype.collideWith = function(otherObject) {

};

module.exports = MovingObject;
