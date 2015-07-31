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

function newLevel(){

  // bugs = [];
  // projectiles = [];
  // bugProjectiles = [];
  // time = 0;
  // lastRefresh = 0;
  // bugMovePeriodTime= 800;
  // levelBugNumber++;
  // bugNumber = levelBugNumber;
  // elapsedTime = 0;
  // endGame = false;
  // fillBugsArray(bugNumber);
  // initBugsPosition();
}

function init(){
  gameContainer = document.getElementById("gameContainer");
  while (gameContainer.firstChild) {
      gameContainer.removeChild(gameContainer.firstChild);
  }
  bugs = [];
  projectiles = [];
  bugProjectiles = [];
  laserShark =
  time = 0;
  lastRefresh = 0;
  bugMovePeriodTime= 800;
  bugDirection=0;
  bugNumber = levelBugNumber++;
  elapsedTime = 0;
  endGame = false;
  nextLevel = false;
  fillBugsArray(bugNumber);
  laserShark = new Shark();
  initBugsPosition();
  initSharkPosition();

  initProjectilcePosition = refreshElementPosition;

  window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
  window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
}
