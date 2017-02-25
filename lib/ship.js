const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");

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

module.exports = Ship;
