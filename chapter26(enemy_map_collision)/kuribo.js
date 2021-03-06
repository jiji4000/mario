function Kuribo(posX,posY,dir){
	this.posX = posX;
	this.posY = posY;
	// chapter25敵の移動
	this.addPosX = 0;
	// どのタイミングでアニメーションを切り替えるか
	this.animCnt = 0;
	// 切り出す始点のX座標
	this.animX = 0;
	this.direction = dir;
	// マップチップ座標
	this.rightMapX = 0;
	this.leftMapX = 0;
	this.upMapY = 0;
	this.downMapY = 0;

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
	this.updateMapPosition();
	// 向きにより加算量を調整する
	moveNum = this.direction == LEFT_DIR ? -moveNum : moveNum;
	// 加算量を代入する
	this.addPosX = moveNum;
	// マップチップとの当たり判定
	this.collisionX(mapChip,this.posX + this.addPosX);

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

/**
	x軸方向のマップチップ座標の更新

	posX : マップチップ更新対象となるx座標
*/
Kuribo.prototype.updateMapPositionX = function(posX){
	// x座標
	this.leftMapX = Math.floor(posX / MAP_SIZE);
	this.rightMapX = Math.floor((posX + MAP_SIZE - 1) / MAP_SIZE);

	// 配列外チェック
	if(this.leftMapX >= MAX_MAP_CHIP_X){
		this.leftMapX = MAX_MAP_CHIP_X - 1;
	}
	if(this.leftMapX < 0){
		this.leftMapX = 0;
	}
	if(this.rightMapX >= MAX_MAP_CHIP_X){
		this.rightMapX = MAX_MAP_CHIP_X - 1;
	}
	if(this.rightMapX < 0){
		this.rightMapX = 0;
	}
}

/**
	chapter26
	Y軸方向のマップチップの更新
*/
Kuribo.prototype.updateMapPositionY = function(posY){
	// y
	this.upMapY = Math.floor(posY / MAP_SIZE);
	this.downMapY = Math.floor((posY + MAP_SIZE - 1) / MAP_SIZE);

	// 配列外チェック
	if(this.upMapY >= MAX_MAP_Y - 1){
		this.upMapY = MAX_MAP_Y - 1;
	}
	if(this.upMapY < 0){
		this.upMapY = 0;
	}
	if(this.downMapY >= MAX_MAP_Y - 1){
		this.downMapY = MAX_MAP_Y - 1;
	}
	if(this.downMapY < 0){
		this.downMapY = 0;
	}
}

/**
	chapter26
	マップチップ座標を更新する
*/
Kuribo.prototype.updateMapPosition = function(){
	this.updateMapPositionX(this.posX);
	this.updateMapPositionY(this.posY);
}

/**
	chapter26
	オブジェクトとの当たり判定X
*/
Kuribo.prototype.collisionX = function(map,posX){
	this.updateMapPositionX(posX);
	// クリボの右側
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.upMapY][this.rightMapX])){
		// (加算される前の)中心点からの距離を取る
		var vecX = Math.abs((this.posX + HALF_MAP_SIZE) - ((this.rightMapX * MAP_SIZE) + HALF_MAP_SIZE));
		this.addPosX = Math.abs(MAP_SIZE - vecX);
		this.direction = LEFT_DIR;
	}
	// クリボの左側
	else if(isObjectMap(map[this.downMapY][this.leftMapX]) || isObjectMap(map[this.upMapY][this.leftMapX])){
		// (加算される前の)中心点からの距離を取る
		var vecX = Math.abs((this.posX + HALF_MAP_SIZE) - ((this.leftMapX * MAP_SIZE) + HALF_MAP_SIZE));
		this.addPosX = -Math.abs(MAP_SIZE - vecX);
		this.direction = RIGHT_DIR;
	}
}
