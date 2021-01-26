function Star(posX,posY,dir){
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
	// ブロックからの出現アニメーションフラグ
	this.isFirstAnimation = true;
	this.offsetY = 0;
	// 跳ね返り係数
	this.BOUND_POWER = 11;
	this.ADD_X = 2;
}

/*
	描画関数
	ctx:context
	texture:img class
	scrollX:X軸のスクロール量
*/
Star.prototype.draw = function(ctx,texture,scrollX){
	if(this.state != INACTIVE){
		ctx.drawImage(texture, 0,416,32,this.offsetY,this.posX - scrollX,this.posY,32,this.offsetY);
	}
}

/*
	動かす役割

	moveNum:移動量
*/
Star.prototype.move = function(mapChip){		
	if(this.state != INACTIVE){
		this.updateMapPosition();
		// 向きにより加算量を調整する
		let moveNum = this.direction == LEFT_DIR ? -this.ADD_X : this.ADD_X;
		// 加算量を代入する
		this.addPosX = moveNum;
		// マップチップとの当たり判定
		this.collisionX(mapChip,this.posX + this.addPosX);
		this.posX += this.addPosX;
		// 移動したのでマップ座標更新
		this.updateMapPositionX(this.posX);
		
		// x軸方向の当たり判定があった場合は跳ねさせない
		if(this.state != INACTIVE){
			// 最初は下に向かって打つ、地面と下のマップチップが衝突したら跳ねさせるようにする
			if(this.addPosY > -MAX_GRAVITY){
				this.addPosY -= GRAVITY_POWER;
			}
			this.collisionY(mapChip,this.posY - this.addPosY);
			this.posY -= this.addPosY;
			this.updateMapPositionY(this.posY);
		}
	}	
}

/**
  重力動作
  mapChip:対象のマップチップ配列
*/
Star.prototype.gravityAction = function(mapChip){
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
Star.prototype.updateMapPositionX = function(posX){
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
Star.prototype.updateMapPositionY = function(posY){
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
Star.prototype.updateMapPosition = function(){
	this.updateMapPositionX(this.posX);
	this.updateMapPositionY(this.posY);
}

/**
	オブジェクトとの当たり判定X
*/
Star.prototype.collisionX = function(map,posX){
	this.updateMapPositionX(posX);
	// starの右側
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.upMapY][this.rightMapX])){
		// (加算される前の)中心点からの距離を取る
		var vecX = Math.abs((this.posX + HALF_MAP_SIZE) - ((this.rightMapX * MAP_SIZE) + HALF_MAP_SIZE));
		this.addPosX = Math.abs(MAP_SIZE - vecX);
		this.direction = LEFT_DIR;
	}
	// starの左側
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
Star.prototype.collisionY = function(map,posY){	
	// Y軸座標の更新
	this.updateMapPositionY(posY);	
	// マップ座標xを配列で保管する
	var mapsX = [this.rightMapX,this.leftMapX];
	for(var i = 0;i < 2;++i){
	  	// starの上側に当たった場合下に跳ね返る
		if(isObjectMap(map[this.upMapY][mapsX[i]])){
			// 当たったオブジェクトとの差分
			var vecY = Math.abs((this.posY + HALF_MAP_SIZE) - ((this.upMapY * MAP_SIZE) + HALF_MAP_SIZE));
			// Yの加算量調整
			this.addPosY = -1;
			// 上のオブジェクトの位置につける
			this.posY -= (Math.abs(MAP_SIZE - vecY));
		}
	}
	// スターの下側とぶつかった場合(跳ね返り処理)
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.downMapY][this.leftMapX])){		
		// 地面との差分
		var vecY = Math.abs((this.posY + HALF_MAP_SIZE) - ((this.downMapY * MAP_SIZE) + HALF_MAP_SIZE));
		// Yの加算量調整
		this.addPosY = this.BOUND_POWER;
		// 地面の位置につける
		this.posY += (Math.abs(MAP_SIZE - vecY));
	}	
}

/*
  マリオとの当たり判定

  map:マップチップ配列
  mario:Marioクラス
*/
Star.prototype.collisionWithMario = function(map,mario){
  if(!mario.isDead()){
    // x軸
    if(mario.moveNumX < this.posX + 32 && mario.moveNumX + 32 > this.posX)
    {
      // マリオの上とstarの下(starは32*32で切り取られているので、最下部は32+される)
      if(mario.posY < this.posY + 32){
        // マリオの下とstarの上
        if(mario.posY + mario.height > this.posY + (32 - this.height)){
          // マリオを無敵状態にする
          this.state = INACTIVE;
          mario.getStar();
        }
      }
    }
  }
}

/**
 * 更新処理
 */
Star.prototype.update = function(map,mario){
	if(this.state != INACTIVE){
		// 初回出現アニメーション
		if(this.isFirstAnimation){
			this.appearingAnimation();
		}
		else{
			this.move(map);
		}
		this.collisionWithMario(map,mario);
	}
}

/**
  キノコを出現させる処理

  posX:出現X座標
  posY:出現Y座標
*/
Star.prototype.activate = function(posX,posY,dir){
  this.posX = posX;
  this.posY = posY;
  this.state = NORMAL_STATE;
  this.dir = dir;
  let addX = dir == LEFT_DIR ? -this.ADD_X : this.ADD_X; 
  this.addPosX = addX;
  this.isFirstAnimation = true;
  this.offsetY = 0;
}

/**
 * star出現時のアニメーションを行う
 */
Star.prototype.appearingAnimation = function(){
	this.posY -= 1;
	this.offsetY += 1;
	if(this.offsetY == 32){
		this.isFirstAnimation = false;
	} 
}

/**
 * ブロックの上にのっていた時にスターを上昇させる処理 
 * 
 * blockPosX : ブロックのX座標
 * blockPosY : ブロックのY座標
*/
Star.prototype.blockUpAction = function(blockPosX,blockPosY){
	// キノコが上にあった場合キノコを上昇させる
	if(this.state == NORMAL_STATE){				
		// Y座標チェック
		if(blockPosY == this.posY + MAP_SIZE){
			// x座標チェック
			if(blockPosX < this.posX + MAP_SIZE  && blockPosX + MAP_SIZE > this.posX){
				this.addPosY = BLOCK_UP_ADD_Y;
			}
		}
	}		
}