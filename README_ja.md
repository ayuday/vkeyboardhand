# ⌨️ vkeyboardhand

インタラクティブ仮想キーボード タッチタイピング教育コンポーネント

**SVG キーボード図 + SVG ハンドジェスチャー図 + JavaScript イベント駆動**の連携による、インタラクティブなタッチタイピング教育システム。純粋な HTML + JS で実装され、依存関係ゼロ。**Vue / React / Angular** などのフロントエンドフレームワークに対応し、**ローカル導入、CDN、npm** の 3 通りの利用方法をサポートします。

**リポジトリ**: [GitHub](https://github.com/ayuday/vkeyboardhand) · [Issues](https://github.com/ayuday/vkeyboardhand/issues) · [npm](https://www.npmjs.com/package/vkeyboardhand)

<p align="center">
  <a href="https://www.npmjs.com/package/vkeyboardhand" target="_blank"><img src="https://img.shields.io/npm/v/vkeyboardhand" alt="npm version"></a>
  <img src="https://img.shields.io/npm/dm/vkeyboardhand" alt="npm downloads">
  <img src="https://data.jsdelivr.com/v1/package/npm/vkeyboardhand/badge" alt="jsDelivr CDN version">
  <img src="https://img.shields.io/github/stars/ayuday/vkeyboardhand" alt="GitHub stars">
  <img src="https://img.shields.io/npm/l/vkeyboardhand" alt="License MIT">
  <img src="https://img.shields.io/badge/pure_JS-zero_dependency-4fc08d" alt="pure JS zero dependency">
</p>

[English](README.md) | [简体中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Русский](README_ru.md) | [Português](README_pt.md) | [Español](README_es.md)

<p align="center">
  <img src="./assets/vkeyboardhand.jpg" alt="vkeyboardhand"  />
</p>
<p align="center">
  <img src="./assets/vkeyboardhand.gif" alt="vkeyboardhand"  />
</p>



## 機能

- 🎹 SVG キーボード + 🖐 SVG ハンドジェスチャー連携: 実キーを押す（またはキーをクリック）と、対応するキーが光り、ハンドジェスチャーが同期して切り替わり、指使いヒントバーに「どの指でどのキーを押すか」がリアルタイムに表示されます。
- ⌨️ `KeyboardEvent` 駆動: `keydown` / `keyup` をリッスンし、`Shift` / `Alt` などの複合キージェスチャーに対応。
- 🎨 虹色カラースキーム（デフォルトテーマ）: キーは指領域ごとに着色され、左は寒色、右は暖色で虹のグラデーションを形成します（配色の規約は `colorful.md` を参照）。
- 🧩 フレームワーク非依存: コンポーネントは DOM のみを操作し、フレームワークに依存しません。Vue / React / Angular でそのまま使用できます。
- 📦 3 通りの導入方法: ローカル `<script>`、CDN、npm + ESM。
- ⚙️ 完全な API: `press / release / play / reset / setTheme / setClickEnabled / getState / destroy` に加え、イベントコールバック。
- 🗂 キー割り当てテーブル（データ層）: `キー → 指 → SVG id` の 3 層マッピング。設定で上書き可能。

## 技術スタック

- **SVG（インライン注入）**: キーボード図 + 指ジェスチャー図
- **JavaScript DOM 操作**: SVG 要素の表示・スタイル制御
- **KeyboardEvent API**: ユーザーのキー押下を監視
- **CSS Transition / Animation**: キー押下アニメーション、ハイライト遷移
- **キー割り当てテーブル（データ）**: キー → 指 → SVG id の対応関係
- **fetch / インライン**: SVG ファイルの読み込み

## インストール

### 方法 1: 純粋な HTML + JS（ローカル導入 / CDN）

```html
<!-- コンポーネントスタイル -->
<link rel="stylesheet" href="dist/vkeyboardhand.css">
<!-- コンポーネントスクリプト（UMD、window.VKeyboardHand としてマウント） -->
<script src="dist/vkeyboardhand.umd.js"></script>

<div id="demo"></div>

<script>
  var kb = VKeyboardHand.create('#demo', {
    keyboard: './svg/keyboard.svg', // キーボード SVG（URL / インライン文字列 / SVGElement）
    hand: './svg/hand.svg'          // ハンドジェスチャー SVG
  });
</script>
```

npm に公開後は、CDN（jsDelivr / unpkg）から直接利用できます:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/dist/vkeyboardhand.css">
<script src="https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/dist/vkeyboardhand.umd.js"></script>
<!-- または -->
<link rel="stylesheet" href="https://unpkg.com/vkeyboardhand@latest/dist/vkeyboardhand.css">
<script src="https://unpkg.com/vkeyboardhand@latest/dist/vkeyboardhand.umd.js"></script>
```

> キーボード図とハンドジェスチャー図はパッケージ内から取得できます: `https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/svg/keyboard.svg`、`.../svg/hand.svg`。

### 方法 2: npm インストール（Vue / React / Angular）

```bash
npm install vkeyboardhand
```

```js
// スタイルをインポート（エントリーファイルまたはコンポーネント内）
import 'vkeyboardhand/vkeyboardhand.css';
// コンポーネントをインポート
import VKeyboardHand from 'vkeyboardhand';

const kb = VKeyboardHand.create(document.getElementById('demo'), {
  keyboard: '/assets/svg/keyboard.svg',
  hand: '/assets/svg/hand.svg'
});
```

> 注: `keyboard` / `hand` は **SVG ファイル URL、SVG 文字列、既存の SVGElement** のいずれもソースとして受け付けます。バンドラーでは `import kbSvg from 'vkeyboardhand/svg/keyboard.svg?raw'` のようにして、その文字列をそのまま渡すこともできます。

#### Vue 3

```vue
<template>
  <div ref="host"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import VKeyboardHand from 'vkeyboardhand';

const host = ref(null);
let kb = null;

onMounted(() => {
  kb = VKeyboardHand.create(host.value, {
    keyboard: '/assets/svg/keyboard.svg',
    hand: '/assets/svg/hand.svg'
  });
});

onBeforeUnmount(() => kb && kb.destroy());
</script>
```

#### React

```jsx
import { useEffect, useRef } from 'react';
import VKeyboardHand from 'vkeyboardhand';

export default function FingerTeaching() {
  const host = useRef(null);

  useEffect(() => {
    const kb = VKeyboardHand.create(host.current, {
      keyboard: '/assets/svg/keyboard.svg',
      hand: '/assets/svg/hand.svg'
    });
    return () => kb.destroy();
  }, []);

  return <div ref={host} />;
}
```

#### Angular

```ts
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import VKeyboardHand from 'vkeyboardhand';

@Component({
  selector: 'app-finger-teaching',
  template: `<div #host></div>`
})
export class FingerTeachingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;
  private kb: VKeyboardHand | null = null;

  ngAfterViewInit(): void {
    this.kb = VKeyboardHand.create(this.host.nativeElement, {
      keyboard: 'assets/svg/keyboard.svg',
      hand: 'assets/svg/hand.svg'
    });
  }

  ngOnDestroy(): void { this.kb?.destroy(); }
}
```

> 完全に実行可能なサンプルは [`examples/`](./examples) にあります: `vue.html`、`react.html`、`esm.html`、`angular/app.component.ts`。

## API リファレンス

### オプション

| オプション | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `keyboard` | `string \| SVGElement` | `'./svg/keyboard.svg'` | キーボード SVG: URL / インライン文字列 / 要素 |
| `hand` | `string \| SVGElement` | `'./svg/hand.svg'` | ハンドジェスチャー SVG: URL / インライン文字列 / 要素 |
| `theme` | `string` | `'colorful'` | テーマ: `colorful`（デフォルトの虹色）/ `bone` / `dark` / `robot` / `kingfish` / `milk` |
| `listenKeyboard` | `boolean` | `true` | 実キーボードを監視するかどうか |
| `enableClick` | `boolean` | `true` | デモ用にキーのクリックを許可するかどうか |
| `preventScroll` | `boolean` | `true` | スペースバー / 矢印キーなどによるページスクロールを防ぐ |
| `showFingerLabel` | `boolean` | `true` | 指使いヒントバーを表示する |
| `showFingerColors` | `boolean` | `false` | キーを指ごとに着色（`colorful` テーマではデフォルトでオン、他では手動でオンにできる） |
| `showBanner` | `boolean` | `true` | 初期化後にコンソールへバージョン + リポジトリバナーを出力する |
| `showHandBoth` | `boolean` | `true` | キーを押している間の自然な手の表示方法: `true` は両手の自然状態を背景として押下ジェスチャーの隣に保持。`false` は同側の自然状態をキージェスチャーに置き換え（非表示）つつ、反対側の自然状態は表示を維持。すべて離すと両手の自然状態が復帰する |
| `holdDelay` | `number` | `80` | ハンドジェスチャー切り替えの遅延（ms） |
| `keyboardClass` | `string` | `'standard-kb'` | キーボード SVG の追加クラス名 |
| `keyMap` | `object` | `KEY_MAP` | `KeyboardEvent.code → key` のマッピングを上書き |
| `fingerMap` | `object` | `FINGER_MAP` | `key → 指` のマッピングを上書き |
| `onReady(kb)` | `function` | - | コンポーネントの読み込み・描画完了時に発火 |
| `onKeyDown(info, kb)` | `function` | - | キー押下コールバック |
| `onKeyUp(info, kb)` | `function` | - | キー離しコールバック |
| `onKeyClick(info, kb)` | `function` | - | キークリックコールバック |
| `onError(err)` | `function` | - | 読み込み / 描画エラーのコールバック |

### インスタンスメソッド

| メソッド | 説明 |
| --- | --- |
| `press(key, meta?)` | 指定したキーを押す（`key` はキー名。例: `'q'`、`'shift-left'`） |
| `release(key, meta?)` | 指定したキーを離す |
| `play(keys, options?)` | キーの並びを連続再生（例: `kb.play('hello')`）。キーごとの押下時間と間隔、および任意の `loop` 自動繰り返しを設定可能。Promise を返す |
| `reset()` | すべてのハイライトとジェスチャーをリセット（両手の自然な休止位置に戻す） |
| `setTheme(theme)` | テーマを切り替える |
| `setClickEnabled(bool)` | クリックデモを有効 / 無効にする |
| `setShowHandBoth(bool)` | 押下中に両手の自然状態を表示し続けるかどうかを切り替える |
| `getState()` | 現在押しているキーのリストを取得 |
| `getFinger(key)` | キーの指情報を取得 |
| `destroy()` | コンポーネントを破棄し、リスナーと DOM を解放 |

コールバックのペイロード例:

```js
{
  key: 'q',            // キー名
  code: 'q',           // 互換性フィールド
  finger: 'lp',        // 指 id
  fingerName: 'left pinky', // 指の名前
  held: ['q']          // 現在押しているすべてのキー
}
```

### 指 id と色

| finger id | 意味 | デフォルト色 |
| --- | --- | --- |
| `lp` | 左手小指 | `#ff9f43` |
| `lr` | 左手薬指 | `#f368e0` |
| `lm` | 左手中指 | `#17c0eb` |
| `li` | 左手人差し指 | `#1dd1a1` |
| `ri` | 右手人差し指 | `#0abde3` |
| `rm` | 右手中指 | `#a29bfe` |
| `rr` | 右手薬指 | `#fd79a8` |
| `rp` | 右手小指 | `#fdcb6e` |
| `th` | 親指（スペースバー） | `#6c5ce7` |

