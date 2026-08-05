# Bug 修复记录

## 2026-08-05

### 问题描述

`play()` 连续演示（以及所有按键演示）时，按键手势与双手自然状态重叠：`showHandBoth: false` 会隐藏双手自然状态导致未按键一侧空白；`showHandBoth: true` 则双手自然状态全部保留、与按键手势叠在一起。期望行为：左手键按下时 `#hand-neutral-left`（左手自然状态）隐藏、右手自然状态保留；右手键按下时反之；按键复原后双手自然状态恢复。

### 修复方法

修改 `_renderHand()` 手势渲染逻辑：`showHandBoth: false` 时不再整体隐藏双手自然状态，而是按当前按住的键计算被占用的手侧（通过 `fingerMap` 的手指 id 首字母 `l` / `r` 判断），隐藏**同侧**自然状态（被按键手势替代），保留**对侧**自然状态；无键按住时仍恢复双手自然状态。`showHandBoth: true` 行为保持不变（双手自然状态作为背景常显）。

### 验证结果

- 无头 Chrome + CDP 实测 `kb.play('hello', { pressTime: 450, gap: 120 })`（`showHandBoth: false`）：h 按住阶段 `#hand-h` 显示、`#hand-neutral-right` 隐藏、`#hand-neutral-left` 保留；e 按住阶段 `#hand-e` 显示、`#hand-neutral-left` 隐藏、`#hand-neutral-right` 保留；播放结束双手自然状态恢复
- 实例 2 固定演示 Y（`showHandBoth: false`）：`#hand-y` 显示、`#hand-neutral-right` 隐藏、`#hand-neutral-left` 保留
- `npm test` 5 项全部通过

### 修改文件

| 作用描述 | 文件名 | 修复前 | 修复后 |
| --- | --- | --- | --- |
| 修复同侧自然状态与按键手势重叠/空白 | `src/vkeyboardhand.js` | `showHandBoth: false` 时隐藏双手自然状态，仅显示按键手势 | 按手侧隐藏同侧自然状态、保留对侧自然状态，复原后恢复双手 |
| 演示页切换新语义并更新注释 | `index.html` | 实例 3 使用 `showHandBoth: true`（双手常显导致重叠）；实例 2 注释为“隐藏左手” | 实例 3 改为 `showHandBoth: false`；实例 2 注释同步为“右手手势替代右手自然状态、左手保留” |
| 文档同步语义 | `README.md` / `README_zh.md` | `showHandBoth: false` 描述为“按下左手键隐藏右手” | 明确为“同侧自然状态被按键手势替代、对侧保留” |
| 变更记录 | `CHANGELOG.md` | 无本次修复记录 | 新增修复条目 |
