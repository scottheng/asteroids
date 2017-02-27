const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");

const RADIUS = 5;

const Bullet = function(options) {
  options.radius = RADIUS;
  MovingObject.call(this, options);
};

Util.inherits(Bullet, MovingObject);