CSS 変数で上書きできます:

```css
.vk-hand {
  --vk-finger-lp: #ff6348;
  --vk-accent: #38bdf8; /* キー押下ハイライト色 */
}
```

### 虹色テーマの配色（colorful.md の規約）

デフォルトの `colorful` テーマでは、キーキャップは指領域ごとに着色され、枠線 / 背景色は `colorful.md` に従います:

| 指 | 枠線色 | 背景色 |
| --- | --- | --- |
| 左手小指 | `#d6a0b9` ピンク | `#fff0f6` 薄いピンク |
| 左手薬指 | `#c6a4df` 紫 | `#f7efff` 薄い紫 |
| 左手中指 | `#9fb4e3` 青紫 | `#eef4ff` 薄い青紫 |
| 左手人差し指 | `#83bec2` ティール | `#eaf9f8` 薄いティール |
| 右手人差し指 | `#8ac29c` 緑 | `#eef9f1` 薄い緑 |
| 右手中指 | `#c2bb76` 黄緑 | `#fffbe8` 薄い黄 |
| 右手薬指 | `#d9aa71` オレンジ | `#fff4e8` 薄いオレンジ |
| 右手小指 | `#d69a98` 赤 | `#fff0ef` 薄い赤 |
| 親指 | `#9fa8b5` 灰青 | `#f2f4f7` 薄い灰 |

