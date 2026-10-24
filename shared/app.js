/* 現場ツール箱 — 共通処理 */
window.APP = {
  name: "現場ツール箱",
  version: "0.4.4",

  /* 入力値の保存・読込（使えない環境でも動くように例外は握りつぶす） */
  load(key, fallback) {
    try { const v = localStorage.getItem("genba:" + key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  },
  save(key, value) {
    try { localStorage.setItem("genba:" + key, JSON.stringify(value)); } catch (e) {}
  },

  /* 数値表示 */
  fmt(n, digits) {
    if (!isFinite(n)) return "—";
    return n.toLocaleString("ja-JP", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }
};

/* オフライン用の仕組み（Service Worker）を登録。
   ファイルを直接開いた場合やプレビュー環境では登録できないが、そのまま動く。 */
(function registerSW() {
  try {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol !== "https:" && location.hostname !== "localhost") return;
    const root = document.querySelector('meta[name="app-root"]');
    const base = root ? root.content : "./";
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(base + "sw.js", { scope: base }).catch(function () {});
    });
  } catch (e) {}
})();

/* 版数表示 */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-app-version]").forEach(function (el) { el.textContent = "v" + APP.version; });
});
