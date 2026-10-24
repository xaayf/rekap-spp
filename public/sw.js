// Service worker Rekap SPP.
// - Halaman: tampil dari cache dulu (instan), update di belakang layar.
// - Aset: cache-first. Respons redirect TIDAK pernah disimpan/disajikan.
// Naikkan VERSION tiap rilis supaya cache lama dibuang.
const VERSION = 'rekap-spp-v2';
const ASSETS = ['/', '/app.css', '/icons.js', '/manifest.webmanifest',
  '/icons/icon-192.png', '/icons/icon-512.png', '/icons/apple-touch-icon.png', '/icons/favicon-32.png'];

// Salin respons tanpa flag "redirected" (browser menolak redirected response untuk navigasi)
async function clean(res) {
  if (!res.redirected) return res;
  const body = await res.blob();
  return new Response(body, { status: res.status, statusText: res.statusText, headers: res.headers });
}

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await Promise.all(ASSETS.map(async u => {
      try {
        const r = await fetch(u, { cache: 'reload' });
        if (r.ok) await c.put(u, await clean(r));
      } catch (_) {}
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const cached = await cache.match('/');
      const refresh = fetch('/', { cache: 'no-cache' })
        .then(async r => { if (r.ok) await cache.put('/', await clean(r)); return r; })
        .catch(() => null);
      if (cached) { e.waitUntil(refresh); return cached; }
      const r = await refresh;
      return r ? clean(r) : new Response('Offline', { status: 503 });
    })());
    return;
  }

  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const hit = await cache.match(req);
    if (hit) return hit;
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  })());
});
