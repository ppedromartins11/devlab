/** Recursos pedagógicos originais: revisão espaçada e desafios de produto. */
export const REVIEW_INTERVALS = [1, 3, 7, 14, 30];

export function addDaysLocal(dateString, days) {
  const [year, month, day] = String(dateString).split('-').map(Number);
  if (![year,month,day].every(Number.isInteger)) throw new Error('Data inválida');
  const date = new Date(year, month - 1, day + days, 12);
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

export function enrollReview(reviews, id, today) {
  if (reviews[id]) return reviews;
  return { ...reviews, [id]: {due: addDaysLocal(today, 1), level: 0, attempts: 0} };
}

export function rateReview(reviews, id, rating, today) {
  const current = reviews[id];
  if (!current || !['again','good','easy'].includes(rating)) return reviews;
  const nextLevel = rating === 'again' ? 0 : Math.min(REVIEW_INTERVALS.length - 1, current.level + (rating === 'easy' ? 2 : 1));
  const days = rating === 'again' ? 1 : REVIEW_INTERVALS[nextLevel];
  return {...reviews, [id]: {due: addDaysLocal(today,days),level:nextLevel,attempts:(current.attempts||0)+1,last:today}};
}

export function reviewQueue(reviews, lessons, today, includeFuture=false) {
  const ids = new Map(lessons.map(l => [l.id,l]));
  return Object.entries(reviews)
    .filter(([id,r])=> ids.has(id) && r && typeof r.due==='string' && (includeFuture || r.due<=today))
    .map(([id,r])=>({...r,id,lesson:ids.get(id)}))
    .sort((a,b)=>a.due.localeCompare(b.due) || a.lesson.lessonIndex-b.lesson.lessonIndex);
}

/** Cada briefing é novo e não reproduz enunciados de outras plataformas. */
export const practiceBriefs = [
 {
  id:'conversor',category:'Lógica e DOM',level:'Iniciante',minutes:35,lesson:'funcoes',title:'Conversor de temperatura',
  description:'Crie uma pequena ferramenta para converter Celsius em Fahrenheit, mostrando resultados e erros de entrada.',
  objective:'Praticar eventos, validação, operações e funções independentes.',
  checks:['A conversão funciona com valores positivos, negativos e zero.','O resultado aparece após clicar em Converter.','Uma entrada vazia ou inválida exibe mensagem clara.','O formulário pode ser usado somente com teclado.'],
  html:'<main class="app"><h1>Conversor de temperatura</h1><p>Celsius → Fahrenheit</p><label for="celsius">Temperatura (°C)</label><input id="celsius" type="number" step="any" placeholder="Ex.: 25"><button id="convert">Converter</button><p id="result" role="status">Aguardando um valor.</p></main>',
  css:'body{font-family:system-ui;background:#f4f7f6;color:#172e28;margin:0;padding:30px}.app{max-width:420px;margin:auto;background:white;padding:24px;border:1px solid #dbe6df;border-radius:12px}input,button{display:block;width:100%;box-sizing:border-box;margin:12px 0;padding:12px;border-radius:6px}button{background:#1d654d;color:white;border:0;cursor:pointer}',
  js:"// TODO: leia o campo, valide e converta.\n// Fórmula: Fahrenheit = Celsius * 9 / 5 + 32.\nconst input = document.querySelector('#celsius');\nconst result = document.querySelector('#result');\n\n// 1. Crie uma função converter(celsius).\n// 2. Adicione o listener no botão #convert.\n// 3. Mostre o resultado em #result."
 },
 {
  id:'habitos',category:'Arrays e persistência',level:'Intermediário',minutes:60,lesson:'storage',title:'Rastreador de hábitos',
  description:'Desenvolva um painel simples para cadastrar hábitos, marcá-los como realizados e guardar o estado no navegador.',
  objective:'Aplicar arrays de objetos, renderização, eventos e armazenamento local.',
  checks:['Novos hábitos aparecem na lista sem recarregar.','É possível marcar e desmarcar um hábito.','O progresso sobrevive a uma recarga do navegador.','Habitualmente não são criados itens vazios ou duplicados.'],
  html:'<main class="app"><h1>Hábitos da semana</h1><form id="habit-form"><label for="habit">Novo hábito</label><input id="habit" placeholder="Ex.: Ler 20 minutos"><button>Adicionar</button></form><p id="status" role="status">Comece adicionando um hábito.</p><ul id="habits"></ul></main>',
  css:'body{font:16px system-ui;margin:0;background:#f3f6f4;color:#1d332a;padding:30px}.app{max-width:560px;margin:auto;background:#fff;padding:24px;border-radius:12px}form{display:flex;gap:8px;flex-wrap:wrap}label{width:100%}input{flex:1;padding:10px}button{padding:10px 14px;background:#18614b;color:#fff;border:0;border-radius:5px}li{padding:10px 0;border-bottom:1px solid #ddd}',
  js:"// TODO: construa o rastreador com dados salvos.\nconst form = document.querySelector('#habit-form');\nconst field = document.querySelector('#habit');\nconst list = document.querySelector('#habits');\nlet habits = [];\n\n// 1. Crie uma função renderizarHabitos().\n// 2. Capture o submit e adicione um objeto.\n// 3. Implemente marcação e localStorage."
 },
 {
  id:'quiz',category:'Objetos e interface',level:'Intermediário',minutes:75,lesson:'renderizacao',title:'Quiz de JavaScript',
  description:'Monte uma aplicação que apresenta perguntas, registra respostas e calcula a pontuação final.',
  objective:'Treinar estruturas de dados, condições, funções, estado e renderização.',
  checks:['Uma pergunta é exibida por vez.','O botão avança e registra a resposta escolhida.','O resultado final corresponde aos acertos reais.','O usuário consegue reiniciar e repetir o teste.'],
  html:'<main class="app"><p id="progress">Pergunta 1</p><h1 id="question">Seu quiz de JavaScript</h1><div id="options"></div><p id="feedback" role="status"></p><button id="next">Avançar</button></main>',
  css:'body{font:16px system-ui;margin:0;background:#f3f5f8;padding:30px;color:#1e2937}.app{max-width:550px;margin:auto;padding:26px;border-radius:10px;background:#fff}button{display:block;width:100%;margin:10px 0;padding:12px;text-align:left;background:#e9edf0;border:1px solid #cad4dd;border-radius:7px;cursor:pointer}button:focus-visible{outline:3px solid #286f54}',
  js:"// TODO: transforme o objeto abaixo em um quiz interativo.\nconst questions = [\n  {text:'Qual valor é booleano?', options:['42','true','olá'], answer:1},\n  {text:'Qual método adiciona um item ao array?',options:['push','trim','map'],answer:0}\n];\nlet current = 0;\nlet score = 0;\n\n// 1. Escreva renderizarPergunta().\n// 2. Registre a opção e avance.\n// 3. Mostre o resultado e permita reiniciar."
 }
];
export const findBrief = id => practiceBriefs.find(p=>p.id===id);
export function checklistProgress(checklist=[],count=0) {
 const unique = new Set(checklist.filter(x=>Number.isInteger(x) && x>=0 && x<count));
 return {done:unique.size,total:count,percentage:count?Math.round(unique.size/count*100):0};
}
