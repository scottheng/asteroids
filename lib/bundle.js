/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(2);
const Ship = __webpack_require__(6);


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
   


/***/ }),
/* 1 */
/***/ (function(module, exports) {


const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function() {
  let game = this.game;
  let ctx = this.ctx;
  this.bindKeyHandlers();
  setInterval(function () {
    game.step();
    game.draw(ctx);
  }, 19);

};

GameView.prototype.bindKeyHandlers = function () {
  let ship = this.game.ship;
  key('up', function(){ ship.power([0,-1]); });
  key('down', function(){ ship.power([0,1]); });
  key('left', function(){ ship.power([-1,0]); });
  key('right', function(){ ship.power([1,0]); });
};

module.exports = GameView;
  


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);
const MovingObject = __webpack_require__(3);
const Ship = __webpack_require__(6);


//Default properties

const COLOR = "#0000ff";
const RADIUS = 20;

function Asteroid(options) {
  options.vel = Util.randomVec(5);
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const Util = __webpack_require__(4);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Util = {
  inherits (childClass, parentClass) {
    const Surrogate = function() {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },

  randomVec (length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale (vec, m) {
  return [vec[0] * m, vec[1] * m];
  },

  distance(pos1, pos2) {
    const x1 = pos1[0];
    const y1 = pos1[1];
    const x2 = pos2[0];
    const y2 = pos2[1];

    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  },

  norm(pos) {
    return this.distance([0,0],pos);
  }
};

module.exports = Util;
  


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const GameView = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = document.getElementsByTagName("canvas")[0];

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);
const MovingObject = __webpack_require__(3);

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

module.exports = Ship;
  


/***/ })
/******/ ]);