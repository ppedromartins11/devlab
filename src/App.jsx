import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2,
  ChevronDown, ChevronRight, Circle, Code2, Command, Copy, Download,
  ExternalLink, FileCode2, FolderKanban, GraduationCap, Info, LayoutGrid,
  Lightbulb, ListChecks, Menu, Monitor, Play, RotateCcw, Search,
  Smartphone, Sparkles, Terminal, Trophy, X, Zap
} from 'lucide-react';
import { allJsLessons, allTsLessons, allLessons, jsUnits, tsUnits, projectStarter, typescriptProjectStarter } from './course.js';
import { buildPreview, loadStorageBucket, makeExportHtml } from './preview.js';
import { checkpoints, inspectExercise, localDateKey, streakDays, experiencePoints } from './learning.js';
import { runtimeCheckedLessons } from './runtime-check.js';
import './monacoSetup.js';

const STORAGE = 'devlab-v1:';
function readSaved(key, fallback) {
  try { const value = localStorage.getItem(STORAGE + key); return value === null ? fallback : JSON.parse(value); }
  catch { return fallback; }
}
function useSavedState(key, initial) {
  const [value, setValue] = useState(() => readSaved(key, initial));
  useEffect(() => { try { localStorage.setItem(STORAGE + key, JSON.stringify(value)); } catch { /* navegador privado/quota */ } }, [key, value]);
  return [value, setValue];
}
function parseRoute() {
  const route = window.location.hash.replace(/^#\/?/, '') || 'inicio';
  if (route.startsWith('aula/')) return { type:'aula', id:route.split('/')[1] };
  if (route === 'curso/typescript') return { type:'curso', lang:'ts' };
  if (route === 'curso/javascript') return { type:'curso', lang:'js' };
  if (route === 'projeto') return { type:'projeto' };
  return { type:'inicio' };
}
function useRoute() {
  const [route, setRoute] = useState(parseRoute);
  useEffect(() => { const listener = () => setRoute(parseRoute()); window.addEventListener('hashchange', listener); return () => window.removeEventListener('hashchange', listener); }, []);
  return route;
}
function navigate(route) { window.location.hash = '#/' + route; window.scrollTo({top:0,behavior:'instant'}); }
function download(name, content, type='text/html') {
  const blob = new Blob([content], { type: type+';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
function ProgressBar({ value }) { return <div className="progress-track"><div className="progress-fill" style={{width:`${Math.max(0,Math.min(100,value))}%`}} /></div>; }
function Stat({icon:Icon,value,label}) { return <div className="stat"><span className="stat-icon"><Icon size={17}/></span><strong>{value}</strong><span>{label}</span></div>; }
function Pill({children, variant=''}) {return <span className={'pill '+variant}>{children}</span>;}

export default function App(){
  const route=useRoute();
  const [completed,setCompleted]=useSavedState('completed',[]);
  const [milestones,setMilestones]=useSavedState('milestones',[]);
  const [quizPassed,setQuizPassed]=useSavedState('quiz-passed',[]);
  const [practicePassed,setPracticePassed]=useSavedState('practice-passed',[]);
  const [activityDates,setActivityDates]=useSavedState('activity-dates',[]);
  const xp=experiencePoints(quizPassed,practicePassed,milestones);
  const streak=streakDays(activityDates);
  const [exerciseDrafts,setExerciseDrafts]=useSavedState('exercises',{});
  const [verifiedDrafts,setVerifiedDrafts]=useSavedState('verified-drafts',{});
  const [jsProject,setJsProject]=useSavedState('project-js',projectStarter);
  const [tsProject,setTsProject]=useSavedState('project-ts',typescriptProjectStarter);
  const [search,setSearch]=useState('');
  const [mobileMenu,setMobileMenu]=useState(false);
  const [expanded,setExpanded]=useState(['fundamentos','logica','dados','dom','web','projeto-final','ts-fundamentos']);

  const lesson=allLessons.find(l=>l.id===route.id) || allJsLessons[0];
  const totalCompletedJs=allJsLessons.filter(l=>completed.includes(l.id)).length;
  const totalCompletedTs=allTsLessons.filter(l=>completed.includes(l.id)).length;
  const jsPercent=Math.round(totalCompletedJs/allJsLessons.length*100);
  const tsPercent=Math.round(totalCompletedTs/allTsLessons.length*100);
  const lastId = readSaved('last-lesson','primeiros-passos');
  useEffect(()=>{if(route.type==='aula' && allLessons.some(l=>l.id===route.id)){ try {localStorage.setItem(STORAGE+'last-lesson',JSON.stringify(route.id));} catch { /* opcional */ } }},[route.type,route.id]);
  const jump=(to)=>{navigate(to);setMobileMenu(false);};
  const toggleDone=(id)=>setCompleted(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const recordActivity=()=>setActivityDates(prev=>prev.includes(localDateKey())?prev:[...prev,localDateKey()]);
  const toggleMile=(id)=>{if(!milestones.includes(id))recordActivity();setMilestones(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);};
  const toggleUnit=(id)=>setExpanded(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const searchable = search.trim().toLocaleLowerCase('pt-BR');
  const sidebarUnits=[...jsUnits,...tsUnits];

  return <div className="app-layout">
    <aside className={'sidebar '+(mobileMenu?'sidebar-open':'')}>
      <div className="sidebar-top">
        <button className="brand-button" onClick={()=>jump('inicio')} aria-label="Ir para início"><span className="logo-symbol"><Command size={24}/></span><span className="brand-text">dev<span>lab</span><small>APRENDA CONSTRUINDO</small></span></button>
        <button className="icon-button close-sidebar" onClick={()=>setMobileMenu(false)} aria-label="Fechar menu"><X size={20}/></button>
      </div>
      <div className="sidebar-scroll">
        <div className="sidebar-group">
          <div className="sidebar-label">ESPAÇO DE ESTUDO</div>
          <button className={'side-link '+(route.type==='inicio'?'selected':'')} onClick={()=>jump('inicio')}><LayoutGrid size={17}/> Visão geral</button>
          <button className={'side-link '+(route.type==='projeto'?'selected':'')} onClick={()=>jump('projeto')}><FolderKanban size={17}/> Projeto TaskFlow <span className="side-count">{milestones.length}/{allLessons.length}</span></button>
        </div>
        <div className="side-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar aulas..." aria-label="Buscar aulas" /></div>
        <div className="sidebar-group sidebar-course">
          <div className="sidebar-label">TRILHAS DE APRENDIZADO</div>
          <button className={'course-link '+(route.type==='curso' && route.lang==='js'?'selected-course':'')} onClick={()=>jump('curso/javascript')}><span className="js-logo">JS</span><span>JavaScript<small>{totalCompletedJs} de {allJsLessons.length} aulas</small></span><ChevronRight size={16}/></button>
          {jsUnits.map(unit=>{
            const filtered=unit.lessons.filter(l=>(l.title+' '+l.summary).toLocaleLowerCase('pt-BR').includes(searchable));
            if(searchable && filtered.length===0) return null;
            const isExpanded=expanded.includes(unit.id) || !!searchable;
            return <div className="nav-unit" key={unit.id}>
              <button className="unit-toggle" onClick={()=>toggleUnit(unit.id)}><span>{unit.title.replace(/^\d+\. /,'')}</span>{isExpanded?<ChevronDown size={14}/>:<ChevronRight size={14}/>}</button>
              {isExpanded && <div className="unit-lessons">{filtered.map(l=><button key={l.id} onClick={()=>jump('aula/'+l.id)} className={'lesson-link '+(route.type==='aula'&&route.id===l.id?'active-lesson':'')}><span className={'lesson-status '+(completed.includes(l.id)?'done':'')}>{completed.includes(l.id)?<Check size={11}/>:<Circle size={9}/>}</span><span>{l.title}</span></button>)}</div>}
            </div>;
          })}
          <button className={'course-link ts-nav '+(route.type==='curso'&&route.lang==='ts'?'selected-course':'')} onClick={()=>jump('curso/typescript')}><span className="ts-logo">TS</span><span>TypeScript<small>{totalCompletedTs} de {allTsLessons.length} aulas · próxima trilha</small></span><ChevronRight size={16}/></button>
          {tsUnits.map(unit=>{
            const filtered=unit.lessons.filter(l=>(l.title+' '+l.summary).toLocaleLowerCase('pt-BR').includes(searchable));
            if(searchable && !filtered.length) return null;
            const open=expanded.includes(unit.id)||!!searchable;
            return <div className="nav-unit" key={unit.id}>
              <button className="unit-toggle" onClick={()=>toggleUnit(unit.id)}><span>{unit.title.replace(/^\d+\. /,'')}</span>{open?<ChevronDown size={14}/>:<ChevronRight size={14}/>}</button>
              {open&&<div className="unit-lessons">{filtered.map(l=><button key={l.id} onClick={()=>jump('aula/'+l.id)} className={'lesson-link '+(route.type==='aula'&&route.id===l.id?'active-lesson':'')}><span className={'lesson-status '+(completed.includes(l.id)?'done':'')}>{completed.includes(l.id)?<Check size={11}/>:<Circle size={9}/>}</span><span>{l.title}</span></button>)}</div>}
            </div>;
          })}
        </div>
      </div>
      <div className="sidebar-bottom"><div className="avatar">P</div><div><strong>Meu espaço</strong><small>★ {xp} XP · 🔥 {streak} dia(s) de sequência</small></div><div className="online-dot"/></div>
    </aside>
    {mobileMenu && <button className="mobile-overlay" onClick={()=>setMobileMenu(false)} aria-label="Fechar menu"/>}
    <div className="main-pane">
      <header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu-btn" onClick={()=>setMobileMenu(true)} aria-label="Abrir menu"><Menu size={22}/></button><span className="breadcrumbs"><button onClick={()=>jump('inicio')}>Meu aprendizado</button><ChevronRight size={14}/>{route.type==='aula'?<><button onClick={()=>jump('curso/'+(lesson.language==='ts'?'typescript':'javascript'))}>{lesson.language==='ts'?'TypeScript':'JavaScript'}</button><ChevronRight size={14}/><span>{lesson.title}</span></>:route.type==='curso'?<span>{route.lang==='ts'?'TypeScript':'JavaScript'}</span>:route.type==='projeto'?<span>TaskFlow</span>:<span>Visão geral</span>}</span></div><div className="topbar-right"><span className="topbar-xp">★ {xp} XP</span><span className="sync-label"><span className="sync-dot"/> Salvamento local</span><button className="topbar-project" onClick={()=>jump('projeto')}><FolderKanban size={16}/> Meu projeto <ArrowRight size={15}/></button></div></header>
      <main className={'main-content '+(route.type==='aula'?'page-lesson':'')}>
        {route.type==='inicio'&&<Dashboard completed={completed} jsPercent={jsPercent} tsPercent={tsPercent} jsCount={totalCompletedJs} tsCount={totalCompletedTs} jump={jump} lastId={lastId} xp={xp} streak={streak}/>}
        {route.type==='curso'&&<CoursePage lang={route.lang} completed={completed} progress={route.lang==='ts'?tsPercent:jsPercent} jump={jump}/>}
        {route.type==='projeto'&&<ProjectPage completed={completed} milestones={milestones} onToggle={toggleMile} jump={jump} onOpenEditor={()=>jump('aula/'+lastId)} />}
        {route.type==='aula'&&<LessonPage key={lesson.id} lesson={lesson} completed={completed} toggleDone={toggleDone} milestones={milestones} toggleMile={toggleMile} jump={jump} exerciseDrafts={exerciseDrafts} setExerciseDrafts={setExerciseDrafts} verifiedDrafts={verifiedDrafts} setVerifiedDrafts={setVerifiedDrafts} jsProject={jsProject} setJsProject={setJsProject} tsProject={tsProject} setTsProject={setTsProject} quizPassed={quizPassed} setQuizPassed={setQuizPassed} practicePassed={practicePassed} setPracticePassed={setPracticePassed} recordActivity={recordActivity}/>}
      </main>
    </div>
  </div>;
}

function Dashboard({completed,jsPercent,tsPercent,jsCount,tsCount,jump,lastId,xp,streak}){
  return <div className="home-page">
    <div className="welcome-overline"><span className="welcome-dot"/> SEU ESPAÇO DE EVOLUÇÃO</div>
    <div className="hero-banner"><div className="hero-text"><Pill variant="hero-chip"><Sparkles size={13}/> TRILHA COMPLETA · DO ZERO À WEB</Pill><h1>Aprenda de verdade.<br/><em>Construa enquanto aprende.</em></h1><p>Do primeiro console.log ao seu próprio sistema web. Teoria direta, editor de código integrado e um projeto que cresce junto com você.</p><div className="hero-buttons"><button className="button-primary" onClick={()=>jump('aula/'+lastId)}><Play size={16} fill="currentColor"/> {completed.length?'Continuar estudando':'Começar a aprender'} <ArrowRight size={17}/></button><button className="button-ghost" onClick={()=>jump('projeto')}><FolderKanban size={17}/> Ver projeto guiado</button></div></div><div className="hero-art" aria-hidden="true"><div className="hero-code-card"><div className="window-dots"><i/><i/><i/></div><div className="hero-code-lines"><span><b>const</b> projeto = &#123;</span><span>&nbsp;&nbsp;objetivo: <strong>'aprender'</strong>,</span><span>&nbsp;&nbsp;pratica: <strong>true</strong>,</span><span>&nbsp;&nbsp;resultado: <strong>'construir'</strong></span><span>&#125;;</span><span className="hero-comment">// Seu progresso começa aqui_</span></div></div><div className="hero-float">&lt;/&gt;</div></div></div>
    <section className="stats-grid"><Stat icon={BookOpen} value={`${completed.length}/${allLessons.length}`} label="aulas concluídas"/><Stat icon={Zap} value={`${xp} XP`} label="experiência conquistada"/><Stat icon={Trophy} value={`${streak} dias`} label="sequência de estudos"/><Stat icon={FolderKanban} value={`${jsPercent}%`} label="avanço em JavaScript"/></section>
    <section className="micro-session"><div><span className="section-kicker">SESSÃO RÁPIDA</span><h2>5 minutos de prática fazem diferença.</h2><p>Revise uma ideia, resolva um desafio e avance seu projeto. Sem perder progresso.</p></div><button className="button-primary" onClick={()=>jump('aula/'+lastId)}>Continuar trilha <ArrowRight size={16}/></button></section><section className="section-block"><div className="section-heading"><div><span className="section-kicker">TRILHAS DE APRENDIZADO</span><h2>Escolha por onde continuar</h2><p>Uma sequência progressiva para desenvolver raciocínio e autonomia.</p></div></div>
      <div className="tracks-grid"><div className="track-card js-track"><div className="track-top"><div className="track-symbol js-track-symbol">JS</div><Pill>TRILHA PRINCIPAL</Pill></div><h3>JavaScript</h3><p>Lógica de programação, algoritmos, DOM, APIs, armazenamento e construção de aplicações completas.</p><div className="track-meta"><span><BookOpen size={14}/> 24 aulas</span><span><Code2 size={14}/> Editor + prévia</span></div><div className="track-bottom"><div className="progress-copy"><span>Seu progresso</span><strong>{jsCount}/24</strong></div><ProgressBar value={jsPercent}/><button onClick={()=>jump('curso/javascript')}>Explorar trilha <ArrowRight size={17}/></button></div></div>
      <div className="track-card ts-track"><div className="track-top"><div className="track-symbol ts-track-symbol">TS</div><Pill variant="soft-blue">ETAPA 2</Pill></div><h3>TypeScript</h3><p>Amplie seus conhecimentos com tipagem, interfaces, funções seguras e modelos de dados para projetos maiores.</p><div className="track-meta"><span><BookOpen size={14}/> 5 aulas</span><span><Code2 size={14}/> Compilação TS</span></div><div className="track-bottom"><div className="progress-copy"><span>Seu progresso</span><strong>{tsCount}/5</strong></div><ProgressBar value={tsPercent}/><button onClick={()=>jump('curso/typescript')}>Explorar trilha <ArrowRight size={17}/></button></div></div></div>
    </section>
    <section className="project-feature"><div className="feature-icon"><FolderKanban size={25}/></div><div><span className="section-kicker">PROJETO INTEGRADOR</span><h3>TaskFlow — seu primeiro produto funcional</h3><p>Construa um gerenciador de tarefas aplicando cada conceito da teoria. Edite HTML, CSS e JavaScript com prévia ao vivo. O código do projeto é compartilhado entre as aulas.</p></div><button className="button-outline" onClick={()=>jump('projeto')}>Conhecer projeto <ArrowRight size={17}/></button></section>
    <footer className="footer-note">DevLab · Projeto de estudo pessoal · Progresso armazenado localmente neste dispositivo.</footer>
  </div>
}

function CoursePage({lang,completed,progress,jump}){
  const units=lang==='ts'?tsUnits:jsUnits;
  const lessons=lang==='ts'?allTsLessons:allJsLessons;
  return <div className="course-page"><button className="back-link" onClick={()=>jump('inicio')}><ArrowLeft size={16}/> Visão geral</button><div className="course-hero"><div className={'course-badge '+(lang==='ts'?'badge-ts':'badge-js')}>{lang==='ts'?'TS':'JS'}</div><div><span className="section-kicker">{lang==='ts'?'TRILHA 02 · PRÓXIMO PASSO':'TRILHA 01 · SUA BASE'}</span><h1>{lang==='ts'?'TypeScript':'JavaScript'}</h1><p>{lang==='ts'?'Adicione tipos à sua base de JavaScript e aprenda a criar sistemas mais seguros e fáceis de manter.':'Do zero à prática: desenvolva lógica, entenda o navegador e construa interfaces reais sem pular fundamentos.'}</p><div className="course-metrics"><span><BookOpen size={16}/>{units.length} unidades</span><span><Code2 size={16}/>{lessons.length} aulas</span><span><Terminal size={16}/> Laboratório integrado</span></div></div></div>
    {lang==='ts'&&<div className="course-hint"><Info size={18}/><span>Recomendação: conclua os fundamentos de JavaScript antes de começar esta trilha. O editor compila o TypeScript para JavaScript dentro da prévia.</span></div>}
    <div className="course-progress"><div className="course-progress-top"><strong>Seu progresso na trilha</strong><span>{completed.filter(id=>lessons.some(l=>l.id===id)).length} de {lessons.length} aulas <strong>{progress}%</strong></span></div><ProgressBar value={progress}/></div>
    <div className="unit-section"><div className="section-heading"><div><span className="section-kicker">CONTEÚDO DO CURSO</span><h2>Unidades e aulas</h2><p>Estude em ordem ou abra diretamente a aula que deseja revisar.</p></div></div><div className="unit-cards">{units.map((unit,index)=>{
      const done=unit.lessons.filter(l=>completed.includes(l.id)).length;
      return <div className="unit-card unit-path-card" key={unit.id}><div className="unit-card-head"><div className="unit-number">{String(index+1).padStart(2,'0')}</div><div><h3>{unit.title.replace(/^\d+\. /,'')}</h3><p>{unit.subtitle}</p></div><span className="unit-meta">{done}/{unit.lessons.length}</span></div><div className="unit-items">{unit.lessons.map((l,i)=><button onClick={()=>jump('aula/'+l.id)} key={l.id} className="unit-item"><span className={'unit-item-icon '+(completed.includes(l.id)?'completed':'')}>{completed.includes(l.id)?<Check size={14}/>:String(i+1).padStart(2,'0')}</span><span><strong>{l.title}</strong><small>{l.summary}</small></span><span className="unit-item-right">{l.minutes} min <ChevronRight size={16}/></span></button>)}</div></div>;
    })}</div></div></div>;
}

function ProjectPage({milestones,onToggle,jump,onOpenEditor}){
  return <div className="project-page"><button className="back-link" onClick={()=>jump('inicio')}><ArrowLeft size={16}/> Visão geral</button><div className="project-hero"><Pill variant="hero-chip"><FolderKanban size={14}/> PROJETO INTEGRADOR</Pill><h1>TaskFlow <span>— seu projeto evolutivo.</span></h1><p>Não é apenas uma série de exercícios isolados. Você tem um produto próprio, que melhora conforme aprende novos conceitos. Todas as aulas compartilham o mesmo código no modo <strong>Projeto guiado</strong>.</p><button className="button-primary" onClick={onOpenEditor}><Code2 size={17}/> Abrir meu código <ArrowRight size={16}/></button></div>
    <div className="project-stats"><Stat icon={ListChecks} value={`${milestones.length}/${allLessons.length}`} label="marcos praticados"/><Stat icon={FileCode2} value="HTML + CSS + JS" label="base do produto"/><Stat icon={Monitor} value="Ao vivo" label="visualização da interface"/></div>
    <div className="project-board"><div className="project-board-title"><span className="section-kicker">ROADMAP DO PRODUTO</span><h2>Implemente passo a passo</h2><p>Marque um marco depois de aplicar o conceito no seu projeto. Os checkboxes são registros manuais, não testes automáticos.</p></div>{jsUnits.map((unit,i)=><div key={unit.id} className="project-unit"><div className="project-unit-head"><span className="project-stage">FASE {String(i+1).padStart(2,'0')}</span><strong>{unit.title.replace(/^\d+\. /,'')}</strong></div><div className="project-todos">{unit.lessons.map(l=><div className="project-todo" key={l.id}><button onClick={()=>onToggle(l.id)} className={'project-check '+(milestones.includes(l.id)?'checked':'')} aria-label={(milestones.includes(l.id)?'Desmarcar':'Marcar')+' marco '+l.title}>{milestones.includes(l.id)&&<Check size={14}/>}</button><div><strong className={milestones.includes(l.id)?'struck':''}>{l.title}</strong><p>{l.project}</p></div><button className="link-open" onClick={()=>jump('aula/'+l.id)} aria-label={'Abrir aula '+l.title}><ArrowRight size={16}/></button></div>)}</div></div>)}
      <div className="project-unit"><div className="project-unit-head"><span className="project-stage ts-stage">PRÓXIMA FASE</span><strong>Reescrever e melhorar com TypeScript</strong></div><p className="stage-desc">Depois de consolidar JavaScript, modele as tarefas com interfaces, tipifique funções e prepare o projeto para crescer.</p><button className="button-outline" onClick={()=>jump('curso/typescript')}>Ir para TypeScript <ArrowRight size={16}/></button></div>
    </div></div>
}

function LessonPage({lesson,completed,toggleDone,milestones,toggleMile,jump,exerciseDrafts,setExerciseDrafts,verifiedDrafts,setVerifiedDrafts,jsProject,setJsProject,tsProject,setTsProject,quizPassed,setQuizPassed,practicePassed,setPracticePassed,recordActivity}){
  const [mode,setMode]=useState('exercise');
  const [stage,setStage]=useState(()=>practicePassed.includes(lesson.id)?'build':quizPassed.includes(lesson.id)?'practice':'learn');
  const [answer,setAnswer]=useState(null);
  const [showHints,setShowHints]=useState(false);
  const [checkResult,setCheckResult]=useState(null);
  const pendingCheckRef=useRef(null);
  const checkNonceRef=useRef(0);
  const question=checkpoints[lesson.id];
  const quizOk=quizPassed.includes(lesson.id);
  const practiceOk=practicePassed.includes(lesson.id);
  const [tab,setTab]=useState('js');
  const [consoleOpen,setConsoleOpen]=useState(false);
  const [consoleLines,setConsoleLines]=useState([]);
  const [device,setDevice]=useState('desktop');
  const [runNo,setRunNo]=useState(0);
  const [iframeDoc,setIframeDoc]=useState('');
  const [running,setRunning]=useState(false);
  const [toast,setToast]=useState('');
  const iframeRef=useRef(null);
  const tokenRef=useRef('');
  const runIdRef=useRef(0);
  const isTs=lesson.language==='ts';
  const lessonStarter=useMemo(()=>isTs?{html:lesson.starter.html,css:lesson.starter.css,ts:lesson.starter.js}:{html:lesson.starter.html,css:lesson.starter.css,js:lesson.starter.js},[lesson,isTs]);
  const source=mode==='exercise'?(exerciseDrafts[lesson.id]||lessonStarter):(isTs?tsProject:jsProject);
  const availableTabs=[{id:'html',title:'index.html',language:'html'},{id:'css',title:'style.css',language:'css'},{id:isTs?'ts':'js',title:isTs?'app.ts':'script.js',language:isTs?'typescript':'javascript'}];
  const currentTab=availableTabs.find(t=>t.id===tab) || availableTabs[2];
  const sourceFile=source[currentTab.id] ?? '';
  const index=allLessons.findIndex(l=>l.id===lesson.id);
  const prev=allLessons[index-1] || null;
  const next=allLessons[index+1] || null;
  const isDone=completed.includes(lesson.id);
  const isMilestoneDone=milestones.includes(lesson.id);
  const bucket=STORAGE+'preview-storage:'+(mode==='project'?(isTs?'project-ts':'project-js'):'lesson-'+lesson.id);

  const alertToast=msg=>{setToast(msg);window.setTimeout(()=>setToast(''),2600);};
  const finishCheck=useCallback((inspection)=>{
    setCheckResult(inspection);
    if(!inspection.passed)return;
    if(runtimeCheckedLessons.has(lesson.id))setVerifiedDrafts(prev=>({...prev,[lesson.id]:JSON.stringify(source)}));
    setPracticePassed(prev=>prev.includes(lesson.id)?prev:[...prev,lesson.id]);
    setCompleted(prev=>prev.includes(lesson.id)?prev:[...prev,lesson.id]);
    recordActivity();setStage(inspection.mode==='behavior'?'practice':'build');alertToast('Desafio concluído! +30 XP');
  },[lesson.id,source,setVerifiedDrafts,setPracticePassed,setCompleted,recordActivity]);
  const verifyExercise=()=>{
    if(mode!=='exercise'){alertToast('Selecione o exercício da aula.');return;}
    const inspection=inspectExercise(lesson,source);
    if(consoleLines.some(x=>x.level==='error'))inspection.checks.push({label:'Resolva os erros do console.',ok:false});
    if(!quizOk)inspection.checks.push({label:'Responda ao quiz em Aprender.',ok:false});
    inspection.passed=inspection.checks.every(x=>x.ok);
    if(!inspection.passed){setCheckResult(inspection);return;}
    if(runtimeCheckedLessons.has(lesson.id)){
      if(pendingCheckRef.current)return;
      const nonce=++checkNonceRef.current,token=tokenRef.current;
      const pending={id:lesson.id,inspection,nonce,token,timer:null};
      pendingCheckRef.current=pending;
      pending.timer=window.setTimeout(()=>{
        if(pendingCheckRef.current!==pending)return;
        pendingCheckRef.current=null;
        const checks=[...inspection.checks,{label:'O avaliador não respondeu; execute a prévia novamente.',ok:false}];
        finishCheck({checks,passed:false});
      },3000);
      iframeRef.current?.contentWindow?.postMessage({__devlab_check:true,id:lesson.id,nonce,token},'*');
    }else finishCheck(inspection);
  };
  const chooseAnswer=(n)=>{
    setAnswer(n);
    if(n===question.answer && !quizOk){setQuizPassed(prev=>[...prev,lesson.id]);recordActivity();}
  };
  const editSource=useCallback((value)=>{
    if(pendingCheckRef.current){window.clearTimeout(pendingCheckRef.current.timer);pendingCheckRef.current=null;}
    setCheckResult(null);
    const key=isTs && tab==='js'?'ts':tab;
    if(mode==='exercise') {
      const updated={...source,[key]:value??''};
      if(verifiedDrafts[lesson.id] && verifiedDrafts[lesson.id]!==JSON.stringify(updated)){
        setVerifiedDrafts(prev=>{const next={...prev};delete next[lesson.id];return next;});
        setPracticePassed(prev=>prev.filter(id=>id!==lesson.id));
      }
      setExerciseDrafts(prev=>({...prev,[lesson.id]:{...(prev[lesson.id]||lessonStarter),[key]:value??''}}));
    }
    else if(isTs) setTsProject(prev=>({...prev,[key]:value??''}));
    else setJsProject(prev=>({...prev,[key]:value??''}));
  },[mode,tab,isTs,lesson.id,lessonStarter,source,verifiedDrafts,setExerciseDrafts,setVerifiedDrafts,setPracticePassed,setTsProject,setJsProject]);

  useEffect(()=>{setTab(isTs?'ts':'js');setMode('exercise');setConsoleLines([]);},[lesson.id,isTs]);

  useEffect(()=>{
    let obsolete=false;
    const timer=window.setTimeout(async()=>{
      setRunning(true);
      const token='run-'+(++runIdRef.current);
      tokenRef.current=token;
      setConsoleLines([]);
      try {
        let js=source.js || '';
        if(isTs){
          const tsModule=await import('typescript');
          const ts=tsModule.default||tsModule;
          const out=ts.transpileModule(source.ts||'',{fileName:'app.ts',reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.None,strict:true}});
          if(obsolete) return;
          const errors=(out.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error);
          if(errors.length){setConsoleLines(errors.map(d=>({level:'error',args:[ts.flattenDiagnosticMessageText(d.messageText,' ')]})));}
          js=out.outputText;
        }
        if(obsolete) return;
        setIframeDoc(buildPreview({html:source.html||'',css:source.css||'',js,token,stored:loadStorageBucket(bucket)}));
      }catch(error){if(!obsolete)setConsoleLines([{level:'error',args:[`Falha ao compilar: ${error.message}`]}]);}
      finally {if(!obsolete)setRunning(false);}
    },runNo?100:650);
    return()=>{obsolete=true;window.clearTimeout(timer);};
  },[source.html,source.css,source.js,source.ts,isTs,bucket,runNo]);

  useEffect(()=>{
    const onMessage=event=>{
      if(event.source!==iframeRef.current?.contentWindow) return;
      const d=event.data;
      if(!d || d.__devlab!==true || d.token!==tokenRef.current) return;
      if(d.kind==='log') setConsoleLines(prev=>[...prev.slice(-99),d.payload]);
      if(d.kind==='storage'){try { localStorage.setItem(bucket,JSON.stringify(d.payload)); } catch {/* limite armazenamento */}}
      if(d.kind==='check-result'){
        const pending=pendingCheckRef.current;
        if(!pending||pending.id!==d.payload?.id||pending.nonce!==d.payload?.nonce||pending.token!==d.token)return;
        window.clearTimeout(pending.timer);pendingCheckRef.current=null;
        const cases=Array.isArray(d.payload?.checks)?d.payload.checks:[];
        const checks=[...pending.inspection.checks,...cases.map(c=>({label:String(c.label||'Teste sem descrição'),ok:c.ok===true}))];
        if(!cases.length)checks.push({label:'Nenhum teste retornado.',ok:false});
        finishCheck({checks,passed:checks.every(x=>x.ok)});
      }
    };
    window.addEventListener('message',onMessage);
    return()=>window.removeEventListener('message',onMessage);
  },[bucket,finishCheck]);

  const reset=()=>{
    if(!window.confirm('Restaurar os arquivos originais deste '+(mode==='exercise'?'exercício':'projeto')+'? Suas alterações nesse espaço serão perdidas.')) return;
    if(mode==='exercise') {
      setExerciseDrafts(prev=>{const next={...prev};delete next[lesson.id];return next;});
      if(verifiedDrafts[lesson.id]){
        setVerifiedDrafts(prev=>{const next={...prev};delete next[lesson.id];return next;});
        setPracticePassed(prev=>prev.filter(id=>id!==lesson.id));
      }
    }
    else if(isTs) setTsProject(typescriptProjectStarter);
    else setJsProject(projectStarter);
    alertToast('Código restaurado.');
  };
  const exportCode=()=>{
    const js=isTs?(source.ts||''):(source.js||'');
    const name=mode==='project'?'taskflow':lesson.id;
    if(isTs){
      download(name+'-app.ts',js,'text/plain');
      alertToast('Arquivo .ts exportado.');
    } else {
      download(name+'.html',makeExportHtml({html:source.html||'',css:source.css||'',js}));
      alertToast('HTML exportado com CSS e JS.');
    }
  };
  const copyCode=async()=>{try{await navigator.clipboard.writeText(sourceFile);alertToast('Código copiado.');}catch{alertToast('Não foi possível copiar.');}};
  const setEditorTab=(next)=>setTab(next);
  const switchMode=(next)=>{setMode(next);setConsoleLines([]);};

  return <div className="lesson-page"><div className="lesson-topline"><button className="back-link" onClick={()=>jump('curso/'+(isTs?'typescript':'javascript'))}><ArrowLeft size={15}/> {isTs?'TypeScript':'JavaScript'}</button><span className="lesson-counter">AULA {String(lesson.lessonIndex+1).padStart(2,'0')} · {lesson.minutes} MIN DE TEORIA</span></div>
    <div className="lesson-heading"><div><span className="section-kicker">{lesson.unitTitle.toUpperCase()}</span><h1>{lesson.title}</h1><p>{lesson.summary}</p></div><span className={'complete-button '+(isDone?'is-complete':'')}>{isDone?<CheckCircle2 size={18}/>:<Circle size={18}/>} {isDone?'Aula concluída':'Conclua a prática para avançar'}</span></div>
    <div className="lesson-stage"><div className="stage-heading"><span className="section-kicker">SUA JORNADA NESTA AULA</span><span>{[quizOk,practiceOk,isMilestoneDone].filter(Boolean).length}/3 etapas</span></div><div className="stage-track">{[['learn','Aprender',quizOk],['practice','Praticar',practiceOk],['build','Construir',isMilestoneDone]].map(([key,label,done],i)=><React.Fragment key={key}>{i>0&&<span className="stage-join"/>}<button className={'stage-btn '+(stage===key?'active ':'')+(done?'finished':'')} onClick={()=>setStage(key)} aria-current={stage===key?'step':undefined}><span className="stage-no">{done?'✓':i+1}</span><span>{'0'+(i+1)} · {label}</span></button></React.Fragment>)}</div></div>
    <div className="lesson-layout"><section className="theory-pane">{stage==='learn'&&<><div className="lesson-card"><div className="card-kicker"><BookOpen size={17}/> ENTENDA O CONCEITO</div><h2>Teoria essencial</h2>{lesson.theory.map((p,i)=><p key={i}>{p}</p>)}<div className="concept-list"><strong>O que você precisa dominar</strong><div>{lesson.concepts.map(c=><span key={c}>{c}</span>)}</div></div></div>
      <div className="lesson-card code-example"><div className="card-kicker"><Code2 size={17}/> EXEMPLO EXPLICADO</div><div className="sample-code"><div className="sample-top"><span>exemplo.{isTs?'ts':'js'}</span><button onClick={()=>{navigator.clipboard?.writeText(lesson.example).then(()=>alertToast('Exemplo copiado.')).catch(()=>alertToast('Não foi possível copiar.'));}} aria-label="Copiar exemplo"><Copy size={14}/></button></div><pre><code>{lesson.example}</code></pre></div><p className="hint-note">Leia cada linha, tente prever a saída e depois altere os valores no editor.</p></div>
      </>}{stage==='practice'&&<><div className="lesson-card challenge-card"><div className="card-kicker mint"><Lightbulb size={17}/> AGORA É SUA VEZ</div><h2>Desafio prático</h2><p>{lesson.challenge}</p><button className="hint-trigger" onClick={()=>setShowHints(v=>!v)}>{showHints?'Ocultar dicas −':'Precisa de uma dica? +'}</button>{showHints&&<ol>{lesson.steps.map((s,i)=><li key={i}>{s}</li>)}</ol>}<button className="challenge-cta" onClick={()=>switchMode('exercise')}><Terminal size={16}/> Abrir exercício no editor <ArrowDownRight size={16}/></button></div>
      <div className="validation-box" aria-live="polite"><div className="validation-top"><span>⌘ Verificação de exercício</span><span className="validation-tag">+30 XP</span></div><p>{runtimeCheckedLessons.has(lesson.id)?'A verificação executa testes de comportamento real no navegador, com entradas variadas.':'Esta aula usa uma verificação orientativa por estrutura; experimente também as missões da Oficina.'}</p><button className="check-button" onClick={verifyExercise}>✓ Verificar solução</button>{checkResult&&<div className={'validation-result '+(checkResult.passed?'pass':'fail')}><strong>{checkResult.passed?`Aprovado: ${checkResult.checks.filter(c=>c.ok).length} verificações concluídas.`:'Revise estes pontos:'}</strong>{checkResult.checks.map((c,i)=><div className="validation-row" key={i}>{c.ok?'✓':'○'} <span>{c.label}</span></div>)}{checkResult.passed&&<button className="challenge-cta" onClick={()=>setStage('build')}>Aplicar no projeto TaskFlow →</button>}</div>}{practiceOk&&!checkResult&&<div className="validation-result pass">✓ Exercício já verificado.</div>}</div></>}{stage==='build'&&<div className="lesson-card project-task"><div className="card-kicker purple"><FolderKanban size={17}/> APLIQUE NO SEU PROJETO</div><h2>Marco do TaskFlow</h2><p>{lesson.project}</p><div className="project-lesson-actions"><button className="project-apply" onClick={()=>switchMode('project')}><Code2 size={16}/> Abrir código compartilhado</button><button className={'milestone-button '+(isMilestoneDone?'done':'')} onClick={()=>toggleMile(lesson.id)}>{isMilestoneDone?<CheckCircle2 size={16}/>:<Circle size={16}/>} {isMilestoneDone?'Marco feito':'Marcar marco'}</button></div><p className="mini-help">Seu projeto é salvo separadamente dos exercícios.</p></div>
      }{stage==='learn'&&<div className="lesson-card quiz-card"><div className="card-kicker">◈ VERIFIQUE O QUE APRENDEU</div><div className="quiz-progress">PERGUNTA 1 DE 1 <span>+10 XP</span></div><h2>{question.prompt}</h2><div className="quiz-choices">{question.choices.map((c,i)=><button key={i} className={'quiz-choice '+(quizOk&&i===question.answer?'correct ':'')+(answer===i&&!quizOk?'incorrect':'')} disabled={quizOk} onClick={()=>chooseAnswer(i)}><span className="choice-letter">{'ABC'[i]}</span>{c}<span className="choice-state">{quizOk&&i===question.answer?'✓':answer===i&&!quizOk?'×':''}</span></button>)}</div>{quizOk?<div className="feedback success"><strong>✓ Excelente! Resposta correta.</strong><p>{question.explanation}</p><button onClick={()=>setStage('practice')}>Ir para o exercício <ArrowRight size={14}/></button></div>:answer!==null?<div className="feedback issue" role="status"><strong>Essa ainda não é a resposta.</strong><p>Releia o exemplo e tente outra alternativa.</p></div>:<p className="quiz-foot">Escolha uma resposta para receber feedback imediato.</p>}</div>}
      <div className="lesson-nav">{prev&&<button onClick={()=>jump('aula/'+prev.id)}><ArrowLeft size={16}/><span><small>AULA ANTERIOR</small>{prev.title}</span></button>}{next&&<button onClick={()=>jump('aula/'+next.id)} className="next-lesson"><span><small>PRÓXIMA AULA</small>{next.title}</span><ArrowRight size={16}/></button>}</div>
    </section>
    <section className="lab-pane" aria-label="Ambiente de prática"><div className="lab-head"><div><span className="lab-live"><span/> LABORATÓRIO INTERATIVO</span><h2>Seu ambiente de desenvolvimento</h2><p>Edite o código e veja o resultado ao lado, sem instalar nada.</p></div></div><div className="mode-switch" role="group" aria-label="Selecionar espaço de trabalho"><button className={mode==='exercise'?'active':''} onClick={()=>switchMode('exercise')}><Terminal size={16}/> Exercício da aula</button><button className={mode==='project'?'active':''} onClick={()=>switchMode('project')}><FolderKanban size={16}/> Projeto guiado</button></div>
      <div className="workspace"><div className="workspace-bar"><span className="workspace-title"><span className="workspace-status"/> {mode==='exercise'?'EXERCÍCIO • '+lesson.title:'TASKFLOW • PROJETO COMPARTILHADO'}</span><span className="workspace-autosave"><Check size={12}/> Salvo automaticamente</span></div><div className="editor-tabs">{availableTabs.map(t=><button className={'file-tab '+(currentTab.id===t.id?'tab-active':'')} key={t.id} onClick={()=>setEditorTab(t.id)}><span className={'file-icon '+t.id}>{t.id==='html'?'◇':t.id==='css'?'#':isTs?'TS':'JS'}</span>{t.title}</button>)}<div className="tab-spacer"/><button className="tab-tool" title="Copiar arquivo" aria-label="Copiar código da aba" onClick={copyCode}><Copy size={15}/></button></div>
      <div className="editor-area"><Editor height="100%" theme="devlab-dark" language={currentTab.language} path={`${mode}-${lesson.id}-${currentTab.title}`} value={sourceFile} onChange={editSource} options={{fontSize:13,fontFamily:'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',fontLigatures:true,minimap:{enabled:false},scrollBeyondLastLine:false,automaticLayout:true,lineNumbers:'on',wordWrap:'on',padding:{top:15,bottom:12},tabSize:2,formatOnPaste:true,renderWhitespace:'selection'}} loading={<div className="editor-loading">Carregando editor...</div>} /></div>
      <div className="editor-actions"><span><span className="shortcut-dot"/> {isTs?'TypeScript compilado para JavaScript':'Prévia atualizada ao editar'}</span><div><button className="action-secondary" onClick={reset} title="Restaurar arquivos"><RotateCcw size={15}/> Restaurar</button><button className="action-secondary" onClick={exportCode} title="Exportar código"><Download size={15}/> Exportar</button><button className="run-button" onClick={()=>setRunNo(v=>v+1)}><Play size={15} fill="currentColor"/> Executar</button></div></div></div>
      <div className="preview-wrap"><div className="preview-head"><div className="preview-heading"><Monitor size={16}/><strong>Pré-visualização</strong>{running&&<span className="compiling">Compilando...</span>}</div><div className="preview-actions"><button title="Visualização desktop" aria-label="Visualização desktop" className={device==='desktop'?'device-active':''} onClick={()=>setDevice('desktop')}><Monitor size={16}/></button><button title="Visualização celular" aria-label="Visualização celular" className={device==='mobile'?'device-active':''} onClick={()=>setDevice('mobile')}><Smartphone size={16}/></button><span className="preview-separator"/><button title="Atualizar prévia" aria-label="Atualizar prévia" onClick={()=>setRunNo(v=>v+1)}><RotateCcw size={15}/></button></div></div><div className={'preview-surface '+(device==='mobile'?'mobile-surface':'')}><iframe title="Página de prévia isolada" ref={iframeRef} srcDoc={iframeDoc} sandbox="allow-scripts" className={device==='mobile'?'frame-mobile':''}/></div><div className="preview-foot"><span><span className="preview-status"/> Página em execução isolada</span><span>{device==='mobile'?'Largura simulada: 375px':'Largura responsiva'}</span></div></div>
      <div className="console-panel"><button className="console-toggle" onClick={()=>setConsoleOpen(!consoleOpen)} aria-expanded={consoleOpen}><span><Terminal size={16}/> Console <span className="console-count">{consoleLines.length}</span></span>{consoleOpen?<ChevronDown size={16}/>:<ChevronRight size={16}/>}</button>{consoleOpen&&<div className="console-output">{consoleLines.length===0?<span className="console-empty">Sem mensagens. Experimente console.log('Olá mundo!') no código.</span>:consoleLines.map((entry,i)=><div key={i} className={'console-line console-'+entry.level}><span>{entry.level==='error'?'✕':entry.level==='warn'?'!':'›'}</span><code>{entry.args?.join(' ')}</code></div>)}<button className="clear-console" onClick={()=>setConsoleLines([])}>Limpar console</button></div>}</div>
      <div className="lab-tip"><Info size={17}/><p><strong>Dica:</strong> comece alterando uma linha por vez. Os arquivos do <strong>exercício</strong> são independentes; o <strong>projeto guiado</strong> mantém o mesmo código entre as aulas. Progresso e código ficam neste navegador, sem conta ou servidor.</p></div>
    </section></div>{toast&&<div role="status" className="toast"><CheckCircle2 size={16}/>{toast}</div>}</div>;
}
