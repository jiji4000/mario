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
// chapter27
var NORMAL_STATE = 1;
var DEAD_ACTION = 100;
var DEAD = 101;
