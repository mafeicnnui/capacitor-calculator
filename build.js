const fs = require('fs');
const path = require('path');

// 创建 dist 目录
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// 复制文件
const filesToCopy = ['index.html', 'style.css', 'calculator.js', 'debug.html'];

filesToCopy.forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(distDir, file);
    
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file} to dist/`);
    } else {
        console.error(`Source file ${file} not found!`);
        process.exit(1);
    }
});

console.log('Build completed successfully!');