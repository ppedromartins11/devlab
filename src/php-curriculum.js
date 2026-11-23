/** 32 aulas autorais de PHP 8.2+; conteúdo consultado no manual oficial php.net. */
export const phpModules = [
  {
    "id": "primeiros-passos",
    "title": "01 · Primeiros passos com PHP",
    "level": "Iniciante",
    "summary": "Entenda o servidor e execute seus primeiros arquivos PHP.",
    "objective": "Instalar, executar e distinguir PHP, HTML e JavaScript.",
    "lessonIds": [
      "php-servidor",
      "php-sintaxe",
      "php-variaveis",
      "php-strings"
    ]
  },
  {
    "id": "logica",
    "title": "02 · Lógica e funções",
    "level": "Básico",
    "summary": "Decisões, repetições e funções tipadas com exemplos reais.",
    "objective": "Implementar regras de negócio sem copiar o exemplo.",
    "lessonIds": [
      "php-operadores",
      "php-condicoes",
      "php-repeticoes",
      "php-funcoes"
    ]
  },
  {
    "id": "arrays",
    "title": "03 · Arrays e transformação de dados",
    "level": "Básico",
    "summary": "Organize listas, mapas, filtros e pequenos relatórios.",
    "objective": "Trabalhar com coleções para transformar e consultar dados de aplicações reais.",
    "lessonIds": [
      "php-arrays-indexados",
      "php-associativos",
      "php-array-funcoes",
      "php-datas-json"
    ]
  },
  {
    "id": "formularios",
    "title": "04 · Formulários e requisições",
    "level": "Intermediário",
    "summary": "Receba e valide dados do navegador, com segurança.",
    "objective": "Desenvolver formulários com validação e tratamento seguro das entradas.",
    "lessonIds": [
      "php-get-post",
      "php-form-validacao",
      "php-escape-html",
      "php-post-redirect"
    ]
  },
  {
    "id": "arquivos-sessoes",
    "title": "05 · Arquivos, cookies e sessões",
    "level": "Intermediário",
    "summary": "Reutilize código, gerencie estado e trate arquivos com cuidado.",
    "objective": "Entender recursos usados em login e uploads de projetos PHP.",
    "lessonIds": [
      "php-includes",
      "php-cookies",
      "php-sessoes",
      "php-arquivos-upload"
    ]
  },
  {
    "id": "mysql",
    "title": "06 · PHP com MySQL e CRUD",
    "level": "Intermediário",
    "summary": "Conecte o PHP a um banco real usando PDO e SQL seguro.",
    "objective": "Desenvolver CRUD com PDO, MySQL e integridade dos dados.",
    "lessonIds": [
      "php-sql-modelagem",
      "php-pdo-conexao",
      "php-pdo-preparado",
      "php-crud-transacoes"
    ]
  },
  {
    "id": "orientacao-objetos",
    "title": "07 · POO e arquitetura PHP",
    "level": "Avançado",
    "summary": "Organize sistemas com classes, contratos e dependências.",
    "objective": "Aplicar orientação a objetos em regras de negócio, serviços e modelos testáveis.",
    "lessonIds": [
      "php-classes",
      "php-heranca-contratos",
      "php-exceptions",
      "php-namespaces"
    ]
  },
  {
    "id": "seguranca-projeto",
    "title": "08 · Segurança, APIs e projeto integrador",
    "level": "Avançado",
    "summary": "Una conceitos em uma aplicação prática segura e testável.",
    "objective": "Integrar validação, CRUD, autenticação, APIs e testes em uma aplicação prática.",
    "lessonIds": [
      "php-passwords",
      "php-csrf-sql-xss",
      "php-api-testes",
      "php-projeto-final"
    ]
  }
];
export const phpLessons = [
  {
    "id": "php-servidor",
    "moduleId": "primeiros-passos",
    "title": "O que é PHP e onde ele executa",
    "goal": "Diferenciar código de servidor e código do navegador.",
    "theory": [
      "PHP é executado no servidor. O navegador recebe o resultado gerado (HTML, JSON etc.), não as instruções PHP originais. Um arquivo .php aberto diretamente no navegador não é interpretado.",
      "Instale uma versão suportada de PHP ou use XAMPP. No terminal: php -v verifica a instalação; php -S localhost:8000 inicia um servidor local para desenvolvimento. Não use esse servidor embutido diretamente na internet."
    ],
    "example": "<?php\n// Execute: php primeiro.php\necho \"Olá, PHP!\" . PHP_EOL;",
    "question": "O que o navegador recebe após uma página PHP ser processada?",
    "choices": [
      "O código PHP com senhas",
      "A saída do PHP, como HTML",
      "O arquivo .php sem interpretação"
    ],
    "answer": 1,
    "explanation": "PHP é interpretado no lado do servidor; o cliente recebe apenas a saída produzida.",
    "task": "Crie primeiro.php e execute php primeiro.php. Em seguida inicie php -S localhost:8000 e abra o arquivo no navegador.",
    "checks": [
      "Confira php -v e o comando no terminal.",
      "Compare a saída do terminal com a saída HTTP.",
      "Explique por que não basta abrir o arquivo por file://."
    ],
    "docs": "https://www.php.net/manual/pt_BR/tutorial.firstpage.php",
    "tip": "ESSENCIAL: PHP não é JavaScript. PHP roda no servidor, JS pode rodar no navegador.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-sintaxe",
    "moduleId": "primeiros-passos",
    "title": "Tags PHP, echo e comentários",
    "goal": "Imprimir conteúdo sem confundir PHP e HTML.",
    "theory": [
      "Um bloco PHP começa com <?php. Em arquivos somente PHP, recomenda-se omitir a tag final ?> para evitar saída acidental. Instruções comuns terminam com ponto e vírgula.",
      "echo escreve valores na saída; comentários // e /* ... */ não aparecem no HTML. Para inserir dados de usuário numa página use escaping, que será estudado depois."
    ],
    "example": "<?php\n// Mensagem gerada no servidor\necho \"Pedido recebido\";\necho PHP_EOL;\necho 2 + 3;",
    "question": "Qual instrução escreve um texto na resposta?",
    "choices": [
      "echo \"Olá\";",
      "print_r = \"Olá\"",
      "console.log(\"Olá\")"
    ],
    "answer": 0,
    "explanation": "echo envia conteúdo para a saída do PHP.",
    "task": "Imprima um título e uma quantidade de pizzas sem usar HTML complexo.",
    "checks": [
      "Use <?php e ponto e vírgula.",
      "Teste o comando php arquivo.php.",
      "Compare aspas simples e duplas."
    ],
    "docs": "https://www.php.net/manual/pt_BR/language.basic-syntax.php",
    "tip": "ESSENCIAL: echo não precisa dos parênteses de uma chamada de função.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-variaveis",
    "moduleId": "primeiros-passos",
    "title": "Variáveis, tipos e conversões",
    "goal": "Guardar dados com $ e identificar seus tipos.",
    "theory": [
      "Variáveis PHP começam com $. Tipos básicos: int, float, string, bool e null. PHP também possui arrays e objetos. O operador de atribuição é = e a comparação estrita é ===.",
      "var_dump mostra o tipo e o valor; use-o durante a depuração, nunca para expor dados sensíveis. Casts como (int) fazem conversões explícitas, mas exigem validação da entrada."
    ],
    "example": "<?php\n$nome = \"Ana\";\n$quantidade = 2;\n$preco = 29.90;\n$ativo = true;\nvar_dump($nome, $quantidade, $preco, $ativo);",
    "question": "Como começa o nome de uma variável PHP?",
    "choices": [
      "Com #",
      "Com $",
      "Com let"
    ],
    "answer": 1,
    "explanation": "Em PHP nomes de variáveis usam o prefixo $.",
    "task": "Crie $produto (string), $preco (float) e $disponivel (bool). Inspecione os tipos.",
    "checks": [
      "Use pelo menos três tipos.",
      "Identifique o resultado de var_dump.",
      "Faça uma conversão explícita e explique o risco."
    ],
    "docs": "https://www.php.net/manual/pt_BR/language.variables.basics.php",
    "tip": "ESSENCIAL: $valor = \"5\" guarda string, não int; === considera tipo e valor.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-strings",
    "moduleId": "primeiros-passos",
    "title": "Strings, concatenação e interpolação",
    "goal": "Construir mensagens com dados de forma correta.",
    "theory": [
      "A concatenação de strings em PHP usa ponto (.). O sinal + é para operações numéricas; não deve ser usado para concatenar textos.",
      "Aspas duplas permitem interpolar variáveis; aspas simples normalmente tratam $nome como texto literal. Para dinheiro, number_format pode formatar a saída, sem substituir cálculos precisos."
    ],
    "example": "<?php\n$nome = \"Ana\";\n$itens = 3;\necho \"Olá, $nome!\" . PHP_EOL;\necho \"Você tem \" . $itens . \" pedidos.\";",
    "question": "Qual operador concatena textos em PHP?",
    "choices": [
      "+",
      ".",
      "&"
    ],
    "answer": 1,
    "explanation": "O operador de concatenação de PHP é o ponto.",
    "task": "Formate uma mensagem de pedido usando concatenação e interpolação.",
    "checks": [
      "Teste aspas simples e duplas.",
      "Use o operador ponto.",
      "Não confunda texto de preço com cálculo financeiro."
    ],
    "docs": "https://www.php.net/manual/pt_BR/language.types.string.php",
    "tip": "ESSENCIAL: \"Olá, $nome\" interpola; 'Olá, $nome' exibe o cifrão literalmente.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-operadores",
    "moduleId": "logica",
    "title": "Operadores e comparações",
    "goal": "Distinguir atribuição, comparação e cálculo.",
    "theory": [
      "Atribuição usa =; comparação de valor usa ==; comparação estrita usa ===. Prefira === para evitar coerções implícitas. &&, || e ! compõem condições.",
      "Operadores aritméticos incluem +, -, *, / e %. O módulo % indica resto, útil para saber se um número é par. Cuidado com divisão por zero e conversões automáticas."
    ],
    "example": "<?php\n$quantidade = 4;\n$minimo = 2;\n$valido = $quantidade >= $minimo && $quantidade % 2 === 0;\nvar_dump($valido);",
    "question": "O que $a === $b compara?",
    "choices": [
      "Apenas valor",
      "Tipo e valor",
      "Faz uma atribuição"
    ],
    "answer": 1,
    "explanation": "=== faz comparação estrita de valor e tipo.",
    "task": "Faça um teste de desconto aplicado somente quando total >= 100 e cliente estiver ativo.",
    "checks": [
      "Teste exatos R$ 100.",
      "Teste cliente inativo.",
      "Diferencie =, == e ===."
    ],
    "docs": "https://www.php.net/manual/pt_BR/language.operators.comparison.php",
    "tip": "ESSENCIAL: = atribui; == compara com coerção; === compara sem conversão de tipo.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-condicoes",
    "moduleId": "logica",
    "title": "if, elseif, switch e match",
    "goal": "Escolher estruturas adequadas a cada regra.",
    "theory": [
      "if/elseif/else compara condições; switch corresponde a múltiplos casos e match (PHP 8+) devolve um valor usando comparação estrita e não cai de um caso para outro.",
      "Sempre trate a alternativa padrão. Prefira match para mapear estados simples e if/else para faixas de preço ou notas."
    ],
    "example": "<?php\n$status = \"pago\";\n$texto = match ($status) {\n    \"pago\" => \"Aprovado\",\n    \"pendente\" => \"Aguardando\",\n    default => \"Desconhecido\",\n};\necho $texto;",
    "question": "Em PHP 8+, qual estrutura devolve valor e usa comparação estrita?",
    "choices": [
      "match",
      "echo",
      "foreach"
    ],
    "answer": 0,
    "explanation": "match é uma expressão com correspondência estrita.",
    "task": "Crie classificações para pedido novo, pago, cancelado e status desconhecido.",
    "checks": [
      "Inclua default.",
      "Teste um status inesperado.",
      "Compare match e switch."
    ],
    "docs": "https://www.php.net/manual/pt_BR/control-structures.match.php",
    "tip": "ESSENCIAL: match não usa break e compara estritamente.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-repeticoes",
    "moduleId": "logica",
    "title": "for, while e foreach",
    "goal": "Percorrer itens sem criar laços infinitos.",
    "theory": [
      "for é apropriado quando há contagem; while depende de condição que deve se tornar falsa. foreach percorre arrays, com acesso opcional à chave.",
      "Laços podem usar break e continue. Não modifique o contador de forma que a condição nunca termine. Evite misturar saída HTML e cálculo sem necessidade."
    ],
    "example": "<?php\n$pizzas = [\"Mussarela\", \"Calabresa\", \"Frango\"];\nforeach ($pizzas as $indice => $pizza) {\n    echo ($indice + 1) . \". \" . $pizza . PHP_EOL;\n}",
    "question": "Qual laço percorre elementos de um array diretamente?",
    "choices": [
      "foreach",
      "switch",
      "echo"
    ],
    "answer": 0,
    "explanation": "foreach é adequado para percorrer listas e mapas.",
    "task": "Liste o nome e a posição de cada pizza de um array.",
    "checks": [
      "Teste um array vazio.",
      "Use foreach corretamente.",
      "Mostre onde um while infinito poderia surgir."
    ],
    "docs": "https://www.php.net/manual/pt_BR/control-structures.foreach.php",
    "tip": "ESSENCIAL: foreach ($itens as $chave => $valor) acessa chave e valor.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-funcoes",
    "moduleId": "logica",
    "title": "Funções, parâmetros e tipos",
    "goal": "Separar cálculo do código de apresentação.",
    "theory": [
      "function cria uma função reutilizável. Parâmetros recebem dados, return devolve um resultado. A sintaxe `: float` declara retorno e `declare(strict_types=1)` habilita regras estritas de parâmetros escalares em chamadas feitas neste arquivo.",
      "Use valores padrão somente quando fizer sentido. Uma função deve ter responsabilidade clara e tratamento explícito para entradas inválidas."
    ],
    "example": "<?php\ndeclare(strict_types=1);\nfunction total(float $preco, int $quantidade): float {\n    if ($quantidade < 0) { throw new InvalidArgumentException(\"Quantidade inválida\"); }\n    return $preco * $quantidade;\n}\necho total(12.5, 3);",
    "question": "Qual instrução devolve um valor de uma função?",
    "choices": [
      "echo",
      "return",
      "include"
    ],
    "answer": 1,
    "explanation": "return devolve um valor; echo apenas o imprime.",
    "task": "Escreva calcularDesconto(float $total, float $percentual): float com tratamento de percentuais inválidos.",
    "checks": [
      "Teste 0%, 10% e 100%.",
      "Teste valores fora de 0–100.",
      "Use parâmetro e retorno tipados."
    ],
    "docs": "https://www.php.net/manual/pt_BR/language.functions.php",
    "tip": "ESSENCIAL: printar uma saída não equivale a retornar o resultado.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-arrays-indexados",
    "moduleId": "arrays",
    "title": "Arrays indexados e acesso",
    "goal": "Armazenar vários elementos em uma única variável.",
    "theory": [
      "Arrays indexados contêm valores com chaves inteiras por padrão. O primeiro índice costuma ser 0; count($itens) retorna a quantidade.",
      "Use ?? para fornecer valor padrão quando uma chave não existe. Evite acessar índice inexistente sem verificar; array_key_exists e isset têm diferenças com valores null."
    ],
    "example": "<?php\n$pizzas = [\"Mussarela\", \"Frango\", \"Calabresa\"];\necho count($pizzas) . PHP_EOL;\necho $pizzas[0] . PHP_EOL;\necho $pizzas[99] ?? \"Não encontrada\";",
    "question": "Qual é o primeiro índice do array [\"A\", \"B\"]?",
    "choices": [
      "1",
      "0",
      "-1"
    ],
    "answer": 1,
    "explanation": "Arrays sequenciais normalmente começam com índice 0.",
    "task": "Receba quatro preços e imprima quantidade, primeiro item e soma.",
    "checks": [
      "Teste lista vazia.",
      "Use count.",
      "Não acesse posição inexistente."
    ],
    "docs": "https://www.php.net/manual/pt_BR/language.types.array.php",
    "tip": "ESSENCIAL: count conta elementos; não confunda com end() nem array_sum().",
    "filename": "exemplo.php"
  },
  {
    "id": "php-associativos",
    "moduleId": "arrays",
    "title": "Arrays associativos e registros",
    "goal": "Representar um pedido com chave e valor.",
    "theory": [
      "Arrays associativos mapeiam chaves como \"nome\" e \"preco\" a valores. Um array pode conter outros arrays, formando coleções de registros.",
      "Use isset para checar chave existente com valor não nulo e array_key_exists quando null é um valor legítimo. Ao lidar com dados externos valide o formato esperado."
    ],
    "example": "<?php\n$produto = [\"nome\" => \"Pizza grande\", \"preco\" => 55.00, \"ativo\" => true];\necho $produto[\"nome\"] . PHP_EOL;\nvar_dump(isset($produto[\"ativo\"]));",
    "question": "Como acessar o campo preco de um array associativo $p?",
    "choices": [
      "$p.preco",
      "$p[\"preco\"]",
      "$p->preco"
    ],
    "answer": 1,
    "explanation": "Arrays usam colchetes e chaves; objetos usam ->.",
    "task": "Crie um array associativo de cliente e outro de pedido, com total calculado.",
    "checks": [
      "Use chaves descritivas.",
      "Teste uma chave ausente.",
      "Distinga array de objeto."
    ],
    "docs": "https://www.php.net/manual/pt_BR/language.types.array.php",
    "tip": "ESSENCIAL: $dados[\"nome\"] lê array; $objeto->nome lê propriedade de objeto.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-array-funcoes",
    "moduleId": "arrays",
    "title": "array_map, filter e reduce",
    "goal": "Transformar listas com funções reutilizáveis.",
    "theory": [
      "array_map transforma cada elemento, array_filter seleciona elementos e array_reduce acumula um resultado. As chaves podem ser preservadas em array_filter; se precisar índices sequenciais, use array_values.",
      "Operações puras tornam testes simples: receba uma lista, devolva uma nova lista e evite alterar entradas sem necessidade."
    ],
    "example": "<?php\n$precos = [10, 20, 30];\n$comTaxa = array_map(fn($p) => $p * 1.1, $precos);\n$maiores = array_values(array_filter($comTaxa, fn($p) => $p > 20));\nprint_r($maiores);",
    "question": "Qual função seleciona elementos que atendem a um predicado?",
    "choices": [
      "array_filter",
      "array_map",
      "count"
    ],
    "answer": 0,
    "explanation": "array_filter mantém os elementos cujo predicado é verdadeiro.",
    "task": "Receba pedidos e devolva somente os que estão pagos; calcule a soma dos valores.",
    "checks": [
      "Não modifique a lista original.",
      "Teste coleção vazia.",
      "Explique preservação das chaves."
    ],
    "docs": "https://www.php.net/manual/pt_BR/ref.array.php",
    "tip": "ESSENCIAL: array_filter seleciona; array_map transforma; array_reduce acumula.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-datas-json",
    "moduleId": "arrays",
    "title": "Datas, JSON e serialização",
    "goal": "Converter dados sem supor formatos inválidos.",
    "theory": [
      "json_encode transforma valores PHP compatíveis em JSON; json_decode pode criar objetos ou arrays associativos com true. Use JSON_THROW_ON_ERROR para tratar dados inválidos.",
      "DateTimeImmutable evita mutações inesperadas. Formate datas explicitamente e valide entradas, especialmente quando houver fuso horário ou data vinda de formulário."
    ],
    "example": "<?php\n$pedido = [\"id\" => 1, \"status\" => \"pago\"];\n$json = json_encode($pedido, JSON_THROW_ON_ERROR);\n$dados = json_decode($json, true, 512, JSON_THROW_ON_ERROR);\necho $dados[\"status\"];",
    "question": "O que json_decode($json, true) retorna para um objeto JSON?",
    "choices": [
      "Array associativo",
      "HTML",
      "Somente string"
    ],
    "answer": 0,
    "explanation": "O segundo argumento true solicita arrays associativos.",
    "task": "Transforme um registro de compra em JSON e recupere uma propriedade, incluindo tratamento de JSON inválido.",
    "checks": [
      "Use JSON_THROW_ON_ERROR.",
      "Teste JSON inválido.",
      "Diferencie encode e decode."
    ],
    "docs": "https://www.php.net/manual/pt_BR/ref.json.php",
    "tip": "ESSENCIAL: json_encode gera JSON; json_decode lê JSON; true retorna arrays associativos.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-get-post",
    "moduleId": "formularios",
    "title": "GET, POST e superglobais",
    "goal": "Entender requisições e dados enviados ao servidor.",
    "theory": [
      "$_GET contém parâmetros da URL (query string). $_POST contém campos de formulários com métodos e tipos de envio compatíveis; não é sinônimo de todo corpo HTTP JSON.",
      "$_SERVER[\"REQUEST_METHOD\"] informa o método. Não confie no navegador: valide tamanho, tipo e formato no servidor. Dados sensíveis não devem ir em parâmetros de URL."
    ],
    "example": "<?php\n$metodo = $_SERVER[\"REQUEST_METHOD\"] ?? \"CLI\";\n$nome = trim((string)($_POST[\"nome\"] ?? \"\"));\nif ($metodo === \"POST\" && $nome !== \"\") {\n    echo \"Nome recebido\";\n}",
    "question": "Qual superglobal normalmente recebe campos de formulário method=\"post\"?",
    "choices": [
      "$_GET",
      "$_POST",
      "$_SESSION"
    ],
    "answer": 1,
    "explanation": "$_POST contém campos do formulário POST processados pelo PHP.",
    "task": "Crie um formulário HTML com method=\"post\" e name=\"nome\", com tratamento em index.php.",
    "checks": [
      "Teste requisição GET sem envio.",
      "Teste POST com nome preenchido.",
      "Não exiba senha pela URL."
    ],
    "docs": "https://www.php.net/manual/pt_BR/tutorial.forms.php",
    "tip": "ESSENCIAL: id identifica elemento HTML; name é a chave enviada pelo formulário.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-form-validacao",
    "moduleId": "formularios",
    "title": "Validação, trim e filtros",
    "goal": "Rejeitar entradas inválidas no backend.",
    "theory": [
      "trim remove espaços nas pontas; filter_var valida formatos como e-mail. is_numeric e filtros não substituem regras de negócio; limite comprimentos e quantidades.",
      "Nunca confie em required ou type=\"email\" do HTML como barreira de segurança. Refaça a validação no PHP e mostre mensagens sem vazar dados internos."
    ],
    "example": "<?php\n$email = trim((string)($_POST[\"email\"] ?? \"\"));\nif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {\n    echo \"E-mail inválido\";\n} else {\n    echo \"Formato aceito\";\n}",
    "question": "Onde deve acontecer a validação obrigatória de dados enviados?",
    "choices": [
      "Somente no JavaScript",
      "Somente no HTML",
      "No servidor PHP"
    ],
    "answer": 2,
    "explanation": "A validação no servidor não pode ser ignorada pelo cliente.",
    "task": "Implemente validação de nome, e-mail e quantidade no cadastro de cliente.",
    "checks": [
      "Rejeite nome só com espaços.",
      "Teste e-mail inválido.",
      "Rejeite quantidade zero ou negativa."
    ],
    "docs": "https://www.php.net/manual/pt_BR/filter.filters.validate.php",
    "tip": "ESSENCIAL: required do HTML ajuda a UX, mas não substitui validação no PHP.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-escape-html",
    "moduleId": "formularios",
    "title": "htmlspecialchars e prevenção de XSS",
    "goal": "Mostrar textos de usuários sem executar HTML injetado.",
    "theory": [
      "XSS pode ocorrer ao inserir conteúdo do usuário diretamente em HTML. Na saída para HTML, use htmlspecialchars($valor, ENT_QUOTES | ENT_SUBSTITUTE, \"UTF-8\").",
      "Escaping depende do contexto: conteúdo HTML, atributos, URL e JavaScript têm regras próprias. Nunca faça saída de texto não confiável com echo bruto dentro de um documento HTML."
    ],
    "example": "<?php\n$nome = \"<script>alert(1)</script>\";\necho htmlspecialchars($nome, ENT_QUOTES | ENT_SUBSTITUTE, \"UTF-8\");",
    "question": "Qual função ajuda a escapar texto não confiável ao exibi-lo em HTML?",
    "choices": [
      "htmlspecialchars",
      "unserialize",
      "include"
    ],
    "answer": 0,
    "explanation": "htmlspecialchars converte caracteres especiais em entidades HTML.",
    "task": "Exiba nome e observação de um cliente preservando caracteres especiais sem executar HTML.",
    "checks": [
      "Teste com <script> como entrada.",
      "Teste com aspas simples e duplas.",
      "Diferencie escaping de validação."
    ],
    "docs": "https://www.php.net/manual/pt_BR/function.htmlspecialchars.php",
    "tip": "ESSENCIAL: escapar a saída para HTML é diferente de validar ou sanitizar entrada.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-post-redirect",
    "moduleId": "formularios",
    "title": "POST-Redirect-GET e redirecionamento",
    "goal": "Evitar reenvios ao atualizar uma página.",
    "theory": [
      "O padrão POST-Redirect-GET redireciona após uma operação que altera dados, evitando o reenvio acidental ao atualizar a página.",
      "header(\"Location: ...\") precisa ser enviado antes de qualquer saída de corpo HTTP. Use exit após redirecionar para interromper execução. Nunca aceite destinos arbitrários de redirecionamento sem validar."
    ],
    "example": "<?php\n$metodo = $_SERVER[\"REQUEST_METHOD\"] ?? \"GET\";\nif ($metodo === \"POST\") {\n    // Validar e processar o formulário antes daqui.\n    header(\"Location: /sucesso.php\", true, 303);\n    exit;\n}\necho \"Formulário disponível\";",
    "question": "Por que usar exit logo após header(\"Location: ...\")?",
    "choices": [
      "Para aumentar a memória",
      "Para impedir execução posterior",
      "Para instalar um cookie"
    ],
    "answer": 1,
    "explanation": "header define o cabeçalho, mas não encerra automaticamente o script.",
    "task": "Crie cadastro que redireciona para sucesso.php após POST válido.",
    "checks": [
      "Não escreva saída antes de header.",
      "Use exit após redirect.",
      "Atualize a página e observe o comportamento."
    ],
    "docs": "https://www.php.net/manual/pt_BR/function.header.php",
    "tip": "ESSENCIAL: headers HTTP precisam ser enviados antes do conteúdo de resposta.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-includes",
    "moduleId": "arquivos-sessoes",
    "title": "include, require e organização",
    "goal": "Separar arquivos sem duplicar lógica.",
    "theory": [
      "include incorpora outro arquivo e emite aviso quando não encontra; require falha com erro mais grave. Os sufixos _once evitam incluir o mesmo arquivo várias vezes no mesmo fluxo.",
      "Use __DIR__ para construir caminhos relativos ao arquivo e evitar depender do diretório atual. Não construa caminhos de include usando parâmetros de usuário."
    ],
    "example": "<?php\n// Coloque este exemplo num arquivo que exista ao lado de config.php.\n$caminho = __DIR__ . \"/config.php\";\nif (is_file($caminho)) {\n    require_once $caminho;\n}\necho \"Aplicação pronta\";",
    "question": "Qual constante representa o diretório do arquivo atual?",
    "choices": [
      "__DIR__",
      "$_GET",
      "__FILE_SIZE__"
    ],
    "answer": 0,
    "explanation": "__DIR__ aponta para o diretório do script fonte.",
    "task": "Separe cabeçalho, conexão e página inicial usando require_once com __DIR__.",
    "checks": [
      "Corrija caminhos para subpastas.",
      "Compare include e require.",
      "Evite incluir arquivos indicados pela URL."
    ],
    "docs": "https://www.php.net/manual/pt_BR/function.require-once.php",
    "tip": "ESSENCIAL: include pode emitir aviso e prosseguir; require é usado para dependências obrigatórias.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-cookies",
    "moduleId": "arquivos-sessoes",
    "title": "Cookies e ciclo de vida",
    "goal": "Diferenciar estado no navegador e no servidor.",
    "theory": [
      "Cookies são armazenados no navegador e enviados em requisições compatíveis. setcookie define cabeçalhos; por isso deve ser chamado antes do corpo da resposta.",
      "HttpOnly dificulta leitura via JavaScript, Secure restringe transmissão a HTTPS e SameSite ajuda a mitigar envio cross-site. Nenhum desses atributos substitui autenticação e validação de autorização."
    ],
    "example": "<?php\nsetcookie(\"tema\", \"escuro\", [\n    \"expires\" => time() + 3600,\n    \"path\" => \"/\",\n    \"secure\" => isset($_SERVER[\"HTTPS\"]),\n    \"httponly\" => true,\n    \"samesite\" => \"Lax\",\n]);\necho \"Cookie configurado\";",
    "question": "Em qual local o cookie é armazenado principalmente?",
    "choices": [
      "No navegador",
      "Sempre no banco",
      "No CSS"
    ],
    "answer": 0,
    "explanation": "O navegador mantém cookies e os envia ao servidor conforme as regras.",
    "task": "Crie preferência de tema com cookie e observe o cabeçalho Set-Cookie no navegador.",
    "checks": [
      "Configure path e SameSite.",
      "Ative Secure no HTTPS.",
      "Explique diferença de cookie e sessão."
    ],
    "docs": "https://www.php.net/manual/pt_BR/function.setcookie.php",
    "tip": "ESSENCIAL: cookie é client-side; $_SESSION é mantido pelo mecanismo de sessão no servidor.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-sessoes",
    "moduleId": "arquivos-sessoes",
    "title": "session_start, login e logout",
    "goal": "Manter estado de usuário sem gravar senhas em cookies.",
    "theory": [
      "session_start inicia ou retoma uma sessão. $_SESSION é um array de dados da sessão; o navegador normalmente possui apenas um identificador de sessão.",
      "Depois do login, use session_regenerate_id(true) para diminuir riscos de fixação. Logout deve remover os dados de sessão e invalidar o cookie de sessão quando aplicável."
    ],
    "example": "<?php\nsession_start();\n$_SESSION[\"usuario_id\"] = 42;\necho \"Sessão iniciada para \" . $_SESSION[\"usuario_id\"];",
    "question": "Qual instrução é usada para iniciar ou retomar uma sessão PHP?",
    "choices": [
      "session_start()",
      "new Session()",
      "session_login()"
    ],
    "answer": 0,
    "explanation": "session_start inicia/retoma a sessão em PHP.",
    "task": "Crie uma página login.php que guarda user_id na sessão após credenciais válidas e outra para logout.",
    "checks": [
      "Teste página sem login.",
      "Regere o ID após login.",
      "Remova os dados e cookie da sessão ao sair."
    ],
    "docs": "https://www.php.net/manual/pt_BR/function.session-start.php",
    "tip": "ESSENCIAL: $_SESSION precisa de session_start e não é equivalente a $_COOKIE.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-arquivos-upload",
    "moduleId": "arquivos-sessoes",
    "title": "Leitura, escrita e uploads",
    "goal": "Manipular arquivos sem confiar em nomes enviados.",
    "theory": [
      "file_get_contents lê dados e file_put_contents escreve conteúdo em arquivo. Para uso concorrente, considere LOCK_EX ou armazenamento em banco. Verifique retorno de erros.",
      "$_FILES recebe metadados do upload multipart/form-data. Valide tamanho, erro e tipo real via finfo; gere nomes aleatórios e salve fora da pasta pública sempre que possível. Não confie em extensão ou nome fornecido pelo usuário."
    ],
    "example": "<?php\n$arquivo = sys_get_temp_dir() . \"/devlab-estudo-\" . bin2hex(random_bytes(4)) . \".txt\";\nfile_put_contents($arquivo, \"PHP local\", LOCK_EX);\necho file_get_contents($arquivo);\nunlink($arquivo);",
    "question": "Em qual superglobal ficam informações de arquivos enviados por formulário multipart?",
    "choices": [
      "$_UPLOAD",
      "$_FILES",
      "$_COOKIE"
    ],
    "answer": 1,
    "explanation": "$_FILES contém arquivos enviados por upload multipart.",
    "task": "Crie upload de foto para pasta não pública, com limite de 2 MB e verificação de MIME.",
    "checks": [
      "Rejeite extensão/MIME indevidos.",
      "Gere nome aleatório.",
      "Trate falha de upload sem mostrar path sensível."
    ],
    "docs": "https://www.php.net/manual/pt_BR/features.file-upload.php",
    "tip": "ESSENCIAL: enctype=\"multipart/form-data\" é necessário para envio tradicional de arquivos.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-sql-modelagem",
    "moduleId": "mysql",
    "title": "Tabelas, chaves e relacionamentos",
    "goal": "Identificar entidades e relações antes de programar.",
    "theory": [
      "MySQL armazena dados em tabelas. PRIMARY KEY identifica linhas; FOREIGN KEY relaciona tabelas e ajuda a manter integridade.",
      "Para um pedido de pizzaria, separe produtos, pedidos e itens de pedido. O preço por item pode ser registrado no pedido para preservar o valor no momento da compra."
    ],
    "example": "<?php\n// Este exemplo representa um registro de uma tabela de itens.\n$item = [\"pedido_id\" => 10, \"pizza_id\" => 2, \"quantidade\" => 3];\necho \"Pedido #\" . $item[\"pedido_id\"];",
    "question": "Qual chave identifica unicamente um registro?",
    "choices": [
      "FOREIGN KEY",
      "PRIMARY KEY",
      "ORDER BY"
    ],
    "answer": 1,
    "explanation": "PRIMARY KEY identifica cada linha da tabela.",
    "task": "Desenhe 3 tabelas: pizzas, pedidos, itens_pedido com chaves e campos.",
    "checks": [
      "Defina uma PK para cada tabela.",
      "Defina relacionamento entre pedidos e itens.",
      "Evite armazenar múltiplos produtos em uma coluna."
    ],
    "docs": "https://www.php.net/manual/pt_BR/book.pdo.php",
    "tip": "ESSENCIAL: banco relacional usa PK, FK e joins; não guarde listas separadas por vírgula em uma célula.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-pdo-conexao",
    "moduleId": "mysql",
    "title": "PDO e conexão com o banco",
    "goal": "Criar uma conexão reutilizável sem expor credenciais.",
    "theory": [
      "PDO (PHP Data Objects) fornece interface para diferentes bancos, mas requer o driver específico, como pdo_mysql. configure host, banco, usuário e senha fora dos arquivos públicos.",
      "Ative modo de exceções e desative emulação de prepared statements quando apropriado. Nunca imprima exceções de conexão com credenciais para visitantes."
    ],
    "example": "<?php\n// Configure DB_HOST, DB_NAME, DB_USER e DB_PASS no ambiente.\n$host = getenv(\"DB_HOST\") ?: \"127.0.0.1\";\n$db = getenv(\"DB_NAME\") ?: \"pizzaria\";\n$dsn = \"mysql:host=$host;dbname=$db;charset=utf8mb4\";\n// Ao configurar seu banco: new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);\necho $dsn;",
    "question": "Qual extensão permite usar prepared statements com MySQL em PHP moderno?",
    "choices": [
      "PDO com driver pdo_mysql",
      "echo",
      "$_SERVER"
    ],
    "answer": 0,
    "explanation": "PDO com driver MySQL permite conexão e instruções preparadas.",
    "task": "Configure conexão PDO com banco local e faça SELECT em uma tabela pizzas.",
    "checks": [
      "Não inclua senhas no Git.",
      "Use charset utf8mb4.",
      "Trate indisponibilidade do banco."
    ],
    "docs": "https://www.php.net/manual/pt_BR/book.pdo.php",
    "tip": "ESSENCIAL: PDO é API; pdo_mysql é driver de banco e precisa estar habilitado.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-pdo-preparado",
    "moduleId": "mysql",
    "title": "Prepared statements e parâmetros",
    "goal": "Evitar concatenar entrada do usuário em SQL.",
    "theory": [
      "Prepared statements separam estrutura SQL de valores. Use prepare e execute com parâmetros nomeados ou posicionais; não concatene campos enviados por formulário diretamente na query.",
      "Marcadores substituem valores, não nomes de tabela/coluna. Para nomes dinâmicos, use uma lista de opções permitidas definida pelo servidor."
    ],
    "example": "<?php\n// $pdo é uma conexão PDO válida fornecida por sua aplicação.\nif (isset($pdo) && $pdo instanceof PDO) {\n    $stmt = $pdo->prepare(\"SELECT id, nome FROM pizzas WHERE id = :id\");\n    $stmt->execute([\"id\" => 3]);\n    print_r($stmt->fetch(PDO::FETCH_ASSOC));\n}",
    "question": "Qual método prepara uma instrução SQL parametrizada?",
    "choices": [
      "$pdo->prepare()",
      "$pdo->echo()",
      "$_POST->query()"
    ],
    "answer": 0,
    "explanation": "prepare define uma consulta que receberá os parâmetros via execute.",
    "task": "Implemente cadastro e busca de pizzas por nome usando PDO com parâmetros.",
    "checks": [
      "Teste nome contendo apóstrofo.",
      "Não concatene $_GET em SQL.",
      "Teste pizza inexistente."
    ],
    "docs": "https://www.php.net/manual/pt_BR/pdo.prepare.php",
    "tip": "ESSENCIAL: parâmetros preparados evitam injeção por valores; não parametrizam identificadores SQL.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-crud-transacoes",
    "moduleId": "mysql",
    "title": "CRUD e transações",
    "goal": "Executar operações relacionadas como uma unidade.",
    "theory": [
      "CRUD significa Create (INSERT), Read (SELECT), Update (UPDATE) e Delete (DELETE). Sempre restrinja alterações a IDs válidos e verifique autorização quando houver usuários.",
      "Transações usam beginTransaction, commit e rollBack. Registre pedido e seus itens dentro da mesma transação para evitar pedidos incompletos em caso de falha."
    ],
    "example": "<?php\n// Para estudar a estrutura, conecte $pdo antes de executar.\nif (isset($pdo) && $pdo instanceof PDO) {\n    $pdo->beginTransaction();\n    try {\n        $pdo->prepare(\"INSERT INTO pedidos (status) VALUES (?)\")->execute([\"novo\"]);\n        $pdo->commit();\n    } catch (Throwable $erro) {\n        $pdo->rollBack();\n        throw $erro;\n    }\n}",
    "question": "Qual ação desfaz uma transação ainda não confirmada?",
    "choices": [
      "commit",
      "rollBack",
      "fetchAll"
    ],
    "answer": 1,
    "explanation": "rollBack reverte alterações da transação não confirmada.",
    "task": "Implemente INSERT de pedido e itens em uma transação, validando estoque.",
    "checks": [
      "Teste criação com itens válidos.",
      "Force uma falha e confira rollback.",
      "Use prepared statements em todos os valores."
    ],
    "docs": "https://www.php.net/manual/pt_BR/pdo.transactions.php",
    "tip": "ESSENCIAL: DELETE sem WHERE pode remover todas as linhas; transações protegem operações relacionadas.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-classes",
    "moduleId": "orientacao-objetos",
    "title": "Classes, objetos e construtores",
    "goal": "Criar modelos com propriedades e métodos tipados.",
    "theory": [
      "Uma classe descreve estrutura e comportamento; new cria uma instância. `__construct` inicializa o objeto. Propriedades podem ser tipadas com `string`, `int`, `float` etc.",
      "private limita o acesso direto de outras classes. PHP 8+ admite constructor property promotion, que reduz repetições na declaração de propriedades."
    ],
    "example": "<?php\nclass Pizza {\n    public function __construct(\n        public readonly string $nome,\n        public readonly float $preco\n    ) {}\n}\n$pizza = new Pizza(\"Mussarela\", 39.9);\necho $pizza->nome;",
    "question": "Qual método especial inicializa uma nova instância?",
    "choices": [
      "__construct",
      "__start",
      "newClass"
    ],
    "answer": 0,
    "explanation": "__construct é invocado na criação do objeto.",
    "task": "Crie classe Pedido com id, status e método calcularTotal.",
    "checks": [
      "Use propriedades tipadas.",
      "Teste instâncias independentes.",
      "Explique readonly vs private."
    ],
    "docs": "https://www.php.net/manual/pt_BR/language.oop5.decon.php",
    "tip": "ESSENCIAL: -> acessa propriedade/método de instância; :: acessa membros estáticos/constantes.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-heranca-contratos",
    "moduleId": "orientacao-objetos",
    "title": "Herança, interface, trait e enum",
    "goal": "Distinguir reaproveitamento de contrato.",
    "theory": [
      "extends representa herança; implements obriga a cumprir uma interface. Uma interface define métodos que classes concretas implementam. Trait reutiliza implementações sem criar hierarquia de herança.",
      "Enum (PHP 8.1+) representa um conjunto fechado de opções. Prefira composição quando uma classe não for realmente um subtipo de outra."
    ],
    "example": "<?php\ninterface Pagamento { public function pagar(float $valor): bool; }\nclass Pix implements Pagamento {\n    public function pagar(float $valor): bool { return $valor > 0; }\n}\nenum Status: string { case Pendente = \"pendente\"; case Pago = \"pago\"; }\necho Status::Pago->value;",
    "question": "Qual palavra obriga uma classe a seguir uma interface?",
    "choices": [
      "extends",
      "implements",
      "use namespace"
    ],
    "answer": 1,
    "explanation": "implements declara que uma classe satisfaz um contrato de interface.",
    "task": "Crie interface MetodoPagamento e duas implementações; use enum para status.",
    "checks": [
      "Teste duas classes concretas.",
      "Distinga trait de interface.",
      "Use enum para estados fixos."
    ],
    "docs": "https://www.php.net/manual/pt_BR/language.oop5.interfaces.php",
    "tip": "ESSENCIAL: extends é herança; implements é contrato; trait não substitui interface.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-exceptions",
    "moduleId": "orientacao-objetos",
    "title": "Exceptions, try/catch e Throwable",
    "goal": "Tratar erros sem escondê-los.",
    "theory": [
      "throw lança uma exceção; try/catch permite tratar condições conhecidas. finally executa limpeza. Throwable é a interface base de Error e Exception em PHP moderno.",
      "Não capture Throwable para ignorar falhas. No servidor web, registre detalhes em logs apropriados e mostre resposta segura ao usuário, sem stack trace."
    ],
    "example": "<?php\nfunction validar(int $qtd): void {\n    if ($qtd < 1) throw new InvalidArgumentException(\"Quantidade inválida\");\n}\ntry { validar(0); } catch (InvalidArgumentException $e) {\n    echo \"Informe quantidade positiva\";\n}",
    "question": "Qual palavra lança explicitamente uma exceção?",
    "choices": [
      "catch",
      "throw",
      "finally"
    ],
    "answer": 1,
    "explanation": "throw sinaliza um erro para ser tratado pelo chamador.",
    "task": "Faça método de criar pedido que lança exceção para quantidade inválida e testa o catch.",
    "checks": [
      "Teste caminho com erro.",
      "Não exponha mensagem técnica ao visitante.",
      "Use finally quando houver recurso para limpar."
    ],
    "docs": "https://www.php.net/manual/pt_BR/language.exceptions.php",
    "tip": "ESSENCIAL: Exception e Error implementam Throwable; nem toda falha deve ser silenciosa.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-namespaces",
    "moduleId": "orientacao-objetos",
    "title": "Namespaces, Composer e autoload PSR-4",
    "goal": "Organizar código em múltiplos arquivos.",
    "theory": [
      "Namespaces evitam conflitos de nomes entre classes. `use` importa uma classe por seu nome qualificado. Autoload carrega classes quando usadas, sem require manual para cada uma.",
      "Composer é gerenciador de dependências PHP; PSR-4 relaciona namespaces a pastas. Projetos maiores separam `src/`, `public/`, `tests/` e configurações."
    ],
    "example": "<?php\nnamespace DevLab\\Dominio;\nclass Pedido {\n    public function __construct(public int $id) {}\n}\n$pedido = new Pedido(1);\necho $pedido->id;",
    "question": "Qual ferramenta gerencia dependências PHP e pode configurar autoload?",
    "choices": [
      "Composer",
      "npm (sempre)",
      "phpMyAdmin"
    ],
    "answer": 0,
    "explanation": "Composer gerencia pacotes PHP e autoload, incluindo PSR-4.",
    "task": "Crie src/Dominio/Pedido.php e autoload PSR-4 via composer.json, com um script public/index.php.",
    "checks": [
      "Gere autoload com Composer.",
      "Separe domínio do código HTTP.",
      "Documente como rodar o sistema."
    ],
    "docs": "https://www.php.net/manual/pt_BR/language.namespaces.php",
    "tip": "ESSENCIAL: Composer não é servidor web nem banco de dados; gera autoload e gerencia dependências.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-passwords",
    "moduleId": "seguranca-projeto",
    "title": "Hash de senhas e verificação",
    "goal": "Não guardar senhas em texto puro.",
    "theory": [
      "password_hash($senha, PASSWORD_DEFAULT) cria hash seguro; password_verify compara senha digitada com hash armazenado. Hash não é criptografia reversível.",
      "Nunca use md5 ou sha1 para armazenar senhas; use o algoritmo recomendado e deixe margem de tamanho para a coluna do hash. Configure políticas de login e limites de tentativas na aplicação."
    ],
    "example": "<?php\n$hash = password_hash(\"senha-de-teste\", PASSWORD_DEFAULT);\nvar_dump(password_verify(\"senha-de-teste\", $hash));\nvar_dump(password_verify(\"senha-errada\", $hash));",
    "question": "Qual função verifica a senha contra um hash salvo?",
    "choices": [
      "password_verify",
      "md5",
      "json_decode"
    ],
    "answer": 0,
    "explanation": "password_verify compara senha e hash com o algoritmo adequado.",
    "task": "Implemente cadastro com password_hash e login com password_verify.",
    "checks": [
      "Nunca armazene senha em texto puro.",
      "Teste senha correta e incorreta.",
      "Regere ID de sessão no login."
    ],
    "docs": "https://www.php.net/manual/pt_BR/function.password-hash.php",
    "tip": "ESSENCIAL: senha é armazenada em hash, nunca deve ser recuperada/descriptografada.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-csrf-sql-xss",
    "moduleId": "seguranca-projeto",
    "title": "CSRF, SQL injection e XSS",
    "goal": "Aplicar controles corretos ao risco correto.",
    "theory": [
      "SQL injection é mitigada por queries parametrizadas. XSS requer escaping de saída apropriado ao contexto. CSRF exige tokens ou defesas específicas para operações que alteram estado com autenticação por cookie.",
      "Use tokens CSRF gerados com random_bytes e comparados com hash_equals. Verifique autorização por recurso em cada endpoint: login não basta para acesso aos dados de outras pessoas."
    ],
    "example": "<?php\nsession_start();\n$_SESSION[\"csrf\"] ??= bin2hex(random_bytes(32));\n$recebido = (string)($_POST[\"csrf\"] ?? \"\");\nif ($_SERVER[\"REQUEST_METHOD\"] === \"POST\") {\n    if (!hash_equals($_SESSION[\"csrf\"], $recebido)) { http_response_code(403); exit(\"Requisição recusada\"); }\n}\necho \"Fluxo verificado\";",
    "question": "Qual medida protege valores usados em SQL contra injeção?",
    "choices": [
      "Concatenar $_POST",
      "Prepared statements",
      "htmlspecialchars nos valores SQL"
    ],
    "answer": 1,
    "explanation": "SQL parametrizado separa valores de código da consulta.",
    "task": "Proteja cadastro de pizza contra SQL injection, XSS e CSRF; documente cada controle.",
    "checks": [
      "Use prepared statements.",
      "Escape texto ao exibir no HTML.",
      "Valide token CSRF ao receber POST."
    ],
    "docs": "https://www.php.net/manual/pt_BR/security.php",
    "tip": "ESSENCIAL: prepared SQL não substitui escaping HTML; são ataques e controles diferentes.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-api-testes",
    "moduleId": "seguranca-projeto",
    "title": "Respostas JSON, REST e testes",
    "goal": "Criar endpoints previsíveis com teste de comportamento.",
    "theory": [
      "Uma API pode enviar `Content-Type: application/json` e status apropriado com http_response_code. json_encode gera resposta JSON. Valide o corpo recebido e trate falhas sem emitir HTML inesperado.",
      "Testes com phpunit ou scripts de teste devem verificar retornos e casos-limite. Diferencie 400 (solicitação inválida), 401 (sem autenticação), 403 (sem autorização), 404 (não encontrado) e 500 (erro no servidor)."
    ],
    "example": "<?php\nhttp_response_code(200);\nheader(\"Content-Type: application/json; charset=utf-8\");\necho json_encode([\"ok\" => true, \"pedidos\" => []], JSON_THROW_ON_ERROR);",
    "question": "Qual status HTTP representa recurso não encontrado?",
    "choices": [
      "200",
      "404",
      "500"
    ],
    "answer": 1,
    "explanation": "404 identifica recurso não encontrado; 500 indica falha do servidor.",
    "task": "Crie GET /api/pizzas e POST /api/pedidos e teste códigos de resposta.",
    "checks": [
      "Responda com JSON válido.",
      "Valide entrada antes de persistir.",
      "Teste 400/404 e sucesso."
    ],
    "docs": "https://www.php.net/manual/pt_BR/function.http-response-code.php",
    "tip": "ESSENCIAL: 401 exige autenticação; 403 significa acesso negado para a identidade existente.",
    "filename": "exemplo.php"
  },
  {
    "id": "php-projeto-final",
    "moduleId": "seguranca-projeto",
    "title": "Projeto integrador: sistema de pedidos",
    "goal": "Integrar formulário, validação, PDO, transação e relatório.",
    "theory": [
      "Um sistema web real em PHP costuma envolver formulário HTML, captura com $_POST, validação, gravação no banco e exibição segura de resultados. Divida em arquivos reutilizáveis e registre o esquema SQL.",
      "No projeto integrador, implemente catálogo de produtos, criação de pedido, registro de itens e consulta de pedidos. Acrescente segurança básica (CSRF, prepared, escaping) e testes; CRUD administrativo e login são extensões avançadas."
    ],
    "example": "<?php\n// Exemplo de regra de negócio testável.\nfunction calcularPedido(float $preco, int $qtd): float {\n    if ($preco < 0 || $qtd < 1) throw new InvalidArgumentException();\n    return round($preco * $qtd, 2);\n}\necho calcularPedido(34.90, 2);",
    "question": "Ao implementar o fluxo de criação de pedido, qual sequência é mais segura?",
    "choices": [
      "Ler dados → validar → preparar SQL → gravar → responder",
      "Imprimir $_POST direto → concatenar SQL",
      "Abrir banco sem credenciais → executar"
    ],
    "answer": 0,
    "explanation": "Separar entrada, validação, persistência e resposta melhora segurança e correção.",
    "task": "Estude o projeto de pedidos em PHP, execute o schema em MySQL local, conclua um fluxo completo e adapte a modelagem a outro domínio.",
    "checks": [
      "Teste formulário válido e inválido.",
      "Confirme pedido e itens no phpMyAdmin.",
      "Reveja hash, CSRF, PDO e saída segura."
    ],
    "docs": "https://www.php.net/manual/pt_BR/tutorial.forms.php",
    "tip": "ESSENCIAL: exercício integrador junta $_POST, PHP, MySQL, PDO e consulta no phpMyAdmin.",
    "filename": "exemplo.php"
  }
];
export const phpExamQuestions = [
  {
    "key": "php-servidor",
    "moduleId": "primeiros-passos",
    "question": "O que o navegador recebe após uma página PHP ser processada?",
    "choices": [
      "O código PHP com senhas",
      "A saída do PHP, como HTML",
      "O arquivo .php sem interpretação"
    ],
    "answer": 1,
    "explanation": "PHP é interpretado no lado do servidor; o cliente recebe apenas a saída produzida."
  },
  {
    "key": "php-variaveis",
    "moduleId": "primeiros-passos",
    "question": "Como começa o nome de uma variável PHP?",
    "choices": [
      "Com #",
      "Com $",
      "Com let"
    ],
    "answer": 1,
    "explanation": "Em PHP nomes de variáveis usam o prefixo $."
  },
  {
    "key": "php-operadores",
    "moduleId": "logica",
    "question": "O que $a === $b compara?",
    "choices": [
      "Apenas valor",
      "Tipo e valor",
      "Faz uma atribuição"
    ],
    "answer": 1,
    "explanation": "=== faz comparação estrita de valor e tipo."
  },
  {
    "key": "php-repeticoes",
    "moduleId": "logica",
    "question": "Qual laço percorre elementos de um array diretamente?",
    "choices": [
      "foreach",
      "switch",
      "echo"
    ],
    "answer": 0,
    "explanation": "foreach é adequado para percorrer listas e mapas."
  },
  {
    "key": "php-arrays-indexados",
    "moduleId": "arrays",
    "question": "Qual é o primeiro índice do array [\"A\", \"B\"]?",
    "choices": [
      "1",
      "0",
      "-1"
    ],
    "answer": 1,
    "explanation": "Arrays sequenciais normalmente começam com índice 0."
  },
  {
    "key": "php-array-funcoes",
    "moduleId": "arrays",
    "question": "Qual função seleciona elementos que atendem a um predicado?",
    "choices": [
      "array_filter",
      "array_map",
      "count"
    ],
    "answer": 0,
    "explanation": "array_filter mantém os elementos cujo predicado é verdadeiro."
  },
  {
    "key": "php-get-post",
    "moduleId": "formularios",
    "question": "Qual superglobal normalmente recebe campos de formulário method=\"post\"?",
    "choices": [
      "$_GET",
      "$_POST",
      "$_SESSION"
    ],
    "answer": 1,
    "explanation": "$_POST contém campos do formulário POST processados pelo PHP."
  },
  {
    "key": "php-escape-html",
    "moduleId": "formularios",
    "question": "Qual função ajuda a escapar texto não confiável ao exibi-lo em HTML?",
    "choices": [
      "htmlspecialchars",
      "unserialize",
      "include"
    ],
    "answer": 0,
    "explanation": "htmlspecialchars converte caracteres especiais em entidades HTML."
  },
  {
    "key": "php-includes",
    "moduleId": "arquivos-sessoes",
    "question": "Qual constante representa o diretório do arquivo atual?",
    "choices": [
      "__DIR__",
      "$_GET",
      "__FILE_SIZE__"
    ],
    "answer": 0,
    "explanation": "__DIR__ aponta para o diretório do script fonte."
  },
  {
    "key": "php-sessoes",
    "moduleId": "arquivos-sessoes",
    "question": "Qual instrução é usada para iniciar ou retomar uma sessão PHP?",
    "choices": [
      "session_start()",
      "new Session()",
      "session_login()"
    ],
    "answer": 0,
    "explanation": "session_start inicia/retoma a sessão em PHP."
  },
  {
    "key": "php-sql-modelagem",
    "moduleId": "mysql",
    "question": "Qual chave identifica unicamente um registro?",
    "choices": [
      "FOREIGN KEY",
      "PRIMARY KEY",
      "ORDER BY"
    ],
    "answer": 1,
    "explanation": "PRIMARY KEY identifica cada linha da tabela."
  },
  {
    "key": "php-pdo-preparado",
    "moduleId": "mysql",
    "question": "Qual método prepara uma instrução SQL parametrizada?",
    "choices": [
      "$pdo->prepare()",
      "$pdo->echo()",
      "$_POST->query()"
    ],
    "answer": 0,
    "explanation": "prepare define uma consulta que receberá os parâmetros via execute."
  },
  {
    "key": "php-classes",
    "moduleId": "orientacao-objetos",
    "question": "Qual método especial inicializa uma nova instância?",
    "choices": [
      "__construct",
      "__start",
      "newClass"
    ],
    "answer": 0,
    "explanation": "__construct é invocado na criação do objeto."
  },
  {
    "key": "php-exceptions",
    "moduleId": "orientacao-objetos",
    "question": "Qual palavra lança explicitamente uma exceção?",
    "choices": [
      "catch",
      "throw",
      "finally"
    ],
    "answer": 1,
    "explanation": "throw sinaliza um erro para ser tratado pelo chamador."
  },
  {
    "key": "php-passwords",
    "moduleId": "seguranca-projeto",
    "question": "Qual função verifica a senha contra um hash salvo?",
    "choices": [
      "password_verify",
      "md5",
      "json_decode"
    ],
    "answer": 0,
    "explanation": "password_verify compara senha e hash com o algoritmo adequado."
  },
  {
    "key": "php-api-testes",
    "moduleId": "seguranca-projeto",
    "question": "Qual status HTTP representa recurso não encontrado?",
    "choices": [
      "200",
      "404",
      "500"
    ],
    "answer": 1,
    "explanation": "404 identifica recurso não encontrado; 500 indica falha do servidor."
  },
  {
    "key": "extra-1",
    "moduleId": "primeiros-passos",
    "question": "Qual comando verifica erros de sintaxe de um arquivo PHP sem executá-lo?",
    "choices": [
      "php -l arquivo.php",
      "php -S arquivo.php",
      "php --install arquivo.php"
    ],
    "answer": 0,
    "explanation": "php -l faz lint do arquivo."
  },
  {
    "key": "extra-2",
    "moduleId": "logica",
    "question": "Ao usar POST com campo name=\"email\", onde os dados normalmente chegam?",
    "choices": [
      "$_POST[\"email\"]",
      "$_GET[\"id\"]",
      "$_SESSION[\"email\"] sempre"
    ],
    "answer": 0,
    "explanation": "Formulários method=post entregam campos em $_POST."
  },
  {
    "key": "extra-3",
    "moduleId": "arrays",
    "question": "Na expressão $x = \"5\"; $x === 5 resulta em:",
    "choices": [
      "true",
      "false",
      "erro de sintaxe"
    ],
    "answer": 1,
    "explanation": "String e inteiro não têm o mesmo tipo."
  },
  {
    "key": "extra-4",
    "moduleId": "formularios",
    "question": "Um formulário com upload deve usar qual enctype?",
    "choices": [
      "application/json",
      "multipart/form-data",
      "text/plain obrigatório"
    ],
    "answer": 1,
    "explanation": "multipart/form-data permite envio de arquivos."
  },
  {
    "key": "extra-5",
    "moduleId": "arquivos-sessoes",
    "question": "Para pesquisar um nome enviado por usuário no MySQL, a opção segura é:",
    "choices": [
      "\"... WHERE nome = \". $_GET[\"nome\"]",
      "PDO prepare + execute com parâmetro",
      "eval() com variável"
    ],
    "answer": 1,
    "explanation": "Prepared statements previnem injeção via valores."
  },
  {
    "key": "extra-6",
    "moduleId": "mysql",
    "question": "Após um INSERT em pedido e itens, uma falha nos itens deve provocar:",
    "choices": [
      "commit imediatamente",
      "rollBack da transação",
      "reload da página apenas"
    ],
    "answer": 1,
    "explanation": "Transação deve preservar consistência."
  },
  {
    "key": "extra-7",
    "moduleId": "orientacao-objetos",
    "question": "Qual é a saída esperada de password_verify com senha incorreta?",
    "choices": [
      "false",
      "a senha original",
      "um hash novo"
    ],
    "answer": 0,
    "explanation": "A função retorna false quando a senha não corresponde ao hash."
  },
  {
    "key": "extra-8",
    "moduleId": "seguranca-projeto",
    "question": "Um usuário autenticado tenta excluir pedido de outra conta. Qual teste deve ser obrigatório?",
    "choices": [
      "Autorização por proprietário do recurso",
      "Somente sessão iniciada",
      "Somente o botão estar oculto"
    ],
    "answer": 0,
    "explanation": "Autenticação não substitui autorização por objeto."
  }
];
export function findPhpLesson(id){ return phpLessons.find(l=>l.id===id); }
export function phpModuleForLesson(id){ return phpModules.find(m=>m.lessonIds.includes(id)); }
