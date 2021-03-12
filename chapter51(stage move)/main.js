var g_Canvas;
var g_Ctx;

// texture
var gMarioTex;
var gMapTex;
// chapter24
var gKuriboTex;
// chapter31
var gCoinTex;
// chapter40
var gNokoTex;

var gMario;
let gKuribos = [
  [new Kuribo(1024,384,LEFT_DIR),new Kuribo(1088,384,LEFT_DIR)],
  //[new Kuribo(128,384,LEFT_DIR),new Kuribo(192,384,LEFT_DIR),new Kuribo(256,384,LEFT_DIR),new Kuribo(320,384,LEFT_DIR),new Kuribo(384,384,LEFT_DIR),new Kuribo(448,384,LEFT_DIR),new Kuribo(512,384,LEFT_DIR),new Kuribo(576,384,LEFT_DIR),new Kuribo(640,384,LEFT_DIR),],
  []
];

let gNokos = [
  [new Noko(384,396,RIGHT_DIR),new Noko(192,396,LEFT_DIR)],
  //[new Noko(1200,396,RIGHT_DIR),new Noko(1800,396,LEFT_DIR)],
  //[new Noko(128,384,LEFT_DIR),new Noko(192,384,LEFT_DIR),new Noko(256,384,LEFT_DIR),new Noko(320,384,LEFT_DIR),new Noko(384,384,LEFT_DIR),new Noko(448,384,LEFT_DIR),new Noko(512,384,LEFT_DIR),new Noko(576,384,LEFT_DIR),new Noko(640,384,LEFT_DIR),],
  []
];

// ゴールオブジェクト
let gGoal = new Goal(960);

var gMapAnimFrame = 0;
var gMapAnimOffsetX = 0;

// key
var gSpacePush = false; // space
var gLeftPush = false;	// left
var gRightPush = false;	// right
var gUpPush = false;	// up
var gDownPush = false;	// down
var gAPush = false;		// A key for fire
var gADown = false;		// A key for fire
// keyの定義
var SPACE_KEY = 32;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var UP_KEY = 38;
var DOWN_KEY = 40;
var A_KEY = 65;

let gMapChip = [
[255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,255,255,255,255,255,255,255,255,255,255,-1,-1,255,255,255,255,-1,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,255,255,255,255,255,255,255,255,255,-1,-1,-1,-1,255,255,-1,-1,255,48,48,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,255,255,33,33,33,255,255,255,255,-1,-1,255,-1,-1,-1,-1,-1,48,48,48,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,255,255,255,255,255,255,255,255,255,255,-1,-1,255,-1,-1,-1,48,48,48,48,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,255,255,255,255,255,255,255,255,255,255,-1,-1,255,255,-1,48,48,48,48,48,255,255,255,255,255,255,255,255,255,255,255,255,140,141,142,143,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,255,64,80,80,80,64,255,255,255,255,-1,255,255,255,48,48,48,48,48,48,255,255,255,255,255,255,255,255,255,255,255,255,156,157,158,159,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,64],
[255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,48,48,48,48,48,48,48,255,255,255,255,255,255,255,255,255,255,255,171,172,173,174,175,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,255,255,255,255,255,255,255,255,255,62,63,-1,48,48,48,48,48,48,48,48,255,255,255,255,255,255,255,255,255,255,255,187,188,189,190,191,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,62,63,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,255,255,255,255,255,255,255,255,255,78,79,48,48,48,48,48,48,48,48,48,255,255,255,255,255,255,255,48,255,255,255,203,204,205,206,207,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,78,79,255,255,255,255,255,255,255,255,255,255,255,255],
[112,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,114],
[128,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,130]
];

let gMapChipCopy = JSON.parse(JSON.stringify(gMapChip));

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

let gBonusMapChip = [
[64,60,61,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64],
[64,76,77,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,64],
[64,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,64],
[64,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,64],
[64,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,64],
[64,-1,-1,-1,-1,-1,-1,-1,33,33,33,33,-1,-1,-1,-1,-1,-1,-1,64],
[64,-1,-1,-1,-1,-1,-1,-1,33,33,33,33,-1,-1,-1,-1,-1,-1,-1,64],
[64,-1,-1,-1,-1,-1,-1,-1,33,33,33,33,-1,-1,-1,-1,-1,-1,-1,64],
[64,-1,-1,-1,-1,-1,-1,-1,33,33,33,33,-1,-1,-1,-1,-1,-1,-1,64],
[64,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,64],
[64,-1,-1,-1,-1,-1,-1,64,64,64,64,64,64,-1,-1,-1,-1,-1,-1,64],
[64,-1,-1,-1,-1,-1,-1,64,64,64,64,64,64,-1,-1,-1,-1,-1,-1,64],
[64,-1,-1,-1,-1,-1,64,64,64,64,64,64,64,64,-1,-1,-1,-1,58,59],
[64,-1,-1,-1,-1,-1,64,64,64,64,64,64,64,64,-1,-1,-1,-1,74,75],
[64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64,64]
];
let gBonusMapChipCopy = JSON.parse(JSON.stringify(gBonusMapChip));

