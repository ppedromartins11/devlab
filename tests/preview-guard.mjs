import assert from 'node:assert/strict';
import { previewSafetyWarning } from '../src/preview-guard.js';
assert(previewSafetyWarning('while(true) { counter++; }'));
assert(previewSafetyWarning('for(;;) { console.log(1) }'));
assert(previewSafetyWarning('document.addEventListener("click", ()=>{while(1){}})'));
assert.equal(previewSafetyWarning('for(let i=0;i<5;i++){console.log(i)}'),null);
assert.equal(previewSafetyWarning('const snippet = "while(true)"; // for(;;)'),null);
assert.equal(previewSafetyWarning('/* while(true) */ function f(){return 0}'),null);
console.log('OK — padrões de loops óbvios bloqueados antes da prévia.');
