import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync, mkdtempSync, writeFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import vm from 'node:vm';
import ts from 'typescript';
import {languageCatalog} from '../src/learning-pathways.js';
import {guidedLanguageLessons} from '../src/language-curriculum.js';
import {extendedPythonLessons, extendedJavaLessons, guidedSqlLessons, extendedJavaScriptLessons, extendedTypeScriptLessons} from '../src/extended-language-curriculum.js';
import {allJsLessons, allTsLessons} from '../src/course.js';

const read = path => readFileSync(new URL('../' + path, import.meta.url),'utf8');
const count = id => languageCatalog.find(l=>l.id===id)?.count;

test('biblioteca: seis percursos, índices persistentes e quantidades coerentes',()=>{
  assert.deepEqual(languageCatalog.map(l=>l.id),['javascript','typescript','python','java','php','sql']);
  const totals={javascript:allJsLessons.length+extendedJavaScriptLessons.length,typescript:allTsLessons.length+extendedTypeScriptLessons.length,python:guidedLanguageLessons.python.length,java:guidedLanguageLessons.java.length,php:guidedLanguageLessons.php.length,sql:guidedLanguageLessons.sql.length};
  for(const [id,total] of Object.entries(totals))assert.equal(count(id),total,id);
  const all=Object.values(guidedLanguageLessons).flat();
  assert.equal(new Set(all.map(l=>l.id)).size,all.length,'IDs únicos em todas as linguagens');
  for(const id of ['py-intro','py-test','java-intro','java-tests','php-servidor','php-projeto-final'])assert.ok(all.some(l=>l.id===id),'ID de progresso removido: '+id);
});

test('aulas: teoria, código, questão, feedback, prática e documentação real',()=>{
  const all=Object.values(guidedLanguageLessons).flat();
  for(const l of all){
    assert.ok(l.id.length>4&&l.title.length>=5&&l.goal?.length>=16,'objetivo incompleto '+l.id);
    assert.ok(l.theory?.length>=2&&l.theory.every(v=>v.length>35),'teoria insuficiente '+l.id);
    assert.ok(l.example?.length>35,'código ausente '+l.id);
    assert.ok(l.question?.length>15&&l.choices?.length===3,'pergunta insuficiente '+l.id);
    assert.ok(Number.isInteger(l.answer)&&l.answer>=0&&l.answer<3,'gabarito inválido '+l.id);
    assert.ok(l.explanation?.length>=20,'sem explicação '+l.id);
    assert.ok(l.task?.length>30&&l.checks?.length===3,'prática incompleta '+l.id);
    assert.ok(l.docs?.startsWith('https://'),'referência ausente '+l.id);
  }
});

test('currículo não promove preparação para exame nem confunde quiz com competência prática',()=>{
  const visible=read('offline/source/php-ui.js')+read('src/php-curriculum.js')+read('src/learning-pathways.js');
  assert.doesNotMatch(visible,/\b(prepara[çc][ãa]o para prova|passar na prova|PROVA:|modo prova|questão de prova)\b/i);
  assert.match(read('offline/source/pathways-ui.js'),/não substituem testes reais|não executa este exemplo automaticamente/i);
  assert.match(read('offline/source/php-ui.js'),/não demonstram, sozinhas, capacidade/i);
});

test('examples: JavaScript avançado pode ser analisado por parser',()=>{
  for(const l of extendedJavaScriptLessons)assert.doesNotThrow(()=>new vm.Script(l.example),l.id);
});

test('examples: TypeScript avançado não tem falha de parsing',()=>{
  for(const l of extendedTypeScriptLessons){
    const result=ts.transpileModule(l.example,{fileName:l.id+'.ts',reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}});
    const errors=(result.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error);
    assert.equal(errors.length,0,l.id+': '+errors.map(d=>String(d.messageText)).join(', '));
  }
});

test('examples: Python pode ser compilado sem executar efeitos colaterais',t=>{
  const py=spawnSync('python3',['--version'],{encoding:'utf8'});
  if(py.error||py.status!==0){t.skip('Python 3 não instalado');return;}
  const dir=mkdtempSync(join(tmpdir(),'devlab-python-'));
  try{
    for(const l of extendedPythonLessons){
      const path=join(dir,l.id+'.py');
      writeFileSync(path,l.example,'utf8');
      const result=spawnSync('python3',['-c','import ast,sys;ast.parse(open(sys.argv[1],encoding="utf-8").read())',path],{encoding:'utf8',timeout:4000});
      assert.equal(result.status,0,l.id+': '+result.stderr);
    }
  }finally{rmSync(dir,{recursive:true,force:true});}
});

test('examples: Java pode ser compilado em JDK disponível',async t=>{
  const javac=spawnSync('javac',['-version'],{encoding:'utf8'});
  if(javac.error||javac.status!==0){t.skip('JDK não instalado');return;}
  const dir=mkdtempSync(join(tmpdir(),'devlab-java-'));
  try{
    for(const l of extendedJavaLessons){
      const folder=join(dir,l.id);
      const {mkdirSync}=await import('node:fs');
      mkdirSync(folder);
      writeFileSync(join(folder,'Main.java'),l.example,'utf8');
      const result=spawnSync('javac',['Main.java'],{cwd:folder,encoding:'utf8',timeout:7000});
      assert.equal(result.status,0,l.id+': '+result.stderr);
    }
  }finally{rmSync(dir,{recursive:true,force:true});}
});
