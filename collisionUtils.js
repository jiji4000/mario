/**
  引数のマップチップ数が通れないと判定される
  objectマップかどうか
*/
function isObjectMap(mapNumber){
  if(mapNumber >= 48 && mapNumber <= 114){
    return true;
  }
  return false;
}

/**
  引数のマップチップ番号が
  コインのマップチップかどうか返す

  mapNumber : マップチップ番号
*/
function isCoinMap(mapNumber){
  if(mapNumber == 33){
    return true;
  }
  return false;
}

/**
  対象のマップチップを空のマップに入れ替える
*/
function replaceEmptyMap(map,mapX,mapY){
  map[mapY][mapX] = NOT_DRAW_MAP;
}

/**
  coinブロックかどうか判定する

  mapNumber : マップチップ番号
*/
function isCoinBlock(mapNumber){
  if(mapNumber == 80){
    return true;
  }
  return false;
}

/**
  対象のマップチップを空のボックスに入れ替える
*/
function replaceEmptyBoxMap(map,mapX,mapY){
  map[mapY][mapX] = EMPTY_BOX_MAP;
}

/**
	対象のマップチップを空のにする
*/
function replaceEmptyMap(map,mapX,mapY){
	map[mapY][mapX] = NOT_DRAW_MAP;
}

/**
  kinokoブロックかどうか判定する

  mapNumber : マップチップ番号
*/
function isKinokoBlock(mapNumber){
  if(mapNumber == 82 || mapNumber == 85){
    return true;
  }
  return false;
}

/**
	chapter37
	ブロックマップチップかどうか判定する
	
	mapNumber : マップチップ番号
*/
function isBlockMap(mapNumber){
	if(mapNumber == 64){
		return true;
	}
	return false;
}

/**
	chapter41
	starブロック判定
	
	mapNumber : マップチップ番号
*/
function isStarBlock(mapNumber){
	if(mapNumber == 83 || mapNumber == 67 || mapNumber == 68){
		return true;
	}
	return false;
}

/**
 * isOneUpBlock
 * @param {*} mapNumber 
 */
function isOneUpBlock(mapNumber){
	if(mapNumber == 84){
		return true;
	}
	return false;
}

/**
 * 隠しブロック判定
 * @param {*} mapNumber 
 */
function isHideBlock(mapNumber){
	if(mapNumber >= 192 && mapNumber <= 193){
		return true;
	}
	return false;
}

/**
 * 隠しブロック1up判定
 * @param {*} mapNumber 
 */
function isHideOneUpBlock(mapNumber){
	if(mapNumber == 192 || mapNumber == 193){
		return true;
	}
	return false;
}

/**
 * 対象のマップチップの移動方向を返す
 * @param {*} mapNumber 
 */
function getItemDir(mapNumber){
	if(mapNumber == 192 || mapNumber == 80 || mapNumber == 67){
		return LEFT_DIR
	}
	return RIGHT_DIR;
}

/**
 * 連続コインブロック判定
 * @param {*} mapNumber 
 */
function isSequenceCoinBlock(mapNumber){
	if(mapNumber == 66){
		return true;
	}
	return false;
}
