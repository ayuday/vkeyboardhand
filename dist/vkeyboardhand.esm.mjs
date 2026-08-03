/**
 * vkeyboardhand.esm.js（由 scripts/build.mjs 从 src/vkeyboardhand.js 生成）
 * ESM 模块入口，供 Vite / Webpack / Rollup / Node ESM 等使用。
 * GitHub: https://github.com/ayuday/vkeyboardhand
 */
'use strict';

  /* ======================================================================
   * 一、键位映射表（数据层）
   * KeyboardEvent.code -> key 名称 -> SVG id（letter-bg-* / hand-*）
   * ==================================================================== */

  const KEY_MAP = {
    // 字母区
    KeyQ: 'q', KeyW: 'w', KeyE: 'e', KeyR: 'r', KeyT: 't',
    KeyY: 'y', KeyU: 'u', KeyI: 'i', KeyO: 'o', KeyP: 'p',
    KeyA: 'a', KeyS: 's', KeyD: 'd', KeyF: 'f', KeyG: 'g',
    KeyH: 'h', KeyJ: 'j', KeyK: 'k', KeyL: 'l',
    KeyZ: 'z', KeyX: 'x', KeyC: 'c', KeyV: 'v', KeyB: 'b',
    KeyN: 'n', KeyM: 'm',

    // 数字与符号行
    Backquote: 'tilda',
    Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5',
    Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0',
    Minus: 'minus', Equal: 'equal',

    // 中排 / 下排符号
    BracketLeft: 'left-center-bracket',
    BracketRight: 'right-center-bracket',
    Backslash: 'backslash',
    Semicolon: 'semicolon',
    Quote: 'quote',
    Comma: 'comma',
    Period: 'dot',
    Slash: 'slash',

    // 功能键
    Tab: 'tab',
    CapsLock: 'capslock',
    Enter: 'enter',
    Backspace: 'backspace',
    Space: 'space',
    ShiftLeft: 'shift-left',
    ShiftRight: 'shift-right',
    ControlLeft: 'control',
    AltLeft: 'alt-left',
    AltRight: 'alt-right'
  };

  /**
   * 指法映射：key 名称 -> 手指
   * finger 取值：
   *  lp 左手小指 | lr 左手无名指 | lm 左手中指 | li 左手食指
   *  ri 右手食指 | rm 右手中指 | rr 右手无名指 | rp 右手小指
   *  th 拇指（空格）
   */
  const FINGER_MAP = {
    tilda: 'lp', '1': 'lp', q: 'lp', a: 'lp', z: 'lp',
    tab: 'lp', capslock: 'lp', 'shift-left': 'lp', control: 'lp',

    '2': 'lr', w: 'lr', s: 'lr', x: 'lr',
    '3': 'lm', e: 'lm', d: 'lm', c: 'lm',
    '4': 'li', '5': 'li', r: 'li', t: 'li', f: 'li', g: 'li', v: 'li', b: 'li',

    '6': 'ri', '7': 'ri', y: 'ri', u: 'ri', h: 'ri', j: 'ri', n: 'ri', m: 'ri',
    '8': 'rm', i: 'rm', k: 'rm', comma: 'rm',
    '9': 'rr', o: 'rr', l: 'rr', dot: 'rr',
    '0': 'rp', minus: 'rp', equal: 'rp', p: 'rp',
    'left-center-bracket': 'rp', 'right-center-bracket': 'rp', backslash: 'rp',
    semicolon: 'rp', quote: 'rp', slash: 'rp',
    enter: 'rp', 'shift-right': 'rp', backspace: 'rp', 'alt-right': 'rp',

    space: 'th'
  };

  /** 手指中文名与配色（CSS 变量，可整体覆盖） */
  const FINGERS = {
    lp: { name: '左手小指', color: 'var(--vk-finger-lp, #ff9f43)' },
    lr: { name: '左手无名指', color: 'var(--vk-finger-lr, #f368e0)' },
    lm: { name: '左手中指', color: 'var(--vk-finger-lm, #17c0eb)' },
    li: { name: '左手食指', color: 'var(--vk-finger-li, #1dd1a1)' },
    ri: { name: '右手食指', color: 'var(--vk-finger-ri, #0abde3)' },
    rm: { name: '右手中指', color: 'var(--vk-finger-rm, #a29bfe)' },
    rr: { name: '右手无名指', color: 'var(--vk-finger-rr, #fd79a8)' },
    rp: { name: '右手小指', color: 'var(--vk-finger-rp, #fdcb6e)' },
    th: { name: '拇指', color: 'var(--vk-finger-th, #6c5ce7)' }
  };

  const MODIFIER_KEYS = {
    'shift-left': true,
    'shift-right': true,
    'alt-left': true,
    'alt-right': true,
    control: true
  };

  /** 主题名 -> hand.svg 内嵌样式里的主题类（用于手部配色随主题联动） */
  const HAND_THEME_CLASS = {
    dark: 'theme-dark',
    robot: 'theme-robot',
    kingfish: 'theme-kingfish',
    milk: 'kb-milk',
    colorful: 'kb-milk' // hand.svg 未单独定义彩虹手部，沿用现有浅色手部样式
  };

  /** 默认配置 */
  const DEFAULTS = {
    keyboard: './svg/keyboard.svg', // URL / SVG 字符串 / SVGElement
    hand: './svg/hand.svg',         // URL / SVG 字符串 / SVGElement
    theme: 'colorful',          // bone | dark | robot | kingfish | colorful（默认彩虹）
    listenKeyboard: true,       // 是否监听真实键盘
    enableClick: true,          // 是否允许点击键位演示
    preventScroll: true,        // 阻止方向键 / 空格滚动页面
    showFingerLabel: true,      // 显示指法提示条
    showFingerColors: false,    // 按键按手指配色（colorful 主题默认开启，其余主题可手动开启）
    showBanner: true,           // 初始化后在控制台输出版本与仓库信息横幅
    holdDelay: 80,              // 手势切换动画延迟（ms）
    keyboardClass: 'standard-kb',
    onKeyDown: null,
    onKeyUp: null,
    onKeyClick: null,
    onReady: null,
    onError: null,
    fingerMap: null,            // 覆盖 FINGER_MAP
    keyMap: null                // 覆盖 KEY_MAP
  };

  /* ======================================================================
   * 二、工具函数
   * ==================================================================== */

  const isString = (v) => typeof v === 'string';
  const isFn = (v) => typeof v === 'function';

  function resolveUrl(url) {
    try {
      return new URL(url, document.baseURI).href;
    } catch (e) {
      return url;
    }
  }

  function parseSvg(text) {
    const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
    const err = doc.querySelector('parsererror');
    if (err) throw new Error('SVG 解析失败：' + err.textContent);
    return doc.documentElement;
  }

  /** 将 SVG 字符串 / URL / 元素统一解析为 SVGElement */
  async function loadSvg(source) {
    if (source == null) return null;
    if (typeof source === 'string') {
      const trimmed = source.trim();
      if (trimmed.indexOf('<svg') === 0 || trimmed.indexOf('<?xml') === 0) {
        const svg = parseSvg(trimmed);
        scopeSvgStyles(svg);
        return svg;
      }
      const res = await fetch(resolveUrl(trimmed));
      if (!res.ok) throw new Error('加载 SVG 失败：' + trimmed + '（HTTP ' + res.status + '）');
      const text = await res.text();
      const svg = parseSvg(text);
      scopeSvgStyles(svg);
      return svg;
    }
    if (typeof source.querySelector === 'function') {
      const clone = source.cloneNode(true);
      scopeSvgStyles(clone);
      return clone;
    }
    throw new Error('无法识别的 SVG 数据源');
  }

  function setDisplay(el, display) {
    if (!el) return;
    el.style.display = display;
  }

  /**
   * 将 SVG 内嵌 <style> 的作用域限定到该 SVG 内部，避免样式泄漏到宿主页面。
   * （如 hand.svg 中的 `.st0 { display: none }` 若不加作用域，会误伤
   *   页面里其它 class="st0" 的元素，例如键盘按键背景。）
   */
  let svgScopeCounter = 0;
  function scopeSvgStyles(svg) {
    const scopeClass = 'vk-injected-' + (++svgScopeCounter);
    svg.classList.add(scopeClass);

    const styles = Array.prototype.slice.call(
      svg.getElementsByTagNameNS
        ? svg.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'style')
        : svg.querySelectorAll('style')
    );

    styles.forEach((style) => {
      const css = style.textContent || '';
      if (!css.trim()) return;
      style.textContent = css.replace(/([^{}]+)\{/g, (match, selectors) => {
        const trimmed = selectors.trim();
        // 跳过 @media / @keyframes 等 at-rule 头（其内部规则仍会被后续匹配处理）
        if (!trimmed || trimmed.charAt(0) === '@') return match;
        const scoped = trimmed
          .split(',')
          .map((s) => {
            const t = s.trim();
            if (!t) return s;
            if (t.indexOf('.' + scopeClass) === 0) return t;
            // `.theme-dark .st1` / `.kb-colorful .st1` 这类以类名开头的复合选择器，
            // 作用域类与首个类名复合在 SVG 根节点上；其余选择器用后代限定
            const m = t.match(/^(\.[A-Za-z_][\w-]*)([\s>+~].*)?$/);
            if (m) {
              return m[2] ? '.' + scopeClass + m[1] + m[2] : '.' + scopeClass + ' ' + m[1];
            }
            return '.' + scopeClass + ' ' + t;
          })
          .join(', ');
        return scoped + '{';
      });
    });
  }

  /* ======================================================================
   * 三、核心类
   * ==================================================================== */

  class VKeyboardHand {
    /**
     * @param {HTMLElement|string} container 挂载容器（元素或选择器）
     * @param {Object} [options] 配置项，见 DEFAULTS
     */
    constructor(container, options) {
      this.options = Object.assign({}, DEFAULTS, options || {});
      this.keyMap = Object.assign({}, KEY_MAP, this.options.keyMap || {});
      this.fingerMap = Object.assign({}, FINGER_MAP, this.options.fingerMap || {});

      this.container = isString(container)
        ? document.querySelector(container)
        : container;
      if (!this.container) {
        throw new Error('VKeyboardHand: 找不到挂载容器 ' + container);
      }

      this.root = null;       // 组件根节点
      this.keyboardSvg = null;
      this.handSvg = null;
      this.handGroups = {};   // id -> <g>
      this.keyPaths = {};     // key -> <path id="letter-bg-*">
      this.held = {};         // 当前按住的 key 集合
      this.fingerLabel = null;
      this.pressed = false;
      this.destroyed = false;
      this._bound = {
        onKeyDown: this._onKeyDown.bind(this),
        onKeyUp: this._onKeyUp.bind(this),
        onBlur: this._onBlur.bind(this)
      };

      this._build();
      this._init();
    }

    /* ------------------------- 构建 DOM ------------------------- */

    _build() {
      this.root = document.createElement('div');
      this.root.className = 'vk-hand vk-theme-' + (this.options.theme || 'bone');
      this.root.setAttribute('role', 'application');
      this.root.setAttribute('aria-label', '交互式指法教学键盘');

      this.keyboardWrap = document.createElement('div');
      this.keyboardWrap.className = 'vk-keyboard';
      this.keyboardWrap.id = 'vk-keyboard';

      this.handWrap = document.createElement('div');
      this.handWrap.className = 'vk-hand-layer';
      this.handWrap.id = 'vk-hand-layer';

      this.root.appendChild(this.keyboardWrap);
      this.root.appendChild(this.handWrap);

      if (this.options.showFingerLabel) {
        this.fingerLabel = document.createElement('div');
        this.fingerLabel.className = 'vk-finger-label';
        this.fingerLabel.innerHTML =
          '<span class="vk-finger-dot"></span><span class="vk-finger-text">等待按键…</span>';
        this.root.appendChild(this.fingerLabel);
      }

      this.container.appendChild(this.root);
    }

    async _init() {
      try {
        const [keyboardSvg, handSvg] = await Promise.all([
          loadSvg(this.options.keyboard),
          loadSvg(this.options.hand)
        ]);
        if (this.destroyed) return;
        this._mountKeyboard(keyboardSvg);
        this._mountHand(handSvg);
        this._bind();
        this._reset(true);
        if (isFn(this.options.onReady)) this.options.onReady(this);
        this._logBanner();
      } catch (err) {
        if (isFn(this.options.onError)) this.options.onError(err);
        else console.error('[VKeyboardHand]', err);
      }
    }

    _mountKeyboard(svg) {
      if (!svg) return;
      svg.classList.add(this.options.keyboardClass);
      svg.setAttribute('aria-hidden', 'true');
      this.keyboardWrap.appendChild(svg);
      this.keyboardSvg = svg;

      // 收集键位背景 path：letter-bg-*
      svg.querySelectorAll('[id^="letter-bg-"]').forEach((el) => {
        const key = el.id.slice('letter-bg-'.length);
        this.keyPaths[key] = el;
        if (this.options.enableClick) {
          el.classList.add('vk-clickable');
          el.style.cursor = 'pointer';
        }
      });
      this._applyFingerColors();

      // 收集字符 text：letter-*（供 active 时反白）
      this.keyTexts = {};
      svg.querySelectorAll('[id^="letter-"]').forEach((el) => {
        if (el.id.indexOf('letter-bg-') === 0) return;
        // letter-upper-q / letter-lower-q 归并到同一个键 q
        const key = el.id.slice('letter-'.length).replace(/^(upper|lower)-/, '');
        (this.keyTexts[key] = this.keyTexts[key] || []).push(el);
      });
    }

    _mountHand(svg) {
      if (!svg) return;
      svg.setAttribute('aria-hidden', 'true');
      this.handWrap.appendChild(svg);
      this.handSvg = svg;

      svg.querySelectorAll('g[id]').forEach((g) => {
        this.handGroups[g.id] = g;
      });

      const hc = HAND_THEME_CLASS[this.options.theme];
      if (hc) svg.classList.add(hc);
    }

    _bind() {
      if (this.options.listenKeyboard) {
        window.addEventListener('keydown', this._bound.onKeyDown, true);
        window.addEventListener('keyup', this._bound.onKeyUp, true);
        window.addEventListener('blur', this._bound.onBlur);
      }

      this._clickHandler = (e) => this._onKeyClick(e);
      this.setClickEnabled(this.options.enableClick);
    }

    /* ------------------------- 事件驱动 ------------------------- */

    _codeToKey(code) {
      if (this.keyMap[code]) return this.keyMap[code];
      // 兼容直接传 key 名称（如 'q'）
      if (/^[a-z0-9]$/.test(code)) return code.toLowerCase();
      return null;
    }

    _onKeyDown(e) {
      if (this.destroyed) return;
      const key = this._codeToKey(e.code || e.key);
      if (!key) return;

      if (this.options.preventScroll) {
        const blocked = [
          'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
          'PageUp', 'PageDown', 'Home', 'End', 'Tab'
        ];
        if (blocked.indexOf(e.code) !== -1) e.preventDefault();
      }

      this.press(key, { event: e });
    }

    _onKeyUp(e) {
      if (this.destroyed) return;
      const key = this._codeToKey(e.code || e.key);
      if (!key) return;
      this.release(key, { event: e });
    }

    _onBlur() {
      if (this.destroyed) return;
      this.reset();
    }

    _onKeyClick(e) {
      const path = e.target.closest
        ? e.target.closest('[id^="letter-bg-"]')
        : null;
      if (!path) return;
      const key = path.id.slice('letter-bg-'.length);
      if (isFn(this.options.onKeyClick)) {
        this.options.onKeyClick({ key, finger: this.fingerMap[key] || '' }, this);
      }
      // 点击演示：亮起 500ms 后复原
      this.press(key, { viaClick: true });
      clearTimeout(this._clickTimer);
      this._clickTimer = setTimeout(() => this.release(key, { viaClick: true }), 450);
    }

    /* ------------------------- 核心联动 ------------------------- */

    /**
     * 按下键（key 名称，如 'q' / 'shift-left'）
     * @param {string} key
     * @param {Object} [meta]
     */
    press(key, meta) {
      if (this.destroyed) return this;
      if (!this.keyPaths[key]) return this;
      this.held[key] = true;
      this._render(key, meta);
      if (isFn(this.options.onKeyDown)) {
        this.options.onKeyDown({
          key,
          code: key,
          finger: this.fingerMap[key] || '',
          fingerName: this._fingerName(key),
          held: Object.keys(this.held)
        }, this);
      }
      return this;
    }

    /**
     * 松开键
     * @param {string} key
     * @param {Object} [meta]
     */
    release(key, meta) {
      if (this.destroyed) return this;
      delete this.held[key];
      this._render(null, meta);
      if (isFn(this.options.onKeyUp)) {
        this.options.onKeyUp({
          key,
          finger: this.fingerMap[key] || '',
          held: Object.keys(this.held)
        }, this);
      }
      return this;
    }

    /**
     * 重置所有高亮与手势（恢复双手自然状态）
     */
    reset() {
      if (this.destroyed) return this;
      this.held = {};
      this._render(null, { viaReset: true });
      return this;
    }

    /** 内部渲染：键盘高亮 + 手势图 + 指法标签 */
    _render(activeKey, meta) {
      // 1. 键盘高亮
      Object.keys(this.keyPaths).forEach((k) => {
        const el = this.keyPaths[k];
        const on = !!this.held[k];
        el.classList.toggle('active', on);
        const texts = this.keyTexts[k];
        if (texts) texts.forEach((t) => t.classList.toggle('active', on));
      });

      // 2. 手势图
      this._renderHand();

      // 3. 指法标签
      if (this.fingerLabel) {
        if (activeKey) {
          const finger = this.fingerMap[activeKey] || '';
          const info = FINGERS[finger];
          this.fingerLabel.classList.add('vk-visible');
          const dot = this.fingerLabel.querySelector('.vk-finger-dot');
          const text = this.fingerLabel.querySelector('.vk-finger-text');
          if (info) {
            dot.style.background = info.color;
            text.textContent = info.name + ' 按 ' + activeKey.toUpperCase();
          } else {
            dot.style.background = 'var(--vk-accent, #79bbff)';
            text.textContent = '按键 ' + activeKey.toUpperCase();
          }
        } else {
          this.fingerLabel.classList.remove('vk-visible');
        }
      }
    }

    /** 计算当前应显示的手势组合并切换 */
    _renderHand() {
      if (!this.handSvg) return;
      const held = Object.keys(this.held);
      const show = {};

      const has = (name) => this.held[name];
      const shift = has('shift-left') || has('shift-right');
      const alt = has('alt-left') || has('alt-right');
      const ctrl = has('control');

      if (held.length === 0) {
        // 自然状态：双手
        show['hand-neutral-left'] = true;
        show['hand-neutral-right'] = true;
      } else {
        // 修饰键组合（shift + alt）
        if (shift && alt) {
          if (has('shift-left') || has('alt-left')) show['hand-shift-alt-left'] = true;
          if (has('shift-right') || has('alt-right')) show['shift-alt-right'] = true;
        }

        // 非修饰键按下时，按标准指法用对侧修饰键
        let shiftOverride = null;
        let altOverride = null;

        held.forEach((k) => {
          const gid = 'hand-' + k;
          if (this.handGroups[gid]) show[gid] = true;

          if (!MODIFIER_KEYS[k]) {
            const side = (FINGER_MAP[k] || '').charAt(0);
            if (shift && side === 'l' && this.handGroups['hand-shift-right']) {
              shiftOverride = 'hand-shift-right';
            }
            if (shift && side === 'r' && this.handGroups['hand-shift-left']) {
              shiftOverride = 'hand-shift-left';
            }
            if (alt && side === 'l' && this.handGroups['hand-alt-right']) {
              altOverride = 'hand-alt-right';
            }
            if (alt && side === 'r' && this.handGroups['hand-alt-left']) {
              altOverride = 'hand-alt-left';
            }
            if (ctrl && this.handGroups['hand-control']) show['hand-control'] = true;
          }
        });

        if (shiftOverride) {
          delete show['hand-shift-left'];
          delete show['hand-shift-right'];
          show[shiftOverride] = true;
        }
        if (altOverride) {
          delete show['hand-alt-left'];
          delete show['hand-alt-right'];
          show[altOverride] = true;
        }
      }

      // 应用显隐（保留动画过渡类）
      const delay = this.options.holdDelay;
      Object.keys(this.handGroups).forEach((id) => {
        const g = this.handGroups[id];
        if (show[id]) {
          g.classList.remove('st0');
          g.style.transitionDelay = '0ms';
          setDisplay(g, 'inline');
          g.classList.add('vk-show');
        } else {
          g.classList.add('st0');
          g.style.transitionDelay = delay + 'ms';
          setDisplay(g, 'none');
          g.classList.remove('vk-show');
        }
      });
    }

    _fingerName(key) {
      const f = this.fingerMap[key];
      return f ? FINGERS[f].name : '';
    }

    /** 控制台横幅：版本 + 仓库信息 */
    _logBanner() {
      if (this.options.showBanner === false) return;
      const version = VKeyboardHand.version;
      const repo = 'https://github.com/ayuday/vkeyboardhand';
      if (typeof console.info === 'function') {
        console.info(
          '%c vkeyboardhand %c v' + version + ' %c ' + repo + ' ',
          'background:#4fc08d;color:#fff;border-radius:3px 0 0 3px;padding:2px 6px;font-weight:bold;',
          'background:#23272f;color:#fff;padding:2px 6px;',
          'background:#eef2f8;color:#374151;border-radius:0 3px 3px 0;padding:2px 6px;'
        );
      }
    }

    /* ------------------------- 对外 API ------------------------- */

    /** 切换主题：bone | dark | robot | kingfish | colorful */
    setTheme(theme) {
      const t = theme || 'bone';
      this.root.className = 'vk-hand vk-theme-' + t;
      this.options.theme = t;
      if (this.handSvg) {
        Object.keys(HAND_THEME_CLASS).forEach((k) => {
          this.handSvg.classList.remove(HAND_THEME_CLASS[k]);
        });
        const hc = HAND_THEME_CLASS[t];
        if (hc) this.handSvg.classList.add(hc);
      }
      this._applyFingerColors();
      return this;
    }

    /** 是否启用按手指配色（colorful 主题默认开启） */
    _useFingerColors() {
      return !!(this.options.showFingerColors || this.options.theme === 'colorful');
    }

    /** 按当前主题/配置为键帽挂载或移除 data-finger 属性 */
    _applyFingerColors() {
      const on = this._useFingerColors();
      Object.keys(this.keyPaths).forEach((key) => {
        const el = this.keyPaths[key];
        const finger = this.fingerMap[key] || '';
        if (on && finger) {
          el.dataset.finger = finger;
        } else {
          delete el.dataset.finger;
        }
      });
      return this;
    }

    /** 开/关点击键位演示模式 */
    setClickEnabled(enabled) {
      this.options.enableClick = !!enabled;
      if (this._clickHandler) {
        this.keyboardWrap.removeEventListener('click', this._clickHandler);
      }
      if (this.options.enableClick) {
        this.keyboardWrap.addEventListener('click', this._clickHandler);
      }
      Object.keys(this.keyPaths).forEach((k) => {
        const el = this.keyPaths[k];
        el.classList.toggle('vk-clickable', this.options.enableClick);
        el.style.cursor = this.options.enableClick ? 'pointer' : '';
      });
      return this;
    }

    /** 读取当前按键状态 */
    getState() {
      return {
        held: Object.keys(this.held),
        pressed: this.pressed
      };
    }

    /** 获取键位对应手指信息 */
    getFinger(key) {
      const f = this.fingerMap[key];
      return f ? Object.assign({ id: f }, FINGERS[f]) : null;
    }

    /** 销毁组件，释放监听与 DOM */
    destroy() {
      if (this.destroyed) return;
      this.destroyed = true;
      window.removeEventListener('keydown', this._bound.onKeyDown, true);
      window.removeEventListener('keyup', this._bound.onKeyUp, true);
      window.removeEventListener('blur', this._bound.onBlur);
      if (this._clickHandler) {
        this.keyboardWrap.removeEventListener('click', this._clickHandler);
      }
      clearTimeout(this._clickTimer);
      if (this.root && this.root.parentNode) {
        this.root.parentNode.removeChild(this.root);
      }
    }

    /** 重置为初始状态（可选保留 DOM） */
    _reset(initial) {
      this.reset();
    }
  }

  /* ======================================================================
   * 四、快捷工厂
   * ==================================================================== */

  /**
   * 创建组件实例
   * @param {HTMLElement|string} container
   * @param {Object} [options]
   * @returns {VKeyboardHand}
   */
  function createVKeyboardHand(container, options) {
    return new VKeyboardHand(container, options);
  }

  VKeyboardHand.create = createVKeyboardHand;
  VKeyboardHand.KEY_MAP = KEY_MAP;
  VKeyboardHand.FINGER_MAP = FINGER_MAP;
  VKeyboardHand.FINGERS = FINGERS;
  VKeyboardHand.version = '1.0.0';


export default VKeyboardHand;
export { KEY_MAP, FINGER_MAP, FINGERS, createVKeyboardHand };
export const version = VKeyboardHand.version;
