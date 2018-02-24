function Mario(posX,posY){
	this.posX = posX;
	this.posY = posY;
	this.animCnt = 0;
	this.animX = 0;
	this.direction = RIGHT_DIR;
}

Mario.prototype.draw = function(ctx,texture){
	ctx.drawImage(texture,this.animX * 32,this.direction * 32,32,32,this.posX,this.posY,32,32);
}

Mario.prototype.moveX = function(moveX){
	// 移動方向を変える
	if(moveX > 0){
		this.direction = RIGHT_DIR;
	}
	else{
		this.direction = LEFT_DIR;
	}
	this.posX += moveX;
	// animation
	if(this.animCnt++ % 6 == 0){
		// 一定以上に達したらアニメーション更新する
		if(++this.animX > 3){
			this.animX = 0;
		}	
	}	
}

