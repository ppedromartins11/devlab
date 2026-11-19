/** Contratos autorais com casos de entrada independentes do código do aluno.
 * Os casos ficam no cliente: são testes de aprendizagem, não uma prova antifraude.
 * Para provas de DOM, permanece o avaliador da prévia. */
const task=(titulo,concluida=false,prioridade='normal')=>({titulo,concluida,prioridade});
const test=(label,args,expected,extra={})=>({label,args,expected,...extra});
const spec=(functionName,signature,challenge,steps,starter,tests,extra={})=>({functionName,signature,challenge,steps,starter,tests,...extra});

export const lessonContracts = {
  variaveis:spec('apresentarPerfil','apresentarPerfil(nome, pontos, ativo)',
    'Crie apresentarPerfil(nome, pontos, ativo). Retorne "Olá, NOME! Você tem P pontos. Status: ativo/inativo.". Use parâmetros, let/const e template literals.',
    ['Declare a função com três parâmetros.','Use ativo para escolher o status.','Retorne uma string que funcione com nomes e pontos diferentes.'],
    'function apresentarPerfil(nome, pontos, ativo) {\n  // TODO: retorne a apresentação do perfil\n}',[
      test('Nome e pontos iniciais',['Ana',15,true],'Olá, Ana! Você tem 15 pontos. Status: ativo.'),
      test('Perfil inativo',['Leo',0,false],'Olá, Leo! Você tem 0 pontos. Status: inativo.'),
      test('Outro nome, sem texto fixo',['Marina',120,true],'Olá, Marina! Você tem 120 pontos. Status: ativo.'),
      test('Números negativos',['Bia',-4,false],'Olá, Bia! Você tem -4 pontos. Status: inativo.')]),
  condicionais:spec('mensagemProgresso','mensagemProgresso(concluidas)',
    'Implemente mensagemProgresso(concluidas): com zero ou menos retorne "Comece agora"; de 1 a 4 retorne "Continue praticando"; com 5 ou mais retorne "Excelente progresso".',
    ['Use if / else if / else.','Considere os limites 0, 1, 4 e 5.','Use return para cada situação.'],
    'function mensagemProgresso(concluidas) {\n  // TODO: decida a mensagem usando condições\n}',[
      test('Zero tarefa',[0],'Comece agora'),test('Valor negativo',[-3],'Comece agora'),
      test('Primeira tarefa',[1],'Continue praticando'),test('Limite intermediário',[4],'Continue praticando'),
      test('Limite avançado',[5],'Excelente progresso'),test('Muitas tarefas',[48],'Excelente progresso')]),
  switch:spec('legendaStatus','legendaStatus(status)',
    'Crie legendaStatus(status). Os estados "pendente", "fazendo" e "concluida" devem retornar "Pendente", "Em andamento" e "Concluída". Para outros valores, retorne "Desconhecido".',
    ['Use switch com case e break ou return.','Inclua um caso default.','Teste todos os estados.'],
    'function legendaStatus(status) {\n  // TODO: switch com três estados e um default\n}',[
      test('Pendente',['pendente'],'Pendente'),test('Em andamento',['fazendo'],'Em andamento'),
      test('Concluída',['concluida'],'Concluída'),test('Valor inesperado',['pausada'],'Desconhecido'),
      test('String vazia',[''],'Desconhecido')]),
  funcoes:spec('percentual','percentual(concluidas, total)',
    'Implemente percentual(concluidas, total). Calcule concluidas / total * 100. Se total for zero ou negativo, retorne 0. A função precisa funcionar com números diferentes.',
    ['Receba dois parâmetros numéricos.','Trate total menor ou igual a zero.','Retorne o cálculo, sem depender do DOM ou de valores fixos.'],
    'function percentual(concluidas, total) {\n  // TODO: devolva a porcentagem calculada\n}',[
      test('Três de oito',[3,8],37.5),test('Divisão por zero',[3,0],0),test('Total negativo',[5,-2],0),
      test('Nenhuma concluída',[0,17],0),test('Todas concluídas',[20,20],100),test('Valor decimal',[1,5],20)]),
  objetos:spec('resumirTarefas','resumirTarefas(tarefas)',
    'Receba um array de objetos { titulo, prioridade }. Retorne um novo array com textos no formato "TÍTULO — PRIORIDADE", mantendo a ordem e sem modificar o array original.',
    ['Leia as propriedades de cada objeto.','Crie um novo array de strings.','Preserve os dados de entrada.'],
    'function resumirTarefas(tarefas) {\n  // TODO: crie descrições para cada tarefa\n}',[
      test('Três tarefas',[[task('Estudar',false,'alta'),task('Revisar',true,'baixa'),task('Praticar',false,'normal')]],['Estudar — alta','Revisar — baixa','Praticar — normal'],{unchangedArgs:true}),
      test('Lista vazia',[[]],[],{unchangedArgs:true}),
      test('Uma tarefa',[[task('Organizar',false,'urgente')]],['Organizar — urgente'],{unchangedArgs:true}),
      test('Textos diferentes',[[task('Enviar email',false,'média'),task('Deploy',false,'alta')]],['Enviar email — média','Deploy — alta'],{unchangedArgs:true})]),
  'metodos-array':spec('resumoTarefas','resumoTarefas(tarefas)',
    'Retorne { pendentes: [títulos não concluídos], concluidas: quantidade concluída } a partir de um array de objetos {titulo, concluida}. Não modifique a entrada.',
    ['Use filter/map ou lógica equivalente.','Some as tarefas concluídas.','Retorne um objeto novo, preservando a ordem.'],
    'function resumoTarefas(tarefas) {\n  // TODO: filtre tarefas pendentes e conte concluídas\n}',[
      test('Lista mista',[[task('Revisar'),task('Praticar',true),task('Publicar')]],{pendentes:['Revisar','Publicar'],concluidas:1},{unchangedArgs:true}),
      test('Lista vazia',[[]],{pendentes:[],concluidas:0},{unchangedArgs:true}),
      test('Tudo concluído',[[task('A',true),task('B',true)]],{pendentes:[],concluidas:2},{unchangedArgs:true}),
      test('Tudo pendente',[[task('A'),task('B'),task('C')]],{pendentes:['A','B','C'],concluidas:0},{unchangedArgs:true})]),
  'strings-numeros':spec('normalizarTitulo','normalizarTitulo(texto)',
    'Crie normalizarTitulo(texto). Remova espaços no início e no fim e reduza sequências de espaços internos a um único espaço. Retorne uma string.',
    ['Use trim() e substituição com expressão regular.','Trate strings vazias.','Não dependa de um título fixo.'],
    'function normalizarTitulo(texto) {\n  // TODO: normalize o texto\n}',[
      test('Remove bordas',['  Aprender JavaScript   '],'Aprender JavaScript'),
      test('Reduz espaços internos',['  Estudar    funções  '],'Estudar funções'),
      test('Texto sem espaços extras',['DevLab'],'DevLab'),
      test('Somente espaços',['     '],''),test('String vazia',[''],'')]),
  arquitetura:spec('criarTarefa','criarTarefa(id, titulo)',
    'Implemente criarTarefa(id, titulo): devolva {id, titulo: texto sem espaços externos, concluida: false}; se o título ficar vazio, retorne null. Depois experimente separar validação, criação e renderização no TaskFlow.',
    ['Separe a normalização da construção do objeto.','Recuse títulos em branco.','Não dependa de IDs fixos.'],
    'function criarTarefa(id, titulo) {\n  // TODO: valide e crie um objeto de tarefa\n}',[
      test('Cria objeto',[3,'  Estudar  '],{id:3,titulo:'Estudar',concluida:false}),
      test('ID diferente',[99,'Publicar'],{id:99,titulo:'Publicar',concluida:false}),
      test('Só espaços',[8,'   '],null),test('Vazio',[1,''],null),
      test('Título interno com espaço',[7,'Ler docs'],{id:7,titulo:'Ler docs',concluida:false})]),
  testes:spec('tituloValido','tituloValido(texto)',
    'Implemente tituloValido(texto). Retorne true para strings com pelo menos um caractere visível após trim e false para strings vazias ou com somente espaços.',
    ['Devolva boolean, não texto.','Teste espaços e strings vazias.','Não confunda um espaço com título válido.'],
    'function tituloValido(texto) {\n  // TODO: retorne true somente para títulos preenchidos\n}',[
      test('Título preenchido',['Estudar'],true),test('Somente espaços',['   '],false),
      test('String vazia',[''],false),test('Espaços ao redor',['  Praticar  '],true),
      test('Tab e quebra de linha',['\t\n'],false)]),
  assincrono:spec('carregarMensagem','async carregarMensagem(nome, atraso)',
    'Crie uma função assíncrona carregarMensagem(nome, atraso) que retorne uma Promise e resolva com "Dados carregados: NOME" depois de aguardar atraso milissegundos usando setTimeout. Você pode usar async/await.',
    ['A função precisa devolver uma Promise.','Aguarde com setTimeout dentro de uma Promise.','O texto deve mudar conforme o nome recebido.'],
    'async function carregarMensagem(nome, atraso) {\n  // TODO: aguarde a Promise e devolva a mensagem\n}',[
      test('Primeira resposta',['Tarefa A',5],'Dados carregados: Tarefa A',{requiresPromise:true}),
      test('Segundo nome',['TaskFlow',10],'Dados carregados: TaskFlow',{requiresPromise:true}),
      test('String vazia',['',0],'Dados carregados: ',{requiresPromise:true})]),
  'ts-intro':spec('apresentarHoras','apresentarHoras(nome: string, horas: number): string',
    'Implemente apresentarHoras(nome: string, horas: number): string. Retorne "NOME estudou H horas." e declare tipos de parâmetros e retorno.',
    ['Declare tipos string e number.','Defina retorno do tipo string.','Retorne uma frase para diferentes nomes e horas.'],
    'function apresentarHoras(nome: string, horas: number): string {\n  // TODO: retorne a apresentação tipada\n}',[
      test('Primeiro aluno',['Ana',3],'Ana estudou 3 horas.'),
      test('Outro aluno',['Luís',0],'Luís estudou 0 horas.'),
      test('Horas decimais',['Pedro',1.5],'Pedro estudou 1.5 horas.')],{language:'ts',typeRequirements:{parameters:2,returns:'string'}}),
  'ts-tipos':spec('mediaNotas','mediaNotas(notas: number[]): number',
    'Implemente mediaNotas(notas: number[]): number. Retorne a média aritmética; para array vazio, retorne 0.',
    ['Use array tipado de números.','Some os valores e divida pelo comprimento.','Trate array vazio.'],
    'function mediaNotas(notas: number[]): number {\n  // TODO: calcule a média\n}',[
      test('Três notas',[[8,9,10]],9,{unchangedArgs:true}),
      test('Array vazio',[[]],0,{unchangedArgs:true}),
      test('Uma nota',[[7]],7,{unchangedArgs:true}),
      test('Decimais',[[3.5,7.5]],5.5,{unchangedArgs:true})],{language:'ts',typeRequirements:{parameters:1,returns:'number',arrayParameter:true}}),
  'ts-interfaces':spec('titulosPendentes','titulosPendentes(tarefas: Tarefa[]): string[]',
    'Declare interface Tarefa com id: number, titulo: string e concluida: boolean. Implemente titulosPendentes(tarefas: Tarefa[]): string[] que retorna somente os títulos pendentes.',
    ['Declare a interface Tarefa.','Receba um array de Tarefa.','Retorne um array de strings sem alterar a entrada.'],
    'interface Tarefa { id: number; titulo: string; concluida: boolean; }\n\nfunction titulosPendentes(tarefas: Tarefa[]): string[] {\n  // TODO: devolva títulos pendentes\n}',[
      test('Mistura de tarefas',[[{id:1,titulo:'Ler',concluida:false},{id:2,titulo:'Testar',concluida:true},{id:3,titulo:'Criar',concluida:false}]],['Ler','Criar'],{unchangedArgs:true}),
      test('Vazio',[[]],[],{unchangedArgs:true}),
      test('Somente concluídas',[[{id:1,titulo:'Feito',concluida:true}]],[],{unchangedArgs:true})],{language:'ts',typeRequirements:{parameters:1,returns:'string[]',interfaceName:'Tarefa',arrayParameter:true}}),
  'ts-funcoes':spec('percentual','percentual(parte: number, total: number): number',
    'Escreva percentual(parte: number, total: number): number. Calcule parte / total * 100, retornando 0 quando total não for positivo.',
    ['Tipar parâmetros e retorno.','Evitar divisão por zero.','Testar outros totais.'],
    'function percentual(parte: number, total: number): number {\n  // TODO: calcule e retorne o percentual\n}',[
      test('3 de 8',[3,8],37.5),test('0 de 5',[0,5],0),test('Total zero',[4,0],0),
      test('5 de 10',[5,10],50),test('Total negativo',[3,-1],0)],{language:'ts',typeRequirements:{parameters:2,returns:'number'}}),
  'ts-generics':spec('primeiro','primeiro<T>(itens: T[]): T | undefined',
    'Crie primeiro<T>(itens: T[]): T | undefined. Retorne o primeiro elemento ou undefined em um array vazio. Preserve o tipo genérico.',
    ['Declare o tipo genérico <T>.','Use T[] como parâmetro.','Retorne T | undefined.'],
    'function primeiro<T>(itens: T[]): T | undefined {\n  // TODO: devolva o primeiro item\n}',[
      test('Strings',[["JS","TS"]],'JS',{unchangedArgs:true}),
      test('Números',[[7,8,9]],7,{unchangedArgs:true}),
      test('Array vazio',[[]],undefined,{unchangedArgs:true}),
      test('Booleanos',[[false,true]],false,{unchangedArgs:true})],{language:'ts',typeRequirements:{parameters:1,returns:'T | undefined',generic:true,arrayParameter:true}})
};

