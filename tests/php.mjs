import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync,existsSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {phpModules,phpLessons,phpExamQuestions,findPhpLesson,phpModuleForLesson} from '../src/php-curriculum.js';
import {guidedLessonsFor,findGuidedLesson} from '../src/language-curriculum.js';
import {findLanguage} from '../src/learning-pathways.js';
const read=x=>readFileSync(new URL('../'+x, import.meta.url),'utf8');

test('PHP: 8 módulos, 32 aulas organizadas, sem IDs duplicados e cobertura por nível',()=>{
 assert.equal(phpModules.length,8);
 assert.equal(phpLessons.length,32);
 assert.deepEqual(guidedLessonsFor('php'),phpLessons);
 assert.equal(findLanguage('php')?.kind,'guided');
 assert.equal(findLanguage('php')?.count,32);
 assert.equal(new Set(phpLessons.map(l=>l.id)).size,32);
 const seen=new Set();
 for(const module of phpModules){
   assert.equal(module.lessonIds.length,4);
   assert.ok(module.summary&&module.objective&&module.level);
   for(const id of module.lessonIds){
     const lesson=findPhpLesson(id);
     assert.ok(lesson,`lesson missing ${id}`);
     assert.equal(findGuidedLesson(id),lesson);
     assert.equal(phpModuleForLesson(id),module);
     assert.equal(lesson.moduleId,module.id);
     assert.ok(!seen.has(id),`repeated ${id}`);
     seen.add(id);
     assert.equal(lesson.choices.length,3);
     assert.ok(Number.isInteger(lesson.answer)&&lesson.answer>=0&&lesson.answer<3);
     assert.ok(lesson.theory.length>=2&&lesson.theory.every(t=>t.length>70));
     assert.ok(lesson.example.startsWith('<?php'));
     assert.ok(lesson.task.length>35&&lesson.checks.length===3);
     assert.ok(lesson.explanation.length>20&&lesson.tip.startsWith('PROVA:'));
     assert.match(lesson.docs,/^https:\/\/www\.php\.net\/manual\/pt_BR\//);
   }
 }
 assert.equal(seen.size,32);
});

test('PHP: simulado completo em 8 módulos, respostas definidas e feedback disponível',()=>{
 assert.equal(phpExamQuestions.length,24);
 assert.equal(new Set(phpExamQuestions.map(q=>q.key)).size,24);
 for(const m of phpModules){assert.equal(phpExamQuestions.filter(q=>q.moduleId===m.id).length,3);}
 for(const q of phpExamQuestions){assert.equal(q.choices.length,3);assert.ok(q.answer>=0&&q.answer<=2);assert.ok(q.explanation.length>20);}
});

test('PHP: interface preserva progresso, navegação, recursos e simulado',()=>{
 const ui=read('offline/source/php-ui.js'),path=read('offline/source/pathways-ui.js'),build=read('offline/build_standalone.py');
 assert.ok(ui.includes("load('php-exam-state'"));
 assert.ok(ui.includes("save('php-exam-state'"));
 assert.ok(ui.includes('guidedLanguageComplete'));
 assert.ok(ui.includes('linguagem/php/simulado'));
 assert.ok(ui.includes('downloads/php-pizzaria-prova.zip'));
 assert.ok(path.includes("id==='php/simulado'")&&path.includes("id==='php'"));
 assert.ok(path.includes('phpLessonPage(id)'));
 assert.ok(build.includes("php-curriculum.js")&&build.includes("php-ui.js"));
 assert.ok(read('offline/index.html').includes('php-pizzaria-prova.zip'));
 assert.ok(read('offline/index.html').includes('32 aulas'));
 const zip=readFileSync(new URL('../offline/downloads/php-pizzaria-prova.zip',import.meta.url));
 assert.equal(zip.subarray(0,2).toString(),'PK');
 assert.ok(zip.length>1000);
});

test('PHP: todos os 32 exemplos passam php -l e o projeto local tem teste executável',t=>{
 const version=spawnSync('php',['-v'],{encoding:'utf8'});
 if(version.error||version.status!==0){t.skip('PHP CLI não disponível neste runner; estrutura curricular validada com Node');return;}
 const dir=mkdtempSync(join(tmpdir(),'devlab-php-'));
 try{
  for(const l of phpLessons){
   const file=join(dir,l.id+'.php');writeFileSync(file,l.example);
   const result=spawnSync('php',['-l',file],{encoding:'utf8',timeout:3500});
   assert.equal(result.status,0,`${l.id}: ${result.stderr||result.stdout}`);
  }
  const root=new URL('../examples/php-pizzaria/',import.meta.url);
  for(const path of ['src/functions.php','src/database.php','public/index.php','tests/test_functions.php']){
   const file=new URL(path,root).pathname;
   assert.ok(existsSync(file));
   const lint=spawnSync('php',['-l',file],{encoding:'utf8'});
   assert.equal(lint.status,0,`${path}: ${lint.stdout}${lint.stderr}`);
  }
  const result=spawnSync('php',[new URL('tests/test_functions.php',root).pathname],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);
  assert.match(result.stdout,/OK/);
 }finally{rmSync(dir,{recursive:true,force:true});}
});
