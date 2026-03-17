# 仅安装 Android SDK 构建 APK

如果不想安装完整的 Android Studio，可以只安装 Android SDK 命令行工具。

## 下载 Android SDK 命令行工具

1. 访问：https://developer.android.com/studio#command-tools
2. 下载 "Command line tools only"
3. 解压到 `C:\android-sdk`

## 安装必要组件

```bash
# 设置环境变量
set ANDROID_HOME=C:\android-sdk
set PATH=%PATH%;%ANDROID_HOME%\cmdline-tools\latest\bin;%ANDROID_HOME%\platform-tools

# 安装必要的 SDK 组件
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"

# 接受许可协议
sdkmanager --licenses
```

## 构建 APK

```bash
# 添加 Android 平台
npx cap add android

# 同步代码
npx cap sync android

# 进入 android 目录构建
cd android
gradlew.bat assembleDebug
```

## 优缺点对比

### 仅 SDK 方式
- ✅ 占用空间小（约 500MB）
- ✅ 下载快
- ❌ 没有图形界面
- ❌ 调试困难
- ❌ 需要命令行操作

### 完整 Android Studio
- ✅ 图形界面友好
- ✅ 调试功能强大
- ✅ 一键构建
- ❌ 占用空间大（约 4GB）
- ❌ 下载时间长