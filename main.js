var g_Canvas;
var g_Ctx;

// texture
var gMarioTex;
var gMapTex;

var gMario;

// key
var gSpacePush = false; // space
var gLeftPush = false;	// left
var gRightPush = false;	// right
var gUpPush = false;	// up
var gDownPush = false;	// down
// keyの定義
var SPACE_KEY = 32;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var UP_KEY = 38;
var DOWN_KEY = 40;

var gMapChip = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,80,80,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,64,64,64,64,64,64,64,64,64,64,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[112,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,114],
[128,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,130]
];

/**
	onload
	最初に呼び出される関数
*/
onload = function () {
    // キャンバスに代入
    g_Canvas = document.getElementById('id_canvas');
    // cavasに対応していない
    if (!g_Canvas || !g_Canvas.getContext) {
        alert("html5に対応していないので、実行できません");
        return false;
    }

    g_Ctx = g_Canvas.getContext('2d');          // ctx
    loadTexture();
    // mario
    gMario = new Mario(0,384);

    // キーの登録
    window.addEventListener('keydown', keyDown, true);
    window.addEventListener('keyup', keyUp, true);
    requestNextAnimationFrame(animate);		// loopスタート
};

/*
	テクスチャのロード
*/
function loadTexture(){
	gMarioTex = new Image();
	gMarioTex.src = "resource/main.png";
  gMapTex = new Image();
  gMapTex.src = "resource/map512.png";
}

function animate(now) {
    move();
    // 描画
    Draw();
    requestNextAnimationFrame(animate);
}

/*
	60fps毎に処理を実行
*/
window.requestNextAnimationFrame =
(function () {
   var originalWebkitRequestAnimationFrame = undefined,
       wrapper = undefined,
       callback = undefined,
       geckoVersion = 0,
       userAgent = navigator.userAgent,
       index = 0,
       self = this;

   // Workaround for Chrome 10 bug where Chrome
   // does not pass the time to the animation function

   if (window.webkitRequestAnimationFrame) {
      // Define the wrapper

      wrapper = function (time) {
        if (time === undefined) {
           time = +new Date();
        }
        self.callback(time);
      };

      // Make the switch

      originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;

      window.webkitRequestAnimationFrame = function (callback, element) {
         self.callback = callback;

         // Browser calls the wrapper and wrapper calls the callback

         originalWebkitRequestAnimationFrame(wrapper, element);
      }
   }

   // Workaround for Gecko 2.0, which has a bug in
   // mozRequestAnimationFrame() that restricts animations
   // to 30-40 fps.

   if (window.mozRequestAnimationFrame) {
      // Check the Gecko version. Gecko is used by browsers
      // other than Firefox. Gecko 2.0 corresponds to
      // Firefox 4.0.

      index = userAgent.indexOf('rv:');

      if (userAgent.indexOf('Gecko') != -1) {
         geckoVersion = userAgent.substr(index + 3, 3);

         if (geckoVersion === '2.0') {
            // Forces the return statement to fall through
            // to the setTimeout() function.

            window.mozRequestAnimationFrame = undefined;
         }
      }
   }

   return window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||

      function (callback, element) {
         var start,
             finish;


         window.setTimeout( function () {
            start = +new Date();
            callback(start);
            finish = +new Date();

            self.timeout = 1000 / 60 - (finish - start);

         }, self.timeout);
      };
   }
)
();


/*
	Draw
	描画
*/
function Draw(){
  drawMap(gMapChip);
	//g_Ctx.drawImage(gMarioTex,0,0,24,24,gMarioPosX,gMarioPosY,24,24);
	gMario.draw(g_Ctx,gMarioTex);

}

/**
  マップチップを描画

  map:対象のマップチップ配列
*/
function drawMap(map){
  // y軸
  for(var y = 0;y < MAX_MAP_Y;++y){
    // x軸
    for(var x = 0;x < MAX_MAP_X;++x){
      var indexX = 32 * ((map[y][x] + 16) % 16);
      var indexY = 32 * Math.floor(map[y][x] / 16);
      g_Ctx.drawImage(gMapTex,indexX,indexY,32,32,x * 32,y * 32,32,32);
    }
  }
}


function move(){
  // マップ座標の更新
  gMario.updateMapPosition();
	// 左キーが押されている状態
	if(gLeftPush){
    if(gSpacePush){
        gMario.setIsDash(true);
		    gMario.moveX(gMapChip,-DASH_SPEED);
    }
    else{
      gMario.setIsDash(false);
      gMario.moveX(gMapChip,-NORMAL_SPPED);
    }
	}
	// →キーが押されている状態
	if(gRightPush){
    if(gSpacePush){
        gMario.setIsDash(true);
		    gMario.moveX(gMapChip,DASH_SPEED);
    }
    else{
      gMario.setIsDash(false);
      gMario.moveX(gMapChip,NORMAL_SPPED);
    }
	}

  // ジャンプ動作
  if(gUpPush){
    // ジャンプ設定をオンにする
    gMario.setJumpSettings(gSpacePush);
  }
  // ジャンプ処理
  gMario.jumpAction(gUpPush,gMapChip);
}

/*
	キーを押した時の操作
*/
function keyDown(event) {
	var code = event.keyCode;       // どのキーが押されたか
	switch(code) {
	    // スペースキー
	    case SPACE_KEY:
            	// スクロールさせないため
            	event.returnValue = false;		// ie
            	event.preventDefault();		// firefox
	        gSpacePush = true;
	        break;
	    // ←キー
	    case LEFT_KEY:
	        gLeftPush = true;
	        break;
	    // →キー
	    case RIGHT_KEY:
	        gRightPush = true;
	        break;
	    // ↑キー
	    case UP_KEY:
            	event.returnValue = false;	// ie
            	event.preventDefault();	// firefox
		gUpPush = true;
	        break;
            // ↓キー
	    case DOWN_KEY:
            	event.returnValue = false;	// ie
            	event.preventDefault();	// firefox
	    	gDownPush = true;
	        break;
	}
}

/*
	キーを離した時のイベント
*/
function keyUp(event) {
	code = event.keyCode;
	switch(code) {
	    // スペースキー
	    case SPACE_KEY:
	        gSpacePush = false;
	        break;
	    // ←キー
	    case LEFT_KEY:
	        gLeftPush = false;
	        break;
	    case RIGHT_KEY:
	        // →キー
	        gRightPush = false;
	        break;
	    case UP_KEY:
	        // ↑キー
		gUpPush = false;
	        break;
	    case DOWN_KEY:
	        // ↓キー
		gDownPush = false;
	        break;
	}
}
