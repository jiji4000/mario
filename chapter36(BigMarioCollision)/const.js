var RIGHT_DIR = 1;
var LEFT_DIR = 0;
var MAX_MAP_X = 20;
var MAX_MAP_Y = 15;

var DASH_SPEED = 5;
var NORMAL_SPPED = 3;
// 重力値
var GRAVITY_POWER = 1;
// 最大の重力量
var MAX_GRAVITY = 8;
var MAP_SIZE = 32;
var HALF_MAP_SIZE = 16;
// Chapter22 Scroll
// x座標のスクロール開始地点
var SCROLL_POINT_X = (640 / 2) - (MAP_SIZE / 2);
// マップチップの最大描画範囲(画面外+1のマップチップチップも描画させる)
var DRAW_MAX_MAP_X = MAX_MAP_X + 1;
// chapter23
// 最大のマップチップ量X
var MAX_MAP_CHIP_X = 100;
// chapter34
var INACTIVE = -1;
// chapter27
var NORMAL_STATE = 1;
var KINOKO_STATE = 2;
var DEAD_ACTION = 100;
var DEAD = 101;
// chapter28
var DEAD_ANIM_FRAME = 180;
var STEP_UP_NUM = 13;
// chapter29
var NOT_DRAW_MAP = 255;
// chapter32
// マップチップのアニメーション数
var MAX_MAP_ANIM_NUM = 4;
// マップチップ切り替え数
var MAX_MAP_ANIM_FRAME = 10;
// chapter33
var MAX_MAP_BLOCK = 2;
var MAX_BLOCK_COIN_FRAME = 20;
var EMPTY_BOX_MAP = 81;
