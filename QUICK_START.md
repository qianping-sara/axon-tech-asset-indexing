# 🚀 快速启动指南

## 前置条件

- Node.js 18.19.1+ (推荐 20.9.0+)
- npm 10.2.4+
- PostgreSQL 数据库（或 Neon）

## 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
复制 `.env.example` 到 `.env.local` 并填入你的数据库 URL：
```bash
cp .env.example .env.local
```

编辑 `.env.local`：
```env
DATABASE_URL=postgresql://user:password@host:5432/database_name
```

### 3. 初始化数据库
```bash
npm run prisma:migrate
```

### 4. 启动开发服务器
```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run lint:fix` | 自动修复 ESLint 问题 |
| `npm run format` | 格式化代码 |
| `npm run type-check` | TypeScript 类型检查 |
| `npm run prisma:studio` | 打开 Prisma Studio |

## 项目结构

```
src/
├── app/              # Next.js App Router
├── components/       # React 组件
├── lib/              # 工具函数和库
│   ├── db/          # 数据库相关
│   ├── api/         # API 业务逻辑
│   ├── markdown/    # Markdown 处理
│   └── types/       # TypeScript 类型
└── styles/          # 全局样式
```

## 开发工作流

1. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **开发代码**
   ```bash
   npm run dev
   ```

3. **检查代码质量**
   ```bash
   npm run type-check
   npm run lint
   npm run format:check
   ```

4. **修复问题**
   ```bash
   npm run lint:fix
   npm run format
   ```

5. **提交代码**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature
   ```

## 常见问题

### Q: 如何重置数据库？
```bash
npm run prisma:migrate reset
```

### Q: 如何查看数据库内容？
```bash
npm run prisma:studio
```

### Q: 如何生成新的 Prisma Client？
```bash
npm run prisma:generate
```

### Q: 如何修复所有 linting 问题？
```bash
npm run lint:fix && npm run format
```

## 下一步

- 查看 [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) 了解完整的设置信息
- 查看 [../design/](../design/) 了解项目设计文档
- 开始 Task 1.2 - 数据库初始化

---

**需要帮助？** 查看项目根目录的 `design/` 文件夹中的文档。

