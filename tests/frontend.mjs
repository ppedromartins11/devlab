import test from 'node:test';
import assert from 'node:assert/strict';
import {frontendTracks,frontendLessons,findFrontendLesson,findFrontendTrack,frontendTrackProgress} from '../src/frontend-curriculum.js';
import {frontendStarterFiles,frontendWorkspaceStarter} from '../src/frontend-starters.js';
import {archiveTextFiles,validateWorkspace,createWorkspace} from '../src/workspace-engine.js';
import {readFileSync} from 'node:fs';

const expected=['html','css','javascript','typescript','react'];

test('cinco percursos originais, 25 aulas e ids exclusivos',()=>{
 assert.deepEqual(frontendTracks.map(x=>x.id),expected);
 assert.equal(frontendLessons.length,25);
 assert.equal(new Set(frontendLessons.map(x=>x.id)).size,frontendLessons.length);
 for(const track of frontendTracks){
   assert.equal(track.lessons.length,5);
   assert.ok(track.description.length>80 && track.outcome.length>40);
   assert.equal(frontendTrackProgress([],track),0);
   assert.equal(frontendTrackProgress(track.lessons.map(x=>x.id),track),5);
   assert.equal(findFrontendTrack(track.id),track);
 }
 assert.equal(findFrontendLesson('inexistente'),null);
});

test('todas as aulas têm objetivo, teoria, exemplo, prática, três critérios e quiz válido',()=>{
 for(const l of frontendLessons){
  assert.ok(l.minutes>=10 && l.minutes<=35,l.id);
  assert.ok(l.objective.length>=30,l.id);
  assert.ok(l.theory.length===2 && l.theory.every(s=>s.length>=125),l.id);
  assert.ok(l.example.length>=30,l.id);
  assert.ok(l.practice.length>=50,l.id);
  assert.equal(l.checks.length,3,l.id);
  assert.equal(new Set(l.checks).size,3,l.id);
  assert.equal(l.quiz.options.length,3,l.id);
  assert.ok(Number.isInteger(l.quiz.answer) && l.quiz.answer>=0 && l.quiz.answer<3,l.id);
  assert.ok(l.quiz.explanation.length>35,l.id);
 }
});

test('projetos HTML/CSS/JS abrem no Workspace sem contaminar projeto padrão',()=>{
 for(const type of ['html','css','javascript']){
  const track=findFrontendTrack(type);
  for(const lesson of track.lessons){
   const starter=frontendWorkspaceStarter(track,frontendLessons.find(l=>l.id===lesson.id));
   const base=createWorkspace('basic','Teste');
   const project={...base,files:starter.files,entry:starter.entry,selected:'index.html'};
   assert.equal(validateWorkspace(project),true);
   assert.ok(project.files['index.html'].includes('lang="pt-BR"'));
   assert.ok(project.files['src/main.js'].includes("./utils.js"));
   assert.ok(project.files['src/utils.js'].includes('export function'));
   assert.ok(project.files['styles/style.css'].length>100);
  }
 }
});

test('TypeScript entrega projeto Vite tipado com compilação estrita',()=>{
 const track=findFrontendTrack('typescript');
 for(const lesson of track.lessons){
  const files=frontendStarterFiles(track,findFrontendLesson(lesson.id));
  const pkg=JSON.parse(files['package.json']);
  assert.equal(pkg.scripts.typecheck,'tsc --noEmit');
  const config=JSON.parse(files['tsconfig.json']);
  assert.equal(config.compilerOptions.strict,true);
  assert.ok(files['src/main.ts'].includes('interface Tarefa'));
  assert.ok(files['README.md'].includes(lesson.practice));
 }
});

test('React entrega Vite JSX funcional e componentes a completar',()=>{
 const track=findFrontendTrack('react');
 for(const lesson of track.lessons){
  const files=frontendStarterFiles(track,findFrontendLesson(lesson.id));
  const pkg=JSON.parse(files['package.json']);
  assert.ok(pkg.dependencies.react);
  assert.ok(files['src/main.jsx'].includes('createRoot'));
  assert.ok(files['src/App.jsx'].includes('useState'));
  assert.ok(files['src/App.jsx'].includes('TODO'));
  assert.ok(files['README.md'].includes('npm run dev'));
 }
});

test('ZIP de starter aceita JSX/TS e recusa caminhos maliciosos',async()=>{
 for(const type of ['react','typescript']){
  const track=findFrontendTrack(type),files=frontendStarterFiles(track,findFrontendLesson(track.lessons[0].id));
  const zip=archiveTextFiles(files);
  const buffer=Buffer.from(await zip.arrayBuffer());
  assert.equal(buffer.readUInt32LE(0),0x04034b50);
  assert.equal(buffer.readUInt32LE(buffer.length-22),0x06054b50);
  assert.equal(buffer.readUInt16LE(buffer.length-12),Object.keys(files).length);
 }
 assert.throws(()=>archiveTextFiles({'../secret.txt':'danger'}),/(inválido|pasta do projeto)/);
 assert.throws(()=>archiveTextFiles({'x.exe':'x'}),/(inválido|pasta do projeto)/);
});

test('HTML standalone inclui os dados da formação e controles de rota',()=>{
 const html=readFileSync(new URL('../offline/index.html',import.meta.url),'utf8');
 assert.ok(html.includes('frontend/trilha/'));
 assert.ok(html.includes('data-ft-starter'));
 assert.ok(html.includes('Formação frontend'));
 assert.ok(html.includes('frontend-quiz'));
 assert.ok(html.length>300000);
});
