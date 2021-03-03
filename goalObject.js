function Goal(posX){
	this.posX = posX;
    this.flagY = 64;
    // 高さに応じて決定する
    this.score = 0;
    // 城の旗
    this.castleFlagY = 273;
}

/*
	描画関数
	ctx:context
	texture:img class
	scrollX:X軸のスクロール量
*/
Goal.prototype.draw = function(ctx,texture,scoreTex,scrollX){
    // ポールの先端の描画
    ctx.drawImage(texture,416,416,32,32,this.posX - scrollX + 9,50,32,32);

    // ポール(真ん中に描画する)
    for(var i = 0;i < 10;++i){
        ctx.drawImage(texture,480,416,32,32,this.posX - scrollX + 15.5,352 - (i * MAP_SIZE),32,32);
    }
    // 旗
    ctx.drawImage(texture,448,416,32,32,this.posX - scrollX - 8.5,this.flagY,32,32);
    // スコアの描画
    if(this.score > 0){
        this.drawScore(ctx,scoreTex,this.posX - scrollX,this.flagY - 14,this.score);
    }
}

/**
 * フラグの描画
 * @param {*} ctx 
 * @param {*} texture 
 * @param {*} scrollX 
 */
Goal.prototype.drawCastleFlag = function(ctx,texture,scrollX){
    // 城のフラッグ描画
    ctx.drawImage(texture,384,416,32,32,this.posX + 200 - scrollX,this.castleFlagY,32,32);
}

/**
 * ゴールスコアの描画
 * @param {*} ctx 
 * @param {*} texture 
 * @param {*} posX 
 * @param {*} posY 
 * @param {*} score 
 */
Goal.prototype.drawScore = function(ctx,texture,posX,posY,score){
    var digits = getDigits(score);	// 桁数を取得
    var maxNumber = getMaxNumber(digits);
    // 3桁4桁で分ける
    var numberPosX = digits == 3 ? (posX + 16) - (18 / 2) - 18 : (posX + 16 - 9) - 28;
    // 全て描画するまで
    while(maxNumber >= 1){
        // 一番上の桁数から描画する
        ctx.drawImage(texture, Math.floor((score / maxNumber )) * 20,0,20,17, numberPosX,posY - 4, 16, 13);
        score -= Math.floor((score / maxNumber)) * maxNumber;				// 一番上の桁数を引く(111だったら100を引く)
        maxNumber = Math.floor(maxNumber / 10);		// 111 = 11にする
        numberPosX += 18;
    }        
}
/**
 * 更新関数
 * @param {*} mario 
 */
Goal.prototype.update = function(mario){
    this.collisionWithMario(mario);
    this.fragAnimation(mario);
    this.castleFragAnimation(mario);
}

/**
 * フラグを下げるアニメーションをさせる
 * @param {*} mario 
 */
Goal.prototype.fragAnimation = function(mario){
    if(mario.goalAnimationState != INACTIVE){        
        // 地面まで達した場合
        if(this.flagY + 26 < 384){
            this.flagY += 3;    
        }
        else{
            this.flag = 384;
        }
    }
}

/**
 * 城のフラグをアニメーションさせる処理
 * @param {*} mario 
 */
Goal.prototype.castleFragAnimation = function(mario){
    if(mario.goalAnimationState == GOAL_ANIMATION_END){
        this.castleFlagY -= 2;        
        if(this.castleFlagY <= 248){
            this.castleFlagY = 248;
        }
    }
}

/**
 * マリオとゴールとの当たり判定
 * @param {*} mario 
 */
Goal.prototype.collisionWithMario = function(mario){
    if(mario.goalAnimationState == INACTIVE){     
        // y軸 マリオの下とポールの上
        if(64 <= mario.posY + mario.height){
            // y軸 マリオの上とポールの下
            if(448 >= mario.posY){
                // x軸:ポールの右とマリオの左(幅はポールに合わせる)
                if(this.posX + 19.5 >= mario.moveNumX){
                    // ポールの左とマリオの右
                    if(this.posX + 14.5 <= mario.moveNumX + 32){
                        // 高さに応じて、スコアを決定する
                        this.defineScore(mario.posY);
                        // マリオにゴールアニメーション用のセットさせる
                        mario.setGoalAnimation(this.posX - 16);
                    }
                }
            }
        }
    }      
}

/**
 * スコアを決定して加算する
 * @param {*} posY 
 */
Goal.prototype.defineScore = function(posY){
    if(posY <= 64){
        this.score = 8000;
    }
    else if(posY > 64 && posY <= 128){
        this.score = 4000;
    }
    else if(posY > 128 && posY <= 192){
        this.score = 2000;
    }
    else{
        this.score = 1000;
    }
    gScore += this.score;
}