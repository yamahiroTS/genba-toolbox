/* メッセンジャーワイヤー選定ツール用データ
   元の計算表「メッセンジャーワイヤー選定 ver.2」の各シートの値をそのまま移しています。
   値を直すときはこのファイルだけ修正してください。 */
window.MW_DATA = {

  /* ケーブル（ｹｰﾌﾞﾙ シート）：Wc＝重量 kg/m、d＝外径 mm */
  cables: [
    { name: "600V CVT 8",   wc: 0.40, d: 19 },
    { name: "600V CVT 14",  wc: 0.59, d: 21 },
    { name: "600V CVT 22",  wc: 0.87, d: 24 },
    { name: "600V CVT 38",  wc: 1.36, d: 28 },
    { name: "600V CVT 60",  wc: 2.07, d: 33 },
    { name: "600V CVT 100", wc: 3.34, d: 40 }
  ],
  /* 「その他」を選んだときの初期値（手入力欄に入る） */
  otherCable: { wc: 0.07, d: 9 },

  /* メッセンジャーワイヤー（ﾒｯｾﾝｼﾞｬｰﾜｲﾔｰ シート）
     size＝断面積 sq、w＝重量 kg/m、d＝外径 mm、strength＝張力（引張荷重）kgf */
  wires: [
    { size: 5.5, w: 0.043, d: 3.0,  strength: 632 },
    { size: 8,   w: 0.062, d: 3.6,  strength: 910 },
    { size: 10,  w: 0.104, d: 4.2,  strength: 1240 },
    { size: 14,  w: 0.111, d: 4.8,  strength: 1620 },
    { size: 18,  w: 0.141, d: 5.4,  strength: 2050 },
    { size: 22,  w: 0.174, d: 6.0,  strength: 2530 },
    { size: 30,  w: 0.230, d: 6.9,  strength: 3340 },
    { size: 38,  w: 0.294, d: 7.8,  strength: 4280 },
    { size: 45,  w: 0.366, d: 8.7,  strength: 5320 },
    { size: 55,  w: 0.446, d: 9.6,  strength: 6470 },
    { size: 70,  w: 0.535, d: 10.5, strength: 7750 }
  ],

  /* 設計条件の初期値（記入欄 シート） */
  defaults: {
    span: 10,        // 径間 m
    sagRatio: 0.01,  // 弛度 ＝ 径間 × 0.01
    windSummer: 100, // 夏風圧 Vs kg/㎡
    windWinter: 50,  // 冬風圧 Vw kg/㎡
    iceDensity: 0.9, // 氷雪比重 ρ
    iceThickness: 6, // 氷雪厚 h mm
    safety: 2.5      // 安全率
  },

  /* 計算表と同じく、円周率は 3.14 を使う */
  pi: 3.14,

  /* 計算表と同じく、ケーブルのみ → ワイヤ込み → ワイヤ込み再計算 の3回で選定する */
  passes: 3
};
