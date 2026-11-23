/* DevLab 21 — microprática autoral, opcional e independente do progresso legado. */
const microUi={
 completed:load('micro-completed',{}),
 drafts:load('micro-drafts',{}),
 attempts:load('micro-attempts',{}),
 hints:load('micro-hints',{}),
 feedback:Object.create(null)
};
function microChallengeHtml(id){
 const task=findMicroChallenge(id);if(!task)return '';
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
 hints?'<div class="dl-micro-hints">'+task.hints.slice(0,hints).map((hint,i)=>'<p><strong>Dica '+(i+1)+':</strong> '+esc(hint)+'</p>').join('')+'</div>':'',
 '<div class="dl-micro-bottom"><button class="dl-micro-hint" type="button" data-micro-hint="'+esc(id)+'" '+(hints===2?'disabled':'')+'>'+(hints===2?'Todas as dicas exibidas':'Preciso de uma dica')+'</button><small>'+(Number(microUi.attempts[id])||0)+' tentativa(s) · conferência textual, sem executar o código</small></div>',
 '<div id="micro-feedback-'+esc(id)+'" class="dl-micro-feedback '+(feedback?.ok?'correct':feedback?'incorrect':'')+'" role="status" aria-live="polite">',
 feedback?'<strong>'+(feedback.ok?'✓ Resposta correta':'Ainda não é esse trecho')+'</strong><p>'+esc(feedback.ok?task.explanation:'Confira o formato do código e tente novamente. Use as dicas se necessário.')+'</p>'+(feedback.ok?'<button type="button" data-micro-next>Continuar a aula →</button>':''):complete?'<strong>✓ Você já completou este microdesafio.</strong><p>Execute o código para consolidar o aprendizado.</p><button type="button" data-micro-next>Continuar a aula →</button>':'',
 '</div></section>'
 ];
 return fragments.join('');
}
function microRefresh(container,id,focusSelector){
 if(!container)return;
 const wrapper=document.createElement('div');
 wrapper.innerHTML=microChallengeHtml(id);
 container.replaceWith(wrapper.firstElementChild);
 if(focusSelector)document.querySelector('[data-micro-id="'+id+'"] '+focusSelector)?.focus({preventScroll:true});
}
window.addEventListener('input',event=>{
 const id=event.target?.dataset.microInput;if(!id||!findMicroChallenge(id))return;
 microUi.drafts[id]=event.target.value;save('micro-drafts',microUi.drafts);
});
window.addEventListener('submit',event=>{
 const form=event.target.closest?.('[data-micro-form]');if(!form)return;
 event.preventDefault();
 const id=form.dataset.microForm,task=findMicroChallenge(id);if(!task)return;
 const value=form.querySelector('[data-micro-input]')?.value||'';
 microUi.drafts[id]=value;save('micro-drafts',microUi.drafts);
 microUi.attempts[id]=(Number(microUi.attempts[id])||0)+1;save('micro-attempts',microUi.attempts);
 const ok=gradeMicroAnswer(task,value);
 if(ok){microUi.completed[id]=true;save('micro-completed',microUi.completed);recordActivity();}
 microUi.feedback[id]={ok};
 microRefresh(form.closest('.dl-micro'),id,'[data-micro-input]');
});
window.addEventListener('click',event=>{
 const hint=event.target.closest('[data-micro-hint]');
 if(hint){
  const id=hint.dataset.microHint;if(!findMicroChallenge(id))return;
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
