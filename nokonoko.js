/**
 * class for nokonoko
 */
function Noko(posX,posY,dir){
	// 定数
	this.AWAKING_CNT = 180;		// 60フレーム1秒計算
	this.AWAKE_CNT =  300;
	this.NORMAL_HEIGHT = 20;
	this.ATTACK_HEIGHT = 18;
	// 変数
	this.posX = posX;
	this.posY = posY;
	this.addPosX = 0;
	this.addPosY = 0;
	this.animCnt = 0;
	this.animX = 0;
	this.animY = 0;
	this.direction = dir;
	this.rightMapX = 0;
	this.leftMapX = 0;
	this.upMapY = 0;
	this.downMapY = 0;
	// chapter27
	this.state = NORMAL_STATE;
	this.height = this.NORMAL_HEIGHT;
	this.deadCnt = 0;
	// 甲羅状態の移動量
	this.ATTACK_MOVE_X = 7;
	// block破壊用変数
	this.blockAttackX = [[0,0,0,0],[0,0,0,0]];		// Block破壊時の座標X
	this.blockAttackY = [[0,0,0,0],[0,0,0,0]];		// Block破壊時の座標Y
	this.blockAttackCnt = [0,0];			// animation cnt
	this.blockAttackIndex = 0;			// blockのindex
	this.isBlockAttack = [false,false];	// 破壊フラグ
	this.blockAttackAddY = [0,0];			// ブロックの移動量Y
	this.blockAttackIndexX = [0,0];		// ブロックを移動させる対象のブロックマップチップ番号
	this.blockAttackIndexY = [0,0];		// ブロックを移動させる対象のブロックマップチップ番号Y
	// 甲羅状態から復帰するためのアニメーション変数
	this.normalBackCnt = 0;
	// マリオと当たり判定があった場合一度マリオから離れてからでないと当たり判定を起こさせないためのフラグ
	this.isStickyMario = false;
}

/*
	描画関数
	ctx:context
	texture:img class
	scrollX:X軸のスクロール量
*/
Noko.prototype.draw = function(ctx,texture,scrollX){
	if(this.state != DEAD){
		ctx.drawImage(texture, (this.animX * 32) + (this.direction * 128),this.animY + (MAP_SIZE - this.height),32,this.height,this.posX - scrollX,this.posY,32,this.height);
	}
	// 甲羅でブロックを破壊した時用のブロックマップチップの描画
	this.drawBlock(ctx,texture,scrollX);
}

Noko.prototype.drawBlock = function(ctx,texture,scrollX){
	for(var i = 0;i < MAX_MAP_BLOCK;++i){
		// 破壊ブロック
		if(this.isBlockAttack[i]){
			ctx.drawImage(gMapTex, 0, 128 , 16, 16, this.blockAttackX[i][1] - scrollX,this.blockAttackY[i][1], 16, 16);	//
			ctx.drawImage(gMapTex, HALF_MAP_SIZE, 128 , 16, 16, this.blockAttackX[i][3] - scrollX,this.blockAttackY[i][3], 16, 16);	//
			ctx.drawImage(gMapTex, HALF_MAP_SIZE, 144 , 16, 16, this.blockAttackX[i][2] - scrollX,this.blockAttackY[i][2], 16, 16);	//
			ctx.drawImage(gMapTex, 0, 144 , 16, 16, this.blockAttackX[i][0] - scrollX,this.blockAttackY[i][0], 16, 16);	//
		}
	}
}

/*
	動かす役割

	moveNum:移動量
*/
Noko.prototype.move = function(mapChip,moveNum,mario){
	this.updateMapPosition();
	// 通常時と甲羅攻撃時のみ動かす
	if(this.state == NORMAL_STATE || this.state == NOKO_ATTACK_STATE){
		var speed = this.state == NORMAL_STATE ? moveNum : this.ATTACK_MOVE_X;
		// 向きにより加算量を調整する
		moveNum = this.direction == LEFT_DIR ? -speed : speed;
		// 加算量を代入する
		this.addPosX = moveNum;
		// x軸との当たり判定
		this.collisionX(mapChip,this.posX + this.addPosX,mario);
		this.posX += this.addPosX;
		// 移動したのでマップ座標更新
		this.updateMapPositionX(this.posX);
	}
	
	// animation
	if(this.animCnt++ >= 12){
		this.animCnt = 0;
		// 一定以上に達したらアニメーションを更新する
		if(++this.animX > 3){
			this.animX = 0;
		}
	}
	// 甲羅状態から移動状態に戻るための処理
	this.awakeAnimation();
}

/**
 *	甲羅から歩く動作に復帰するための関数
 */
