/** Sprint 11 — trilha profissional. Dados autorais e estado de aprendizagem local. */
export const careerProjects = Object.freeze([
  {
    id:'site', title:'Biblioteca de estudos', category:'Frontend', level:'Intermediário', duration:'4–6 h',
    summary:'Construa um catálogo responsivo de recursos, com busca, filtros, estados vazios e persistência.',
    goal:'Receber um briefing, organizar os arquivos, implementar comportamento acessível e testar antes de publicar.',
    tech:['HTML','CSS','JavaScript','DOM','localStorage'],
    checks:[
      'Estrutura semântica, títulos e labels associados',
      'Busca por palavra-chave e filtro por categoria',
      'Estado vazio e mensagens compreensíveis',
      'Layout testado em 390 px e 1440 px',
      'Persistência de favoritos com recuperação após recarga',
      'README com instruções, decisões e limitações',
      'Pelo menos três testes reproduzíveis com evidências'
    ],
    review:['O HTML comunica a hierarquia sem depender do CSS?','Os eventos não duplicam listeners após renderização?','O DOM é atualizado sem inserir texto do usuário via innerHTML?','A navegação e o formulário funcionam por teclado?']
  },
  {
    id:'api', title:'TaskAPI com testes', category:'Backend', level:'Intermediário', duration:'5–8 h',
    summary:'Entregue uma API HTTP para tarefas, com operações CRUD, validação e contrato documentado.',
    goal:'Executar Node.js no terminal, implementar casos-limite, isolar regras e revisar resultados HTTP.',
    tech:['Node.js','HTTP','REST','node:test'],
    checks:[
      'GET /health responde 200 com JSON',
      'POST /tasks valida título e devolve 201',
      'GET /tasks e GET /tasks/:id funcionam com coleção vazia',
      'PATCH atualiza a tarefa sem afetar outras',
      'DELETE retorna 204 e 404 em recurso inexistente',
      'Testes de JSON inválido, ID inexistente e corpo grande',
      'README com comandos curl, decisões e limitações',
      'Workflow CI executa os testes automaticamente'
    ],
    review:['As entradas HTTP são tratadas como não confiáveis?','O código de resposta distingue 400, 404, 422 e 500?','Regras de negócio não dependem do socket HTTP?','Há tratamento de exceções sem vazar dados internos?']
  },
  {
    id:'fullstack', title:'TaskFlow full-stack', category:'Integração', level:'Avançado', duration:'10–16 h',
    summary:'Conecte frontend, API e PostgreSQL, implementando autenticação e controle de acesso por proprietário.',
    goal:'Evoluir um starter incompleto até uma aplicação realmente integrada, testada e pronta para demonstração.',
    tech:['JavaScript','Node.js','PostgreSQL','Autenticação','Testes'],
    checks:[
      'Frontend consome API HTTP real, inclusive estados de erro',
      'Migração SQL aplicada em PostgreSQL local',
      'Tarefas persistem após reiniciar o servidor',
      'Cadastro e login possuem hash seguro e sessões',
      'Rotas verificam a sessão no servidor e a propriedade do recurso',
      'Usuário A não lê nem modifica dados do usuário B',
      'Proteções básicas: CSRF, cookies seguros e limitação de tentativas',
      'Testes de integração rodam com banco isolado',
      'README explica execução, variáveis e migrações',
      'CI passa e há evidência de publicação ou demonstração local'
    ],
    review:['Autorização é conferida no servidor e em todas as operações?','Há queries parametrizadas e menor privilégio no banco?','Credenciais e tokens não entram em commits, logs nem front?','Há migração e rollback documentados?']
  }
]);
export function careerFindProject(id){return careerProjects.find(p=>p.id===id)||null;}
export function careerValidateRecord(project, record={}){
  const p=typeof project==='string'?careerFindProject(project):project;
  if(!p)throw new Error('Projeto não encontrado.');
  const checks=[...new Set((Array.isArray(record.checks)?record.checks:[]).filter(i=>Number.isInteger(i)&&i>=0&&i<p.checks.length))].sort((a,b)=>a-b);
  const review=[...new Set((Array.isArray(record.review)?record.review:[]).filter(i=>Number.isInteger(i)&&i>=0&&i<p.review.length))].sort((a,b)=>a-b);
  const sanitize=v=>String(v??'').slice(0,1600);
  const safeUrl=v=>{
    const value=String(v??'').trim().slice(0,500);
    if(!value)return '';
    try{const url=new URL(value);if(url.protocol!=='https:'||!url.hostname||url.username||url.password)return '';return url.toString().replace(/\(/g,'%28').replace(/\)/g,'%29');}catch{return '';}
  };
  return {checks,review,notes:sanitize(record.notes),testEvidence:sanitize(record.testEvidence),repo:safeUrl(record.repo),demo:safeUrl(record.demo)};
}
export function careerProgress(project,record={}){
  const p=typeof project==='string'?careerFindProject(project):project;
  if(!p)throw new Error('Projeto não encontrado.');
  const v=careerValidateRecord(p,record);
  const all=p.checks.length+p.review.length;
  return {checked:v.checks.length,reviewed:v.review.length,total:all,percent:Math.round(100*(v.checks.length+v.review.length)/all),selfReported:v.checks.length===p.checks.length && v.review.length===p.review.length};
}
const md=s=>String(s??'').replace(/[\r\n]+/g,' ').replace(/[\\`*_{}[\]()#+!|<>]/g,'\\$&').trim();
export function careerPortfolioMarkdown(profile={},records={}){
  const title=md(String(profile.name??'').slice(0,90))||'Estudante de desenvolvimento web';
  const about=md(String(profile.about??'').slice(0,800))||'Projetos de estudo e prática de engenharia de software.';
  const lines=[`# ${title}`,'',about,'','## Projetos',''];
  let listed=0;
  for(const project of careerProjects){
    const item=careerValidateRecord(project,records[project.id]||{});
    if(!item.repo&&!item.demo&&!item.notes&&!item.testEvidence&&!item.checks.length)continue;
    listed++;
    const progress=careerProgress(project,item);
    lines.push(`### ${md(project.title)}`,'',`**Tecnologias:** ${project.tech.map(md).join(', ')}`,'',md(item.notes||project.summary),'',`**Checklist registrado pelo estudante:** ${progress.checked}/${project.checks.length}. Revisão: ${progress.reviewed}/${project.review.length}. **Não representa certificação nem teste independente.**`,'');
    if(item.testEvidence)lines.push('**Evidência de teste:** '+md(item.testEvidence),'');
    if(item.repo)lines.push('- [Código-fonte]('+item.repo+')');
    if(item.demo)lines.push('- [Demonstração]('+item.demo+')');
    lines.push('');
  }
  if(!listed)lines.push('_Adicione evidências dos projetos para preencher esta seção._','');
  lines.push('---','', 'Portfólio de estudos gerado pelo DevLab. Links e evidências informados pelo estudante, não verificados automaticamente.','');
  return lines.join('\n');
}
const htmlEsc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
export function careerPortfolioHtml(profile={},records={}){
  const name=String(profile.name??'').slice(0,90).trim()||'Estudante de desenvolvimento web';
  const about=String(profile.about??'').slice(0,800).trim()||'Projetos de estudo e prática de engenharia de software.';
  const cards=careerProjects.map(p=>{
    const r=careerValidateRecord(p,records[p.id]||{});
    if(!r.repo&&!r.demo&&!r.notes&&!r.testEvidence&&!r.checks.length)return '';
    const progress=careerProgress(p,r);
    return `<article><span class="category">${htmlEsc(p.category)}</span><h2>${htmlEsc(p.title)}</h2><p>${htmlEsc(r.notes||p.summary)}</p><p class="stack">${p.tech.map(htmlEsc).join(' · ')}</p><p class="meta">Checklist declarado: ${progress.checked}/${p.checks.length}; revisão: ${progress.reviewed}/${p.review.length}</p>${r.testEvidence?`<p class="meta">Testes informados: ${htmlEsc(r.testEvidence)}</p>`:''}<div class="links">${r.repo?`<a href="${htmlEsc(r.repo)}" rel="noopener noreferrer" target="_blank">Repositório</a>`:''}${r.demo?`<a href="${htmlEsc(r.demo)}" rel="noopener noreferrer" target="_blank">Demonstração</a>`:''}</div></article>`;
  }).filter(Boolean).join('');
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"><title>${htmlEsc(name)} · Portfólio</title><style>*{box-sizing:border-box}body{margin:0;font:16px/1.65 system-ui,sans-serif;color:#183128;background:#f5f7f4}.wrap{width:min(92%,960px);margin:auto;padding:70px 0}h1{font-size:clamp(32px,6vw,60px);line-height:1.1;letter-spacing:-.04em;margin:12px 0}h2{font-size:21px;letter-spacing:-.02em;margin:8px 0}header{border-bottom:1px solid #d9e4dc;padding-bottom:42px;margin-bottom:38px}header p{max-width:680px;color:#53675b}article{background:white;border:1px solid #dbe5dc;border-radius:14px;margin:16px 0;padding:26px}.category{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#327b5c}.stack{font-size:14px;color:#42725a}.meta,footer{color:#67776e;font-size:13px}.links{display:flex;gap:14px;flex-wrap:wrap}.links a{color:#126f4a;font-weight:700}footer{margin-top:48px}</style></head><body><main class="wrap"><header><span class="category">Portfólio de desenvolvimento</span><h1>${htmlEsc(name)}</h1><p>${htmlEsc(about)}</p></header><section aria-label="Projetos"><h2>Projetos</h2>${cards||'<p>Adicione evidências dos projetos para preencher esta seção.</p>'}</section><footer>Projeto de estudo. As evidências e os checklists foram informados pelo estudante e não constituem certificação independente.</footer></main></body></html>`;
}
/** Simulador Git local. Não executa Git, não cria commits remotos. */
export function gitInitial(){
  const initial={'index.html':'<h1>Primeira versão</h1>\n'};
  return {branch:'main',branches:{main:'c0'},commits:[{id:'c0',parent:null,message:'chore: projeto inicial',files:{...initial}}],working:{...initial},staged:{},output:'Repositório de estudo iniciado. Altere o arquivo, crie uma branch e experimente os comandos.',history:[]};
}
function gitHead(repo,branch=repo.branch){return repo.commits.find(c=>c.id===repo.branches[branch]);}
const gitClean=repo=>Object.keys(repo.staged).length===0&&Object.keys(repo.working).every(p=>repo.working[p]===gitHead(repo).files[p]);
export function gitExecute(input,line){
  const repo=structuredClone(input),cmd=String(line??'').trim().slice(0,200);
  const result=(output,ok=true)=>({...repo,output,history:[...repo.history.slice(-24),{command:cmd,output,ok}]});
  const parts=cmd.split(/\s+/);
  if(cmd==='git status'){
    const modified=Object.keys(repo.working).filter(p=>repo.working[p]!==gitHead(repo).files[p]);
    return result(`Em ${repo.branch}\nEm staging: ${Object.keys(repo.staged).join(', ')||'(nenhum)'}\nModificados: ${modified.join(', ')||'(nenhum)'}\n${gitClean(repo)?'Árvore de trabalho limpa':'Há alterações locais.'}`);
  }
  if(cmd==='git branch')return result(Object.keys(repo.branches).map(b=>(b===repo.branch?'* ':'  ')+b).join('\n'));
  if(cmd==='git log --oneline'){
    let commit=gitHead(repo),lines=[];
    while(commit&&lines.length<15){lines.push(`${commit.id} ${commit.message}`);commit=repo.commits.find(c=>c.id===commit.parent);}
    return result(lines.join('\n'));
  }
  if(cmd==='git diff'){
    const old=gitHead(repo).files['index.html'],now=repo.working['index.html'];
    return result(old===now?'(sem alterações)':'--- a/index.html\n+++ b/index.html\n- '+old.trim()+'\n+ '+now.trim());
  }
  if(cmd==='git add index.html'){
    repo.staged['index.html']=repo.working['index.html'];return result('index.html adicionado ao staging.');
  }
  if(cmd==='git restore --staged index.html'){
    delete repo.staged['index.html'];return result('index.html removido do staging.');
  }
  if(parts[0]==='git'&&parts[1]==='switch'&&parts[2]==='-c'&&parts.length===4){
    const name=parts[3];if(!/^feat\/[a-z0-9][a-z0-9-]{1,28}$/.test(name))return result('Use um nome como feat/cabecalho.',false);
    if(Object.hasOwn(repo.branches,name))return result('Esta branch já existe.',false);
    repo.branches[name]=repo.branches[repo.branch];repo.branch=name;return result('Criada e selecionada '+name+'.');
  }
  if(parts.length===3&&parts[0]==='git'&&parts[1]==='switch'){
    const name=parts[2];if(!Object.hasOwn(repo.branches,name))return result('Branch não encontrada.',false);
    if(!gitClean(repo))return result('Faça commit ou descarte as alterações antes de trocar de branch.',false);
    repo.branch=name;repo.working={...gitHead(repo).files};return result('Agora em '+name+'.');
  }
  if(cmd.startsWith('git commit')){
    const match=cmd.match(/^git commit -m\s+(["'])(.{3,80})\1$/);
    if(!match)return result('Use git commit -m "mensagem objetiva".',false);
    if(!Object.keys(repo.staged).length||Object.keys(repo.staged).every(p=>repo.staged[p]===gitHead(repo).files[p]))return result('Não há alterações novas em staging.',false);
    const prev=gitHead(repo),id='c'+repo.commits.length;
    const next={id,parent:prev.id,message:match[2],files:{...prev.files,...repo.staged}};
    repo.commits.push(next);repo.branches[repo.branch]=id;repo.staged={};return result(`[${repo.branch} ${id}] ${match[2]}`);
  }
  if(parts.length===3&&parts[0]==='git'&&parts[1]==='merge'){
    const source=parts[2];if(!Object.hasOwn(repo.branches,source))return result('Branch de origem não encontrada.',false);
    if(!gitClean(repo))return result('Faça commit antes de tentar merge.',false);
    if(source===repo.branch)return result('Não é possível fazer merge da branch nela mesma.',false);
    let other=gitHead(repo,source);const current=gitHead(repo);const sourceFiles={...other.files};
    let cursor=other,ancestor=false;
    while(cursor){if(cursor.id===current.id){ancestor=true;break;}cursor=repo.commits.find(c=>c.id===cursor.parent);}
    if(!ancestor)return result('Históricos divergentes: neste laboratório o merge exige resolução manual de conflitos no Git real.',false);
    repo.branches[repo.branch]=other.id;repo.working=sourceFiles;return result(`Fast-forward de ${source} em ${repo.branch}.`);
  }
  return result('Comando não disponível nesta simulação. Consulte os exemplos ao lado.',false);
}
export function gitEdit(repo,content){const result=structuredClone(repo);const value=String(content??'').slice(0,5000);result.working['index.html']=value;return result;}
export function gitMilestones(repo){
  const feature=Object.keys(repo.branches).find(b=>b.startsWith('feat/'));
  const commits=feature?repo.commits.filter(c=>c.id!=='c0'&&c.message.startsWith('feat:')):[];
  const merged=Boolean(feature&&repo.branches.main===repo.branches[feature]&&commits.length);
  return {branch:Boolean(feature),commit:commits.length>0,merge:merged};
}
