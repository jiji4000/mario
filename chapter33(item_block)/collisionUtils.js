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
