const fs = require('fs');
const path = require('path');

const srcDir = process.cwd();
const destDir = path.join(srcDir, 'public', 'popcorn');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
let count = 0;
for (const file of files) {
    if (file.startsWith('popcorn_') && file.endsWith('.jpg')) {
        fs.renameSync(path.join(srcDir, file), path.join(destDir, file));
        count++;
    }
}
console.log(`Moved ${count} files.`);