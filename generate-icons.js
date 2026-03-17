const fs = require('fs');
const path = require('path');

// 创建一个简单的 PNG 图标（使用 Canvas 或者提供 base64 数据）
// 由于我们在 Node.js 环境中，我们创建一个简单的图标配置

const iconSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

// 创建 Android 图标目录结构
function createIconDirectories() {
  const androidResPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');
  
  // 确保目录存在
  if (!fs.existsSync(androidResPath)) {
    fs.mkdirSync(androidResPath, { recursive: true });
  }
  
  // 为每个密度创建目录
  Object.keys(iconSizes).forEach(density => {
    const dir = path.join(androidResPath, density);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  console.log('Icon directories created successfully!');
  
  // 创建图标说明文件
  const iconInfo = `
# 图标文件说明

## 自动生成的图标尺寸

${Object.entries(iconSizes).map(([density, size]) => 
  `- ${density}: ${size}x${size}px`
).join('\n')}

## 手动替换图标

1. 准备一个 512x512 的高质量 PNG 图标
2. 使用在线工具生成不同尺寸：
   - https://icon.kitchen/
   - https://romannurik.github.io/AndroidAssetStudio/
3. 将生成的图标文件放入对应目录：
   - android/app/src/main/res/mipmap-*/ic_launcher.png

## 当前图标

使用了计算器主题的图标，包含：
- 深色外壳背景
- 绿色 LED 显示屏
- 彩色按钮布局
- 真实计算器外观
`;

  fs.writeFileSync(path.join(__dirname, 'ICON_INFO.md'), iconInfo);
  console.log('Icon info documentation created!');
}

// 创建一个简单的图标占位符（实际项目中应该使用真实的图标文件）
function createPlaceholderIcon() {
  // 这里我们创建一个说明文件，指导如何添加真实图标
  const placeholderInfo = `
请将以下文件添加到项目中：

1. 高质量源图标 (512x512 PNG):
   resources/icon-512.png

2. 或者使用在线工具生成 Android 图标包：
   - 访问 https://icon.kitchen/
   - 上传你的 512x512 图标
   - 选择 "Android" 平台
   - 下载生成的图标包
   - 解压到 android/app/src/main/res/ 目录

3. 确保以下文件存在：
   - android/app/src/main/res/mipmap-mdpi/ic_launcher.png (48x48)
   - android/app/src/main/res/mipmap-hdpi/ic_launcher.png (72x72)
   - android/app/src/main/res/mipmap-xhdpi/ic_launcher.png (96x96)
   - android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png (144x144)
   - android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png (192x192)
`;

  const resourcesDir = path.join(__dirname, 'resources');
  if (!fs.existsSync(resourcesDir)) {
    fs.mkdirSync(resourcesDir);
  }
  
  fs.writeFileSync(path.join(resourcesDir, 'ICON_SETUP.md'), placeholderInfo);
  console.log('Icon setup guide created!');
}

// 执行图标生成
createIconDirectories();
createPlaceholderIcon();

console.log('Icon generation complete! Please add your icon files manually or use the online tools mentioned in ICON_INFO.md');