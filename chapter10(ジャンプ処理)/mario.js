function Mario(posX,posY){
	// 定数
	this.NORMAL_JUMP_POWER = 10;
	this.DASH_JUMP_POWER = 13;
	// メンバー変数
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
}

/*
	描画関数
	ctx:context
	texture:img class
*/
Mario.prototype.draw = function(ctx,texture){
	ctx.drawImage(texture, (this.animX * 32) + this.animOffsetX,this.direction * 32,32,32,this.posX,this.posY,32,32);
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
