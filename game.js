var gameContainer;
var laserShark;
var bugs = [];
var projectiles = [];
var mapX = 600;
var mapY = 600;
var bugSize = 50;
var bugSpace = 25;
var bugsInARow = 6;
var bugMovePeriodTime= 800;
var bugNumber = 12;
var sharkSizeX = 50;
var sharkSizeY = 100;
var projectileSizeX = 3;
var projectileSizeY = 50 ;
var bugDirection=0; // 0 means right, 1 left
var turn = false;
var endGame = false;
var time = 0;
var lastRefresh = 0;
var lastBugRefresh = 0;
var previousTimestamp = 0;
var currentTimestamp = 0 ;
var elapsedTime = 0;
var count = 0;

var Key = {
  _pressed: {},

  LEFT: 37,
  //UP: 38,
  RIGHT: 39,
  DOWN: 40,
	//SPACE: 32,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = new Date().getTime();
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  },
	//onKeypress: function (event){
	//	this._pressed[event.keyCode] = new Date().getTime();
	//}
};

if (!window.requestAnimationFrame)
{
	window.requestAnimationFrame = (function()
	{
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback,element)
		{
			window.setTimeout(callback, 1000 / 60);
		};
	})();
}

//models
function Point(x,y){
  this.x=(x)?x:0;
  this.y=(y)?y:0;
  this.setPoint=setPoint;
}
function Shark(){
  this.position = new Point();
  this.elem = document.createElement("div");
  this.elem.className = "shark";
  this.style=this.elem.style;
  this.fire=fire;
}
function Bug(){
  this.position = new Point();
  this.elem = document.createElement("div");
  this.elem.className = "bug";
  this.style=this.elem.style;
	this.parent=gameContainer;
	this.destroy = destroyBug;
}
function projectile(speed){
  this.position = new Point();
  this.speed = (speed)?speed:1;
  this.elem = document.createElement("div");
  this.elem.className = "projectile";
  this.style=this.elem.style;
	this.destroy = destroyProjectile;
	this.parent=gameContainer;
	this.id = count++;
	this.elem.id= this.id;
}
//modell methods
function setPoint(x,y){
  this.x=x;
  this.y=y;
}
function destroyBug(){
	this.parent.removeChild(this.elem);
}
function destroyProjectile(){
	//if (!this) return;
  this.parent.removeChild(this.elem);
}
function fire(){
  var p = new projectile();
  p.position = new Point(laserShark.position.x+(sharkSizeX/2),laserShark.position.y);

  gameContainer.appendChild(p.elem);
  projectiles.push(p);
}
//functions
function fillBugsArray(n){
  for(var i=0;i<n;i++){
    bugs[i]=new Bug();
  }
}

function initBugsPosition(){
  for (var i in bugs){
    bugs[i].position.setPoint((i%bugsInARow)*(bugSize+bugSpace),Math.floor(i/bugsInARow)*(bugSize+bugSpace));
    //refreshPosition(bugs[i]);
    gameContainer.appendChild(bugs[i].elem);
  }
}

function initSharkPosition(){
  laserShark.position.x = (mapX - sharkSizeX)/2  ;
  laserShark.position.y = mapY - sharkSizeY;
  gameContainer.appendChild(laserShark.elem);
}

function init(){
  time = 0;
  lastRefresh = 0;
  endGame = false;
  gameContainer = document.getElementById("gameContainer");
  fillBugsArray(bugNumber);
  laserShark = new Shark();
  initBugsPosition();
  initSharkPosition();
}
function moveProjectiles(time){
  for (var i in projectiles){
    projectiles[i].position.y-=time * projectiles[i].speed;
		if (projectiles[i].position.y< (0 - 2 * projectileSizeY)){
			projectiles[i].destroy();
			projectiles.splice(i,1);
		}
  }
}

function moveShark(move,time){
  laserShark.position.x += move*time;
  if (laserShark.position.x < 0 || laserShark.position.x> (mapX-sharkSizeX)){  laserShark.position.x -= move*time;}
}

function moveBugs(){
  if (!turn){
    for (var i in bugs){
      if (bugDirection==1){
        bugs[i].position.x-=25;
        if (bugs[i].position.x  < (bugSize)){
          turn = true;
        }
      }
      else{
        bugs[i].position.x+=25;
        if (bugs[i].position.x  > (mapX - bugSize*2)){
          turn = true;
        }
      }
    }
  }
  else{
    bugDirection=(bugDirection==1)?0:1;
    for (var i in bugs){
      bugs[i].position.y+=25;
      if (bugs[i].position.y==(mapY-bugSize-sharkSizeY))
        endGame=true;
    }
    turn = false;
  }
}

function gameLoop (){
  if (!endGame){
    requestAnimationFrame(gameLoop);
    previousTimestamp = currentTimestamp;
    currentTimestamp = new Date().getTime();
    elapsedTime += currentTimestamp - previousTimestamp;
		lastRefresh = currentTimestamp - previousTimestamp;
    lastBugRefresh += currentTimestamp - previousTimestamp;
    if (lastBugRefresh > bugMovePeriodTime){
      lastBugRefresh = 0;
      moveBugs();
    }
    moveProjectiles(lastRefresh);
    refreshPosition(lastRefresh);
    //window.setTimeout(gameLoop, 20);
		if (Key.isDown(Key.LEFT)) moveShark(-0.5,lastRefresh);
		if (Key.isDown(Key.RIGHT)) moveShark(+0.5,lastRefresh);
		detectCollision();
		if (bugNumber==0)endGame=true;
  }
}
function refreshPosition(){
  for (var i in bugs){
    refreshElementPosition(bugs[i]);
  }
  for (var i in projectiles){
    refreshElementPosition(projectiles[i]);
  }
    refreshElementPosition(laserShark);
}
function refreshElementPosition(e){
  e.style.left = e.position.x;
  e.style.top = e.position.y;
}
function detectCollision(){
	for (var i in projectiles){
		for (var j in bugs){
			square = bugs[j];
			squareSize = bugSize;
			rect = projectiles[i];
			rectWidth = projectileSizeX;
			rectHeight = projectileSizeY;

			if (square.position.x < rect.position.x + rectWidth &&
		   square.position.x + squareSize > rect.position.x &&
		   square.position.y < rect.position.y + rectHeight &&
		   squareSize + square.position.y > rect.position.y) {
		    // destroyLaserbeam
				projectiles[i].destroy();
				projectiles.splice(i,1);

				//destroyBug
				bugs[j].destroy();
				bugs.splice(j,1);
				bugNumber--;
			}
		}
	}
}
window.onload= function (){
  init();
  currentTimestamp = new Date().getTime();
  gameLoop();
};
document.onkeypress = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
      case 32: // down
        fire();
        break;
			case	38: // down
	        fire();
	        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
