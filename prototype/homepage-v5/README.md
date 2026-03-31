# Stello 官网首页原型 v5

这是基于 [PRD v5](./PRD.md) 构建的官网首页可交互原型，用于前端开发参考。

## 包含内容

- **PRD.md** — 完整的五屏 PRD（产品需求文档）
- **src/** — React + TypeScript 原型代码
- **五屏结构**：Hero / 核心能力 / 产品概览 / 落地场景 / CTA

## 快速运行

```bash
cd prototype/homepage-v5
npm install
npm run dev
```

浏览器打开 http://localhost:5173

## 技术栈

React 19 + Vite + TypeScript + Canvas（拓扑图）+ Lucide Icons

## 注意

- 这是**原型参考**，不是最终实现代码
- PRD 中的代码 tab 内容为 mock 示例，实际开发时需对照仓库 API 替换
- 拓扑图使用 Canvas 绘制，带节点自动缩放、发光动画、点击联动
- 视觉风格为 Apple Glassmorphism（毛玻璃）暗色主题
