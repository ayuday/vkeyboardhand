# ⌨️ vkeyboardhand

Интерактивный виртуальный компонент для обучения слепому набору текста

Интерактивная система обучения слепой печати на основе **SVG-клавиатуры + SVG-схемы жестов рук + JavaScript, управляемого событиями**. Чистые HTML + JS, ноль зависимостей, совместим с **Vue / React / Angular** и другими фронтенд-фреймворками, поддерживает **локальное подключение, CDN и npm**.

**Репозиторий**: [GitHub](https://github.com/ayuday/vkeyboardhand) · [Issues](https://github.com/ayuday/vkeyboardhand/issues) · [npm](https://www.npmjs.com/package/vkeyboardhand)

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



## Возможности

- 🎹 SVG-клавиатура + 🖐 SVG-жесты рук: при нажатии реальной клавиши (или клике по клавише) соответствующая клавиша подсвечивается, жест руки синхронно меняется, а панель подсказок в реальном времени показывает, «каким пальцем какую клавишу нажимать».
- ⌨️ Управление событиями `KeyboardEvent`: прослушивает `keydown` / `keyup`, поддерживает комбинации вроде `Shift` / `Alt`.
- 🎨 Радужная цветовая схема (тема по умолчанию): клавиши окрашены по зонам пальцев — холодные слева и тёплые справа, образуя радужный градиент (см. соглашения о цветах в `colorful.md`).
- 🧩 Не зависит от фреймворка: компонент работает только с DOM, не зависит от фреймворков и работает напрямую в Vue / React / Angular.
- 📦 Три способа подключения: локальный `<script>`, CDN, npm + ESM.
- ⚙️ Полный API: `press / release / play / reset / setTheme / setClickEnabled / getState / destroy` плюс колбэки событий.
- 🗂 Таблица сопоставления клавиш (слой данных): трёхуровневое сопоставление `клавиша → палец → SVG id`, которое можно переопределить через конфигурацию.

## Технологический стек

- **SVG (внедряемый инлайн)**: схема клавиатуры + схема жестов пальцев
- **Работа с DOM на JavaScript**: управление видимостью и стилями SVG-элементов
- **API KeyboardEvent**: прослушивание нажатий клавиш пользователем
- **CSS Transition / Animation**: анимации нажатия клавиш, переходы подсветки
- **Таблица сопоставления клавиш (данные)**: соответствия `клавиша → палец → SVG id`
- **fetch / инлайн**: загрузка SVG-файлов

## Установка

### Способ 1: чистый HTML + JS (локальное подключение / CDN)

```html
<!-- Стили компонента -->
<link rel="stylesheet" href="dist/vkeyboardhand.css">
<!-- Скрипт компонента (UMD, монтируется как window.VKeyboardHand) -->
<script src="dist/vkeyboardhand.umd.js"></script>

<div id="demo"></div>

<script>
  var kb = VKeyboardHand.create('#demo', {
    keyboard: './svg/keyboard.svg', // клавиатура SVG (URL / инлайн-строка / SVGElement)
    hand: './svg/hand.svg'          // SVG жестов рук
  });
</script>
```

После публикации в npm его можно использовать напрямую с CDN (jsDelivr / unpkg):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/dist/vkeyboardhand.css">
<script src="https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/dist/vkeyboardhand.umd.js"></script>
<!-- или -->
<link rel="stylesheet" href="https://unpkg.com/vkeyboardhand@latest/dist/vkeyboardhand.css">
<script src="https://unpkg.com/vkeyboardhand@latest/dist/vkeyboardhand.umd.js"></script>
```

> Схему клавиатуры и жестов рук можно получить из пакета: `https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/svg/keyboard.svg`, `.../svg/hand.svg`.

### Способ 2: установка через npm (Vue / React / Angular)

```bash
npm install vkeyboardhand
```

```js
// Импорт стилей (во входном файле или компоненте)
import 'vkeyboardhand/vkeyboardhand.css';
// Импорт компонента
import VKeyboardHand from 'vkeyboardhand';

const kb = VKeyboardHand.create(document.getElementById('demo'), {
  keyboard: '/assets/svg/keyboard.svg',
  hand: '/assets/svg/hand.svg'
});
```

> Примечание: `keyboard` / `hand` принимают **URL SVG-файла, SVG-строку или существующий SVGElement** в качестве источника. В сборщиках можно также `import kbSvg from 'vkeyboardhand/svg/keyboard.svg?raw'` и передать строку напрямую.

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

> Полностью рабочие примеры находятся в [`examples/`](./examples): `vue.html`, `react.html`, `esm.html`, `angular/app.component.ts`.

## Справочник API

### Параметры (options)

| Параметр | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `keyboard` | `string \| SVGElement` | `'./svg/keyboard.svg'` | Клавиатура SVG: URL / инлайн-строка / элемент |
| `hand` | `string \| SVGElement` | `'./svg/hand.svg'` | SVG жестов рук: URL / инлайн-строка / элемент |
| `theme` | `string` | `'colorful'` | Тема: `colorful` (радуга по умолчанию) / `bone` / `dark` / `robot` / `kingfish` / `milk` |
| `listenKeyboard` | `boolean` | `true` | Слушать ли реальную клавиатуру |
| `enableClick` | `boolean` | `true` | Разрешён ли клик по клавишам для демонстрации |
| `preventScroll` | `boolean` | `true` | Предотвращает прокрутку страницы пробелом / стрелками и т.д. |
| `showFingerLabel` | `boolean` | `true` | Показывать панель подсказок пальцев |
| `showFingerColors` | `boolean` | `false` | Окрашивать клавиши по пальцам (включено по умолчанию в теме `colorful`, в остальных можно включить вручную) |
| `showBanner` | `boolean` | `true` | Выводить баннер версии + репозитория в консоль после инициализации |
| `showHandBoth` | `boolean` | `true` | Как показывать естественные руки при удержании клавиши: `true` — обе нейтральные руки остаются видимыми как фон рядом с нажатым жестом; `false` — нейтральная рука той же стороны заменяется жестом клавиши (скрывается), а нейтральная рука противоположной стороны остаётся видимой; обе нейтральные руки возвращаются после отпускания |
| `holdDelay` | `number` | `80` | Задержка перехода жеста (мс) |
| `keyboardClass` | `string` | `'standard-kb'` | Дополнительное имя класса для SVG-клавиатуры |
| `keyMap` | `object` | `KEY_MAP` | Переопределяет сопоставление `KeyboardEvent.code → key` |
| `fingerMap` | `object` | `FINGER_MAP` | Переопределяет сопоставление `key → палец` |
| `onReady(kb)` | `function` | - | Срабатывает, когда компонент загружен и отрисован |
| `onKeyDown(info, kb)` | `function` | - | Колбэк нажатия клавиши |
| `onKeyUp(info, kb)` | `function` | - | Колбэк отпускания клавиши |
| `onKeyClick(info, kb)` | `function` | - | Колбэк клика по клавише |
| `onError(err)` | `function` | - | Колбэк ошибки загрузки / отрисовки |

### Методы экземпляра

| Метод | Описание |
| --- | --- |
| `press(key, meta?)` | Нажать указанную клавишу (`key` — имя клавиши, напр. `'q'`, `'shift-left'`) |
| `release(key, meta?)` | Отпустить указанную клавишу |
| `play(keys, options?)` | Воспроизвести последовательность клавиш (напр. `kb.play('hello')`) с временем удержания и паузой для каждой клавиши, плюс опциональный `loop` для автоповтора; возвращает Promise |
| `reset()` | Сбросить все подсветки и жесты (вернуть обе руки в естественное положение) |
| `setTheme(theme)` | Переключить тему |
| `setClickEnabled(bool)` | Включить / выключить клик-демонстрацию |
| `setShowHandBoth(bool)` | Включить / выключить отображение обеих нейтральных рук при нажатии |
| `getState()` | Получить список клавиш, удерживаемых в данный момент |
| `getFinger(key)` | Получить информацию о пальце для клавиши |
| `destroy()` | Уничтожить компонент, освободить слушателей и DOM |

Пример полезной нагрузки колбэка:

```js
{
  key: 'q',            // имя клавиши
  code: 'q',           // поле совместимости
  finger: 'lp',        // id пальца
  fingerName: 'left pinky', // имя пальца
  held: ['q']          // все клавиши, удерживаемые в данный момент
}
```

### ID пальцев и цвета

| finger id | Значение | Цвет по умолчанию |
| --- | --- | --- |
| `lp` | левый мизинец | `#ff9f43` |
| `lr` | левый безымянный | `#f368e0` |
| `lm` | левый средний | `#17c0eb` |
| `li` | левый указательный | `#1dd1a1` |
| `ri` | правый указательный | `#0abde3` |
| `rm` | правый средний | `#a29bfe` |
| `rr` | правый безымянный | `#fd79a8` |
| `rp` | правый мизинец | `#fdcb6e` |
| `th` | большой палец (пробел) | `#6c5ce7` |

Можно переопределить через CSS-переменные:

```css
.vk-hand {
  --vk-finger-lp: #ff6348;
  --vk-accent: #38bdf8; /* цвет подсветки нажатия */
}
```

### Цвета радужной темы (соглашения colorful.md)

В теме `colorful` по умолчанию колпачки клавиш окрашиваются по зонам пальцев, а цвета границ / фона берутся из `colorful.md`:

| Палец | Цвет границы | Цвет фона |
| --- | --- | --- |
| Левый мизинец | `#d6a0b9` розовый | `#fff0f6` светло-розовый |
| Левый безымянный | `#c6a4df` фиолетовый | `#f7efff` светло-фиолетовый |
| Левый средний | `#9fb4e3` сине-фиолетовый | `#eef4ff` светло-сине-фиолетовый |
| Левый указательный | `#83bec2` бирюзовый | `#eaf9f8` светло-бирюзовый |
| Правый указательный | `#8ac29c` зелёный | `#eef9f1` светло-зелёный |
| Правый средний | `#c2bb76` жёлто-зелёный | `#fffbe8` светло-жёлтый |
| Правый безымянный | `#d9aa71` оранжевый | `#fff4e8` светло-оранжевый |
| Правый мизинец | `#d69a98` красный | `#fff0ef` светло-красный |
| Большой палец | `#9fa8b5` серо-голубой | `#f2f4f7` светло-серый |

Состояние клавиши соответствует приоритету colorful.md: нажатие (`#303a4a` тёмно-серо-голубая заливка + белый текст) перекрывает радужный фон. Полные соглашения см. в [colorful.md](./colorful.md).

## Файлы ресурсов

- `svg/keyboard.svg`: векторная графика виртуальной клавиатуры
- `keyboard.md`: сопоставление селекторов `id` в svg/keyboard.svg с клавишами физической клавиатуры
- `colorful.md`: соглашения о стиле радужной клавиатуры (цвета зон пальцев и цвета переопределения состояния клавиш)
- `keyboard.html`: предпросмотр стиля векторной графики виртуальной клавиатуры
- `svg/hand.svg`: векторная графика жестов рук на клавиатуре
- `hand.md`: сопоставление селекторов `id` в svg/hand.svg с жестами клавиш физической клавиатуры
- `keyboard+hand.html`: предпросмотр стиля графики виртуальной клавиатуры + жестов рук
- `letter-bg-*`: фон клавиш клавиатуры (`<path id="letter-bg-q">`)
- `letters-*` / `letter-*`: буквы или символы на клавишах (`<text id="letter-lower-q">`)
- `hand-*`: группы жестов (`<g id="hand-q">`); компонент переключает видимость этих групп для связи жестов

## Сопоставление клавиш (слой данных)

В компоненте два встроенных слоя сопоставления:

```text
KeyboardEvent.code  →  имя клавиши        (напр. KeyQ → q)
имя клавиши         →  палец / SVG id     (напр. q → lp → letter-bg-q / hand-q)
```

Сопоставления по умолчанию находятся в `KEY_MAP` и `FINGER_MAP` в исходнике [`src/vkeyboardhand.js`](./src/vkeyboardhand.js) и могут быть переопределены через `options.keyMap` / `options.fingerMap`:

```js
const kb = VKeyboardHand.create('#demo', {
  fingerMap: { q: 'li' } // кастомно: переназначить q на левый указательный палец
});
```

## Разработка и сборка

```bash
pnpm install        # установить dev-зависимости (сейчас 0, чистая сборка Node)
pnpm build      # создать dist/ (UMD + ESM + CSS)
pnpm preview    # локальный предпросмотр index.html
```

## Структура каталога:

```text
├── src/
│   ├── vkeyboardhand.js     # исходник компонента (UMD, можно подключить через <script>)
│   └── vkeyboardhand.css    # стили компонента
├── dist/
│   ├── vkeyboardhand.umd.js # сборка UMD (браузер / CommonJS / AMD)
│   ├── vkeyboardhand.esm.mjs# сборка ESM (Vite / Webpack / Rollup / Node)
│   └── vkeyboardhand.css    # сборка CSS
├── examples/                # примеры Vue / React / Angular / ESM
├── scripts/build.mjs        # скрипт сборки
├── svg/                     # векторные ресурсы клавиатуры и жестов (keyboard.svg / hand.svg)
├── colorful.md              # соглашения о стиле радужной клавиатуры
├── index.html               # страница демонстрации компонента
└── package.json
```

## Автопубликация в npm

Рабочие процессы GitHub Actions обрабатывают проверки качества и релизы:

- **`.github/workflows/ci.yml`** — при push в `main` / pull request: запускает `npm run build` + `npm test` (только проверка качества)
- **`.github/workflows/release.yml`** — при теге `v*`: проверяет, что версия в `package.json` совпадает с тегом, запускает `npm publish` с секретом `NPM_TOKEN` и создаёт GitHub Release с автоматически сгенерированными заметками

Единоразовая настройка: сгенерируйте **Automation**-токен на npmjs.com (право на публикацию), затем добавьте его как секрет репозитория `NPM_TOKEN` (Settings → Secrets and variables → Actions).

Процесс релиза:

```bash
npm version patch            # увеличить версию в package.json + создать тег v1.0.1
git push origin main --tags  # отправить коммит и тег: запустится CI, затем release.yml опубликует в npm
```

## Поддержка браузеров

Поддерживает все современные браузеры (Chrome / Edge / Firefox / Safari), полагаясь на стандартные API: `fetch`, `DOMParser`, `classList`, `KeyboardEvent`.

## Благодарности
- [SVG-клавиатура](https://commons.wikimedia.org/wiki/File:Keyboard_US.svg) (Wikimedia Commons, CC BY-SA 4.0)
- [nvm](https://www.nvmnode.com) (NVM - Node.js Version Manager Tool)
- [markdown](https://www.markdownlang.com) (markdown)

## ⭐ История звёзд

<a href="https://www.star-history.com/?repos=ayuday%2Fvkeyboardhand&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&theme=dark&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
 </picture>
</a>

## Лицензия

[MIT](./LICENSE)
