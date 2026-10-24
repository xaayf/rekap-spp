// Build: Tailwind -> dist/app.css, salin html, lucide, aset PWA
const { execSync } = require('child_process');
const fs = require('fs');
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist', { recursive: true });
execSync('npx tailwindcss -c tailwind.config.js -i src/input.css -o dist/app.css --minify', { stdio: 'inherit' });
fs.copyFileSync('src/index.src.html', 'dist/index.html');
fs.copyFileSync('node_modules/lucide/dist/umd/lucide.min.js', 'dist/lucide.min.js');
fs.cpSync('public', 'dist', { recursive: true });
console.log('Build OK -> dist/');
