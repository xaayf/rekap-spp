// Service worker Rekap SPP.
// BUILD diisi otomatis saat build -> sw.js berubah tiap rilis -> browser mendeteksi pembaruan.
// Versi baru menunggu (waiting) sampai pengguna menekan "Perbarui" di app.
const BUILD = '__BUILD__';
const VERSION = 'rekap-spp-' + BUILD;
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
    // tidak skipWaiting: tunggu pengguna menekan tombol Perbarui
  })());
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
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

  // Semua dari cache versi ini (HTML + aset selalu satu versi). Jaringan hanya cadangan.
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const key = req.mode === 'navigate' ? '/' : req;
    const hit = await cache.match(key);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res.ok && req.mode !== 'navigate') cache.put(req, res.clone());
      return req.mode === 'navigate' ? clean(res) : res;
    } catch (_) {
      return new Response('Offline', { status: 503 });
    }
  })());
});
