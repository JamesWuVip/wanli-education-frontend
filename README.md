# 万里教育平台 - 前端项目

基于 Vue 3 + TypeScript + Vite 构建的现代化教育管理平台前端应用。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **UI框架**: Tailwind CSS
- **HTTP客户端**: Axios
- **表单验证**: VeeValidate
- **图标**: Heroicons + Lucide Vue

## 项目结构

```
src/
├── api/                # API请求服务层
│   ├── modules/        # 按业务模块划分
│   └── index.ts        # Axios实例配置与拦截器
├── assets/             # 静态资源
├── components/         # 全局通用组件
│   ├── common/         # 基础原子组件
│   └── layout/         # 布局组件
├── composables/        # Vue Composition API 可复用逻辑
├── router/             # 路由配置
├── store/              # 全局状态管理 (Pinia)
│   └── modules/        # 按业务模块划分
├── types/              # 全局TypeScript类型定义
│   └── api/            # API请求/响应的类型
├── utils/              # 通用工具函数
├── views/              # 页面级组件
├── App.vue             # 根组件
└── main.ts             # 应用入口
```

## 开发环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

## 安装与运行

### 1. 克隆项目

```bash
git clone https://github.com/JamesWuVip/wanli-education-frontend.git
cd wanli-education-frontend
```

### 2. 安装依赖

```bash
npm install
# 或
yarn install
```

### 3. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

### 4. 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 5. 预览生产版本

```bash
npm run preview
# 或
yarn preview
```

## 开发规范

### 代码风格

- 使用 ESLint + Prettier 进行代码格式化
- 遵循 Vue 3 Composition API 最佳实践
- 使用 TypeScript 严格模式

### 提交规范

遵循 Conventional Commits 规范：

- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### Git工作流

- `main`: 生产分支
- `test`: 测试分支
- `dev`: 开发分支
- `feature/*`: 功能开发分支
- `fix/*`: Bug修复分支

## 环境配置

项目支持多环境配置：

- 开发环境 (development)
- 测试环境 (staging)
- 生产环境 (production)

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

- 项目维护者: JamesWuVip
- 邮箱: [您的邮箱]
- 项目地址: https://github.com/JamesWuVip/wanli-education-frontend