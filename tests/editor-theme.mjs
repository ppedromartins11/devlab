/** Regression guard: the transparent editing layer must never obscure syntax highlighting. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const root=new URL('../',import.meta.url);
const read=(name)=>readFileSync(new URL(name,root),'utf8');
const css=read('offline/source/dark-v13.css');
const html=read('offline/index.html');
const starter=read('offline/source/app.js');

assert.match(css,/textarea:not\(#code-editor\)/, 'Form CSS should exclude syntax-highlighted editor');
assert.match(css,/\.editor-code\s*>\s*#code-editor\s*\{[^}]*background:\s*transparent\s*!important/i,'Editor input must have transparent background');
assert.match(css,/\.editor-code\s*>\s*#code-editor\s*\{[^}]*-webkit-text-fill-color:\s*transparent\s*!important/i,'Editor input should not obscure syntax highlight');
assert.match(css,/\.editor-code\s*>\s*#syntax-layer\s*\{[^}]*color:\s*#[a-f\d]{3,8}/i, 'Syntax layer should have visible foreground');
assert.match(html,/<pre\s+aria-hidden="true"\s+id="syntax-layer">/, 'Build must expose syntax layer');
assert.match(html,/<textarea\s+id="code-editor"/, 'Build must expose editable textarea');
assert.match(html,/\.editor-code\s*>\s*#code-editor\s*\{[^}]*background:\s*transparent\s*!important/i,'Generated production HTML must contain editor fix');
assert.match(starter,/function\s+refreshEditor\(\)/, 'Editor highlighting must refresh after editing');
console.log('OK — editor com camada transparente, sintaxe visível e build estático sincronizado.');
