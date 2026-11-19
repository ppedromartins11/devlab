import { lessonContracts } from './lesson-contracts.js';
/** Conteúdo autoral. A estrutura em unidades foi inspirada em plataformas de estudo,
 *  mas todos os textos, exemplos e desafios abaixo são próprios deste projeto. */
const baseHtml = `<main class="app">
  <span class="eyebrow">Meu laboratório</span>
  <h1 id="title">Aprendendo a programar</h1>
  <p id="result">Altere o código e clique em Executar.</p>
  <button id="action">Experimentar</button>
  <ul id="list"></ul>
</main>`;

const baseCss = `* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #f1f5f9; color: #162237; }
.app { max-width: 700px; margin: 40px auto; padding: 32px; background: #fff; border-radius: 18px; box-shadow: 0 14px 50px #10234512; }
.eyebrow { color: #0f766e; font-size: 12px; letter-spacing: 0.12em; font-weight: 800; text-transform: uppercase; }
h1 { margin: 12px 0; font-size: clamp(24px, 5vw, 36px); }
p { line-height: 1.6; color: #526179; }
button { background: #2563eb; color: #fff; border: 0; border-radius: 9px; padding: 12px 18px; font-weight: 700; cursor: pointer; }
button:hover { background: #1d4ed8; }
li { padding: 8px 0; }`;

function lesson(id, title, summary, minutes, theory, concepts, example, challenge, steps, js = '', html = baseHtml, css = baseCss, project = '') {
  return { id, title, summary, minutes, theory, concepts, example, challenge, steps, project, starter: { html, css, js } };
}

