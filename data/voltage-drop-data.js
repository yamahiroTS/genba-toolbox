/* 電圧降下ツール用データ
   計算処理とは分けて持たせています。規程の改定やExcel表との突き合わせで
   値を直すときは、このファイルだけ修正してください。 */
window.VD_DATA = {

  /* 許容電圧降下率（%）：内線規程 1310節 によるこう長の区分
     cubicle: キュービクルあり（構内変圧器から供給）
     lowVoltage: キュービクルなし（低圧受電）
     ※ 手持ちの計算表に合わせ、60m以下も「120m以下」の値で判定する */
  allowance: [
    { maxLength: 120,      cubicle: 5, lowVoltage: 4, label: "120m以下" },
    { maxLength: 200,      cubicle: 6, lowVoltage: 5, label: "200m以下" },
    { maxLength: Infinity, cubicle: 7, lowVoltage: 6, label: "200m超過" }
  ],

  /* 60m以下のときに注記する内線規程上の個別規定（%） */
  short60: { cubicleMain: 3, lowVoltageMain: 2, branch: 2 },

  /* ケーブル種別ごとの選定対象サイズ
     CV・CVT は公称断面積（mm²）。VVF は計算用の断面積と表示用の導体径の組 */
  cables: {
    CV:  { unit: "mm²", sizes: [2, 3.5, 5.5, 8, 14, 22, 38, 60, 100, 150, 200, 250, 325] },
    CVT: { unit: "mm²", sizes: [8, 14, 22, 38, 60, 100, 150, 200, 250, 325] },
    VVF: { unit: "mm",  sizes: [2.01, 3.14, 5.31], labels: { "2.01": "1.6", "3.14": "2.0", "5.31": "2.6" } }
  }
};