let gBonusBackMapChip = [
[255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255],
[255,255,255,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,255],
[255,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,255],
[255,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,255],
[255,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,255],
[255,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,255],
[255,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,255],
[255,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,255],
[255,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,255],
[255,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,255],
[255,15,15,15,15,15,15,255,255,255,255,255,255,15,15,15,15,15,15,255],
[255,15,15,15,15,15,15,255,255,255,255,255,255,15,15,15,15,15,15,255],
[255,15,15,15,15,15,255,255,255,255,255,255,255,255,15,15,15,15,15,15],
[255,15,15,15,15,15,255,255,255,255,255,255,255,255,15,15,15,15,15,15],
[255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255]
];

// マップによって変化できるように配列で持つ
let gDocans = [
  [],
  //[new Docan(384,320,64,64,MAP_TWO,gBonusMapChip[0].length,DOCAN_DOWN,DOCAN_DOWN,48,64)],
  //[new Docan(576,384,64,64,MAP_ONE,gMapChip[0].length,DOCAN_RIGHT,DOCAN_UP,2768,320)]
];

// マップによって変化できるように配列で持つ
let gDocanObjs = [
  [],
  // [new DocanObj(384,352,DOCAN_UP),new DocanObj(2752,352,DOCAN_UP)],
  // [new DocanObj(32,0,DOCAN_DOWN),new DocanObj(576,384,DOCAN_LEFT)]
];

// chapter46
let timer = new Timer(STAGE_TIMES[0]);

// ステージ前画からステージへゲームオーバーからタイトル画面へのカウンタ
let moveStageCnt = 0;

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
  gNokoTex = new Image();
  gNokoTex.src = "resource/nokonoko.png";
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

/**
 * ステージ1の敵の初期化
 */
function initStage1Enemy(){
  // kuribo
  gKuribos[0][0].init(1024,384,LEFT_DIR);
  gKuribos[0][1].init(1088,384,LEFT_DIR);
  // nokonoko
  gNokos[0][0].init(384,396,RIGHT_DIR);
  gNokos[0][1].init(192,396,LEFT_DIR);
}

/**
 * ステージ2の敵の初期化
 */
function initStage2Enemy(){
  // kuribo
  gKuribos[0][0].init(1024,384,LEFT_DIR);
  gKuribos[0][1].init(1088,384,LEFT_DIR);
  // nokonoko
  gNokos[0][0].init(384,396,RIGHT_DIR);
  gNokos[0][1].init(192,396,LEFT_DIR);
}

/*
	Draw
	描画
*/
function Draw(){
  switch(gState){
    case IN_STAGE:
      drawInStage();
      break;
    case PRE_STAGE:
      drawPreStage();
      break;
    case GAME_OVER:
      drawGameOver();
      break;
  }
}

