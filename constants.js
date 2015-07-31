var gameContainer;
//objects
var laserShark;
var bugs = [];
var projectiles = [];
var bugProjectiles = [];
//map data
var mapX = 600;
var mapY = 600;
//object Data
var bugSize = 50;
var bugSpace = 25;
var bugsInARow = 6;
var bugMovePeriodTime= 800;
var bugNumber = 12;
var levelBugNumber = 12;
var sharkSizeX = 50;
var sharkSizeY = 100;
var projectileSizeX = 3;
var projectileSizeY = 50 ;
var bugDirection=0; // 0 means right, 1 left
//gameloopVariables
var turn = false;
var endGame = false;
var nextLevel = false;
var time = 0;
var lastRefresh = 0;
var lastBugRefresh = 0;
var previousTimestamp = 0;
var currentTimestamp = 0 ;
var elapsedTime = 0;
var count = 0;
var initProjectilcePosition;
//audio on,off
var audio=true;
//keyboard handling
var Key = {
  _pressed: {},
  _pressedcheckOnce:{},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
	SPACE: 32,

  isPressed: function(keyCode){
    if (this._pressedcheckOnce[keyCode]){
      var obj = JSON.parse(JSON.stringify(this._pressedcheckOnce[keyCode]));
      this._pressedcheckOnce[keyCode] = 0;
      return obj;
    }
  },
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = new Date().getTime();
    this._pressedcheckOnce[event.keyCode] = new Date().getTime();
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};
