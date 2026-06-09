// Service Worker mínimo para habilitar PWA no Android
// Coloque este arquivo na raiz do site: /sw.js

const CACHE_NAME = 'fisioneurologica-v1';
const URLS_PARA_CACHE = [
  '/',
  '/style.css',
  '/script.js',
  '/assets/logo-fisioneurologica2.svg',
  '/assets/logo-site-mobile2.svg',
  '/assets/whatsapp-logo-2.svg',
  '/assets/favicon_512x512.png'
];

// Instala e faz cache dos recursos principais
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS_PARA_CACHE);
    })
  );
});

// Serve do cache quando offline, busca da rede quando online
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

// Remove caches antigos quando atualiza
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (name) { return name !== CACHE_NAME; })
          .map(function (name) { return caches.delete(name); })
      );
    })
  );
});