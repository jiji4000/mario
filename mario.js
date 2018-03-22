function Mario(posX,posY){
	// 定数
	this.NORMAL_JUMP_POWER = 10;
	this.DASH_JUMP_POWER = 13;
	this.addPosX = 0;
	this.addPosY = 0;
	this.posX = posX;
	this.posY = posY;
	// どのタイミングでアニメーションを切り替えるか
	this.animCnt = 0;
	// 切り出す始点のX座標
	this.animX = 0;
	this.animOffsetX = 0;
	// 方向を切り替えるための変数
	this.direction = RIGHT_DIR;
	// ダッシュフラグ
	this.isDash = false;
	// ジャンプ
	this.isJump = false;
	this.jumpCnt = 0;
	this.jumpPower = 0;
	// マップチップ座標
	this.rightMapX = 0;
	this.leftMapX = 0;
	this.upMapY = 0;
	this.downMapY = 0;
	// chapter22スクロール処理
	this.maxDrawMapX = DRAW_MAX_MAP_X;			// 最大の描画範囲X
	this.minDrawMapX = 0;		// 最小の描画範囲X
	this.mapScrollX = 0;		// スクロール量X
	this.moveNumX = 0;			// 総移動量X
	this.scrollEndX = (100 - 10) * MAP_SIZE - HALF_MAP_SIZE;		// スクロールの終わりとなる終点X
	// chapter27
	this.state = NORMAL_STATE;
	this.height = 32;
}

/*
	描画関数
	ctx:context
	texture:img class
*/
Mario.prototype.draw = function(ctx,texture){
	ctx.drawImage(texture, (this.animX * 32) + this.animOffsetX,this.direction * 32,32,32,this.posX,this.posY,32,32);
}

Mario.prototype.moveX = function(mapChip,moveX){
	// 加算量を代入する
	this.addPosX = moveX;
	// 移動後の加算量を渡すマップチップの状況に応じてx方向の加算量を決める
	this.collisionX(mapChip,this.moveNumX + this.addPosX);

	// 移動方向変える
	if(moveX > 0){
		this.direction = RIGHT_DIR;
	}
	else{
		this.direction = LEFT_DIR;
	}
	this.posX += this.addPosX;
	this.moveNumX += this.addPosX;
	this.updateMapPositionX(this.moveNumX);
	// ダッシュ時のアニメーションは早くする
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

/**
	ジャンプ動作ボタンが押された時にジャンプフラグを立てる
*/
Mario.prototype.setJumpSettings = function(isDash){
	if(!this.isJump){
		this.isJump = true;
		this.animOffsetX = 128;
		var jumpNum = isDash ? this.DASH_JUMP_POWER : this.NORMAL_JUMP_POWER;
		this.jumpPower = jumpNum;
	}
}

/**
	ジャンプ動作
	isPush : 対象のキーが押されているか
*/
Mario.prototype.jumpAction = function(isPush,mapChip){
	this.addPosY = this.jumpPower;
	this.collisionY(mapChip,this.posY - this.addPosY);
	this.posY -= this.addPosY;
	// 落下中はジャンプさせないようにする
	if(this.addPosY < 0){
		this.isJump = true;
	}

	// 落下量調整
	if(this.jumpPower > -MAX_GRAVITY){
		// 上昇中かつキーが押されている場合は下降量を減らす
		if(isPush && this.jumpPower > 0){
			this.jumpPower -= (GRAVITY_POWER - (GRAVITY_POWER / 2));
		}else{
			this.jumpPower -= GRAVITY_POWER;
		}
	}
	console.log("jumpPower = " + this.jumpPower);
}

/**
	x軸方向のマップチップ座標の更新

	posX : マップチップ更新対象となるx座標
*/
Mario.prototype.updateMapPositionX = function(posX){
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
	chapter20
	Y軸方向のマップチップの更新
*/
Mario.prototype.updateMapPositionY = function(posY){
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
	chapter17
	マップチップ座標を更新する
*/
Mario.prototype.updateMapPosition = function(){
	this.updateMapPositionX(this.moveNumX);
	this.updateMapPositionY(this.posY);
	// log
	console.log("rightMapX = " + this.rightMapX + ", leftMapX = " + this.leftMapX + ",upMapY = " + this.upMapY + ",this.downMapY = "
		+ this.downMapY);

	console.log("mario posX = " + this.posX + ",mario posY = " + this.posY);
}

/**
	chapter19
	オブジェクトとの当たり判定X
*/
Mario.prototype.collisionX = function(map,posX){
	this.updateMapPositionX(posX);
	// マリオの右側
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.upMapY][this.rightMapX])){
		// (加算される前の)中心点からの距離を取る
		var vecX = Math.abs((this.moveNumX + HALF_MAP_SIZE) - ((this.rightMapX * MAP_SIZE) + HALF_MAP_SIZE));
		this.addPosX = Math.abs(MAP_SIZE - vecX);
	}
	// マリオの左側
	else if(isObjectMap(map[this.downMapY][this.leftMapX]) || isObjectMap(map[this.upMapY][this.leftMapX])){
		// (加算される前の)中心点からの距離を取る
		var vecX = Math.abs((this.moveNumX + HALF_MAP_SIZE) - ((this.leftMapX * MAP_SIZE) + HALF_MAP_SIZE));
		this.addPosX = -Math.abs(MAP_SIZE - vecX);
	}
}

