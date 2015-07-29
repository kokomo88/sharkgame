var gameContainer;
var laserShark;
var bugs = [];
var projectiles = [];
var mapX = 600;
var mapY = 600;
var bugSize = 50;
var bugSpace = 25;
var bugsInARow = 6;
var sharkSizeX = 50;
var sharkSizeY = 100;
var bugDirection=0; // 0 means right, 1 left
var turn = false;
var endGame = false;
var time = 0;
var lastRefresh = 0;
var previousTimestamp = 0;
var currentTimestamp = 0 ;
var elapsedTime = 0;

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
}
function projectile(speed){
  this.position = new Point();
  this.speed = speed;
  this.elem = document.createElement("div");
  this.elem.className = "projectile";
    this.style=this.elem.style;
}
//modell methods
function setPoint(x,y){
  this.x=x;
  this.y=y;
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
  fillBugsArray(12);
  laserShark = new Shark();
  initBugsPosition();
  initSharkPosition();

}
function moveProjectiles(){
  for (var i in projectiles){
      projectiles[i].position.y-=25;
  }
}
function moveShark(move){
  laserShark.position.x += move;
  if (laserShark.position.x < 0 || laserShark.position.x> (mapX-sharkSizeX)){  laserShark.position.x -= move;}
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
  //  moveShark();
    previousTimestamp = currentTimestamp;
    currentTimestamp = new Date().getTime();
    elapsedTime += currentTimestamp - previousTimestamp;

    lastRefresh += currentTimestamp - previousTimestamp;
    if (lastRefresh > 800){
      lastRefresh = 0;
      moveBugs();
    }
    moveProjectiles();
    refreshPosition();
    //window.setTimeout(gameLoop, 20);
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
window.onload= function (){
  init();
  currentTimestamp = new Date().getTime();
  gameLoop();
};
document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
      case 32: // down
        fire();
        break;
      case 37: // left
        moveShark(-10);
        break;

        case 38: // up
          fire();
          break;

        case 39: // right
          moveShark(10);
          break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};
