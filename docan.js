/**
 * 土管クラス
 * @param {*} posX : 土管位置x
 * @param {*} posY : 土管位置y
 * @param {*} width : 土管の幅
 * @param {*} height : 土管の高さ
 * @param {*} mapNumber : 遷移先のマップチップ番号 
 * @param {*} mapSizeX :    Xのマップサイズ 
 * @param {*} firstDirection : 入り口上下左右どちらに移動するか
 * @param {*} endDirection : 出口上下左右どちらに移動するか
 * @param {*} endX : 遷移先の土管の位置X
 * @param {*} endY : 遷移先の土管の位置Y
 */
function Docan(posX,posY,width,height,mapNumber,mapSizeX,firstDirection,endDirection,endX,endY){
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.mapNumber = mapNumber;
    this.mapSizeX = mapSizeX;
    this.firstDirection = firstDirection;
    this.endDirection = endDirection;
    this.endX = endX;
    this.endY = endY;
}

/**
 * 描画専用のドカンオブジェクト 
 * @param {*} posX 
 * @param {*} posY 
 * @param {*} width 
 * @param {*} height 
 * @param {*} direction 
 */
function DocanObj(posX,posY,width,height,direction){
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;    
    this.direction = direction;
}

/**
 * 描画関数
 * @param {*} ctx 
 * @param {*} texture 
 * @param {*} scrollX 
 */
DocanObj.prototype.draw = function(ctx,texture,scrollX){
    switch(this.direction){
        case DOCAN_LEFT:
            ctx.drawImage(texture,320,96,64,64,this.posX - scrollX,this.posY,MAP_SIZE * 2,MAP_SIZE * 2);		    
            break;
        case DOCAN_UP:
            // 土管の下を描画
            for(var i = 0;i < parseInt(this.height / MAP_SIZE) - 1;++i){
                ctx.drawImage(texture,448,128,64,32,this.posX - scrollX,this.posY - (i * MAP_SIZE),MAP_SIZE * 2,MAP_SIZE);
            }
            ctx.drawImage(texture,448,96,64,32,this.posX - scrollX,this.posY - this.height + MAP_SIZE,MAP_SIZE * 2,MAP_SIZE);
            break;
        case DOCAN_DOWN:
            ctx.drawImage(texture,384,96,64,64,this.posX - scrollX,this.posY,MAP_SIZE * 2,MAP_SIZE * 2);		    
            break;
        case DOCAN_RIGHT:
            break;  
    }
}


