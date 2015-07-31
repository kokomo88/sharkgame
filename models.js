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
  this.fire=fireLaserShark;
  this.destroy=destroyShark;
}
function Bug(){
  this.position = new Point();
  this.elem = document.createElement("div");
  this.elem.className = "bug";
  this.style=this.elem.style;
	this.parent=gameContainer;
	this.destroy = destroyBug;
  this.fire=fireBug;
}
function projectile(speed,x,y){
  this.position = new Point(x,y);
  this.speed = (speed)?speed:1;
  this.elem = document.createElement("div");
  this.elem.className = "projectile";
  this.style=this.elem.style;
	this.destroy = destroyProjectile;
	this.parent=gameContainer;
	this.id = count++;
	this.elem.id= this.id;
  initProjectilcePosition(this);
}
//modell methods
function setPoint(x,y){
  this.x=x;
  this.y=y;
}
function destroyBug(){
	this.parent.removeChild(this.elem);
  var index = bugs.indexOf(this);
  bugs.splice(index,1);
  bugNumber--;
  if (audio)sounds.explosionBug.audio.cloneNode(true).play();
}
function destroyProjectile(){
	//if (!this) return;
  this.parent.removeChild (this.elem);
}
function destroyShark(){
  if (audio) sounds.explosionShark.audio.cloneNode(true).play();
  endGame = true;
}
function fireBug(){
  if (!endGame){
    var p = new projectile(-0.5,this.position.x+(bugSize/2),this.position.y+bugSize);
    //p.position = new Point(this.position.x+(bugSize/2),this.position.y+bugSize);
    gameContainer.appendChild(p.elem);
    bugProjectiles.push(p);
    if (audio)sounds.laserBug.audio.cloneNode(true).play();
  }
}

function fireLaserShark(){
  if (!endGame){
    var p = new projectile();
    p.position = new Point(laserShark.position.x+(sharkSizeX/2),laserShark.position.y);

    gameContainer.appendChild(p.elem);
    projectiles.push(p);
    if (audio)sounds.laserShark.audio.cloneNode(true).play();
  }
}