export const jsUnits = [
  {
    id:'fundamentos', title:'01. Fundamentos da programação', subtitle:'Entenda a web e aprenda a pensar com código.',
    lessons:[
      lesson('primeiros-passos','O que são HTML, CSS e JavaScript','Como o navegador transforma arquivos em uma página.',12,
        ['HTML define a estrutura da página, CSS controla a aparência e JavaScript adiciona comportamento. Os três trabalham juntos: não são linguagens intercambiáveis.', 'O navegador interpreta o HTML e cria o DOM, aplica as regras CSS e executa seu JavaScript. Pequenas mudanças no código podem ser verificadas na prévia ao lado.', 'Comece pensando em entradas, processamento e saídas. Por exemplo: uma pessoa clica em um botão (entrada), seu programa decide o que fazer (processamento) e altera a tela (saída).'],
        ['HTML = estrutura','CSS = estilo','JavaScript = comportamento','DOM = representação da página'],
        `document.querySelector('#action').addEventListener('click', () => {\n  document.querySelector('#result').textContent = 'Funcionou!';\n});`,
        'Transforme o botão em uma ação que altere o texto e também o título da página.',
        ['Encontre o botão pelo seu id.', 'Escute o evento click.', 'Altere textContent de #result e #title.'],
        `const botao = document.querySelector('#action');\n\n// TODO: escute o clique e altere dois textos.\nconsole.log('JavaScript carregado!');`,undefined,undefined,
        'Dê um nome ao produto no cabeçalho e crie a estrutura inicial do seu TaskFlow.'),
      lesson('variaveis','Variáveis, const, let e tipos','Guarde informações e compreenda strings, números e booleanos.',16,
        ['Uma variável dá nome a um valor armazenado durante a execução. Use const quando a referência não será reatribuída e let quando o valor precisa mudar.', 'JavaScript possui tipos como string, number, boolean, undefined e null, além de objetos. typeof ajuda a investigar o tipo de uma expressão.', 'Os nomes de variáveis devem revelar sua intenção. prefira totalDeTarefas a x; não use var no código novo.'],
        ['const e let','string, number e boolean','typeof','template literals'],
        `const nome = 'Ana';\nlet pontos = 10;\npontos += 5;\nconsole.log(\`Olá, \${nome}! Você tem \${pontos} pontos.\`);`,
        'Crie nome, pontos e ativo; mostre uma mensagem usando template literal.',
        ['Use const para nome.', 'Use let para pontos e some 5.', 'Mostre a frase em #result e um console.log.'],
        `const nome = 'Pessoa estudante';\nlet pontos = 0;\nconst ativo = true;\n\n// TODO: atualize pontos e mostre uma frase na página.`,undefined,undefined,
        'Defina o nome do aplicativo, uma mensagem de boas-vindas e uma contagem inicial de tarefas.'),
      lesson('operadores','Operadores e expressões','Faça cálculos, comparações e combinações lógicas.',18,
        ['Operadores aritméticos incluem +, -, *, / e %. Comparações retornam booleanos: >, <, >=, <= e ===. Prefira === a == para evitar conversões inesperadas.', 'Operadores lógicos &&, || e ! permitem combinar regras. Uma tarefa pode estar concluída E ser urgente, por exemplo.', 'A ordem das operações importa. Use parênteses para tornar o raciocínio explícito.'],
        ['Aritmética e módulo','=== versus ==','&&, || e !','precedência'],
        `const feitas = 3;\nconst total = 5;\nconst porcentagem = (feitas / total) * 100;\nconsole.log(porcentagem >= 50 && total > 0);`,
        'Calcule a porcentagem de 8 tarefas, sendo 3 concluídas, e mostre um indicador na tela.',
        ['Crie total e concluidas.', 'Calcule a porcentagem.', 'Exiba a porcentagem no elemento #result.'],
        `const total = 8;\nconst concluidas = 3;\n\n// TODO: calcule o percentual e exiba em #result.`,undefined,undefined,
        'Adicione um indicador de progresso (%) na interface do TaskFlow.'),
      lesson('debug-console','Console, erros e depuração','Descubra por que o código não está funcionando.',14,
        ['console.log mostra valores durante a execução; console.error registra problemas. No laboratório, a aba Console captura essas mensagens.', 'Erros de sintaxe impedem que o programa execute. Erros de lógica são mais difíceis: o código executa, mas produz resultados incorretos.', 'Para depurar, reproduza o problema, observe entradas e saídas, teste uma hipótese por vez e remova os logs temporários antes de finalizar.'],
        ['console.log / warn / error','erros de sintaxe','erros de lógica','debug passo a passo'],
        `function dobrar(n) { return n * 2; }\nconsole.log('Entrada:', 4);\nconsole.log('Saída:', dobrar(4));`,
        'Identifique o erro lógico na função e registre entrada e saída no console.',
        ['Execute e abra Console.', 'A função deveria calcular o dobro, não o triplo.', 'Corrija e confirme com 4 e 7.'],
        `function dobrar(numero) {\n  return numero * 3; // BUG proposital\n}\nconsole.log('Resultado de 4:', dobrar(4));`,undefined,undefined,
        'Teste o estado inicial do projeto com console.log e confira os elementos da página.')
    ]
  },
  {
    id:'logica',title:'02. Lógica de programação',subtitle:'Resolva problemas com decisões, repetições e funções.',
    lessons:[
      lesson('condicionais','if, else e operador ternário','Transforme regras em decisões.',18,
        ['Use if quando um trecho de código só deve ser executado se uma condição for verdadeira. else define o caminho alternativo e else if acrescenta outras condições.', 'Um operador ternário (condicao ? valorA : valorB) é adequado para expressões pequenas, mas condições complexas costumam ficar mais legíveis com if/else.', 'Tente descrever a regra em português antes de traduzi-la: “se há tarefas concluídas, mostre progresso; caso contrário, incentive o primeiro passo”.'],
        ['if / else if / else','booleanos em condições','ternário','regras de negócio'],
        `const tarefas = 4;\nconst mensagem = tarefas > 0 ? 'Você já começou!' : 'Hora de começar';\nconsole.log(mensagem);`,
        'Crie uma mensagem diferente para zero, poucas ou muitas tarefas concluídas.',
        ['Use uma variável concluidas.', 'Teste os casos 0, entre 1 e 4, e 5 ou mais.', 'Mostre a mensagem em #result.'],
        `const concluidas = 3;\nlet mensagem = '';\n\n// TODO: use if/else if/else para definir mensagem.`,undefined,undefined,
        'Faça o aviso de “nenhuma tarefa” aparecer somente quando a lista estiver vazia.'),
      lesson('switch','switch e múltiplos estados','Organize vários caminhos possíveis.',14,
        ['switch é útil quando você compara uma expressão com vários valores conhecidos. Cada case define um caminho e break normalmente evita passar ao próximo.', 'Um default é o resultado quando nenhum case corresponde. Também é possível usar objetos como tabelas de consulta.', 'Prefira if/else para condições com intervalos (ex.: nota >= 7).'],
        ['switch / case','break','default','estados de interface'],
        `switch ('progresso') {\n  case 'feito': console.log('Concluída'); break;\n  case 'progresso': console.log('Em andamento'); break;\n  default: console.log('Pendente');\n}`,
        'Mostre uma etiqueta diferente para os estados pendente, fazendo e concluida.',
        ['Altere status três vezes para testar.', 'Use switch com default.', 'Escreva o resultado em #result.'],
        `const status = 'fazendo';\nlet legenda = '';\n\n// TODO: use switch e mostre a legenda.`,undefined,undefined,
        'Defina estados visuais: pendente, em andamento e concluída.'),
      lesson('loops','for, while e repetições','Gere conteúdo sem repetir código manualmente.',20,
        ['Um laço executa uma instrução várias vezes. O for é apropriado quando há uma contagem conhecida; while executa enquanto uma condição permanecer verdadeira.', 'Evite laços infinitos: garanta que a condição possa se tornar falsa. Use break para interromper e continue para pular uma iteração.', 'Laços são essenciais para desenhar listas, totalizar valores e processar coleções de dados.'],
        ['for e while','contador e condição','break e continue','laços em listas'],
        `for (let i = 1; i <= 3; i++) {\n  console.log('Etapa', i);\n}`, 
        'Crie dinamicamente cinco itens de lista, numerados de 1 a 5.',
        ['Selecione #list.', 'Use for de 1 a 5.', 'Crie <li> via createElement e append.'],
        `const lista = document.querySelector('#list');\n\n// TODO: crie 5 elementos <li> usando for.`,undefined,undefined,
        'Comece a renderizar a lista de tarefas a partir de dados, não de HTML repetido.'),
      lesson('funcoes','Funções, parâmetros e retorno','Divida problemas em partes reutilizáveis.',22,
        ['Uma função agrupa instruções para executar uma responsabilidade. Parâmetros recebem dados de entrada e return devolve um resultado.', 'Uma função pequena e bem nomeada é fácil de testar. Procure separar o cálculo da manipulação da interface.', 'Funções de seta são outra sintaxe. Elas se comportam de forma diferente em relação a this, mas para exercícios simples são bastante práticas.'],
        ['function','parâmetros','return','arrow functions','reutilização'],
        `function percentual(parte, total) {\n  if (total === 0) return 0;\n  return Math.round((parte / total) * 100);\n}\nconsole.log(percentual(2, 5));`,
        'Implemente uma função percentual(concluidas, total), tratando divisão por zero.',
        ['Receba dois parâmetros.', 'Se total for zero, retorne zero.', 'Exiba percentual(3, 8) em #result.'],
        `function percentual(concluidas, total) {\n  // TODO: implemente o cálculo com retorno.\n}\n\nconsole.log('Percentual:', percentual(3, 8));`,undefined,undefined,
        'Extraia o cálculo de progresso para uma função independente e reutilizável.')
    ]
  },
  {
    id:'dados',title:'03. Dados e organização',subtitle:'Modele informações e trabalhe com coleções.',
    lessons:[
      lesson('arrays','Arrays e índices','Armazene vários valores em uma lista.',19,
        ['Arrays representam sequências: const tarefas = ["Estudar", "Praticar"]. Seus índices começam em zero. length informa quantos itens existem.', 'push acrescenta no fim, pop remove do fim e includes verifica existência. Cuidado com alterações inesperadas em um array compartilhado.', 'Na prática web, arrays são usados para cards, produtos, tarefas, mensagens e resultados de APIs.'],
        ['[] e índices','length','push/pop','includes'],
        `const tarefas = ['Estudar', 'Revisar'];\ntarefas.push('Praticar');\nconsole.log(tarefas[0], tarefas.length);`,
        'Cadastre três tarefas em um array e mostre cada uma como item da lista.',
        ['Crie array tarefas.', 'Use push para adicionar a terceira.', 'Percorra o array e monte a lista.'],
        `const tarefas = ['Estudar JS', 'Resolver desafios'];\nconst lista = document.querySelector('#list');\n\n// TODO: adicione mais uma tarefa e renderize as três.`,undefined,undefined,
        'Troque as tarefas escritas diretamente no HTML por um array de strings.'),
      lesson('objetos','Objetos e modelagem de dados','Representações do mundo real em JavaScript.',20,
        ['Objetos armazenam pares de chave e valor. Uma tarefa pode ter id, titulo, concluida e prioridade.', 'Leia propriedades com tarefa.titulo ou tarefa["titulo"]. Prefira objetos para dados relacionados e arrays para coleções de objetos.', 'Modelo de dados significa decidir quais informações são necessárias e em que formato. Bons modelos tornam a interface mais simples.'],
        ['objetos literais','propriedades','array de objetos','modelagem'],
        `const tarefa = { id: 1, titulo: 'Estudar', concluida: false };\nconsole.log(tarefa.titulo);`,
        'Monte um array com três objetos de tarefa e exiba título e prioridade.',
        ['Cada tarefa deve ter id, titulo, prioridade e concluida.', 'Percorra o array.', 'Mostre titulo e prioridade em cada <li>.'],
        `const tarefas = [\n  { id: 1, titulo: 'Estudar', prioridade: 'alta', concluida: false },\n];\n// TODO: adicione dois objetos e renderize a lista.`,undefined,undefined,
        'Evolua seu array: cada tarefa passa a ter id, título, status e prioridade.'),
      lesson('metodos-array','map, filter, find e reduce','Transforme coleções de forma expressiva.',24,
        ['map gera um novo array transformando cada item. filter cria um array apenas com itens que passam por uma condição. find retorna o primeiro item correspondente.', 'reduce acumula valores, como somar o preço de produtos ou contar tarefas concluídas. Não é necessário usá-lo quando um loop simples é mais legível.', 'Esses métodos recebem callbacks, funções executadas para cada item. Em geral, não alteram o array original.'],
        ['map','filter','find','reduce','callbacks'],
        `const numeros = [1, 2, 3];\nconsole.log(numeros.map(n => n * 2));\nconsole.log(numeros.filter(n => n > 1));`,
        'Filtre tarefas não concluídas e conte quantas já foram feitas.',
        ['Use filter para pendentes.', 'Use filter ou reduce para concluídas.', 'Mostre as pendentes em #list e a contagem em #result.'],
        `const tarefas = [\n  { titulo: 'Revisar', concluida: false },\n  { titulo: 'Praticar', concluida: true },\n  { titulo: 'Publicar', concluida: false },\n];\n// TODO: filtre, conte e renderize.`,undefined,undefined,
        'Crie filtros “Todas”, “Pendentes” e “Concluídas” usando filter.'),
      lesson('strings-numeros','Strings, números e datas','Prepare informações para exibir ao usuário.',19,
        ['Strings podem ser transformadas com trim, toLowerCase, includes, slice e replace. Normalizar entradas ajuda na busca e evita cadastrar apenas espaços.', 'Number converte entradas numéricas; Number.isNaN detecta resultados inválidos. Use toFixed com cuidado: ele devolve uma string.', 'Intl.DateTimeFormat e Intl.NumberFormat formatam datas e números sem precisar de bibliotecas adicionais.'],
        ['trim e lowercase','includes','Number','Intl','validação'],
        `const nome = '  JAVASCRIPT  '.trim().toLowerCase();\nconst data = new Intl.DateTimeFormat('pt-BR').format(new Date());\nconsole.log(nome, data);`,
        'Normalize um título digitado e mostre a data atual em português.',
        ['Remova espaços extras com trim.', 'Impeça título vazio.', 'Formate a data com Intl.DateTimeFormat.'],
        `const tituloDigitado = '  Aprender JavaScript   ';\n// TODO: normalize o texto e formate a data atual.`,undefined,undefined,
        'Valide títulos de tarefas e registre a data de criação de cada item.')
    ]
  },
  {
    id:'dom',title:'04. Interfaces e DOM',subtitle:'Conecte sua lógica à página e aos usuários.',
    lessons:[
      lesson('dom-basico','Selecionar e alterar elementos','Manipule o DOM de forma segura.',22,
        ['document.querySelector seleciona o primeiro elemento que corresponde a um seletor CSS. querySelectorAll retorna uma coleção de elementos.', 'textContent escreve texto sem interpretar HTML, o que é importante quando os dados vêm de usuários. Evite injetar texto digitado com innerHTML.', 'Classes CSS podem ser modificadas com classList.add, remove e toggle para representar estados da interface.'],
        ['querySelector','textContent','classList','DOM seguro'],
        `const titulo = document.querySelector('#title');\ntitulo.textContent = 'Nova página';\ntitulo.classList.add('destaque');`,
        'Quando clicar, mude o título e alterne uma classe visual no cartão.',
        ['Selecione #action e #title.', 'No clique, use textContent.', 'Alterne a classe destaque no título.'],
        `const titulo = document.querySelector('#title');\nconst botao = document.querySelector('#action');\n// TODO: evento e classList.toggle('destaque')`,undefined,baseCss+`\n.destaque { color: #0f766e; text-decoration: underline; }`,
        'Separe as classes de apresentação de lógica: JS muda classes, CSS decide a aparência.'),
      lesson('eventos','Eventos e interação','Reaja a cliques, teclas e mudanças.',20,
        ['addEventListener conecta uma função a um evento. Os eventos mais frequentes são click, input, change e submit.', 'O objeto event descreve o que ocorreu; event.target aponta para o elemento envolvido. Use preventDefault em formulários para evitar recarregar a página.', 'Delegação de eventos permite escutar um elemento pai e tratar cliques em itens adicionados depois.'],
        ['addEventListener','event.target','preventDefault','delegação'],
        `document.querySelector('#action').addEventListener('click', event => {\n  console.log('Clicou em:', event.target.id);\n});`,
        'Adicione um input e mostre o texto digitado imediatamente na prévia.',
        ['Use o input #name.', 'Escute o evento input.', 'Atualize #result a cada digitação.'],
        `const nome = document.querySelector('#name');\n// TODO: escute o evento input e atualize #result.`,
        `<main class="app"><span class="eyebrow">Eventos</span><h1 id="title">Digite seu nome</h1><input id="name" placeholder="Seu nome" /><p id="result">Seu texto aparece aqui.</p></main>`,baseCss+`\ninput { padding: 12px; border: 1px solid #cbd5e1; border-radius: 9px; width: 100%; }`,
        'Crie um formulário para cadastrar novas tarefas usando submit e preventDefault.'),
      lesson('formularios','Formulários e validação','Receba dados corretamente.',25,
        ['Um formulário semântico contém label, input e button type="submit". O atributo required ajuda, mas validação JavaScript ainda é útil.', 'Leia input.value, remova espaços e informe ao usuário quando houver erro. Não confie só na validação do navegador em aplicações com backend.', 'Use mensagens acessíveis: aria-live="polite" permite anunciar feedback sem interromper o usuário.'],
        ['form e submit','required','value e trim','feedback acessível'],
        `form.addEventListener('submit', (event) => {\n  event.preventDefault();\n  if (!input.value.trim()) return;\n  console.log(input.value.trim());\n});`,
        'Ao enviar o formulário, insira uma tarefa na lista sem recarregar a página.',
        ['Use preventDefault.', 'Recuse títulos vazios.', 'Crie um <li> e depois limpe o campo.'],
        `const form = document.querySelector('#task-form');\nconst input = document.querySelector('#task-title');\nconst lista = document.querySelector('#list');\n\n// TODO: implemente o submit.`,
        `<main class="app"><span class="eyebrow">Formulários</span><h1>Cadastrar tarefa</h1><form id="task-form"><label for="task-title">Nome da tarefa</label><div class="form-row"><input id="task-title" required placeholder="Ex.: estudar funções" /><button type="submit">Adicionar</button></div></form><p id="result" aria-live="polite"></p><ul id="list"></ul></main>`,
        baseCss+`\n.form-row{display:flex;gap:8px;margin:12px 0}.form-row input{flex:1;min-width:0;padding:12px;border:1px solid #cbd5e1;border-radius:9px}`, 
        'Conecte o formulário do TaskFlow ao array de tarefas e implemente criação de itens.'),
      lesson('renderizacao','Renderização e estado','Mantenha dados e tela sincronizados.',26,
        ['Estado é o conjunto de dados que descreve a interface em um dado momento. A renderização transforma esse estado em elementos visuais.', 'Em vez de editar HTML em vários lugares, crie uma função renderizar() que lê o array de tarefas e atualiza a lista.', 'A sequência é: evento → atualização do estado → renderização. Essa ideia será útil depois com React e outras bibliotecas.'],
        ['estado','render()','evento → estado → tela','separação de responsabilidades'],
        `let contador = 0;\nfunction renderizar() {\n  resultado.textContent = \`Total: \${contador}\`;\n}\nrenderizar();`,
        'Crie um contador com botão de incremento e uma função renderizar separada.',
        ['Crie let contador = 0.', 'No clique, incremente o valor.', 'Chame renderizar após a mudança.'],
        `let contador = 0;\nconst resultado = document.querySelector('#result');\n// TODO: implemente renderizar() e evento no botão.`,undefined,undefined,
        'Centralize a atualização de tela do projeto em uma função renderizarTarefas().')
    ]
  },
  {
    id:'web',title:'05. JavaScript para web real',subtitle:'Armazenamento, APIs, assincronia e qualidade.',
    lessons:[
      lesson('assincrono','Promises, async e await','Trabalhe com tarefas que demoram para terminar.',25,
        ['JavaScript executa seu código principal em uma thread, mas pode agendar operações assíncronas. Uma Promise representa um resultado futuro.', 'async define uma função assíncrona e await espera o resultado de uma Promise sem bloquear permanentemente a interface.', 'Use try/catch para tratar falhas. Mostre estados de carregamento e erro, porque usuários precisam saber o que está acontecendo.'],
        ['Promise','async/await','try/catch','estado de carregamento'],
        `async function buscar() {\n  try {\n    const valor = await Promise.resolve('Carregado!');\n    console.log(valor);\n  } catch (erro) { console.error(erro); }\n}`, 
        'Simule um carregamento de dados por 1 segundo e mostre o resultado ao concluir.',
        ['Mostre "Carregando..." imediatamente.', 'Use await new Promise(resolve => setTimeout(resolve, 1000)).', 'Atualize #result ao terminar.'],
        `async function carregar() {\n  // TODO: simule a espera e mude #result.\n}\ndocument.querySelector('#action').addEventListener('click', carregar);`,undefined,undefined,
        'Adicione indicador de carregamento na interface ao simular operações assíncronas.'),
      lesson('api-json','HTTP, APIs, fetch e JSON','Entenda como frontend conversa com serviços.',26,
        ['APIs HTTP permitem que o frontend peça e envie dados. GET normalmente consulta; POST cria; PUT/PATCH atualizam; DELETE remove.', 'fetch retorna uma Promise com Response. Verifique response.ok antes de usar response.json(). O formato JSON é texto estruturado; JSON.stringify e JSON.parse convertem representações.', 'O exemplo funciona offline usando dados simulados. Quando consumir uma API real, trate conexão indisponível e nunca exponha chaves secretas no frontend.'],
        ['GET/POST/PATCH/DELETE','fetch','response.ok','JSON.parse/stringify','erros de rede'],
        `const objeto = { titulo: 'Estudar', concluida: false };\nconst json = JSON.stringify(objeto);\nconsole.log(JSON.parse(json).titulo);`,
        'Converta um JSON de tarefas em objetos e renderize seus títulos.',
        ['Use JSON.parse.', 'Percorra as tarefas.', 'Mostre cada título em #list.'],
        `const respostaDaApi = '[{"id":1,"titulo":"Ler documentação"},{"id":2,"titulo":"Criar projeto"}]';\n// TODO: transforme o JSON em objetos e renderize.`,undefined,undefined,
        'Separe a lógica que obtém os dados da lógica que os apresenta.'),
      lesson('storage','localStorage e persistência','Mantenha informações entre visitas.',24,
        ['localStorage oferece getItem, setItem e removeItem para pares de strings persistidos no navegador. Para salvar arrays e objetos, use JSON.stringify; para restaurá-los, JSON.parse.', 'O laboratório executa a prévia em um iframe isolado. Para o exercício, ele fornece um armazenamento compatível com localStorage e sincronizado com a aplicação principal.', 'localStorage é ótimo para estudos e preferências, mas não é adequado para segredos, autenticação segura ou dados sensíveis. Em sistemas multiusuário use backend e permissões adequadas.'],
        ['setItem/getItem','JSON.stringify','JSON.parse','limites de segurança'],
        `localStorage.setItem('tema', 'escuro');\nconsole.log(localStorage.getItem('tema'));`,
        'Crie um contador persistente que aumente a cada clique, mesmo após executar de novo.',
        ['Leia a contagem salva com getItem.', 'Converta para Number.', 'Salve com setItem e atualize #result.'],
        `let contador = Number(localStorage.getItem('contador') || 0);\n// TODO: mostre a contagem e salve cada clique.`,undefined,undefined,
        'Persista o array de tarefas do projeto em localStorage e recupere-o ao abrir.'),
      lesson('acessibilidade','Acessibilidade e interfaces responsivas','Construa para pessoas e dispositivos diferentes.',21,
        ['HTML semântico facilita teclado, leitores de tela e manutenção. Botões devem ser botões e campos devem ter labels associadas.', 'Use estados de foco visíveis, contraste adequado e aria-live para mensagens dinâmicas. Teste seu produto sem mouse.', 'Responsividade começa com layouts flexíveis e unidades fluidas. Use media queries para adaptar a experiência a telas menores.'],
        ['semântica','labels','teclado e foco','aria-live','media queries'],
        `document.querySelector('#status').textContent = 'Alteração salva';\n// O elemento possui aria-live="polite".`,
        'Crie um formulário com label, feedback acessível e layout que se adapta a telas pequenas.',
        ['Associe label ao input pelo for/id.', 'Use aria-live="polite" no status.', 'Adicione uma media query ao CSS.'],
        `const form = document.querySelector('#form');\nform.addEventListener('submit', e => {\n  e.preventDefault();\n  document.querySelector('#status').textContent = 'Salvo!';\n});`,
        `<main class="app"><h1>Formulário acessível</h1><form id="form"><label for="name">Seu nome</label><input id="name" /><button type="submit">Salvar</button></form><p id="status" aria-live="polite"></p></main>`,
        baseCss + `\nlabel { display:block; margin-bottom:8px } input{display:block;width:100%;padding:12px;margin-bottom:12px;border:1px solid #64748b;border-radius:8px}button:focus-visible,input:focus-visible{outline:3px solid #f59e0b;outline-offset:3px}\n/* TODO: ajuste para telas menores */`,
        'Revise TaskFlow no celular, usando teclado e com mensagens acessíveis.')
    ]
  },
  {
    id:'projeto-final',title:'06. Construção de um projeto real',subtitle:'Integre os conhecimentos e publique com confiança.',
    lessons:[
      lesson('arquitetura','Organização em funções e módulos','Estruture um projeto que cresce sem virar bagunça.',24,
        ['Separe responsabilidades: dados, regras e interface. Evite misturar leitura de armazenamento, validação e criação de HTML na mesma função enorme.', 'Em projetos maiores, import e export permitem dividir o código entre arquivos. Neste laboratório de arquivo único, organize por funções, preparando a transição para módulos.', 'Nomes consistentes, responsabilidades claras e pequenas funções costumam ajudar mais que padrões complexos aplicados cedo demais.'],
        ['funções pequenas','separação de responsabilidades','import/export','organização'],
        `function validar(titulo) { return titulo.trim().length > 0; }\nfunction criarTarefa(titulo) { return { id: Date.now(), titulo, concluida: false }; }`,
        'Separe validação, criação e renderização em três funções.',
        ['Implemente validarTitulo.', 'Implemente criarTarefa.', 'Implemente renderizarTarefas.'],
        `let tarefas = [];\n// TODO: escreva 3 funções independentes.`,undefined,undefined,
        'Refatore TaskFlow para separar dados, regras de negócio e DOM.'),
      lesson('testes','Testes e tratamento de erros','Verifique se a lógica funciona antes de publicar.',24,
        ['Teste funções puras com entradas e saídas previsíveis. Considere casos normais, limites e entradas inválidas.', 'Uma asserção compara um resultado real com o esperado. Frameworks como Vitest e Jest automatizam isso em projetos maiores.', 'Trate erros de forma visível e compreensível; não esconda um problema somente no console.'],
        ['casos de teste','asserções','casos de borda','feedback de erro'],
        `function somar(a, b) { return a + b; }\nconsole.assert(somar(2, 3) === 5, 'Soma incorreta');`,
        'Crie e teste uma função que não aceite títulos de tarefa em branco.',
        ['A função deve receber string.', 'Retorne false para espaços em branco.', 'Use console.assert em três entradas.'],
        `function tituloValido(texto) {\n  // TODO: retorne true somente para títulos preenchidos.\n}\nconsole.assert(tituloValido('Estudar') === true);\nconsole.assert(tituloValido('   ') === false);`,undefined,undefined,
        'Teste cadastro vazio, conclusão, filtros e recarregamento do TaskFlow.'),
      lesson('projeto-integrador','Projeto final: TaskFlow completo','Conclua um gerenciador de tarefas funcional.',35,
        ['Seu projeto deve apresentar um fluxo completo: criar tarefa, listar, concluir, filtrar e salvar. Esse conjunto cobre eventos, arrays, objetos, funções, DOM e armazenamento.', 'Pense nos estados vazios, feedback de erros, dados persistidos e experiência em telas pequenas. Esses detalhes fazem a diferença entre um exercício isolado e um produto utilizável.', 'Use o modo Projeto guiado à direita: o mesmo código continua disponível em todas as aulas. Revise os marcos anteriores e documente o que você aprendeu.'],
        ['CRUD local','DOM e eventos','persistência','responsividade','revisão'],
        `// Checklist: cadastrar, concluir, filtrar, excluir e persistir.\n// Implemente cada funcionalidade no projeto compartilhado.`,
        'Finalize e demonstre o TaskFlow: uma aplicação de tarefas de ponta a ponta.',
        ['Cadastre, conclua e exclua tarefas.', 'Filtre por status e persista dados.', 'Teste na prévia em modo mobile.'],
        `console.log('Vá até a aba PROJETO GUIADO para desenvolver o TaskFlow completo.');`,undefined,undefined,
        'Conclua o produto com funcionalidades reais e teste cada fluxo.'),
      lesson('proximos-passos','Git, publicação e caminho para TypeScript','Transforme o aprendizado em portfólio.',20,
        ['Git registra versões do seu projeto; GitHub permite hospedar o repositório. Antes de publicar, garanta que segredos não estejam no código.', 'Um site estático pode ser publicado com GitHub Pages, Vercel ou Netlify. Confira base de caminhos, build e comportamento em dispositivos reais.', 'Depois de dominar JavaScript, TypeScript acrescenta tipos ao processo de desenvolvimento. Ele melhora feedback de erros e manutenção, mas não substitui a compreensão de JS.'],
        ['Git e commits','README','deploy estático','portfólio','TypeScript'],
        `// Próxima etapa: extrair funções, versionar no Git\n// e transformar seu projeto em portfólio.`,
        'Escreva um pequeno README do TaskFlow e faça uma lista de melhorias futuras.',
        ['Descreva propósito e funcionalidades.', 'Liste como executar localmente.', 'Escolha 3 melhorias para uma versão 2.0.'],
        `document.querySelector('#result').textContent = 'Meu próximo passo: publicar um projeto autoral!';`,undefined,undefined,
        'Prepare uma apresentação de 2 minutos mostrando o problema, a solução e o código.')
    ]
  }
];

