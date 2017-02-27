const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");

const RADIUS = 5;

const Bullet = function(options) {
  options.radius = RADIUS;
  MovingObject.call(this, options);
};

// Bullet.SPEED = 10;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;

module.exports = Bullet;
