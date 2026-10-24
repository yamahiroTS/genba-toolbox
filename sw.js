/* オフライン対応（Service Worker）
   ファイルを修正・追加したら CACHE_NAME の版数を上げてください。
   スマホ側は次回起動時に新しいファイルを取り込みます。 */
const CACHE_NAME = "genba-toolbox-v0.4.2";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./shared/app.css",
  "./shared/app.js",
  "./shared/tools.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./tools/voltage-drop/index.html",
  "./tools/fiber-loss/index.html",
  "./data/voltage-drop-data.js",
  "./tools/messenger-wire/index.html",
  "./tools/messenger-wire/calc.js",
  "./data/messenger-data.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith("genba-toolbox-") && k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* 自分のファイルはキャッシュ優先（電波なしでも起動）、フォントは取れたら保存 */
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== location.origin && !isFont) return;

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      const net = fetch(req).then((res) => {
        if (res && (res.ok || res.type === "opaque")) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
