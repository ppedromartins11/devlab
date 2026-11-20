import test from 'node:test';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {careerProjects,careerFindProject,careerValidateRecord,careerProgress,careerPortfolioHtml,careerPortfolioMarkdown,gitInitial,gitEdit,gitExecute,gitMilestones} from '../src/career.js';

test('três projetos com briefings e critérios reais de revisão',()=>{
 assert.equal(careerProjects.length,3);
 assert.deepEqual(careerProjects.map(p=>p.id),['site','api','fullstack']);
 for(const p of careerProjects){assert.ok(p.checks.length>=7);assert.ok(p.review.length>=4);assert.ok(p.goal.length>30);assert.ok(p.tech.length>=4);assert.equal(careerFindProject(p.id),p);}
 assert.equal(careerFindProject('inexistente'),null);
});
test('progresso é autodeclarado e índices inválidos não contam',()=>{
 const p=careerProjects[0];const r=careerValidateRecord(p,{checks:[0,0,1,999,-1,'2'],review:[1,1,20],notes:'texto'});
 assert.deepEqual(r.checks,[0,1]);assert.deepEqual(r.review,[1]);assert.equal(careerProgress(p,r).selfReported,false);
 const done=careerProgress(p,{checks:p.checks.map((_,i)=>i),review:p.review.map((_,i)=>i)});
 assert.equal(done.selfReported,true);assert.equal(done.percent,100);
 assert.throws(()=>careerProgress('nao-existe',{}));
});
test('links HTTPS e conteúdo HTML são escapados; javascript e credenciais bloqueados',()=>{
 const x=careerValidateRecord('site',{repo:'javascript:alert(1)',demo:'https://user:pass@github.com/repo',notes:'<script>alert(1)</script>',checks:[0]});
 assert.equal(x.repo,'');assert.equal(x.demo,'');
 const html=careerPortfolioHtml({name:'<img src=x onerror=alert(1)>',about:'<script>alert(1)</script>'},{site:{...x,repo:'https://github.com/exemplo/projeto',demo:'data:text/html,evil'}});
 assert.doesNotMatch(html,/<script>|<img src=x/);
 assert.match(html,/&lt;script&gt;/);
 assert.match(html,/noopener noreferrer/);
 assert.doesNotMatch(html,/data:text\/html/);
 assert.match(html,/não constituem certificação independente/);
 const md=careerPortfolioMarkdown({name:'Pessoa <X>'},{site:{...x,repo:'https://github.com/exemplo/projeto'}});
 assert.match(md,/Checklist registrado pelo estudante/);assert.match(md,/Não representa certificação/);
});
test('Git simula o fluxo branch -> staging -> commit -> merge com consistência',()=>{
 let s=gitInitial();s=gitEdit(s,'<h1>Meu projeto</h1>');
 assert.match(gitExecute(s,'git status').output,/Modificados: index.html/);
 assert.equal(gitExecute(s,'git switch main').history.at(-1).ok,false);
 s=gitExecute(s,'git switch -c feat/cabecalho');assert.equal(s.branch,'feat/cabecalho');assert.equal(gitMilestones(s).branch,true);
 s=gitExecute(s,'git add index.html');assert.deepEqual(Object.keys(s.staged),['index.html']);
 s=gitExecute(s,'git commit -m "feat: melhora cabeçalho"');assert.equal(s.commits.length,2);assert.equal(gitMilestones(s).commit,true);
 s=gitExecute(s,'git switch main');assert.equal(s.branch,'main');assert.match(s.working['index.html'],/Primeira versão/);
 s=gitExecute(s,'git merge feat/cabecalho');assert.equal(gitMilestones(s).merge,true);assert.match(s.working['index.html'],/Meu projeto/);
 assert.match(gitExecute(s,'git log --oneline').output,/feat: melhora cabeçalho/);
});
test('Git recusa commits vazios e merges inválidos sem avançar a branch',()=>{
 let s=gitInitial();assert.equal(gitExecute(s,'git commit -m "feat: teste"').history.at(-1).ok,false);
 assert.equal(gitExecute(s,'git merge inexistente').history.at(-1).ok,false);
 assert.equal(gitExecute(s,'git switch -c ../abc').history.at(-1).ok,false);
 s=gitEdit(s,'ABC');s=gitExecute(s,'git add index.html');s=gitExecute(s,'git restore --staged index.html');
 assert.deepEqual(s.staged,{});
 assert.equal(gitExecute(s,'git switch -c feat/minha-mudanca').history.at(-1).ok,true);
});

test('gerador offline preserva exports nos arquivos de starters Node',()=>{
 const html=readFileSync(new URL('../offline/index.html',import.meta.url),'utf8');
 assert.match(html,/export function memoryStore\(\)/);
 assert.match(html,/export function titleFrom\(input\)/);
 assert.match(html,/export function createApp\(store/);
});
