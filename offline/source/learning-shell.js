/* DevLab 12 — estrutura simples de navegação e módulos progressivos. */
const studyUi = {active:Object.create(null),careerPhase:0};
const studyLabels = ['Entender','Exemplo','Responder','Praticar','Revisar'];
const careerLabels = ['Briefing','Requisitos','Revisão','Evidências'];

let learningIndexCache=null;
function learningCatalogEntries(){
 if(learningIndexCache)return learningIndexCache;
 return learningIndexCache=[
  ...allJsLessons.map(l=>({title:l.title,summary:l.summary,area:'JavaScript',route:'aula/'+l.id})),
  ...allTsLessons.map(l=>({title:l.title,summary:l.summary,area:'TypeScript',route:'aula/'+l.id})),
  ...frontendLessons.map(l=>({title:l.title,summary:l.objective,area:'Frontend',route:'frontend/aula/'+l.id})),
  ...backendLessons.map(l=>({title:l.title,summary:l.objective,area:'Backend',route:'backend/aula/'+l.id}))
 ];
}
function searchResultsHtml(results){return `<span class="cl-search-summary">${results.length?`Resultados para “${esc(st.search.trim())}”`:'Nenhuma aula encontrada'}</span>${results.map(item=>`<button data-nav="${esc(item.route)}"><strong>${esc(item.title)}</strong><small>${esc(item.area)}</small></button>`).join('')}`;}
function updateSidebarSearch(){
 const has=!!st.search.trim(),results=document.querySelector('#cl-search-results'),groups=document.querySelector('#cl-nav-groups');
 if(!results||!groups)return;
 results.hidden=!has;groups.hidden=has;
 if(has)results.innerHTML=searchResultsHtml(searchLearningCatalog(st.search,learningCatalogEntries()));
}
function cleanSidebar(){
 const current=location.hash.replace(/^#\/?/,'')||'inicio';
 const results=searchLearningCatalog(st.search,learningCatalogEntries());
 const group=area=>`<div class="cl-nav-group"><div class="cl-nav-title">${esc(area.label)}</div>${area.routes.map(item=>`<button class="cl-nav-link ${current===item.route||current.startsWith(item.route+'/')?'active':''}" data-nav="${item.route}" ${current===item.route?'aria-current="page"':''}><span>${esc(item.label)}</span><small>${esc(item.note)}</small></button>`).join('')}</div>`;
 return `<aside id="cl-sidebar-nav" class="sidebar cl-sidebar ${st.mobileMenu?'sidebar-open':''}" aria-label="Navegação do DevLab">
  <div class="sidebar-top"><button class="brand-button" data-nav="inicio" aria-label="Página inicial do DevLab"><span class="logo-symbol">DL</span><span class="brand-text">dev<span>lab</span><small>APRENDA FAZENDO</small></span></button><button class="icon-button close-sidebar" data-action="close-menu" aria-label="Fechar menu">✕</button></div>
  <div class="sidebar-scroll"><div class="cl-side-inner">
   <button class="cl-home-link ${getRoute().page==='home'?'active':''}" data-nav="inicio">Visão geral <span aria-hidden="true">→</span></button>
   <label class="cl-search-label" for="lesson-search">Buscar aula</label><input id="lesson-search" type="search" aria-label="Buscar entre todas as aulas" placeholder="Ex.: formulário, React..." value="${esc(st.search)}" autocomplete="off">
   <div id="cl-search-results" class="cl-search-results" aria-live="polite" ${st.search.trim()?'':'hidden'}>${searchResultsHtml(results)}</div>
   <div id="cl-nav-groups" ${st.search.trim()?'hidden':''}>${learningAreas.map(group).join('')}</div>
  </div></div><div class="sidebar-bottom"><div class="avatar" aria-hidden="true">DL</div><div><strong>Seu progresso</strong><small>${xp()} XP · salvo localmente</small></div></div>
 </aside>`;
}
function cleanTopbar(){
 const route=getRoute(), names={home:'Visão geral',course:'Trilha de estudo',lesson:'Aula', 'frontend-home':'Frontend','frontend-track':'Percurso frontend','frontend-lesson':'Aula frontend','backend-home':'Backend','backend-track':'Percurso backend','backend-lesson':'Aula backend','backend-lab':'Laboratório HTTP', workspace:'Workspace',career:'Jornada profissional',missions:'Oficina',mission:'Missão',review:'Revisões',briefs:'Desafios',project:'TaskFlow'};
 return `<header class="topbar cl-topbar"><div class="topbar-left"><button class="icon-button mobile-menu-btn" data-action="open-menu" aria-label="Abrir navegação" aria-controls="cl-sidebar-nav" aria-expanded="${st.mobileMenu?'true':'false'}">☰</button><button class="cl-top-home" data-nav="inicio">DevLab</button><span class="cl-crumb-divider" aria-hidden="true">/</span><span class="cl-current-location">${esc(names[route.page]||'Aprender')}</span></div><div class="topbar-right"><span class="cl-saving-status"><span aria-hidden="true">●</span> Progresso local</span></div></header>`;
}
function cleanHome(){
 const next=allLessons.find(l=>l.id===st.last)||allJsLessons[0];
 const choices=[
  {title:'JavaScript',meta:'24 aulas · fundamentos',route:'curso/javascript',detail:'Lógica, funções e interação com a página.'},
  {title:'Frontend',meta:'25 aulas · cinco percursos',route:'frontend',detail:'HTML, CSS, React e interfaces completas.'},
  {title:'TypeScript',meta:'5 aulas · tipagem',route:'curso/typescript',detail:'Escreva JavaScript mais seguro e organizado.'},
  {title:'Backend',meta:'25 aulas · cinco percursos',route:'backend',detail:'Node.js, APIs, SQL e autenticação.'}
 ];
 return `<div class="cl-home"><header class="cl-welcome"><div><span class="section-kicker">SEU ESPAÇO DE ESTUDOS</span><h1>Aprenda programação,<br>um passo de cada vez.</h1><p>Uma aula, um exercício e um projeto. Escolha por onde continuar.</p><div class="cl-home-actions"><button class="button-primary" data-nav="aula/${esc(next.id)}">Continuar: ${esc(next.title)} <span aria-hidden="true">→</span></button><button class="cl-secondary" data-nav="frontend">Ver percursos</button></div></div><div class="cl-home-progress"><strong>${st.completed.length}<span>/${allLessons.length}</span></strong><span>Aulas da trilha JS/TS concluídas</span><div class="cl-progress-track"><span style="width:${Math.round(st.completed.length/allLessons.length*100)}%"></span></div></div></header>
 <section class="cl-section"><div class="cl-section-head"><div><span class="section-kicker">01 · APRENDER</span><h2>Escolha uma trilha</h2></div><p>Estude conceitos em sequência, sem distrações.</p></div><div class="cl-track-grid">${choices.map(x=>`<button class="cl-track-item" data-nav="${x.route}"><span class="cl-track-meta">${esc(x.meta)}</span><strong>${esc(x.title)}</strong><span>${esc(x.detail)}</span><span class="cl-track-arrow" aria-hidden="true">Ver aulas →</span></button>`).join('')}</div></section>
 <section class="cl-section"><div class="cl-section-head"><div><span class="section-kicker">02 · PRATICAR</span><h2>Consolide o aprendizado</h2></div></div><div class="cl-list-actions"><button data-nav="oficina"><strong>Oficina de código</strong><span>Resolva problemas com testes automáticos</span><span aria-hidden="true">→</span></button><button data-nav="revisao"><strong>Revisões</strong><span>${reviewsDue().length?`${reviewsDue().length} conceito(s) para revisar`:'Retome conceitos depois de estudá-los'}</span><span aria-hidden="true">→</span></button><button data-nav="workspace"><strong>Workspace</strong><span>Desenvolva em arquivos e módulos de verdade</span><span aria-hidden="true">→</span></button></div></section>
 <section class="cl-home-footer"><p>Pronto para desenvolver um projeto completo?</p><button data-nav="carreira">Abrir Jornada Profissional →</button></section></div>`;
}

function studyStepNav(kind,id,labels){
 const key=kind+':'+id, active=normalizeStudyStep(studyUi.active[key],labels.length);
 return `<nav class="cl-study-tabs" aria-label="Etapas da aula" role="tablist">${labels.map((label,index)=>`<button type="button" role="tab" id="cl-tab-${kind}-${index}" data-study-switch="${index}" data-study-key="${esc(key)}" aria-selected="${index===active?'true':'false'}" class="${index===active?'active':''}" tabindex="${index===active?'0':'-1'}"><span class="cl-step-index">${index+1}</span><span>${esc(label)}</span></button>`).join('')}</nav>`;
}
function setStudyStep(kind,id,index,focus=false){
 const labels=kind==='career'?careerLabels:studyLabels;
 const key=kind+':'+id, step=normalizeStudyStep(index,labels.length);
 studyUi.active[key]=step;
 const container=kind==='career'?document.querySelector('.career-detail'):document.querySelector(kind==='frontend'?'.ft-lesson-page':'.be-lesson-page');
 if(!container)return;
 container.querySelectorAll('[data-study-panel]').forEach(panel=>{panel.hidden=Number(panel.dataset.studyPanel)!==step;});
 const tabs=container.querySelectorAll('[data-study-switch]');tabs.forEach(tab=>{const selected=Number(tab.dataset.studySwitch)===step;tab.classList.toggle('active',selected);tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});
 if(focus){const tab=[...tabs].find(tab=>Number(tab.dataset.studySwitch)===step);tab?.focus({preventScroll:true});container.querySelector('.cl-study-tabs')?.scrollIntoView({block:'nearest',behavior:'instant'});}
}
function mountLessonModules(kind){
 const selector=kind==='frontend'?'.ft-lesson-page':'.be-lesson-page',container=document.querySelector(selector);if(!container)return;
 const panels=[...container.querySelectorAll(kind==='frontend'?'.ft-panel':'.be-panel')];if(panels.length!==5)return;
 const id=getRoute().id,layout=container.querySelector(kind==='frontend'?'.ft-learning-shell':'.be-lesson-columns');
 if(!layout)return;
 layout.insertAdjacentHTML('beforebegin',studyStepNav(kind,id,studyLabels));
 for(let i=0;i<panels.length;i++){
  const panel=panels[i];panel.dataset.studyPanel=String(i);panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',`cl-tab-${kind}-${i}`);
  if(i<4){const next=document.createElement('button');next.type='button';next.className='cl-next-step';next.dataset.studySwitch=String(i+1);next.dataset.studyKey=kind+':'+id;next.textContent=i===0?'Ver exemplo →':i===1?'Responder pergunta →':i===2?'Praticar →':'Revisar exercício →';panel.append(next);}
 }
 const aside=container.querySelector(kind==='frontend'?'.ft-study-aside':'.be-lesson-aside');
 if(aside){
  const cards=[...aside.children];aside.textContent='';
  for(let i=0;i<cards.length;i++){
   const details=document.createElement('details');details.className='cl-support-details';
   const summary=document.createElement('summary');summary.textContent=i===0?'Meu caderno de anotações':'Dicas de estudo';
   details.append(summary,cards[i]);aside.append(details);
  }
 }
 setStudyStep(kind,id,studyUi.active[kind+':'+id]??0);
}
function mountCareerModules(){
 if(cst.tab!=='projects')return;
 const detail=document.querySelector('.career-detail');if(!detail)return;
 const header=detail.querySelector('.career-detail-head'), tools=detail.querySelector('.career-detail-tools');
 const subtitles=[...detail.querySelectorAll('.career-subtitle')], lists=[...detail.querySelectorAll('.career-checks')],hint=detail.querySelector('.career-hint'),evidence=detail.querySelector('.career-evidence');
 if(!header||!tools||subtitles.length!==2||lists.length!==2||!evidence)return;
 const nav=document.createElement('div');nav.innerHTML=studyStepNav('career',cst.selected,careerLabels);header.after(nav.firstElementChild);
 const group=(index,...items)=>{const el=document.createElement('section');el.className='cl-career-panel';el.dataset.studyPanel=String(index);el.setAttribute('role','tabpanel');el.setAttribute('aria-labelledby',`cl-tab-career-${index}`);items.forEach(item=>{if(item)el.append(item)});detail.append(el);return el;};
 group(0,tools).insertAdjacentHTML('afterbegin','<h3>Comece por este projeto</h3><p>Leia os objetivos, crie a estrutura inicial e avance para os requisitos.</p>');
 group(1,subtitles[0],hint,lists[0]);group(2,subtitles[1],lists[1]);group(3,evidence);
 const panels=detail.querySelectorAll('[data-study-panel]');panels.forEach((panel,i)=>{if(i<panels.length-1){const btn=document.createElement('button');btn.className='cl-next-step';btn.dataset.studySwitch=String(i+1);btn.dataset.studyKey='career:'+cst.selected;btn.textContent=['Ver requisitos →','Revisar código →','Registrar evidências →'][i];panel.append(btn);}});
 setStudyStep('career',cst.selected,studyUi.careerPhase);
}
function mountCleanInterface(){
 const page=getRoute().page;
 if(page==='frontend-lesson'||page==='backend-lesson')mountLessonModules(page==='frontend-lesson'?'frontend':'backend');
 if(page==='career'){mountCareerModules();if(cst.tab==='git'){const cmds=document.querySelector('.career-commands');if(cmds){const details=document.createElement('details');details.className='cl-support-details cl-git-help';const summary=document.createElement('summary');summary.textContent='Consultar exemplos de comandos';cmds.parentNode.insertBefore(details,cmds);details.append(summary,cmds);}}}
}
window.addEventListener('click',event=>{
 const tab=event.target.closest('[data-study-switch]');if(tab){const [kind,id]=tab.dataset.studyKey.split(':');const step=Number(tab.dataset.studySwitch);if(kind==='career')studyUi.careerPhase=step;setStudyStep(kind,id,step,true);return;}
 const selection=event.target.closest('[data-career-select]');if(selection)studyUi.careerPhase=0;
});
window.addEventListener('keydown',event=>{
 const tab=event.target.closest('[role="tab"][data-study-switch]');if(!tab||!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
 event.preventDefault();const [kind,id]=tab.dataset.studyKey.split(':'),count=kind==='career'?careerLabels.length:studyLabels.length;
 const current=Number(tab.dataset.studySwitch),next=event.key==='Home'?0:event.key==='End'?count-1:(current+(event.key==='ArrowRight'?1:-1)+count)%count;
 if(kind==='career')studyUi.careerPhase=next;setStudyStep(kind,id,next,true);
});
