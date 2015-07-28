var gameContainer;
var laserShark;
var bugs[];
var mapX = 0;
var mapY = 0;
//models
function Point(x,y){
  this.x=(x)?x:0;
  this.y=(y)?y:0;
}
function Shark(){
  this.position= new Point();
  this.elem = document.createElement("div");
  this.elem.className = "shark";
}
function Bug(){
  this.position = new Point();
  this.elem = document.createElement("div");
  this.elem.className = "bug";
}
function projectile(speed){
  this.position = new Point();
  this.speed = speed;
  this.elem = document.createElement("div");
  this.elem.className = "projectile";
}

//functions
function fillBugsArray(n){
  for(var i=n;i>0;i--){
    bugs[i]=new Bug();
  }
}

function init(){
  gameContainer = document.getElementById("gameContainer");
  laserShark = new Shark();
}
