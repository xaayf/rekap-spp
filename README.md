# Rekap SPP (PWA)

Rekap pembayaran SPP — iPhone PWA, data di localStorage perangkat.

## Dev
    npm install
    npm run build      # hasil di dist/
    npm run dev        # wrangler dev

## Deploy (Cloudflare Workers Builds, dari GitHub)
- Build command: `npm install && npm run build`
- Deploy command: `npx wrangler deploy`
- Config: wrangler.jsonc (assets dari ./dist)

## Rilis baru
Naikkan `VERSION` di public/sw.js supaya cache lama dibuang.

## Catatan
- Data tiap perangkat terpisah (localStorage), tidak sinkron antar HP.
- Hapus data situs = data SPP hilang. Rutin Ekspor CSV di tab Riwayat.

## Pembaruan & Cetak
- Tiap deploy membawa ID build baru. App yang sudah terpasang menampilkan banner "Pembaruan tersedia"; tekan Perbarui (tidak perlu hapus/pasang ulang, data tetap).
- Cetak Bluetooth (ESC/POS) memakai Web Bluetooth: jalan di Chrome Android, Bluefy (iPhone), desktop Chrome. Safari/Chrome iPhone belum mendukung -> pakai tombol Bagikan (gambar struk) ke aplikasi printer.
