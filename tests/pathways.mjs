import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {pathwayTracks,languageCatalog,findPathway,findLanguage,pathwayLessonRoute,pathwayLessonIds} from '../src/learning-pathways.js';
import {guidedLanguageLessons,findGuidedLesson,guidedLessonsFor} from '../src/language-curriculum.js';
import {allLessons} from '../src/course.js';
import {frontendLessons} from '../src/frontend-curriculum.js';
import {backendLessons} from '../src/backend-curriculum.js';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const content={js:new Set(allLessons.map(l=>l.id)),ts:new Set(allLessons.map(l=>l.id)),frontend:new Set(frontendLessons.map(l=>l.id)),backend:new Set(backendLessons.map(l=>l.id))};

test('trilhas profissionais próprias e separadas por carreira',()=>{
 assert.deepEqual(pathwayTracks.map(x=>x.id),['frontend','backend','fullstack']);
 for(const path of pathwayTracks){
  assert.equal(path.stages.length,6);
  assert.ok(path.reference.startsWith('https://roadmap.sh/'));
  assert.equal(pathwayLessonIds(path).length, new Set(pathwayLessonIds(path)).size);
  assert.equal(findPathway(path.id),path);
  for(const stage of path.stages){
   assert.ok(stage.topics.length>=3 && stage.practice.length>=30 && stage.deliverable.length>=20);
   assert.ok(stage.lessons.length>=3);
   assert.ok(stage.reference.startsWith('https://roadmap.sh/'));
   for(const item of stage.lessons){
    assert.ok(content[item.kind].has(item.id),`aula inexistente: ${path.id}/${stage.id}/${item.kind}:${item.id}`);
    assert.ok(pathwayLessonRoute(item).endsWith('/'+item.id));
   }
  }
 }
});

test('biblioteca independente com cursos reais e aulas guiadas',()=>{
 assert.deepEqual(languageCatalog.map(l=>l.id),['javascript','typescript','python','java','php','sql']);
 assert.equal(languageCatalog.reduce((n,l)=>n+(l.kind==='guided'?l.count:0),0),42);
 for(const l of languageCatalog){assert.equal(findLanguage(l.id),l);assert.ok(l.roadmap.startsWith('https://roadmap.sh/'));}
 for(const id of ['python','java']){
  assert.equal(guidedLessonsFor(id).length,5);
  for(const l of guidedLessonsFor(id)){
   assert.equal(findGuidedLesson(l.id),l);
   assert.equal(l.choices.length,3);
   assert.ok(l.answer>=0&&l.answer<=2);
   assert.ok(l.theory.length>=2 && l.checks.length>=3 && l.example.length>30);
   assert.ok(l.docs.startsWith('https://'), 'source URL');
  }
 }
});

test('rotas e salvamento novos sem alterar chaves das aulas anteriores',()=>{
 const app=read('offline/source/app.js'),ui=read('offline/source/pathways-ui.js'),build=read('offline/build_standalone.py');
 for(const route of ['trilhas','trilha/','linguagens','linguagem/aula/'])assert.ok(app.includes(route),`rota ${route}`);
 for(const key of ['pathway-checkpoints','language-quiz','language-checks','language-notes'])assert.ok(ui.includes(key));
 assert.ok(ui.includes('st.completed.includes(item.id)'));
 assert.ok(ui.includes('frontendDone(l)')&&ui.includes('backendDone(l)'));
 assert.ok(build.includes('learning-pathways.js')&&build.includes('language-curriculum.js'));
 assert.ok(build.includes('pathways-v14.css'));
 assert.ok(read('offline/index.html').includes('Desenvolvedor Full-Stack'));
});
