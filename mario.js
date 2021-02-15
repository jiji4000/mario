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
	// chapter26
	this.centerMapY = 0;
	// chapter22スクロール処理
	this.maxDrawMapX = DRAW_MAX_MAP_X;			// 最大の描画範囲X
	this.minDrawMapX = 0;		// 最小の描画範囲X
	this.mapScrollX = 0;		// スクロール量X
	this.moveNumX = 0;			// 総移動量X
	this.scrollEndX = (100 - 10) * MAP_SIZE - HALF_MAP_SIZE;		// スクロールの終わりとなる終点X
	// chapter27
	this.state = NORMAL_STATE;
	this.height = 32;
	// chapter30
	this.coinNum = 0;
	this.playerNum = 3;
	// chapter33
	this.isBlockCoinAnim = [false,false];
	this.blockCoinFrame = [0,0];
	this.blockCoinX = [0,0];
	this.blockCoinY = [0,0];
	// chapter34
	this.kinoko = new Kinoko(0,0,LEFT_DIR);
	// chapter37
	this.blockAttackX = [[0,0,0,0],[0,0,0,0]];		// Block破壊時の座標X
	this.blockAttackY = [[0,0,0,0],[0,0,0,0]];		// Block破壊時の座標Y
	this.blockAttackCnt = [0,0];			// animation cnt
	this.blockAttackIndex = 0;			// blockのindex
	this.isBlockUp = [false,false];		// ブロック上昇フラグ
	this.isBlockAttack = [false,false];	// 破壊フラグ
	this.blockAttackAddY = [0,0];			// ブロックの移動量Y
	this.blockUpX = [0,0];				// 上昇ブロック用座標X
	this.blockUpY = [0,0];				// 上昇ブロック用座標Y
	this.blockAttackIndexX = [0,0];		// ブロックを移動させる対象のブロックマップチップ番号X
	this.blockAttackIndexY = [0,0];		// ブロックを移動させる対象のブロックマップチップ番号Y
	// chapter38
	this.fireKinoko = new FireKinoko(0,0);
	this.textureOffsetY = 0;
	// chapter39
	this.MAX_FIRE_NUM = 3;
	this.fire = [];
	for(var i = 0;i < this.MAX_FIRE_NUM;++i){
		this.fire[i] = new Fire(0,0);
	}
	// chapter41
	this.star = new Star(0,0,LEFT_DIR);
	this.isStar = false;
	this.starOffsetX = 0;
	this.starTimer = 0;		// star状態の時間
	// chapter42
	this.docanMoveCnt = 0;			// 土管移動用カウンター
	this.mapMoveStage = MAP_ONE;		// 遷移先マップ
	this.docanfirstMoveDirection = DOCAN_UP;	// 移動方向
	this.docanEndMoveDirection = DOCAN_UP;	// 移動方向
	this.isMapMove = false;			// map移動中フラグ
	this.isSecondMapMove = false;		// 土管から出てくる時のフラグ
	this.docanPosX1 = 0;				// 最初に遷移するX
	this.docanPosY1 = 0;				// 最初に遷移するY
	this.docanPosX2 = 0;				// 遷移後のx
	this.docanPosY2 = 0;				// 遷移後のy
	this.newMapSizeX = 0;				// 新規マップのマップ描画量
	this.keyDisable = false;			// キー入力を受け付けないフラグ
	// chapter43
	this.isSit = false;				// offsetに利用したいので、0 1で管理する
	this.textureHeight = MAP_SIZE;			// テクスチャを切り取る範囲Y
	// chapter44
	this.continueCnt = 0;			// マリオが死んでからコンテニュー画面に遷移するまでのタイマー時間
	// chapter45
	this.oneUpKinoko = new OneUpKinoko(0,0,LEFT_DIR);
	// one upを表示するタイマー
	this.oneUpCnt = 0;
	this.isDrawOneUp = false;
	// chapter47
	// 連続踏みつけ数
	this.sequenceJumpCnt = 0;
	// chapter48
	// 無敵フラグ
	this.isInvincible = false;
	this.invincibleCnt = 0;
	// 小さくなるアニメーションフラグ
	this.onSmallAnimation = false;
	this.smallAnimationCnt = 0;
	// chapter49
	// 隠しブロックの出現セーブ用
	this.hideBlockX = -1;
	this.hideBlockY = -1;
}

/**
 * マリオの初期化
 * @param {*} posX 
 * @param {*} posY 
 */
