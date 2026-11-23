/* DevLab 21 — microprática autoral, opcional e independente do progresso legado. */
const microUi={
 completed:load('micro-completed',{}),
 drafts:load('micro-drafts',{}),
 attempts:load('micro-attempts',{}),
 hints:load('micro-hints',{}),
 practiceDrafts:load('micro-practice-drafts',{}),
 practiceOpen:Object.create(null),
 feedback:Object.create(null)
};
function microPracticalHtml(id,task){
 const starter=microUi.practiceDrafts[id]??task.starterCode??task.fullExample??'';
 const open=!!microUi.practiceOpen[id];
 return '<details class="dl-micro-practical" data-micro-practice-details="'+esc(id)+'" '+(open?'open':'')+'>'+
  '<summary><span>2. Exercício prático</span><small>Use o código inicial e resolva uma alteração real</small></summary>'+
  '<div class="dl-micro-practical-body"><p class="dl-micro-task">'+esc(task.practice||'Experimente uma alteração no exemplo desta aula e verifique o resultado.')+'</p>'+
  '<label for="micro-practice-code-'+esc(id)+'">Código inicial editável</label>'+
  '<textarea id="micro-practice-code-'+esc(id)+'" data-micro-practice-input="'+esc(id)+'" spellcheck="false" autocapitalize="off" rows="8">'+esc(starter)+'</textarea>'+
  '<div class="dl-micro-practice-actions"><button type="button" data-micro-practice-copy="'+esc(id)+'">Copiar meu código</button>'+
  '<button type="button" data-micro-open-practice="'+esc(id)+'">Abrir a prática completa →</button></div>'+
  '<div class="dl-micro-practice-checks"><strong>O que testar:</strong><ul>'+
  (task.checks||[]).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>'+
  '<p class="rp-disclaimer">Rascunho salvo neste navegador. O texto aqui não é executado nem avaliado automaticamente: '+(task.editorAvailable?'use o editor e os testes da aula para verificar sua solução.':'copie o arquivo para o ambiente apropriado e execute os testes da aula.')+'</p></div></details>';
}
function microChallengeHtml(id){
 const task=findCompleteMicroChallenge(id);if(!task)return '';
 const complete=!!microUi.completed[id],hints=Math.min(2,microUi.hints[id]||0);
 const feedback=microUi.feedback[id],value=microUi.drafts[id]||'';
 const fragments=[
 '<section class="dl-micro" data-micro-id="'+esc(id)+'" aria-label="Microdesafio de código">',
 '<div class="dl-micro-top"><span class="section-kicker">APRENDA FAZENDO</span><span class="dl-micro-status">'+(complete?'✓ ':'')+(complete?'Conceito verificado':'1 microdesafio · cerca de 2 min')+'</span></div>',
 '<h3>'+esc(task.title)+'</h3><p>'+esc(task.prompt)+'</p>',
 '<pre class="dl-micro-code"><code>'+esc(task.snippet)+'</code></pre>',
 '<form data-micro-form="'+esc(id)+'" class="dl-micro-form">',
 '<label for="micro-answer-'+esc(id)+'">Substitua <code>____</code> pelo trecho correto</label>',
 '<div class="dl-micro-controls"><input id="micro-answer-'+esc(id)+'" name="answer" data-micro-input="'+esc(id)+'" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="100" value="'+esc(value)+'" placeholder="Digite o código que falta" aria-describedby="micro-feedback-'+esc(id)+'">',
 '<button type="submit">'+(complete?'Verificar novamente':'Conferir resposta')+'</button></div></form>',
 task.suggestions?.length?'<div class="dl-micro-suggestions"><span>Sugestões para preencher pelo toque</span><div>'+task.suggestions.map(token=>'<button type="button" data-micro-suggestion="'+esc(token)+'">'+esc(token)+'</button>').join('')+'</div></div>':'',
 hints?'<div class="dl-micro-hints">'+task.hints.slice(0,hints).map((hint,i)=>'<p><strong>Dica '+(i+1)+':</strong> '+esc(hint)+'</p>').join('')+'</div>':'',
 '<div class="dl-micro-bottom"><button class="dl-micro-hint" type="button" data-micro-hint="'+esc(id)+'" '+(hints===2?'disabled':'')+'>'+(hints===2?'Todas as dicas exibidas':'Preciso de uma dica')+'</button><small>'+(Number(microUi.attempts[id])||0)+' tentativa(s) · conferência textual, sem executar o código</small></div>',
 '<div id="micro-feedback-'+esc(id)+'" class="dl-micro-feedback '+(feedback?.ok?'correct':feedback?'incorrect':'')+'" role="status" aria-live="polite">',
 feedback?'<strong>'+(feedback.ok?'✓ Resposta correta':'Ainda não é esse trecho')+'</strong><p>'+esc(feedback.ok?task.explanation:'Confira o formato do código e tente novamente. Use as dicas se necessário.')+'</p>'+(feedback.ok?'<button type="button" data-micro-next>Continuar a aula →</button>':''):complete?'<strong>✓ Você já completou este microdesafio.</strong><p>Execute o código para consolidar o aprendizado.</p><button type="button" data-micro-next>Continuar a aula →</button>':'',
 '</div>',
 microPracticalHtml(id,task),
 '</section>'
 ];
 return fragments.join('');
}
function microRefresh(container,id,focusSelector){
 if(!container)return;
 const practical=container.querySelector('[data-micro-practice-details]');if(practical)microUi.practiceOpen[id]=practical.open;
 const wrapper=document.createElement('div');
 wrapper.innerHTML=microChallengeHtml(id);
 container.replaceWith(wrapper.firstElementChild);
 if(focusSelector)document.querySelector('[data-micro-id="'+id+'"] '+focusSelector)?.focus({preventScroll:true});
}
function microQuickCardHtml(){
 const recommended=st.last&&findCompleteMicroChallenge(st.last)&&!microUi.completed[st.last]?st.last:null;
 const id=recommended||allMicroLessonIds.find(key=>!microUi.completed[key]);
 if(!id)return '<section class="dl-daily"><div><span class="section-kicker">PRÁTICA RÁPIDA</span><strong>Você concluiu os microdesafios disponíveis.</strong><p>Continue os projetos e desafios de código da plataforma para aprofundar o aprendizado.</p></div><button data-nav="linguagens">Abrir cursos →</button></section>';
 const challenge=findCompleteMicroChallenge(id);
 const route=challenge.route;
 return '<section class="dl-daily"><div><span class="section-kicker">PRÁTICA RÁPIDA · 5 MINUTOS</span><strong>'+esc(challenge.title)+'</strong><p>'+esc(challenge.language)+' · complete uma linha e depois experimente no editor ou no seu ambiente de desenvolvimento.</p></div><button data-nav="'+esc(route)+'">Começar agora →</button></section>';
}
window.addEventListener('input',event=>{
 const practiceId=event.target?.dataset.microPracticeInput;
 if(practiceId&&findCompleteMicroChallenge(practiceId)){
  microUi.practiceDrafts[practiceId]=event.target.value;save('micro-practice-drafts',microUi.practiceDrafts);return;
 }
 const id=event.target?.dataset.microInput;if(!id||!findCompleteMicroChallenge(id))return;
 microUi.drafts[id]=event.target.value;save('micro-drafts',microUi.drafts);
});
window.addEventListener('submit',event=>{
 const form=event.target.closest?.('[data-micro-form]');if(!form)return;
 event.preventDefault();
 const id=form.dataset.microForm,task=findCompleteMicroChallenge(id);if(!task)return;
 const value=form.querySelector('[data-micro-input]')?.value||'';
 microUi.drafts[id]=value;save('micro-drafts',microUi.drafts);
 microUi.attempts[id]=(Number(microUi.attempts[id])||0)+1;save('micro-attempts',microUi.attempts);
 const ok=gradeMicroAnswer(task,value);
 if(ok){microUi.completed[id]=true;save('micro-completed',microUi.completed);recordActivity();}
 microUi.feedback[id]={ok};
 microRefresh(form.closest('.dl-micro'),id,'[data-micro-input]');
});
window.addEventListener('click',event=>{
 const copy=event.target.closest('[data-micro-practice-copy]');
 if(copy){const id=copy.dataset.microPracticeCopy,task=findCompleteMicroChallenge(id);if(!task)return;
  clipboard(microUi.practiceDrafts[id]??task.starterCode);return;}
 const open=event.target.closest('[data-micro-open-practice]');
 if(open){const route=getRoute(),id=open.dataset.microOpenPractice;
  if(!findCompleteMicroChallenge(id))return;
  if(route.page==='lesson'){st.step='practice';render();}
  else if(route.page==='language-lesson'){pathwayState.langTab=id.startsWith('php-')?3:2;render();}
  else if(route.page==='frontend-lesson'||route.page==='backend-lesson'){setStudyStep(route.page==='frontend-lesson'?'frontend':'backend',id,3,true);}
  return;
 }
 const chip=event.target.closest('[data-micro-suggestion]');
 if(chip){
  const section=chip.closest('.dl-micro'),id=section?.dataset.microId,field=section?.querySelector('[data-micro-input]');
  if(!id||!findCompleteMicroChallenge(id)||!field)return;
  field.value=chip.dataset.microSuggestion;
  microUi.drafts[id]=field.value;save('micro-drafts',microUi.drafts);
  field.focus({preventScroll:true});
  return;
 }
 const hint=event.target.closest('[data-micro-hint]');
 if(hint){
  const id=hint.dataset.microHint;if(!findCompleteMicroChallenge(id))return;
  microUi.hints[id]=Math.min(2,(microUi.hints[id]||0)+1);
  save('micro-hints',microUi.hints);
  microRefresh(hint.closest('.dl-micro'),id,'[data-micro-hint]');
  return;
 }
 const next=event.target.closest('[data-micro-next]');if(!next)return;
 const r=getRoute();
 if(r.page==='lesson'){st.step='practice';render();}
 else if(r.page==='language-lesson'){pathwayState.langTab=r.id.startsWith('php-')?2:1;render();}
 else if(r.page==='frontend-lesson'||r.page==='backend-lesson'){setStudyStep(r.page==='frontend-lesson'?'frontend':'backend',r.id,1,true);}
});