Noko.prototype.awakeAnimation = function(){
	if(this.state == NOKO_WAIT_STATE){
		this.normalBackCnt++;
		if(this.normalBackCnt >= this.AWAKING_CNT){
			this.state = NOKO_AWAKING_STATE;
			this.animY = 64;
		}
	}
	else if(this.state == NOKO_AWAKING_STATE){
		this.normalBackCnt++;
		if(this.normalBackCnt >= this.AWAKE_CNT){
			this.state = NORMAL_STATE;
			this.height = this.NORMAL_HEIGHT;
			// heightが変わると、めり込むので位置を上げる
			this.posY -= (this.NORMAL_HEIGHT - this.ATTACK_HEIGHT);
			this.normalBackCnt = 0;
			this.animY = 0
		}
	}
}

/**
	x軸方向のマップチップ座標の更新

	posX : マップチップ更新対象となるx座標
*/
Noko.prototype.updateMapPositionX = function(posX){
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

Noko.prototype.updateMapPositionY = function(posY){
	// y
	this.upMapY = Math.floor(posY / MAP_SIZE);
	this.downMapY = Math.floor((posY + this.height - 1) / MAP_SIZE);

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

Noko.prototype.updateMapPosition = function(){
	this.updateMapPositionX(this.posX);
	this.updateMapPositionY(this.posY);
}

Noko.prototype.collisionX = function(map,posX,mario){
	this.updateMapPositionX(posX);
    // マップ座標yを配列で保管する
    var mapsY = [this.upMapY,this.downMapY];
    for(var i = 0;i < 2;++i){
    	// ノコノコの右側との当たり判定
    	if(isObjectMap(map[mapsY[i]][this.rightMapX])){
    		// 方向転換を行う
    		// (加算される前の)中心点からの距離を取る
    		var vecX = Math.abs((this.posX + HALF_MAP_SIZE) - ((this.rightMapX * MAP_SIZE) + HALF_MAP_SIZE));
    		this.addPosX = Math.abs(MAP_SIZE - vecX);
    		
    		// 甲羅移動時の判定
    		if(this.state == NOKO_ATTACK_STATE){
        		// 破壊可能なマップチップだった場合
        		if(isBlockMap(map[mapsY[i]][this.rightMapX])){
        			// 破壊アニメーションをさせる
        			this.blockAction(this.rightMapX,mapsY[i],map);
        		}
        		// キノコブロックだった場合
        		else if(isKinokoBlock(map[mapsY[i]][this.rightMapX])){
        			var posX = this.rightMapX * MAP_SIZE;
        			var posY = mapsY[i] * MAP_SIZE;
        			mario.activateKinoko(posX,posY,this.direction);
        			// 空マップにする
	    			replaceEmptyBoxMap(map,this.rightMapX,mapsY[i]);
        		}
    		}
    		this.direction = LEFT_DIR;
    	}
    	// ノコノコの左側
    	else if(isObjectMap(map[mapsY[i]][this.leftMapX]) || isObjectMap(map[mapsY[i]][this.leftMapX])){
    		// (加算される前の)中心点からの距離を取る
    		var vecX = Math.abs((this.posX + HALF_MAP_SIZE) - ((this.leftMapX * MAP_SIZE) + HALF_MAP_SIZE));
    		this.addPosX = -Math.abs(MAP_SIZE - vecX);
			// 甲羅移動の場合
    		if(this.state == NOKO_ATTACK_STATE){
	    		// 破壊可能なマップチップだった場合
	    		if(isBlockMap(map[mapsY[i]][this.leftMapX])){
	    			// 破壊アニメーションをさせる
	    			this.blockAction(this.leftMapX,mapsY[i],map);
	    		}
	    		// キノコブロックだった場合
	    		else if(isKinokoBlock(map[mapsY[i]][this.leftMapX])){
	    			var posX = this.leftMapX * MAP_SIZE;
	    			var posY = mapsY[i] * MAP_SIZE;
	    			mario.activateKinoko(posX,posY);
	    			replaceEmptyBoxMap(map,this.leftMapX,mapsY[i]);
	    		}
    		}
    		this.direction = RIGHT_DIR;
    	}
    }
}

/**
 * 甲羅中のノコノコとブロックが接触した時の破壊アニメーションをさせる
 * 
 * mapIndexX : map index x座標
 * mapIndexY : map index y座標
 * map:マップチップ配列
 */
Noko.prototype.blockAction = function(mapIndexX,mapIndexY,map){
	// 対象のマップチップ座標を代入
	this.blockAttackIndexX[this.blockAttackIndex] = mapIndexX;
	this.blockAttackIndexY[this.blockAttackIndex] = mapIndexY;
	// 空マップにする
	replaceEmptyMap(map,mapIndexX,mapIndexY);
	// アニメーションを仕込む
	this.isBlockAttack[this.blockAttackIndex] = true;
	// 右と左で分けているんだ
	this.blockAttackX[this.blockAttackIndex][0] = this.blockAttackX[this.blockAttackIndex][1] = mapIndexX * MAP_SIZE;
	this.blockAttackX[this.blockAttackIndex][2] = this.blockAttackX[this.blockAttackIndex][3] = mapIndexX * MAP_SIZE + HALF_MAP_SIZE;
	this.blockAttackY[this.blockAttackIndex][0] = this.blockAttackY[this.blockAttackIndex][2] = mapIndexY * MAP_SIZE + HALF_MAP_SIZE;
	this.blockAttackY[this.blockAttackIndex][1] = this.blockAttackY[this.blockAttackIndex][3] = mapIndexY * MAP_SIZE - HALF_MAP_SIZE;				
	this.blockAttackAddY[this.blockAttackIndex] = 10;
	// animationフラグとして利用
	this.blockAttackCnt[this.blockAttackIndex]++;
	// blockの配列内でカバーする
	if(++this.blockAttackIndex >= MAX_MAP_BLOCK)this.blockAttackIndex = 0;
}

/**
 * blockのアニメーション用関数
 */
Noko.prototype.animateBlock = function(map){
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
	}
}

/**
 * マリオとの当たり判定クラス
 * 
 * map:対象マップチップ座標
 * mario:マリオクラス
*/
Noko.prototype.collisionWithMario = function(map,mario){
	if(!mario.isDead()){
		// x軸
		if(mario.moveNumX < this.posX + 32 && mario.moveNumX + 32 > this.posX){
			// 当たり判定の範囲が小さいので、2分割して処理する
			var addY = mario.addPosY / 2;
			// 移動する前の座標を保存する
			var marioPosY = mario.posY + mario.addPosY;
			for(var i = 0;i < 2;++i){
				// 移動する量を2分割する
				marioPosY -= addY;
				// マリオの上とノコノコの下(ノコノコはnormalは20攻撃時は18で切り取られる)
				if(marioPosY <= this.posY + this.height){
					// マリオの下がノコノコの上よりも上にある
					if(marioPosY + mario.height >= this.posY){
						// chapter41:マリオがstar状態
						if(mario.isStar){
							this.setDeadCollisionAction()
							return;
						}
						// ノコノコの動きを止めるアクション、ノコノコが歩いている時と甲羅移動中の当たり判定はクリボと同じ
						if(this.state == NORMAL_STATE || this.state == NOKO_ATTACK_STATE){
							// マリオの下がノコノコの中間地点よりも上にある
							if(marioPosY + mario.height <= this.posY + (this.height / 2)){
								if(!this.isSticky){
									if(this.height != this.NORMAL_HEIGHT){
										// 縮まるので、高さを変える
										this.height = this.ATTACK_HEIGHT;
										this.posY += this.NORMAL_HEIGHT - this.ATTACK_HEIGHT;										
									}
									// 止まった状態の甲羅にする
									this.state = NOKO_WAIT_STATE;
									// 歩く状態に戻るアニメーションカウントを戻す
									this.normalBackCnt = 0;
									this.animY = 32;
									mario.jumpPower = STEP_UP_NUM;
									this.isSticky = true;
								}
								return;
							}
						 	else{
								if(!this.isSticky){
									mario.collisionWithEnemy(map);
									this.isSticky = true;								
								}
								return;
							}
						}
					
						// 甲羅待機状態の時は、どこに当たっても甲羅を移動させる
						else if(this.state == NOKO_AWAKING_STATE || this.state == NOKO_WAIT_STATE){
							if(!this.isSticky){
								// 甲羅の移動方向を決める
								// 甲羅の中心座標
								var nokoCenterX = this.posX / 2;
								// マリオの中心位置
								var marioCenterX = mario.moveNumX / 2;
								// 甲羅の中心とマリオの中心位置を割り出して、マリオが左側ならば右に、マリオが右側ならば左に移動させる
								this.direction = marioCenterX <= nokoCenterX ? RIGHT_DIR : LEFT_DIR;
								// 甲羅突進状態
								this.state = NOKO_ATTACK_STATE;
								this.isSticky = true;
							}
							return;
						}
					}
				}				
			}
		}
	}
	// 連続してノコノコがマリオに触れている場合は当たり判定を起こさせないためのフラグ
	this.isSticky = false;
}

/**
 * ノコノコがアタック状態になっている時の敵との当たり判定
 * 
 * kuribos : クリボクラス配列
 * nokos: ノコノコの配列
 * 
*/
Noko.prototype.collisionWithEnemy = function(kuribos,nokos){
	// 攻撃状態のみ
	if(this.state == NOKO_ATTACK_STATE){
		// クリボ
		if(kuribos != null){
			for(var i = 0;i < kuribos.length;++i){
				// x軸
				if(kuribos[i].posX < this.posX + 32 && kuribos[i].posX + 32 > this.posX){
					// クリボの上とノコノコの下
					if(kuribos[i].posY <= this.posY + this.height){
						// クリボの下がノコノコの上よりも上にある
						if(kuribos[i].posY + 32 >= this.posY){
							kuribos[i].setDeadCollisionAction();
						}
					}
				}
			}
		}
		// nokonoko自身も渡されるので自身は覗く
		if(nokos != null){
			for(var i = 0;i < nokos.length;++i){
				// ノコノコとの当たり判定があった場合に死亡状態になるので、死亡判定をする必要がある
				if(!this.isDead()){
					// 自身も渡されるので、自身との判定は除く
					if(nokos[i] != this){
						// x軸
						if(nokos[i].posX < this.posX + 32 && nokos[i].posX + 32 > this.posX){
							// ノコノコ上とノコノコの下
							if(nokos[i].posY <= this.posY + this.height){
								// クリボの下がノコノコの上よりも上にある
								if(nokos[i].posY + nokos[i].height >= this.posY){
									// 相手ノコノコが攻撃状態の場合は自身も当たり判定を呼ぶ
									if(nokos[i].state == NOKO_ATTACK_STATE){
										this.setDeadCollisionAction();
									}
									nokos[i].setDeadCollisionAction();
								}
							}
						}
					}
				}
			}		
		}
	}
}

/**
 * ノコノコ更新処理
 */
Noko.prototype.update = function(map,mario,kuribos,nokos,moveNum){
	if(!this.isDead()){
		this.move(map,moveNum,mario);
		this.gravityAction(map);
		this.collisionWithMario(map,mario);
		this.collisionWithEnemy(kuribos,nokos);
		// fireとの当たり判定
		for(var i = 0;i < mario.MAX_FIRE_NUM;++i){
			this.collisionWithFire(mario.fire[i]);	
		}
	}
	this.animateBlock(map)
	this.deadAction();
}

/**
 * 死亡時のアニメーション関数
 */
Noko.prototype.deadAction = function(){
	if(this.state == DEAD_FIRE_ACTION){
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
 * 死亡判定
 */
Noko.prototype.isDead = function(){
	if(this.state >= DEAD_ACTION){
		return true;
	}
	return false;
}

/**
 * ブロックの上にのっていた時に上昇させる処理 
 * 
 * blockPosX : ブロックのX座標
 * blockPosY : ブロックのY座標
*/
Noko.prototype.blockUpAction = function(blockPosX,blockPosY){
	// ノコノコが上にいた場合ノコノコを上昇させる
	if(!this.isDead()){				
		// Y座標チェック
		if(blockPosY == this.posY + this.height){
			// x座標チェック
			if(blockPosX < this.posX + MAP_SIZE  && blockPosX + MAP_SIZE > this.posX){
				this.addPosY = BLOCK_UP_ADD_Y;
			}
		}
	}		
}

/**
 * 重量処理
 */
Noko.prototype.gravityAction = function(mapChip){
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
 * マップチップとの上下のあたり判定
 */
Noko.prototype.collisionY = function(map,posY){
	this.updateMapPositionY(posY);
	// キャラの下側と接触した場合
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.downMapY][this.leftMapX])){
		// (加算される前の)中心点からの距離を見る
		var vecY = Math.abs((this.posY + this.height) - ((this.downMapY * MAP_SIZE) + HALF_MAP_SIZE));
		// Yの加算量調整
		this.addPosY = Math.abs(HALF_MAP_SIZE - vecY);
		// 地面についた
		this.posY += this.addPosY;
		this.addPosY = 0;
	}
}

/**
 * collision with fire
 * 
 * fire:fire class
 */
Noko.prototype.collisionWithFire = function(fire){
	if(fire.state == NORMAL_STATE){
		// x軸
		if(fire.posX < this.posX + 32 && fire.posX + FIRE_SIZE > this.posX){
			// y軸
			if(fire.posY < this.posY + 32 && fire.posY + FIRE_SIZE > this.posY){
				// fire用の死亡アニメーション
				this.state = DEAD_FIRE_ACTION;
				// 少しジャンプさせる
				this.addPosY = -8;
				// ファイアーにも消えるアニメーションを設定する
				fire.collisionWithBlock();
			}
		}
	}
}

/**
 * set collision reaction
 */
Noko.prototype.setDeadCollisionAction = function(){
	// fire用の死亡アニメーション
	this.state = DEAD_FIRE_ACTION;
	// 少しジャンプさせる
	this.addPosY = -8;
}
