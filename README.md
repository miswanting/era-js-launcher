# Era.js 启动器（era-js-launcher）

启动器专门用于那些使用 [Era.js](https://github.com/miswanting/Era.js) 引擎所开发的游戏。用 [TypeScript](https://www.typescriptlang.org/) 语言编写。

A Game Launcher for [Era.js](https://github.com/miswanting/Era.js) Games. Written in [TypeScript](https://www.typescriptlang.org/).

这不仅仅是一个启动器，她还兼任游戏的管理器和游戏前端。

It`s not only a Game Launcher, but also the Manager & Front-end of [Era.js](https://github.com/miswanting/Era.js) Games.

## 目录（Index）

[TOC]

## 特性（Feature）

### 启动器（Launcher）

1. 自动升级（Auto-Update）
   - 在启动器运行的时候，她会检查启动器是否存在新版本，若有，则会提醒用户升级到最新版本，这一过程不是强制性的。
   - When the launcher is running, she checks to see if a new version exists, and if so, alerts the user to automatically upgrade to the latest version, which is not mandatory.
2. 游戏管理（Game Management）
   - 你可以分别搜索、下载、安装、启动和卸载不同的使用 [Era.js](https://github.com/miswanting/Era.js) 游戏引擎开发的游戏
   - You can search, download, install, launch and uninstall different [Era.js](https://github.com/miswanting/Era.js) games respectively.
3. 游戏版本管理（Game Version Management）
   - 你可以在启动游戏前选择具体启动哪一个游戏版本，游戏存档也会根据选择的游戏版本不同而进行匹配。
   - You can choose which version of the game to launch before launching the game, and the game save data will match according to the selected version of the game.

### 游戏管理器（Game Manager）

1. 插件管理（Plugin Manager）
   - 你可以搜索、下载、安装、启用、禁用、卸载以及调整插件的载入顺序。
   - You can search, download, install, enable, disable, uninstall, and adjust the loading order of plug-ins.
2. DLC管理（DLC Manager）
   - 你可以搜索、下载、安装、启用、禁用、卸载以及调整 DLC 的载入顺序。
   - You can search, download, install, enable, disable, uninstall, and adjust the loading order of DLCs.
3. MOD管理（Mod Manager）
   - 你可以搜索、下载、安装、启用、禁用、卸载以及调整 MOD 的载入顺序。
   - You can search, download, install, enable, disable, uninstall, and adjust the loading order of MODs.

### 游戏前端（Front-end）

1. 新行内样式（A new inline style）
   - 引入一个全新的、基于行内控件的自研 UI 样式库：[span-charm](https://github.com/miswanting/span-charm)
   - Introduce a completely new inline  UI style for style text game: [span-charm](https://github.com/miswanting/span-charm)
2. 新字体（A new font）
   - 引入一个全新的、面向中英文混排友好的等宽字体：[Monomono](https://github.com/miswanting/Monomono)
   - Introduce a new, Chinese character & English letters mix oriented monospaced font: [Monomono](https://github.com/miswanting/Monomono)
3. 响应式（Reactive）
   - 使用了含 [React Redux](https://react-redux.js.org/) 状态容器的 [React](https://reactjs.org/) 库。
   - [React](https://reactjs.org/) library with [React Redux](https://react-redux.js.org/) state container.
4. 3D支持（3D Support）
   - 内置 [Three.js](https://threejs.org/) 引擎
   - Built-in [Three.js](https://threejs.org/) engine
5. 数据驱动可视化支持（Data-driven visualization support）
   - 内置 [D3.js](https://d3js.org/) 引擎
   - Built-in [D3.js](https://d3js.org/) engine
6. 动画支持（Animation Support）
   - 内置 [Anime.js](https://animejs.com/) 引擎
   - Built-in [Anime.js](https://animejs.com/) engine
7. 多窗口支持（Multi-window Support）
   - 一个启动器可以同时打开多个窗口运行不同的游戏。
   - One single launcher can open multiple Windows to run different games, simultaneously.
8. 开发模式（Development mode）
   - 自动感知并进入开发模式：支持自动热重载、[Chrome 前端开发调试工具](https://developers.google.com/web/tools/chrome-devtools/)等。
   - Automatic perception and enter development mode: support automatic hot reloading, [*Chrome DevTools*](https://developers.google.com/web/tools/chrome-devtools/), etc.
9. 自动集成（Automatic Integration）
   - 内置单元测试和文档测试，面向自动集成进行优化
   - Built-in unit and document testing, optimized for automatic integration.