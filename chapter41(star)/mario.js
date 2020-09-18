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
}

/*
	描画関数
	ctx:context
	texture:img class
*/
Mario.prototype.draw = function(ctx,texture){
	if(!this.isDead()) {				
		ctx.drawImage(texture,this.starOffsetX + (this.animX * 32) + this.animOffsetX,(this.direction * this.height) + this.textureOffsetY,32,this.height,this.posX,this.posY,32,this.height);		    
	}
	else {
		ctx.drawImage(texture, (this.animX * 32) + this.animOffsetX,this.direction * this.height + this.textureOffsetY,32,this.height,this.posX,this.posY,32,this.height);
	}
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
	//console.log("jumpPower = " + this.jumpPower);
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

/**
	chapter20
	オブジェクトとの当たり判定Y
*/
Mario.prototype.collisionY = function(map,posY){
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

      // (加算される前の)中心点からの距離をみる
      var vecY = Math.abs((this.posY + HALF_MAP_SIZE) - ((this.upMapY * MAP_SIZE) + HALF_MAP_SIZE));
      // Yの加算量調整
      this.addPosY = Math.abs(MAP_SIZE - vecY);
      // 落下させる
      this.jumpPower = 0;
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
	}
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
 * マリオがキノコを取得した時の処理
 */
Mario.prototype.getKinoko = function(){
	this.state = KINOKO_STATE;
	this.height = 64;
	this.posY -= 32;
	this.textureOffsetY = 64;
}

/**
 * get fire kinoko action
 */
Mario.prototype.getFireKinoko = function(){
	this.state = FIRE_STATE;
	this.textureOffsetY = 192;
}

/**
	マリオの更新関数
	
	kuribos:マリオのブロックアクション時に連動させるクリボの配列
	nokos:マリオのブロックアクション時に連動させるノコノコの配列
*/
Mario.prototype.update = function(mapChip,kuribos,nokos){
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
	  // マップチップアイテムオブジェクトとの当たり判定
	  this.collisionWithMapItem(mapChip);
	  // blockが動いたことによる当たり判定
	  this.blockCollisionAction(kuribos,nokos);
	  
	  // fireShot処理
	  if(gADown){
		  // key状態を解除
		  gADown = false;
		  this.shotFire();
	  }	  
	  // scroll処理
	  this.doMapScrollX();
	  // star処理
	  this.starAction();
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
	if(this.state == NORMAL_STATE || isUp)
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
			if(this.blockAttackY[i][3] <= -32){
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