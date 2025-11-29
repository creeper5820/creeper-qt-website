# Cloudflare Pages 部署配置

## 已修复的问题

✅ `package-lock.json` 已更新，与 `package.json` 同步

## Cloudflare Pages 构建设置

在 Cloudflare Pages 控制台中，使用以下设置：

### 基本设置

- **框架预设**: `Next.js (Static HTML Export)` 或 `Next.js (Cloudflare)`
- **构建命令**: `npm run build`
- **构建输出目录**: `.next`
- **Node.js 版本**: `22` 或 `18`
- **根目录**: `/`（默认）

### 详细步骤

1. 在 Cloudflare Pages 控制台中创建新项目
2. 连接到你的 GitHub 仓库 `creeper5820/creeper-qt`
3. 配置构建设置：
   - **Framework preset**: `Next.js (Cloudflare)` 或 `Next.js`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Node version**: `22.16.0` 或更高

### 环境变量（如需要）

如果需要在构建时使用环境变量，可以在 Cloudflare Pages 设置中添加。

### 注意事项

- 确保 `package-lock.json` 已提交到仓库
- Cloudflare Pages 使用 `npm ci` 安装依赖，这要求 `package.json` 和 `package-lock.json` 完全同步
- 如果使用 Next.js 16，Cloudflare Pages 会自动检测并适配

## 如果构建仍然失败

如果仍然遇到问题，可以尝试：

1. 清除 Cloudflare Pages 的构建缓存
2. 确保 Node.js 版本设置为 22
3. 检查构建日志中的具体错误信息

