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
    digits = Math.floor(digits / 10);
  }
  return maxNum;
}
