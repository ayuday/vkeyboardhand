# ⌨️ vkeyboardhand

대화형 가상 키보드 터치 타이핑 교육 컴포넌트

**SVG 키보드 그림 + SVG 손동작 그림 + JavaScript 이벤트 기반** 연동으로 구현된 대화형 터치 타이핑 교육 시스템입니다. 순수 HTML + JS로 구현되어 종속성이 없으며, **Vue / React / Angular** 등 프런트엔드 프레임워크와 호환되고 **로컬 도입, CDN, npm** 사용 방식을 지원합니다.

**저장소**: [GitHub](https://github.com/ayuday/vkeyboardhand) · [Issues](https://github.com/ayuday/vkeyboardhand/issues) · [npm](https://www.npmjs.com/package/vkeyboardhand)

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



## 기능

- 🎹 SVG 키보드 + 🖐 SVG 손동작 연동: 실제 키를 누르면(또는 키를 클릭하면) 해당 키가 하이라이트되고 손동작이 동기화되어 전환되며, 손가락 힌트 바에 "어느 손가락으로 어느 키를 누르는지"가 실시간으로 표시됩니다.
- ⌨️ `KeyboardEvent` 기반: `keydown` / `keyup`을 수신하며 `Shift` / `Alt` 등의 조합키 손동작을 지원합니다.
- 🎨 무지개 색 구성(기본 테마): 키를 손가락 영역별로 채색하고, 왼쪽은 차가운 색, 오른쪽은 따뜻한 색으로 무지개 그라데이션을 형성합니다(색상 규칙은 `colorful.md` 참조).
- 🧩 프레임워크 무관: 컴포넌트는 DOM만 조작하며 프레임워크에 의존하지 않습니다. Vue / React / Angular에서 바로 사용할 수 있습니다.
- 📦 세 가지 도입 방식: 로컬 `<script>`, CDN, npm + ESM.
- ⚙️ 완전한 API: `press / release / play / reset / setTheme / setClickEnabled / getState / destroy` 및 이벤트 콜백.
- 🗂 키 매핑 테이블(데이터 계층): `키 → 손가락 → SVG id` 3계층 매핑으로, 설정을 통해 재정의할 수 있습니다.

## 기술 스택

- **SVG(인라인 주입)**: 키보드 그림 + 손가락 손동작 그림
- **JavaScript DOM 조작**: SVG 요소의 표시·스타일 제어
- **KeyboardEvent API**: 사용자의 키 입력 감지
- **CSS Transition / Animation**: 키 입력 애니메이션, 하이라이트 전환
- **키 매핑 테이블(데이터)**: 키 → 손가락 → SVG id 대응 관계
- **fetch / 인라인**: SVG 파일 로드

## 설치

### 방법 1: 순수 HTML + JS(로컬 도입 / CDN)

```html
<!-- 컴포넌트 스타일 -->
<link rel="stylesheet" href="dist/vkeyboardhand.css">
<!-- 컴포넌트 스크립트(UMD, window.VKeyboardHand로 마운트) -->
<script src="dist/vkeyboardhand.umd.js"></script>

<div id="demo"></div>

<script>
  var kb = VKeyboardHand.create('#demo', {
    keyboard: './svg/keyboard.svg', // 키보드 SVG(URL / 인라인 문자열 / SVGElement)
    hand: './svg/hand.svg'          // 손동작 SVG
  });
</script>
```

npm에 배포한 후에는 CDN(jsDelivr / unpkg)에서 바로 사용할 수 있습니다:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/dist/vkeyboardhand.css">
<script src="https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/dist/vkeyboardhand.umd.js"></script>
<!-- 또는 -->
<link rel="stylesheet" href="https://unpkg.com/vkeyboardhand@latest/dist/vkeyboardhand.css">
<script src="https://unpkg.com/vkeyboardhand@latest/dist/vkeyboardhand.umd.js"></script>
```

> 키보드 그림과 손동작 그림은 패키지 내부에서 가져올 수 있습니다: `https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/svg/keyboard.svg`, `.../svg/hand.svg`.

### 방법 2: npm 설치(Vue / React / Angular)

```bash
npm install vkeyboardhand
```

```js
// 스타일 가져오기(엔트리 파일 또는 컴포넌트에서)
import 'vkeyboardhand/vkeyboardhand.css';
// 컴포넌트 가져오기
import VKeyboardHand from 'vkeyboardhand';

const kb = VKeyboardHand.create(document.getElementById('demo'), {
  keyboard: '/assets/svg/keyboard.svg',
  hand: '/assets/svg/hand.svg'
});
```

> 참고: `keyboard` / `hand`는 **SVG 파일 URL, SVG 문자열, 기존 SVGElement** 소스를 모두 지원합니다. 번들러에서는 `import kbSvg from 'vkeyboardhand/svg/keyboard.svg?raw'`로 불러와 문자열을 그대로 전달할 수도 있습니다.

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

> 완전히 실행 가능한 예제는 [`examples/`](./examples)에 있습니다: `vue.html`, `react.html`, `esm.html`, `angular/app.component.ts`.

## API 레퍼런스

### 옵션

| 옵션 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `keyboard` | `string \| SVGElement` | `'./svg/keyboard.svg'` | 키보드 SVG: URL / 인라인 문자열 / 요소 |
| `hand` | `string \| SVGElement` | `'./svg/hand.svg'` | 손동작 SVG: URL / 인라인 문자열 / 요소 |
| `theme` | `string` | `'colorful'` | 테마: `colorful`(기본 무지개) / `bone` / `dark` / `robot` / `kingfish` / `milk` |
| `listenKeyboard` | `boolean` | `true` | 실제 키보드 감지 여부 |
| `enableClick` | `boolean` | `true` | 데모용 키 클릭 허용 여부 |
| `preventScroll` | `boolean` | `true` | 스페이스바 / 방향키 등 페이지 스크롤 방지 |
| `showFingerLabel` | `boolean` | `true` | 손가락 힌트 바 표시 |
| `showFingerColors` | `boolean` | `false` | 키를 손가락별로 채색(`colorful` 테마에서는 기본 켜짐, 그 외 테마에서는 수동으로 켤 수 있음) |
| `showBanner` | `boolean` | `true` | 초기화 후 콘솔에 버전 + 저장소 배너 출력 |
| `showHandBoth` | `boolean` | `true` | 키를 누르는 동안 자연스러운 손 표시 방식: `true`는 양손의 자연 상태를 배경으로 유지하며 누른 손동작과 나란히 표시; `false`는 같은 쪽 자연 상태를 키 손동작으로 대체(숨김)하고 반대쪽 자연 상태는 유지. 모두 놓으면 양손 자연 상태가 복원됩니다 |
| `holdDelay` | `number` | `80` | 손동작 전환 지연 시간(ms) |
| `keyboardClass` | `string` | `'standard-kb'` | 키보드 SVG 추가 클래스명 |
| `keyMap` | `object` | `KEY_MAP` | `KeyboardEvent.code → key` 매핑 재정의 |
| `fingerMap` | `object` | `FINGER_MAP` | `key → 손가락` 매핑 재정의 |
| `onReady(kb)` | `function` | - | 컴포넌트 로드·렌더링 완료 시 호출 |
| `onKeyDown(info, kb)` | `function` | - | 키 눌림 콜백 |
| `onKeyUp(info, kb)` | `function` | - | 키 뗌 콜백 |
| `onKeyClick(info, kb)` | `function` | - | 키 클릭 콜백 |
| `onError(err)` | `function` | - | 로드 / 렌더링 오류 콜백 |

### 인스턴스 메서드

| 메서드 | 설명 |
| --- | --- |
| `press(key, meta?)` | 지정한 키를 누릅니다(`key`는 키 이름, 예: `'q'`, `'shift-left'`) |
| `release(key, meta?)` | 지정한 키를 뗍니다 |
| `play(keys, options?)` | 키 시퀀스를 재생합니다(예: `kb.play('hello')`). 키별 누름 시간·간격과 선택적 `loop` 자동 반복을 설정할 수 있으며 Promise를 반환합니다 |
| `reset()` | 모든 하이라이트와 손동작을 리셋(양손 자연 휴지 위치로 복귀) |
| `setTheme(theme)` | 테마 전환 |
| `setClickEnabled(bool)` | 클릭 데모 활성 / 비활성 |
| `setShowHandBoth(bool)` | 누르는 동안 양손 자연 상태 유지 여부 전환 |
| `getState()` | 현재 눌려 있는 키 목록 가져오기 |
| `getFinger(key)` | 키의 손가락 정보 가져오기 |
| `destroy()` | 컴포넌트 파기, 리스너와 DOM 해제 |

콜백 페이로드 예시:

```js
{
  key: 'q',            // 키 이름
  code: 'q',           // 호환성 필드
  finger: 'lp',        // 손가락 id
  fingerName: 'left pinky', // 손가락 이름
  held: ['q']          // 현재 눌려 있는 모든 키
}
```

### 손가락 id와 색상

| finger id | 의미 | 기본 색상 |
| --- | --- | --- |
| `lp` | 왼손 새끼손가락 | `#ff9f43` |
| `lr` | 왼손 약지 | `#f368e0` |
| `lm` | 왼손 가운데손가락 | `#17c0eb` |
| `li` | 왼손 집게손가락 | `#1dd1a1` |
| `ri` | 오른손 집게손가락 | `#0abde3` |
| `rm` | 오른손 가운데손가락 | `#a29bfe` |
| `rr` | 오른손 약지 | `#fd79a8` |
| `rp` | 오른손 새끼손가락 | `#fdcb6e` |
| `th` | 엄지(스페이스바) | `#6c5ce7` |

CSS 변수로 재정의할 수 있습니다:

```css
.vk-hand {
  --vk-finger-lp: #ff6348;
  --vk-accent: #38bdf8; /* 키 입력 하이라이트 색상 */
}
```

### 무지개 테마 색상(colorful.md 규칙)

기본 `colorful` 테마에서는 키캡을 손가락 영역별로 채색하며, 테두리 / 배경 색상은 `colorful.md`를 따릅니다:

| 손가락 | 테두리 색상 | 배경 색상 |
| --- | --- | --- |
| 왼손 새끼손가락 | `#d6a0b9` 핑크 | `#fff0f6` 연한 핑크 |
| 왼손 약지 | `#c6a4df` 보라 | `#f7efff` 연한 보라 |
| 왼손 가운데손가락 | `#9fb4e3` 청보라 | `#eef4ff` 연한 청보라 |
| 왼손 집게손가락 | `#83bec2` 청록 | `#eaf9f8` 연한 청록 |
| 오른손 집게손가락 | `#8ac29c` 초록 | `#eef9f1` 연한 초록 |
| 오른손 가운데손가락 | `#c2bb76` 황록 | `#fffbe8` 연한 노랑 |
| 오른손 약지 | `#d9aa71` 주황 | `#fff4e8` 연한 주황 |
| 오른손 새끼손가락 | `#d69a98` 빨강 | `#fff0ef` 연한 빨강 |
| 엄지 | `#9fa8b5` 회청 | `#f2f4f7` 연한 회색 |

키 상태는 colorful.md의 우선순위를 따릅니다: 누름(`#303a4a` 진한 회청색 채움 + 흰 글자)이 무지개 배경을 덮습니다. 전체 규칙은 [colorful.md](./colorful.md)를 참조하세요.

## 에셋 파일

- `svg/keyboard.svg`: 가상 키보드 벡터 그래픽
- `keyboard.md`: svg/keyboard.svg 내 `id` 선택자와 실제 키보드 키의 매핑표
- `colorful.md`: 무지개 키보드 스타일 규칙(손가락 영역 색상과 키 상태 덮어쓰기 색상)
- `keyboard.html`: 가상 키보드 벡터 그래픽 스타일 미리보기
- `svg/hand.svg`: 키보드 손동작 벡터 그래픽
- `hand.md`: svg/hand.svg 내 `id` 선택자와 실제 키보드 키 손동작의 매핑표
- `keyboard+hand.html`: 가상 키보드 + 손동작 그래픽 스타일 미리보기
- `letter-bg-*`: 키보드 키 배경(`<path id="letter-bg-q">`)
- `letters-*` / `letter-*`: 키보드 키 위의 문자(`<text id="letter-lower-q">`)
- `hand-*`: 손동작 그룹(`<g id="hand-q">`). 컴포넌트는 이 그룹의 표시 여부를 토글하여 손동작을 연동합니다

## 키 매핑(데이터 계층)

컴포넌트에는 2계층의 내장 매핑이 있습니다:

```text
KeyboardEvent.code  →  키 이름           (예: KeyQ → q)
키 이름             →  손가락 / SVG id    (예: q → lp → letter-bg-q / hand-q)
```

기본 매핑은 소스 [`src/vkeyboardhand.js`](./src/vkeyboardhand.js)의 `KEY_MAP`과 `FINGER_MAP`에 있으며, `options.keyMap` / `options.fingerMap`으로 재정의할 수 있습니다:

```js
const kb = VKeyboardHand.create('#demo', {
  fingerMap: { q: 'li' } // 커스텀: q를 왼손 집게손가락으로 재매핑
});
```

## 개발과 빌드

```bash
pnpm install        # 개발 종속성 설치(현재 0, 순수 Node 빌드)
pnpm build      # dist/ 생성(UMD + ESM + CSS)
pnpm preview    # index.html 로컬 미리보기
```

## 디렉터리 구조:

```text
├── src/
│   ├── vkeyboardhand.js     # 컴포넌트 소스(UMD, <script>로 직접 포함 가능)
│   └── vkeyboardhand.css    # 컴포넌트 스타일
├── dist/
│   ├── vkeyboardhand.umd.js # UMD 빌드(브라우저 / CommonJS / AMD)
│   ├── vkeyboardhand.esm.mjs# ESM 빌드(Vite / Webpack / Rollup / Node)
│   └── vkeyboardhand.css    # CSS 빌드
├── examples/                # Vue / React / Angular / ESM 예제
├── scripts/build.mjs        # 빌드 스크립트
├── svg/                     # 키보드와 손동작 벡터 에셋(keyboard.svg / hand.svg)
├── colorful.md              # 무지개 키보드 스타일 규칙
├── index.html               # 컴포넌트 데모 페이지
└── package.json
```

## npm 자동 배포

GitHub Actions 워크플로가 품질 게이트와 릴리스를 처리합니다:

- **`.github/workflows/ci.yml`** — `main` push / PR 시: `npm run build` + `npm test` 실행(품질 게이트 전용)
- **`.github/workflows/release.yml`** — 태그 `v*` 시: `package.json` 버전이 태그와 일치하는지 검증하고, `NPM_TOKEN` 시크릿으로 `npm publish`를 실행하며, 자동 생성된 노트가 포함된 GitHub Release를 생성

최초 설정: npmjs.com에서 **Automation** 토큰(publish 권한)을 생성한 뒤 리포지토리 시크릿에 `NPM_TOKEN`으로 추가합니다(Settings → Secrets and variables → Actions).

릴리스 절차:

```bash
npm version patch            # package.json 업데이트 + 태그 v1.0.1 생성
git push origin main --tags  # 커밋과 태그 push: CI 실행 후 release.yml이 npm에 배포
```

## 브라우저 지원

표준 API(`fetch`, `DOMParser`, `classList`, `KeyboardEvent`)에 의존하며 모든 최신 브라우저(Chrome / Edge / Firefox / Safari)를 지원합니다.

## 감사의 말
- [SVG 키보드](https://commons.wikimedia.org/wiki/File:Keyboard_US.svg)(Wikimedia Commons, CC BY-SA 4.0)
- [nvm](https://www.nvmnode.com)(NVM - Node.js Version Manager Tool)
- [markdown](https://www.markdownlang.com)(markdown)

## ⭐ Star 히스토리

<a href="https://www.star-history.com/?repos=ayuday%2Fvkeyboardhand&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&theme=dark&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
 </picture>
</a>

## License

[MIT](./LICENSE)