Mario.prototype.init = function(posX,posY){
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
	// chapter26
	this.centerMapY = 0;
	// chapter22スクロール処理
	this.maxDrawMapX = DRAW_MAX_MAP_X;			// 最大の描画範囲X
	this.minDrawMapX = 0;		// 最小の描画範囲X
	this.mapScrollX = 0;		// スクロール量X
	this.moveNumX = 0;			// 総移動量X
	this.scrollEndX = (100 - 10) * MAP_SIZE - HALF_MAP_SIZE;		// スクロールの終わりとなる終点X
	// chapter27
	this.state = NORMAL_STATE;
	this.height = 32;
	// chapter33
	this.isBlockCoinAnim = [false,false];
	this.blockCoinFrame = [0,0];
	this.blockCoinX = [0,0];
	this.blockCoinY = [0,0];
	// chapter37
	this.blockAttackX = [[0,0,0,0],[0,0,0,0]];		// Block破壊時の座標X
	this.blockAttackY = [[0,0,0,0],[0,0,0,0]];		// Block破壊時の座標Y
	this.blockAttackCnt = [0,0];			// animation cnt
	this.blockAttackIndex = 0;			// blockのindex
	this.isBlockUp = [false,false];		// ブロック上昇フラグ
	this.isBlockAttack = [false,false];	// 破壊フラグ
	this.blockAttackAddY = [0,0];			// ブロックの移動量Y
	this.blockUpX = [0,0];				// 上昇ブロック用座標X
	this.blockUpY = [0,0];				// 上昇ブロック用座標Y
	this.blockAttackIndexX = [0,0];		// ブロックを移動させる対象のブロックマップチップ番号X
	this.blockAttackIndexY = [0,0];		// ブロックを移動させる対象のブロックマップチップ番号Y
	this.textureOffsetY = 0;
	// chapter39
	this.isStar = false;
	this.starOffsetX = 0;
	this.starTimer = 0;		// star状態の時間
	// chapter42
	this.docanMoveCnt = 0;			// 土管移動用カウンター
	this.mapMoveStage = MAP_ONE;		// 遷移先マップ
	this.docanfirstMoveDirection = DOCAN_UP;	// 移動方向
	this.docanEndMoveDirection = DOCAN_UP;	// 移動方向
	this.isMapMove = false;			// map移動中フラグ
	this.isSecondMapMove = false;		// 土管から出てくる時のフラグ
	this.docanPosX1 = 0;				// 最初に遷移するX
	this.docanPosY1 = 0;				// 最初に遷移するY
	this.docanPosX2 = 0;				// 遷移後のx
	this.docanPosY2 = 0;				// 遷移後のy
	this.newMapSizeX = 0;				// 新規マップのマップ描画量
	this.keyDisable = false;			// キー入力を受け付けないフラグ
	// chapter43
	this.isSit = false;				// offsetに利用したいので、0 1で管理する
	this.textureHeight = MAP_SIZE;			// テクスチャを切り取る範囲Y
	// chapter44
	this.continueCnt = 0;			// マリオが死んでからコンテニュー画面に遷移するのタイマー時間
	// 連続踏みつけ数
	this.sequenceJumpCnt = 0;
	// 無敵フラグ
	this.isInvincible = false;
	this.invincibleCnt = 0;
	// 小さくなるアニメーションフラグ
	this.onSmallAnimation = false;
	this.smallAnimationCnt = 0;
}

/*
	描画関数
	ctx:context
	texture:img class
*/
Mario.prototype.draw = function(ctx,texture){
	let offsetY = this.isSit ? (29 + 64) : 0;
	ctx.drawImage(texture,this.starOffsetX + (this.animX * 32) + this.animOffsetX,((this.direction * 2) * this.textureHeight) + this.textureOffsetY + offsetY,32,this.height,this.posX,this.posY,32,this.height);
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
	this.increseAnimCnt(cnt);
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
	// 移動量を2分割する
	for(var i = 2;i > 0;--i){
		this.addPosY = parseInt(this.jumpPower / i);
		// 当たり判定があった場合は抜ける
		if(this.collisionY(mapChip,this.posY - this.addPosY)){
			break;
		}
	}
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
	// キノコ状態の時と分ける
	if(this.isBig()){
		// キノコ状態の時のマップチップ座標
		this.upMapY = Math.floor(posY / MAP_SIZE);
		// 通常よりもマップチップ一つ分多い
		this.downMapY = Math.floor((posY + this.height - 1) / MAP_SIZE);
		// 中央座標
		this.centerMapY = Math.floor((posY + MAP_SIZE - 1) / MAP_SIZE);
	}
	else{
		// 小さい状態
		this.upMapY = Math.floor(posY / MAP_SIZE);
		this.downMapY = Math.floor((posY + MAP_SIZE - 1) / MAP_SIZE);
		// 中央座標
		this.centerMapY = Math.floor((posY + (MAP_SIZE / 2) - 1) / MAP_SIZE);
	}

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
	// 中央座標の配列外チェック
	if(this.centerMapY >= MAX_MAP_Y - 1){
		this.centerMapY = MAX_MAP_Y - 1;
	}
	if(this.centerMapY < 0){
		this.centerMapY = 0;
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
//	console.log("rightMapX = " + this.rightMapX + ", leftMapX = " + this.leftMapX + ",upMapY = " + this.upMapY + ",this.downMapY = "
//		+ this.downMapY);

	//console.log("mario posX = " + this.posX + ",mario posY = " + this.posY);
}

/**
	chapter19
	オブジェクトとの当たり判定X
*/
Mario.prototype.collisionX = function(map,posX){
	// マップ移動中は当たり判定を起こさない
	if(!this.isMapMove){
		this.updateMapPositionX(posX);
		// マリオの右側
		if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.upMapY][this.rightMapX]) || isObjectMap(map[this.centerMapY][this.rightMapX])){
			// (加算される前の)中心点からの距離を取る
			var vecX = Math.abs((this.moveNumX + HALF_MAP_SIZE) - ((this.rightMapX * MAP_SIZE) + HALF_MAP_SIZE));
			this.addPosX = Math.abs(MAP_SIZE - vecX);
		}
		// マリオの左側
		else if(isObjectMap(map[this.downMapY][this.leftMapX]) || isObjectMap(map[this.upMapY][this.leftMapX]) || isObjectMap(map[this.centerMapY][this.leftMapX])){
			// (加算される前の)中心点からの距離を取る
			var vecX = Math.abs((this.moveNumX + HALF_MAP_SIZE) - ((this.leftMapX * MAP_SIZE) + HALF_MAP_SIZE));
			this.addPosX = -Math.abs(MAP_SIZE - vecX);
		}
	}
}