function drawInStage(){
  // 背景
  switch(gMapStage){
    case MAP_ONE:
      // ゴールの描画
      drawMap(gBackGroundMapChip);
      // flagの描画
      gGoal.drawCastleFlag(g_Ctx,gMapTex,gMario.mapScrollX);
      gGoal.draw(g_Ctx,gMapTex,gCoinTex,gMario.mapScrollX);
      break;
    case MAP_TWO:
      drawMap(gBonusBackMapChip);
      break;
  }

  // オブジェクト
  switch(gMapStage){
    case MAP_ONE:
      drawObjectMap(gMapChip);
      break;
    case MAP_TWO:
      drawObjectMap(gBonusMapChip);
      break;
  }

  gMario.draw(g_Ctx,gMarioTex);
  gMario.drawOneUp(g_Ctx,gMapTex);
  for(var i = 0;i < gMario.MAX_FIRE_NUM;++i){
	  gMario.fire[i].draw(g_Ctx,gMapTex,gMario.mapScrollX);
  }
  
  for(var i = 0;i < gKuribos[gMapStage].length;++i){
      gKuribos[gMapStage][i].draw(g_Ctx,gKuriboTex,gCoinTex,gMapTex,gMario.mapScrollX);
  }
  for(var i = 0;i < gNokos[gMapStage].length;++i){
      gNokos[gMapStage][i].draw(g_Ctx,gNokoTex,gCoinTex,gMapTex,gMario.mapScrollX);
  }
  
  // マリオが後ろに描画されるようにここで、土管を描画する
  for(var i = 0;i < gDocanObjs[gMapStage].length;++i){
    gDocanObjs[gMapStage][i].draw(g_Ctx,gMapTex,gMario.mapScrollX);
  }

  // chapter46 timer
  g_Ctx.drawImage(gMapTex,352,480,64,32, 550,0, 64, 32);
  drawNumber(615,32,Math.floor(timer.cnt / 60),0.8,0.8);
  // chapter47 score
  drawScore(32,10,gScore);
  
  // コイン
  g_Ctx.drawImage(gMapTex,32,64,32,32,280,8,22,22);
  // ×
  g_Ctx.drawImage(gMapTex,320,480,32,32,311,8,22,22);
  // コイン数
  drawNumber(343,10,gMario.coinNum,1,1,false);
  
  drawBlockCoin();
  // chapter37
  drawBlock();
  changeMapAnim();
  gMario.kinoko.draw(g_Ctx,gMapTex,gMario.mapScrollX);
  // chapter38
  gMario.fireKinoko.draw(g_Ctx,gMapTex,gMario.mapScrollX);
  gMario.animateBlockCoin();
  gMario.animateBlock();
  // chapter41
  gMario.star.draw(g_Ctx,gMapTex,gMario.mapScrollX);
  // chapter45
  gMario.oneUpKinoko.draw(g_Ctx,gMapTex,gMario.mapScrollX);
}

/**
 * ステージ前処理の描画
 */
function drawPreStage(){
  g_Ctx.fillStyle = "#000000";
  g_Ctx.fillRect(0,0,640,480);
  // 小さいマリオを描画
  g_Ctx.drawImage(gMarioTex,0,64,32,32,228,224,32,32);
  // 残機数
  drawNumber(390,231.5,gMario.playerNum);
  // multiply
  g_Ctx.drawImage(gMapTex,320,480,32,32,288,224,32,32);
  // stage名の描画
  g_Ctx.font = "22px Sans-serif";
  g_Ctx.fillStyle = "#ffffff";
  g_Ctx.textAlign = "center";
  // world
  g_Ctx.fillText("WORLD", 250, 180);
  // world number
  let stageStr = gWorldNumber + " - " + gSubWorldNumber;
  g_Ctx.fillText(stageStr,374,180);
}

/**
 * ステージ前処理の描画
 */