export const tsUnits = [
  { id:'ts-fundamentos',title:'01. TypeScript depois do JavaScript',subtitle:'Tipagem como ferramenta para sistemas maiores.',lessons:[
    lesson('ts-intro','Por que TypeScript?','Entenda a relação entre JS, TS e compilação.',16,
      ['TypeScript é JavaScript com um sistema de tipos estáticos. O navegador não executa anotações de tipo diretamente: o código TS é convertido em JavaScript antes da execução.', 'A tipagem ajuda a detectar erros durante o desenvolvimento. Ela não garante que os dados recebidos de APIs sejam válidos em tempo de execução.', 'Neste laboratório, a aba app.ts é transpilada automaticamente para JavaScript e executada na prévia.'],
      ['compilação','tipos estáticos','JS versus TS','checagem'],
      `const nome: string = 'Ana';\nconst idade: number = 25;\nconsole.log(nome, idade);`,
      'Defina variáveis tipadas e exiba uma apresentação com nome e horas de estudo.',
      ['Use string e number.', 'Monte um template literal.', 'Altere #result com a mensagem.'],
      `const nome: string = 'Pessoa estudante';\nconst horas: number = 2;\n// TODO: exiba a mensagem tipada no #result.`,undefined,undefined,
      'Crie uma cópia tipada do modelo de tarefas, sem apagar o projeto JavaScript.'),
    lesson('ts-tipos','Tipos, arrays e inferência','Descreva dados de forma segura.',19,
      ['TypeScript pode inferir o tipo a partir do valor inicial. Anotações explícitas são úteis nas fronteiras do programa, sobretudo em parâmetros e retornos.', 'Arrays podem ser number[] ou Array<number>. Union types permitem vários formatos: number | null.', 'Evite any, porque ele desativa verificações. unknown requer validação antes do uso.'],
      ['inferência','tipos primitivos','arrays tipados','union','unknown'],
      `const pontos: number[] = [8, 10, 7];\nconst media: number = pontos.reduce((s, n) => s + n, 0) / pontos.length;`,
      'Crie um array de notas tipado e calcule a média.',
      ['Use number[].', 'Implemente o cálculo.', 'Exiba o resultado na página.'],
      `const notas: number[] = [8, 9, 10];\n// TODO: calcule a média.`,undefined,undefined,
      'Tipifique os estados e arrays usados no TaskFlow.'),
    lesson('ts-interfaces','type, interface e objetos','Modele contratos de dados.',22,
      ['type e interface descrevem a estrutura de valores. Para modelos de objetos, as duas construções funcionam bem na maioria dos casos.', 'Propriedades opcionais recebem ?, e unions restringem valores possíveis, como status: "pendente" | "concluida".', 'Modelos claros ajudam seu editor a sugerir propriedades e apontar erros de digitação.'],
      ['type','interface','? opcional','union de literais'],
      `interface Tarefa { id: number; titulo: string; concluida: boolean; }\nconst tarefa: Tarefa = { id: 1, titulo: 'Estudar', concluida: false };`,
      'Declare uma interface Tarefa e mostre na tela os objetos criados a partir dela.',
      ['Declare interface Tarefa.', 'Crie Tarefa[].', 'Use forEach e exiba títulos.'],
      `interface Tarefa { id: number; titulo: string; concluida: boolean; }\nconst tarefas: Tarefa[] = [{ id: 1, titulo: 'Estudar TS', concluida: false }];\n// TODO: renderize os títulos.`,undefined,undefined,
      'Defina a interface Tarefa e o tipo de prioridade do projeto.'),
    lesson('ts-funcoes','Funções tipadas e DOM','Proteja entradas e saídas.',24,
      ['Tipar parâmetros e retornos mostra o contrato de uma função. Uma função que não retorna valor costuma usar void.', 'querySelector pode devolver null, porque o elemento pode não existir. Faça verificação antes de acessar textContent ou addEventListener.', 'Use narrowing (typeof, if, instanceof) para trabalhar com valores que podem ter mais de um tipo.'],
      ['param: type','return type','null checks','narrowing','DOM'],
      `function dobro(numero: number): number { return numero * 2; }\nconst campo = document.querySelector('#result');\nif (campo) campo.textContent = String(dobro(3));`,
      'Crie uma função tipada que calcula percentual e atualize o DOM com verificação de null.',
      ['Tipifique parâmetros e retorno.', 'Evite divisão por zero.', 'Verifique se #result existe.'],
      `function percentual(parte: number, total: number): number {\n  // TODO: implemente\n  return 0;\n}\nconst elemento = document.querySelector('#result');\n// TODO: atualize somente se existir.`,undefined,undefined,
      'Migre as funções principais do TaskFlow de JavaScript para TypeScript.'),
    lesson('ts-generics','Generics e próximos passos','Reutilize funções preservando os tipos.',24,
      ['Generics permitem escrever funções reutilizáveis sem perder informações de tipo. A função identidade<T>(valor: T): T devolve o mesmo tipo recebido.', 'O TypeScript também oferece utility types como Partial<T>, Pick<T, K> e Omit<T, K> para reutilizar modelos.', 'Quando estiver confortável, avance para TypeScript com React, APIs tipadas, testes e validação de dados no backend.'],
      ['generics <T>','Partial','Pick','tipagem de APIs'],
      `function primeiro<T>(itens: T[]): T | undefined { return itens[0]; }\nconsole.log(primeiro([1, 2, 3]));`,
      'Crie uma função genérica que retorne o primeiro item de um array ou undefined.',
      ['Use <T>.', 'Tipifique o argumento como T[].', 'Teste com strings e números.'],
      `function primeiro<T>(itens: T[]): T | undefined {\n  // TODO: retorne o primeiro item\n  return undefined;\n}\nconsole.log(primeiro<string>(['JS', 'TS']));`,undefined,undefined,
      'Prepare o TaskFlow tipado para ser dividido em módulos e futuramente integrado a um backend.')
  ]}
];

