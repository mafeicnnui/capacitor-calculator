# 🎛️ 构建控制说明

## 📋 构建触发方式

为了避免每次推送都触发构建，现在只在以下情况下自动构建 APK：

### 1. 手动触发（推荐）
- 访问 GitHub Actions 页面
- 点击 "Build Android APK" 工作流
- 点击 "Run workflow" 按钮
- 选择分支并点击 "Run workflow"

### 2. 推送到 release 分支
```bash
# 创建 release 分支并推送
git checkout -b release
git push origin release
```

### 3. 创建版本标签
```bash
# 创建并推送标签
git tag v1.0.0
git push origin v1.0.0
```

## 🚀 推荐的开发流程

### 日常开发
```bash
# 正常开发和推送到 main 分支
git add .
git commit -m "功能更新"
git push origin main
# ✅ 不会触发构建
```

### 需要构建 APK 时
有两种方式：

#### 方式一：手动触发（最简单）
1. 访问 https://github.com/mafeicnnui/capacitor-calculator/actions
2. 点击 "Build Android APK"
3. 点击 "Run workflow"
4. 等待构建完成

#### 方式二：创建 release
```bash
# 当功能完成，需要发布时
git checkout -b release
git push origin release
# ✅ 自动触发构建
```

## 📦 版本管理

### 创建正式版本
```bash
# 为重要版本创建标签
git tag v1.0.0 -m "第一个正式版本"
git push origin v1.0.0
# ✅ 自动触发构建并标记版本
```

### 版本号规范
- `v1.0.0` - 主要版本
- `v1.1.0` - 功能更新
- `v1.1.1` - 错误修复

## 🎯 优势

### ✅ 节省资源
- 不会因为文档更新触发构建
- 减少 GitHub Actions 使用时间
- 避免不必要的构建队列

### ✅ 更好的控制
- 只在需要时构建
- 可以选择构建时机
- 便于版本管理

### ✅ 清晰的构建历史
- 每个构建都有明确目的
- 便于追踪版本变化
- 减少混乱

## 🔧 立即构建当前版本

如果你现在就想构建最新版本：

1. **访问**: https://github.com/mafeicnnui/capacitor-calculator/actions
2. **点击**: "Build Android APK" 工作流
3. **点击**: "Run workflow" 按钮
4. **选择**: main 分支
5. **点击**: 绿色的 "Run workflow" 按钮
6. **等待**: 5-10 分钟构建完成
7. **下载**: 生成的 APK 文件

这样就可以获得包含所有最新修复的 APK 了！