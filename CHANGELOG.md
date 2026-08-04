# Changelog

本项目所有重要变更均记录在此文件中。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

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

[1.0.1]: https://github.com/ayuday/vkeyboardhand/releases/tag/v1.0.1
[1.0.0]: https://github.com/ayuday/vkeyboardhand/releases/tag/v1.0.0
