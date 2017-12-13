/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('load', function () {

    var mainState = {
        preload: function preload() {
            // Load the bird sprite
            game.load.image('pipe', 'assets/pipe.png');
            game.load.image('bird', 'assets/bird.png');
            game.load.audio('jump', 'assets/jump.wav');
        },

        create: function create() {
            // Change the background color of the game to blue
            game.stage.backgroundColor = '#71c5cf';

            // Set the physics system
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // Display the bird at the position x=100 and y=245
            this.bird = game.add.sprite(100, 245, 'bird');

            // Add physics to the bird
            // Needed for: movements, gravity, collisions, etc.
            game.physics.arcade.enable(this.bird);

            // Add gravity to the bird to make it fall
            this.bird.body.gravity.y = 1000;

            // Call the 'jump' function when the spacekey is hit
            var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.add(this.jump, this);

            // Create an empty group
            this.pipes = game.add.group();

            this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

            this.score = 0;
            this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

            this.bird.jumpSound = game.add.audio('jump');
        },

        update: function update() {
            // If the bird is out of the screen (too high or too low)
            // Call the 'restartGame' function
            if (this.bird.y < 0 || this.bird.y > 490) {
                this.restartGame();
            }

            game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
        },
        // Make the bird jump
        jump: function jump() {
            // Add a vertical velocity to the bird
            this.bird.body.velocity.y = -350;
            this.bird.jumpSound.play();
        },

        // Restart the game
        restartGame: function restartGame() {
            // Start the 'main' state, which restarts the game
            game.state.start('main');
            //game.paused === true;
        },
        addOnePipe: function addOnePipe(x, y) {
            // Create a pipe at the position x and y
            var pipe = game.add.sprite(x, y, 'pipe');

            // Add the pipe to our previously created group
            this.pipes.add(pipe);

            // Enable physics on the pipe
            game.physics.arcade.enable(pipe);

            // Add velocity to the pipe to make it move left
            pipe.body.velocity.x = -150;

            // Automatically kill the pipe when it's no longer visible
            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;
        },
        addRowOfPipes: function addRowOfPipes() {
            // Randomly pick a number between 1 and 5
            // This will be the hole position
            var hole = Math.floor(Math.random() * 5) + 1;

            // Add the 6 pipes
            // With one big hole at position 'hole' and 'hole + 1'
            for (var i = 0; i < 8; i++) {
                if (i != hole && i != hole + 1) {
                    this.addOnePipe(400, i * 60 + 10);
                }
            }

            this.score += 1;
            this.labelScore.text = this.score;
        }
    };

    // Initialize Phaser, and create a 400px by 490px game
    var game = new Phaser.Game(400, 490);

    // Add the 'mainState' and call it 'main'
    game.state.add('main', mainState);

    // Start the state to actually start the game
    game.state.start('main');
});

/***/ })
/******/ ]);