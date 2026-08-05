# ⌨️ vkeyboardhand

Componente interativo de ensino de digitação por toque com teclado virtual

Sistema interativo de ensino de digitação por toque, baseado na integração de **teclado SVG + diagrama de gestos de mãos em SVG + JavaScript orientado a eventos**. HTML + JS puros, zero dependências, compatível com **Vue / React / Angular** e outros frameworks front-end, suportando **importação local, CDN e npm**.

**Repositório**: [GitHub](https://github.com/ayuday/vkeyboardhand) · [Issues](https://github.com/ayuday/vkeyboardhand/issues) · [npm](https://www.npmjs.com/package/vkeyboardhand)

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



## Recursos

- 🎹 Teclado SVG + 🖐 Gestos de mãos SVG em sincronia: ao pressionar uma tecla real (ou clicar numa tecla), a tecla correspondente acende, o gesto da mão alterna em sincronia, e a barra de dica de dedos mostra em tempo real "qual dedo pressiona qual tecla".
- ⌨️ Orientado por `KeyboardEvent`: escuta `keydown` / `keyup`, suporta gestos combinados como `Shift` / `Alt`.
- 🎨 Esquema de cores arco-íris (tema padrão): teclas coloridas por zona de dedo, frio à esquerda e quente à direita, formando um gradiente de arco-íris (veja as convenções de cores em `colorful.md`).
- 🧩 Independente de framework: o componente manipula apenas o DOM, não depende de nenhum framework e funciona diretamente em Vue / React / Angular.
- 📦 Três formas de importação: `<script>` local, CDN, npm + ESM.
- ⚙️ API completa: `press / release / play / reset / setTheme / setClickEnabled / getState / destroy` mais callbacks de eventos.
- 🗂 Tabela de mapeamento de teclas (camada de dados): mapeamento de três níveis `tecla → dedo → SVG id`, que pode ser sobrescrito via configuração.

## Stack de tecnologia

- **SVG (injetado inline)**: diagrama do teclado + diagrama de gestos dos dedos
- **Manipulação de DOM com JavaScript**: controla visibilidade e estilos dos elementos SVG
- **API KeyboardEvent**: escuta as teclas pressionadas pelo usuário
- **CSS Transition / Animation**: animações de pressionamento de tecla, transições de destaque
- **Tabela de mapeamento de teclas (dados)**: correspondências `tecla → dedo → SVG id`
- **fetch / inline**: carrega arquivos SVG

## Instalação

### Método 1: HTML + JS puros (importação local / CDN)

```html
<!-- Estilos do componente -->
<link rel="stylesheet" href="dist/vkeyboardhand.css">
<!-- Script do componente (UMD, montado como window.VKeyboardHand) -->
<script src="dist/vkeyboardhand.umd.js"></script>

<div id="demo"></div>

<script>
  var kb = VKeyboardHand.create('#demo', {
    keyboard: './svg/keyboard.svg', // teclado SVG (URL / string inline / SVGElement)
    hand: './svg/hand.svg'          // SVG de gestos da mão
  });
</script>
```

Uma vez publicado no npm, pode ser usado diretamente via CDN (jsDelivr / unpkg):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/dist/vkeyboardhand.css">
<script src="https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/dist/vkeyboardhand.umd.js"></script>
<!-- ou -->
<link rel="stylesheet" href="https://unpkg.com/vkeyboardhand@latest/dist/vkeyboardhand.css">
<script src="https://unpkg.com/vkeyboardhand@latest/dist/vkeyboardhand.umd.js"></script>
```

> Os SVGs do teclado e dos gestos de mão podem ser obtidos no pacote: `https://cdn.jsdelivr.net/npm/vkeyboardhand@latest/svg/keyboard.svg`, `.../svg/hand.svg`.

### Método 2: instalação via npm (Vue / React / Angular)

```bash
npm install vkeyboardhand
```

```js
// Importar estilos (no arquivo de entrada ou num componente)
import 'vkeyboardhand/vkeyboardhand.css';
// Importar o componente
import VKeyboardHand from 'vkeyboardhand';

const kb = VKeyboardHand.create(document.getElementById('demo'), {
  keyboard: '/assets/svg/keyboard.svg',
  hand: '/assets/svg/hand.svg'
});
```

> Observação: `keyboard` / `hand` aceitam **URL de arquivo SVG, string SVG ou SVGElement existente** como fontes. Em bundlers, você também pode fazer `import kbSvg from 'vkeyboardhand/svg/keyboard.svg?raw'` e passar a string diretamente.

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

> Exemplos totalmente executáveis estão em [`examples/`](./examples): `vue.html`, `react.html`, `esm.html`, `angular/app.component.ts`.

## Referência da API

### Opções

| Opção | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `keyboard` | `string \| SVGElement` | `'./svg/keyboard.svg'` | Teclado SVG: URL / string inline / elemento |
| `hand` | `string \| SVGElement` | `'./svg/hand.svg'` | SVG de gestos da mão: URL / string inline / elemento |
| `theme` | `string` | `'colorful'` | Tema: `colorful` (arco-íris padrão) / `bone` / `dark` / `robot` / `kingfish` / `milk` |
| `listenKeyboard` | `boolean` | `true` | Se escuta o teclado real |
| `enableClick` | `boolean` | `true` | Se o clique nas teclas é permitido para demonstração |
| `preventScroll` | `boolean` | `true` | Evita que espaço / setas etc. rolem a página |
| `showFingerLabel` | `boolean` | `true` | Mostra a barra de dica de dedos |
| `showFingerColors` | `boolean` | `false` | Colore teclas por dedo (ativo por padrão no tema `colorful`, pode ser ativado manualmente nos outros) |
| `showBanner` | `boolean` | `true` | Imprime um banner de versão + repositório no console após a inicialização |
| `showHandBoth` | `boolean` | `true` | Como as mãos naturais são mostradas enquanto uma tecla é mantida: `true` mantém ambas as mãos neutras visíveis como fundo ao lado do gesto pressionado; `false` substitui a mão neutra do mesmo lado pelo gesto da tecla (oculto) enquanto a mão neutra do lado oposto permanece visível; ambas as mãos neutras voltam após a liberação |
| `holdDelay` | `number` | `80` | Atraso da transição do gesto da mão (ms) |
| `keyboardClass` | `string` | `'standard-kb'` | Nome de classe extra para o SVG do teclado |
| `keyMap` | `object` | `KEY_MAP` | Sobrescreve o mapeamento `KeyboardEvent.code → key` |
| `fingerMap` | `object` | `FINGER_MAP` | Sobrescreve o mapeamento `key → dedo` |
| `onReady(kb)` | `function` | - | Dispara quando o componente foi carregado e renderizado |
| `onKeyDown(info, kb)` | `function` | - | Callback de tecla pressionada |
| `onKeyUp(info, kb)` | `function` | - | Callback de tecla solta |
| `onKeyClick(info, kb)` | `function` | - | Callback de clique na tecla |
| `onError(err)` | `function` | - | Callback de erro de carga / renderização |

### Métodos da instância

| Método | Descrição |
| --- | --- |
| `press(key, meta?)` | Pressiona uma tecla específica (`key` é o nome da tecla, ex.: `'q'`, `'shift-left'`) |
| `release(key, meta?)` | Solta uma tecla específica |
| `play(keys, options?)` | Reproduz uma sequência de teclas (ex.: `kb.play('hello')`) com tempo de espera e intervalo por tecla, mais `loop` opcional para repetição automática; retorna uma Promise |
| `reset()` | Redefine todos os destaques e gestos (volta as duas mãos à posição natural de descanso) |
| `setTheme(theme)` | Alterna o tema |
| `setClickEnabled(bool)` | Ativa / desativa a demonstração por clique |
| `setShowHandBoth(bool)` | Ativa / desativa manter ambas as mãos neutras visíveis ao pressionar |
| `getState()` | Obtém a lista de teclas atualmente mantidas pressionadas |
| `getFinger(key)` | Obtém a informação do dedo para uma tecla |
| `destroy()` | Destrói o componente, libera listeners e DOM |

Exemplo de payload do callback:

```js
{
  key: 'q',            // nome da tecla
  code: 'q',           // campo de compatibilidade
  finger: 'lp',        // id do dedo
  fingerName: 'left pinky', // nome do dedo
  held: ['q']          // todas as teclas atualmente pressionadas
}
```

### IDs de dedos e cores

| finger id | Significado | Cor padrão |
| --- | --- | --- |
| `lp` | mindinho esquerdo | `#ff9f43` |
| `lr` | anelar esquerdo | `#f368e0` |
| `lm` | médio esquerdo | `#17c0eb` |
| `li` | indicador esquerdo | `#1dd1a1` |
| `ri` | indicador direito | `#0abde3` |
| `rm` | médio direito | `#a29bfe` |
| `rr` | anelar direito | `#fd79a8` |
| `rp` | mindinho direito | `#fdcb6e` |
| `th` | polegar (barra de espaço) | `#6c5ce7` |

Pode ser sobrescrito via variáveis CSS:

```css
.vk-hand {
  --vk-finger-lp: #ff6348;
  --vk-accent: #38bdf8; /* cor de destaque do pressionamento */
}
```

### Cores do tema arco-íris (convenções colorful.md)

No tema `colorful` padrão, as teclas são coloridas por zona de dedo, com cores de borda / fundo vindas de `colorful.md`:

| Dedo | Cor da borda | Cor de fundo |
| --- | --- | --- |
| Mindinho esquerdo | `#d6a0b9` rosa | `#fff0f6` rosa claro |
| Anelar esquerdo | `#c6a4df` roxo | `#f7efff` roxo claro |
| Médio esquerdo | `#9fb4e3` azul-roxo | `#eef4ff` azul-roxo claro |
| Indicador esquerdo | `#83bec2` verde-azulado | `#eaf9f8` verde-azulado claro |
| Indicador direito | `#8ac29c` verde | `#eef9f1` verde claro |
| Médio direito | `#c2bb76` verde-amarelado | `#fffbe8` amarelo claro |
| Anelar direito | `#d9aa71` laranja | `#fff4e8` laranja claro |
| Mindinho direito | `#d69a98` vermelho | `#fff0ef` vermelho claro |
| Polegar | `#9fa8b5` cinza-azulado | `#f2f4f7` cinza claro |

O estado da tecla segue a prioridade de colorful.md: pressionado (`#303a4a` preenchimento cinza-azulado escuro + texto branco) sobrepõe o fundo arco-íris. Veja [colorful.md](./colorful.md) para as convenções completas.

## Arquivos de recursos

- `svg/keyboard.svg`: gráfico vetorial do teclado virtual
- `keyboard.md`: mapeamento dos seletores `id` em svg/keyboard.svg para teclas do teclado físico
- `colorful.md`: convenções de estilo do teclado arco-íris (cores das zonas de dedo e cores de sobrescrita do estado das teclas)
- `keyboard.html`: pré-visualização do estilo do gráfico vetorial do teclado virtual
- `svg/hand.svg`: gráfico vetorial dos gestos de mão no teclado
- `hand.md`: mapeamento dos seletores `id` em svg/hand.svg para gestos de teclas do teclado físico
- `keyboard+hand.html`: pré-visualização do estilo do teclado virtual + gestos de mão
- `letter-bg-*`: fundos das teclas do teclado (`<path id="letter-bg-q">`)
- `letters-*` / `letter-*`: letras ou caracteres nas teclas (`<text id="letter-lower-q">`)
- `hand-*`: grupos de gestos (`<g id="hand-q">`); o componente alterna a visibilidade desses grupos para a vinculação de gestos

## Mapeamento de teclas (camada de dados)

O componente tem duas camadas incorporadas de mapeamento:

```text
KeyboardEvent.code  →  nome da tecla        (ex.: KeyQ → q)
nome da tecla       →  dedo / SVG id        (ex.: q → lp → letter-bg-q / hand-q)
```

Os mapeamentos padrão estão em `KEY_MAP` e `FINGER_MAP` no código-fonte [`src/vkeyboardhand.js`](./src/vkeyboardhand.js) e podem ser sobrescritos via `options.keyMap` / `options.fingerMap`:

```js
const kb = VKeyboardHand.create('#demo', {
  fingerMap: { q: 'li' } // customizado: remapear q para o indicador esquerdo
});
```

## Desenvolvimento e build

```bash
pnpm install        # instalar dependências de desenvolvimento (atualmente 0, build Node puro)
pnpm build      # gerar dist/ (UMD + ESM + CSS)
pnpm preview    # pré-visualização local do index.html
```

## Estrutura do diretório:

```text
├── src/
│   ├── vkeyboardhand.js     # código-fonte do componente (UMD, pode ser incluído via <script>)
│   └── vkeyboardhand.css    # estilos do componente
├── dist/
│   ├── vkeyboardhand.umd.js # build UMD (navegador / CommonJS / AMD)
│   ├── vkeyboardhand.esm.mjs# build ESM (Vite / Webpack / Rollup / Node)
│   └── vkeyboardhand.css    # build CSS
├── examples/                # exemplos Vue / React / Angular / ESM
├── scripts/build.mjs        # script de build
├── svg/                     # recursos vetoriais do teclado e gestos (keyboard.svg / hand.svg)
├── colorful.md              # convenções de estilo do teclado arco-íris
├── index.html               # página de demonstração do componente
└── package.json
```

## Publicação automática no npm

Os workflows do GitHub Actions tratam das verificações de qualidade e releases:

- **`.github/workflows/ci.yml`** — em push para `main` / pull requests: executa `npm run build` + `npm test` (apenas verificação de qualidade)
- **`.github/workflows/release.yml`** — no tag `v*`: verifica se a versão em `package.json` corresponde ao tag, executa `npm publish` com o segredo `NPM_TOKEN` e cria uma GitHub Release com notas geradas automaticamente

Configuração única: gere um token **Automation** em npmjs.com (permissão de publicação) e adicione-o como segredo `NPM_TOKEN` do repositório (Settings → Secrets and variables → Actions).

Fluxo de release:

```bash
npm version patch            # incrementa package.json + cria o tag v1.0.1
git push origin main --tags  # envia commit e tag: o CI roda, então o release.yml publica no npm
```

## Suporte a navegadores

Suporta todos os navegadores modernos (Chrome / Edge / Firefox / Safari), dependendo de APIs padrão: `fetch`, `DOMParser`, `classList`, `KeyboardEvent`.

## Agradecimentos
- [Teclado SVG](https://commons.wikimedia.org/wiki/File:Keyboard_US.svg) (Wikimedia Commons, CC BY-SA 4.0)
- [nvm](https://www.nvmnode.com) (NVM - Node.js Version Manager Tool)
- [markdown](https://www.markdownlang.com) (markdown)

## ⭐ Histórico de estrelas

<a href="https://www.star-history.com/?repos=ayuday%2Fvkeyboardhand&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&theme=dark&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=ayuday/vkeyboardhand&type=date&legend=top-left&sealed_token=0gMklRkZmlzMNv3aS599q52vM3sWoD-7t0rXTOufF15TqjMqydOLJcgHst4v1il1jRXmaPbU7enL5QHOIoF5SEbv5GNYTuTb_VZ0cxQCvk_BmUMnPBlvCg" />
 </picture>
</a>

## Licença

[MIT](./LICENSE)
