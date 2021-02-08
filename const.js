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
// chapter39
var END_ANIMATION = 4;
// chapter27
var NORMAL_STATE = 1;
var KINOKO_STATE = 2;
// chapter38
var FIRE_STATE = 3;
var DEAD_ACTION = 100;
var DEAD_FIRE_ACTION = 101;
var DEAD = 102;
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
// chapter37
var BLOCK_UP_ADD_Y = -10;
// chapter39
var FIRE_SIZE = 24;
var DISPLAY_HEIGHT = 480;
var DISPLAY_WIDTH = 640;
// chapter40
var NOKO_WAIT_STATE = 2;
var NOKO_AWAKING_STATE =  3;
var NOKO_ATTACK_STATE = 4;
// chapter42
// マップ番号はオブジェクトや敵などのindexに対応させる必要がある
let MAP_ONE = 0;
let MAP_TWO = 1;
let MAP_THREE = 2;
let DOCAN_LEFT = 0;
let DOCAN_UP = 1;
let DOCAN_RIGHT = 2;
let DOCAN_DOWN = 3;
// 土管を移動する時の遷移時間frame換算
let DOCAN_MOVE_TIME = 120;
// chapter44
let TITLE = 0
let IN_STAGE = 1;
let PRE_STAGE = 2;
let GAME_OVER = 3;
// マリオがやられてからコンテニュー画面に行くまでの時間
let CONTINUE_CNT = 60;
// ステージ前画面からステージ画面へ遷移するまでの時間
let PRE_STAGE_CNT = 150;

// chapter45
let MAX_PLAYER_NUM = 99;
let ONE_UP_CNT = 80;

// chapter46
// 各々のステージごとに決められた制限時間
let STAGE_TIMES = [(60 * 60 * 3),];
// chapter47
let MAX_SCORE_DIGITS = 6;
let MAX_SCORE = 999999;
let STOMPING_SCORES = [0,100,200,400,800,1000,2000,4000,8000,10000];
let COIN_SCORE = 100;
let KINOKO_SCORE = 1000;
let FIRE_SCORE = 2000;

// chapter48
let INVINCIBLE_TIME = 120;