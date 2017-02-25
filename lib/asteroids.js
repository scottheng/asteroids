const Game = require("./game.js");
const GameView = require("./game_view.js");

const startGame = function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const game = Game.new();
  new GameView(game, ctx).start();
};

document.addEventListener("DOMContentLoaded", startGame);
