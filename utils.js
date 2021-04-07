/*
	与えられた数字の桁数を返す
	number = 桁数を返す数字
*/
function getDigits(number) {
	if(number == NaN)return 0;
	var digits = 1;
	while (1) {
		number /= 10;
		if(Math.floor(number) < 1)break;
		digits++;
	}
	return digits; 		// 桁数を返す
}

/**
	桁数に応じた割る単位を返す

  例:2桁 10 ,3桁 100
	digits = 桁数
*/
function getMaxNumber(digits){
  var maxNum = 1;
  while(digits > 1){
    maxNum *= 10;
    digits--;
  }
  return maxNum;
}

/**
 * 敵用のスコア描画処理
 * @param {*} ctx 
 * @param {*} texture 
 * @param {*} oneUpTex 
 * @param {*} posX 
 * @param {*} posY 
 * @param {*} score 
 */
function drawEnemyScore(ctx,texture,oneUpTex,posX,posY,score){
	// 8000点超えていれば1up
	if(score > 8000){
			ctx.drawImage(oneUpTex,416,480,64,32,(posX + 16) - (64 / 2),posY - 14,64,32);
	}
	else{
			var digits = getDigits(score);	// 桁数を取得
			var maxNumber = getMaxNumber(digits);
			// 3桁4桁で分ける
			var numberPosX = digits == 3 ? (posX + 16) - (18 / 2) - 18 : (posX + 16 - 9) - 28;
			// 全て描画するまで
			while(maxNumber >= 1){
				// 一番上の桁数から描画する
				g_Ctx.drawImage(gCoinTex, Math.floor((score / maxNumber )) * 20,0,20,17, numberPosX,posY - 4, 16, 13);
				score -= Math.floor((score / maxNumber)) * maxNumber;				// 一番上の桁数を引く(111だったら100を引く)
				maxNumber = Math.floor(maxNumber / 10);		// 111 = 11にする
				numberPosX += 18;
			}        
	}
}

/**
 * 敵が動ける位置まで来たかを返す
 * @param {*} posX 
 * @param {*} mario 
 */
function isOffStopFlag(posX,mario){
	// 画面分野スクロールと一つのマップチップ分だけ距離が縮まったら出現させる
	if(Math.abs(posX - mario.moveNumX <= 672 - mario.posX)){
		return true;
	}
	return false;
}