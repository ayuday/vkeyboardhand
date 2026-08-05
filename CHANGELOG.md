# Changelog

本项目所有重要变更均记录在此文件中。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## 2026-08-05

### 功能新增

- 演示页 `index.html` 新增 `#vk-demo-2` 实例：关闭键盘监听（`listenKeyboard: false`），渲染后固定演示按键 Y 的键盘高亮与正确手势（右手食指），并显式指定 `showHandBoth: false`（按键手势替代同侧自然状态、对侧自然状态保留）
- `#vk-demo` 与 `#vk-demo-2` 下方均增加“代码用法（Code Usage）”代码块，展示组件初始化用法
- 组件新增 `play(keys, options?)` 实例方法：连续演示一串按键（打字序列），支持字符串（自动转小写、空格映射为 `space`）或键名数组，可配置每键按住时长 `pressTime` 与松开间隔 `gap`，提供 `onStep` 每步回调并返回 Promise
- `play(keys, options?)` 新增 `loop` 配置（默认 `false`）：设为 `true` 时自动循环播放序列，直到组件销毁（`destroy()`）停止
- 演示页 `index.html` 实例 3 改为连续演示 hello：使用 `kb.play('hello', { pressTime: 450, gap: 120 })`，并清理手工测试遗留的重复 `#vk-demo-3` id、无效 `#vk-demo-4` 容器引用与临时 `playKeys` 函数

### 修复

- `play()` 连续演示及按键演示时手势重叠：`showHandBoth: false` 由“隐藏双手自然状态、仅显示按键手势”修正为“同侧自然状态被按键手势替代（隐藏）、对侧自然状态保留”，按键复原后恢复双手自然状态（详见 `fix.md`）

### 验证结果

- 无头 Chrome 实测：`#vk-demo-2` 内 `letter-bg-y` 高亮、`hand-y` 显示、`hand-neutral-right` 隐藏、`hand-neutral-left` 保留、指法标签显示“右手食指 按 Y”
- 模拟真实键盘 `KeyA`：`#vk-demo-2` 不响应（关闭键盘监听生效），Y 演示保持
- 两个代码用法块渲染正常
- `npm run build` 构建成功，`dist/vkeyboardhand.umd.js` 与 `dist/vkeyboardhand.esm.mjs` 均包含 `play()` 方法
- `npm test` 全部 5 项通过；`index.html` 不再因重复 / 无效容器 id 抛异常
- 无头 Chrome + CDP 实测 `kb.play('hello', { pressTime: 450, gap: 120 })`：h 按住阶段仅 `letter-bg-h` 高亮、`hand-h` 显示、指法标签“右手食指 按 H”；e 按住阶段 h 已复原、仅 `letter-bg-e` 高亮、`hand-e` 显示、指法标签“左手中指 按 E”；播放结束后全部键复原、双手自然状态恢复
- 修复后无头 Chrome + CDP 复测：h 按住阶段 `#hand-h` 显示、`#hand-neutral-right` 隐藏、`#hand-neutral-left` 保留；e 按住阶段 `#hand-e` 显示、`#hand-neutral-left` 隐藏、`#hand-neutral-right` 保留；播放结束双手自然状态恢复
- 无头 Chrome + CDP 实测 `play('ab', { loop: true })`：第一轮 a → b 依次高亮，随后第二轮 a 再次高亮（循环生效）；调用 `destroy()` 后返回的 Promise resolve（循环停止）

### 修改文件

