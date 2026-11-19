/** Checkpoints autorais do DevLab. Validação orientativa, nunca substitui testes reais. */
const questions = [
 ['primeiros-passos','Qual tecnologia reage a cliques e altera elementos da página?',['CSS','JavaScript','HTML'],1,'HTML estrutura, CSS apresenta e JavaScript implementa comportamento.','addEventListener'],
 ['variaveis','Qual declaração permite reatribuir o valor de uma variável?',['let','const','import'],0,'Use let quando o valor precisa mudar; prefira const nos demais casos.','textContent'],
 ['operadores','Qual é o valor de 3 / 8 * 100?',['37,5','26,6','62,5'],0,'Divida a parte pelo total e depois multiplique por 100.','/'],
 ['debug-console','Qual ferramenta mostra mensagens durante a execução?',['console.log','querySelector','localStorage'],0,'O console ajuda a observar valores e identificar bugs.','* 2'],
 ['condicionais','Qual instrução executa um bloco somente se a condição for verdadeira?',['for','if','return'],1,'if testa condições; else cobre os outros casos.','if'],
 ['switch','Quando usar switch?',['Ao repetir uma ação','Ao escolher entre vários valores de um estado','Ao selecionar HTML'],1,'switch é útil quando você compara uma expressão com diversos casos.','switch'],
 ['loops','Como repetir código um número definido de vezes?',['for','const','throw'],0,'O laço for mantém inicialização, condição e atualização.','for'],
 ['funcoes','Como uma função devolve um resultado?',['console.log','return','import'],1,'return envia o resultado para quem chamou a função.','return'],
 ['arrays','Qual método adiciona um item ao final de um array?',['push','filter','slice'],0,'push modifica o array adicionando o item.','push'],
 ['objetos','Como acessar a propriedade titulo de uma tarefa?',['tarefa.titulo','tarefa->titulo','tarefa(titulo)'],0,'A notação de ponto acessa propriedades de objetos.','titulo'],
 ['metodos-array','Qual método cria um novo array apenas com os itens que passam no teste?',['filter','find','reduce'],0,'filter mantém somente os elementos que atendem ao predicado.','filter'],
 ['strings-numeros','Qual método remove espaços no início e fim do texto?',['trim','split','push'],0,'trim é ideal para normalizar campos de formulário.','trim'],
 ['dom-basico','Qual propriedade altera somente o conteúdo textual de um elemento?',['innerHTML','textContent','styleSheets'],1,'textContent não interpreta HTML e é mais seguro para texto simples.','classList'],
 ['eventos','Qual evento acompanha a digitação em um campo?',['input','load','submit'],0,'input é disparado quando o valor digitado muda.','input'],
 ['formularios','Como impedir o recarregamento automático ao enviar um formulário?',['event.preventDefault()','event.stop()','return null'],0,'O método preventDefault impede a ação padrão do navegador.','preventDefault'],
 ['renderizacao','Qual é a sequência correta numa interface reativa?',['Tela → evento → estado','Evento → estado → renderização','Estado → CSS → API'],1,'Primeiro o evento atualiza os dados; depois você renderiza a tela.','render'],
 ['assincrono','Qual palavra-chave aguarda a resolução de uma Promise?',['await','for','yield'],0,'await pausa a execução daquela função async até a Promise terminar.','await'],
 ['api-json','Como converter uma string JSON em objetos JavaScript?',['JSON.stringify','JSON.parse','String.from'],1,'JSON.parse transforma texto JSON válido em dados JavaScript.','JSON.parse'],
 ['storage','Onde guardar pequenos dados do navegador entre recargas?',['session.log','localStorage','document.title'],1,'localStorage guarda strings no navegador; evite colocar segredos nele.','setItem'],
 ['acessibilidade','Qual elemento associa um nome acessível a um campo?',['label','span','div'],0,'Use um label associado ao id do input.','aria-live'],
 ['arquitetura','Por que separar validação, criação e renderização em funções?',['Para esconder a lógica','Para facilitar manutenção e testes','Para evitar parâmetros'],1,'Funções com responsabilidade clara são mais fáceis de testar e reutilizar.','function'],
 ['testes','O que significa um teste falhar?',['O código sempre travou','O resultado obtido não correspondeu ao esperado','O código tem comentários'],1,'Um teste compara comportamento real com uma expectativa verificável.','return'],
 ['projeto-integrador','O que caracteriza um projeto completo de estudo?',['Só uma tela bonita','Fluxos funcionais e conceitos aplicados','Muitos arquivos sem interação'],1,'Seu projeto deve demonstrar funcionalidades, validações e estado.','projeto'],
 ['proximos-passos','Qual arquivo explica como executar e utilizar um projeto?',['README.md','favicon.ico','package-lock.json'],0,'Um README organiza objetivo, instalação, recursos e melhorias.','README'],
 ['ts-intro','O que TypeScript acrescenta ao JavaScript?',['Tipos estáticos','Um novo navegador','HTML automático'],0,'TypeScript verifica tipos e é compilado para JavaScript.','number'],
 ['ts-tipos','Qual tipo representa uma lista de números?',['number[]','string','number?'],0,'number[] é um array de números.','number[]'],
 ['ts-interfaces','Qual recurso define o formato de um objeto em TypeScript?',['interface','await','console'],0,'Interfaces descrevem propriedades e seus respectivos tipos.','interface'],
 ['ts-funcoes','Como especificar o tipo de retorno de uma função TS?',['Depois dos parâmetros, com : tipo','Usando somente const','Usando HTML'],0,'Ex.: function soma(a: number): number { ... }.','number'],
 ['ts-generics','O que um tipo genérico <T> oferece?',['Tipos reutilizáveis sem perder informação','Execução mais rápida','Dados globais'],0,'Generics permitem escrever funções reutilizáveis mantendo tipos específicos.','<T>']
];
const criteria = {
 'primeiros-passos': /addEventListener|onclick/,
 'variaveis': /textContent|console\.log/,
 'operadores': /\/\s*(?:total|8)|\/\s*8/,
 'debug-console': /\*\s*2/,
 'condicionais': /\bif\s*\(/,
 'switch': /\bswitch\s*\(/,
 'loops': /\bfor\s*\(/,
 'funcoes': /\breturn\b/,
 'arrays': /\.push\s*\(/,
 'objetos': /\btitulo\s*:/,
 'metodos-array': /\.filter\s*\(/,
 'strings-numeros': /\.trim\s*\(/,
 'dom-basico': /\.classList\./,
 'eventos': /addEventListener\s*\(\s*['"]input/,
 'formularios': /preventDefault\s*\(/,
 'renderizacao': /function\s+render|const\s+render/,
 'assincrono': /\bawait\b/,
 'api-json': /JSON\.parse\s*\(/,
 'storage': /localStorage\.setItem\s*\(/,
 'acessibilidade': /aria-live|setAttribute\s*\(\s*['"]aria/,
 'arquitetura': /function\s+\w+|=>/,
 'testes': /console\.assert|throw\s+new\s+Error/,
 'projeto-integrador': /addEventListener|querySelector/,
 'proximos-passos': /README|Git|publica/i,
 'ts-intro': /:\s*(?:number|string|boolean)/,
 'ts-tipos': /:\s*number\[\]/,
 'ts-interfaces': /\binterface\s+\w+/,
 'ts-funcoes': /\):\s*number/,
 'ts-generics': /<T>/
};
export const checkpoints = Object.fromEntries(questions.map(([id,prompt,choices,answer,explanation,focus])=>[id,{id,prompt,choices,answer,explanation,focus}]));
function normalized(value) {return String(value||'').replace(/\/\/[^\n]*/g,'').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,'').trim();}
export function inspectExercise(lesson, source) {
 const key=lesson.language==='ts'?'ts':'js';
 const before=lesson.starter.js || '';
 const after=source?.[key]||'';
 const checks=[
  {label:'Você alterou o código inicial para resolver o desafio.',ok:normalized(after)!==normalized(before)},
  {label:`O código inclui o conceito esperado: ${checkpoints[lesson.id]?.focus||'JavaScript'}.`,ok:criteria[lesson.id]?.test(after)||false},
  {label:'O exercício contém código, não apenas comentários.',ok:normalized(after).length>=12}
 ];
 return {passed:checks.every(x=>x.ok),checks};
}
export function localDateKey(date=new Date()) {
 return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
}
export function streakDays(days, now=new Date()) {
 const set=new Set(days);
 let day=new Date(now.getFullYear(),now.getMonth(),now.getDate());
 if(!set.has(localDateKey(day))) day.setDate(day.getDate()-1);
 let total=0;
 while(set.has(localDateKey(day))){total++;day.setDate(day.getDate()-1);}
 return total;
}
export function experiencePoints(quizPassed, exercisePassed, milestones) {
 return new Set(quizPassed).size*10+new Set(exercisePassed).size*30+new Set(milestones).size*15;
}
