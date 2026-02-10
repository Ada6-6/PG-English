# PG English

英语学习小站：每期课程、词汇记忆、口语话题与词汇小游戏。支持手机浏览，默认白天模式，适合部署到 Vercel。

---

## 功能模块

| 模块 | 说明 |
|------|------|
| **主页** | 每日励志语、学习入口与简单统计 |
| **每期课程** | 词汇、口语 topic、idioms、哲理、Bible、其他（含 Marie Kondo 等拓展） |
| **词汇记忆** | 抽词复习，本地记录掌握进度（localStorage） |
| **口语题库** | 话题 + 思路提示 + 常用表达 |
| **词汇游戏** | 根据中文释义选英文，检测词汇掌握度 |

词汇记忆和词汇游戏的数据都来自 `src/data.js` 中的课程词汇表。

---

## 本地运行

```bash
# 安装依赖
npm install

# 开发（带热更新）
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

浏览器打开开发服务器提示的地址（一般为 `http://localhost:5173`）即可。

---

## 部署到 Vercel

1. 将项目推送到 GitHub / GitLab 等 Git 仓库。
2. 在 [Vercel](https://vercel.com) 中 **New Project**，导入该仓库。
3. 框架选择 **Vite**（或留空，Vercel 会自动识别）。
4. 构建命令：`npm run build`，输出目录：`dist`。
5. 点击 **Deploy** 完成部署。

---

## 项目结构

```
├── index.html          # 入口页面
├── package.json        # 依赖与脚本
├── src/
│   ├── main.js         # 入口脚本（引入样式与 app）
│   ├── style.css       # 全局样式（白天模式、移动端适配）
│   ├── data.js         # 课程、词汇、口语话题、励志语等数据
│   └── app.js          # 页面逻辑（导航、课程、词汇、口语、游戏）
└── README.md
```

- **新增/修改课程**：编辑 `src/data.js` 中的 `lessons` 数组；词汇记忆与游戏会自动使用当前所有课程中的词汇。
- **修改口语话题**：编辑 `src/data.js` 中的 `speakingTopics`。
- **修改励志语**：编辑 `src/data.js` 中的 `inspirationQuotes`。

---

## 技术栈

- [Vite](https://vitejs.dev/) 构建
- 原生 HTML / CSS / JavaScript，无框架
- 数据与逻辑分离，便于维护与扩展