// Aulas com contratos verificáveis: desafio e editor solicitam exatamente a mesma API.
for (const unit of [...jsUnits, ...tsUnits]) {
  for (const item of unit.lessons) {
    const contract = lessonContracts[item.id];
    if (!contract) continue;
    item.challenge = contract.challenge;
    item.steps = contract.steps;
    item.starter = {...item.starter, js: contract.starter};
  }
}

export const allJsLessons = jsUnits.flatMap(unit => unit.lessons.map((item,i) => ({ ...item, unitId:unit.id, unitTitle:unit.title, unitIndex: jsUnits.indexOf(unit), lessonIndex:i, language:'js' })));
export const allTsLessons = tsUnits.flatMap(unit => unit.lessons.map((item,i) => ({ ...item, unitId:unit.id, unitTitle:unit.title, unitIndex:tsUnits.indexOf(unit), lessonIndex:i, language:'ts' })));
export const allLessons = [...allJsLessons, ...allTsLessons];

export const projectStarter = {
  html: `<div class="shell">\n  <header class="header">\n    <div class="brand">◈ <span>TaskFlow</span></div>\n    <span class="pill">Meu primeiro produto web</span>\n  </header>\n  <main>\n    <section class="intro">\n      <p class="kicker">FOCO NO QUE IMPORTA</p>\n      <h1>Um dia de cada vez.</h1>\n      <p>Organize suas tarefas e transforme planos em progresso.</p>\n    </section>\n    <section class="panel">\n      <div class="panel-header"><h2>Minhas tarefas</h2><strong id="count">0 tarefas</strong></div>\n      <form id="task-form">\n        <label class="sr-only" for="task-input">Nova tarefa</label>\n        <input id="task-input" placeholder="O que você precisa fazer?" required />\n        <button type="submit">Adicionar</button>\n      </form>\n      <p id="feedback" aria-live="polite"></p>\n      <div class="filters">\n        <button type="button" class="active" data-filter="todas">Todas</button>\n        <button type="button" data-filter="pendentes">Pendentes</button>\n        <button type="button" data-filter="concluidas">Concluídas</button>\n      </div>\n      <ul id="tasks"></ul>\n      <p id="empty">Nenhuma tarefa neste filtro. Que tal começar?</p>\n    </section>\n  </main>\n</div>`,
  css: `*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#f2f5fb;color:#16213c}button,input{font:inherit}.shell{max-width:900px;margin:0 auto;padding:24px}.header{display:flex;justify-content:space-between;align-items:center;padding:15px 0 28px}.brand{font-weight:900;font-size:22px;color:#3159de}.brand span{color:#16213c}.pill{background:#e2eafc;color:#3159de;border-radius:20px;padding:8px 12px;font-size:12px;font-weight:700}.intro{margin-bottom:25px}.kicker{color:#3159de;font-weight:800;letter-spacing:2px;font-size:11px}.intro h1{font-size:clamp(30px,6vw,48px);margin:8px 0}.intro p{color:#68778f}.panel{background:#fff;padding:25px;border-radius:18px;box-shadow:0 15px 45px #1724490c}.panel-header{display:flex;align-items:center;justify-content:space-between}.panel h2{margin:0 0 20px}.panel strong{color:#64748b;font-size:13px}form{display:flex;gap:9px}input{flex:1;min-width:0;padding:13px 14px;border:1px solid #cad4e4;border-radius:9px}form button{border:0;background:#3159de;color:#fff;border-radius:9px;padding:12px 18px;font-weight:750;cursor:pointer}.filters{display:flex;gap:8px;margin:22px 0 10px}.filters button{border:1px solid #e4e9f4;background:#fff;border-radius:8px;padding:8px 11px;cursor:pointer}.filters button.active{background:#e8edff;color:#3159de;border-color:#c7d3ff}ul{padding:0;list-style:none}li{display:flex;align-items:center;justify-content:space-between;gap:8px;border-bottom:1px solid #eef1f7;padding:12px 4px}li.done .label{text-decoration:line-through;color:#9aa6b7}.task-actions{display:flex;gap:6px}.task-actions button{border:1px solid #e2e8f0;background:#fff;padding:6px 9px;border-radius:7px;cursor:pointer}#empty{color:#94a3b8;text-align:center;padding:25px 0}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media(max-width:600px){.shell{padding:14px}.panel{padding:18px}.pill{display:none}form{flex-direction:column}}`,
  js: `// TaskFlow · projeto guiado e evolutivo
// Este é o PONTO DE PARTIDA, não a solução final.
// Você implementará novas funcionalidades conforme avança nas aulas.

// FASE 1: defina informações básicas e explore o console.
const nomeDoProjeto = 'TaskFlow';
console.log(nomeDoProjeto, 'foi carregado!');

// FASE 2: crie funções para suas regras e cálculos.
function mensagemDeBoasVindas() {
  return 'Bem-vindo ao ' + nomeDoProjeto;
}

// FASE 3: comece com um array, depois use objetos.
let tarefas = [];
let filtroAtual = 'todas';

// FASE 4: renderize cada tarefa no DOM.
function renderizarTarefas() {
  const lista = document.querySelector('#tasks');
  lista.replaceChildren();

  // TODO (Arrays + DOM): percorra tarefas e crie os elementos <li>.
  // TODO (Funções): conte tarefas concluídas.
  document.querySelector('#count').textContent = tarefas.length + ' tarefa(s)';
  document.querySelector('#empty').hidden = tarefas.length > 0;
}

// FASE 4: conecte o formulário ao array de tarefas.
document.querySelector('#task-form').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const titulo = document.querySelector('#task-input').value.trim();
  if (!titulo) return;

  // TODO (Objetos + Eventos): adicione uma nova tarefa ao array.
  // TODO (Persistência): salve no localStorage.
  document.querySelector('#feedback').textContent =
    'Próxima missão: implemente o cadastro em JavaScript!';
});

// FASE 4: faça os botões controlarem o filtro.
document.querySelectorAll('[data-filter]').forEach((botao) => {
  botao.addEventListener('click', () => {
    filtroAtual = botao.dataset.filter;
    document.querySelectorAll('[data-filter]')
      .forEach(item => item.classList.remove('active'));
    botao.classList.add('active');
    // TODO (filter): exiba apenas as tarefas do filtro selecionado.
    renderizarTarefas();
  });
});

// FASE 5: persista os dados e trate falhas.
// TODO: criar salvarTarefas() e carregarTarefas().

renderizarTarefas();`
};

export const typescriptProjectStarter = {
  html: `<main class="app"><span class="eyebrow">TypeScript</span><h1 id="title">TaskFlow tipado</h1><p id="result">Uma nova etapa do seu projeto.</p><ul id="list"></ul><button id="action">Adicionar tarefa</button></main>`,
  css: baseCss,
  ts: `interface Tarefa {\n  id: number;\n  titulo: string;\n  concluida: boolean;\n}\n\nconst tarefas: Tarefa[] = [{ id: 1, titulo: 'Revisar JavaScript', concluida: true }];\nconst lista = document.querySelector('#list');\n\nfunction renderizar(): void {\n  if (!lista) return;\n  lista.replaceChildren();\n  for (const tarefa of tarefas) {\n    const li = document.createElement('li');\n    li.textContent = tarefa.titulo;\n    lista.append(li);\n  }\n}\n\ndocument.querySelector('#action')?.addEventListener('click', () => {\n  tarefas.push({ id: Date.now(), titulo: 'Praticar TypeScript', concluida: false });\n  renderizar();\n});\n\nrenderizar();`
};
