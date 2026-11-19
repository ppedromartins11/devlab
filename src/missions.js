/** Oficina DevLab — missões originais com contratos verificáveis.
 * O aluno escreve funções JavaScript; a aprovação depende da saída, não de palavras-chave.
 */
export const missions = [
  {
    id: 'maior-numero', type: 'build', level: 'Fundamentos', duration: 15,
    title: 'Encontre o maior número',
    summary: 'Receba um array de números e retorne o maior valor sem alterar o array original.',
    context: 'Uma tabela de pontuações precisa identificar o melhor resultado, inclusive quando todos os valores são negativos.',
    functionName: 'maiorNumero', signature: 'maiorNumero(numeros)',
    requirements: ['Receber um array não vazio de números.', 'Retornar o maior número, incluindo valores negativos.', 'Não modificar o array recebido.'],
    starter: `function maiorNumero(numeros) {\n  // Escreva sua lógica aqui.\n}\n`,
    hint: 'Comece com o primeiro item como maior valor conhecido. Compare com os demais usando um loop.',
    explanation: 'Percorra o array e atualize uma variável quando encontrar um número maior. Cuidado com o valor inicial: usar zero falha para arrays negativos.',
    tests: [
      { label: 'Números positivos', args: [[3, 11, 4, 9]], expected: 11 },
      { label: 'Números negativos', args: [[-15, -2, -9]], expected: -2 },
      { label: 'Um único valor', args: [[42]], expected: 42 },
      { label: 'Decimais e repetição', args: [[1.5, 4.25, 4.25, -1]], expected: 4.25 },
      { label: 'Não alterar o array original', args: [[8, 2, 5]], expected: 8, unchangedArgs: true }
    ]
  },
  {
    id: 'conversor-celsius', type: 'build', level: 'Lógica e funções', duration: 15,
    title: 'Converta Celsius em Fahrenheit',
    summary: 'Implemente a conversão numérica usando a fórmula correta.',
    context: 'Uma aplicação meteorológica recebe temperaturas em Celsius e precisa exibi-las em Fahrenheit.',
    functionName: 'celsiusParaFahrenheit', signature: 'celsiusParaFahrenheit(celsius)',
    requirements: ['Receber um número em Celsius.', 'Retornar o número equivalente em Fahrenheit.', 'Funcionar com zero, temperaturas negativas e decimais.'],
    starter: `function celsiusParaFahrenheit(celsius) {\n  // Fahrenheit = Celsius * 9 / 5 + 32\n}\n`,
    hint: 'Não arredonde o resultado. Primeiro multiplique Celsius por 9/5 e depois some 32.',
    explanation: 'A fórmula é F = C × 9/5 + 32. Teste números negativos e valores que geram frações.',
    tests: [
      { label: 'Ponto de congelamento', args: [0], expected: 32 },
      { label: 'Ponto de ebulição', args: [100], expected: 212 },
      { label: 'Mesmo valor nas duas escalas', args: [-40], expected: -40 },
      { label: 'Valor decimal', args: [22.5], expected: 72.5 },
      { label: 'Outro valor negativo', args: [-10], expected: 14 }
    ]
  },
  {
    id: 'contar-pares', type: 'debug', level: 'Debugging', duration: 20,
    title: 'O contador de pares está errado',
    summary: 'Investigue o código existente e corrija o defeito sem alterar o contrato da função.',
    context: 'Um relatório mostra a quantidade errada de números pares. O código executa sem lançar exceções, mas o resultado não é confiável.',
    functionName: 'contarPares', signature: 'contarPares(numeros)',
    requirements: ['Retornar a quantidade de números pares.', 'Contar zero como número par.', 'Não modificar o array original.'],
    starter: `function contarPares(numeros) {\n  let total = 0;\n  for (const numero of numeros) {\n    if (numero % 2 !== 0) {\n      total++;\n    }\n  }\n  return total;\n}\n`,
    hint: 'Observe a condição dentro do if. Experimente a função com [2, 4] e com [1, 3].',
    explanation: 'Um número é par quando o resto da divisão por 2 é zero. O bug estava no operador de comparação.',
    tests: [
      { label: 'Apenas pares', args: [[2, 4, 6]], expected: 3 },
      { label: 'Apenas ímpares', args: [[1, 3, 5]], expected: 0 },
      { label: 'Array vazio', args: [[]], expected: 0 },
      { label: 'Zeros e negativos', args: [[0, -2, -3, 9]], expected: 2 },
      { label: 'Lista mista', args: [[7, 8, 10, 11, 12]], expected: 3 }
    ]
  },
  {
    id: 'calcular-desconto', type: 'debug', level: 'Debugging', duration: 20,
    title: 'O desconto está dez vezes maior',
    summary: 'Encontre o erro de cálculo que está gerando totais incorretos.',
    context: 'Uma loja aplica descontos percentuais. O desconto de 10% sobre R$ 100 deveria resultar em R$ 90.',
    functionName: 'precoComDesconto', signature: 'precoComDesconto(preco, percentual)',
    requirements: ['Receber preço e percentual de desconto.', 'Retornar o valor após aplicar a porcentagem.', 'Tratar desconto de 0% e 100%.'],
    starter: `function precoComDesconto(preco, percentual) {\n  const desconto = preco * (percentual / 10);\n  return preco - desconto;\n}\n`,
    hint: 'Percentual significa divisão por cem, não por dez. Compare 10% de 100 com 10% de 50.',
    explanation: 'O desconto correto é preço × percentual / 100. Depois subtraia esse valor do preço inicial.',
    tests: [
      { label: 'Desconto de 10%', args: [100, 10], expected: 90 },
      { label: 'Sem desconto', args: [87, 0], expected: 87 },
      { label: 'Desconto integral', args: [25, 100], expected: 0 },
      { label: 'Metade do valor', args: [250, 50], expected: 125 },
      { label: 'Desconto decimal', args: [80, 12.5], expected: 70 }
    ]
  },
  {
    id: 'total-carrinho', type: 'autonomy', level: 'Avaliação independente', duration: 35,
    title: 'Calcule o total de um carrinho',
    summary: 'Sem código inicial: defina a lógica, escreva a função e valide casos-limite.',
    context: 'Uma pequena loja precisa calcular o total de itens comprados. Cada item contém preco e quantidade.',
    functionName: 'totalCarrinho', signature: 'totalCarrinho(itens)',
    requirements: ['Crie uma função chamada totalCarrinho.', 'Receba um array com objetos { preco, quantidade }.', 'Some preco × quantidade para cada item.', 'Retorne zero quando o carrinho estiver vazio.', 'Não altere os itens recebidos.'],
    starter: '',
    hint: 'Pense no acumulador antes de escrever. O que deve acontecer quando o array está vazio?',
    explanation: 'Uma solução possível percorre os itens com reduce ou for...of e acumula preco × quantidade, iniciando a soma em zero.',
    tests: [
      { label: 'Carrinho vazio', args: [[]], expected: 0 },
      { label: 'Um produto', args: [[{preco: 12, quantidade: 3}]], expected: 36 },
      { label: 'Vários produtos', args: [[{preco: 10, quantidade: 2},{preco: 7, quantidade: 3}]], expected: 41 },
      { label: 'Quantidade zero', args: [[{preco: 9, quantidade: 0}]], expected: 0 },
      { label: 'Valores decimais', args: [[{preco: 2.5, quantidade: 2},{preco: 1.25, quantidade: 4}]], expected: 10 },
      { label: 'Não alterar os itens', args: [[{preco: 5, quantidade: 4}]], expected: 20, unchangedArgs: true }
    ]
  },
  {
    id: 'filtrar-tarefas', type: 'autonomy', level: 'Avaliação independente', duration: 40,
    title: 'Filtre as tarefas pendentes',
    summary: 'Construa uma função do zero a partir apenas dos requisitos de um cliente.',
    context: 'O TaskFlow precisa listar somente os títulos das tarefas que ainda não foram concluídas.',
    functionName: 'titulosPendentes', signature: 'titulosPendentes(tarefas)',
    requirements: ['Crie a função titulosPendentes.', 'Receba objetos com titulo e concluida.', 'Retorne um novo array de strings apenas com títulos não concluídos.', 'Mantenha a ordem original.', 'Não modifique o array de entrada.'],
    starter: '',
    hint: 'Você pode usar filter e map. Primeiro selecione tarefas com concluida === false; depois extraia titulo.',
    explanation: 'A combinação filter + map separa a seleção dos dados de sua transformação em um novo array.',
    tests: [
      { label: 'Mistura de tarefas', args: [[{titulo:'Estudar',concluida:false},{titulo:'Dormir',concluida:true}]], expected: ['Estudar'] },
      { label: 'Nenhuma pendência', args: [[{titulo:'A',concluida:true}]], expected: [] },
      { label: 'Array vazio', args: [[]], expected: [] },
      { label: 'Mantém a ordem', args: [[{titulo:'A',concluida:false},{titulo:'B',concluida:false},{titulo:'C',concluida:true}]], expected: ['A','B'] },
      { label: 'Entrada preservada', args: [[{titulo:'Pendente',concluida:false}]], expected: ['Pendente'], unchangedArgs: true }
    ]
  }
];

export const findMission = id => missions.find(m => m.id === id);
export const missionCategories = [
  {id:'build',label:'Implementar',description:'Você escreve a lógica a partir de um contrato.'},
  {id:'debug',label:'Depurar',description:'Você encontra e corrige um defeito real.'},
  {id:'autonomy',label:'Autonomia',description:'Só requisitos, sem função pronta ou solução guiada.'}
];
