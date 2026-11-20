import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {
 createWorkspace,validateWorkspace,workspacePath,workspaceAdd,workspaceRename,workspaceDelete,
 workspaceAddFolder,workspaceRewriteImports,buildWorkspacePreview,workspaceZip,
 WORKSPACE_MAX_FILES
} from '../src/workspace-engine.js';

test('template inicial tem 4 arquivos e módulo ES com export',()=>{
 const p=createWorkspace();assert.equal(Object.keys(p.files).length,4);assert.ok(p.files['src/tasks.js'].includes('export function adicionarTarefa'));
 assert.ok(p.files['src/main.js'].includes("from './tasks.js'"));assert.equal(validateWorkspace(p),true);
});
test('caminhos inválidos são recusados',()=>{
 for(const path of ['/absolute.js','../escape.js','./../escape.js','C:/local.js','src/../../bad.js','src/file?.js','src\\code.js'])assert.throws(()=>workspacePath(path));
 assert.equal(workspacePath('../utils.js','src/lib'),'src/utils.js');
});
test('arquivos, pastas, renomeações e remoção preservam o projeto',()=>{
 let p=createWorkspace();p=workspaceAddFolder(p,'src/components');p=workspaceAdd(p,'src/components/Card.js','export const Card = () => 1;');
 assert.ok(p.folders.includes('src/components'));
 p=workspaceRename(p,'src/components/Card.js','src/components/Item.js');
 assert.ok(p.files['src/components/Item.js']);assert.equal(p.files['src/components/Card.js'],undefined);
 p=workspaceDelete(p,'src/components/Item.js');assert.equal(p.files['src/components/Item.js'],undefined);
 assert.throws(()=>workspaceDelete(p,'index.html'));assert.throws(()=>workspaceDelete(p,p.entry));
 assert.throws(()=>workspaceRename(p,p.entry,'src/start.js'));
});
test('limites rejeitam arquivos enormes e extensões arriscadas',()=>{
 let p=createWorkspace();assert.throws(()=>workspaceAdd(p,'config.php','secret'));assert.throws(()=>workspaceAdd(p,'src/big.js','x'.repeat(100001)));
 for(let i=0;i<WORKSPACE_MAX_FILES-4;i++)p=workspaceAdd(p,`src/t${i}.js`,'');
 assert.equal(Object.keys(p.files).length,WORKSPACE_MAX_FILES);
 assert.throws(()=>workspaceAdd(p,'src/extra.js',''));
});
test('imports ES resolvem módulos locais sem permitir traversal e remotos',()=>{
 const p=createWorkspace();p.files['src/helpers.js']='export const um = 1';
 const code=`import {um} from './helpers.js';\nexport { adicionarTarefa } from './tasks.js';\nimport('./tasks.js').then(console.log);`;
 const output=workspaceRewriteImports(code,'src/main.js',p.files);
 assert.ok(output.includes("from '@devlab/src/helpers.js'"));
 assert.ok(output.includes("from '@devlab/src/tasks.js'"));
 assert.ok(output.includes("import('@devlab/src/tasks.js')"));
 assert.throws(()=>workspaceRewriteImports("import './missing.js'",'src/main.js',p.files),/não encontrado/);
 assert.throws(()=>workspaceRewriteImports("import x from 'react'",'src/main.js',p.files),/não suportada/);
});
test('prévia contém import-map, isolação por token e storage virtual',()=>{
 const p=createWorkspace();const html=buildWorkspacePreview(p,'secret-test',{tasks:'[]'});
 assert.ok(html.includes('@devlab/src/main.js'));assert.ok(html.includes('@devlab/src/tasks.js'));
 assert.ok(html.includes('secret-test'));assert.ok(html.includes('__devlab_workspace'));
 assert.ok(html.includes('localStorage'));assert.ok(!html.includes('src="./src/main.js"'));
});
test('exportação ZIP válida, com diretórios e UTF-8',async()=>{
 const p=createWorkspace();p.files['src/tasks.js']+='// Olá! ✅';
 const bytes=new Uint8Array(await workspaceZip(p).arrayBuffer());assert.equal(String.fromCharCode(...bytes.slice(0,4)),'PK\x03\x04');
 const dir=mkdtempSync(join(tmpdir(),'devlab8-'));const zipPath=join(dir,'project.zip');fs.writeFileSync(zipPath,bytes);
 const listing=execFileSync('unzip',['-Z1',zipPath],{encoding:'utf-8'});
 assert.ok(listing.includes('index.html'));assert.ok(listing.includes('src/main.js'));assert.ok(listing.includes('src/tasks.js'));
 execFileSync('unzip',['-t',zipPath],{stdio:'pipe'});
 const exported=execFileSync('unzip',['-p',zipPath,'src/tasks.js'],{encoding:'utf-8'});
 assert.ok(exported.includes('Olá! ✅'));
 fs.rmSync(dir,{recursive:true,force:true});
});

test('README.md pode ser editado e exportado sem ser executado como módulo',()=>{
 let p=createWorkspace();p=workspaceAdd(p,'README.md','# Instruções\n');
 assert.equal(validateWorkspace(p),true);
 assert.ok(p.files['README.md'].includes('Instruções'));
 assert.ok(buildWorkspacePreview(p,'test').includes('@devlab/src/main.js'));
});
