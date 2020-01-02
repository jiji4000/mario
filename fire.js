/**
 * fire.js
 * 
 * chapter39
 * 
 * fire object class
 * 
 */

function Fire(posX,posY){
	// 跳ね返り係数
	this.BOUND_POWER = 9;
	this.posX = posX;
	this.posY = posY;
	this.addX = 0;
	// start velocity is down
	this.addY = 2;	
	//  mapchip pos
	this.rightMapX = 0;
	this.leftMapX = 0;
	this.upMapY = 0;
	this.downMapY = 0;
	this.state = INACTIVE;
	// animation count
	this.animCnt = 0;
	// 切り出し範囲
	this.animX = 0;
}

/*
	draw
	
	ctx:context
	texture:img class
	scrollX:X align scroll num
*/
Fire.prototype.draw = function(ctx,texture,scrollX){
	if(this.state != INACTIVE){
		// 32よりも小さいので、両端plus4で対応
		ctx.drawImage(texture,this.animX + 4,448 + 4,32 - 4,32 - 4,this.posX - scrollX,this.posY,32 - 4,32 - 4);
	}
}

/**
 * shot fire!
 * 
 * posX : 発射されるX座標
 * posY : 発射されるY座標
 * direction : 発射される方向(定数を使う)
 */
Fire.prototype.shot = function(posX,posY,direction){
	this.posY = posY + 24;
	this.updateMapPosition();
	this.state = NORMAL_STATE;
	if(direction == RIGHT_DIR){
		this.posX = posX + 24;	
		this.addX = 7;
	}else{
		this.posX = posX - 8;
		this.addX = -7;
	}
	this.addY = -2;
}

/*
	move event
	
	moveNum:move amount
*/
Fire.prototype.move = function(mapChip){
	if(this.state != END_ANIMATION){
		this.updateMapPosition();
		// x方向の移動
		this.posX += this.addX;
		this.updateMapPositionX(this.posX);
		// x方向の当たり判定
		this.collisionX(mapChip,this.posX);
		
		// x軸方向の当たり判定があった場合は跳ねさせない
		if(this.state != END_ANIMATION){
			// 最初は下に向かって打つ、地面と下のマップチップが衝突したら跳ねさせるようにする
			if(this.addY > -MAX_GRAVITY){
				this.addY -= GRAVITY_POWER;
			}
			this.collisionY(mapChip,this.posY - this.addY);
			this.posY -= this.addY;
			this.updateMapPosition();
		}
	}
}

/**
 * x軸方向とのオブジェクトとの当たり判定 
 * 
*/
Fire.prototype.collisionX = function(map,posX){
	// 右側
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.upMapY][this.rightMapX])){
		this.collisionWithBlock();
	}
	// 左側
	else if(isObjectMap(map[this.downMapY][this.leftMapX]) || isObjectMap(map[this.upMapY][this.leftMapX])){
		this.collisionWithBlock();
	}
}

/**
 * objectとy軸方向との当たり判定
 */
Fire.prototype.collisionY = function(map,posY){
	// Y軸座標の更新
	this.updateMapPositionY(posY);	
	// マップ座標xを配列で保管する
	var mapsX = [this.rightMapX,this.leftMapX];
	for(var i = 0;i < 2;++i){
	  	// ファイアの上側に当たった場合は弾を消す
		if(isObjectMap(map[this.upMapY][mapsX[i]])){
			this.state = END_ANIMATION;
		}
	}
	// ファイアの下側とぶつかった場合(跳ね返り処理)
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.downMapY][this.leftMapX])){		
		var centerY = this.posY;
		var vecY = Math.abs((centerY + HALF_MAP_SIZE) - ((this.downMapY * MAP_SIZE) + HALF_MAP_SIZE));
//		// Yの加算量調整
		this.addY = this.BOUND_POWER;
		// 跳ね返らせる
		this.posY -= (this.addY + Math.abs(MAP_SIZE - vecY));
	}
}

/**
 * animation
 */
Fire.prototype.animation = function(){
	// end animationでは、ファイアーがぶつかった時の絵にさせる
	if(this.state == END_ANIMATION){
		if(this.animCnt >= 16){
			this.state = INACTIVE;
		}
	}
	else{
		if(this.animCnt % 2 == 0){
			this.animX += 32;
			// overしたら戻す
			if(this.animX >= 128){
				this.animX = 0;
			}
		}
	}
	this.animCnt++;
}

/**
 * ファイアーが画面外から消えたらフラグを戻す
 */
Fire.prototype.checkOut = function(marioPosX,mapScrollX){
	// ファイアの移動量。マリオの移動量によって、消える範囲がことなる
	if(Math.abs(this.posX - marioPosX) > DISPLAY_WIDTH - (marioPosX - mapScrollX)){
		this.state = INACTIVE;
	}
}

/**
 * blockとぶつかった時の処理
 */
Fire.prototype.collisionWithBlock = function(){
	this.animCnt = 0;
	this.state = END_ANIMATION;
	this.animX = 128;
}

/**
	update x align map pos

	posX : target object x align pos
*/
Fire.prototype.updateMapPositionX = function(posX){
	// x座標
	this.leftMapX = Math.floor(posX /  MAP_SIZE);
	this.rightMapX = Math.floor((posX + FIRE_SIZE - 1) / MAP_SIZE);
	
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
	update y align map pos

	posX : target object y align pos
*/
Fire.prototype.updateMapPositionY = function(posY){
	// y
	this.upMapY = Math.floor(posY / MAP_SIZE);
	this.downMapY = Math.floor((posY + FIRE_SIZE - 1) / MAP_SIZE);
	
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
	update x and y mapchip pos
*/
Fire.prototype.updateMapPosition = function(){
	this.updateMapPositionX(this.posX);
	this.updateMapPositionY(this.posY);
}

/**
 * update function
 * map:mapchip array
 * mario:mario class
 */
Fire.prototype.update = function(map,marioPosX,marioMapScrollX){
	if(this.state != INACTIVE){
		this.move(map);
		this.checkOut(marioPosX,marioMapScrollX);
		this.animation();
	}
}