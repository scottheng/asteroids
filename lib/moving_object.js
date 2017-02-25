function distance(pos1, pos2) {
  const x1 = pos1[0];
  const y1 = pos1[1];
  const x2 = pos2[0];
  const y2 = pos2[1];

  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function norm(pos) {
  return distance([0,0],pos);
}

function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
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
  const amt = norm(this.pos);
  this.pos[0] += amt;
  this.pos[1] += amt;
};

module.exports = MovingObject;