キーの状態は colorful.md の優先順位に従います: 押下（`#303a4a` 濃い灰青の塗り + 白文字）が虹色の背景を上書きします。完全な規約は [colorful.md](./colorful.md) を参照してください。

## アセットファイル

- `svg/keyboard.svg`: 仮想キーボードのベクターグラフィック
- `keyboard.md`: svg/keyboard.svg 内の `id` セレクターと実キーボードのキーの対応表
- `colorful.md`: 虹色キーボードのスタイル規約（指領域の色とキー状態の上書き色）
- `keyboard.html`: 仮想キーボードのベクターグラフィックのスタイルプレビュー
- `svg/hand.svg`: キーボードのハンドジェスチャーのベクターグラフィック
- `hand.md`: svg/hand.svg 内の `id` セレクターと実キーボードのキージェスチャーの対応表
- `keyboard+hand.html`: 仮想キーボード + ハンドジェスチャーのグラフィックのスタイルプレビュー
- `letter-bg-*`: キーボードキーの背景（`<path id="letter-bg-q">`）
- `letters-*` / `letter-*`: キーボードキー上の文字（`<text id="letter-lower-q">`）
- `hand-*`: ハンドジェスチャーのグループ（`<g id="hand-q">`）。コンポーネントはこれらのグループの表示を切り替えてジェスチャーを連携させます

