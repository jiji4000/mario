/**
  引数のマップチップ数が通れないと判定される
  objectマップかどうか
*/
function isObjectMap(mapNumber){
  if(mapNumber >= 48 && mapNumber <= 95){
    return true;
  }
  return false;
}
