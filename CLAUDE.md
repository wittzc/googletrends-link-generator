# Google Trends 多国家对比链接生成器

## 项目概述

纯前端效率工具。输入关键词 + 选时间区间 + 选国家分组 → 自动生成 Google Trends 多国家对比链接。

## 技术栈

- Next.js 16 (App Router, `output: "export"` 静态导出)
- TypeScript
- Tailwind CSS v4
- lucide-react（图标）
- 无后端、无数据库、无 API

## 开发命令

```bash
npm run dev      # 启动开发服务器 http://localhost:3000
npm run build    # 静态构建，输出到 out/
npm run lint     # ESLint 检查
```

## 文件结构

```
src/
├── app/
│   ├── globals.css           # Tailwind 样式
│   ├── layout.tsx            # 根布局（lang="zh-CN"）
│   └── page.tsx              # 页面入口
├── components/
│   ├── ui/
│   │   ├── button.tsx        # Button 基础组件
│   │   └── input.tsx         # Input 基础组件
│   ├── trends-generator.tsx  # 主表单（含状态管理）
│   └── results-panel.tsx     # 结果展示（链接 + 复制 + 打开）
└── lib/
    ├── utils.ts              # cn() 工具函数
    ├── constants.ts          # 时间区间、国家分组数据
    └── generate-links.ts     # URL 生成核心算法
```

## 核心规则

1. 单条链接最多 5 个对比项（`MAX_COMPARE_ITEMS = 5`）
2. 超出自动拆分为多条链接
3. URL 用手动拼接（不用 URLSearchParams），空格编码为 `%20`
4. Google Trends URL 格式：`date` 重复 N 次，`geo` 重复 N 次，`q` 重复 N 次

## 部署

`npm run build` 生成 `out/` 目录，可部署到任何静态托管（Vercel、Netlify、GitHub Pages）。

## P1 待做

- 自定义国家分组
- 批量关键词输入
- 自定义日期范围
- 导出结果
- 保存常用分组
