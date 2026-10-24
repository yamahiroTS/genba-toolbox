/* ツール登録表
   新しいツールを追加するときは、tools/<id>/index.html を作り、
   この配列に1項目足すだけでメニューに並びます。
   status: "ready"（使える） / "soon"（準備中・押せない） */
window.TOOLS = [
  {
    id: "voltage-drop",
    name: "電圧降下・ケーブル選定",
    desc: "こう長・電流・電圧から、内線規程の許容値に収まる太さを選ぶ",
    path: "tools/voltage-drop/index.html",
    status: "ready",
    icon: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h24"/><path d="M4 23h24"/><path d="M18 3l-5 13h6l-5 13"/></svg>'
  },
  {
    id: "fiber-loss",
    name: "光ケーブル損失判定",
    desc: "距離・融着数・コネクタ数から許容損失を出し、測定値をOK/NG判定",
    path: "tools/fiber-loss/index.html",
    status: "ready",
    icon: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="16" r="3"/><path d="M10 16c4 0 4-7 8-7s4 14 8 14"/><path d="M26 23h3"/></svg>'
  },
  {
    id: "messenger-wire",
    name: "メッセンジャーワイヤー選定",
    desc: "ケーブル・径間から風圧・氷雪を含む合成荷重と張力を出し、ワイヤの太さを選ぶ",
    path: "tools/messenger-wire/index.html",
    status: "ready",
    icon: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 27V6"/><path d="M27 27V6"/><path d="M5 9c7 7 15 7 22 0"/><path d="M11 14v4M16 15.5v4M21 14v4"/></svg>'
  }
];
