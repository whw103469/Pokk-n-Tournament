<div align="center">

<!-- 项目 Logo (如果没有 Logo，可以用一个巨大的 Emoji 代替，例如 ⚔️ 或 🐲) -->

# ⚔️ Pocket Battle Arena | 口袋大作战

**致敬经典：一款基于 Web 的沉浸式回合制策略游戏**

<!-- 徽章墙：请根据你的实际技术栈修改 -->
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](./LICENSE)

<p align="center">
  <a href="#-demo">👀 在线演示</a> •
  <a href="#-gameplay">🎮 核心玩法</a> •
  <a href="#-tech">🛠️ 技术栈</a> •
  <a href="#-start">🚀 快速开始</a>
</p>

</div>

---

## 📖 简介 | Introduction

> "野生的代码出现了！去吧，精灵球！"

**口袋大作战** 是一款致敬 GBA 时代经典宝可梦玩法的网页端回合制游戏。本项目旨在通过现代前端技术（Canvas/DOM 动画），重现经典的战斗逻辑与视觉体验。

在这里，你可以体验属性克制的策略博弈、流畅的技能动画以及复古像素风（或你实际的美术风格）带来的怀旧感动。这不仅是一个游戏，更是一次对前端状态管理与交互设计的深度探索。

---

## 📸 精彩预览 | Gallery

<div align="center">

<!-- ⚠️ 关键点：这里一定要放 GIF 动图！ -->
<!-- 建议放两张图：左边是战斗画面，右边是图鉴或选择界面 -->

| 🔥 激烈的战斗系统 | 📊 动态 UI 交互 |
| :---: | :---: |
| *实时伤害计算与动画反馈* | *流畅的技能选择与状态显示* |

</div>

---

## 🎮 核心玩法 | Features

这款游戏复刻并简化了核心战斗循环，包含以下特性：

*   **⚔️ 经典回合制战斗 (Turn-Based System)**
    *   基于速度值 (Speed) 决定出手顺序。
    *   完整的战斗流程：选择技能 -> 判定先手 -> 造成伤害 -> 结算回合。

*   **🌊 属性克制机制 (Type Effectiveness)**
    *   完美复刻 水克火、火克草、草克水 的三角克制关系。
    *   攻击克制属性时触发 `效果拔群` (200% 伤害)，并伴有特殊音效/特效。

*   **✨ 动态视觉反馈 (Visual Effects)**
    *   精灵入场动画、受伤闪烁、血条 (HP Bar) 动态削减。
    *   战斗文本对白框打字机效果，还原掌机体验。

*   **🤖 简单的 AI 对手 (Basic AI)**
    *   对手会根据当前血量和属性，智能选择释放攻击技能或回复药水。

---

## 🛠️ 技术栈 | Tech Stack

本项目完全基于现代 Web 标准构建：

| 模块 | 技术选型 | 说明 |
| :--- | :--- | :--- |
| **核心框架** | **Vue 3 / React** | *(根据实际情况修改)* 用于构建响应式 UI 和组件化开发 |
| **状态管理** | **Pinia / Vuex** | 管理回合状态、玩家血量、技能数据 |
| **样式渲染** | **Tailwind CSS / SCSS** | 快速构建精致的战斗面板布局 |
| **动画引擎** | **GSAP / Anime.js** | 处理精灵的攻击位移、震动反馈与血条动画 |
| **构建工具** | **Vite** | 极速的开发服务器与打包体验 |

---

## 🚀 快速开始 | Getting Started

想在本地运行这个游戏吗？请跟随以下步骤：

### 1. 克隆仓库
```bash
git clone https://github.com/whw103469/Pokk-n-Tournament.git
cd Pokk-n-Tournament
