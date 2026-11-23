/** DevLab 21: microdesafios autorais de leitura e completude de código. Não executam código. */
export const microChallenges = Object.freeze({
  "primeiros-passos": {
    "lessonId": "primeiros-passos",
    "language": "JavaScript",
    "title": "Seu primeiro comando",
    "prompt": "Complete o método que mostra a mensagem no console do navegador.",
    "snippet": "const mensagem = 'Olá, DevLab';\nconsole.____(mensagem);",
    "answers": [
      "log"
    ],
    "hints": [
      "A linha envia uma informação para a área de mensagens do navegador.",
      "O método pertence ao objeto console e possui três letras."
    ],
    "explanation": "console.log escreve valores no console para ajudar a entender o programa durante o desenvolvimento.",
    "suggestions": [
      "log",
      "print",
      "echo"
    ]
  },
  "variaveis": {
    "lessonId": "variaveis",
    "language": "JavaScript",
    "title": "Identifique o valor",
    "prompt": "Complete a instrução para exibir a variável que já foi declarada.",
    "snippet": "const pontos = 12;\nconsole.log(____);",
    "answers": [
      "pontos"
    ],
    "hints": [
      "Variáveis armazenam valores que podem ser usados em outras instruções.",
      "O argumento de console.log deve ser o identificador da variável, sem aspas."
    ],
    "explanation": "Usar o identificador recupera o valor; colocar o nome entre aspas exibiria um texto literal.",
    "suggestions": [
      "pontos",
      "'pontos'",
      "window"
    ]
  },
  "condicionais": {
    "lessonId": "condicionais",
    "language": "JavaScript",
    "title": "Monte a condição",
    "prompt": "Complete o operador para testar se a idade é de pelo menos 18 anos.",
    "snippet": "const idade = 18;\nif (idade ____ 18) {\n  console.log('Maior de idade');\n}",
    "answers": [
      ">="
    ],
    "hints": [
      "A comparação precisa incluir o valor limite.",
      "O símbolo '>' sozinho não inclui a idade 18."
    ],
    "explanation": "O operador >= verifica se o primeiro valor é maior ou igual ao segundo."
  },
  "arrays": {
    "lessonId": "arrays",
    "language": "JavaScript",
    "title": "Acrescente um item",
    "prompt": "Complete o método que modifica o array adicionando uma tarefa ao final.",
    "snippet": "const tarefas = ['Ler'];\ntarefas.____('Praticar');",
    "answers": [
      "push"
    ],
    "hints": [
      "Um array possui métodos próprios para alterar os elementos.",
      "A operação pedida insere no final, sem criar uma cópia."
    ],
    "explanation": "push adiciona valores ao final do array original."
  },
  "funcoes": {
    "lessonId": "funcoes",
    "language": "JavaScript",
    "title": "Devolva um resultado",
    "prompt": "Complete a palavra que retorna o dobro calculado pela função.",
    "snippet": "function dobrar(n) {\n  ____ n * 2;\n}",
    "answers": [
      "return"
    ],
    "hints": [
      "A função precisa entregar o valor ao chamador.",
      "console.log escreve na tela, mas não devolve o resultado."
    ],
    "explanation": "return encerra aquela execução da função e entrega o valor ao chamador."
  },
  "assincrono": {
    "lessonId": "assincrono",
    "language": "JavaScript",
    "title": "Espere pela Promise",
    "prompt": "Complete a palavra que aguarda o resultado dentro de uma função async.",
    "snippet": "async function obter() {\n  const dados = ____ Promise.resolve('ok');\n  return dados;\n}",
    "answers": [
      "await"
    ],
    "hints": [
      "Pense na palavra-chave usada dentro de funções async.",
      "Ela aguarda o assentamento de um resultado assíncrono."
    ],
    "explanation": "await aguarda a Promise, sem bloquear a thread inteira."
  },
  "js-closures": {
    "lessonId": "js-closures",
    "language": "JavaScript",
    "title": "Estado preservado",
    "prompt": "Qual palavra declara a variável de estado no escopo da fábrica, permitindo a reatribuição?",
    "snippet": "function criarContador() {\n  ____ atual = 0;\n  return () => ++atual;\n}",
    "answers": [
      "let"
    ],
    "hints": [
      "A variável precisa mudar quando a função retornada for chamada.",
      "const impede a reatribuição do próprio valor."
    ],
    "explanation": "let cria uma vinculação local que pode ser reatribuída e permanecer acessível pela closure."
  },
  "ts-intro": {
    "lessonId": "ts-intro",
    "language": "TypeScript",
    "title": "Tipo do parâmetro",
    "prompt": "Complete o tipo de um parâmetro que recebe horas inteiras ou decimais.",
    "snippet": "function dobrar(horas: ____): number {\n  return horas * 2;\n}",
    "answers": [
      "number"
    ],
    "hints": [
      "TypeScript possui um tipo para dados numéricos.",
      "O tipo é o mesmo para 3 e 3.5."
    ],
    "explanation": "number descreve números em TypeScript; não existe um tipo int separado.",
    "suggestions": [
      "number",
      "string",
      "boolean"
    ]
  },
  "ts-interfaces": {
    "lessonId": "ts-interfaces",
    "language": "TypeScript",
    "title": "Descreva um objeto",
    "prompt": "Complete a palavra reservada usada para definir a estrutura de um objeto.",
    "snippet": "____ Tarefa {\n  titulo: string;\n  concluida: boolean;\n}",
    "answers": [
      "interface"
    ],
    "hints": [
      "Não se trata de criar uma instância do objeto.",
      "Essa declaração informa quais campos o objeto deve ter."
    ],
    "explanation": "interface define um contrato estrutural de propriedades e métodos."
  },
  "ts-generics": {
    "lessonId": "ts-generics",
    "language": "TypeScript",
    "title": "Preserve o tipo",
    "prompt": "Complete o tipo genérico de retorno quando uma função recebe um valor do tipo T.",
    "snippet": "function identidade<T>(valor: T): ____ {\n  return valor;\n}",
    "answers": [
      "T"
    ],
    "hints": [
      "O retorno deve ter exatamente o tipo de entrada, sem usar any.",
      "O identificador genérico foi declarado entre < e >."
    ],
    "explanation": "T relaciona o tipo de entrada ao tipo de saída."
  },
  "ts-config": {
    "lessonId": "ts-config",
    "language": "TypeScript",
    "title": "Validação sem arquivos",
    "prompt": "Complete a opção que verifica os tipos sem emitir JavaScript.",
    "snippet": "tsc --____",
    "answers": [
      "noEmit"
    ],
    "hints": [
      "O compilador pode analisar sem produzir saída compilada.",
      "A flag impede a emissão de arquivos e começa com a palavra no."
    ],
    "explanation": "--noEmit executa a análise do TypeScript sem gerar arquivos JavaScript."
  },
  "py-intro": {
    "lessonId": "py-intro",
    "language": "Python",
    "title": "Use uma variável",
    "prompt": "Complete a expressão para imprimir o valor da variável, não o texto do nome.",
    "snippet": "nome = 'Ada'\nprint(____)",
    "answers": [
      "nome"
    ],
    "hints": [
      "O valor já foi atribuído à variável na primeira linha.",
      "Não coloque aspas ao redor do identificador."
    ],
    "explanation": "O identificador nome referencia a string armazenada na variável.",
    "suggestions": [
      "nome",
      "'nome'",
      "print"
    ]
  },
  "py-decisions": {
    "lessonId": "py-decisions",
    "language": "Python",
    "title": "Teste um limite",
    "prompt": "Complete o operador para aceitar notas iguais ou superiores a sete.",
    "snippet": "nota = 7\nif nota ____ 7:\n    print('Atingiu o objetivo')",
    "answers": [
      ">="
    ],
    "hints": [
      "Considere explicitamente o caso em que nota é exatamente 7.",
      "O operador deve permitir igualdade."
    ],
    "explanation": "O operador >= cobre o limite e os valores maiores."
  },
  "py-functions": {
    "lessonId": "py-functions",
    "language": "Python",
    "title": "Devolva um valor",
    "prompt": "Complete a instrução que entrega a média calculada para quem chamou a função.",
    "snippet": "def media(a, b):\n    ____ (a + b) / 2",
    "answers": [
      "return"
    ],
    "hints": [
      "Essa função deve devolver o resultado, e não apenas imprimi-lo.",
      "A palavra-chave encerra a função com um valor."
    ],
    "explanation": "return devolve a média ao código que chamou a função."
  },
  "py-dataclasses": {
    "lessonId": "py-dataclasses",
    "language": "Python",
    "title": "Crie uma dataclass",
    "prompt": "Complete o decorador que gera métodos úteis para uma classe de dados.",
    "snippet": "from dataclasses import dataclass\n\n@____\nclass Pessoa:\n    nome: str",
    "answers": [
      "dataclass"
    ],
    "hints": [
      "O nome está no módulo importado na primeira linha.",
      "A anotação começa com @, mas digite só o identificador."
    ],
    "explanation": "@dataclass gera inicialização e representação para uma classe de dados."
  },
  "java-intro": {
    "lessonId": "java-intro",
    "language": "Java",
    "title": "Imprima uma linha",
    "prompt": "Complete o método que escreve uma mensagem seguida de quebra de linha.",
    "snippet": "public class Main {\n  public static void main(String[] args) {\n    System.out.____(\"Olá\");\n  }\n}",
    "answers": [
      "println"
    ],
    "hints": [
      "System.out fornece operações para saída padrão.",
      "O nome termina com ln para mudar de linha."
    ],
    "explanation": "println escreve o conteúdo e avança para a linha seguinte.",
    "suggestions": [
      "println",
      "log",
      "echo"
    ]
  },
  "java-control": {
    "lessonId": "java-control",
    "language": "Java",
    "title": "Compare texto",
    "prompt": "Complete o método que compara o conteúdo de duas Strings.",
    "snippet": "String a = \"Ana\";\nString b = new String(\"Ana\");\nboolean iguais = a.____(b);",
    "answers": [
      "equals"
    ],
    "hints": [
      "Para objetos, == pode comparar referências em vez de conteúdo.",
      "Esse método é definido pela classe String."
    ],
    "explanation": "equals compara os caracteres da String e não a referência do objeto."
  },
  "java-objects": {
    "lessonId": "java-objects",
    "language": "Java",
    "title": "Proteja um campo",
    "prompt": "Complete o modificador que impede acesso direto ao atributo a partir de outras classes.",
    "snippet": "class Tarefa {\n  ____ String titulo;\n}",
    "answers": [
      "private"
    ],
    "hints": [
      "Pense em encapsulamento: outros objetos devem usar métodos controlados.",
      "O modificador limita o acesso à própria classe."
    ],
    "explanation": "private restringe acesso direto ao membro da classe."
  },
  "java-streams": {
    "lessonId": "java-streams",
    "language": "Java",
    "title": "Selecione itens",
    "prompt": "Complete a operação intermediária que mantém apenas números positivos.",
    "snippet": "List<Integer> valores = List.of(-2, 3, 8);\nvar positivos = valores.stream().____(n -> n > 0).toList();",
    "answers": [
      "filter"
    ],
    "hints": [
      "A operação deve excluir, não transformar, os valores.",
      "A condição é fornecida por um predicado booleano."
    ],
    "explanation": "filter mantém os elementos para os quais o predicado retorna true."
  },
  "php-servidor": {
    "lessonId": "php-servidor",
    "language": "PHP",
    "title": "Produza saída",
    "prompt": "Complete a construção do PHP que envia um texto ao resultado da página.",
    "snippet": "<?php\n____ 'Olá, DevLab';",
    "answers": [
      "echo"
    ],
    "hints": [
      "PHP processa o arquivo no servidor e produz uma resposta.",
      "A palavra tem quatro letras e escreve uma expressão na saída."
    ],
    "explanation": "echo emite a expressão na saída da resposta PHP.",
    "suggestions": [
      "echo",
      "console.log",
      "write"
    ]
  },
  "php-variaveis": {
    "lessonId": "php-variaveis",
    "language": "PHP",
    "title": "Acesse uma variável",
    "prompt": "Complete a expressão que contém o valor atribuído anteriormente.",
    "snippet": "<?php\n$nome = 'Ana';\necho ____;",
    "answers": [
      "$nome"
    ],
    "hints": [
      "Uma variável em PHP tem um prefixo especial.",
      "Não use aspas; queremos o conteúdo guardado."
    ],
    "explanation": "$nome referencia o valor armazenado na variável PHP."
  },
  "php-condicoes": {
    "lessonId": "php-condicoes",
    "language": "PHP",
    "title": "Condição segura",
    "prompt": "Complete o operador de comparação estrita de valor e tipo.",
    "snippet": "<?php\n$codigo = 10;\nif ($codigo ____ 10) {\n  echo 'Igual';\n}",
    "answers": [
      "==="
    ],
    "hints": [
      "Compare tipo e valor ao mesmo tempo.",
      "O PHP oferece == e ===; somente um verifica também o tipo."
    ],
    "explanation": "=== exige que os dois operandos tenham o mesmo tipo e valor."
  },
  "php-pdo-preparado": {
    "lessonId": "php-pdo-preparado",
    "language": "PHP",
    "title": "Prepare SQL",
    "prompt": "Complete o método do PDO usado para preparar uma instrução com parâmetros.",
    "snippet": "<?php\n$stmt = $pdo->____('SELECT * FROM itens WHERE id = ?');",
    "answers": [
      "prepare"
    ],
    "hints": [
      "O método prepara o SQL antes de enviar os valores.",
      "Depois de criar o statement, usa-se execute para fornecer os parâmetros."
    ],
    "explanation": "prepare cria uma instrução preparada para uso com valores parametrizados."
  },
  "sql-intro": {
    "lessonId": "sql-intro",
    "language": "SQL",
    "title": "Escolha a coluna",
    "prompt": "Complete a coluna que a consulta deve retornar.",
    "snippet": "SELECT ____ FROM pessoas;",
    "answers": [
      "nome"
    ],
    "hints": [
      "Na consulta, SELECT indica os dados desejados.",
      "Não digite um valor literal: queremos o nome da coluna."
    ],
    "explanation": "SELECT nome retorna os valores dessa coluna nas linhas de pessoas.",
    "suggestions": [
      "nome",
      "pessoas",
      "texto"
    ]
  },
  "sql-filter": {
    "lessonId": "sql-filter",
    "language": "SQL",
    "title": "Filtre os registros",
    "prompt": "Complete a cláusula que restringe o resultado a preços positivos.",
    "snippet": "SELECT * FROM produtos\n____ preco > 0;",
    "answers": [
      "WHERE"
    ],
    "hints": [
      "Essa cláusula vem depois de FROM.",
      "Ela define a condição que as linhas devem satisfazer."
    ],
    "explanation": "WHERE filtra linhas conforme uma condição booleana."
  },
  "sql-joins": {
    "lessonId": "sql-joins",
    "language": "SQL",
    "title": "Preserve todos os clientes",
    "prompt": "Complete o tipo de JOIN que inclui clientes sem pedidos.",
    "snippet": "SELECT c.nome, p.id\nFROM clientes c\n____ JOIN pedidos p ON p.cliente_id = c.id;",
    "answers": [
      "LEFT"
    ],
    "hints": [
      "INNER descarta os clientes sem correspondência.",
      "A tabela que deve ser preservada está à esquerda."
    ],
    "explanation": "LEFT JOIN inclui todas as linhas de clientes, mesmo quando não houver pedido."
  },
  "sql-transactions": {
    "lessonId": "sql-transactions",
    "language": "SQL",
    "title": "Desfaça a transação",
    "prompt": "Complete o comando que cancela alterações ainda não confirmadas.",
    "snippet": "BEGIN;\nUPDATE produtos SET estoque = estoque - 1;\n____;",
    "answers": [
      "ROLLBACK"
    ],
    "hints": [
      "A operação não pode ser confirmada.",
      "COMMIT faria exatamente o oposto."
    ],
    "explanation": "ROLLBACK desfaz alterações pendentes na transação corrente."
  },
  "html-documento": {
    "lessonId": "html-documento",
    "language": "HTML",
    "title": "Semântica da página",
    "prompt": "Complete o elemento que identifica o conteúdo principal do documento.",
    "snippet": "<body>\n  <____><h1>Minha página</h1></____>\n</body>",
    "answers": [
      "main"
    ],
    "hints": [
      "Não é a área de metadados do documento.",
      "Normalmente existe uma região principal por página."
    ],
    "explanation": "main identifica o conteúdo predominante do documento.",
    "suggestions": [
      "main",
      "head",
      "meta"
    ]
  },
  "css-flex": {
    "lessonId": "css-flex",
    "language": "CSS",
    "title": "Organize em uma linha",
    "prompt": "Complete o valor que ativa o modelo flexível de layout.",
    "snippet": "nav {\n  display: ____;\n  gap: 12px;\n}",
    "answers": [
      "flex"
    ],
    "hints": [
      "Essa propriedade troca o modelo de layout do elemento.",
      "O modelo permite alinhar elementos por eixo principal e transversal."
    ],
    "explanation": "display: flex ativa o flexbox para os filhos diretos do elemento.",
    "suggestions": [
      "flex",
      "grid",
      "block"
    ]
  },
  "node-runtime": {
    "lessonId": "node-runtime",
    "language": "Node.js",
    "title": "Importe um módulo",
    "prompt": "Complete o prefixo usado pela biblioteca padrão do Node.js.",
    "snippet": "import { readFileSync } from '____:fs';",
    "answers": [
      "node"
    ],
    "hints": [
      "O módulo pertence à biblioteca nativa do runtime.",
      "Esse prefixo diferencia módulos nativos de nomes de pacotes."
    ],
    "explanation": "node:fs referencia explicitamente o módulo de arquivos integrado ao Node.js.",
    "suggestions": [
      "node",
      "npm",
      "fs"
    ]
  },
  "api-http": {
    "lessonId": "api-http",
    "language": "HTTP",
    "title": "Método para leitura",
    "prompt": "Complete o método HTTP usado para consultar um recurso.",
    "snippet": "____ /api/tarefas HTTP/1.1",
    "answers": [
      "GET"
    ],
    "hints": [
      "A operação deseja apenas ler o recurso.",
      "Não é POST, que geralmente cria um novo registro."
    ],
    "explanation": "GET solicita uma representação do recurso sem requisitar criação."
  },
  "db-relational": {
    "lessonId": "db-relational",
    "language": "SQL",
    "title": "Declare a chave",
    "prompt": "Complete a restrição que identifica cada registro.",
    "snippet": "CREATE TABLE usuarios (\n  id bigint ____ KEY,\n  nome text NOT NULL\n);",
    "answers": [
      "PRIMARY"
    ],
    "hints": [
      "A chave precisa identificar uma linha de modo único.",
      "Essa restrição costuma aparecer antes de KEY."
    ],
    "explanation": "PRIMARY KEY define a identidade de cada linha."
  }
});

export function normalizeMicroAnswer(value){return String(value ?? '').trim().replace(/\s+/g,' ');}
export function gradeMicroAnswer(challenge,input){
 if(!challenge || !Array.isArray(challenge.answers))return false;
 const answer=normalizeMicroAnswer(input);
 return answer.length>0 && challenge.answers.some(expected=>normalizeMicroAnswer(expected)===answer);
}
export function findMicroChallenge(id){return microChallenges[id]||null;}
