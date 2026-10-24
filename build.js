// Build: Tailwind -> dist/app.css, bundle ikon, salin html & aset PWA
const { execSync } = require('child_process');
const fs = require('fs');
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist', { recursive: true });
execSync('npx tailwindcss -c tailwind.config.js -i src/input.css -o dist/app.css --minify', { stdio: 'inherit' });
execSync('npx esbuild src/icons.js --bundle --minify --format=iife --outfile=dist/icons.js', { stdio: 'inherit' });
fs.copyFileSync('src/index.src.html', 'dist/index.html');
fs.cpSync('public', 'dist', { recursive: true });
console.log('Build OK -> dist/');
