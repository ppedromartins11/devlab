/* Sprint 8: workspace de múltiplos arquivos para projetos reais (sem substituir a Oficina). */
const wst = {
  projects: load('workspace-projects', {}), activeId: load('workspace-active', ''), selected: '', logs: [],
  token: 0, device: 'desktop', consoleOpen: true, timer: null, editor: null, editorModel: null,
  monacoRequested: false, monacoLoading: false, monacoAvailable: Boolean(window.monaco?.editor),
  lastReady: false, popupKind: null, popupTarget: null
};
function workspaceInit() {
  const projects = Object.values(wst.projects).filter(p => {try { validateWorkspace(p);return true; }catch {return false;}});
  if(!projects.length){const project=createWorkspace('modular','TaskFlow modular');wst.projects={[project.id]:project};wst.activeId=project.id;workspaceSave();}
  else if(!wst.projects[wst.activeId])wst.activeId=projects[0].id;
  wst.selected=wst.projects[wst.activeId]?.selected||'src/main.js';
}
function workspaceProject(){return wst.projects[wst.activeId];}
function workspaceSave(){
  try{localStorage.setItem(PREFIX+'workspace-projects',JSON.stringify(wst.projects));localStorage.setItem(PREFIX+'workspace-active',JSON.stringify(wst.activeId));return true;}
  catch(error){console.warn('Workspace sem espaço de armazenamento',error);const status=$('#ws-save-status');if(status)status.textContent='Falha ao salvar · exporte um ZIP';return false;}
}
function workspaceUpdate(updated, selected=updated.selected){
  updated.updated=Date.now(); updated.selected=selected; validateWorkspace(updated);
  wst.projects[updated.id]=updated;wst.selected=selected;workspaceSave();
}
function workspaceType(path){return path.endsWith('.html')?'HTML':path.endsWith('.css')?'CSS':path.endsWith('.json')?'JSON':path.endsWith('.md')?'Markdown':'JS';}
function workspaceTree(project){
  const files=Object.keys(project.files).sort((a,b)=>a.localeCompare(b,'pt-BR'));
  const folders=[...new Set([...(project.folders||[]),...files.flatMap(path=>path.split('/').slice(0,-1).map((_,i)=>path.split('/').slice(0,i+1).join('/')))])].sort();
  const nodes=[...folders.map(path=>({path,folder:true})),...files.map(path=>({path,folder:false}))].sort((a,b)=>a.path.localeCompare(b.path,'pt-BR'));
  return nodes.map(node=>{
    const depth=node.path.split('/').length-1;
    if(node.folder)return `<div class="ws-tree-folder" style="--depth:${depth}"><span aria-hidden="true">⌄</span> ${esc(node.path.split('/').at(-1))}</div>`;
    const active=node.path===wst.selected;
    return `<button role="treeitem" aria-selected="${active}" class="ws-tree-file ${active?'active':''}" style="--depth:${depth}" data-ws-file="${esc(node.path)}" title="${esc(node.path)}"><span class="ws-file-ext ext-${workspaceType(node.path).toLowerCase()}">${workspaceType(node.path)==='HTML'?'◇':workspaceType(node.path)==='CSS'?'#':workspaceType(node.path)==='JSON'?'{}':workspaceType(node.path)==='Markdown'?'MD':'JS'}</span><span>${esc(node.path.split('/').at(-1))}</span>${node.path===project.entry?'<small>●</small>':''}</button>`;
  }).join('');
}
function workspacePage(){
  const p=workspaceProject();
  if(!p)return '<div class="study-page">Projeto indisponível.</div>';
  if(!Object.hasOwn(p.files,wst.selected))wst.selected=p.entry;
  const tabs=Object.keys(p.files).sort((a,b)=>a===p.entry?-1:b===p.entry?1:a.localeCompare(b));
  const value=p.files[wst.selected]||'';
  return `<section class="ws-page" aria-label="Workspace de desenvolvimento">
    <div class="ws-page-heading"><div><span class="section-kicker">SPRINT 08 · DESENVOLVIMENTO REAL</span><h1>Seu espaço de desenvolvimento.</h1><p>Organize arquivos, conecte módulos com import/export e veja a aplicação ganhar forma.</p></div><div class="ws-header-actions"><button data-ws-action="import-taskflow" class="ws-outline">Trazer TaskFlow das aulas</button><button data-ws-action="export" class="ws-main-button">↓ Exportar ZIP</button></div></div>
    <div class="ws-toolbar"><div class="ws-select-wrap"><label for="ws-project-select">Projeto</label><select id="ws-project-select">${Object.values(wst.projects).map(item=>`<option value="${esc(item.id)}" ${item.id===p.id?'selected':''}>${esc(item.name)}</option>`).join('')}</select></div><button data-ws-action="new-project" title="Novo projeto">＋ Novo projeto</button><button data-ws-action="rename-project" title="Renomear projeto">Renomear</button><span class="ws-toolbar-spacer"></span><span class="ws-storage"><span class="ws-storage-dot"></span><span id="ws-save-status">Arquivos salvos neste navegador</span></span></div>
    <div class="ws-shell"><aside class="ws-explorer"><div class="ws-explorer-head"><span>EXPLORADOR</span><div><button data-ws-action="add-file" title="Novo arquivo" aria-label="Novo arquivo">＋</button><button data-ws-action="add-folder" title="Nova pasta" aria-label="Nova pasta">▤</button></div></div><div class="ws-explorer-project">▾ ${esc(p.name)}</div><nav role="tree" aria-label="Arquivos do projeto">${workspaceTree(p)}</nav><div class="ws-explorer-help"><strong>Estrutura real</strong><p>Use <code>import</code> e <code>export</code> em arquivos .js. O projeto é executado na prévia isolada.</p></div></aside>
    <div class="ws-central"><div class="ws-editor-tabs" role="tablist" aria-label="Abas de arquivos">${tabs.map(path=>`<button role="tab" aria-selected="${path===wst.selected}" class="ws-editor-tab ${path===wst.selected?'selected':''}" data-ws-file="${esc(path)}" title="${esc(path)}">${esc(path.split('/').at(-1))}</button>`).join('')}</div><div class="ws-file-toolbar"><span><span class="ws-file-dot"></span>${esc(wst.selected)}</span><div><span id="ws-editor-kind">Editor de código</span><button data-ws-action="set-entry" ${wst.selected===p.entry?'disabled':''} title="Executar este módulo inicial">${wst.selected===p.entry?'● Inicial':'Definir inicial'}</button><button data-ws-action="rename-file" title="Renomear arquivo">Renomear</button><button data-ws-action="delete-file" class="ws-danger" title="Excluir arquivo">Excluir</button></div></div><div class="ws-editor-area"><div id="ws-editor-monaco" class="ws-monaco"></div><div class="ws-fallback" id="ws-editor-fallback"><div id="ws-editor-lines" class="ws-lines">1</div><div class="ws-edit-code"><pre id="ws-syntax" aria-hidden="true">${syntax(value)}</pre><textarea id="ws-code-editor" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Código do arquivo ${esc(wst.selected)}">${esc(value)}</textarea></div></div></div><div class="ws-editor-bottom"><span><kbd>Ctrl</kbd> + <kbd>Enter</kbd> para executar</span><button data-ws-action="run" class="ws-run">▶ Executar projeto</button></div></div>
    <div class="ws-output"><div class="ws-output-header"><div><strong>Prévia</strong><span id="ws-live-dot" class="ws-preview-dot"></span></div><div class="ws-output-device"><button data-ws-action="desktop" class="${wst.device==='desktop'?'active':''}" aria-label="Prévia desktop">▣</button><button data-ws-action="mobile" class="${wst.device==='mobile'?'active':''}" aria-label="Prévia celular">▯</button><button data-ws-action="run" aria-label="Atualizar prévia">↻</button></div></div><div class="ws-frame-container ${wst.device==='mobile'?'ws-frame-mobile':''}"><iframe id="ws-preview-frame" sandbox="allow-scripts allow-forms" title="Aplicação em execução isolada"></iframe></div><div class="ws-console-header"><strong>Console</strong><span id="ws-console-count">0</span><button data-ws-action="clear-console">Limpar</button></div><div class="ws-console" id="ws-console" aria-live="polite">${workspaceLogs()}</div><div class="ws-output-foot" id="ws-preview-status">Prévia isolada · HTML, CSS e módulos JavaScript</div></div></div>
    <div class="ws-guidance"><strong>Pratique como em um projeto real</strong><p>Comece em <code>src/main.js</code>, investigue <code>src/tasks.js</code> e experimente criar um módulo. O JavaScript executa apenas dentro de um iframe isolado. Não digite senhas ou credenciais. Para usar npm, backend e um terminal de verdade, exporte o ZIP e abra no VS Code.</p></div>
    <dialog id="ws-dialog" class="ws-dialog"><form id="ws-dialog-form"><h2 id="ws-dialog-title">Novo arquivo</h2><p id="ws-dialog-description">Caminhos relativos, como src/helpers.js</p><label for="ws-dialog-value" id="ws-dialog-label">Caminho ou nome</label><input type="text" id="ws-dialog-value" maxlength="180" required autocomplete="off"><p id="ws-dialog-error" class="ws-dialog-error" role="alert"></p><div><button type="button" data-ws-action="cancel-dialog" class="ws-outline">Cancelar</button><button type="submit" class="ws-main-button">Confirmar</button></div></form></dialog>
  </section>`;
}
function workspaceLogs(){return wst.logs.length?wst.logs.map(row=>`<div class="ws-console-row level-${esc(row.level)}"><span>${row.level==='error'?'×':row.level==='warn'?'!':'›'}</span><code>${esc((row.args||[]).join(' '))}</code></div>`).join(''):'<p class="ws-console-empty">Use console.log() no seu módulo para acompanhar a execução.</p>';}
function workspaceUpdateLogs(){const el=$('#ws-console'),count=$('#ws-console-count');if(el){el.innerHTML=workspaceLogs();el.scrollTop=el.scrollHeight;}if(count)count.textContent=String(wst.logs.length);}
function workspaceEditorDispose(){if(wst.editor){try{wst.editor.dispose()}catch{}wst.editor=null;}if(wst.editorModel){try{wst.editorModel.dispose()}catch{}wst.editorModel=null;}}
function workspaceUpdateSyntax(){const input=$('#ws-code-editor');if(!input)return;const pre=$('#ws-syntax'),lines=$('#ws-editor-lines');if(pre)pre.innerHTML=syntax(input.value);if(lines)lines.textContent=Array.from({length:Math.max(1,input.value.split('\n').length)},(_,i)=>i+1).join('\n');}
function workspaceEditorValue(value){
  const p=workspaceProject();if(!p || !Object.hasOwn(p.files,wst.selected))return;
  try{const updated={...p,files:{...p.files,[wst.selected]:value}};validateWorkspace(updated);workspaceUpdate(updated,wst.selected);const label=$('#ws-save-status');if(label)label.textContent='Salvo agora';}
  catch(error){const label=$('#ws-save-status');if(label)label.textContent=error.message;return;}
  workspaceUpdateSyntax();clearTimeout(wst.timer);wst.timer=setTimeout(workspaceRunPreview,750);
}
function workspaceMonacoMount(){
  const p=workspaceProject(),target=$('#ws-editor-monaco');if(!target||!p)return;
  const fallback=$('#ws-editor-fallback');
  if(!window.monaco?.editor){workspaceMonacoLoad();return;}
  if(wst.editor)return;
  try{
    const path=wst.selected,lang=path.endsWith('.css')?'css':path.endsWith('.html')?'html':path.endsWith('.json')?'json':'javascript';
    wst.editorModel=window.monaco.editor.createModel(p.files[path],lang);
    wst.editor=window.monaco.editor.create(target,{model:wst.editorModel,theme:'vs-dark',fontFamily:'Consolas, Menlo, monospace',fontSize:13,minimap:{enabled:false},scrollBeyondLastLine:false,automaticLayout:true,wordWrap:'on',tabSize:2,renderLineHighlight:'line',padding:{top:18},overviewRulerBorder:false});
    wst.editor.onDidChangeModelContent(()=>workspaceEditorValue(wst.editor.getValue()));
    wst.editor.addCommand(window.monaco.KeyMod.CtrlCmd|window.monaco.KeyCode.Enter,()=>workspaceRunPreview());
    target.style.display='block';if(fallback)fallback.style.display='none';const kind=$('#ws-editor-kind');if(kind)kind.textContent='Monaco Editor';
  }catch(error){console.warn('Monaco indisponível; usando editor nativo.',error);workspaceEditorDispose();}
}
function workspaceMonacoLoad(){
  if(wst.monacoRequested)return;wst.monacoRequested=true;
  const base='https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs';
  const script=document.createElement('script');script.src=base+'/loader.js';script.async=true;
  script.onload=()=>{try{window.require.config({paths:{vs:base}});window.require(['vs/editor/editor.main'],()=>{if(getRoute().page==='workspace')workspaceMonacoMount();},()=>{});}catch(error){console.warn('Não foi possível carregar o Monaco',error);}};
  script.onerror=()=>{const kind=$('#ws-editor-kind');if(kind)kind.textContent='Editor local (offline)';};
  document.head.appendChild(script);
}
function workspaceMount(){workspaceUpdateSyntax();workspaceMonacoMount();workspaceRunPreview();}
function workspaceStorageBucket(){return PREFIX+'workspace-preview:'+wst.activeId;}
function workspaceStorage(){try{const value=JSON.parse(localStorage.getItem(workspaceStorageBucket())||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}catch{return {};}}
function workspaceRunPreview(){
  const frame=$('#ws-preview-frame');if(!frame)return;
  const p=workspaceProject();wst.logs=[];wst.lastReady=false;workspaceUpdateLogs();
  const status=$('#ws-preview-status');if(status)status.textContent='Executando módulos…';
  const token=++wst.token;
  try{
    const src=buildWorkspacePreview(p,token,workspaceStorage());
    frame.srcdoc=src;
  }catch(error){wst.logs.push({level:'error',args:[error.message||String(error)]});workspaceUpdateLogs();if(status)status.textContent='Erro de configuração · veja o console';frame.srcdoc='<!doctype html><title>Erro de projeto</title><p>Corrija o problema indicado no console.</p>';}
}
window.addEventListener('message',event=>{
  if(getRoute().page!=='workspace')return;
  const frame=$('#ws-preview-frame'),data=event.data;
  if(!frame||event.source!==frame.contentWindow||!data||data.__devlab_workspace!==true||data.token!==wst.token)return;
  if(data.kind==='log'){wst.logs.push(data.payload);if(wst.logs.length>120)wst.logs.shift();workspaceUpdateLogs();}
  else if(data.kind==='ready'){wst.lastReady=true;const status=$('#ws-preview-status');if(status)status.textContent='Projeto carregado · origem isolada';const dot=$('#ws-live-dot');if(dot)dot.classList.add('ready');}
  else if(data.kind==='storage'){try{localStorage.setItem(workspaceStorageBucket(),JSON.stringify(data.payload));}catch(error){wst.logs.push({level:'error',args:['Não foi possível persistir localStorage do projeto.']});workspaceUpdateLogs();}}
});
function workspaceShowDialog(kind,initial='',target=''){
  const dialog=$('#ws-dialog');if(!dialog)return;
  const labels={'add-file':['Novo arquivo','Digite o caminho, incluindo a extensão, como src/utils.js.'],'add-folder':['Nova pasta','Digite o caminho da pasta, como src/components.'],'rename-file':['Renomear arquivo','Os imports que usam o nome antigo precisam ser atualizados manualmente.'],'new-project':['Novo projeto','O projeto atual continua salvo.'],'rename-project':['Renomear projeto','Altere o nome de exibição deste projeto.']};
  wst.popupKind=kind;wst.popupTarget=target;
  $('#ws-dialog-title').textContent=labels[kind][0];$('#ws-dialog-description').textContent=labels[kind][1];$('#ws-dialog-value').value=initial;$('#ws-dialog-error').textContent='';
  dialog.showModal();$('#ws-dialog-value').focus();
}
function workspaceSubmitDialog(){
  const kind=wst.popupKind,value=$('#ws-dialog-value').value.trim(),p=workspaceProject();let next;
  try{
    if(!value)throw new Error('Preencha este campo.');
    if(kind==='add-file'){next=workspaceAdd(p,value);workspaceUpdate(next,value);}
    else if(kind==='add-folder'){next=workspaceAddFolder(p,value);workspaceUpdate(next);}
    else if(kind==='rename-file'){next=workspaceRename(p,wst.popupTarget,value);workspaceUpdate(next,next.selected);}
    else if(kind==='new-project'){
      if(value.length>60)throw new Error('Máximo de 60 caracteres.');
      next=createWorkspace('modular',value);wst.projects[next.id]=next;wst.activeId=next.id;wst.selected=next.entry;workspaceSave();
    }else if(kind==='rename-project'){if(value.length>60)throw new Error('Máximo de 60 caracteres.');workspaceUpdate({...p,name:value});}
    $('#ws-dialog').close();workspaceEditorDispose();render();
  }catch(error){$('#ws-dialog-error').textContent=error.message||String(error);}
}
function workspaceAction(name){
  const p=workspaceProject();if(!p)return;
  if(name==='run'){workspaceRunPreview();return;}
  if(name==='desktop'||name==='mobile'){wst.device=name;workspaceEditorDispose();render();return;}
  if(name==='clear-console'){wst.logs=[];workspaceUpdateLogs();return;}
  if(name==='cancel-dialog'){$('#ws-dialog')?.close();return;}
  if(name==='add-file'||name==='add-folder'||name==='new-project')return workspaceShowDialog(name);
  if(name==='rename-project')return workspaceShowDialog(name,p.name);
  if(name==='rename-file')return workspaceShowDialog(name,wst.selected,wst.selected);
  if(name==='delete-file'){
    if(!confirm('Excluir '+wst.selected+'? Essa operação não pode ser desfeita.'))return;
    try{workspaceUpdate(workspaceDelete(p,wst.selected));workspaceEditorDispose();render();}catch(error){toast(error.message)}return;
  }
  if(name==='set-entry'){
    if(!/\.(js|mjs)$/.test(wst.selected)){toast('Escolha um arquivo .js para ser o módulo inicial.');return;}
    try{workspaceUpdate({...p,entry:wst.selected});workspaceEditorDispose();render();}catch(error){toast(error.message)}return;
  }
  if(name==='import-taskflow'){
    if(!confirm('Criar uma cópia do TaskFlow atual das aulas em um novo projeto? O original será preservado.'))return;
    const clone=createWorkspace('basic','TaskFlow · cópia das aulas');
    clone.files['index.html']=st.projectJs.html||clone.files['index.html'];clone.files['styles/style.css']=st.projectJs.css||clone.files['styles/style.css'];clone.files['src/main.js']=st.projectJs.js||clone.files['src/main.js'];
    try{validateWorkspace(clone);wst.projects[clone.id]=clone;wst.activeId=clone.id;wst.selected=clone.entry;workspaceSave();workspaceEditorDispose();render();toast('Cópia criada sem alterar o TaskFlow original.');}catch(error){toast(error.message)}return;
  }
  if(name==='export'){
    try{const data=workspaceZip(p);const url=URL.createObjectURL(data);const link=document.createElement('a');link.href=url;link.download=(p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'devlab-projeto')+'.zip';link.click();setTimeout(()=>URL.revokeObjectURL(url),3000);toast('Projeto exportado em ZIP.');}
    catch(error){toast('Exportação falhou: '+error.message)}
  }
}
window.addEventListener('click',event=>{
  if(getRoute().page!=='workspace')return;
  const file=event.target.closest('[data-ws-file]');
  if(file){const p=workspaceProject(),next=file.dataset.wsFile;if(!Object.hasOwn(p.files,next)||next===wst.selected)return;workspaceEditorDispose();wst.selected=next;p.selected=next;workspaceSave();render();return;}
  const control=event.target.closest('[data-ws-action]');if(control){workspaceAction(control.dataset.wsAction);}
});
window.addEventListener('input',event=>{
  if(getRoute().page==='workspace'&&event.target?.id==='ws-code-editor')workspaceEditorValue(event.target.value);
});
window.addEventListener('scroll',event=>{
  if(event.target?.id!=='ws-code-editor')return;const editor=event.target,highlight=$('#ws-syntax'),lines=$('#ws-editor-lines');if(highlight){highlight.scrollTop=editor.scrollTop;highlight.scrollLeft=editor.scrollLeft;}if(lines)lines.scrollTop=editor.scrollTop;
},true);
window.addEventListener('keydown',event=>{
  if(getRoute().page!=='workspace')return;
  if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();workspaceRunPreview();return;}
  if(event.target?.id==='ws-code-editor'&&event.key==='Tab'){event.preventDefault();const input=event.target,start=input.selectionStart,end=input.selectionEnd;input.value=input.value.slice(0,start)+'  '+input.value.slice(end);input.selectionStart=input.selectionEnd=start+2;workspaceEditorValue(input.value);}
});
window.addEventListener('change',event=>{
  if(event.target?.id==='ws-project-select'){const id=event.target.value;if(!wst.projects[id])return;wst.activeId=id;wst.selected=wst.projects[id].selected||wst.projects[id].entry;workspaceSave();workspaceEditorDispose();render();}
});
window.addEventListener('submit',event=>{
  if(event.target?.id==='ws-dialog-form'){event.preventDefault();workspaceSubmitDialog();}
});
workspaceInit();
