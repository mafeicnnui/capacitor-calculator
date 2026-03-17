# Android Studio 安装指南

## 为什么需要 Android Studio？

- **Android SDK**: 提供 Android 开发工具包
- **Gradle**: Android 项目构建工具
- **ADB**: Android 调试桥，用于设备通信
- **模拟器**: 测试应用的虚拟设备
- **签名工具**: 生成发布版 APK

## 安装步骤

### 1. 下载 Android Studio

访问官网：https://developer.android.com/studio

选择适合 Windows 的版本下载（约 1GB）

### 2. 安装 Android Studio

1. 运行下载的安装程序
2. 选择 "Standard" 安装类型
3. 等待下载 Android SDK 组件（约 3-4GB）
4. 完成安装

### 3. 首次启动配置

1. 启动 Android Studio
2. 选择 "Do not import settings"
3. 按照向导完成初始设置：
   - 选择 UI 主题
   - 选择 SDK 组件（保持默认）
   - 等待下载完成

### 4. 验证安装

打开 Android Studio，创建新项目验证是否正常工作。

## 环境变量配置

安装完成后，需要配置环境变量：

### Windows 系统

1. 打开 "系统属性" → "高级" → "环境变量"

2. 添加系统变量：
```
变量名: ANDROID_HOME
变量值: C:\Users\你的用户名\AppData\Local\Android\Sdk
```

3. 编辑 PATH 变量，添加：
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\cmdline-tools\latest\bin
```

### 验证环境变量

重新打开命令行，运行：
```bash
adb version
# 应该显示 Android Debug Bridge version
```

## 安装后的构建流程

```bash
# 1. 回到项目目录
cd capacitor-calculator

# 2. 添加 Android 平台
npx cap add android

# 3. 同步代码
npx cap sync android

# 4. 打开 Android Studio
npx cap open android

# 5. 在 Android Studio 中构建 APK
# Build → Build Bundle(s) / APK(s) → Build APK(s)
```

## 预计时间

- 下载：10-30 分钟（取决于网速）
- 安装：5-10 分钟
- 首次启动配置：10-20 分钟
- 总计：约 30-60 分钟