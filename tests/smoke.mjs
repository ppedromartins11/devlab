import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { allJsLessons, allTsLessons, allLessons, jsUnits, tsUnits, projectStarter, typescriptProjectStarter } from '../src/course.js';
import { buildPreview, makeExportHtml } from '../src/preview.js';

assert.equal(allJsLessons.length, 24, 'Quantidade de aulas de JavaScript');
assert.equal(allTsLessons.length, 5, 'Quantidade de aulas de TypeScript');
assert.equal(jsUnits.length, 6, 'Quantidade de unidades JS');
assert.equal(tsUnits.length, 1, 'Quantidade de unidades TS');
assert.equal(new Set(allLessons.map(l=>l.id)).size, allLessons.length, 'IDs únicos');

for (const l of allLessons) {
  assert(l.theory.length >= 2, `Teoria ausente: ${l.id}`);
  assert(l.challenge.length > 30 && l.steps.length >= 2, `Desafio incompleto: ${l.id}`);
  assert(l.project.length > 20, `Projeto não vinculado à aula: ${l.id}`);
  assert(l.starter.html && l.starter.css, `HTML/CSS ausentes: ${l.id}`);
  assert(l.starter.js !== undefined, `Código inicial ausente: ${l.id}`);
}
for (const l of allJsLessons) {
  new Function(l.starter.js);
  new Function(l.example);
}
new Function(projectStarter.js);
assert(projectStarter.js.includes('TODO'), 'Projeto inicial deve ser evolutivo');

const context={};
vm.createContext(context);
vm.runInContext(fs.readFileSync(new URL('../offline/vendor/typescript.js', import.meta.url),'utf8'), context, {timeout:25000});
assert(context.ts?.transpileModule, 'Compilador TypeScript offline disponível');
for (const l of allTsLessons) {
  for (const source of [l.starter.js,l.example]) {
    const result=context.ts.transpileModule(source,{fileName:'app.ts',reportDiagnostics:true,compilerOptions:{target:context.ts.ScriptTarget.ES2020,module:context.ts.ModuleKind.None}});
    const errors=(result.diagnostics||[]).filter(d=>d.category===context.ts.DiagnosticCategory.Error);
    assert.equal(errors.length,0,`Erros TS em ${l.id}: ${errors.map(e=>e.messageText).join(', ')}`);
  }
}
const p=buildPreview({html:'<main>Olá</main>',css:'body{color:red}',js:'console.log("Executou")',token:5,stored:{tema:'dark'}});
assert(p.includes('sandbox')===false, 'Sandbox é configurado no iframe, não no srcdoc');
assert(p.includes('getItem') && p.includes('setItem'), 'Ponte de armazenamento não encontrada');
assert(p.includes('window.addEventListener') && p.includes('console.error'), 'Captura de erros ausente');
const exported=makeExportHtml({html:projectStarter.html,css:projectStarter.css,js:projectStarter.js});
assert(exported.includes('</script>') && exported.includes('<style>'), 'Exportação HTML incompleta');
const standalone=fs.readFileSync(new URL('../offline/index.html', import.meta.url),'utf8');
assert(standalone.includes('EDITOR DE CÓDIGO') && standalone.includes('function runPreview()'), 'Site offline não contém laboratório');
assert((standalone.match(/<\/script>/g)||[]).length===1, 'O JavaScript embutido não deve fechar a tag script antes do fim');
assert(standalone.includes('workspace.css')===false && standalone.includes('--primary: #225d4c'), 'Sistema visual não incorporado ao HTML offline');
assert(standalone.includes('cdn.jsdelivr.net/npm/typescript@5.9.3'), 'Fallback TypeScript online ausente');
new vm.Script(standalone.slice(standalone.indexOf('<script>') + 8, standalone.lastIndexOf('</script>')));
console.log('OK — 29 aulas, exemplos, exercícios, projeto evolutivo, TypeScript, exportação e HTML offline verificados.');
