/**
 * 组件冒烟测试（Node 内置 test runner）
 * 运行前先执行 npm run build 生成 dist/。
 * 用法：npm test
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

import VKeyboardHand, {
  KEY_MAP,
  FINGER_MAP,
  FINGERS,
  createVKeyboardHand,
  version
} from '../dist/vkeyboardhand.esm.mjs';

const require = createRequire(import.meta.url);
const UMD = require('../dist/vkeyboardhand.umd.js');

test('ESM 默认导出与命名导出', () => {
  assert.equal(version, '1.0.0');
  assert.equal(typeof createVKeyboardHand, 'function');
  assert.equal(VKeyboardHand.version, '1.0.0');
  assert.ok(FINGERS.lp);
  assert.equal(FINGERS.lp.name, '左手小指');
});

test('UMD 导出（CommonJS 环境下）', () => {
  assert.equal(UMD.version, '1.0.0');
  assert.equal(typeof UMD.create, 'function');
  assert.ok(UMD.KEY_MAP.KeyQ, 'q');
});

test('键位映射覆盖主要按键', () => {
  assert.equal(KEY_MAP.KeyQ, 'q');
  assert.equal(KEY_MAP.Digit1, '1');
  assert.equal(KEY_MAP.Space, 'space');
  assert.equal(KEY_MAP.ShiftLeft, 'shift-left');
  assert.equal(KEY_MAP.Backspace, 'backspace');
  assert.equal(KEY_MAP.Enter, 'enter');
  assert.equal(KEY_MAP.BracketLeft, 'left-center-bracket');
});

test('指法映射覆盖全部字母与常用键', () => {
  const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('');
  letters.forEach((ch) => {
    assert.ok(FINGER_MAP[ch], '缺少手指映射: ' + ch);
  });
  assert.equal(FINGER_MAP.q, 'lp');
  assert.equal(FINGER_MAP.f, 'li');
  assert.equal(FINGER_MAP.j, 'ri');
  assert.equal(FINGER_MAP.space, 'th');
});

test('手指 id 与中文名一一对应', () => {
  const ids = ['lp', 'lr', 'lm', 'li', 'ri', 'rm', 'rr', 'rp', 'th'];
  ids.forEach((id) => {
    assert.ok(FINGERS[id], '缺少手指定义: ' + id);
    assert.ok(FINGERS[id].name);
  });
});
