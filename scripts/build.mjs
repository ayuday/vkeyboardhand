/**
 * 构建脚本：
 *  - src/vkeyboardhand.js  -> dist/vkeyboardhand.umd.js（原样复制，UMD）
 *  - src/vkeyboardhand.js  -> dist/vkeyboardhand.esm.js（转成 ESM 导出）
 *  - src/vkeyboardhand.css -> dist/vkeyboardhand.css
 *
 * 用法：node scripts/build.mjs
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcJs = join(root, 'src', 'vkeyboardhand.js');
const srcCss = join(root, 'src', 'vkeyboardhand.css');
const distDir = join(root, 'dist');

await mkdir(distDir, { recursive: true });

// 1. UMD：原样复制
const umd = await readFile(srcJs, 'utf8');
await writeFile(join(distDir, 'vkeyboardhand.umd.js'), umd, 'utf8');

// 2. ESM：剥掉 UMD 外壳，保留工厂内部实现并追加导出
const factoryStart = '})(typeof self !== \'undefined\' ? self : this, function () {';
const startIdx = umd.indexOf(factoryStart);
if (startIdx === -1) throw new Error('无法定位 UMD 工厂函数起始位置');

const bodyStart = startIdx + factoryStart.length;
const bodyEndMarker = '\n  return VKeyboardHand;\n});';
const endIdx = umd.indexOf(bodyEndMarker);
if (endIdx === -1) throw new Error('无法定位 UMD 工厂函数结束位置');

const strictIdx = umd.indexOf("'use strict';", bodyStart);
const body = umd.slice(strictIdx, endIdx);

const esm = [
  '/**',
  ' * vkeyboardhand.esm.js（由 scripts/build.mjs 从 src/vkeyboardhand.js 生成）',
  ' * ESM 模块入口，供 Vite / Webpack / Rollup / Node ESM 等使用。',
  ' * GitHub: https://github.com/ayuday/vkeyboardhand',
  ' */',
  body,
  '',
  'export default VKeyboardHand;',
  'export { KEY_MAP, FINGER_MAP, FINGERS, createVKeyboardHand };',
  'export const version = VKeyboardHand.version;',
  ''
].join('\n');

await writeFile(join(distDir, 'vkeyboardhand.esm.mjs'), esm, 'utf8');

// 3. CSS：原样复制
const css = await readFile(srcCss, 'utf8');
await writeFile(join(distDir, 'vkeyboardhand.css'), css, 'utf8');

console.log('构建完成：');
console.log('  - dist/vkeyboardhand.umd.js');
console.log('  - dist/vkeyboardhand.esm.mjs');
console.log('  - dist/vkeyboardhand.css');
