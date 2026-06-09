// File: sw.js
const CACHE_NAME = 'karaoke-key-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon_192.png',
  'icon_512.png'
];

// インストール時に静的資産をキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

// 古いキャッシュのクリーンアップ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// フェッチ要求時にキャッシュがあれば返し、なければネットワークへ
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});