/* Sprint 9 — Formação frontend. Dados isolados dos progressos anteriores. */
const fst = {
  quiz:load('frontend-quiz',{}),
  answers:{},
  checklist:load('frontend-checklist',{}),
  notes:load('frontend-notes',{}),
  projects:load('frontend-workspace-projects',{}),
};
function frontendDone(lesson){return fst.quiz[lesson.id]===true && frontendChecklistCount(lesson)===lesson.checks.length;}
function frontendChecklistCount(lesson){return lesson.checks.filter((_,i)=>fst.checklist[lesson.id]?.includes(i)).length;}
function frontendTrackDone(track){return track.lessons.filter(frontendDone).length;}
function frontendSummary(){return {lessons:frontendLessons.length,done:frontendLessons.filter(frontendDone).length,tracks:frontendTracks.length};}
function frontendPercent(track){return Math.round(frontendTrackDone(track)/track.lessons.length*100);}
const frontendResources={
 html:[['MDN · HTML','https://developer.mozilla.org/pt-BR/docs/Web/HTML']],
 css:[['MDN · CSS','https://developer.mozilla.org/pt-BR/docs/Web/CSS']],
 javascript:[['MDN · JavaScript','https://developer.mozilla.org/pt-BR/docs/Web/JavaScript']],
 typescript:[['Manual TypeScript','https://www.typescriptlang.org/docs/handbook/intro.html']],
 react:[['Documentação React','https://react.dev/learn']],
};
function frontendTrackCard(track){
 const done=frontendTrackDone(track),percent=frontendPercent(track);
 return `<button class="ft-track-card" data-nav="frontend/trilha/${esc(track.id)}">
  <span class="ft-track-card-top"><span class="ft-course-symbol ft-symbol-${esc(track.id)}">${{html:'H',css:'C',javascript:'JS',typescript:'TS',react:'R'}[track.id]}</span><span class="ft-track-category">${esc(track.level)}</span></span>
  <strong>${esc(track.title)}</strong><span class="ft-track-description">${esc(track.description)}</span>
  <span class="ft-track-progress-label"><span>${done}/${track.lessons.length} aulas revisadas</span><span>${percent}%</span></span>
  <span class="ft-meter"><span style="width:${percent}%"></span></span><span class="ft-track-footer">Abrir percurso <span aria-hidden="true">→</span></span>
 </button>`;
}
function frontendIntroCard(){const s=frontendSummary();return `<section class="ft-home-promo" aria-label="Formação frontend"><div><span class="section-kicker">NOVA TRILHA · SPRINT 09</span><h2>Da estrutura ao React.</h2><p>Estude HTML, CSS, JavaScript avançado, TypeScript e React. Cada aula inclui teoria, exercício e revisão antes de avançar.</p></div><div class="ft-home-promo-action"><strong>${s.done}/${s.lessons}</strong><span>aulas revisadas</span><button class="ws-main-button" data-nav="frontend">Explorar formação →</button></div></section>`;}
function frontendHomePage(){const s=frontendSummary();return `<section class="ft-page" aria-label="Formação frontend">
  <button class="back-link" data-nav="inicio">← Visão geral</button>
  <div class="ft-hero"><div><span class="section-kicker">FORMAÇÃO FRONTEND · SPRINT 09</span><h1>Aprenda a construir<br><em>interfaces completas.</em></h1><p>Uma sequência de estudos para sair da teoria e criar páginas, componentes e aplicações. Os exercícios de HTML/CSS/JS abrem no Workspace; os starters TypeScript e React são projetos Vite para VS Code.</p></div><div class="ft-hero-counter"><strong>${s.lessons}</strong><span>aulas práticas em ${s.tracks} percursos</span><span>${s.done} revisadas por você</span></div></div>
  <div class="ft-section-heading"><div><span class="section-kicker">SEU CAMINHO</span><h2>Escolha a próxima competência</h2></div><span>Ordem sugerida: HTML → CSS → JavaScript → TypeScript → React</span></div>
  <div class="ft-track-grid">${frontendTracks.map(frontendTrackCard).join('')}</div>
  <details class="cl-course-method"><summary>Como funciona a formação</summary><div class="ft-method"><div><strong>01 / Entenda</strong><p>Conceito, exemplo e pergunta para identificar o motivo da solução.</p></div><div><strong>02 / Pratique</strong><p>Projeto real em arquivos, sem entregar a atividade resolvida.</p></div><div><strong>03 / Revise</strong><p>Checklist de revisão manual. Não confunda marcação com teste automático de código.</p></div></div></details>
 </section>`;}