/**
 * Y軸方向の当たり判定
 * 
 * @param {*} map 
 * @param {*} posY 
 * 
 * return : 当たり判定の有無
 */
Mario.prototype.collisionY = function(map,posY){
	if(!this.isMapMove){
		this.updateMapPositionY(posY);
		// マップ座標xを配列で保管する
		var mapsX = [this.rightMapX,this.leftMapX];
		for(var i = 0;i < 2;++i){
			// マリオの上側に当たった場合
			if(isObjectMap(map[this.upMapY][mapsX[i]])){
				// コインブロックだった場合
				if(isCoinBlock(map[this.upMapY][mapsX[i]])){
					// コインブロック用のアニメーションをセットする
					var coinX = mapsX[i] * MAP_SIZE;
					// 一つ上にセットする
					var coinY = (this.upMapY - 1) * MAP_SIZE;
					this.setBlockCoinMapAnim(i,coinX,coinY);
					// ボックスを空にする
					replaceEmptyBoxMap(map,mapsX[i],this.upMapY);
					// coinの取得
					this.getCoin();
				}

				// キノコブロックだった場合(chapter34&38)
				if(isKinokoBlock(map[this.upMapY][mapsX[i]])){
					// chapter40 キノコを有効化する処理を関数にした
					var kinokoPosX = mapsX[i] * MAP_SIZE;
					var kinokoPosY = this.upMapY * MAP_SIZE;
					this.activateKinoko(kinokoPosX,kinokoPosY,LEFT_DIR);
					// ボックスを空にする
					replaceEmptyBoxMap(map,mapsX[i],this.upMapY);
				}

				// starブロックだった場合(chapter41)
				if(isStarBlock(map[this.upMapY][mapsX[i]])){
					// chapter40 キノコを有効化する処理を関数にした
					let starPosX = mapsX[i] * MAP_SIZE;
					let starPosY = this.upMapY * MAP_SIZE;
					this.star.activate(starPosX,starPosY,LEFT_DIR);
					// ボックスを空にする
					replaceEmptyBoxMap(map,mapsX[i],this.upMapY);
				}      
				
				// ブロックのアニメーション
				if(isBlockMap(map[this.upMapY][mapsX[i]])){
					var posX = mapsX[i] * MAP_SIZE;
					var posY = this.upMapY * MAP_SIZE;
					this.blockAction(mapsX[i],this.upMapY,false,map);
				}

				// one up blockだった場合
				if(isOneUpBlock(map[this.upMapY][mapsX[i]])){
					let posX = mapsX[i] * MAP_SIZE;
					let posY = this.upMapY * MAP_SIZE;
					this.oneUpKinoko.activate(posX,posY,LEFT_DIR);
					// ボックスを空にする
					replaceEmptyBoxMap(map,mapsX[i],this.upMapY);
				}
				// (加算される前の)中心点からの距離をみる
				var vecY = Math.abs((this.posY + HALF_MAP_SIZE) - ((this.upMapY * MAP_SIZE) + HALF_MAP_SIZE));
				// Yの加算量調整
				this.addPosY = Math.abs(MAP_SIZE - vecY);
				// 落下させる
				this.jumpPower = 0;
				return true;
			}
			// 隠しブロックだった場合
			else if(isHideBlock(map[this.upMapY][mapsX[i]])){
				// ブロックの下半分かつマリオが上昇中のみ隠しブロックを出現させる
				if(this.addPosY > 0){
					// 半分以下なら隠しブロックを出現させる
					let blockPosY = (this.upMapY * MAP_SIZE) - HALF_MAP_SIZE;
					// マリオの頭上が隠しブロックブロックの半分の位置以下
					if(posY - 32 > blockPosY){
						// 隠し1up block
						if((map[this.upMapY][mapsX[i]])){
							// 1up kinokoを出現させる
							let posX = mapsX[i] * MAP_SIZE;
							let posY = this.upMapY * MAP_SIZE;
							this.oneUpKinoko.activate(posX,posY,LEFT_DIR);
							// ボックスを空にする
							replaceEmptyBoxMap(map,mapsX[i],this.upMapY);
							// 隠しブロックが出現しないように状態を保存する。
							this.hideBlockX = mapsX[i];
							this.hideBlockY = this.upMapY;
						}
						// (加算される前の)中心点からの距離をみる
						var vecY = Math.abs((this.posY + HALF_MAP_SIZE) - ((this.upMapY * MAP_SIZE) + HALF_MAP_SIZE));
						// Yの加算量調整
						this.addPosY = Math.abs(MAP_SIZE - vecY);
						// 落下させる
						this.jumpPower = 0;
						return true;
					}
				}
			}			
		}
		// マリオの下側
		if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.downMapY][this.leftMapX])){
			// (加算される前の)中心点からの距離を見る
			var centerY = this.height == 64 ? this.posY + 32 : this.posY;
			var vecY = Math.abs((centerY + HALF_MAP_SIZE) - ((this.downMapY * MAP_SIZE) + HALF_MAP_SIZE));
			// Yの加算量調整
			this.addPosY = Math.abs(MAP_SIZE - vecY);
			// 地面についた
			this.posY += this.addPosY;
			this.addPosY = 0;
			this.jumpPower = 0;
			this.isJump = false;
			// リセットアニメーション
			this.animOffsetX = 0;
			// chapter47 地面についたら連続ジャンプのカウントをゼロにする
			this.sequenceJumpCnt = 0;
			return true;
		}
	}
	return false;
}

