# GitHub 推送指南

## 当前状态

项目已经初始化并准备推送到：
`https://github.com/mafeicnnui/capacitor-calculator.git`

## 推送步骤

### 方法一：使用 GitHub Desktop（推荐）

1. 下载安装 [GitHub Desktop](https://desktop.github.com/)
2. 登录你的 GitHub 账号
3. 选择 "Add an Existing Repository from your Hard Drive"
4. 选择项目目录：`capacitor-calculator`
5. 点击 "Publish repository"

### 方法二：配置 Git 凭据

如果你想继续使用命令行：

#### 1. 配置 Git 用户信息
```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"
```

#### 2. 使用 Personal Access Token

由于 GitHub 不再支持密码认证，需要使用 Personal Access Token：

1. 访问 GitHub Settings → Developer settings → Personal access tokens
2. 生成新的 token，选择 `repo` 权限
3. 复制生成的 token

#### 3. 推送时使用 token
```bash
git push -u origin main
# 用户名：你的GitHub用户名
# 密码：刚才生成的Personal Access Token
```

### 方法三：使用 SSH（高级）

1. 生成 SSH 密钥：
```bash
ssh-keygen -t ed25519 -C "你的邮箱"
```

2. 添加公钥到 GitHub
3. 修改远程地址：
```bash
git remote set-url origin git@github.com:mafeicnnui/capacitor-calculator.git
git push -u origin main
```

## 推送成功后

一旦推送成功，GitHub Actions 将自动开始构建 APK：

1. 访问仓库页面
2. 点击 "Actions" 标签
3. 查看构建进度
4. 构建完成后下载 APK 文件

## 预期的构建结果

- **Debug APK**: 用于测试的版本
- **Release APK**: 用于发布的版本（未签名）

构建时间约 5-10 分钟。

## 如果推送仍然失败

请确保：
1. GitHub 仓库已创建且为空
2. 你有该仓库的写入权限
3. 网络连接正常
4. Git 凭据配置正确

## 手动上传方式

如果命令行推送困难，也可以：
1. 将项目文件打包为 ZIP
2. 在 GitHub 网页上传文件
3. 这样也会触发自动构建