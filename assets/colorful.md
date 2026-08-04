# 彩虹色键盘样式 colorful.md

> 来源：本仓库 `frontend/src/components/typing/virtual-keyboard.tsx` + `frontend/src/app/globals.css`
> 用途：给大模型复用的"彩虹色虚拟键盘"完整样式方案，每个键按**手指区域**着色，形成彩虹渐变；再用**按键状态**覆盖反馈颜色。

---

## 一、整体结构

```
.keyboard-stage         容器（relative，固定最小宽高）
└── .keyboard           键盘面板（relative, z-index:1）
    └── .keyboard-row   每一行（flex，居中，gap）
        └── .key        单个键帽
```

## 二、键帽基础样式 `.key`

```css
.key {
  position: relative;
  display: grid;
  width: 48px;
  height: 54px;
  place-items: center;
  border: 1px solid #bfc8d4;
  border-bottom-width: 3px;   /* 3D 键帽厚度 */
  border-radius: 8px;
  color: var(--ink);          /* 主文字色，深墨色 */
  background: #fafbfc;        /* 默认浅灰白 */
  font-family: "Cascadia Mono", Consolas, monospace;
}
```

键帽上最多三层内容：
- `.key-secondary`：左上角次字符（符号），10px，`--ink-soft` 浅色
- `.key-primary`：主字符，14px，字重 800
- `.key-state-label`：右下角状态小标签，7px

尺寸变体（按键宽）：`key-wide` 72px、`key-wider` 92px、`key-space` 330px；常规键 48px。

## 三、彩虹核心：手指区域 `.finger-zone-*`

给每个键按手指分配一个 CSS 类，类内用两个 CSS 变量定义**边框色**与**背景色**。
`colorCoded` 开启时，通过 `fingerZoneClassByName[key.finger]` 挂到键帽上。

```css
.key[class*="finger-zone-"] {
  border-color: var(--finger-zone-border);
  background: var(--finger-zone-background);
}
```

8 个手指区域的颜色（左→右形成彩虹，左手为冷色系、右手为暖色系）：

| 手指 | 类名 | 边框色 | 背景色 | 主用键（按键盘布局） |
|---|---|---|---|---|
| 左小指 | `.finger-zone-left-pinky` | `#d6a0b9` 粉 | `#fff0f6` 浅粉 | ` 1 q a z Tab CapsLock Shift Ctrl Alt |
| 左无名指 | `.finger-zone-left-ring` | `#c6a4df` 紫 | `#f7efff` 浅紫 | 2 w s x |
| 左中指 | `.finger-zone-left-middle` | `#9fb4e3` 蓝紫 | `#eef4ff` 浅蓝紫 | 3 e d c |
| 左食指 | `.finger-zone-left-index` | `#83bec2` 青 | `#eaf9f8` 浅青 | 4 5 r t f g v b |
| 右食指 | `.finger-zone-right-index` | `#8ac29c` 绿 | `#eef9f1` 浅绿 | 6 7 y u h j n m |
| 右中指 | `.finger-zone-right-middle` | `#c2bb76` 黄绿 | `#fffbe8` 浅黄 | 8 i k , |
| 右无名指 | `.finger-zone-right-ring` | `#d9aa71` 橙 | `#fff4e8` 浅橙 | 9 o l . |
| 右小指 | `.finger-zone-right-pinky` | `#d69a98` 红 | `#fff0ef` 浅红 | 0 - = [ ] \ ; ' Enter Shift-right Alt Ctrl |
| 拇指 | `.finger-zone-thumb` | `#9fa8b5` 灰蓝 | `#f2f4f7` 浅灰 | 空格 |

> 注：`--blue`、`--ink` 等是全局 CSS 变量；`--orange-soft` 用于修饰键。上表"主用键"仅示意，实际以 `frontend/src/lib/typing/keyboard-layout.ts` 里每个键的 `finger` 字段为准。

## 四、按键状态覆盖色 `.key-*`

状态有优先级（高→低）：**pressed 按下 > error 错误 > correct 正确 > target 目标 > next 下一键 > modifier 修饰键 > idle 空闲**。
状态类在 `finger-zone-*` 背景之上**整块覆盖**，动态反馈一眼可见。

| 状态 | 类名 | 效果 |
|---|---|---|
| 目标键 | `.key-target` | 边框+背景 `var(--blue)` 实心蓝，外发光 `box-shadow: 0 0 0 4px rgba(49,87,213,.13)`，下沉 2px |
| 下一键 | `.key-next` | 边框 `#8199e8` 蓝虚线，文字 `--blue-dark`，背景 `#eef1ff` 淡蓝 |
| 正确 | `.key-correct` | 边框 `#3a8a68` 绿，文字 `#18553d`，背景 `#dff5e8` 浅绿 |
| 错误 | `.key-error` | 边框 `#c75555` 红，文字 `#7c2020`，背景 `#ffe5e5` 浅红 |
| 按下 | `.key-pressed` | 边框+背景 `#303a4a` 深灰蓝，文字白色，下沉 2px |
| 修饰键激活 | `.key-modifier` | 边框 `#c67728` 橙，文字 `#6d3908`，背景 `--orange-soft` 浅橙 |
| 空闲 | 默认 | 保留该键的手指彩虹色 |

完整定义（globals.css）：

```css
.key-target {
  border-color: var(--blue);
  background: var(--blue);
  box-shadow: 0 0 0 4px rgba(49, 87, 213, 0.13);
  transform: translateY(2px);
}
.key-next {
  border-color: #8199e8;
  border-style: dashed;
  color: var(--blue-dark);
  background: #eef1ff;
}
.key-correct {
  border-color: #3a8a68;
  color: #18553d;
  background: #dff5e8;
}
.key-error {
  border-color: #c75555;
  color: #7c2020;
  background: #ffe5e5;
}
.key-pressed {
  border-color: #303a4a;
  color: white;
  background: #303a4a;
  transform: translateY(2px);
}
.key-modifier {
  border-color: #c67728;
  color: #6d3908;
  background: var(--orange-soft);
}
```

## 五、容器与面板

```css
.keyboard-stage { position: relative; min-width: 760px; min-height: 270px; padding-bottom: 52px; }
.keyboard { position: relative; z-index: 1; min-width: 760px; gap: 4px; }
.keyboard-row { display: flex; justify-content: center; gap: 7px; }
.keyboard-panel { overflow: hidden; }
```

## 六、实现要点（给大模型复用的钩子）

1. 每个键在键盘布局数据里带 `finger` 字段（如 `leftPinky`、`rightIndex`、`拇指`），映射到对应 `.finger-zone-*` 类即可自动上彩虹色，无需逐个键写颜色。
2. 状态计算函数 `getKeyState` 返回唯一最高优先级状态，按 pressed → error → correct → target → next → modifier → idle 顺序判定。
3. 颜色可选：`colorCoded=false` 时不挂 `finger-zone-*` 类，键帽回到 `.key` 默认浅灰，便于"纯色/彩色"切换。
4. 不依赖颜色传达结果：每个键还有 `aria-label`（主字符+手指+状态文案），状态小标签 `.key-state-label` 显示文字状态。
