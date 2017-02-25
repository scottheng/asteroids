const Util = require("./utils.js");
const MovingObject = require("./moving_object.js");

Util.inherits(Asteroid, MovingObject);

//Default properties
Asteroid.COLOR = "#332400";
Asteroid.radius = 5;

function Asteroid(options) {
  options.vel = Util.randomVec(5);
  options.radius = Asteroid.radius;
  options.color = Asteroid.COLOR;
  MovingObject.call(this, options);
}

module.exports = Asteroid;
