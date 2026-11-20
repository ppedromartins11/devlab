import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname,join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {backendTracks,backendLessons,findBackendTrack,findBackendLesson,backendTrackProgress} from '../src/backend-curriculum.js';
import {backendStarterFiles} from '../src/backend-starters.js';
import {simulateBackendRequest,backendLabInitial} from '../src/backend-http-lab.js';
import {archiveTextFiles} from '../src/workspace-engine.js';

const ids=['node','http','postgres','auth','quality'];
test('currículo tem cinco trilhas, 25 aulas únicas e contratos de estudo',()=>{
 assert.deepEqual(backendTracks.map(t=>t.id),ids);
 assert.equal(backendLessons.length,25);
 assert.equal(new Set(backendLessons.map(l=>l.id)).size,25);
 for(const t of backendTracks){
  assert.equal(t.lessons.length,5,t.id);
  assert.ok(t.description.length>70,t.id);
  assert.ok(t.outcome.length>55,t.id);
  assert.equal(findBackendTrack(t.id),t);
  assert.equal(backendTrackProgress([],t),0);
  assert.equal(backendTrackProgress(t.lessons.map(l=>l.id),t),5);
 }
 assert.equal(findBackendLesson('inexistente'),null);
 for(const l of backendLessons){
  assert.ok(l.minutes>=15 && l.minutes<=35,l.id);
  assert.ok(l.objective.length>50,l.id);
  assert.equal(l.theory.length,2,l.id);
  assert.ok(l.theory.every(p=>p.length>120),l.id);
  assert.ok(l.example.length>=48,l.id);
  assert.ok(l.practice.length>65,l.id);
  assert.equal(l.checks.length,3,l.id);
  assert.equal(new Set(l.checks).size,3,l.id);
  assert.equal(l.quiz.options.length,3,l.id);
  assert.ok(Number.isInteger(l.quiz.answer) && l.quiz.answer>=0 && l.quiz.answer<3,l.id);
  assert.ok(l.quiz.explanation.length>60,l.id);
 }
});

test('todos os starters usam estrutura real Node e incluem testes HTTP',()=>{
 for(const t of backendTracks){for(const original of t.lessons){
  const l=findBackendLesson(original.id);
  const files=backendStarterFiles(t,l),pkg=JSON.parse(files['package.json']);
  assert.equal(pkg.type,'module');assert.equal(pkg.scripts.test,'node --test');
  assert.ok(files['src/app.js'].includes('createServer'));
  assert.ok(files['test/api.test.js'].includes('fetch'));
  assert.ok(files['README.md'].includes(l.practice));
  assert.ok(files['README.md'].includes('não é uma avaliação automática') || files['README.md'].includes('não executa'));
  assert.ok(!Object.hasOwn(files,'.env'));
  assert.ok(!Object.hasOwn(files,'node_modules'));
  if(['postgres','auth','quality'].includes(t.id)){
    assert.ok(pkg.dependencies.pg);
    assert.match(files['src/task-repository.js'],/owner_id=\$2/);
    assert.ok(files['sql/001_init.sql'].includes('FOREIGN KEY') || files['sql/001_init.sql'].includes('REFERENCES users'));
    assert.ok(files['README.md'].includes('ainda não está ligada'));
  }
  if(['auth','quality'].includes(t.id)){
    assert.match(files['src/passwords.js'],/scrypt/);
    assert.match(files['src/sessions.js'],/HttpOnly/);
    assert.match(files['README.md'],/ainda não tem login/);
  }
 }
 }
});

test('ZIP válido para os cinco tipos sem caminhos fora da raiz',async()=>{
 for(const track of backendTracks){
  const files=backendStarterFiles(track,findBackendLesson(track.lessons[0].id));
  const zip=archiveTextFiles(files),buffer=Buffer.from(await zip.arrayBuffer());
  assert.equal(buffer.readUInt32LE(0),0x04034b50);
  assert.equal(buffer.readUInt32LE(buffer.length-22),0x06054b50);
  assert.equal(buffer.readUInt16LE(buffer.length-12),Object.keys(files).length);
 }
 assert.throws(()=>archiveTextFiles({'../segredo.sql':'select 1'}),/inválido|pasta do projeto/);
 assert.throws(()=>archiveTextFiles({'src/.env':'secreto'}),/inválido/);
});