export const contractLessonIds = Object.freeze(Object.keys(lessonContracts));

/** Confere assinaturas TS com AST; não substitui typecheck completo com libs DOM. */
export function inspectTypeScriptContract(ts, source, contract) {
  if (contract.language !== 'ts') return [];
  const root=ts.createSourceFile('solution.ts',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
  const syntax=[...root.parseDiagnostics];
  if(syntax.length) return [{label:'Código TypeScript sem erros de sintaxe.',ok:false}];
  const fn=root.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text===contract.functionName);
  const checks=[{label:'Função '+contract.functionName+' declarada com TypeScript.',ok:!!fn}];
  if(!fn)return checks;
  const fmt=(node)=>node?.getText(root).replace(/\s+/g,'').toLowerCase()||'';
  const req=contract.typeRequirements;
  checks.push({label:'Todos os parâmetros possuem anotações de tipo.',ok:fn.parameters.length===req.parameters&&fn.parameters.every(p=>Boolean(p.type))});
  if(req.arrayParameter)checks.push({label:'A função recebe um array tipado.',ok:fn.parameters.some(p=>fmt(p.type).includes('[]')||fmt(p.type).startsWith('array<'))});
  checks.push({label:'O tipo de retorno corresponde ao contrato.',ok:fmt(fn.type)===req.returns.replace(/\s+/g,'').toLowerCase()});
  if(req.generic)checks.push({label:'A função declara um parâmetro genérico T.',ok:fn.typeParameters?.some(p=>p.name.text==='T')===true});
  if(req.interfaceName){
    const iface=root.statements.find(node=>ts.isInterfaceDeclaration(node)&&node.name.text===req.interfaceName);
    const fields=new Map(iface?.members.filter(ts.isPropertySignature).map(m=>[m.name.getText(root),fmt(m.type)])||[]);
    checks.push({label:'Interface Tarefa declara id, titulo e concluida com tipos corretos.',ok:!!iface&&fields.get('id')==='number'&&fields.get('titulo')==='string'&&fields.get('concluida')==='boolean'});
  }
  return checks;
}
