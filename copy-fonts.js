const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'src', 'fonts', 'Roboto-Regular.ttf');
const dest = path.join(__dirname, 'dist', 'fonts', 'Roboto-Regular.ttf');

// Создаем папку, если она не существует
if (!fs.existsSync(path.dirname(dest))) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
}

// Копируем файл
fs.copyFileSync(src, dest);
