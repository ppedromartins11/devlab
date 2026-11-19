import assert from 'node:assert/strict';
import { behaviorLessonIds, assessLessonBehavior } from '../src/lesson-assessment.js';
import { runtimeCheckedLessons } from '../src/runtime-check.js';
import { buildPreview } from '../src/preview.js';
import { allJsLessons } from '../src/course.js';
import { inspectExercise } from '../src/learning.js';

assert.equal(behaviorLessonIds.length, 12);
assert.deepEqual([...runtimeCheckedLessons], behaviorLessonIds);
assert(behaviorLessonIds.every(id=>allJsLessons.some(l=>l.id===id)));

function element(text='') {
 const handlers={};
 return {
  textContent:text, value:'', classList:{classes:new Set(),contains(k){return this.classes.has(k)},toggle(k){if(this.classes.has(k)){this.classes.delete(k);return false;}this.classes.add(k);return true;}},
  addEventListener(type,handler){(handlers[type]??=[]).push(handler)},
  dispatchEvent(event){Object.defineProperty(event,'target',{configurable:true,value:this});for(const fn of (handlers[event.type]||[]))fn(event);return !event.defaultPrevented;},
  click(){return this.dispatchEvent(new Event('click'))},
  getAttribute(name){return this[name]||null}
 };
}
function doc(entries) {
 return {querySelector(selector){return entries[selector]??null},querySelectorAll(selector){return entries[selector]||[]}};
}
function allPass(checks){return checks.length>0&&checks.every(item=>item.ok===true)}
function anyFailed(checks){return checks.some(item=>item.ok===false)}

// Aulas de eventos devem funcionar com entradas diferentes, sem string fixa.
{
 const field=element(),result=element('Digite aqui');
 const page=doc({'#name':field,'#result':result});
 assert(anyFailed(assessLessonBehavior('eventos',page,[])));
 field.addEventListener('input',e=>{result.textContent=e.target.value;});
 assert(allPass(assessLessonBehavior('eventos',page,[])));
}
// Formulário deve cadastrar, normalizar, limpar e recusar título em branco.
{
 const form=element(),field=element(),items=[],list=element();
 const page=doc({'#task-form':form,'#task-title':field,'#list':list,'#list li':items});
 form.addEventListener('submit',e=>{e.preventDefault();const value=field.value.trim();if(!value)return;items.push(element(value));field.value='';});
 assert(allPass(assessLessonBehavior('formularios',page,[])));
 const brokenForm=element(),badField=element(),badList=[];
 brokenForm.addEventListener('submit',e=>{e.preventDefault();badList.push(element('Fixo'));});
 assert(anyFailed(assessLessonBehavior('formularios',doc({'#task-form':brokenForm,'#task-title':badField,'#list li':badList}),[])));
}
// Ação repetida deve avançar estado, não apresentar sempre "1".
{
 const out=element('0'),button=element();
 button.addEventListener('click',()=>{out.textContent='1';});
 assert(anyFailed(assessLessonBehavior('renderizacao',doc({'#result':out,'#action':button}),[])));
 const out2=element('0'),button2=element();let n=0;
 button2.addEventListener('click',()=>{out2.textContent='Total: '+(++n);});
 assert(allPass(assessLessonBehavior('renderizacao',doc({'#result':out2,'#action':button2}),[])));
}
// DOM: o segundo clique deve desfazer a classe.
{
 const title=element('Original'),button=element();
 button.addEventListener('click',()=>{title.textContent='Alterado';title.classList.toggle('destaque')});
 assert(allPass(assessLessonBehavior('dom-basico',doc({'#title':title,'#action':button}),[])));
}
// O código inicial não pode ser aprovado apenas por conter seletores ou palavras.
for(const lesson of allJsLessons.filter(l=>runtimeCheckedLessons.has(l.id))){
 assert.equal(inspectExercise(lesson,{...lesson.starter}).passed,false,lesson.id);
}
const preview=buildPreview({html:'<main></main>',css:'',js:'',token:47});
assert(preview.includes('assessLessonBehavior'));
assert(preview.includes("nonce:msg.nonce"));
assert(preview.includes("send('check-result'"));
console.log('OK — 12 aulas com avaliações isoladas; testes positivos e negativos de DOM, eventos e formulários.');