test('lab diferencia público, autenticação, proprietário e admin',()=>{
 let state=backendLabInitial();
 const visit=simulateBackendRequest(state,{method:'GET',path:'/health',role:'guest'});assert.equal(visit.status,200);
 assert.equal(simulateBackendRequest(state,{method:'GET',path:'/tasks',role:'guest'}).status,401);
 assert.equal(simulateBackendRequest(state,{method:'GET',path:'/admin/users',role:'alice'}).status,403);
 assert.equal(simulateBackendRequest(state,{method:'GET',path:'/admin/users',role:'admin'}).status,200);
 assert.equal(simulateBackendRequest(state,{method:'GET',path:'/tasks/2',role:'alice'}).status,404);
 assert.equal(simulateBackendRequest(state,{method:'PATCH',path:'/tasks/2',role:'alice',body:'{"completed":true}'}).status,404);
 assert.equal(simulateBackendRequest(state,{method:'DELETE',path:'/tasks/2',role:'alice'}).status,404);
 assert.equal(simulateBackendRequest(state,{method:'GET',path:'/tasks',role:'alice'}).body.items.length,1);
 assert.equal(simulateBackendRequest(state,{method:'GET',path:'/tasks',role:'admin'}).body.items.length,2);
});

test('lab opera CRUD sem atualizar estado na requisição inválida',()=>{
 let state=backendLabInitial();
 const bad=simulateBackendRequest(state,{method:'POST',path:'/tasks',role:'alice',body:'{"title":"   "}'});
 assert.equal(bad.status,422);assert.equal(bad.state.items.length,2);
 assert.equal(simulateBackendRequest(state,{method:'POST',path:'/tasks',role:'alice',body:'{' }).status,400);
 assert.equal(simulateBackendRequest(state,{method:'POST',path:'/tasks',role:'alice',body:'{"title":23}' }).status,422);
 const created=simulateBackendRequest(state,{method:'POST',path:'/tasks',role:'alice',body:'{"title":"  Testar API  "}'});
 state=created.state;assert.equal(created.status,201);assert.equal(created.body.title,'Testar API');assert.equal(state.items.length,3);
 const update=simulateBackendRequest(state,{method:'PATCH',path:'/tasks/3',role:'alice',body:'{"completed":true}'});
 state=update.state;assert.equal(update.status,200);assert.equal(state.items.find(x=>x.id===3).completed,true);
 const deleted=simulateBackendRequest(state,{method:'DELETE',path:'/tasks/3',role:'alice'});
 state=deleted.state;assert.equal(deleted.status,204);assert.equal(deleted.body,null);assert.equal(state.items.length,2);
 assert.equal(simulateBackendRequest(state,{method:'GET',path:'/tasks/3',role:'alice'}).status,404);
 assert.equal(simulateBackendRequest(state,{method:'PUT',path:'/tasks',role:'alice'}).status,405);
 assert.equal(simulateBackendRequest(state,{method:'GET',path:'https://example.com/tasks',role:'alice'}).status,400);
});

test('HTML publicado inclui rotas backend, navegação e simulador',()=>{
 const html=readFileSync(new URL('../offline/index.html',import.meta.url),'utf8');
 assert.ok(html.includes('backend/trilha/'));
 assert.ok(html.includes('backend/aula/'));
 assert.ok(html.includes('backend/lab'));
 assert.ok(html.includes('Formação backend'));
 assert.ok(html.includes('backend-quiz'));
 assert.ok(html.includes('Simulação didática'));
 assert.ok(html.length>420000);
});


test('projetos Node exportados executam testes HTTP reais sem banco remoto',()=>{
 const temp=mkdtempSync(join(tmpdir(),'devlab-backend-ci-'));
 try {
  for(const type of ['node','auth','quality']){
    const track=findBackendTrack(type),files=backendStarterFiles(track,findBackendLesson(track.lessons[0].id));
    const root=join(temp,type);
    for(const [path,content] of Object.entries(files)){
      const target=join(root,path);mkdirSync(dirname(target),{recursive:true});writeFileSync(target,content);
    }
    const env={...process.env};delete env.NODE_TEST_CONTEXT;delete env.NODE_TEST_WORKER_ID;
    const tests=Object.keys(files).filter(p=>p.startsWith('test/')&&p.endsWith('.test.js'));
    const output=execFileSync(process.execPath,['--test',...tests],{cwd:root,encoding:'utf8',timeout:20_000,env});
    assert.match(output,/# fail 0/);
    if(type==='quality')assert.match(output,/frontend de estudo é servido/);
  }
 } finally {rmSync(temp,{recursive:true,force:true});}
});