/**
	chapter20
	オブジェクトとの当たり判定Y
*/
Mario.prototype.collisionY = function(map,posY){
	this.updateMapPositionY(posY);
	// マリオの上側に当たった場合
	if(isObjectMap(map[this.upMapY][this.rightMapX]) || isObjectMap(map[this.upMapY][this.leftMapX])){
		// (加算される前の)中心点からの距離をみる
		var vecY = Math.abs((this.posY + HALF_MAP_SIZE) - ((this.upMapY * MAP_SIZE) + HALF_MAP_SIZE));
		// Yの加算量調整
		this.addPosY = Math.abs(MAP_SIZE - vecY);
		// 落下させる
		this.jumpPower = 0;
	}
	// マリオの下側
	else if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.downMapY][this.leftMapX])){
		// (加算される前の)中心点からの距離を見る
		var vecY = Math.abs((this.posY + HALF_MAP_SIZE) - ((this.downMapY * MAP_SIZE) + HALF_MAP_SIZE));
		// Yの加算量調整
		this.addPosY = Math.abs(MAP_SIZE - vecY);
		// 地面についた
		this.posY += this.addPosY;
		this.addPosY = 0;
		this.jumpPower = 0;
		this.isJump = false;
		// リセットアニメーション
		this.animOffsetX = 0;
	}
}

/**
	chapter22 スクロール処理
*/
Mario.prototype.doMapScrollX = function(){
	// スクロール基準点を越えたら
	if(this.moveNumX >= SCROLL_POINT_X && this.moveNumX < this.scrollEndX)
	{
		this.mapScrollX = this.moveNumX - SCROLL_POINT_X;		// マップスクロール量
		this.posX = SCROLL_POINT_X;							// 固定
		// マップを描画する範囲をずらす
		this.maxDrawMapX = DRAW_MAX_MAP_X + Math.floor(this.mapScrollX / MAP_SIZE);			// 最大の描画範囲X
		this.minDrawMapX = this.maxDrawMapX - DRAW_MAX_MAP_X;								// 最小の描画範囲X
	}
	// スクロールの終点まで来たらスクロールを止める
	else if(this.moveNumX >= this.scrollEndX)
	{
		this.mapScrollX = this.scrollEndX - SCROLL_POINT_X;		// マップスクロール量
		this.maxDrawMapX = MAX_MAP_X + Math.floor((this.mapScrollX + HALF_MAP_SIZE) / MAP_SIZE);			// 最大の描画範囲X
		if(this.maxDrawMapX > MAX_MAP_CHIP_X) this.maxDrawMapX = MAX_MAP_CHIP_X;
		this.minDrawMapX = this.maxDrawMapX - DRAW_MAX_MAP_X;								// 最小の描画範囲X
		// 中央固定を止める
		this.posX = this.moveNumX - this.mapScrollX;
	}
}

/*
	敵と当たった時のアクション
*/
Mario.prototype.collisionWithEnemy = function(){
	this.state = DEAD_ACTION;
	this.addPosY = 14;
}

/**
	死亡演出
*/
Mario.prototype.deadAction = function(){
	if(this.state == DEAD_ACTION)
	{
		this.posY -= this.addPosY;		// 上昇と下降
		if(this.addPosY >= -MAX_GRAVITY)
		{
			this.addPosY -= 1;
		}
		if(this.posY > 480)
		{
			this.state = DEAD;		// 死亡
		}
	}
}

/**
	マリオの死亡判定を返す
*/
Mario.prototype.isDead = function(){
	if(this.state >= DEAD_ACTION){
		return true;
	}
	return false;
}

/**
	マリオの更新関数
*/
Mario.prototype.update = function(mapChip){
	if(!this.isDead()){
	  // マップ座標の更新
	  this.updateMapPosition();
		// 左キーが押されている状態
		if(gLeftPush){
	    if(gSpacePush){
	        this.setIsDash(true);
			    this.moveX(mapChip,-DASH_SPEED);
	    }
	    else{
	      this.setIsDash(false);
	      this.moveX(mapChip,-NORMAL_SPPED);
	    }
		}
		// →キーが押されている状態
		if(gRightPush){
	    if(gSpacePush){
	        this.setIsDash(true);
			    this.moveX(mapChip,DASH_SPEED);
	    }
	    else{
	      this.setIsDash(false);
	      this.moveX(mapChip,NORMAL_SPPED);
	    }
		}

	  // ジャンプ動作
	  if(gUpPush){
	    // ジャンプ設定をオンにする
	    this.setJumpSettings(gSpacePush);
	  }
	  // ジャンプ処理
	  this.jumpAction(gUpPush,mapChip);

	  // scroll処理
	  this.doMapScrollX();
	}
	// 死亡後処理
	this.deadAction();
}