| 作用描述 | 文件名 | 修复前 | 修复后 |
| --- | --- | --- | --- |
| 新增固定演示实例与代码用法 | `index.html` | 仅 `#vk-demo` 一个实例，无代码用法展示 | 新增 `#vk-demo-2`（关闭键盘监听 + 固定演示 Y + `showHandBoth: false`）及两个代码用法块 |
| 新增连续演示 API `play()` | `src/vkeyboardhand.js` | 仅 `press` / `release` / `reset` 单键状态 API | 新增 `play(keys, options?)` 打字序列播放（含方法头注释） |
| 演示页改用 `play()` 并修复遗留问题 | `index.html` | 手工测试遗留：重复 `#vk-demo-3` id、无效 `#vk-demo-4`、临时 `playKeys` 函数 | 实例 3 使用 `kb.play('hello', ...)`，移除重复卡片与临时函数 |
| API 文档补充 `play()` | `README.md` / `README_zh.md` | 实例方法列表与完整 API 概述无 `play` | 实例方法表格与完整 API 概述新增 `play(keys, options?)` |
| 构建产物同步 | `dist/vkeyboardhand.umd.js` / `dist/vkeyboardhand.esm.mjs` | 无 `play` 方法 | 同步包含 `play(keys, options?)` |
| 修复同侧自然状态与按键手势重叠 | `src/vkeyboardhand.js` | `showHandBoth: false` 时隐藏双手自然状态、仅显示按键手势 | 按手侧隐藏同侧自然状态、保留对侧自然状态，复原后恢复双手 |
| 演示页切换新语义并更新注释 | `index.html` | 实例 3 使用 `showHandBoth: true`（双手常显导致重叠） | 实例 3 改为 `showHandBoth: false`，实例 2 注释同步 |
| 文档同步语义 | `README.md` / `README_zh.md` | `showHandBoth: false` 描述为“按下左手键隐藏右手” | 明确为“同侧自然状态被按键手势替代、对侧保留” |
| 新增 bug 修复记录 | `fix.md` | 不存在 | 按规范记录问题描述、修复方法、验证结果与修改文件表格 |

## [1.0.2] - 2026-08-04

### 变更

- LICENSE 版权持有人与 `package.json` 的 `author` 统一为 `ayuday`
- 验证 npm 自动发布全流程（`NPM_TOKEN` 使用仓库级 Repository Secret）

## [1.0.1] - 2026-08-04

### 新增

- 配置项 `showHandBoth`：按键按下时可选择同时显示双手自然状态，并提供 `setShowHandBoth` 动态开关
- GitHub Actions 工作流：`ci.yml`（push/PR 构建测试）+ `release.yml`（`v*` tag 触发 npm 发布与 GitHub Release）+ `deploy-gh-pages.yml`（Pages 部署）
- 发布护栏：`prepublishOnly`（发布前自动构建+测试）与 `publishConfig.access = public`

### 变更

- 文档补充 npm 自动发布流程与 GitHub Pages 环境配置说明

## [1.0.0] - 2026-08-03

### 新增

- 交互式指法教学组件：SVG 键盘图 + SVG 手势图 + JavaScript 事件驱动联动
- 彩虹主题 `colorful` 并设为默认主题：按键按手指区域着色（左冷右暖形成彩虹渐变），配色约定见 `colorful.md`
- 手势图配色随主题联动（dark / robot / kingfish / milk / colorful）
- 键位 → 手指 → SVG id 三层映射表（可自定义覆盖），指法提示条、手指配色、多套主题
- 三种引入方式：本地引入 / CDN（jsDelivr、unpkg）/ npm + ESM，兼容 Vue / React / Angular
- 完整 API：`press / release / reset / setTheme / setClickEnabled / getState / getFinger / destroy` 及事件回调
- 控制台横幅：初始化时输出版本与仓库信息（可用 `showBanner: false` 关闭）

### 修复

- hand.svg 内嵌样式泄漏导致键盘键帽 `display:none` 的问题（SVG 内嵌样式作用域化）
- 组合键手势按标准指法显示（左手键配右手 Shift，右手键配左手 Shift）
- 骨白主题样式与 keyboard+hand.html 渲染保持一致（键帽描边、字母可见性、手势层定位）

### 变更

- SVG 素材移入 `svg/` 目录，组件默认路径与文档同步更新
- 开源仓库：https://github.com/ayuday/vkeyboardhand

[1.0.2]: https://github.com/ayuday/vkeyboardhand/releases/tag/v1.0.2
[1.0.1]: https://github.com/ayuday/vkeyboardhand/releases/tag/v1.0.1
[1.0.0]: https://github.com/ayuday/vkeyboardhand/releases/tag/v1.0.0
