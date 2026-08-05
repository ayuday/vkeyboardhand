# ⌨️ vkeyboardhand

Componente interactivo de enseñanza de mecanografía táctil con teclado virtual

Sistema interactivo de enseñanza de mecanografía táctil impulsado por la integración de **teclado SVG + diagrama de gestos de manos en SVG + JavaScript orientado a eventos**. HTML + JS puros, cero dependencias, compatible con **Vue / React / Angular** y otros frameworks de frontend, con soporte para **importación local, CDN y npm**.

**Repositorio**: [GitHub](https://github.com/ayuday/vkeyboardhand) · [Issues](https://github.com/ayuday/vkeyboardhand/issues) · [npm](https://www.npmjs.com/package/vkeyboardhand)

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



## Características

- 🎹 Teclado SVG + 🖐 Gestos de manos SVG sincronizados: al presionar una tecla real (o hacer clic en una tecla), la tecla correspondiente se ilumina, el gesto de la mano cambia en sincronía y una barra de pista de dedos muestra en tiempo real «qué dedo presiona qué tecla».
- ⌨️ Orientado por `KeyboardEvent`: escucha `keydown` / `keyup`, admite gestos combinados como `Shift` / `Alt`.
- 🎨 Esquema de colores arcoíris (tema predeterminado): las teclas se colorean por zonas de dedos, frías a la izquierda y cálidas a la derecha, formando un degradado de arcoíris (consulta las convenciones de color en `colorful.md`).
- 🧩 Independiente de framework: el componente solo manipula el DOM, no depende de ningún framework y funciona directamente en Vue / React / Angular.
- 📦 Tres formas de importación: `<script>` local, CDN, npm + ESM.
- ⚙️ API completa: `press / release / play / reset / setTheme / setClickEnabled / getState / destroy` más callbacks de eventos.
- 🗂 Tabla de mapeo de teclas (capa de datos): mapeo de tres niveles `tecla → dedo → SVG id`, que se puede sobrescribir mediante configuración.

## Stack tecnológico

- **SVG (inyectado en línea)**: diagrama del teclado + diagrama de gestos de los dedos
- **Manipulación del DOM con JavaScript**: controla la visibilidad y los estilos de los elementos SVG
- **API KeyboardEvent**: escucha las teclas presionadas por el usuario
- **CSS Transition / Animation**: animaciones de presión de teclas, transiciones de resaltado
- **Tabla de mapeo de teclas (datos)**: correspondencias `tecla → dedo → SVG id`
- **fetch / en línea**: carga archivos SVG

## Instalación

### Método 1: HTML + JS puros (importación local / CDN)

```html
<!-- Estilos del componente -->
<link rel="stylesheet" href="dist/vkeyboardhand.css">
<!-- Script del componente (UMD, montado como window.VKeyboardHand) -->
<script src="dist/vkeyboardhand.umd.js"></script>

<div id="demo"></div>

<script>
  var kb = VKeyboardHand.create('#demo', {
    keyboard: './svg/keyboard.svg', // teclado SVG (URL / cadena en línea / SVGElement)
    hand: './svg/hand.svg'          // SVG de gestos de la mano
  });
</script>
```

Una vez publicado en npm, se puede usar directamente desde un CDN (jsDelivr / unpkg):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/dist/vkeyboardhand.css">
<script src="https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/dist/vkeyboardhand.umd.js"></script>
<!-- o -->
<link rel="stylesheet" href="https://unpkg.com/vkeyboardhand@latest/dist/vkeyboardhand.css">
<script src="https://unpkg.com/vkeyboardhand@latest/dist/vkeyboardhand.umd.js"></script>
```

> Los SVG del teclado y de los gestos de manos se pueden obtener del paquete: `https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/svg/keyboard.svg`, `.../svg/hand.svg`.

### Método 2: instalación con npm (Vue / React / Angular)

```bash
npm install vkeyboardhand
```

```js
// Importar estilos (en el archivo de entrada o en un componente)
import 'vkeyboardhand/vkeyboardhand.css';
// Importar el componente
import VKeyboardHand from 'vkeyboardhand';

const kb = VKeyboardHand.create(document.getElementById('demo'), {
  keyboard: '/assets/svg/keyboard.svg',
  hand: '/assets/svg/hand.svg'
});
```

> Nota: `keyboard` / `hand` aceptan **URL de archivo SVG, cadena SVG o SVGElement existente** como fuentes. En los bundlers también puedes usar `import kbSvg from 'vkeyboardhand/svg/keyboard.svg?raw'` y pasar la cadena directamente.

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

> Los ejemplos totalmente ejecutables viven en [`examples/`](./examples): `vue.html`, `react.html`, `esm.html`, `angular/app.component.ts`.

## Referencia de la API

### Opciones

| Opción | Tipo | Predeterminado | Descripción |
| --- | --- | --- | --- |
| `keyboard` | `string \| SVGElement` | `'./svg/keyboard.svg'` | Teclado SVG: URL / cadena en línea / elemento |
| `hand` | `string \| SVGElement` | `'./svg/hand.svg'` | SVG de gestos de la mano: URL / cadena en línea / elemento |
| `theme` | `string` | `'colorful'` | Tema: `colorful` (arcoíris predeterminado) / `bone` / `dark` / `robot` / `kingfish` / `milk` |
| `listenKeyboard` | `boolean` | `true` | Si escucha el teclado real |
| `enableClick` | `boolean` | `true` | Si se permite hacer clic en las teclas para la demo |
| `preventScroll` | `boolean` | `true` | Evita que la barra espaciadora / las flechas etc. desplacen la página |
| `showFingerLabel` | `boolean` | `true` | Muestra la barra de pista de dedos |
| `showFingerColors` | `boolean` | `false` | Colorea las teclas por dedo (activado por defecto en el tema `colorful`, se puede activar manualmente en los demás) |
| `showBanner` | `boolean` | `true` | Imprime un banner de versión + repositorio en la consola tras la inicialización |
| `showHandBoth` | `boolean` | `true` | Cómo se muestran las manos naturales mientras se mantiene una tecla: `true` mantiene ambas manos neutras visibles como fondo junto al gesto presionado; `false` sustituye la mano neutra del mismo lado por el gesto de la tecla (oculta) mientras la mano neutra del lado opuesto permanece visible; ambas manos neutras vuelven al soltar |
| `holdDelay` | `number` | `80` | Retardo de la transición del gesto de la mano (ms) |
| `keyboardClass` | `string` | `'standard-kb'` | Nombre de clase adicional para el SVG del teclado |
| `keyMap` | `object` | `KEY_MAP` | Sobrescribe el mapeo `KeyboardEvent.code → key` |
| `fingerMap` | `object` | `FINGER_MAP` | Sobrescribe el mapeo `key → dedo` |
| `onReady(kb)` | `function` | - | Se dispara cuando el componente se ha cargado y renderizado |
| `onKeyDown(info, kb)` | `function` | - | Callback de tecla presionada |
| `onKeyUp(info, kb)` | `function` | - | Callback de tecla soltada |
| `onKeyClick(info, kb)` | `function` | - | Callback de clic en tecla |
| `onError(err)` | `function` | - | Callback de error de carga / renderizado |

### Métodos de instancia

| Método | Descripción |
| --- | --- |
| `press(key, meta?)` | Presiona una tecla especificada (`key` es el nombre de la tecla, p. ej. `'q'`, `'shift-left'`) |
| `release(key, meta?)` | Suelta una tecla especificada |
| `play(keys, options?)` | Reproduce una secuencia de teclas (p. ej. `kb.play('hello')`) con tiempo de mantenimiento y pausa por tecla, además de un `loop` opcional de autorrepetición; devuelve una Promise |
| `reset()` | Restablece todos los resaltados y gestos (vuelve ambas manos a la posición natural de descanso) |
| `setTheme(theme)` | Cambia de tema |
| `setClickEnabled(bool)` | Activa / desactiva la demo por clic |
| `setShowHandBoth(bool)` | Activa / desactiva mantener ambas manos neutras visibles al presionar |
| `getState()` | Obtiene la lista de teclas actualmente presionadas |
| `getFinger(key)` | Obtiene la información del dedo para una tecla |
| `destroy()` | Destruye el componente, libera listeners y DOM |

Ejemplo de carga útil del callback:

```js
{
  key: 'q',            // nombre de la tecla
  code: 'q',           // campo de compatibilidad
  finger: 'lp',        // id del dedo
  fingerName: 'left pinky', // nombre del dedo
  held: ['q']          // todas las teclas actualmente presionadas
}
```

### IDs de dedos y colores

| finger id | Significado | Color predeterminado |
| --- | --- | --- |
| `lp` | meñique izquierdo | `#ff9f43` |
| `lr` | anular izquierdo | `#f368e0` |
| `lm` | medio izquierdo | `#17c0eb` |
| `li` | índice izquierdo | `#1dd1a1` |
| `ri` | índice derecho | `#0abde3` |
| `rm` | medio derecho | `#a29bfe` |
| `rr` | anular derecho | `#fd79a8` |
| `rp` | meñique derecho | `#fdcb6e` |
| `th` | pulgar (barra espaciadora) | `#6c5ce7` |

Se puede sobrescribir mediante variables CSS:

```css
.vk-hand {
  --vk-finger-lp: #ff6348;
  --vk-accent: #38bdf8; /* color de resaltado al presionar */
}
```

### Colores del tema arcoíris (convenciones de colorful.md)

En el tema `colorful` predeterminado, las teclas se colorean por zona de dedo, con colores de borde / fondo tomados de `colorful.md`:

| Dedo | Color del borde | Color de fondo |
| --- | --- | --- |
| Meñique izquierdo | `#d6a0b9` rosa | `#fff0f6` rosa claro |
| Anular izquierdo | `#c6a4df` púrpura | `#f7efff` púrpura claro |
| Medio izquierdo | `#9fb4e3` azul-púrpura | `#eef4ff` azul-púrpura claro |
| Índice izquierdo | `#83bec2` verde azulado | `#eaf9f8` verde azulado claro |
| Índice derecho | `#8ac29c` verde | `#eef9f1` verde claro |
| Medio derecho | `#c2bb76` verde-amarillo | `#fffbe8` amarillo claro |
| Anular derecho | `#d9aa71` naranja | `#fff4e8` naranja claro |
| Meñique derecho | `#d69a98` rojo | `#fff0ef` rojo claro |
| Pulgar | `#9fa8b5` gris azulado | `#f2f4f7` gris claro |

El estado de la tecla sigue la prioridad de colorful.md: presionada (`#303a4a` relleno gris azulado oscuro + texto blanco) cubre el fondo del arcoíris. Consulta [colorful.md](./colorful.md) para las convenciones completas.

## Archivos de recursos

- `svg/keyboard.svg`: gráfico vectorial del teclado virtual
- `keyboard.md`: mapeo de los selectores `id` en svg/keyboard.svg a las teclas del teclado físico
- `colorful.md`: convenciones de estilo del teclado arcoíris (colores de zonas de dedos y colores de sobrescritura del estado de las teclas)
- `keyboard.html`: vista previa del estilo del gráfico vectorial del teclado virtual
- `svg/hand.svg`: gráfico vectorial de gestos de manos en el teclado
- `hand.md`: mapeo de los selectores `id` en svg/hand.svg a los gestos de teclas del teclado físico
- `keyboard+hand.html`: vista previa del estilo del teclado virtual + gestos de manos
- `letter-bg-*`: fondos de las teclas del teclado (`<path id="letter-bg-q">`)
- `letters-*` / `letter-*`: letras o caracteres en las teclas (`<text id="letter-lower-q">`)
- `hand-*`: grupos de gestos (`<g id="hand-q">`); el componente alterna la visibilidad de estos grupos para la vinculación de gestos

## Mapeo de teclas (capa de datos)

El componente tiene dos capas incorporadas de mapeo:

```text
KeyboardEvent.code  →  nombre de la tecla     (p. ej. KeyQ → q)
nombre de la tecla  →  dedo / SVG id         (p. ej. q → lp → letter-bg-q / hand-q)
```

Los mapeos predeterminados viven en `KEY_MAP` y `FINGER_MAP` en el código fuente [`src/vkeyboardhand.js`](./src/vkeyboardhand.js) y se pueden sobrescribir mediante `options.keyMap` / `options.fingerMap`:

```js
const kb = VKeyboardHand.create('#demo', {
  fingerMap: { q: 'li' } // personalizado: remapear q al índice izquierdo
});
```

## Desarrollo y compilación

```bash
pnpm install        # instalar dependencias de desarrollo (actualmente 0, compilación Node pura)
pnpm build      # generar dist/ (UMD + ESM + CSS)
pnpm preview    # vista previa local de index.html
```

## Estructura del directorio:

```text
├── src/
│   ├── vkeyboardhand.js     # código fuente del componente (UMD, se puede incluir vía <script>)
│   └── vkeyboardhand.css    # estilos del componente
├── dist/
│   ├── vkeyboardhand.umd.js # build UMD (navegador / CommonJS / AMD)
│   ├── vkeyboardhand.esm.mjs# build ESM (Vite / Webpack / Rollup / Node)
│   └── vkeyboardhand.css    # build CSS
├── examples/                # ejemplos Vue / React / Angular / ESM
├── scripts/build.mjs        # script de compilación
├── svg/                     # recursos vectoriales del teclado y gestos (keyboard.svg / hand.svg)
├── colorful.md              # convenciones de estilo del teclado arcoíris
├── index.html               # página de demostración del componente
└── package.json
```

## Publicación automática en npm

Los workflows de GitHub Actions gestionan los controles de calidad y los releases:

- **`.github/workflows/ci.yml`** — al hacer push a `main` / pull requests: ejecuta `npm run build` + `npm test` (solo control de calidad)
- **`.github/workflows/release.yml`** — en el tag `v*`: verifica que la versión en `package.json` coincida con el tag, ejecuta `npm publish` con el secreto `NPM_TOKEN` y crea una GitHub Release con notas generadas automáticamente

Configuración única: genera un token de **Automation** en npmjs.com (permiso de publicación) y agrégalo como secreto `NPM_TOKEN` del repositorio (Settings → Secrets and variables → Actions).

Flujo de release:

```bash
npm version patch            # incrementa package.json + crea el tag v1.0.1
git push origin main --tags  # envía commit y tag: se ejecuta CI, luego release.yml publica en npm
```

## Soporte de navegadores

Soporta todos los navegadores modernos (Chrome / Edge / Firefox / Safari), dependiendo de APIs estándar: `fetch`, `DOMParser`, `classList`, `KeyboardEvent`.

## Agradecimientos
- [Teclado SVG](https://commons.wikimedia.org/wiki/File:Keyboard_US.svg) (Wikimedia Commons, CC BY-SA 4.0)
- [nvm](https://www.nvmnode.com) (NVM - Node.js Version Manager Tool)
- [markdown](https://www.markdownlang.com) (markdown)

## ⭐ Historial de estrellas

<a href="https://www.star-history.com/?repos=ayuday%2Fvkeyboardhand&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&theme=dark&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
 </picture>
</a>

## Licencia

[MIT](./LICENSE)
