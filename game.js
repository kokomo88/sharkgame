
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

//functions

function moveProjectiles(time,proj){

  for (var i in proj){
    var bugProjDestroy = (proj[i].position.y<  0 - 2 * projectileSizeY);
    var sharkProjDestroy =  (proj[i].position.y >  mapY);
    proj[i].position.y-=time * proj[i].speed;
		if (bugProjDestroy || sharkProjDestroy){
			proj[i].destroy();
			proj.splice(i,1);
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
      if (new Date().getTime()%(50-(Math.floor(Math.random()*10)+10))==0)
      bugs[i].fire();
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
      if (new Date().getTime()%5==0)
      bugs[i].fire();
      bugs[i].position.y+=25;
      if (bugs[i].position.y==(mapY-bugSize-sharkSizeY))
        endGame=true;
    }
    turn = false;
  }
}
function checkBugNumber(){
  switch (bugNumber){
    case 8:
      bugMovePeriodTime = 600;
      break;
    case 6:
      bugMovePeriodTime = 400;
      break;
    case 4:
      bugMovePeriodTime = 300;
    case 2:
      bugMovePeriodTime = 200;
    case 1:
      bugMovePeriodTime = 50;
      break;
    default:
      break;
  }
}
function gameLoop (){
	if (nextLevel){
		init();
	}
	if (!endGame){
    checkBugNumber();
    requestAnimationFrame(gameLoop);
    previousTimestamp = currentTimestamp;
    currentTimestamp = new Date().getTime();
    elapsedTime += currentTimestamp - previousTimestamp;
		lastRefresh = currentTimestamp - previousTimestamp;
    lastBugRefresh += currentTimestamp - previousTimestamp;

    //moving bugs
    if (lastBugRefresh > bugMovePeriodTime){
      lastBugRefresh = 0;
      moveBugs();
    }
    //moving shark projectiles
    moveProjectiles(lastRefresh,projectiles);
    moveProjectiles(lastRefresh,bugProjectiles);
    refreshPosition(lastRefresh);
		if (Key.isDown(Key.LEFT)) moveShark(-0.5,lastRefresh);
		if (Key.isDown(Key.RIGHT)) moveShark(+0.5,lastRefresh);
    if (Key.isPressed(Key.SPACE)) laserShark.fire();
    if (Key.isPressed(Key.UP)) laserShark.fire();
		detectCollision(projectiles,bugs);
    detectCollision(bugProjectiles,[laserShark]);
		if (bugNumber==0){endGame=true;nextLevel=true;}
  }
}

function refreshPosition(){
  for (var i in bugs){
    refreshElementPosition(bugs[i]);
  }
  for (var i in projectiles){
    refreshElementPosition(projectiles[i]);
  }
  for (var i in bugProjectiles){
    refreshElementPosition(bugProjectiles[i]);
  }
    refreshElementPosition(laserShark);
}

function refreshElementPosition(e){
  e.style.left = e.position.x;
  e.style.top = e.position.y;
}

function detectCollision(projectArr,targetArr){
  outerloop:
	for (var i in projectArr){
		for (var j in targetArr){
			square = targetArr[j];
			squareSize = bugSize;
			rect = projectArr[i];
			rectWidth = projectileSizeX;
			rectHeight = projectileSizeY;

			if (square.position.x < rect.position.x + rectWidth &&
        square.position.x + squareSize > rect.position.x &&
		    square.position.y < rect.position.y + rectHeight &&
        squareSize + square.position.y > rect.position.y) {
        //collision detected
        // destroyLaserbeam
				projectArr[i].destroy();
				projectArr.splice(i,1);

				//destroyBug
				targetArr[j].destroy();
        continue outerloop;
			}
		}
	}
}

window.onload= function (){
  init();
  currentTimestamp = new Date().getTime();
  gameLoop();
};
