# APK 构建详细指南

## 环境准备

### 1. 安装 Android Studio

1. 下载 [Android Studio](https://developer.android.com/studio)
2. 安装时选择 "Standard" 安装类型
3. 确保安装了 Android SDK 和 Android Virtual Device

### 2. 配置环境变量

Windows 系统：
```cmd
# 添加到系统环境变量
ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT=C:\Users\YourName\AppData\Local\Android\Sdk

# 添加到 PATH
%ANDROID_HOME%\tools
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\cmdline-tools\latest\bin
```

### 3. 验证安装

```bash
# 检查 Android SDK
adb version

# 检查 Java 版本（需要 Java 11）
java -version
```

## 构建步骤

### 第一次构建

```bash
# 1. 安装项目依赖
cd capacitor-calculator
npm install

# 2. 安装 Capacitor CLI（如果没有）
npm install -g @capacitor/cli

# 3. 添加 Android 平台
npx cap add android

# 4. 同步代码到 Android
npx cap sync android

# 5. 打开 Android Studio
npx cap open android
```

### 在 Android Studio 中构建

1. **等待项目加载完成**
   - 首次打开会下载 Gradle 和依赖
   - 等待 "Gradle sync finished" 提示

2. **构建 Debug APK**
   - 点击菜单 `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - 等待构建完成
   - 点击通知中的 "locate" 查看 APK 位置

3. **构建 Release APK**
   - 点击菜单 `Build` → `Generate Signed Bundle / APK...`
   - 选择 `APK`
   - 创建或选择签名密钥
   - 选择 `release` 构建类型
   - 点击 `Finish`

### 命令行构建（高级）

```bash
# 进入 android 目录
cd android

# Windows
gradlew.bat assembleDebug

# macOS/Linux  
./gradlew assembleDebug

# 构建 release（需要签名配置）
./gradlew assembleRelease
```

## APK 位置

构建完成后，APK 文件位于：

```
android/app/build/outputs/apk/
├── debug/
│   └── app-debug.apk          # Debug 版本
└── release/
    └── app-release.apk        # Release 版本
```

## 安装测试

### 通过 ADB 安装

```bash
# 连接设备并启用 USB 调试
adb devices

# 安装 APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# 卸载应用
adb uninstall com.example.calculator
```

### 直接安装

1. 将 APK 文件传输到 Android 设备
2. 在设备上启用 "未知来源" 安装
3. 点击 APK 文件进行安装

## 签名配置（发布用）

### 1. 生成签名密钥

```bash
keytool -genkey -v -keystore calculator-release.keystore -alias calculator -keyalg RSA -keysize 2048 -validity 10000
```

### 2. 配置签名

编辑 `android/app/build.gradle`：

```gradle
android {
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 3. 创建签名配置文件

创建 `android/gradle.properties`：

```properties
MYAPP_RELEASE_STORE_FILE=calculator-release.keystore
MYAPP_RELEASE_KEY_ALIAS=calculator
MYAPP_RELEASE_STORE_PASSWORD=your_password
MYAPP_RELEASE_KEY_PASSWORD=your_password
```

## 常见问题解决

### 问题 1: Gradle 同步失败
```bash
# 清理项目
cd android
./gradlew clean

# 重新同步
npx cap sync android
```

### 问题 2: SDK 版本问题
编辑 `android/app/build.gradle`：
```gradle
android {
    compileSdkVersion 34
    defaultConfig {
        minSdkVersion 22
        targetSdkVersion 34
    }
}
```

### 问题 3: Java 版本不兼容
确保使用 Java 11：
```bash
# 检查版本
java -version

# 如果不是 Java 11，需要安装并设置 JAVA_HOME
```

### 问题 4: 构建缓存问题
```bash
# 清理 Gradle 缓存
cd android
./gradlew clean
./gradlew --stop

# 删除 .gradle 目录
rm -rf .gradle
```

## 优化建议

### 1. 减小 APK 大小
```gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
        }
    }
}
```

### 2. 启用 ProGuard
```gradle
buildTypes {
    release {
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### 3. 分包构建
```gradle
android {
    splits {
        abi {
            enable true
            reset()
            include "x86", "armeabi-v7a", "arm64-v8a"
            universalApk false
        }
    }
}
```

## 自动化构建

### GitHub Actions 示例

```yaml
name: Build Android APK

on:
  push:
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
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
      
    - name: Add Android platform
      run: npx cap add android
      
    - name: Sync to Android
      run: npx cap sync android
      
    - name: Build APK
      run: |
        cd android
        ./gradlew assembleDebug
        
    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: calculator-apk
        path: android/app/build/outputs/apk/debug/app-debug.apk
```