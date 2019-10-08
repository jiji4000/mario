var g_Canvas;
var g_Ctx;

// texture
var gMarioTex;
var gMapTex;
// chapter24
var gKuriboTex;
// chapter31
var gCoinTex;

var gMario;
var gKuribos = [,];

var gMapAnimFrame = 0;
var gMapAnimOffsetX = 0;

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
  [255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [255,255,255,255,255,255,255,255,255,255,255,255,255,64,255,255,255,255,255,64,255,255,255,255,255,255,255,64,255,255,255,255,255,255,255,64,64,64,64,64,255,255,64,64,64,64,64,255,255,64,64,64,64,64,255,255,64,255,255,255,255,255,64,255,255,255,255,255,255,255,64,255,255,255,255,255,255,255,64,64,64,64,64,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [255,255,255,255,255,255,255,255,255,255,255,255,255,64,64,255,255,255,64,64,255,255,255,255,255,255,64,255,64,255,255,255,255,255,255,64,255,255,255,64,255,255,255,255,64,255,255,255,255,64,255,255,255,64,255,255,64,64,255,255,255,64,64,255,255,255,255,255,255,64,255,64,255,255,255,255,255,255,64,255,255,255,64,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [255,255,255,255,255,33,33,33,255,255,255,255,255,64,255,64,255,64,255,64,255,255,255,255,255,64,255,255,255,64,255,255,255,255,255,64,255,255,255,64,255,255,255,255,64,255,255,255,255,64,255,255,255,64,255,255,64,255,64,255,64,255,64,255,255,255,255,255,64,255,255,255,64,255,255,255,255,255,64,255,255,255,64,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [255,255,255,255,255,255,255,255,255,255,255,255,255,64,255,255,64,255,255,64,255,255,255,255,64,255,255,255,255,255,64,255,255,255,255,64,64,64,64,64,255,255,255,255,64,255,255,255,255,64,255,255,255,64,255,255,64,255,255,64,255,255,64,255,255,255,255,64,255,255,255,255,255,64,255,255,255,255,64,64,64,64,64,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [255,255,255,64,255,255,255,255,255,64,255,255,255,64,255,255,255,255,255,64,255,255,255,64,64,64,64,64,64,64,64,64,255,255,255,64,255,255,64,255,255,255,255,255,64,255,255,255,255,64,255,255,255,64,255,255,64,255,255,255,255,255,64,255,255,255,64,64,64,64,64,64,64,64,64,255,255,255,64,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [255,255,255,64,64,64,82,64,64,64,255,255,255,64,255,255,255,255,255,64,255,255,64,255,255,255,255,255,255,255,255,255,64,255,255,64,255,255,255,64,255,255,64,64,64,64,64,255,255,64,64,64,64,64,255,255,64,255,255,255,255,255,64,255,255,64,255,255,255,255,255,255,255,255,255,64,255,255,64,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,64],
  [255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
  [112,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,114],
  [128,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,130]
];

// 背景用のマップチップ
var gBackGroundMapChip = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

// アニメーションマップチップを入れる
var ANIM_MAP_CHIPS = [33];

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
    gKuribos[0] = new Kuribo(256,256,LEFT_DIR);
    gKuribos[1] = new Kuribo(160,384,RIGHT_DIR);

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
  gKuriboTex = new Image();
  gKuriboTex.src = "resource/slime.png"
  gCoinTex = new Image();
  gCoinTex.src = "resource/white_number.png";
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
  // 背景
  drawMap(gBackGroundMapChip);
  // オブジェクト
  drawObjectMap(gMapChip);
  gMario.draw(g_Ctx,gMarioTex);
  for(var i = 0;i < gKuribos.length;++i){
	  gKuribos[i].draw(g_Ctx,gKuriboTex,gMario.mapScrollX);
  }

  drawCoin(630,10,gMario.coinNum);
  drawBlockCoin();
  // chapter37
  drawBlock();
  changeMapAnim();
  gMario.kinoko.draw(g_Ctx,gMapTex,gMario.mapScrollX)
  gMario.animateBlockCoin();
  // chapter37
  gMario.animateBlock();
}

/**
  マップチップを描画

  map:対象のマップチップ配列
*/
function drawMap(map){
  // y軸
  for(var y = 0;y < MAX_MAP_Y;++y){
    // x軸
    for(var x = gMario.minDrawMapX;x < gMario.maxDrawMapX;++x){
      if(map[y][x] != NOT_DRAW_MAP){
        var indexX = 32 * ((map[y][x] + 16) % 16);
        var indexY = 32 * Math.floor(map[y][x] / 16);
        g_Ctx.drawImage(gMapTex,indexX,indexY,32,32,x * 32 - gMario.mapScrollX,y * 32,32,32);
      }
    }
  }
}

/**
  マップチップオブジェクトを描画
  マップオブジェクトの一部はアニメーションする

  map:対象のマップチップ配列
*/
function drawObjectMap(map){
  // y軸
  for(var y = 0;y < MAX_MAP_Y;++y){
    // x軸
    for(var x = gMario.minDrawMapX;x < gMario.maxDrawMapX;++x){
      if(map[y][x] != NOT_DRAW_MAP){
        var indexX = 32 * ((map[y][x] + 16) % 16);
        // アニメーション用のマップチップの場合、animation offsetを足す
        if(isAnimationMap(map[y][x])){
          indexX += gMapAnimOffsetX * MAP_SIZE;
        }
        var indexY = 32 * Math.floor(map[y][x] / 16);
        g_Ctx.drawImage(gMapTex,indexX,indexY,32,32,x * 32 - gMario.mapScrollX,y * 32,32,32);
      }
    }
  }
}

/**
	コインの枚数の描画
*/
function drawCoin(posX,posY,coinNum){
  var digits = getDigits(coinNum);	// 桁数を取得
  var maxNumber = getMaxNumber(digits);
  // 描画位置
  var numberPosX = posX - (digits * 25);
  // 全て描画するまで
  while(maxNumber >= 1){
    // 一番上の桁数から描画する
    g_Ctx.drawImage(gCoinTex, Math.floor((coinNum / maxNumber )) * 20,0,20,17, numberPosX,posY, 20, 17);
    coinNum -= Math.floor((coinNum / maxNumber)) * maxNumber;				// 一番上の桁数を引く(111だったら100を引く)
    maxNumber = Math.floor(maxNumber / 10);		// 111 = 11にする
    numberPosX += 25;
  }
}

/**
  アイテムブロックから出現したコインの描画
*/
function drawBlockCoin(){
  for(var i = 0;i < MAX_MAP_BLOCK;++i){
    if(gMario.isBlockCoinAnim[i]){
      g_Ctx.drawImage(gMapTex,32,64,MAP_SIZE,MAP_SIZE,gMario.blockCoinX[i] - gMario.mapScrollX,gMario.blockCoinY[i],MAP_SIZE, MAP_SIZE);
    }
  }
}

/**
 * chapter37
 * animationブロックの描画
 */
function drawBlock(){
	for(var i = 0;i < MAX_MAP_BLOCK;++i){
		// 破壊ブロック
		if(gMario.isBlockAttack[i]){
			g_Ctx.drawImage(gMapTex, 0, 128 , 16, 16, gMario.blockAttackX[i][1] - gMario.mapScrollX,gMario.blockAttackY[i][1], 16, 16);	//
			g_Ctx.drawImage(gMapTex, HALF_MAP_SIZE, 128 , 16, 16, gMario.blockAttackX[i][3] - gMario.mapScrollX,gMario.blockAttackY[i][3], 16, 16);	//
			g_Ctx.drawImage(gMapTex, HALF_MAP_SIZE, 144 , 16, 16, gMario.blockAttackX[i][2] - gMario.mapScrollX,gMario.blockAttackY[i][2], 16, 16);	//
			g_Ctx.drawImage(gMapTex, 0, 144 , 16, 16, gMario.blockAttackX[i][0] - gMario.mapScrollX,gMario.blockAttackY[i][0], 16, 16);	//
		}
		// 上昇ブロック
		if(gMario.isBlockUp[i]){
			// カモフラージュ用
			var indexX = 32 * ((gBackGroundMapChip[gMario.blockAttackIndexY[i]][gMario.blockAttackIndexX[i]] + 16) % 16);
			var indexY = 32 * Math.floor(gBackGroundMapChip[gMario.blockAttackIndexY[i]][gMario.blockAttackIndexX[i]] / 16);
			g_Ctx.drawImage(gMapTex, indexX, indexY , 32, 32, gMario.blockUpX[i] - gMario.mapScrollX,gMario.blockUpY[i], 32, 32); 
			g_Ctx.drawImage(gMapTex, 0, 128 , 32, 32, gMario.blockUpX[i] - gMario.mapScrollX,gMario.blockUpY[i] - gMario.blockAttackAddY[i], 32, 32);
		}
	}
}

/**
  マップチップ用のAnimationFrameの処理
*/
function changeMapAnim(){
  if(gMapAnimFrame++ >= MAX_MAP_ANIM_FRAME){
    gMapAnimFrame = 0;
    if(++gMapAnimOffsetX >= MAX_MAP_ANIM_NUM){
      gMapAnimOffsetX = 0;
    }
  }
}

/**
  アニメーションマップチップかどうか判定する

  mapIndex : 対象のマップチップインデックス
*/
function isAnimationMap(mapIndex){
  for(var i = 0;i < ANIM_MAP_CHIPS.length;++i){
    if(ANIM_MAP_CHIPS[i] == mapIndex){
      return true;
    }
  }
  return false;
}

function move(){
  gMario.update(gMapChip,gKuribos);
  enemyMove();
  gMario.kinoko.update(gMapChip,gMario);
}

function enemyMove(){
	for(var i = 0;i < gKuribos.length;++i){
		gKuribos[i].update(gMapChip,gMario,1);
	}
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
