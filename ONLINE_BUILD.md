# 在线构建 APK（无需本地安装）

如果不想在本地安装 Android 开发环境，可以使用在线构建服务。

## GitHub Actions 自动构建

### 1. 创建 GitHub 仓库

1. 将项目上传到 GitHub
2. 创建 `.github/workflows/build-android.yml`

### 2. 配置自动构建

```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Setup Java
      uses: actions/setup-java@v3
      with:
        distribution: 'temurin'
        java-version: '11'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build web assets
      run: |
        mkdir -p dist
        cp index.html dist/
        cp style.css dist/
        cp calculator.js dist/
        
    - name: Add Android platform
      run: npx cap add android
      
    - name: Sync to Android
      run: npx cap sync android
      
    - name: Build Debug APK
      run: |
        cd android
        chmod +x gradlew
        ./gradlew assembleDebug
        
    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: calculator-debug-apk
        path: android/app/build/outputs/apk/debug/app-debug.apk
```

### 3. 触发构建

1. 推送代码到 GitHub
2. 在 Actions 页面查看构建进度
3. 构建完成后下载 APK

## 其他在线构建服务

### 1. Ionic Appflow
- 官方 Capacitor 构建服务
- 免费额度有限
- 网址：https://ionic.io/appflow

### 2. Codemagic
- 支持 Capacitor 项目
- 每月免费构建时间
- 网址：https://codemagic.io

### 3. Bitrise
- 移动应用 CI/CD 平台
- 免费计划可用
- 网址：https://www.bitrise.io

## 使用 GitHub Actions 的优势

- ✅ 完全免费
- ✅ 无需本地安装任何工具
- ✅ 自动化构建
- ✅ 支持多平台构建
- ✅ 构建历史记录
- ✅ 可以同时构建 Android 和 iOS

## 立即尝试 GitHub Actions

1. 创建 GitHub 账号（如果没有）
2. 创建新仓库
3. 上传你的 Capacitor 项目
4. 添加上面的 workflow 文件
5. 推送代码，等待自动构建完成
6. 下载生成的 APK 文件