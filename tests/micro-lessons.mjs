import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {microChallenges,findMicroChallenge,gradeMicroAnswer,normalizeMicroAnswer} from '../src/micro-lessons.js';
import {allLessons} from '../src/course.js';
import {frontendLessons} from '../src/frontend-curriculum.js';
import {backendLessons} from '../src/backend-curriculum.js';
import {guidedLanguageLessons} from '../src/language-curriculum.js';
const read=x=>readFileSync(new URL('../'+x,import.meta.url),'utf8');
const catalog=new Set([...allLessons,...frontendLessons,...backendLessons,...Object.values(guidedLanguageLessons).flat()].map(x=>x.id));

test('microdesafios: itens autorais com vínculo real com aulas existentes',()=>{
 const ids=Object.keys(microChallenges);
 assert.equal(ids.length,32);
 for(const [id,exercise] of Object.entries(microChallenges)){
  assert.equal(id,exercise.lessonId);
  assert.ok(catalog.has(id),'Aula não encontrada: '+id);
  assert.ok(exercise.prompt.length>25,'Enunciado curto: '+id);
  assert.equal((exercise.snippet.match(/____/g)||[]).length>=1,true,'Lacuna não encontrada: '+id);
  assert.ok(exercise.answers.length>=1&&exercise.answers.every(x=>x.length>0),'Resposta inválida '+id);
  assert.equal(exercise.hints.length,2);
  assert.ok(exercise.hints.every(x=>x.length>25),'Dica insuficiente: '+id);
  assert.ok(exercise.explanation.length>40,'Feedback insuficiente: '+id);
  assert.equal(findMicroChallenge(id),exercise);
 }
 assert.equal(findMicroChallenge('aula-inexistente'),null);
 assert.ok(microChallenges['primeiros-passos'].suggestions.includes('log'));
 assert.ok(Object.values(microChallenges).filter(x=>x.suggestions).length>=10);
 for(const lesson of Object.values(microChallenges).filter(x=>x.suggestions))assert.ok(lesson.suggestions.includes(lesson.answers[0]),lesson.lessonId);
});

test('correção textual respeita sintaxe, rejeita vazio, não executa programas',()=>{
 for(const exercise of Object.values(microChallenges)){
  assert.ok(gradeMicroAnswer(exercise,exercise.answers[0]),exercise.lessonId);
  assert.ok(gradeMicroAnswer(exercise,'  '+exercise.answers[0]+'  '),exercise.lessonId);
  assert.equal(gradeMicroAnswer(exercise,''),false,exercise.lessonId);
  assert.equal(gradeMicroAnswer(exercise,'resposta-errada-que-não-faz-parte-do-código'),false,exercise.lessonId);
 }
 assert.equal(normalizeMicroAnswer('  nome  '),'nome');
 assert.equal(gradeMicroAnswer(null,'abc'),false);
 assert.equal(gradeMicroAnswer({answers:[]},'abc'),false);
});

test('build inclui exercício e interface nas rotas de linguagens e editor',()=>{
 const build=read('offline/build_standalone.py'),app=read('offline/source/app.js');
 const lang=read('offline/source/pathways-ui.js'),php=read('offline/source/php-ui.js');
 const ui=read('offline/source/micro-lessons-ui.js'),css=read('offline/source/micro-v21.css');
 for(const file of ['micro-lessons.js','micro-lessons-ui.js','micro-v21.css'])assert.ok(build.includes(file),file);
 assert.ok(app.includes('microChallengeHtml(l.id)'));
 assert.ok(lang.includes('microChallengeHtml(l.id)'));
 assert.ok(php.includes('microChallengeHtml(id)'));
 assert.ok(read('offline/source/learning-shell.js').includes('microChallengeHtml(id)'));
 for(const key of ['micro-completed','micro-drafts','micro-attempts','micro-hints'])assert.ok(ui.includes(key));
 assert.match(ui,/role="status"/);
 assert.match(css,/:focus-visible/);
 assert.doesNotMatch(ui,/\beval\s*\(|\bnew Function\s*\(/);
 const html=read('offline/index.html');
 assert.ok(html.includes('microChallengeHtml(')&&html.includes('data-micro-form'),'build sem microaula');
 const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
 assert.equal(scripts.length,1,'um script principal embutido');
 assert.doesNotThrow(()=>new vm.Script(scripts[0][1]),'bundle não deve ter erros de sintaxe');
});