function frontendTrackPage(id){const track=findFrontendTrack(id);if(!track)return `<section class="ft-page"><h1>Trilha não encontrada</h1><button data-nav="frontend">Voltar</button></section>`;
 const done=frontendTrackDone(track),last=track.lessons.find(l=>!frontendDone(l))||track.lessons[0];
 return `<section class="ft-page"><button class="back-link" data-nav="frontend">← Formação frontend</button>
  <div class="ft-track-hero"><div><span class="section-kicker">${esc(track.level)} · ${esc(track.duration)}</span><h1>${esc(track.title)}</h1><p>${esc(track.description)}</p><div class="ft-hero-actions"><button class="ws-main-button" data-nav="frontend/aula/${esc(last.id)}">${done?'Continuar trilha':'Começar percurso'} →</button><span>${done}/${track.lessons.length} aulas revisadas</span></div></div><div class="ft-track-project"><span>PROJETO DO PERCURSO</span><strong>${esc(track.project)}</strong><p>${esc(track.outcome)}</p></div></div>
  <div class="ft-section-heading"><div><span class="section-kicker">SEQUÊNCIA</span><h2>Aprenda por etapas</h2></div><span>Todos os conteúdos podem ser acessados livremente.</span></div>
  <div class="ft-lesson-list">${track.lessons.map((l,i)=>`<button class="ft-lesson-link" data-nav="frontend/aula/${esc(l.id)}"><span class="ft-lesson-number ${frontendDone(l)?'done':''}">${frontendDone(l)?'✓':String(i+1).padStart(2,'0')}</span><span><strong>${esc(l.title)}</strong><small>${esc(l.objective)}</small></span><span class="ft-lesson-time">${l.minutes} min <span aria-hidden="true">→</span></span></button>`).join('')}</div>
  <div class="ft-resources"><strong>Leituras oficiais de apoio</strong>${frontendResources[track.id].map(([title,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${esc(title)} ↗</a>`).join('')}</div>
 </section>`;}
function frontendLessonPage(id){const l=findFrontendLesson(id);if(!l)return `<section class="ft-page"><h1>Aula não encontrada</h1><button data-nav="frontend">Voltar</button></section>`;
 const track=findFrontendTrack(l.track),idx=track.lessons.findIndex(x=>x.id===l.id),previous=track.lessons[idx-1],next=track.lessons[idx+1],answer=fst.answers[id],passed=fst.quiz[id]===true,checked=frontendChecklistCount(l),total=l.checks.length;
 const q=l.quiz;
 return `<section class="ft-page ft-lesson-page" aria-label="Aula de frontend">
   <div class="ft-lesson-breadcrumb"><button data-nav="frontend">Formação</button><span>/</span><button data-nav="frontend/trilha/${esc(track.id)}">${esc(track.title)}</button><span>/</span><span>Aula ${idx+1}</span></div>
   <header class="ft-lesson-hero"><div><span class="section-kicker">AULA ${String(idx+1).padStart(2,'0')} DE ${String(track.lessons.length).padStart(2,'0')} · ${l.minutes} MIN</span><h1>${esc(l.title)}</h1><p>${esc(l.objective)}</p></div><div class="ft-lesson-status ${frontendDone(l)?'is-done':''}">${frontendDone(l)?'✓ Revisão registrada':'Estude e pratique'}</div></header>
   <div class="ft-learning-shell"><div class="ft-lesson-body">
     <section class="ft-panel"><span class="section-kicker">01 / ENTENDA O CONCEITO</span><h2>Por que isso importa?</h2>${l.theory.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="ft-concepts">${l.concepts.map(c=>`<span>${esc(c)}</span>`).join('')}</div></section>
     <section class="ft-panel"><span class="section-kicker">02 / OBSERVE O EXEMPLO</span><h2>Uma implementação pequena</h2><pre class="ft-code"><code>${esc(l.example)}</code></pre><p class="ft-caption">Estude o funcionamento, mas evite copiar o exemplo diretamente para o projeto.</p></section>
     <section class="ft-panel"><span class="section-kicker">03 / RESPONDA SEM CONSULTAR</span><h2>${esc(q.question)}</h2><div class="ft-quiz" role="group" aria-label="Alternativas">${q.options.map((opt,i)=>`<button data-ft-answer="${i}" data-ft-lesson="${esc(l.id)}" ${passed?'disabled':''} class="ft-option ${passed&&q.answer===i?'correct':''} ${!passed&&answer===i&&answer!==q.answer?'incorrect':''}"><span>${'ABC'[i]}</span>${esc(opt)}</button>`).join('')}</div>${passed?`<div class="ft-feedback correct" role="status"><strong>Resposta compreendida.</strong><p>${esc(q.explanation)}</p></div>`:answer!==undefined?`<div class="ft-feedback incorrect" role="status">Ainda não. Leia o exemplo e tente outra alternativa.</div>`:`<p class="ft-caption">Escolha uma opção. O feedback mostra o motivo, não apenas a letra certa.</p>`}</section>
     <section class="ft-panel"><span class="section-kicker">04 / PRATIQUE EM ARQUIVOS</span><h2>Agora é com você</h2><p>${esc(l.practice)}</p><div class="ft-assignment"><div><strong>${esc(track.project)}</strong><span>${track.id==='react'||track.id==='typescript'?'Projeto Vite para VS Code e terminal real.':'Arquivos HTML, CSS e JS separados no Workspace.'}</span></div><button class="ws-main-button" data-ft-starter="${esc(l.id)}">${track.id==='react'||track.id==='typescript'?'↓ Baixar projeto inicial':'Criar projeto no Workspace →'}</button></div><p class="ft-caption">${track.id==='react'||track.id==='typescript'?'Esta versão do Workspace não executa TSX ou React diretamente; rode npm install no VS Code.':'O projeto é uma cópia nova: não altera suas aulas nem o TaskFlow.'}</p></section>
     <section class="ft-panel"><span class="section-kicker">05 / REVISÃO DO PROJETO</span><h2>Critérios de aceitação</h2><p>Marque somente depois de testar manualmente cada item em seu próprio código. Isso registra sua revisão, <strong>não é uma correção automática</strong>.</p><div class="ft-review-list">${l.checks.map((check,i)=>`<label class="ft-check-row"><input type="checkbox" data-ft-check="${i}" data-ft-lesson="${esc(l.id)}" ${fst.checklist[id]?.includes(i)?'checked':''}><span>${esc(check)}</span></label>`).join('')}</div><div class="ft-check-progress" role="status">${checked}/${total} critérios revisados · ${passed?'quiz respondido':'quiz pendente'}${frontendDone(l)?' · aula revisada':''}</div></section>
   </div><aside class="ft-study-aside"><div class="ft-aside-card"><strong>Seu caderno</strong><p>Registre uma explicação com suas palavras e um erro que conseguiu resolver.</p><label for="ft-notes">Anotações da aula</label><textarea id="ft-notes" rows="8" placeholder="O conceito em minhas palavras...">${esc(fst.notes[id]||'')}</textarea><small>Salvo somente neste navegador.</small></div><div class="ft-aside-card"><strong>Metodologia</strong><ol><li>Leia a teoria.</li><li>Responda sem olhar o exemplo.</li><li>Construa a atividade.</li><li>Teste critérios em celular e desktop.</li><li>Registre como resolveu os erros.</li></ol></div></aside></div>
   <nav class="ft-pager" aria-label="Navegação entre aulas"><button ${previous?'data-nav="frontend/aula/'+esc(previous.id)+'"':'disabled'}>← Aula anterior</button><button data-nav="frontend/trilha/${esc(track.id)}">Ver percurso</button><button ${next?'data-nav="frontend/aula/'+esc(next.id)+'"':'disabled'}>${next?'Próxima aula →':'Fim do percurso ✓'}</button></nav>
 </section>`;
}
function frontendSaveProgress(){save('frontend-quiz',fst.quiz);save('frontend-checklist',fst.checklist);}
function frontendCreateStarter(lessonId){
 const lesson=findFrontendLesson(lessonId),track=lesson&&findFrontendTrack(lesson.track);if(!track||!lesson)return;
 try{
   if(track.id==='typescript'||track.id==='react'){
     const files=frontendStarterFiles(track,lesson),blob=archiveTextFiles(files);
     const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='devlab-'+track.id+'-'+lesson.id+'.zip';link.click();setTimeout(()=>URL.revokeObjectURL(url),2500);toast('Projeto inicial exportado. Siga o README no VS Code.');
   }else{
     const starter=frontendWorkspaceStarter(track,lesson);
     let project;
     const old=fst.projects[lesson.id];
     if(old&&wst.projects[old]){wst.activeId=old;workspaceSave();nav('workspace');return;}
     project=createWorkspace('basic','Formação · '+lesson.title);
     project.files=starter.files;project.entry=starter.entry;project.selected='index.html';validateWorkspace(project);
     wst.projects[project.id]=project;wst.activeId=project.id;wst.selected='index.html';
     fst.projects[lesson.id]=project.id;save('frontend-workspace-projects',fst.projects);
     workspaceSave();nav('workspace');
   }
 }catch(error){console.error(error);toast('Não foi possível criar o projeto: '+(error?.message||error));}
}
window.addEventListener('click',event=>{
 const quiz=event.target.closest('[data-ft-answer]');
 if(quiz){const lesson=findFrontendLesson(quiz.dataset.ftLesson);if(!lesson||fst.quiz[lesson.id])return;
   const choice=Number(quiz.dataset.ftAnswer);fst.answers[lesson.id]=choice;
   if(choice===lesson.quiz.answer){fst.quiz[lesson.id]=true;frontendSaveProgress();recordActivity();}
   render();return;
 }
 const starter=event.target.closest('[data-ft-starter]');if(starter){frontendCreateStarter(starter.dataset.ftStarter);return;}
});
window.addEventListener('change',event=>{
 const check=event.target.closest('[data-ft-check]');if(!check)return;
 const lesson=findFrontendLesson(check.dataset.ftLesson),index=Number(check.dataset.ftCheck);
 if(!lesson||!Number.isInteger(index)||index<0||index>=lesson.checks.length)return;
 const current=new Set(fst.checklist[lesson.id]||[]);
 if(check.checked)current.add(index);else current.delete(index);
 fst.checklist[lesson.id]=[...current].sort((a,b)=>a-b);frontendSaveProgress();
 if(frontendDone(lesson))recordActivity();
 const notice=$('.ft-check-progress');if(notice)notice.textContent=`${current.size}/${lesson.checks.length} critérios revisados · ${fst.quiz[lesson.id]?'quiz respondido':'quiz pendente'}${frontendDone(lesson)?' · aula revisada':''}`;
 const status=$('.ft-lesson-status');if(status){status.textContent=frontendDone(lesson)?'✓ Revisão registrada':'Estude e pratique';status.classList.toggle('is-done',frontendDone(lesson));}
});
window.addEventListener('input',event=>{
 if(event.target?.id!=='ft-notes')return;
 const route=getRoute();if(route.page!=='frontend-lesson'||!findFrontendLesson(route.id))return;
 fst.notes[route.id]=event.target.value;save('frontend-notes',fst.notes);
});
