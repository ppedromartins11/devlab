import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { allLessons } from '../src/course.js';
import { lessonContracts, contractLessonIds, inspectTypeScriptContract } from '../src/lesson-contracts.js';
import { runtimeCheckedLessons, domCheckedLessons } from '../src/runtime-check.js';
import { inspectExercise } from '../src/learning.js';

assert.equal(contractLessonIds.length,15);
assert.equal(domCheckedLessons.size,12);
assert.equal(runtimeCheckedLessons.size,27);
assert.equal(allLessons.length,29);
assert.deepEqual(allLessons.filter(l=>!runtimeCheckedLessons.has(l.id)).map(l=>l.id),['projeto-integrador','proximos-passos']);
const vendor=new URL('../offline/vendor/typescript.js',import.meta.url);
let ts;
if(fs.existsSync(vendor)) {
  const tsContext={};vm.createContext(tsContext);
  vm.runInContext(fs.readFileSync(vendor,'utf8'),tsContext,{timeout:25000});
  ts=tsContext.ts;
} else {
  // O compilador de 9 MB está no ZIP local, mas é omitido do repositório.
  // No GitHub Actions, npm install fornece o pacote oficial.
  const imported=await import('typescript');
  ts=imported.default||imported;
}
assert(ts?.transpileModule,'Compilador TypeScript indisponível para validar contratos.');
for(const id of contractLessonIds) {
 const contract=lessonContracts[id],lesson=allLessons.find(x=>x.id===id);
 assert(lesson,`Missing lesson ${id}`);
 assert.equal(lesson.challenge,contract.challenge);
 assert.equal(lesson.starter.js,contract.starter);
 assert.equal(lesson.steps.length,3);
 assert(contract.tests.length>=3);
 assert.equal(new Set(contract.tests.map(x=>x.label)).size,contract.tests.length);
 assert.equal(inspectExercise(lesson,{html:lesson.starter.html,css:lesson.starter.css,[lesson.language==='ts'?'ts':'js']:contract.starter}).passed,false,id);
 if(contract.language==='ts'){
   const valid=inspectTypeScriptContract(ts,contract.starter,contract);
   assert(valid.every(c=>c.ok),`${id}: ${valid.filter(c=>!c.ok).map(c=>c.label).join('; ')}`);
   const withoutTypes=contract.starter.replace(/: (?:string|number|boolean)(?=[,):])/g,'');
   const checks=inspectTypeScriptContract(ts,withoutTypes,contract);
   if(withoutTypes!==contract.starter) assert(checks.some(c=>!c.ok),id+' ignored missing types');
   const compiled=ts.transpileModule(contract.starter,{fileName:'solution.ts',reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.None}});
   assert.equal((compiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0);
 }
}
assert.equal(inspectTypeScriptContract(ts,'function apresentarHoras(nome,horas) {return "a"}',lessonContracts['ts-intro']).some(c=>!c.ok),true);
assert.equal(inspectTypeScriptContract(ts,'function primeiro<T>(itens: T[]): T | undefined {return itens[0]}',lessonContracts['ts-generics']).every(c=>c.ok),true);
console.log('OK — 15 contratos, 27 aulas com validação, 2 marcos de entrega orientativa e tipos AST coerentes.');
