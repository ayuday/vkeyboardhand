# Changelog

本项目所有重要变更均记录在此文件中。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## 2026-08-05

### 功能新增

- 演示页 `index.html` 新增 `#vk-demo-2` 实例：关闭键盘监听（`listenKeyboard: false`），渲染后固定演示按键 Y 的键盘高亮与正确手势（右手食指），并显式指定 `showHandBoth: false` 保证只显示右手手势、隐藏左手
- `#vk-demo` 与 `#vk-demo-2` 下方均增加“代码用法（Code Usage）”代码块，展示组件初始化用法

### 验证结果

- 无头 Chrome 实测：`#vk-demo-2` 内 `letter-bg-y` 高亮、`hand-y` 显示、`hand-neutral-left` 隐藏、指法标签显示“右手食指 按 Y”
- 模拟真实键盘 `KeyA`：`#vk-demo-2` 不响应（关闭键盘监听生效），Y 演示保持
- 两个代码用法块渲染正常

### 修改文件

| 作用描述 | 文件名 | 修复前 | 修复后 |
| --- | --- | --- | --- |
| 新增固定演示实例与代码用法 | `index.html` | 仅 `#vk-demo` 一个实例，无代码用法展示 | 新增 `#vk-demo-2`（关闭键盘监听 + 固定演示 Y + `showHandBoth: false`）及两个代码用法块 |

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
