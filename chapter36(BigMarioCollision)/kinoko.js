function Kinoko(posX,posY,dir){
	this.posX = posX;
	this.posY = posY;
	this.addPosX = 0;
	this.addPosY = 0;
	this.direction = dir;
	// マップチップ座標
	this.rightMapX = 0;
	this.leftMapX = 0;
	this.upMapY = 0;
	this.downMapY = 0;
	this.height = 32;
	this.state = INACTIVE;
}

/*
	描画関数
	ctx:context
	texture:img class
	scrollX:X軸のスクロール量
*/
Kinoko.prototype.draw = function(ctx,texture,scrollX){
	if(this.state != INACTIVE){
		ctx.drawImage(texture, 0,480,32,32,this.posX - scrollX,this.posY,32,32);
	}
}

/*
	動かす役割

	moveNum:移動量
*/
Kinoko.prototype.move = function(mapChip,moveNum){
	this.updateMapPosition();
	// 向きにより加算量を調整する
	moveNum = this.direction == LEFT_DIR ? -moveNum : moveNum;
	// 加算量を代入する
	this.addPosX = moveNum;
	// マップチップとの当たり判定
	this.collisionX(mapChip,this.posX + this.addPosX);

	this.posX += this.addPosX;
}

/**
  重力動作
  mapChip:対象のマップチップ配列
*/
Kinoko.prototype.gravityAction = function(mapChip){
  // 重力を加算
  this.addPosY += GRAVITY_POWER;
  // 落下量調整
  if(this.addPosY >= MAX_GRAVITY){
    this.addPosY = MAX_GRAVITY;
  }
  // Y軸方向の当たり判定(地面に接触している場合は、addPosYは0になる)
  this.collisionY(mapChip,this.posY + this.addPosY);
  this.posY += this.addPosY;
}

/**
	x軸方向のマップチップ座標の更新

	posX : マップチップ更新対象となるx座標
*/
Kinoko.prototype.updateMapPositionX = function(posX){
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
	Y軸方向のマップチップの更新
*/
Kinoko.prototype.updateMapPositionY = function(posY){
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
	マップチップ座標を更新する
*/
Kinoko.prototype.updateMapPosition = function(){
	this.updateMapPositionX(this.posX);
	this.updateMapPositionY(this.posY);
}

/**
	オブジェクトとの当たり判定X
*/
Kinoko.prototype.collisionX = function(map,posX){
	this.updateMapPositionX(posX);
	// キノコの右側
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.upMapY][this.rightMapX])){
		// (加算される前の)中心点からの距離を取る
		var vecX = Math.abs((this.posX + HALF_MAP_SIZE) - ((this.rightMapX * MAP_SIZE) + HALF_MAP_SIZE));
		this.addPosX = Math.abs(MAP_SIZE - vecX);
		this.direction = LEFT_DIR;
	}
	// キノコの左側
	else if(isObjectMap(map[this.downMapY][this.leftMapX]) || isObjectMap(map[this.upMapY][this.leftMapX])){
		// (加算される前の)中心点からの距離を取る
		var vecX = Math.abs((this.posX + HALF_MAP_SIZE) - ((this.leftMapX * MAP_SIZE) + HALF_MAP_SIZE));
		this.addPosX = -Math.abs(MAP_SIZE - vecX);
		this.direction = RIGHT_DIR;
	}
}

/**
	オブジェクトとの当たり判定Y
*/
Kinoko.prototype.collisionY = function(map,posY){
	this.updateMapPositionY(posY);

	// キャラの下側と接触した場合
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.downMapY][this.leftMapX])){
		// (加算される前の)中心点からの距離を見る
		var vecY = Math.abs((this.posY + HALF_MAP_SIZE) - ((this.downMapY * MAP_SIZE) + HALF_MAP_SIZE));
		// Yの加算量調整
		this.addPosY = Math.abs(MAP_SIZE - vecY);
		// 地面についた
		this.posY += this.addPosY;
		this.addPosY = 0;
	}
}

/*
  マリオとの当たり判定

  map:マップチップ配列
  mario:Marioクラス
*/
Kinoko.prototype.collisionWithMario = function(map,mario){
  if(!mario.isDead()){
    // x軸
    if(mario.moveNumX < this.posX + 32 && mario.moveNumX + 32 > this.posX)
    {
      // マリオの上とキノコの下(キノコは32*32で切り取られているので、最下部は32+される)
      if(mario.posY < this.posY + 32){
        // マリオの下とキノコの上
        if(mario.posY + mario.height > this.posY + (32 - this.height)){
          // マリオを大きくする処理を書く
          this.state = INACTIVE;
          // マリオを大きくする処理
          mario.getKinoko();
        }
      }
    }
  }
}

/*
	chapter27
	キノコの更新処理
*/
Kinoko.prototype.update = function(map,mario){
	if(this.state != INACTIVE){
		this.move(map,2);
		this.collisionWithMario(map,mario);
		this.gravityAction(map);
	}
}

/**
  キノコを出現させる処理

  posX:出現X座標
  posY:出現Y座標
*/
Kinoko.prototype.activate = function(posX,posY,dir){
  this.posX = posX;
  this.posY = posY;
  this.state = NORMAL_STATE;
  this.dir = dir;
}