/**
  アイテムマップチップオブジェクトとの当たり判定
*/
Mario.prototype.collisionWithMapItem = function(map){
  var mapsX = [this.rightMapX,this.leftMapX];
  var mapsY = [this.upMapY,this.downMapY];
  for(var y = 0;y < 2;++y){
    for(var x = 0;x < 2;++x){
      // コインとの当たり判定
      if(isCoinMap(map[mapsY[y]][mapsX[x]])){
        // マップチップと空のマップを入れ替える
        replaceEmptyMap(map,mapsX[x],mapsY[y]);
        // コインを取得した時の処理
        this.getCoin();
      }
    }
  }
}

/**
  ブロックコインのアニメーション処理のセット
  index : coinblockの配列index
*/
Mario.prototype.setBlockCoinMapAnim = function(index,posX,posY){
  this.isBlockCoinAnim[index] = true;
  this.blockCoinFrame[index] = 0;
  this.blockCoinX[index] = posX;
  this.blockCoinY[index] = posY;
}

/**
  ブロックコインのアニメーション処理
*/
Mario.prototype.animateBlockCoin = function(){
  for(var i = 0;i < MAX_MAP_BLOCK;++i){
    if(this.isBlockCoinAnim[i]){
      // コインを上昇させる
      this.blockCoinY[i] -= 1;
      if(this.blockCoinFrame[i]++ >= MAX_BLOCK_COIN_FRAME){
        this.isBlockCoinAnim[i] = false;
      }
    }
  }
}

