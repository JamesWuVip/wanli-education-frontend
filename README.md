# Wanli Frontend

万里学院前端应用 - Vue 3 + TypeScript + Vite

## 项目描述

这是万里学院的前端应用，提供用户界面用于课程学习、作业提交、成绩查看等功能。

## 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **TypeScript** - 类型安全的JavaScript超集
- **Vite** - 现代前端构建工具
- **Vue Router** - Vue.js官方路由管理器
- **Pinia** - Vue状态管理库
- **Element Plus** - Vue 3组件库
- **Axios** - HTTP客户端库
- **Vitest** - 单元测试框架
- **ESLint + Prettier** - 代码质量和格式化工具

## 快速开始

### 环境要求

- Node.js 20.19.0+ 或 22.12.0+
- npm 或 yarn

### 本地开发

1. 克隆项目
```bash
git clone <repository-url>
cd wanli-frontend
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
# 创建 .env.development 文件
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=万里学院
```

4. 启动开发服务器
```bash
npm run dev
```

应用将在 http://localhost:5173 启动

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建
- `npm run test:unit` - 运行单元测试
- `npm run type-check` - TypeScript类型检查
- `npm run lint` - 代码检查和修复
- `npm run format` - 代码格式化

## 项目结构

```
src/
├── api/              # API接口定义
├── assets/           # 静态资源
├── components/       # 可复用组件
├── router/           # 路由配置
├── stores/           # Pinia状态管理
├── types/            # TypeScript类型定义
├── views/            # 页面组件
├── App.vue           # 根组件
└── main.ts           # 应用入口
```

## 构建和部署

### 本地构建
```bash
npm run build
```

构建产物将生成在 `dist/` 目录中。

### Railway部署

项目已配置Railway部署，推送到main分支将自动触发部署。

## 环境变量

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `VITE_API_BASE_URL` | 后端API基础URL | - |
| `VITE_APP_TITLE` | 应用标题 | `万里学院` |
| `PORT` | 服务端口（生产环境） | `4173` |

## 开发指南

### 代码规范
- 使用TypeScript进行类型安全开发
- 遵循Vue 3 Composition API最佳实践
- 使用ESLint和Prettier保持代码质量
- 编写单元测试覆盖核心功能

### 组件开发
- 使用 `<script setup lang="ts">` 语法
- 合理使用Pinia进行状态管理
- 遵循Element Plus设计规范

### API集成
- 使用Axios进行HTTP请求
- 统一的错误处理和响应拦截
- 支持请求和响应的类型定义

## 推荐IDE设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### 推荐插件
- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier
- Auto Rename Tag
- Bracket Pair Colorizer

## 许可证

[MIT License](LICENSE)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
