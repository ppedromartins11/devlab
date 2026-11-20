/** DevLab workspace: regras puras de projeto, módulos e exportação (sem DOM do host). */
export const WORKSPACE_MAX_FILES = 32;
export const WORKSPACE_MAX_FILE_BYTES = 100_000;
export const WORKSPACE_MAX_TOTAL_BYTES = 480_000;
export const WORKSPACE_EXTENSIONS = ['html', 'css', 'js', 'mjs', 'json', 'md'];

const makeId = () => 'ws-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
const utf8Bytes = value => new TextEncoder().encode(String(value)).length;

export function workspacePath(input, base = '') {
  if (typeof input !== 'string' || !input.trim() || input.includes('\\') || input.includes('\0') || input.startsWith('/') || /^[a-z]+:/i.test(input)) throw new Error('Use um caminho relativo, como src/util.js.');
  const parts = (base ? base.split('/').filter(Boolean) : []).concat(input.split('/'));
  const output = [];
  for (const part of parts) {
    if (part === '.' || part === '') continue;
    if (part === '..') { if (!output.length) throw new Error('O arquivo não pode sair da pasta do projeto.'); output.pop(); continue; }
    if (!/^[a-zA-Z0-9_\- .]+$/.test(part) || part.length > 90 || part.trim() !== part || part.startsWith('.')) throw new Error('Nome inválido. Use letras, números, espaços, _ e -.');
    output.push(part);
  }
  if (!output.length || output.join('/').length > 180) throw new Error('Caminho vazio ou muito longo.');
  return output.join('/');
}
export function validateWorkspace(project) {
  if (!project || typeof project !== 'object' || !project.files || typeof project.files !== 'object' || Array.isArray(project.files)) throw new Error('Projeto inválido.');
  const files = Object.entries(project.files);
  if (!files.length || files.length > WORKSPACE_MAX_FILES) throw new Error(`Use entre 1 e ${WORKSPACE_MAX_FILES} arquivos.`);
  let total = 0;
  for (const [path, source] of files) {
    if (workspacePath(path) !== path) throw new Error('Caminho de arquivo inválido: ' + path);
    const ext = path.split('.').pop().toLowerCase();
    if (!WORKSPACE_EXTENSIONS.includes(ext)) throw new Error('Extensão não suportada: ' + path);
    if (typeof source !== 'string' || utf8Bytes(source) > WORKSPACE_MAX_FILE_BYTES) throw new Error('Arquivo muito grande: ' + path);
    total += utf8Bytes(source);
  }
  if (total > WORKSPACE_MAX_TOTAL_BYTES) throw new Error('Projeto acima do limite de 480 KB.');
  if (!Object.hasOwn(project.files, 'index.html')) throw new Error('O projeto precisa de index.html na raiz.');
  if (!project.entry || !Object.hasOwn(project.files, project.entry) || !/\.(js|mjs)$/.test(project.entry)) throw new Error('Selecione um módulo JavaScript inicial válido.');
  return true;
}
export function createWorkspace(template='modular', name='Meu workspace') {
  const base = {
    id:makeId(), name, entry:'src/main.js', selected:'src/main.js', folders:['src','styles'], files:{}, version:1, updated:Date.now()
  };
  base.files['index.html'] = `<!doctype html>\n<html lang="pt-BR">\n<head>\n  <meta charset="utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n  <title>${template==='modular'?'TaskFlow':'Meu primeiro site'}</title>\n  <link rel="stylesheet" href="./styles/style.css" />\n</head>\n<body>\n  <main class="app">\n    <span class="eyebrow">DEVLAB / WORKSPACE</span>\n    <h1 id="heading">${template==='modular'?'Minhas tarefas':'Meu primeiro site'}</h1>\n    <p id="message">${template==='modular'?'Organize seu dia em pequenas etapas.':'Personalize esta página com JavaScript.'}</p>\n    <form id="task-form">\n      <label for="task-input">${template==='modular'?'Nova tarefa':'Digite uma mensagem'}</label>\n      <div class="input-row"><input id="task-input" placeholder="Escreva aqui..." required /><button type="submit">Adicionar</button></div>\n    </form>\n    <ul id="task-list"></ul>\n  </main>\n  <script type="module" src="./src/main.js"></script>\n</body>\n</html>\n`;
  base.files['styles/style.css'] = `:root { font-family: system-ui, sans-serif; color: #213b33; background: #edf4ef; }\n* { box-sizing: border-box; }\nbody { margin: 0; padding: 36px 16px; }\n.app { max-width: 640px; margin: 0 auto; padding: 30px; border: 1px solid #d7e5dc; border-radius: 14px; background: white; }\n.eyebrow { color: #487b65; font-size: 11px; font-weight: 700; letter-spacing: .13em; }\nh1 { margin: 12px 0; font-size: clamp(26px, 5vw, 38px); }\np { color: #627268; }\nlabel { display:block; margin-bottom: 8px; font-size: 13px; font-weight:600; }\n.input-row { display:flex; gap:8px; }\ninput { min-width:0; flex:1; padding:11px; border:1px solid #bccfc3; border-radius:7px; }\nbutton { border:0; border-radius:7px; background:#216147; color:white; padding:11px 15px; cursor:pointer; }\nul { padding-left:22px; line-height:1.9; }\n@media (max-width: 450px) { .app { padding: 20px; } .input-row {flex-direction:column} }\n`;
  if (template==='modular') {
    base.files['src/tasks.js'] = `// Uma função pequena fica fácil de testar e reutilizar.\nexport function criarTarefa(texto) {\n  return { id: Date.now(), texto: texto.trim(), concluida: false };\n}\n\nexport function adicionarTarefa(lista, texto) {\n  if (!texto.trim()) return lista;\n  return [...lista, criarTarefa(texto)];\n}\n`;
    base.files['src/main.js'] = `import { adicionarTarefa } from './tasks.js';\n\nconst formulario = document.querySelector('#task-form');\nconst campo = document.querySelector('#task-input');\nconst lista = document.querySelector('#task-list');\nlet tarefas = [];\n\nfunction renderizar() {\n  lista.replaceChildren();\n  for (const tarefa of tarefas) {\n    const item = document.createElement('li');\n    item.textContent = tarefa.texto;\n    lista.append(item);\n  }\n}\n\nformulario.addEventListener('submit', event => {\n  event.preventDefault();\n  tarefas = adicionarTarefa(tarefas, campo.value);\n  campo.value = '';\n  renderizar();\n  console.log('Tarefas:', tarefas.length);\n});\n`;
  } else {
    base.files['src/main.js'] = `const formulario = document.querySelector('#task-form');\nconst mensagem = document.querySelector('#message');\nconst campo = document.querySelector('#task-input');\n\nformulario.addEventListener('submit', event => {\n  event.preventDefault();\n  mensagem.textContent = campo.value.trim() || 'Tente escrever algo.';\n  console.log('Mensagem atualizada!');\n});\n`;
  }
  validateWorkspace(base);
  return base;
}
export function workspaceAdd(project, path, source = '') {
  const normalized = workspacePath(path);
  if (normalized !== path) throw new Error('Use o caminho normalizado, sem ./ ou barras duplicadas.');
  if (Object.hasOwn(project.files, normalized)) throw new Error('Este arquivo já existe.');
  const updated={...project,files:{...project.files,[normalized]:source}};
  validateWorkspace(updated);
  updated.folders=[...new Set([...(project.folders||[]), ...folderAncestors(normalized)])];
  return updated;
}
function folderAncestors(path) {const arr=path.split('/').slice(0,-1);return arr.map((_,i)=>arr.slice(0,i+1).join('/'));}
export function workspaceRename(project, oldPath, newPath) {
  if (oldPath === 'index.html' || oldPath === project.entry) throw new Error('Não renomeie index.html ou o módulo inicial.');
  const path=workspacePath(newPath);
  if (path!==newPath || !Object.hasOwn(project.files,oldPath) || Object.hasOwn(project.files,path)) throw new Error('Caminho inválido ou já utilizado.');
  const files={...project.files,[path]:project.files[oldPath]};delete files[oldPath];
  const updated={...project,files,selected:project.selected===oldPath?path:project.selected,folders:[...new Set([...(project.folders||[]),...folderAncestors(path)])]};
  validateWorkspace(updated);return updated;
}
export function workspaceDelete(project,path) {
  if (path==='index.html'||path===project.entry) throw new Error('Não exclua index.html nem o módulo inicial.');
  if(!Object.hasOwn(project.files,path))throw new Error('Arquivo não encontrado.');
  const files={...project.files};delete files[path];
  const updated={...project,files,selected:project.selected===path?project.entry:project.selected};validateWorkspace(updated);return updated;
}
export function workspaceAddFolder(project,path){const p=workspacePath(path);if(p!==path)throw new Error('Nome da pasta inválido.');if((project.folders||[]).includes(p))throw new Error('Esta pasta já existe.');return {...project,folders:[...new Set([...(project.folders||[]),p,...folderAncestors(p)])]};}
function resolveImport(spec,from,files) {
  if (!spec.startsWith('./')&&!spec.startsWith('../')) throw new Error(`Importação externa não suportada: ${spec}. Utilize caminhos relativos.`);
  const fromDir=from.includes('/')?from.slice(0,from.lastIndexOf('/')):'';
  const canonical=workspacePath(spec,fromDir);
  const found=[canonical,canonical+'.js',canonical+'.mjs',canonical+'/index.js'].find(p=>Object.hasOwn(files,p));
  if(!found || !/\.(m?js)$/.test(found)) throw new Error(`Módulo não encontrado: ${spec} (em ${from})`);
  return found;
}
export function workspaceRewriteImports(source,from,files) {
  // Subconjunto explícito de ES modules: import/export estáticos e import('arquivo') literal.
  // Não tenta analisar JavaScript arbitrário nem transformar imports calculados.
  const pattern=/(\b(?:import|export)\s*(?:[\s\S]{0,260}?\s+from\s*)?|\bimport\s*\(\s*)(['"])(\.\.?\/[^'"\n]+)\2(\s*\)?)/g;
  let rewritten=String(source).replace(pattern,(whole,prefix,quote,spec,suffix)=>{
    const resolved=resolveImport(spec,from,files);
    return prefix+quote+'@devlab/'+resolved+quote+suffix;
  });
  // Importações com origem remota ou bare specifier não são instaladas automaticamente.
  const external=/(?:\bimport\s*(?:[\s\S]{0,160}?\s+from\s*)?|\bexport\s+[^\n]{0,160}?\s+from\s*)(['"])(?!@devlab\/)([^.'"\/][^'"]*|https?:[^'"]*)\1/g;
  let m;while((m=external.exec(rewritten)))throw new Error('Importação não suportada em '+from+': '+m[2]);
  return rewritten;
}
const jsLiteral = x => JSON.stringify(x).replace(/</g,'\\u003c').replace(/[\u2028\u2029]/g,' ');
export function buildWorkspacePreview(project,token,storage={}) {
  validateWorkspace(project);
  const files=project.files;
  let body=files['index.html'];
  const links=[];
  // O ambiente inclui CSS local, sem baixar caminhos do projeto do servidor da plataforma.
  body=body.replace(/<link\b[^>]*>/gi,tag=>{
    const href=tag.match(/\bhref\s*=\s*['"]([^'"]+)['"]/i)?.[1];
    if(href?.startsWith('./')||href?.startsWith('../')){links.push(href);return '';}
    return tag;
  });
  body=body.replace(/<script\b[^>]*\bsrc\s*=\s*['"](?:\.\.?\/)?[^'"]+['"][^>]*>\s*<\/script\s*>/gi,'');
  const cssPaths=Object.keys(files).filter(x=>x.endsWith('.css')).sort();
  const css=cssPaths.map(x=>files[x]).join('\n');
  const rewritten={};
  for(const [path,source] of Object.entries(files))if(/\.(m?js)$/.test(path))rewritten[path]=workspaceRewriteImports(source,path,files);
  const appScript=`(() => {
  const token=${jsLiteral(token)};
  const memory=${jsLiteral(storage)};
  const send=(kind,payload)=>parent.postMessage({__devlab_workspace:true,token,kind,payload},'*');
  const original={};
  const toText=value=>{try{return typeof value==='string'?value:JSON.stringify(value)}catch{return String(value)}};
  for(const level of ['log','warn','error','info']){
    original[level]=console[level]?.bind(console);
    console[level]=(...args)=>{send('log',{level,args:args.map(toText)});original[level]?.(...args)};
  }
  window.addEventListener('error',event=>send('log',{level:'error',args:[event.message||'Erro desconhecido']}));
  window.addEventListener('unhandledrejection',event=>send('log',{level:'error',args:[toText(event.reason)]}));
  const store={
    get length(){return Object.keys(memory).length},
    key:i=>Object.keys(memory)[i]??null,
    getItem:k=>Object.hasOwn(memory,String(k))?memory[String(k)]:null,
    setItem:(k,v)=>{memory[String(k)]=String(v);send('storage',memory)},
    removeItem:k=>{delete memory[String(k)];send('storage',memory)},
    clear:()=>{for(const key of Object.keys(memory))delete memory[key];send('storage',memory)}
  };
  try{Object.defineProperty(window,'localStorage',{configurable:true,value:store});}catch(err){console.warn('Storage virtual indisponível')}
  const sources=${jsLiteral(rewritten)};
  const map={imports:{}};
  for(const [path,code] of Object.entries(sources)){
    map.imports['@devlab/'+path]=URL.createObjectURL(new Blob([code],{type:'text/javascript'}));
  }
  const importMap=document.createElement('script');importMap.type='importmap';importMap.textContent=JSON.stringify(map);document.head.appendChild(importMap);
  import(${jsLiteral('@devlab/'+project.entry)}).then(()=>send('ready',null)).catch(error=>console.error(error?.stack||String(error)));
})();`;
  const safeScript=appScript.replace(/<\/script/gi,'<\\/script');
  const safeCss=css.replace(/<\/style/gi,'<\\/style');
  // CSS e boot são adicionados após o conteúdo para que o DOM já exista na execução do JS.
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${safeCss}</style></head><body>${body}<script>${safeScript}<\/script></body></html>`;
}
// ZIP sem compressão: funciona offline, sem dependências externas.
const crcTable = Array.from({length:256},(_,n)=>{let c=n;for(let i=0;i<8;i++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
const crc32 = data => {let c=0xffffffff;for(const byte of data)c=crcTable[(c^byte)&255]^(c>>>8);return (c^0xffffffff)>>>0;};
export function workspaceZip(project) {
  validateWorkspace(project);
  return archiveTextFiles(project.files);
}
// Empacotador compartilhado para starters TypeScript/React (não executáveis no iframe HTML/JS).
export function archiveTextFiles(files) {
  if (!files || typeof files !== 'object' || Array.isArray(files)) throw new Error('Arquivos inválidos.');
  const entries=Object.entries(files);
  if (!entries.length || entries.length>WORKSPACE_MAX_FILES) throw new Error('Quantidade de arquivos inválida.');
  let total=0;
  for(const [path,source] of entries){
    if(workspacePath(path)!==path || !/\.(html|css|js|jsx|ts|tsx|json|md|sql|txt)$/.test(path)) throw new Error('Arquivo inválido: '+path);
    if(typeof source!=='string' || utf8Bytes(source)>WORKSPACE_MAX_FILE_BYTES) throw new Error('Arquivo grande ou inválido: '+path);
    total+=utf8Bytes(source);
  }
  if(total>WORKSPACE_MAX_TOTAL_BYTES)throw new Error('Projeto acima do limite de 480 KB.');
  const encoder=new TextEncoder(), parts=[], central=[];let offset=0;
  const u16=(arr,i,v)=>{arr[i]=v&255;arr[i+1]=(v>>>8)&255};
  const u32=(arr,i,v)=>{u16(arr,i,v);u16(arr,i+2,v>>>16)};
  for(const [path,source] of entries){
    const name=encoder.encode(path),data=encoder.encode(source),crc=crc32(data);
    const head=new Uint8Array(30);u32(head,0,0x04034b50);u16(head,4,20);u16(head,6,0x800);u16(head,8,0);u32(head,14,crc);u32(head,18,data.length);u32(head,22,data.length);u16(head,26,name.length);
    parts.push(head,name,data);
    const center=new Uint8Array(46);u32(center,0,0x02014b50);u16(center,4,20);u16(center,6,20);u16(center,8,0x800);u32(center,16,crc);u32(center,20,data.length);u32(center,24,data.length);u16(center,28,name.length);u32(center,42,offset);
    central.push(center,name);offset+=head.length+name.length+data.length;
  }
  const centralSize=central.reduce((sum,b)=>sum+b.length,0),end=new Uint8Array(22);u32(end,0,0x06054b50);u16(end,8,entries.length);u16(end,10,entries.length);u32(end,12,centralSize);u32(end,16,offset);
  return new Blob([...parts,...central,end],{type:'application/zip'});
}
