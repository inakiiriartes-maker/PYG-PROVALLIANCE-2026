const CACHE_NAME = "pyg-provalliance-v1";
const BASE = "/PYG-PROVALLIANCE-2026";

const ASSETS = [
  BASE + "/",
  BASE + "/index.html",
  BASE + "/dashboard-renting.html",
  BASE + "/pl_bu_2026_comparativa.html",
  BASE + "/manifest.json",
  BASE + "/icon-192.png",
  BASE + "/icon-512.png"
];

// Instalación: cachear todos los assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activación: borrar caches antiguas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache primero, red como fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
