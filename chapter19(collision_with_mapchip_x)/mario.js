function Mario(posX,posY){
	// 定数
	this.NORMAL_JUMP_POWER = 10;
	this.DASH_JUMP_POWER = 13;
	// メンバー変数
	this.posX = posX;
	this.posY = posY;
	this.addPosX = 0;
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
	this.addPosX = moveX;
	// 移動後の加算量を渡す
	this.collisionX(mapChip,this.posX + this.addPosX);
	// 移動方向変える
	if(moveX > 0){
		this.direction = RIGHT_DIR;
	}
	else{
		this.direction = LEFT_DIR;
	}

	this.posX += this.addPosX;
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

/*
	chapter19
	オブジェクトとの当たり判定X
*/
Mario.prototype.collisionX = function(map,posX){
	this.updateMapPositionX(posX);
	// マリオの右側
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.upMapY][this.rightMapX])){
		// (加算される前の)中心点からの距離を見る
		var vecX = Math.abs((this.posX + (MAP_SIZE / 2)) - ((this.rightMapX * MAP_SIZE) + (MAP_SIZE / 2)));
		// Xの加算量調整
		this.addPosX = Math.abs(MAP_SIZE - vecX);
	}
	// マリオの左側
	else if(isObjectMap(map[this.downMapY][this.leftMapX]) || isObjectMap(map[this.upMapY][this.leftMapX])){
		// (加算される前の)中心点からの距離を見る
		var vecX = Math.abs((this.posX + (MAP_SIZE / 2)) - ((this.leftMapX * MAP_SIZE) + (MAP_SIZE / 2)));
		// Xの加算量調整
		this.addPosX = -Math.abs(MAP_SIZE - vecX);
	}
}

Mario.prototype.setIsDash = function(isDash){
	this.isDash = isDash;
}

/**
	ジャンプ動作
	isPush : 対象のキーが押されているか
*/
Mario.prototype.jumpAction = function(isPush){
	if(this.isJump){
		this.posY -= this.jumpPower;
		// 落下量を調整
		if(this.jumpPower > -MAX_GRAVITY){
			// 上昇中かつキーが押されている場合は下降量を減らす
			if(isPush && this.jumpPower > 0){
				this.jumpPower -= (GRAVITY_POWER - (GRAVITY_POWER / 2));
			}
			else {
				this.jumpPower -= GRAVITY_POWER;
			}
		}
		// 地面についた時
		if(this.posY >= 384){
			this.posY = 384;
			this.isJump = false;
			this.animOffsetX = 0;
		}
	}
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
	chapter18
	x軸方向のマップチップ座標の更新
*/
Mario.prototype.updateMapPositionX = function(posX){
	this.leftMapX = Math.floor(posX / MAP_SIZE);
	this.rightMapX = Math.floor((posX + MAP_SIZE - 1) / MAP_SIZE);
	// 配列外チェック
	if(this.leftMapX >= MAX_MAP_X){
			this.leftMapX = MAX_MAP_X;
	}
	if(this.leftMapX < 0){
			this.leftMapX = 0;
	}
	if(this.rightMapX >= MAX_MAP_X){
			this.rightMapX = MAX_MAP_X;
	}
	if(this.rightMapX < 0){
			this.rightMapX = 0;
	}
}

/**
	chapter17
	マップチップ座標を更新する
*/
Mario.prototype.updateMapPosition = function(){
	this.updateMapPositionX(this.posX);
    // x
    // this.leftMapX = Math.floor(this.posX / MAP_SIZE);
    // this.rightMapX = Math.floor((this.posX + MAP_SIZE - 1) / MAP_SIZE);
    // // 配列外チェック
    // if(this.leftMapX >= MAX_MAP_X){
    //     this.leftMapX = MAX_MAP_X;
    // }
    // if(this.leftMapX < 0){
    //     this.leftMapX = 0;
    // }
		// if(this.rightMapX >= MAX_MAP_X){
		// 		this.rightMapX = MAX_MAP_X;
		// }
		// if(this.rightMapX < 0){
		// 		this.rightMapX = 0;
		// }

    // y
		this.upMapY = Math.floor(this.posY / MAP_SIZE);		                 // 0-32で0,33-64で1
		this.downMapY = Math.floor((this.posY + MAP_SIZE - 1) / MAP_SIZE); // 0-32で0,33-64で1

    // 配列外チェック
    if(this.upMapY >= MAX_MAP_Y){
        this.upMapY = MAX_MAP_Y;
    }
    if(this.upMapY < 0){
        this.upMapY = 0;
    }
		if(this.downMapY >= MAX_MAP_Y){
				this.downMapY = MAX_MAP_Y;
		}
		if(this.downMapY < 0){
				this.downMapY = 0;
		}

		// log
		console.log("rightMapX = " + this.rightMapX + ", leftMapX = " + this.leftMapX + ",upMapY = " + this.upMapY + ",this.downMapY = " + this.downMapY);
		console.log("mario posX = " + this.posX + ",mario posY = " + this.posY);
}
