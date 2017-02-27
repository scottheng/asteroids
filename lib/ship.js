const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");
const Bullet = require("./bullet.js");

const RADIUS = 15;
const COLOR = "#008000";

let Ship = function(options) {
  options.vel = Util.randomVec(0);
  options.radius = RADIUS;
  options.color = COLOR;

  MovingObject.call(this, options);
};

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = Util.randomVec(0);
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function () {
  const bulletPos = [this.pos[0] + this.radius, this.pos[1] + this.radius];

  const bulletVel = [this.vel[0] * 2, this.vel[1] * 2];

  const bullet = new Bullet({
    pos: this.pos,
    vel: bulletVel,
    color: this.color,
    game: this.game
  });

  this.game.add(bullet);
};


module.exports = Ship;
