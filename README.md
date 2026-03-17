# Capacitor Calculator

一个使用 Capacitor 框架开发的移动端计算器应用，支持 Android 和 iOS 平台。

## 功能特性

- ✅ 基本四则运算（加、减、乘、除）
- ✅ 移动端优化界面
- ✅ 触摸反馈和震动
- ✅ 响应式设计（支持横竖屏）
- ✅ 防止意外缩放和滚动
- ✅ 原生 Android APK 打包
- ✅ 原生 iOS APP 打包

## 环境要求

### 基础环境
- Node.js 16+
- npm 或 yarn

### Android 开发环境
- Android Studio
- Android SDK (API 22+)
- Java 11+

### iOS 开发环境（可选）
- macOS 系统
- Xcode 14+
- iOS SDK

## 快速开始

### 1. 安装依赖

```bash
cd capacitor-calculator
npm install
```

### 2. 添加平台

```bash
# 添加 Android 平台
npm run add:android

# 添加 iOS 平台（仅 macOS）
npm run add:ios
```

### 3. 同步代码到原生平台

```bash
# 同步到 Android
npm run sync:android

# 同步到 iOS
npm run sync:ios

# 同步到所有平台
npm run sync
```

### 4. 打开原生 IDE

```bash
# 打开 Android Studio
npm run open:android

# 打开 Xcode（仅 macOS）
npm run open:ios
```

## 构建 APK

### 方法一：通过 Android Studio（推荐）

1. 运行 `npm run open:android`
2. 在 Android Studio 中：
   - 点击 `Build` → `Generate Signed Bundle / APK`
   - 选择 `APK`
   - 选择 `debug` 或 `release`
   - 点击 `Finish`

### 方法二：命令行构建

```bash
# 进入 android 目录
cd android

# 构建 debug APK
./gradlew assembleDebug

# 构建 release APK（需要签名）
./gradlew assembleRelease
```

生成的 APK 位置：
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release.apk`

## 项目结构

```
capacitor-calculator/
├── index.html              # 主页面
├── style.css              # 移动端优化样式
├── calculator.js          # 计算器逻辑（含触摸优化）
├── capacitor.config.ts    # Capacitor 配置
├── package.json           # 项目配置
├── android/               # Android 原生代码（自动生成）
├── ios/                   # iOS 原生代码（自动生成）
└── README.md             # 说明文档
```

## 移动端优化特性

### 触摸优化
- 触摸反馈动画
- 震动反馈（如果设备支持）
- 防止意外双击缩放
- 防止页面滚动

### 响应式设计
- 适配不同屏幕尺寸
- 横竖屏自动适配
- 小屏设备优化

### 性能优化
- 防止输入溢出
- 错误处理和提示
- 内存优化

## 开发调试

### 在浏览器中预览
```bash
npm run serve
# 访问 http://localhost:3000
```

### 在设备上调试
1. 启用 USB 调试
2. 连接设备到电脑
3. 在 Android Studio 中点击 `Run`

### 查看日志
```bash
# Android 日志
adb logcat

# 或在 Chrome 中访问
chrome://inspect/#devices
```

## 发布准备

### Android 签名配置

1. 生成签名密钥：
```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. 配置 `android/app/build.gradle`：
```gradle
android {
    signingConfigs {
        release {
            storeFile file('my-release-key.keystore')
            storePassword 'your-password'
            keyAlias 'my-key-alias'
            keyPassword 'your-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### 应用图标

将图标文件放置在：
- `android/app/src/main/res/mipmap-*/ic_launcher.png`
- `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

## 常见问题

### Q: Android Studio 找不到 SDK
A: 在 Android Studio 中设置 SDK 路径：`File` → `Settings` → `Android SDK`

### Q: 构建失败提示 Java 版本问题
A: 确保使用 Java 11，设置 `JAVA_HOME` 环境变量

### Q: APK 安装失败
A: 检查设备是否允许安装未知来源应用

### Q: 应用在设备上显示异常
A: 检查 `capacitor.config.ts` 中的配置，确保 `webDir` 指向正确目录

## 许可证

MIT License