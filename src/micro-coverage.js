import {allLessons} from './course.js';
import {frontendLessons} from './frontend-curriculum.js';
import {backendLessons} from './backend-curriculum.js';
import {guidedLanguageLessons} from './language-curriculum.js';
import {microChallenges as authoredChallenges} from './micro-lessons.js';
import {microRulebook} from './micro-rulebook.js';

const simplify=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const lessonExample=lesson=>{
 const raw=String(lesson.example||'').replace(/\r\n/g,'\n').trim();
 const meaningful=raw.split('\n').some(line=>line.trim()&&!/^(\/\/|#|--|\/\*|\*)/.test(line.trim()));
 return meaningful?raw:String(lesson.starter?.js||lesson.starter?.ts||raw).trim();
};
function findToken(line,token){
 let i=line.indexOf(token);
 while(i>=0){
  const b=line[i-1]||'',a=line[i+token.length]||'';
  if((!/[A-Za-z0-9_$]/.test(token[0])||!/[A-Za-z0-9_$]/.test(b))&&
     (!/[A-Za-z0-9_$]/.test(token[token.length-1])||!/[A-Za-z0-9_$]/.test(a)))return i;
  i=line.indexOf(token,i+1);
 }
 return -1;
}
function choose(example,lesson,group){
 const lines=example.split('\n'),theme=simplify([lesson.title,lesson.goal,lesson.objective,lesson.summary,...(lesson.concepts||[])].filter(Boolean).join(' '));
 const picks=[];
 for(let i=0;i<lines.length;i++){
  const line=lines[i];
  if(!line.trim()||/^(\/\/|#(?!include)|--|\/\*|\*)/.test(line.trim()))continue;
  for(const rule of microRulebook){
   if(group==='python'&&['const','let','interface','public','private','static','new','function','number','string','return'].includes(rule.token))continue;
   const offset=findToken(line,rule.token);
   if(offset<0)continue;
   const matching=rule.clues.split(' ').filter(word=>word.length>2&&theme.includes(simplify(word))).length;
   picks.push({rule,i,offset,quality:'concept',score:matching*25+Math.min(10,rule.token.length/3)+(i<3?1:0)});
  }
 }
 picks.sort((a,b)=>b.score-a.score||a.i-b.i||b.rule.token.length-a.rule.token.length);
 if(picks.length)return picks[0];
 for(let i=0;i<lines.length;i++){
  const line=lines[i];if(!line.trim()||/^(\/\/|#|--|\/\*|\*)/.test(line.trim()))continue;
  const words=[...line.matchAll(/\b[A-Za-z_$][A-Za-z_$0-9]{3,}\b/g)].filter(x=>!['true','false','null','undefined','this','else','body','html','main'].includes(x[0].toLowerCase()));
  if(!words.length)continue;
  const word=words.sort((a,b)=>(theme.includes(simplify(b[0]))?100:0)+b[0].length-(theme.includes(simplify(a[0]))?100:0)-a[0].length)[0];
  return {rule:{token:word[0],topic:'identificador do exemplo',purpose:'é um nome utilizado no trecho de código',alts:['valor','dados','resultado'].filter(x=>x!==word[0])},i,offset:word.index,quality:'identifier'};
 }
 return null;
}
function groupLabel(group,lesson){
 const basic={javascript:'JavaScript',typescript:'TypeScript',python:'Python',java:'Java',php:'PHP',sql:'SQL'};
 if(basic[group])return basic[group];
 if(group==='frontend')return {html:'HTML',css:'CSS',react:'React',javascript:'JavaScript',typescript:'TypeScript'}[lesson.track]||'Frontend';
 return {node:'Node.js',http:'HTTP',postgres:'SQL',auth:'Segurança',quality:'Backend'}[lesson.track]||'Backend';
}
function descriptor(lesson,group){
 return {
  lessonId:lesson.id,language:groupLabel(group,lesson),
  practice:String(lesson.challenge||lesson.practice||lesson.task||'').trim(),
  checks:[...(lesson.steps||lesson.checks||[])].slice(0,3),
  starterCode:String(lesson.starter?.js||lesson.example||''),
  fullExample:lessonExample(lesson),
  route:group==='frontend'?'frontend/aula/'+lesson.id:group==='backend'?'backend/aula/'+lesson.id:
   ['javascript','typescript'].includes(group)?'aula/'+lesson.id:'linguagem/aula/'+lesson.id,
  editorAvailable:['javascript','typescript'].includes(group)
 };
}
function derivedLesson(lesson,group){
 const meta=descriptor(lesson,group),lines=meta.fullExample.split('\n');
 const selection=choose(meta.fullExample,lesson,group);
 if(!selection)throw new Error('Exemplo sem trecho de código: '+lesson.id);
 const start=Math.max(0,selection.i-2),end=Math.min(lines.length,selection.i+3);
 const code=lines.slice(start,end).join('\n');
 const prefix=lines.slice(start,selection.i).join('\n');
 const at=prefix.length+(selection.i>start?1:0)+selection.offset;
 const correct=selection.rule.token;
 const snippet=code.slice(0,at)+'____'+code.slice(at+correct.length);
 const suggestions=[...new Set([correct,...selection.rule.alts,'null','false'].filter(x=>x&&x!=='____'))].slice(0,3);
 const objective=String(lesson.goal||lesson.objective||lesson.summary||lesson.title).trim().replace(/[.!?]$/,'');
 return {
  ...meta,title:'Complete o trecho: '+lesson.title,prompt:'Complete a instrução retirada do exemplo desta aula.',
  snippet,answers:[correct],suggestions,
  hints:['Pense no objetivo da aula: '+objective+'.','O conceito está ligado a '+selection.rule.topic+'; revise o exemplo para identificar a expressão.'],
  explanation:'Neste trecho, '+correct+' '+selection.rule.purpose+'. Execute o exemplo completo para conferir o resultado.',
  source:'derived-from-example',quality:selection.quality
 };
}
const rows=[];
for(const lesson of allLessons)rows.push({lesson,group:lesson.language==='ts'?'typescript':'javascript'});
for(const lesson of frontendLessons)rows.push({lesson,group:'frontend'});
for(const lesson of backendLessons)rows.push({lesson,group:'backend'});
for(const [group,lessons] of Object.entries(guidedLanguageLessons))for(const lesson of lessons)rows.push({lesson,group});
export const allMicroLessonData=Object.freeze(rows);
const covered={};
for(const {lesson,group} of rows){
 if(covered[lesson.id])throw new Error('ID duplicado: '+lesson.id);
 const meta=descriptor(lesson,group),authored=authoredChallenges[lesson.id];
 covered[lesson.id]=Object.freeze(authored?{...meta,...authored,...meta,source:'curated',quality:'human-reviewed'}:derivedLesson(lesson,group));
}
export const completeMicroChallenges=Object.freeze(covered);
export const allMicroLessonIds=Object.freeze(Object.keys(covered));
export const findCompleteMicroChallenge=id=>completeMicroChallenges[id]||null;
export function microCoverageReport(){
 const all=Object.values(completeMicroChallenges);
 return {total:all.length,curated:all.filter(x=>x.source==='curated').length,
  derived:all.filter(x=>x.source==='derived-from-example').length,
  fallback:all.filter(x=>x.quality==='identifier').length,
  byLanguage:Object.fromEntries([...new Set(all.map(x=>x.language))].map(name=>[name,all.filter(x=>x.language===name).length]))};
}