function drawGameOver(){
  // 黒で塗りつぶす
  g_Ctx.fillStyle = "#000000";
  g_Ctx.fillRect(0,0,640,480);
  // stage名の描画
  g_Ctx.font = "22px Sans-serif";
  g_Ctx.fillStyle = "#ffffff";
  g_Ctx.textAlign = "center";
  // GAMEOVER
  g_Ctx.fillText("GAME OVER", 320, 240);
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
 * 数値の描画
 * @param {*} posX 
 * @param {*} posY 
 * @param {*} coinNum 
 * @param {*} scaleX 
 * @param {*} scaleY 
 */
function drawNumber(posX,posY,coinNum,scaleX = 1,scaleY = 1,fromRight = true){
  var digits = getDigits(coinNum);	// 桁数を取得
  var maxNumber = getMaxNumber(digits);
  // 描画位置
  var numberPosX = fromRight == true ? posX - (digits * 25 * scaleX) : posX;
  // 全て描画するまで
  while(maxNumber >= 1){
    // 一番上の桁数から描画する
    g_Ctx.drawImage(gCoinTex, Math.floor((coinNum / maxNumber )) * 20,0,20,17, numberPosX,posY, 20 * scaleX, 17 * scaleY);
    coinNum -= Math.floor((coinNum / maxNumber)) * maxNumber;				// 一番上の桁数を引く(111だったら100を引く)
    maxNumber = Math.floor(maxNumber / 10);		// 111 = 11にする
    numberPosX += (25 * scaleX);
  }
}
/**
 * 10万点まで埋める
 * @param {*} posX 
 * @param {*} posY 
 * @param {*} score 
 */
function drawScore(posX,posY,score){
  let digits = getDigits(score);	// 桁数を取得
  let maxNumber = getMaxNumber(digits);
  // 描画位置
  let numberPosX = posX;
  let zeroNum = MAX_SCORE_DIGITS - digits;
  // 満たない部分は0で描画する
  for(var i = 0;i < zeroNum;++i){
    g_Ctx.drawImage(gCoinTex,0,0,20,17,numberPosX,posY,20,17);
    numberPosX += 25;
  }
  while(maxNumber >= 1){
    // 一番上の桁数から描画する
    g_Ctx.drawImage(gCoinTex, Math.floor((score / maxNumber )) * 20,0,20,17, numberPosX,posY, 20, 17);
    score -= Math.floor((score / maxNumber)) * maxNumber;				// 一番上の桁数を引く(111だったら100を引く)
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
  switch(gState){
    case PRE_STAGE:
      movePreStage();
      break;
    case GAME_OVER:
      moveGameOver();
      break;
    case IN_STAGE:
      moveInStage();
      break;
  }
}

function moveInStage(){
  switch(gMapStage){
    case MAP_ONE:
      gMario.update(gMapChip,gKuribos[gMapStage],gNokos[gMapStage],gDocans[gMapStage]);
      gMario.kinoko.update(gMapChip,gMario);
      gMario.fireKinoko.update(gMapChip,gMario);
      gMario.oneUpKinoko.update(gMapChip,gMario);
      gMario.star.update(gMapChip,gMario);
      gGoal.update(gMario);
      break;
    case MAP_TWO:
      gMario.update(gBonusMapChip,gKuribos[gMapStage],gNokos[gMapStage],gDocans[gMapStage]);
      gMario.kinoko.update(gBonusMapChip,gMario);
      gMario.fireKinoko.update(gBonusMapChip,gMario);
      gMario.star.update(gBonusMapChip,gMario);
      break;
  }
  enemyMove();
  // 時間更新
  if(timer.update(gMario.goalAnimationState)){
    // 時間切れ死亡処理
    gMario.timeOut();
  }
}

/**
 * ステージ前段階からステージへ進むまでの処理
 */
function movePreStage(){
  if(moveStageCnt++ >= PRE_STAGE_CNT){
    // ステージ毎に初期化する
    initStage();
    moveStageCnt = 0;
    gState = IN_STAGE;
  }
}

/**
 * ステージ毎の初期化を行う
 */
function initStage(){
  switch(gTotalStageNumber){
    case 1:
      initStage1();
      break;
    case 2:
      initStage2();
      break;

  }
  initStageTimes(gTotalStageNumber);
}

/**
 * stage1用の初期化
 */
function initStage1(){
  // 敵の初期化
  initStage1Enemy();
  // 隠しブロックの出現を保存する
  if(gMario.hideBlockX != -1){
    replaceEmptyBoxMap(gMapChipCopy,gMario.hideBlockX,gMario.hideBlockY);
  }
  // マップ初期化
  gMapChip = JSON.parse(JSON.stringify(gMapChipCopy));
  gBonusMapChip = JSON.parse(JSON.stringify(gBonusMapChipCopy));
  gMario.init(0,384);
}

/**
 * stage2用の初期化
 */
function initStage2(){
  // 敵の初期化
  initStage2Enemy();
  // 隠しブロックの出現を保存する
  if(gMario.hideBlockX != -1){
    replaceEmptyBoxMap(gMapChipCopy,gMario.hideBlockX,gMario.hideBlockY);
  }
  // マップ初期化
  gMapChip = JSON.parse(JSON.stringify(gMap12));
  gBackGroundMapChip = JSON.parse(JSON.stringify(gBackGroundMapChip12));
  gMario.init(0,384);
  
  // ゴール
  gGoal.init(91 * MAP_SIZE);
  gMario.setGoalPosition(91 * MAP_SIZE);
}

/**
 * ステージごとにの時間の初期化
 * @param {*} stageNum 
 */
function initStageTimes(stageNum){
  timer.cnt = STAGE_TIMES[stageNum - 1];
}

/**
 * ゲームオーバーからタイトル画面へ移るときの処理
 */
function moveGameOver(){

}

function enemyMove(){
  switch(gMapStage){
    case MAP_ONE:
      for(var i = 0;i < gKuribos[gMapStage].length;++i){
        gKuribos[gMapStage][i].update(gMapChip,gMario,1);
      }
      for(var i = 0;i < gNokos[gMapStage].length;++i){
        gNokos[gMapStage][i].update(gMapChip,gMario,gKuribos[gMapStage],gNokos[gMapStage],1);
      }
      break;
    case MAP_TWO:
      break;
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
	    case A_KEY:
	    	event.returnValue = false;	// ie
        	event.preventDefault();	// firefox
        	if(gAPush == false){
        		gADown = true;
        	}
	    	gAPush = true;
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
	    case A_KEY:
	    	gAPush = false;
	    	gADown = false;
	    	break;
	}
}
