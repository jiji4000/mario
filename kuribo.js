function Kuribo(posX,posY){
	this.posX = posX;
	this.posY = posY;
}

/*
	描画関数
	ctx:context
	texture:img class
*/
Kuribo.prototype.draw = function(ctx,texture){
	ctx.drawImage(texture, 0,32,32,32,this.posX,this.posY,32,32);
}
