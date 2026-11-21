import assert from 'node:assert/strict';
import {test} from 'node:test';
import {learningAreas,searchLearningCatalog,normalizeStudyStep} from '../src/learning-navigation.js';

test('navegação separa aprender, praticar e construir sem árvore lateral',()=>{
 assert.deepEqual(learningAreas.map(x=>x.id),['learn','practice','build']);
 const all=learningAreas.flatMap(x=>x.routes);
 assert.equal(all.length,10);
 assert.equal(new Set(all.map(x=>x.route)).size,all.length);
 assert.ok(all.some(x=>x.route==='workspace'));
 assert.ok(all.some(x=>x.route==='backend'));
});

test('busca encontra aulas por termos independentes e não altera o catálogo original',()=>{
 const items=[{title:'O documento e a árvore HTML',summary:'Conhecendo head e body',area:'Frontend',route:'frontend/aula/html-documento'},
 {title:'Funções JavaScript',summary:'Parâmetros e retornos',area:'JavaScript',route:'aula/funcoes'},
 {title:'Criação de APIs',summary:'Node e requisições',area:'Backend',route:'backend/aula/http'}];
 assert.equal(searchLearningCatalog('html documento',items)[0].route,items[0].route);
 assert.equal(searchLearningCatalog('  fuNÇões   javascript ',items).length,1);
 assert.equal(searchLearningCatalog('código inexistente',items).length,0);
 assert.equal(searchLearningCatalog(' ',items).length,0);
 assert.equal(searchLearningCatalog('a',items,1).length,1);
 assert.equal(items.length,3);
});

test('etapas inválidas não pulam ou bloqueiam o estudo',()=>{
 assert.equal(normalizeStudyStep(undefined),0);
 assert.equal(normalizeStudyStep('4'),4);
 assert.equal(normalizeStudyStep('9'),0);
 assert.equal(normalizeStudyStep(-1),0);
 assert.equal(normalizeStudyStep('errado'),0);
});

test('o build estático inclui navegação limpa e módulos de estudo',async()=>{
 const fs=await import('node:fs');
 const html=fs.readFileSync(new URL('../offline/index.html',import.meta.url),'utf8');
 for(const value of ['cl-study-tabs','cl-nav-groups','cl-track-item','learningCatalogEntries','mountCareerModules','studyUi'])assert.ok(html.includes(value),value);
});
