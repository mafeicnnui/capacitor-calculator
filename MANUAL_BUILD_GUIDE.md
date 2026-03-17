# 🎯 手动构建指南

## 📍 当前状态
从截图看，工作流配置已生效，现在不会自动构建了。

## 🔍 找到 "Run workflow" 按钮的步骤

### 1. 点击工作流名称
在左侧 "All workflows" 下面，点击：
```
.github/workflows/build-android.yml
```

### 2. 查看工作流详情
点击后会进入工作流详情页面，在右上角会看到 "Run workflow" 按钮

### 3. 触发构建
- 点击 "Run workflow" 
- 选择分支（通常是 main）
- 点击绿色的 "Run workflow" 按钮

## 🚀 替代方案：创建 release 分支

如果找不到按钮，可以用这种方式触发构建：

```bash
git checkout -b release
git push origin release
```

这会自动触发构建。

## 📱 或者恢复自动构建

如果你希望每次推送都构建，我可以改回去。