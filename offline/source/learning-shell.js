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
  ...backendLessons.map(l=>({title:l.title,summary:l.objective,area:'Backend',route:'backend/aula/'+l.id})),
  ...pathwayTracks.map(t=>({title:t.title,summary:t.subtitle,area:'Trilhas profissionais',route:'trilha/'+t.id})),
  ...languageCatalog.map(l=>({title:l.name,summary:l.description,area:'Biblioteca de linguagens',route:'linguagem/'+l.id})),
  ...Object.values(guidedLanguageLessons).flat().map(l=>({title:l.title,summary:l.goal,area:l.id.startsWith('py-')?'Python':l.id.startsWith('php-')?'PHP':'Java',route:'linguagem/aula/'+l.id}))
 ];
}
function searchResultsHtml(results){return `<span class="cl-search-summary">${results.length?`Resultados para “${esc(st.search.trim())}”`:'Nenhuma aula encontrada'}</span>${results.map(item=>`<button data-nav="${esc(item.route)}"><strong>${esc(item.title)}</strong><small>${esc(item.area)}</small></button>`).join('')}`;}
function updateSidebarSearch(){
 const results=document.querySelector('#cl-search-results');
 if(!results)return;
 const has=!!st.search.trim();
 results.hidden=!has;
 if(has)results.innerHTML=searchResultsHtml(searchLearningCatalog(st.search,learningCatalogEntries()));
 document.querySelector('#lesson-search')?.setAttribute('aria-expanded',String(has));
}
function cleanSidebar(){
 const current=location.hash.replace(/^#\/?/,'')||'inicio';
 const group=area=>`<div class="cl-nav-group"><div class="cl-nav-title">${esc(area.label)}</div>${area.routes.map(item=>`<button class="cl-nav-link ${current===item.route||current.startsWith(item.route+'/')||(item.route==='trilhas'&&current.startsWith('trilha/'))||(item.route==='linguagens'&&current.startsWith('linguagem/'))?'active':''}" data-nav="${item.route}" ${current===item.route?'aria-current="page"':''}><span>${esc(item.label)}</span><small>${esc(item.note)}</small></button>`).join('')}</div>`;
 const total=allLessons.length+frontendLessons.length+backendLessons.length;
 const done=st.completed.length+frontendSummary().done+backendSummary().done;
 const value=Math.min(100,Math.round(done/total*100));
 return `<aside id="cl-sidebar-nav" class="sidebar cl-sidebar ${st.mobileMenu?'sidebar-open':''}" aria-label="Navegação do DevLab">
  <div class="sidebar-top"><button class="brand-button" data-nav="inicio" aria-label="Página inicial do DevLab"><span class="logo-symbol" aria-hidden="true">&lt;/&gt;</span><span class="brand-text">DevLab<small>APRENDA · PRATIQUE · CONSTRUA</small></span></button><button class="icon-button close-sidebar" data-action="close-menu" aria-label="Fechar menu">✕</button></div>
  <div class="sidebar-scroll"><div class="cl-side-inner">
   <button class="cl-home-link ${getRoute().page==='home'?'active':''}" data-nav="inicio"><span>Início</span><span aria-hidden="true">⌂</span></button>
   <div id="cl-nav-groups">${learningAreas.map(group).join('')}</div>
  </div></div><div class="sidebar-bottom cl-sidebar-progress"><div class="cl-sidebar-progress-head"><span>Seu progresso</span><strong>${value}%</strong></div><div class="cl-progress-track" role="progressbar" aria-label="Aulas registradas" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div><small>${done} de ${total} aulas registradas</small></div>
 </aside>`;
}
function cleanTopbar(){
 const route=getRoute(), names={pathways:'Trilhas profissionais',pathway:'Trilha',languages:'Linguagens',language:'Linguagem','language-lesson':'Aula de linguagem',home:'Início',course:'Trilha de estudo',lesson:'Aula','frontend-home':'Frontend','frontend-track':'Percurso frontend','frontend-lesson':'Aula frontend','backend-home':'Backend','backend-track':'Percurso backend','backend-lesson':'Aula backend','backend-lab':'Laboratório HTTP',workspace:'Workspace',career:'Jornada profissional',missions:'Oficina',mission:'Missão',review:'Revisões',briefs:'Desafios',project:'TaskFlow'};
 return `<header class="topbar cl-topbar"><div class="topbar-left"><button class="icon-button mobile-menu-btn" data-action="open-menu" aria-label="Abrir navegação" aria-controls="cl-sidebar-nav" aria-expanded="${st.mobileMenu?'true':'false'}">☰</button><button class="cl-top-home" data-nav="inicio">DevLab</button><span class="cl-crumb-divider" aria-hidden="true">/</span><span class="cl-current-location">${esc(names[route.page]||'Aprender')}</span></div>
 <div class="cl-top-search"><label class="sr-only" for="lesson-search">Buscar aulas e projetos</label><span class="cl-search-mark" aria-hidden="true">⌕</span><input id="lesson-search" type="search" aria-label="Buscar entre todas as aulas" placeholder="Buscar aulas e trilhas..." value="${esc(st.search)}" autocomplete="off" aria-controls="cl-search-results" aria-expanded="${st.search.trim()?'true':'false'}"><span class="cl-search-shortcut" aria-hidden="true">Ctrl K</span><div id="cl-search-results" class="cl-search-results" role="region" aria-label="Resultados da busca" aria-live="polite" ${st.search.trim()?'':'hidden'}>${st.search.trim()?searchResultsHtml(searchLearningCatalog(st.search,learningCatalogEntries())):''}</div></div>
 <div class="topbar-right"><span class="cl-saving-status"><span aria-hidden="true">●</span> Salvo neste navegador</span></div></header>`;
}
function cleanHome(){return pathwayHome();}

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
  if(i===0 && findMicroChallenge(id))panel.insertAdjacentHTML('beforeend',microChallengeHtml(id,kind));
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

window.addEventListener('keydown',event=>{
 if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();document.getElementById('lesson-search')?.focus();}
 if(event.key==='Escape'&&document.activeElement?.id==='lesson-search'){st.search='';document.activeElement.value='';updateSidebarSearch();document.activeElement.blur();}
});

window.addEventListener('click',event=>{if(event.target.closest('[data-nav]'))st.search='';},true);
