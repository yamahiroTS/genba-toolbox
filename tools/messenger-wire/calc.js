/* メッセンジャーワイヤー選定の計算処理（元の計算表の式をそのまま移したもの） */
(function (root) {

  /* 1回分の荷重・張力計算
     wire を渡すと「ケーブル＋メッセンジャーワイヤー」、null なら「ケーブルのみ」 */
  function loadCase(data, c, wire) {
    var dEff = wire ? ((c.d + wire.d) + c.d) / 2 : c.d;  // 平均外径
    var wm = wire ? wire.w : 0;                           // ワイヤ重量

    // 高温季：風圧のみ
    var windS = c.windSummer * dEff * 1e-3;
    var highW = Math.sqrt(Math.pow(c.wc + wm, 2) + Math.pow(windS, 2));

    // 低温季：氷雪＋風圧（氷雪をまとった外径で受ける）
    var ice = c.iceDensity * data.pi * c.iceThickness * (dEff + c.iceThickness) * 1e-3;
    var windW = c.windWinter * (dEff + 2 * c.iceThickness) * 1e-3;
    var lowW = Math.sqrt(Math.pow(c.wc + ice + wm, 2) + Math.pow(windW, 2));

    var w = highW > lowW ? highW : lowW;
    var wl2 = Math.floor(w * c.span * c.span + 1e-9);     // ROUNDDOWN(W×S²,0)
    var tension = wl2 / (8 * c.sag);
    var required = tension * c.safety;

    return {
      wire: wire, dEff: dEff, wm: wm,
      windS: windS, highW: highW,
      ice: ice, windW: windW, lowW: lowW,
      season: highW > lowW ? "高温季" : "低温季",
      w: w, wl2: wl2, tension: tension, required: required
    };
  }

  /* 張力×安全率 を上回る引張荷重をもつ最小のワイヤ（計算表の VLOOKUP 近似一致と同じ選び方） */
  function pickWire(data, required) {
    for (var i = 0; i < data.wires.length; i++) {
      if (data.wires[i].strength > required) return data.wires[i];
    }
    return null;
  }

  function calculate(data, c) {
    var steps = [], wire = null, pick = null;
    for (var p = 0; p < data.passes; p++) {
      var r = loadCase(data, c, wire);
      pick = pickWire(data, r.required);
      r.pick = pick;
      steps.push(r);
      if (!pick) break;
      wire = pick;
    }
    var final = steps[steps.length - 1];

    // 確認：選定したワイヤ込みでもう一度計算し、さらに太いワイヤが必要にならないか
    var check = null;
    if (pick) {
      check = loadCase(data, c, pick);
      check.pick = pickWire(data, check.required);
    }

    // ワイヤごとの確認表（各ワイヤの重量・外径を含めた張力×安全率と、引張荷重の比較）
    var table = data.wires.map(function (wr) {
      var x = loadCase(data, c, wr);
      return { wire: wr, required: x.required, ok: x.required < wr.strength };
    });

    return {
      steps: steps, final: final, pick: pick, check: check, table: table,
      stable: !!(check && check.pick && check.pick.size <= pick.size)
    };
  }

  root.MWCalc = { calculate: calculate, loadCase: loadCase, pickWire: pickWire };
  if (typeof module !== "undefined") module.exports = root.MWCalc;
})(typeof window !== "undefined" ? window : globalThis);