/**
  コインを取得した時の処理
*/
Mario.prototype.getCoin = function(){
  // コインを100枚とったら1upさせる
  // スコア上昇
  gScore += COIN_SCORE;
  if(++this.coinNum >= 100){
    this.coinNum = 0;
    this.playerNum++;
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
	// 無敵状態の時は実行しない
	if(!this.isInvincible){
		// でかい状態なら一回もつ
		if(this.isBig()){
			// 小さくする
			this.height = MAP_SIZE;
			this.textureHeight = MAP_SIZE;
			this.textureOffsetY = 0;
			this.posY += MAP_SIZE;
			this.updateMapPositionY(this.posY);
			this.state = NORMAL_STATE;
			this.isInvincible = true;
			this.onSmallAnimation = true;
			this.keyDisable = true;
			// 全体の動きを止めるフラグ
			gActionStop = true;
		}
		else{
			this.setDeadParam();
		}
	}
}

/**
	死亡演出
*/
Mario.prototype.deadAction = function(){
	if(this.state == DEAD_ACTION){
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
	else if(this.state == DEAD){
		// 一定時間たったらコンテニュー画面へ
		if(this.continueCnt++ >= CONTINUE_CNT){
			this.playerNum--;
			if(this.playerNum <= 0){
				gState = GAME_OVER;
			}
			else{
				gState = PRE_STAGE;
			}
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
 * マリオがキノコを取得した時の処理
 */
Mario.prototype.getKinoko = function(){
	this.state = KINOKO_STATE;
	this.height = MAP_SIZE * 2;
	this.posY -= MAP_SIZE;
	this.textureOffsetY = 128;
	this.textureHeight = MAP_SIZE * 2;
	gScore += KINOKO_SCORE;
}

/**
 * get fire kinoko action
 */
Mario.prototype.getFireKinoko = function(){
	this.state = FIRE_STATE;
	this.textureOffsetY = 384;
	this.textureHeight = MAP_SIZE * 2;
	gScore += FIRE_SCORE;
}

/**
	マリオの更新関数
	
	kuribos:マリオのブロックアクション時に連動させるクリボの配列
	nokos:マリオのブロックアクション時に連動させるノコノコの配列
	docans:土管オブジェクト
*/
Mario.prototype.update = function(mapChip,kuribos,nokos,docans){
	if(!this.isDead()){
	  // マップ座標の更新
	  this.updateMapPosition();
		// 左キーが押されている状態
		if(!this.keyDisable && !this.isSit){
			if(gLeftPush){
				for(var i = 0;i < docans.length;++i){
					this.docanXEnter(docans[i],LEFT_DIR);
				}
				if(gSpacePush){
					this.setIsDash(true);
					this.moveX(mapChip,-DASH_SPEED);
				}
				else{
					this.setIsDash(false);
					this.moveX(mapChip,-NORMAL_SPPED);
				}
			}
		}
		// →キーが押されている状態
		if(!this.keyDisable && !this.isSit){
			if(gRightPush){
				for(var i = 0;i < docans.length;++i){
					this.docanXEnter(docans[i],RIGHT_DIR);
				}
				if(gSpacePush){
					this.setIsDash(true);
					this.moveX(mapChip,DASH_SPEED);
				}
				else{
					this.setIsDash(false);
					this.moveX(mapChip,NORMAL_SPPED);
				}
			}
		}

		// 下キーが押された
		if(gDownPush){
			if(!this.keyDisable){
				this.sit();
				for(var i = 0;i < docans.length;++i){
					this.docanDownEnter(docans[i]);
				}
			}
		}
		else{
			this.sitRelease();
		}
		this.docanMove();

	  	// ジャンプ動作
	  	if(!this.keyDisable){
			if(gUpPush){
				// ジャンプ設定をオンにする
				this.setJumpSettings(gSpacePush);
			}
		}
		// ジャンプ処理
		if(!this.isMapMove && !gActionStop){
			this.jumpAction(gUpPush,mapChip);
		}
		// マップチップアイテムオブジェクトとの当たり判定
		this.collisionWithMapItem(mapChip);
		// blockが動いたことによる当たり判定
		this.blockCollisionAction(kuribos,nokos);
			
		// fireShot処理
		if(!this.keyDisable){
			if(gADown){
				// key状態を解除
				gADown = false;
				this.shotFire();
			}
		}
		// scroll処理
		this.doMapScrollX();
		// star処理
		this.starAction();
		// 無敵処理
		this.invincibleAction();
		// 小さくする処理
		this.smallAnimationAction();
		// one up動作
		this.oneUpAction();
	}
	// update fire
	for(var i = 0;i < this.MAX_FIRE_NUM;++i){
		this.fire[i].update(mapChip,this.moveNumX,this.mapScrollX);
	}
	
	// 死亡後処理
	this.deadAction();
}

/**
 * chapter37
 * ブロックの上昇処理か破壊処理のアニメーション設定を仕込む
 * 
 * mapIndexX : map index x座標
 * mapIndexY : map index y座標
 * map:マップチップ配列
 * isUp:破壊できないマップの場合は上昇させる
 */
Mario.prototype.blockAction = function(mapIndexX,mapIndexY,isUp,map){
	// 対象のマップチップ座標を代入
	this.blockAttackIndexX[this.blockAttackIndex] = mapIndexX;
	this.blockAttackIndexY[this.blockAttackIndex] = mapIndexY;
	// 小さいかつ上昇フラグが立っている場合は破壊できないので、上昇させる
	if(this.state == NORMAL_STATE && !isUp)
	{
		this.isBlockUp[this.blockAttackIndex] = true;	// 上昇フラグon
		this.blockUpX[this.blockAttackIndex] = mapIndexX * MAP_SIZE;
		this.blockUpY[this.blockAttackIndex] = mapIndexY * MAP_SIZE;
		this.blockAttackAddY[this.blockAttackIndex] = 8;
	}
	// 大きい場合は破壊可能
	else if(this.isBig()){
		// 空マップにする
		replaceEmptyMap(map,mapIndexX,mapIndexY);
		// アニメーションを仕込む
		this.isBlockAttack[this.blockAttackIndex] = true;				// block attack flag
		// 右と左で分けているんだ
		this.blockAttackX[this.blockAttackIndex][0] = this.blockAttackX[this.blockAttackIndex][1] = mapIndexX * MAP_SIZE;
		this.blockAttackX[this.blockAttackIndex][2] = this.blockAttackX[this.blockAttackIndex][3] = mapIndexX * MAP_SIZE + HALF_MAP_SIZE;
		this.blockAttackY[this.blockAttackIndex][0] = this.blockAttackY[this.blockAttackIndex][2] = mapIndexY * MAP_SIZE + HALF_MAP_SIZE;
		this.blockAttackY[this.blockAttackIndex][1] = this.blockAttackY[this.blockAttackIndex][3] = mapIndexY * MAP_SIZE - HALF_MAP_SIZE;				
		this.blockAttackAddY[this.blockAttackIndex] = 10;
	}
	// animationフラグとして利用
	this.blockAttackCnt[this.blockAttackIndex]++;
	// 対象のブロック
	if(++this.blockAttackIndex >= MAX_MAP_BLOCK)this.blockAttackIndex = 0;
}

/**
 * chapter37
 * ブロックのアニメーション処理
 */
Mario.prototype.animateBlock = function(map){
	// ブロックの数分
	for(var i = 0;i < MAX_MAP_BLOCK;++i){
		// ブロック破壊フラグ
		if(this.isBlockAttack[i]){
			// 上昇させる
			for(var j = 0;j < 4;++j){
				this.blockAttackY[i][j] -= this.blockAttackAddY[i];
			}
			this.blockAttackAddY[i] -= 1;
			// 4つのブロックのアニメーション
			this.blockAttackX[i][0] -= 4;
			this.blockAttackX[i][1] = this.blockAttackX[i][0];
			this.blockAttackX[i][2] += 4;
			this.blockAttackX[i][3] = this.blockAttackX[i][2];
			// ブロックが画面外に出たらアニメーションを停止する
			if(this.blockAttackY[i][3] >= 512){
				this.isBlockAttack[i] = false;
			}
		}
		// ブロック上昇処理
		else if(this.isBlockUp[i]){			
			this.blockAttackAddY[i] -= 1;
			// 上下運動が終わった場合
			if(this.blockAttackAddY[i] == 0){
				this.isBlockUp[i] = false;
			}
		}
	}
}

/**
 * chapter37
 * blockが移動したときのcollision eventを発生させる
 * collisionのところで呼ぶ
 * 
 * kuribos:マップチップアクションの対象となるクリボの配列
 * nokos:マップチップアクションの対象となるクリボの配列
*/
Mario.prototype.blockCollisionAction = function(kuribos,nokos){
	for(var i = 0;i < MAX_MAP_BLOCK;++i){
		// ブロック破壊フラグ
		if(this.isBlockAttack[i]){
			// きのこの上昇処理(ずらした分を考慮)
			this.kinoko.blockUpAction(this.blockAttackX[i][0],this.blockAttackY[i][0] - HALF_MAP_SIZE);
			// one up kinokoの上昇処理
			this.oneUpKinoko.blockUpAction(this.blockAttackX[i][0],this.blockAttackY[i][0] - HALF_MAP_SIZE);
			// クリボの当たり判定
			if(kuribos != null){
				for(var j = 0;j < kuribos.length;++j){
					kuribos[j].blockUpAction(this.blockAttackX[i][0],this.blockAttackY[i][0] - HALF_MAP_SIZE);
				}
			}
			// ノコノコの当たり判定
			if(nokos != null){
				for(var j = 0;j < nokos.length;++j){
					nokos[j].blockUpAction(this.blockAttackX[i][0],this.blockAttackY[i][0] - HALF_MAP_SIZE);
				}
			}
		}
		// ブロック上昇処理
		else if(this.isBlockUp[i]){
			// きのこの上昇処理
			this.kinoko.blockUpAction(this.blockUpX[i],this.blockUpY[i]);
			this.oneUpKinoko.blockUpAction(this.blockUpX[i],this.blockUpY[i]);
			// クリボ
			if(kuribos != null){
				for(var j = 0;j < kuribos.length;++j){
					kuribos[j].blockUpAction(this.blockUpX[i],this.blockUpY[i]);
				}
			}
			// ノコノコ
			if(nokos != null){
				for(var j = 0;j < nokos.length;++j){
					nokos[j].blockUpAction(this.blockUpX[i],this.blockUpY[i]);
				}
			}
		}
	}
}

/**
 * judge big size mario
 * 
 * return:if big true
 */
Mario.prototype.isBig = function(){
	if(this.state == KINOKO_STATE || this.state == FIRE_STATE){
		return true;
	}
	return false;
}

/**
 * chapter39
 * ファイアマリオ状態時にファイアを打たせる
 */
Mario.prototype.shotFire = function(){
	if(this.state == FIRE_STATE){
		for(var i = 0;i < this.MAX_FIRE_NUM;++i){
			// 非活性のものを探す
			if(this.fire[i].state == INACTIVE){
				this.fire[i].shot(this.moveNumX,this.posY,this.direction);
				break;
			}
		}
	}
}

/**
 * chapter40
 * キノコを有効化する関数
 */
Mario.prototype.activateKinoko = function(posX,posY,direction){
	if(this.isBig()){
		this.fireKinoko.activate(posX,posY);
	}else{
		this.kinoko.activate(posX,posY,direction);
	}
}

/**
 * chapter41
 * star状態の処理
 */
Mario.prototype.starAction = function(){
	if(this.isStar){
		this.starTimer++;
		// 10秒まで
		if(this.starTimer < 600){
			if(this.starTimer % 4 == 0){
				this.starOffsetX += 256;
				if(this.starOffsetX >= 1024){
					this.starOffsetX = 0;
				}
			}
		// 消える期間(初代では目安12秒だった)
		}else if(this.starTimer >= 600 && this.starTimer < 720){
			if(this.starTimer % 8 == 0){
				this.starOffsetX += 256;
				if(this.starOffsetX >= 1024){
					this.starOffsetX = 0;
				}
			}
		}
		// 完全終了
		else{
			this.isStar = false;
			this.starOffsetX = 0;
			this.starTimer = 0;
		}
	}
}

/**
 * chapter41
 * star取得時の処理
 */
Mario.prototype.getStar = function(){
	this.isStar = true;
	this.starOffsetX = 0;
	this.starTimer = 0;		
}

/**
 * chapter42 ドカンが下方向に突入できるか判定
 * @param {*} docan 
 */
Mario.prototype.docanDownEnter = function(docan){
	let offset = 8
	// x軸
	if(this.moveNumX >= docan.posX + offset && this.moveNumX + 32 <= docan.posX + docan.width - offset){
		// デカくなったときはサイズが変わる
		let tall = this.height - 32;
		// y軸
		if(this.posY + tall == docan.posY){
			this.setDocanParam(docan);
		}
	}
}

/**
 * 
 * @param {土管クラス} docan 
 * @param {マリオの移動方向} direction 
 */
Mario.prototype.docanXEnter = function(docan,direction){
	// y軸:地面についていないと侵入できない
	if(this.posY + this.height == docan.posY + docan.height){
		// マリオが左方向かつ土管が左方向に進む場合
		if(direction == LEFT_DIR && docan.firstDirection == DOCAN_LEFT){
			// x座標
			if(this.moveNumX == docan.posX + docan.width){			
				this.setDocanParam(docan)
			}
		}
		// マリオが右方向かつ土管が右方向に進む
		else if(direction == RIGHT_DIR && docan.firstDirection == DOCAN_RIGHT){
			// x座標
			if(this.moveNumX + MAP_SIZE == docan.posX){
				this.setDocanParam(docan)
			}
		}
	}
}

/**
 * 土管移動用のパラメータをセットする
 * @param {*} docan 
 */
Mario.prototype.setDocanParam = function(docan){
	this.isMapMove = true;		// マップ移動中フラグ(当たり判定などをおこさせない)
	this.keyDisable = true;		// キー操作無効フラグ
	this.mapMoveStage = docan.mapNumber;		// マップ移動番号
	this.docanFirstMoveDirection = docan.firstDirection;	// ドカンに入る際にマリオがに移動する方向
	this.docanEndMoveDirection = docan.endDirection;		// ドカンから出る際ににマリオが移動する方向
	this.isSecondMapMove = false;		// 入る際はfalse,出る際はtrue
	this.newMapSizeX = docan.mapSizeX;	// 新しいマップのXサイズスクロール判定に使用する
	// でかい時にずれる量を調整する
	let height = this.isBig() ? 32 : 0;

	// 土管の出る位置によってスタート地点を変える
	switch(this.docanEndMoveDirection){
		case DOCAN_UP:
			// 出てくる位置を2つ下げる
			this.docanPosY1 = docan.endY + (MAP_SIZE * 2) - height;
			this.docanPosX1 = docan.endX;
			this.docanPosY2 = docan.endY - height;
			break;
		case DOCAN_DOWN:
			this.docanPosY1 = docan.endY - (MAP_SIZE * 2) - height;
			this.docanPosX1 = docan.endX;
			this.docanPosY2 = docan.endY;
			break;
		case DOCAN_RIGHT:
			this.docanPosX1 = docan.endX - (MAP_SIZE * 2);
			this.docanPosY1 = docan.endY;
			this.docanPosX2 = docan.endX;
			break;
		case DOCAN_LEFT:
			this.docanPosX1 = docan.endX - (MAP_SIZE * 2);
			this.docanPosY1 = docan.endY;
			this.docanPosX2 = docan.endX;
			break;
	}
}

/**
 * chapter42
 * 
 * ドカン移動関数
 */
Mario.prototype.docanMove = function(){
	if(this.isMapMove){
		// 一回目の移動
		if(!this.isSecondMapMove){
			// マップ移動初期処理
			if(this.docanMoveCnt++ >= DOCAN_MOVE_TIME){
				this.docanMoveCnt = 0;
				this.changeMap(this.mapMoveStage,this.newMapSizeX);	
				this.posY = this.docanPosY1;
				this.moveNumX = this.docanPosX1;
				this.mapScrollX = 0;
				if(this.moveNumX >= SCROLL_POINT_X && this.moveNumX < this.scrollEndX)
				{
					this.mapScrollX = this.moveNumX - SCROLL_POINT_X;		// マップスクロール量
					this.posX = SCROLL_POINT_X;							// 固定
					// マップを描画する範囲をずらす
					this.maxDrawMapX = DRAW_MAX_MAP_X + Math.floor(this.mapScrollX / MAP_SIZE);			// 最大の描画範囲X
					this.minDrawMapX = this.maxDrawMapX - DRAW_MAX_MAP_X;								// 最小の描画範囲X
				}
				else{
					this.mapScrollX = 0;
					this.posX = this.docanPosX1;
					this.maxDrawMapX = DRAW_MAX_MAP_X;	// 最大の描画範囲X
					this.minDrawMapX = 0;				// 最小の描画範囲X
				}
				this.isSecondMapMove = true;
				
				// しゃがみを解除する
				if(this.docanFirstMoveDirection == DOCAN_DOWN && this.isBig()){
					this.releaseSitParam();
				}
			}
			else{
				// 土管からはみ出さないように最大移動量は64まで
				if(this.docanMoveCnt <= 32){
					// 移動
					switch(this.docanFirstMoveDirection){
						case DOCAN_UP:
							this.posY -= 2;
							break;
						case DOCAN_DOWN:
							this.posY += 2;
							break;
						case DOCAN_LEFT:
							this.moveNumX -= 2;
							// 歩いている動作をさせる
							this.increseAnimCnt(2);
							break;
						case DOCAN_RIGHT:
							this.moveNumX += 2;
							// 歩いている動作をさせる
							this.increseAnimCnt(2);
							break;
					}	
				}
			}
		}
		// 2回目(土管から出る場合)
		else{
			// 2秒で移動させたい、64 / 2 = 32フレで移動できるので、32引いてから移動を開始する
			if(this.docanMoveCnt++ >= DOCAN_MOVE_TIME - 32){
				// 移動方向を分ける
				switch(this.docanEndMoveDirection){
					case DOCAN_UP:
						this.posY -= 2;
						if(this.posY <= this.docanPosY2){
							this.resetMapMove();
						}
						break;
					case DOCAN_DOWN:
						this.posY += 2;
						if(this.posY >= this.docanPosY2){
							this.resetMapMove();
						}
						break;
					case DOCAN_LEFT:
						this.moveNumX -= 2;
						this.increseAnimCnt(2);
						if(this.moveNumX >= this.docanPosX2){
							this.resetMapMove();
						}
						break;
					case DOCAN_RIGHT:
						this.moveNumX += 2;
						this.increseAnimCnt(2);
						if(this.moveNumX <= this.docanPosX2){
							this.resetMapMove();
						}
						break;
				}
			}
		}
	}
}

/**
 * マップを変更する
 */
Mario.prototype.changeMap = function(mapNumber,length){
	gMapStage = mapNumber;
	// 描画範囲を変更
	this.scrollEndX = (length - 10) * MAP_SIZE - HALF_MAP_SIZE;		// スクロールの終わりとなる終点X
}

/**
 * 
 * @param {*移動アニメーションカウントを増やす} cnt 
 */
Mario.prototype.increseAnimCnt = function(cnt){
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

/**
 * 土管の移動終了後にセットする変数
 */
Mario.prototype.resetMapMove = function(){
	this.isMapMove = false;
	this.keyDisable = false;
	this.isSecondMapMove = false;
	this.docanMoveCnt = 0;
	this.updateMapPosition();
}

/**
 * chapter43
 * 
 * マリオが大きい状態ならば座る状態にする
 * 
 */
Mario.prototype.sit = function(){
	// 大きい状態のみ
	if(this.canSit()){
		this.isSit = true;
		this.height = MAP_SIZE;
		this.textureHeight = MAP_SIZE * 2;
		this.posY += MAP_SIZE;
		this.updateMapPositionY(this.posY);
	}
}

/**
 * 座る状態を解除する
 */
Mario.prototype.sitRelease = function(){
	if(this.isSit && !this.isMapMove){
		if(this.isBig()){
			this.releaseSitParam();
		}
	}
}

Mario.prototype.releaseSitParam = function(){
	this.height = MAP_SIZE * 2;
	this.textureHeight = this.height;
	this.posY -= MAP_SIZE;
	this.updateMapPositionY(this.posY);
	this.isSit = false;
}

/**
 * chapter43
 * 座れるか判定を返す
 */
Mario.prototype.canSit = function(){
	// でかい　かつ　しゃがんでいない　かつ　ジャンプ中でない
	return (this.isBig() && !this.isSit && !this.isJump);
}

/**
 * chapter45
 * 
 * OneUpKinokoを取得した時
 */
Mario.prototype.getOneUpKinoko = function(){
	if(this.playerNum < MAX_PLAYER_NUM){
		this.playerNum++;
		this.isDrawOneUp = true;
	}
}

/**
 * one upの表示関数
 */
Mario.prototype.oneUpAction = function(){
	if(this.isDrawOneUp){
		if(this.oneUpCnt++ >= ONE_UP_CNT){
			this.oneUpCnt = 0;
			this.isDrawOneUp = false;
		}
	}
}

/**
 * oneupの描画
 */
Mario.prototype.drawOneUp = function(ctx,texture){
	if(this.isDrawOneUp){
		ctx.drawImage(texture,416,480,64,32,this.posX - 16,this.posY - (this.oneUpCnt / 4) - 32,64,32);
	}
}

/**
 * マリオ時間切れ時の処理
 */
Mario.prototype.timeOut = function(){
	if(!this.isDead()){
		this.setDeadParam();
	}
}

/**
 * やれれ処理ようの値をセットする
 */
Mario.prototype.setDeadParam = function(){
	this.state = DEAD_ACTION;
	this.addPosY = 14;
}

/**
 * chapter47
 * 踏みつけ数に応じたスコアを返す
 * 100 200 400 800 1000 2000 4000 8000
 */
Mario.prototype.getScore = function(){
	return STOMPING_SCORES[this.sequenceJumpCnt];
}

/**
 * chapter47
 * 踏みつけ後の処理
 * 上昇させる、スコアカウントを上げる
 */
Mario.prototype.stompAction = function(){
	this.jumpPower = STEP_UP_NUM;
	if(++this.sequenceJumpCnt >= STOMPING_SCORES.length - 1){
		this.sequenceJumpCnt = STOMPING_SCORES.length - 1;
		// one up
		this.playerNum++;
	}else{
		// 1upでなかったら、スコアに加算する
		gScore += this.getScore();
	}
}

/**
 * chapter48
 * 
 * 無敵アニメーション処理
 */
Mario.prototype.invincibleAction = function(){
	// 小さくなるアニメーションが終わった後に発動する
	if(this.isInvincible && !this.onSmallAnimation){
		if(this.invincibleCnt++ >= INVINCIBLE_TIME){
			this.isInvincible = false;
			this.invincibleCnt = 0;
			this.starOffsetX = 0;
		}
		// アニメーションさせる
		else if(this.invincibleCnt % 4 == 0){
			this.starOffsetX = this.starOffsetX == 0 ? 256 : 0;
		}
	}
}

/**
 * chapter48
 * 
 * 小さくなる際の処理
 * 小さくなったり大きくなったり
 */
Mario.prototype.smallAnimationAction = function(){
	if(this.onSmallAnimation){
		this.smallAnimationCnt++;
		if(this.smallAnimationCnt % 5 == 0){
			if(this.height == MAP_SIZE){
				// デカくする
				this.height = MAP_SIZE * 2;
				this.posY -= MAP_SIZE;
				this.textureOffsetY = 128;
				this.textureHeight = MAP_SIZE * 2;	
			}
			else{
				// 小さくする
				this.height = MAP_SIZE;
				this.textureHeight = MAP_SIZE;
				this.textureOffsetY = 0;
				this.posY += MAP_SIZE;
			}
		}
		if(this.smallAnimationCnt >= 20){
			// 小さくするアニメーション終了
			this.onSmallAnimation = false;
			gActionStop = false;
			this.keyDisable = false;
			this.smallAnimationCnt = 0;
		}
	}
}
