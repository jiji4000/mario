function Mario(posX,posY){
	this.posX = posX;
	this.posY = posY;
}

Mario.prototype.draw = function(ctx,texture){
	ctx.drawImage(texture,0,0,24,24,this.posX,this.posY,24,24);
}

Mario.prototype.moveX = function(moveX){
	this.posX += moveX;
}
