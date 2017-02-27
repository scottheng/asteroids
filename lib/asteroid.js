const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");
const Ship = require("./ship.js");


//Default properties

const COLOR = "#0000ff";
const RADIUS = 20;

function Asteroid(options) {
  options.vel = Util.randomVec(2);
  options.radius = RADIUS;
  options.color = COLOR;

  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
};

module.exports = Asteroid;
