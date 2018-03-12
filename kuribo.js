function Kuribo(posX,posY,dir){
	this.posX = posX;
	this.posY = posY;
	// chapter25敵の移動
	this.addNumX = 0;
	// どのタイミングでアニメーションを切り替えるか
	this.animCnt = 0;
	// 切り出す始点のX座標
	this.animX = 0;
	this.direction = dir;
}

/*
	描画関数
	ctx:context
	texture:img class
	scrollX:X軸のスクロール量
*/
Kuribo.prototype.draw = function(ctx,texture,scrollX){
	ctx.drawImage(texture, (this.animX * 32) + (this.direction * 128),32,32,32,this.posX - scrollX,this.posY,32,32);
}

/*
	動かす役割

	moveNum:移動量
*/
Kuribo.prototype.move = function(mapChip,moveNum){
	// 向きにより加算量を調整する
	moveNum = this.direction == LEFT_DIR ? -moveNum : moveNum;
	// 加算量を代入する
	this.addPosX = moveNum;
	this.posX += this.addPosX;

	// animation
	if(this.animCnt++ >= 12){
		this.animCnt = 0;
		// 一定以上に達したらアニメーションを更新する
		if(++this.animX > 3){
			this.animX = 0;
		}
	}
}