## キー割り当て（データ層）

コンポーネントには 2 層の組み込みマッピングがあります:

```text
KeyboardEvent.code  →  キー名           （例: KeyQ → q）
キー名              →  指 / SVG id    （例: q → lp → letter-bg-q / hand-q）
```

デフォルトのマッピングはソース [`src/vkeyboardhand.js`](./src/vkeyboardhand.js) の `KEY_MAP` と `FINGER_MAP` にあり、`options.keyMap` / `options.fingerMap` で上書きできます:

```js
const kb = VKeyboardHand.create('#demo', {
  fingerMap: { q: 'li' } // カスタム: q を左手人差し指に再マッピング
});
```

## 開発とビルド

```bash
pnpm install        # 開発依存をインストール（現在は 0、純粋な Node ビルド）
pnpm build      # dist/ を生成（UMD + ESM + CSS）
pnpm preview    # index.html をローカルプレビュー
```

## ディレクトリ構造:

```text
├── src/
│   ├── vkeyboardhand.js     # コンポーネントソース（UMD、<script> で直接読み込み可能）
│   └── vkeyboardhand.css    # コンポーネントスタイル
├── dist/
│   ├── vkeyboardhand.umd.js # UMD ビルド（ブラウザ / CommonJS / AMD）
│   ├── vkeyboardhand.esm.mjs# ESM ビルド（Vite / Webpack / Rollup / Node）
│   └── vkeyboardhand.css    # CSS ビルド
├── examples/                # Vue / React / Angular / ESM のサンプル
├── scripts/build.mjs        # ビルドスクリプト
├── svg/                     # キーボードとジェスチャーのベクターアセット（keyboard.svg / hand.svg）
├── colorful.md              # 虹色キーボードのスタイル規約
├── index.html               # コンポーネントのデモページ
└── package.json
```

## npm への自動公開

GitHub Actions のワークフローが品質ゲートとリリースを処理します:

- **`.github/workflows/ci.yml`** — `main` への push / プルリクエスト時: `npm run build` + `npm test` を実行（品質ゲートのみ）
- **`.github/workflows/release.yml`** — タグ `v*` 時: `package.json` のバージョンがタグと一致することを検証し、`NPM_TOKEN` シークレットで `npm publish` を実行し、自動生成されたノート付きの GitHub Release を作成

初回セットアップ: npmjs.com で **Automation** トークン（publish 権限）を生成し、リポジトリのシークレットとして `NPM_TOKEN` を追加します（Settings → Secrets and variables → Actions）。

リリースの流れ:

```bash
npm version patch            # package.json を更新し、タグ v1.0.1 を作成
git push origin main --tags  # コミットとタグを push: CI が実行され、その後 release.yml が npm に公開
```

## ブラウザ対応

標準 API（`fetch`、`DOMParser`、`classList`、`KeyboardEvent`）に依存し、すべてのモダンブラウザ（Chrome / Edge / Firefox / Safari）をサポートします。

## 謝辞
- [SVG キーボード](https://commons.wikimedia.org/wiki/File:Keyboard_US.svg)（Wikimedia Commons、CC BY-SA 4.0）
- [nvm](https://www.nvmnode.com)（NVM - Node.js Version Manager Tool）
- [markdown](https://www.markdownlang.com)（markdown）

## ⭐ Star ヒストリー

<a href="https://www.star-history.com/?repos=ayuday%2Fvkeyboardhand&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&theme=dark&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
 </picture>
</a>

## License

[MIT](./LICENSE)
