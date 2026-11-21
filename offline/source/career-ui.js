/* Sprint 11 — experiência local de projetos, Git simulado e portfólio. */
const cst={
  tab:load('career-tab','projects'),
  selected:load('career-selected','site'),
  records:load('career-records',{}),
  profile:load('career-profile',{name:'',about:''}),
  git:load('career-git',gitInitial()),
};
function careerPersist(){save('career-tab',cst.tab);save('career-selected',cst.selected);save('career-records',cst.records);save('career-profile',cst.profile);save('career-git',cst.git);}
function careerRecord(id){return careerValidateRecord(id,cst.records[id]||{});}
function careerSummary(){return {projects:careerProjects.filter(p=>careerProgress(p,careerRecord(p.id)).selfReported).length,all:careerProjects.length,git:gitMilestones(cst.git)};}
function careerHomePromo(){const summary=careerSummary();return `<section class="career-promo"><div><span class="section-kicker">SPRINT 11 · PRÁTICA PROFISSIONAL</span><h2>Agora entregue projetos completos.</h2><p>Três briefings de portfólio, revisão de código, laboratório de Git e registro de evidências — sem certificados automáticos.</p></div><button data-nav="carreira" class="ws-main-button">Ver jornada profissional →</button></section>`;}
function careerHeader(){return `<div class="career-hero"><div><span class="section-kicker">FORMAÇÃO · ETAPA PROFISSIONAL</span><h1>Do código à entrega.</h1><p>Receba requisitos, desenvolva com autonomia, revise as mudanças, comprove com testes e apresente o resultado.</p></div><div class="career-hero-aside"><strong>${careerSummary().projects}/${careerProjects.length}</strong><span>projetos com checklist declarado</span><small>Seus registros ficam neste navegador</small></div></div><nav class="career-tabs" aria-label="Áreas da jornada">${[['projects','Projetos integradores'],['git','Laboratório Git'],['portfolio','Portfólio']].map(([key,label])=>`<button data-career-tab="${key}" aria-current="${cst.tab===key?'page':'false'}" class="${cst.tab===key?'active':''}">${label}</button>`).join('')}</nav>`;}
function careerProjectsPage(){const selected=careerFindProject(cst.selected)||careerProjects[0],record=careerRecord(selected.id),state=careerProgress(selected,record);
 return `<div class="career-projects"><div class="career-catalog" aria-label="Projetos integradores">${careerProjects.map((p,i)=>{const progress=careerProgress(p,careerRecord(p.id));return `<button class="career-project-card ${p.id===selected.id?'active':''}" data-career-select="${p.id}"><span class="career-number">0${i+1} / ${esc(p.category)}</span><strong>${esc(p.title)}</strong><small>${esc(p.summary)}</small><span class="career-card-footer">${progress.checked}/${p.checks.length} requisitos <span>${progress.percent}% declarado</span></span></button>`;}).join('')}</div><section class="career-detail" aria-label="Briefing do projeto"><div class="career-detail-head"><span class="section-kicker">${esc(selected.category)} · ${esc(selected.level)} · ${esc(selected.duration)}</span><h2>${esc(selected.title)}</h2><p>${esc(selected.goal)}</p><div class="career-tech">${selected.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div><div class="career-detail-tools"><button class="ws-main-button" data-career-action="${selected.id==='site'?'open-workspace':'export-starter'}">${selected.id==='site'?'Criar projeto no Workspace':'Baixar starter ZIP'} ↗</button><button class="ws-outline" data-career-action="export-brief">↓ Baixar briefing</button></div><div class="career-subtitle"><h3>Critérios de aceitação</h3><span>${state.checked}/${selected.checks.length} declarados</span></div><p class="career-hint">Marque somente depois de implementar e verificar no seu projeto. Este checklist <strong>não executa testes nem garante segurança</strong>.</p><div class="career-checks">${selected.checks.map((t,i)=>`<label><input type="checkbox" data-career-check="${i}" ${record.checks.includes(i)?'checked':''}><span>${esc(t)}</span></label>`).join('')}</div><div class="career-subtitle"><h3>Revisão de código</h3><span>${state.reviewed}/${selected.review.length} declarados</span></div><div class="career-checks">${selected.review.map((t,i)=>`<label><input type="checkbox" data-career-review="${i}" ${record.review.includes(i)?'checked':''}><span>${esc(t)}</span></label>`).join('')}</div><div class="career-evidence"><h3>Registro de evidências</h3><p>Documente o que construiu e cole links reais. Nada é enviado automaticamente ao GitHub.</p><label for="career-notes">Decisões e soluções implementadas<textarea id="career-notes" rows="4" maxlength="1600" placeholder="Ex.: Separei a validação do DOM e tratei o estado vazio...">${esc(record.notes)}</textarea></label><label for="career-tests">Comprovação de testes<textarea id="career-tests" rows="3" maxlength="1600" placeholder="Ex.: npm test: 7 testes passando; POST vazio retornou 422; tela em 390 px sem rolagem...">${esc(record.testEvidence)}</textarea></label><div class="career-url-row"><label for="career-repo">Repositório público (HTTPS)<input id="career-repo" type="url" maxlength="500" placeholder="https://github.com/..." value="${esc(record.repo)}"></label><label for="career-demo">Demonstração (HTTPS)<input id="career-demo" type="url" maxlength="500" placeholder="https://seu-projeto.vercel.app" value="${esc(record.demo)}"></label></div><span id="career-save-status" class="career-save-status" role="status">Salvo somente neste navegador · links não verificados</span></div></section></div>`;
}
function careerGitPage(){const git=cst.git,m=gitMilestones(git),commits=git.commits.slice(-6).reverse();return `<div class="career-git"><section class="career-git-description"><span class="section-kicker">SIMULADOR LOCAL · NÃO É GIT REAL</span><h2>Treine branches, commits e merge.</h2><p>Este laboratório reproduz um subconjunto didático de comandos. Para aprender Git real, repita a atividade no terminal do VS Code, crie um repositório GitHub e abra um pull request.</p><div class="career-steps">${[['branch','Criar uma branch feat/'],['commit','Adicionar mudanças e registrar um commit'],['merge','Voltar à main e fazer merge']].map(([key,label])=>`<div class="${m[key]?'complete':''}"><span>${m[key]?'✓':'○'}</span>${label}</div>`).join('')}</div><div class="career-commands"><h3>Sequência para praticar</h3><p>1. Edite o arquivo. 2. Crie a branch antes do commit. 3. Adicione e registre o commit. 4. Volte à main e faça merge.</p>${['git status','git diff','git switch -c feat/cabecalho','git add index.html','git commit -m "feat: melhora cabeçalho"','git switch main','git merge feat/cabecalho','git log --oneline'].map(c=>`<button data-career-example="${esc(c)}"><code>${esc(c)}</code><span>Inserir ↗</span></button>`).join('')}</div><div class="career-real"><h3>Prática no GitHub real</h3><p>Depois da simulação: crie seu repositório, faça push da branch, abra uma PR, revise o diff e acompanhe um workflow de testes. O DevLab não faz essas operações por você.</p><a href="https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request" target="_blank" rel="noopener noreferrer">Documentação oficial de pull requests ↗</a></div></section><section class="career-terminal-panel"><div class="career-terminal-toolbar"><span><i></i><i></i><i></i> Laboratório Git</span><button data-career-action="git-reset">↺ Reiniciar simulação</button></div><div class="career-terminal-meta"><span>Branch atual: <strong>${esc(git.branch)}</strong></span><span>${git.commits.length} commits simulados</span></div><label for="career-file">index.html · área de trabalho</label><textarea id="career-file" spellcheck="false" rows="4">${esc(git.working['index.html'])}</textarea><div class="career-console" id="career-console" role="log" aria-live="polite">${git.history.length?git.history.slice(-7).map(x=>`<div><span class="career-prompt">$ ${esc(x.command)}</span><pre class="${x.ok?'':'is-error'}">${esc(x.output)}</pre></div>`).join(''):`<pre>${esc(git.output)}</pre>`}</div><form id="career-git-form" class="career-git-form"><label class="sr-only" for="career-git-command">Comando Git simulado</label><span>$</span><input id="career-git-command" autocomplete="off" spellcheck="false" placeholder="git status" aria-label="Comando Git simulado" required maxlength="200"><button class="ws-main-button" type="submit">Executar ↵</button></form><p class="career-hint">Simulação local. Não abre terminal, não acessa o seu computador e não publica commits.</p></section></div>`;}
function careerPortfolioPage(){const profile=cst.profile;const included=careerProjects.filter(p=>{const r=careerRecord(p.id);return r.notes||r.testEvidence||r.repo||r.demo||r.checks.length;});return `<div class="career-portfolio"><section class="career-portfolio-editor"><span class="section-kicker">PORTFÓLIO · EXPORTAÇÃO ESTÁTICA</span><h2>Apresente o que você construiu.</h2><p>Registre seu nome profissional e uma apresentação curta. Projetos com informações serão incluídos na exportação. Nada é publicado automaticamente.</p><label for="career-profile-name">Nome de apresentação<input id="career-profile-name" maxlength="90" value="${esc(profile.name)}" placeholder="Seu nome profissional"></label><label for="career-profile-about">Resumo profissional<textarea id="career-profile-about" rows="4" maxlength="800" placeholder="Descreva tecnologias, aprendizados e o tipo de sistema que desenvolveu.">${esc(profile.about)}</textarea></label><div class="career-detail-tools"><button class="ws-main-button" data-career-action="portfolio-html">↓ Exportar site HTML</button><button class="ws-outline" data-career-action="portfolio-md">↓ Exportar README.md</button></div><p class="career-hint">Não use dados pessoais sensíveis. URLs e alegações de testes são fornecidas por você e não são verificadas pelo DevLab.</p></section><section class="career-portfolio-preview"><span class="section-kicker">PRÉVIA DO CONTEÚDO</span><h2>${esc(profile.name||'Seu nome profissional')}</h2><p>${esc(profile.about||'Seu resumo aparecerá aqui.')}</p><div class="career-portfolio-list">${included.length?included.map(p=>{const r=careerRecord(p.id);return `<article><small>${esc(p.category)}</small><h3>${esc(p.title)}</h3><p>${esc(r.notes||p.summary)}</p><span>${careerProgress(p,r).checked}/${p.checks.length} requisitos autodeclarados</span></article>`;}).join(''):'<p>Preencha a seção de evidências de algum projeto para começar.</p>'}</div></section></div>`;}
function careerPage(){return `<section class="career-page">${careerHeader()}${cst.tab==='git'?careerGitPage():cst.tab==='portfolio'?careerPortfolioPage():careerProjectsPage()}</section>`;}
function careerStarterFiles(id){
 const p=careerFindProject(id);if(!p)throw Error('Projeto não encontrado.');
 let files;
 if(id==='site'){
  const t=frontendTracks.find(t=>t.id==='javascript')||frontendTracks.find(t=>t.id==='css')||frontendTracks[0];files=frontendStarterFiles(t,findFrontendLesson(t.lessons[0].id));
 }else{
  const t=backendTracks.find(t=>t.id===(id==='api'?'http':'quality'));files=backendStarterFiles(t,findBackendLesson(t.lessons[0].id));
 }
 files['README.md']=`# ${p.title}\n\n> Projeto integrador DevLab 11. Starter didático, **não é solução completa**.\n\n${p.goal}\n\n## Requisitos de aceitação\n${p.checks.map(t=>'- [ ] '+t).join('\n')}\n\n## Revisão de código\n${p.review.map(t=>'- [ ] '+t).join('\n')}\n\n## Git e entrega\n1. Crie uma branch: git switch -c feat/primeira-entrega\n2. Faça commits pequenos: git add . e git commit -m "feat: primeira entrega"\n3. Envie sua branch e abra uma pull request no GitHub.\n4. Execute os testes reais e registre o resultado antes de fazer merge.\n5. Documente execução, limites de segurança e melhorias pendentes.\n\n`+(files['README.md']||'');
 return files;
}
function careerDownload(name,content,mime){downloadFile(name,content,mime);toast('Arquivo exportado. Confira o conteúdo antes de compartilhar.');}
function careerCreateWorkspace(){
 const p=careerFindProject(cst.selected);if(p?.id!=='site')return;
 try{
  const files=careerStarterFiles('site');const created=createWorkspace('modular',p.title);created.files={...files};created.entry='src/main.js';created.selected='src/main.js';validateWorkspace(created);
  wst.projects[created.id]=created;wst.activeId=created.id;wst.selected=created.entry;workspaceSave();toast('Projeto criado no Workspace.');nav('workspace');
 }catch(error){console.error(error);toast('Não foi possível criar o projeto: '+error.message);}
}
window.addEventListener('click',event=>{
 const tab=event.target.closest('[data-career-tab]');if(tab){cst.tab=tab.dataset.careerTab;careerPersist();render();return;}
 const select=event.target.closest('[data-career-select]');if(select){if(!careerFindProject(select.dataset.careerSelect))return;studyUi.careerPhase=0;cst.selected=select.dataset.careerSelect;careerPersist();render();return;}
 const example=event.target.closest('[data-career-example]');if(example){const el=$('#career-git-command');if(el){el.value=example.dataset.careerExample;el.focus();}return;}
 const action=event.target.closest('[data-career-action]');if(!action)return;
 switch(action.dataset.careerAction){
  case 'open-workspace':careerCreateWorkspace();break;
  case 'export-starter':{
   try{const p=careerFindProject(cst.selected);const zip=archiveTextFiles(careerStarterFiles(p.id));const url=URL.createObjectURL(zip),a=document.createElement('a');a.href=url;a.download=`devlab-11-${p.id}-starter.zip`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),4000);toast('Starter ZIP exportado. Execute testes reais no VS Code.');}catch(error){toast('Falha ao exportar: '+error.message);}break;
  }
  case 'export-brief':{
    const p=careerFindProject(cst.selected);careerDownload(`briefing-${p.id}.md`,careerStarterFiles(p.id)['README.md'],'text/markdown');break;
  }
  case 'git-reset':if(confirm('Reiniciar a simulação Git? O histórico simulado será perdido.')){cst.git=gitInitial();careerPersist();render();}break;
  case 'portfolio-md':careerDownload('portfolio-devlab.md',careerPortfolioMarkdown(cst.profile,cst.records),'text/markdown');break;
  case 'portfolio-html':careerDownload('portfolio-devlab.html',careerPortfolioHtml(cst.profile,cst.records),'text/html');break;
 }
});
window.addEventListener('change',event=>{
 const t=event.target;if(getRoute().page!=='career')return;
 const p=careerFindProject(cst.selected);if(!p)return;
 if(t.matches('[data-career-check],[data-career-review]')){
  const kind=t.hasAttribute('data-career-check')?'checks':'review';const i=Number(t.getAttribute(kind==='checks'?'data-career-check':'data-career-review'));
  const max=kind==='checks'?p.checks.length:p.review.length;if(!Number.isInteger(i)||i<0||i>=max)return;
  const r=careerRecord(p.id);const old=new Set(r[kind]);if(t.checked)old.add(i);else old.delete(i);r[kind]=[...old].sort((a,b)=>a-b);cst.records[p.id]=r;careerPersist();render();return;
 }
 const fields={'career-notes':'notes','career-tests':'testEvidence','career-repo':'repo','career-demo':'demo'};
 if(Object.hasOwn(fields,t.id)){
  const key=fields[t.id],r={...careerRecord(p.id),[key]:t.value};const valid=careerValidateRecord(p,r);
  cst.records[p.id]=valid;careerPersist();if(key==='repo'||key==='demo'){t.value=valid[key];if(t.value!==r[key])toast('Use um link HTTPS válido e sem credenciais.');}
  const status=$('#career-save-status');if(status)status.textContent='Registro salvo neste navegador · links não verificados';return;
 }
 if(t.id==='career-profile-name'||t.id==='career-profile-about'){
  cst.profile[t.id==='career-profile-name'?'name':'about']=t.value.slice(0,t.id==='career-profile-name'?90:800);careerPersist();render();
 }
});
window.addEventListener('input',event=>{
 if(getRoute().page!=='career')return;
 const t=event.target;
 if(t.id==='career-file'){cst.git=gitEdit(cst.git,t.value);save('career-git',cst.git);}
 if(t.id==='career-notes'||t.id==='career-tests'){
  const key=t.id==='career-notes'?'notes':'testEvidence';const p=careerFindProject(cst.selected);if(!p)return;
  cst.records[p.id]=careerValidateRecord(p,{...careerRecord(p.id),[key]:t.value});save('career-records',cst.records);
 }
});
window.addEventListener('submit',event=>{
 if(event.target?.id!=='career-git-form')return;
 event.preventDefault();const command=$('#career-git-command')?.value||'';
 cst.git=gitExecute(cst.git,command);careerPersist();render();$('#career-git-command')?.focus();
});
