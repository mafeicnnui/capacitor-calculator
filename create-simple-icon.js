// 创建一个简单的图标占位符
const fs = require('fs');
const path = require('path');

// 创建一个简单的 base64 编码的 PNG 图标
const simpleIconBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGA60e6kgAAAABJRU5ErkJggg==';

const iconSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

// 创建图标目录和占位符文件
Object.keys(iconSizes).forEach(density => {
  const dir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', density);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // 创建占位符图标文件
  const iconPath = path.join(dir, 'ic_launcher.png');
  const iconBuffer = Buffer.from(simpleIconBase64, 'base64');
  fs.writeFileSync(iconPath, iconBuffer);
  
  console.log(`Created icon: ${iconPath}`);
});

console.log('Simple icons created successfully!');