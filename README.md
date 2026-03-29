# John Chen CV — 个人作品集网站

基于 Next.js 15 + Sanity CMS 构建的个人简历与作品集网站，采用极简主义设计语言。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| CMS | Sanity v5 |
| 样式 | Tailwind CSS v4 |
| 动效 | Framer Motion |
| 3D | React Three Fiber + Drei |
| 部署 | Vercel |

---

## 本地开发

### 1. 克隆仓库

```bash
git clone https://github.com/<your-username>/john-chen-cv.git
cd john-chen-cv
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制模板文件并填写你的配置：

```bash
cp .env.example .env.local
```

然后编辑 `.env.local`：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id    # Sanity 项目 ID
NEXT_PUBLIC_SANITY_DATASET=production             # 数据集名称
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-28         # API 版本
SANITY_API_TOKEN=your_token_here                  # 仅用于本地数据导入脚本
```

> ⚠️ **安全须知**
> - `.env.local` 已被 `.gitignore` 忽略，**永远不要提交到 Git**
> - `SANITY_API_TOKEN` 仅用于 `import_resume.mjs` 数据导入脚本，不会暴露到前端
> - 前端只读取 `NEXT_PUBLIC_` 前缀的变量，这些变量是公开的（Sanity Project ID 本身就是公开信息）

### 4. 获取 Sanity 配置

1. 访问 [sanity.io/manage](https://sanity.io/manage)
2. 找到你的项目，复制 **Project ID**
3. 在 **API → Tokens** 页面生成一个 **Editor** 权限的 Token（用于数据导入）

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

Sanity Studio 地址：[http://localhost:3000/studio](http://localhost:3000/studio)

### 6. 导入简历数据（可选）

```bash
node import_resume.mjs
```

> 需要 `.env.local` 中配置 `SANITY_API_TOKEN`

---

## 部署

### Vercel 自动部署（推荐）

本项目已配置 GitHub Actions 自动部署流水线：

- **Push to `main`** → 自动部署到 Vercel **生产环境**
- **Pull Request** → 自动创建 Vercel **预览环境**

#### 首次配置步骤

**Step 1：在 Vercel 创建项目**

1. 访问 [vercel.com/new](https://vercel.com/new)，导入此仓库
2. 在 Vercel 项目设置的 **Environment Variables** 中添加：
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`

**Step 2：获取 Vercel 凭据**

```bash
npm i -g vercel
vercel login
vercel link  # 在项目目录下执行，获取 org-id 和 project-id
```

**Step 3：在 GitHub 配置 Secrets**

进入仓库 **Settings → Secrets and variables → Actions**，添加以下 Secrets：

| Secret 名称 | 获取方式 |
|------------|---------|
| `VERCEL_TOKEN` | Vercel Dashboard → Settings → Tokens |
| `VERCEL_ORG_ID` | `vercel link` 后查看 `.vercel/project.json` 中的 `orgId` |
| `VERCEL_PROJECT_ID` | `vercel link` 后查看 `.vercel/project.json` 中的 `projectId` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity 控制台 |
| `NEXT_PUBLIC_SANITY_DATASET` | 通常为 `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | 通常为 `2024-03-28` |

配置完成后，每次推送到 `main` 分支将自动触发部署。

---

## 项目结构

```
.
├── src/
│   ├── app/            # Next.js App Router 页面
│   ├── components/     # React 组件
│   └── lib/            # 工具库（Sanity 客户端等）
├── sanity/
│   └── schemas/        # Sanity 数据模型
├── public/             # 静态资源
├── import_resume.mjs   # 数据导入脚本（需配置 SANITY_API_TOKEN）
├── .env.example        # 环境变量模板（可安全提交到 Git）
└── .github/
    └── workflows/
        └── deploy.yml  # CI/CD 部署流水线
```

---

## 环境变量说明

| 变量名 | 用途 | 前端可见 | 必须 |
|--------|------|---------|------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity 项目标识符 | ✅ 是 | ✅ |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity 数据集名称 | ✅ 是 | ✅ |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API 版本 | ✅ 是 | ✅ |
| `SANITY_API_TOKEN` | 数据导入脚本鉴权 | ❌ 否（服务端/本地） | 仅导入时需要 |
