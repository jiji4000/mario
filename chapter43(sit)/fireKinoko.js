/**
 * FireKinoko.js
 * 
 * chapter38
 * don't move
 * 
 */

function FireKinoko(posX,posY){
	this.posX = posX;
	this.posY = posY;
	//  mapchip pos
	this.rightMapX = 0;
	this.leftMapX = 0;
	this.upMapY = 0;
	this.downMapY = 0;
	this.height = 32;
	this.state = INACTIVE;
	// animation flag when appear
	this.isFirstAnimation = true;
	this.offsetY = 0;
}

/*
	draw
	
	ctx:context
	texture:img class
	scrollX:X align scroll num
*/
FireKinoko.prototype.draw = function(ctx,texture,scrollX){
	if(this.state != INACTIVE){
		ctx.drawImage(texture, 32,480,32,this.offsetY,this.posX - scrollX,this.posY,32,this.offsetY);
	}
}

/*
	move event

	moveNum:move amount
*/
FireKinoko.prototype.move = function(mapChip,moveNum){
	// 動かないはずだが、マップチップの更新はしておく
	this.updateMapPosition();
}

/**
	update x align map pos

	posX : target object x align pos
*/
FireKinoko.prototype.updateMapPositionX = function(posX){
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
	update y align map pos

	posX : target object y align pos
*/
FireKinoko.prototype.updateMapPositionY = function(posY){
	// y
	this.upMapY = Math.floor(posY / MAP_SIZE);
	this.downMapY = Math.floor((posY + MAP_SIZE - 1) / MAP_SIZE);

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

/**
	update x and y mapchip pos
*/
FireKinoko.prototype.updateMapPosition = function(){
	this.updateMapPositionX(this.posX);
	this.updateMapPositionY(this.posY);
}

/*
  collision with mario

  map:MapChip array
  mario:Mario class
*/
FireKinoko.prototype.collisionWithMario = function(map,mario){
  if(!mario.isDead()){
    // x軸
    if(mario.moveNumX < this.posX + 32 && mario.moveNumX + 32 > this.posX)
    {
      // マリオの上とキノコの下(キノコは32*32で切り取られているので、最下部は32+される)
      if(mario.posY < this.posY + 32){
        // マリオの下とキノコの上
        if(mario.posY + mario.height > this.posY + (32 - this.height)){
          // マリオを大きくする処理を書く
          this.state = INACTIVE;
          // マリオを大きくする処理
          mario.getFireKinoko();
        }
      }
    }
  }
}

/**
 * update function
 * map:mapchip array
 * mario:mario class
 */
FireKinoko.prototype.update = function(map,mario){
	if(this.state != INACTIVE){
		// animation when appear
		if(this.isFirstAnimation){
			this.appearingAnimation();
		}
		else{
			this.move(map,2);
		}
		this.collisionWithMario(map,mario);
	}
}

/**
  activate kinoko

  posX:appear location x
  posY:appear location y
*/
FireKinoko.prototype.activate = function(posX,posY){
  this.posX = posX;
  this.posY = posY;
  this.state = NORMAL_STATE;
  this.isFirstAnimation = true;
  this.offsetY = 0;
}

/**
 * animate kinoko first appear
*/
FireKinoko.prototype.appearingAnimation = function(){
	this.posY -= 1;
	this.offsetY += 1;
	if(this.offsetY == 32){
		this.isFirstAnimation = false;
	} 
}