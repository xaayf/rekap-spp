// Build: Tailwind -> dist/app.css, bundle ikon, salin html & aset PWA
const { execSync } = require('child_process');
const fs = require('fs');
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist', { recursive: true });
execSync('npx tailwindcss -c tailwind.config.js -i src/input.css -o dist/app.css --minify', { stdio: 'inherit' });
execSync('npx esbuild src/icons.js --bundle --minify --format=iife --outfile=dist/icons.js', { stdio: 'inherit' });
fs.cpSync('public', 'dist', { recursive: true });
// ID build unik per rilis (commit Cloudflare kalau ada, kalau tidak waktu build)
const BUILD = (process.env.WORKERS_CI_COMMIT_SHA || '').slice(0, 7) || Date.now().toString(36);
for (const [src, dest] of [['src/index.src.html', 'dist/index.html'], ['public/sw.js', 'dist/sw.js']]) {
  fs.writeFileSync(dest, fs.readFileSync(src, 'utf8').split('__BUILD__').join(BUILD));
}
console.log('Build id:', BUILD);
console.log('Build OK -> dist/');
