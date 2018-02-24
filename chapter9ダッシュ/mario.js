function Mario(posX,posY){
	this.posX = posX;
	this.posY = posY;
	// どのタイミングでアニメーションを切り替えるか
	this.animCnt = 0;
	// 切り出す始点のX座標
	this.animX = 0;
	// 方向を切り替えるための変数
	this.direction = RIGHT_DIR;
	// ダッシュフラグ
	this.isDash = false;
}

/*
	描画関数
	ctx:context
	texture:img class
*/
Mario.prototype.draw = function(ctx,texture){
	ctx.drawImage(texture, this.animX * 32,this.direction * 32,32,32,this.posX,this.posY,32,32);
}

Mario.prototype.moveX = function(moveX){
	// 移動方向変える
	if(moveX > 0){
		this.direction = RIGHT_DIR;
	}
	else{
		this.direction = LEFT_DIR;
	}
	this.posX += moveX;
	// 2と1だと中間位置が存在しなくなる
	var cnt = this.isDash ? 2 : 1;
	this.animCnt += cnt;
	// animation
	if(this.animCnt >= 12){
		this.animCnt = 0;
		// 一定以上に達したらアニメーションを更新する
		if(++this.animX > 3){
			this.animX = 0;
		}
	}
}

Mario.prototype.setIsDash = function(isDash){
	this.isDash = isDash;
}
