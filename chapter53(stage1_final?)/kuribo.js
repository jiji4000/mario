function Kuribo(posX,posY,dir){
	this.posX = posX;
	this.posY = posY;
	// chapter25敵の移動
	this.addPosX = 0;
	// chapter37
	this.addPosY = 0;
	// どのタイミングでアニメーションを切り替えるか
	this.animCnt = 0;
	// 切り出す始点のX座標
	this.animX = 0;
	this.animY = 0;
	this.direction = dir;
	// マップチップ座標
	this.rightMapX = 0;
	this.leftMapX = 0;
	this.upMapY = 0;
	this.downMapY = 0;
	// chapter27
	this.state = NORMAL_STATE;
	this.height = 16;
	this.deadCnt = 0;
	// chapter47
	this.score = 100;
	// chapter53
	this.isStop = true;
}

/**
 * 初期化関数
 * @param {*} posX 
 * @param {*} posY 
 * @param {*} dir 
 * @param {*} state 
 */
Kuribo.prototype.init = function(posX,posY,dir,state = NORMAL_STATE){
	this.posX = posX;
	this.posY = posY;
	// chapter25敵の移動
	this.addPosX = 0;
	// chapter37
	this.addPosY = 0;
	// どのタイミングでアニメーションを切り替えるか
	this.animCnt = 0;
	// 切り出す始点のX座標
	this.animX = 0;
	this.animY = 0;
	this.direction = dir;
	// マップチップ座標
	this.rightMapX = 0;
	this.leftMapX = 0;
	this.upMapY = 0;
	this.downMapY = 0;
	// chapter27
	this.state = state;
	this.height = 16;
	this.deadCnt = 0;
	// chapter47
	this.score = 100;
	// chapter53
	this.isStop = true;
}

/*
	描画関数
	ctx:context
	texture:img class
	scrollX:X軸のスクロール量
*/
Kuribo.prototype.draw = function(ctx,texture,scoreTex,oneUpTex,scrollX){
	if(this.state != DEAD){
		ctx.drawImage(texture, (this.animX * 32) + (this.direction * 128),this.animY,32,32,this.posX - scrollX,this.posY,32,32);
	}
	this.drawScore(ctx,scoreTex,oneUpTex,scrollX);
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
	// 移動したのでマップ座標更新
	this.updateMapPositionX(this.posX);

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

/*
	chapter27
	キャラクターとの当たり判定
	mario:キャラクタークラス
*/
Kuribo.prototype.collisionWithMario = function(map,mario){
	if(!mario.isDead()){
		// x軸
		if(mario.moveNumX < this.posX + 32 && mario.moveNumX + 32 > this.posX)
		{
			// マリオの上とクリボの下(クリボは32*32で切り取られているので、最下部は32+される)
			if(mario.posY < this.posY + 32){
				// マリオの下とクリボの上
				// 踏みつけ判定(キャラの半分より上の場合踏みつけと判定させる)
				// マリオの下がクリボの上よりも下にある
				if(mario.posY + mario.height > this.posY + (32 - this.height)){
					// chapter41:star処理
					if(mario.isStar){
						this.setDeadCollisionAction();
						return;
					}
					// マリオの下がクリボの中間地点よりも上にある
					if(mario.posY + mario.height <= this.posY + (32 - this.height) + (this.height / 2)){
						// マリオが踏みつけた後の処理
						mario.stompAction();
						this.score = mario.getScore();
						// 潰れたアニメーションにする
						this.state = DEAD_ACTION;
						this.animY = 64;
						this.direction = LEFT_DIR;
						
					}
				 	else{
						mario.collisionWithEnemy(map);
					}
				}
			}
		}
	}
}

/*
	chapter27
	クリボの更新処理
*/
Kuribo.prototype.update = function(map,mario,moveNum){
	if(!this.isDead()){
		// マリオが一定の範囲内に来たら移動フラグを立てる
		this.checkMove(mario);
		if(!this.isStop){
			this.move(map,moveNum);
			// chapter37
			this.gravityAction(map);
			this.collisionWithMario(map,mario);
			// chapter39
			for(var i = 0;i < mario.MAX_FIRE_NUM;++i){
				this.collisionWithFire(mario.fire[i]);	
			}
		}
	}
	this.deadAction();
}

/**
	chapter28
	死亡時のアニメーション
*/
Kuribo.prototype.deadAction = function(){
	if(this.state == DEAD_ACTION)
	{
		if(this.deadCnt++ == DEAD_ANIM_FRAME){
			this.state = DEAD;
		}
	}
	else if(this.state == DEAD_FIRE_ACTION){
		// 重力を加算
		this.addPosY += GRAVITY_POWER;
		// 落下量調整
		if(this.addPosY >= MAX_GRAVITY){
		  this.addPosY = MAX_GRAVITY;
		}
		this.posY += this.addPosY;
		// 画面外まで落ちたら、処理を止める
		if(this.posY >= DISPLAY_HEIGHT){
			this.state = DEAD;
		}
	}
}

/**
	chapter28
	死亡判定
*/
Kuribo.prototype.isDead = function(){
	if(this.state >= DEAD_ACTION){
		return true;
	}
	return false;
}

/**
 * chapter37
 * ブロックの上にのっていた時に上昇させる処理 
 * 
 * blockPosX : ブロックのX座標
 * blockPosY : ブロックのY座標
*/
Kuribo.prototype.blockUpAction = function(blockPosX,blockPosY){
	// クリボが上にいた場合クリボを上昇させる
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

/**
 * chapter37
 * 重力動作
 * mapChip :対象のマップチップ配列
*/
Kuribo.prototype.gravityAction = function(mapChip){
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
 * chapter37
 * クリボ上下の当たり判定
*/
Kuribo.prototype.collisionY = function(map,posY){
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

/**
 * chapter39
 * collision with fire
 * 
 * fire:fire class
 */
Kuribo.prototype.collisionWithFire = function(fire){
	if(fire.state == NORMAL_STATE){
		// x軸
		if(fire.posX < this.posX + 32 && fire.posX + FIRE_SIZE > this.posX){
			// y軸
			if(fire.posY < this.posY + 32 && fire.posY + FIRE_SIZE > this.posY){
				this.setDeadCollisionAction();
				// ファイアーにも消えるアニメーションを設定する
				fire.collisionWithBlock();
			}
		}
	}
}

/**
 * chapter40
 * 
 * set collision reaction
 */
Kuribo.prototype.setDeadCollisionAction = function(){
	// fire用の死亡アニメーション
	this.state = DEAD_FIRE_ACTION;
	// 少しジャンプさせる
	this.addPosY = -8;
}

/**
 * スコアを描画する
 * @param {*} ctx 
 * @param {*} texture 
 * @param {*} oneUpTex 
 * @param {*} scrollX 
 */
Kuribo.prototype.drawScore = function(ctx,texture,oneUpTex,scrollX){
	if(this.state == DEAD_FIRE_ACTION || this.state == DEAD_ACTION){
		drawEnemyScore(ctx,texture,oneUpTex,this.posX - scrollX,this.posY,this.score);
	}
}

/**
 * chapter53
 * マリオの位置によりstopFlagをオフにする
 * 
 * @param {*} mario 
 */
Kuribo.prototype.checkMove = function(mario){
	// 一度だけ判定させる
	if(this.isStop){
		if(isOffStopFlag(this.posX,mario)){
			this.isStop = false;
		}
	}
}