import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {allLessons} from '../src/course.js';
import {frontendLessons} from '../src/frontend-curriculum.js';
import {backendLessons} from '../src/backend-curriculum.js';
import {guidedLanguageLessons} from '../src/language-curriculum.js';
import {microChallenges as existingMicro} from '../src/micro-lessons.js';
import {completeMicroChallenges,allMicroLessonIds,findCompleteMicroChallenge,microCoverageReport,allMicroLessonData,microActivityKey} from '../src/micro-coverage.js';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');

test('100% das aulas distintas têm um desafio de código ligado à aula',()=>{
 const unique=new Set([...allLessons,...frontendLessons,...backendLessons,...Object.values(guidedLanguageLessons).flat()].map(x=>x.id));
 assert.equal(unique.size,176,'há três IDs de aula reutilizados entre cursos');
 assert.equal(allMicroLessonData.length,179);
 assert.equal(allMicroLessonIds.length,179);
 assert.equal(new Set(allMicroLessonIds).size,179);
 for(const {lesson,group} of allMicroLessonData){
  const activity=microActivityKey(lesson.id,group);
  assert.equal(findCompleteMicroChallenge(activity)?.lessonId,lesson.id,group+':'+lesson.id);
 }
 for(const id of unique)assert.ok(findCompleteMicroChallenge(id)||allMicroLessonData.some(x=>x.lesson.id===id));
 assert.equal(findCompleteMicroChallenge('inexistente'),null);
 const report=microCoverageReport();
 assert.equal(report.total,179);
 assert.equal(report.curated,Object.keys(existingMicro).length);
 assert.equal(report.derived,179-Object.keys(existingMicro).length);
 console.log('CURRICULAR_COVERAGE_REPORT',JSON.stringify(report));
 console.log('FALLBACK_ITEMS',JSON.stringify(Object.values(completeMicroChallenges).filter(x=>x.quality==='identifier').map(x=>({id:x.activityId,title:x.title,answer:x.answers[0]}))));
});

test('cada atividade inclui lacuna, resposta, duas dicas e prática específica',()=>{
 for(const task of Object.values(completeMicroChallenges)){
  assert.ok((task.snippet.match(/____/g)||[]).length>=1&&
   (task.snippet.match(/____/g)||[]).length<=(task.source==='curated'?2:1),task.lessonId);
  assert.ok(task.title.length>12&&task.prompt.length>25,task.lessonId+' enunciado');
  assert.ok(task.answers?.length>=1&&task.answers[0].length>0,task.lessonId+' resposta');
  assert.equal(task.hints?.length,2,task.lessonId+' dicas');
  assert.ok(task.explanation.length>40,task.lessonId+' explicação');
  assert.ok(task.practice.length>25,task.lessonId+' prática');
  assert.ok(task.checks.length>=2,task.lessonId+' critérios');
  assert.ok(task.starterCode.length>12,task.lessonId+' starter');
  assert.ok(task.fullExample.length>12,task.lessonId+' exemplo');
  assert.ok(task.route.includes(task.lessonId),task.lessonId+' rota');
  if(task.source==='derived-from-example'){
   const filled=task.snippet.replace('____',task.answers[0]);
   assert.ok(task.fullExample.includes(filled),task.lessonId+' trecho não é parte do exemplo da aula');
   assert.equal(task.suggestions?.length,3,task.lessonId+' opções de toque');
   assert.ok(task.suggestions.includes(task.answers[0]),task.lessonId+' alternativa correta');
  }
 }
});

test('nenhum exercício altera IDs anteriores nem executa código digitado na interface',()=>{
 const ui=read('offline/source/micro-lessons-ui.js'),build=read('offline/build_standalone.py');
 for(const key of ['micro-completed','micro-drafts','micro-practice-drafts','micro-attempts','micro-hints'])assert.ok(ui.includes(key));
 for(const key of ['data-micro-practice-input','data-micro-practice-copy','data-micro-open-practice','data-micro-form'])assert.ok(ui.includes(key));
 for(const dependency of ['micro-coverage.js','micro-rulebook.js'])assert.ok(build.includes(dependency));
 assert.doesNotMatch(ui,/\b(?:eval|Function)\s*\(/);
 assert.ok(ui.includes('não é executado nem avaliado automaticamente'));
 assert.ok(read('offline/source/app.js').includes('microChallengeHtml(l.id)'));
 assert.ok(read('offline/source/php-ui.js').includes("microChallengeHtml(id,'php')"));
 assert.ok(read('offline/source/learning-shell.js').includes('microChallengeHtml(id,kind)'));
});

test('biblioteca possui cobertura de JS TS Python Java PHP SQL frontend e backend',()=>{
 const rows=allMicroLessonData;
 const counts=Object.fromEntries(['javascript','typescript','python','java','php','sql','frontend','backend']
  .map(group=>[group,rows.filter(r=>r.group===group).length]));
 assert.deepEqual(counts,{javascript:33,typescript:15,python:17,java:17,php:32,sql:15,frontend:25,backend:25});
 for(const r of rows)assert.ok(findCompleteMicroChallenge(microActivityKey(r.lesson.id,r.group)));
});
