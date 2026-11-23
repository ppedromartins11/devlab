/** Regras didáticas para selecionar um conceito presente no código de cada aula. */
export const microRulebook = [
  {
    "token": "useState",
    "topic": "estado React",
    "purpose": "guarda valores entre renderizações",
    "clues": "estado react",
    "alts": [
      "useEffect",
      "useMemo"
    ]
  },
  {
    "token": "useEffect",
    "topic": "efeitos React",
    "purpose": "sincroniza um componente com sistemas externos",
    "clues": "efeito react",
    "alts": [
      "useState",
      "useMemo"
    ]
  },
  {
    "token": "AbortController",
    "topic": "cancelamento de rede",
    "purpose": "sinaliza que uma operação aguardável deve ser cancelada",
    "clues": "cancelar requisição abort",
    "alts": [
      "Promise",
      "URL"
    ]
  },
  {
    "token": "aria-label",
    "topic": "acessibilidade",
    "purpose": "fornece nome acessível ao controle",
    "clues": "aria acessibilidade",
    "alts": [
      "tabindex",
      "class"
    ]
  },
  {
    "token": "addEventListener",
    "topic": "eventos",
    "purpose": "registra um ouvinte de eventos em um elemento",
    "clues": "evento clique dom",
    "alts": [
      "querySelector",
      "appendChild"
    ]
  },
  {
    "token": "querySelector",
    "topic": "seletores DOM",
    "purpose": "busca um elemento usando um seletor CSS",
    "clues": "dom elemento seletor",
    "alts": [
      "createElement",
      "getComputedStyle"
    ]
  },
  {
    "token": "textContent",
    "topic": "renderização segura",
    "purpose": "altera texto sem interpretar marcação HTML",
    "clues": "dom renderização segurança",
    "alts": [
      "innerHTML",
      "outerHTML"
    ]
  },
  {
    "token": "preventDefault",
    "topic": "eventos de formulário",
    "purpose": "impede a ação padrão disparada por um evento",
    "clues": "formulário submit evento",
    "alts": [
      "stopPropagation",
      "removeEventListener"
    ]
  },
  {
    "token": "localStorage",
    "topic": "armazenamento do navegador",
    "purpose": "guarda strings que persistem entre recarregamentos",
    "clues": "storage armazenamento persistência",
    "alts": [
      "sessionStorage",
      "console"
    ]
  },
  {
    "token": "JSON.parse",
    "topic": "leitura de JSON",
    "purpose": "interpreta uma string JSON válida",
    "clues": "json dados",
    "alts": [
      "JSON.stringify",
      "String"
    ]
  },
  {
    "token": "JSON.stringify",
    "topic": "serialização JSON",
    "purpose": "converte um valor compatível em texto JSON",
    "clues": "json serialização",
    "alts": [
      "JSON.parse",
      "Object.keys"
    ]
  },
  {
    "token": "Promise.allSettled",
    "topic": "concorrência de Promises",
    "purpose": "permite inspecionar os resultados de todas as operações",
    "clues": "promise concorrência",
    "alts": [
      "Promise.all",
      "Promise.race"
    ]
  },
  {
    "token": "Promise.all",
    "topic": "concorrência de Promises",
    "purpose": "aguarda os resultados de várias operações",
    "clues": "promise concorrência",
    "alts": [
      "Promise.race",
      "Promise.resolve"
    ]
  },
  {
    "token": "async",
    "topic": "função assíncrona",
    "purpose": "declara uma função que retorna uma Promise",
    "clues": "async concorrência",
    "alts": [
      "await",
      "yield"
    ]
  },
  {
    "token": "await",
    "topic": "espera assíncrona",
    "purpose": "aguarda o resultado de uma Promise",
    "clues": "async promise requisição",
    "alts": [
      "return",
      "yield"
    ]
  },
  {
    "token": "fetch",
    "topic": "requisição HTTP",
    "purpose": "solicita um recurso ao servidor",
    "clues": "fetch api http",
    "alts": [
      "alert",
      "querySelector"
    ]
  },
  {
    "token": ".filter",
    "topic": "filtro de coleção",
    "purpose": "seleciona elementos que atendem a um critério",
    "clues": "filtrar coleção array",
    "alts": [
      " .map",
      ".reduce"
    ]
  },
  {
    "token": ".map",
    "topic": "transformação de coleção",
    "purpose": "produz uma nova coleção a partir de cada elemento",
    "clues": "map coleção renderização",
    "alts": [
      " .filter",
      ".push"
    ]
  },
  {
    "token": ".reduce",
    "topic": "acumulação",
    "purpose": "combina elementos em um resultado acumulado",
    "clues": "reduce agregação coleção",
    "alts": [
      ".map",
      ".filter"
    ]
  },
  {
    "token": ".push",
    "topic": "inserção em array",
    "purpose": "adiciona elementos ao final do array",
    "clues": "array lista coleção",
    "alts": [
      ".slice",
      ".find"
    ]
  },
  {
    "token": ".trim",
    "topic": "normalização de texto",
    "purpose": "remove espaços das extremidades da string",
    "clues": "string texto validação",
    "alts": [
      ".split",
      ".join"
    ]
  },
  {
    "token": "console.log",
    "topic": "depuração",
    "purpose": "registra um valor no console",
    "clues": "console debug erro",
    "alts": [
      "console.error",
      "alert"
    ]
  },
  {
    "token": "throw",
    "topic": "exceção",
    "purpose": "sinaliza uma falha por meio de exceção",
    "clues": "erro exceção validação",
    "alts": [
      "return",
      "break"
    ]
  },
  {
    "token": "return",
    "topic": "retorno de função",
    "purpose": "devolve um valor ao chamador da função",
    "clues": "função método retorno",
    "alts": [
      "break",
      "continue"
    ]
  },
  {
    "token": "export",
    "topic": "exportação de módulo",
    "purpose": "expõe uma declaração para outros módulos",
    "clues": "módulo import export",
    "alts": [
      "import",
      "require"
    ]
  },
  {
    "token": "import",
    "topic": "dependências de módulo",
    "purpose": "declara uma dependência de um módulo",
    "clues": "import módulo dependências",
    "alts": [
      "export",
      "require"
    ]
  },
  {
    "token": "class",
    "topic": "classe",
    "purpose": "declara um modelo de objetos",
    "clues": "classe poo objeto",
    "alts": [
      "interface",
      "function"
    ]
  },
  {
    "token": "interface",
    "topic": "contrato estrutural",
    "purpose": "descreve a estrutura exigida de um objeto ou implementação",
    "clues": "interface contrato tipos",
    "alts": [
      "class",
      "type"
    ]
  },
  {
    "token": "Readonly",
    "topic": "tipo derivado",
    "purpose": "restringe a reatribuição de propriedades no typecheck",
    "clues": "readonly imutabilidade tipo",
    "alts": [
      "Partial",
      "Omit"
    ]
  },
  {
    "token": "Partial",
    "topic": "tipo utilitário",
    "purpose": "torna opcionais as propriedades de um tipo derivado",
    "clues": "utility mapped opcional",
    "alts": [
      "Readonly",
      "Pick"
    ]
  },
  {
    "token": "Omit",
    "topic": "tipo utilitário",
    "purpose": "retira propriedades de um tipo derivado",
    "clues": "utility omit dto",
    "alts": [
      "Pick",
      "Readonly"
    ]
  },
  {
    "token": "keyof",
    "topic": "chaves de tipo",
    "purpose": "representa as chaves de um objeto tipado",
    "clues": "generic chaves keyof",
    "alts": [
      "typeof",
      "instanceof"
    ]
  },
  {
    "token": "unknown",
    "topic": "validação de tipo",
    "purpose": "exige refinar o tipo antes de usar o valor",
    "clues": "unknown narrowing tipo",
    "alts": [
      "any",
      "never"
    ]
  },
  {
    "token": "number",
    "topic": "número TypeScript",
    "purpose": "representa números com tipagem estática",
    "clues": "tipo number tipagem",
    "alts": [
      "string",
      "boolean"
    ]
  },
  {
    "token": "string",
    "topic": "texto TypeScript",
    "purpose": "representa valores textuais tipados",
    "clues": "tipo string tipagem",
    "alts": [
      "number",
      "boolean"
    ]
  },
  {
    "token": "const",
    "topic": "vinculação imutável",
    "purpose": "declara uma referência que não pode ser reatribuída",
    "clues": "variáveis const valores",
    "alts": [
      "let",
      "var"
    ]
  },
  {
    "token": "let",
    "topic": "variável reatribuível",
    "purpose": "permite atribuir um novo valor à variável",
    "clues": "variáveis let estado",
    "alts": [
      "const",
      "var"
    ]
  },
  {
    "token": "if",
    "topic": "decisão condicional",
    "purpose": "executa código somente quando a condição é verdadeira",
    "clues": "condição decisão lógica",
    "alts": [
      "for",
      "while"
    ]
  },
  {
    "token": "for",
    "topic": "repetição",
    "purpose": "repete operações durante uma iteração",
    "clues": "loop repetição iteração",
    "alts": [
      "if",
      "while"
    ]
  },
  {
    "token": "function",
    "topic": "função",
    "purpose": "declara uma operação reutilizável",
    "clues": "função método declaração",
    "alts": [
      "class",
      "const"
    ]
  },
  {
    "token": "<main",
    "topic": "conteúdo principal HTML",
    "purpose": "identifica a região principal da página",
    "clues": "html semântica documento",
    "alts": [
      "<head",
      "<aside"
    ]
  },
  {
    "token": "<nav",
    "topic": "navegação semântica",
    "purpose": "identifica uma região de navegação",
    "clues": "links semântica navegação",
    "alts": [
      "<section",
      "<footer"
    ]
  },
  {
    "token": "<form",
    "topic": "formulário HTML",
    "purpose": "agrupa entradas para o envio de dados",
    "clues": "formulário entrada input",
    "alts": [
      "<div",
      "<article"
    ]
  },
  {
    "token": "<label",
    "topic": "rótulo acessível",
    "purpose": "descreve um campo de formulário",
    "clues": "formulário acessibilidade label",
    "alts": [
      "<span",
      "<div"
    ]
  },
  {
    "token": "<button",
    "topic": "controle de ação",
    "purpose": "declara um elemento acionável por teclado",
    "clues": "botão button semântica",
    "alts": [
      "<a",
      "<span"
    ]
  },
  {
    "token": "<img",
    "topic": "imagem HTML",
    "purpose": "exibe uma imagem que pode ter texto alternativo",
    "clues": "imagem alt links",
    "alts": [
      "<div",
      "<a"
    ]
  },
  {
    "token": "<a",
    "topic": "link HTML",
    "purpose": "permite navegar para outro recurso",
    "clues": "link navegação href",
    "alts": [
      "<button",
      "<span"
    ]
  },
  {
    "token": "<section",
    "topic": "seção HTML",
    "purpose": "agrupa uma região temática",
    "clues": "semântica seção html",
    "alts": [
      "<span",
      "<meta"
    ]
  },
  {
    "token": "<input",
    "topic": "campo HTML",
    "purpose": "declara um controle de entrada",
    "clues": "input formulário",
    "alts": [
      "<output",
      "<meta"
    ]
  },
  {
    "token": "grid-template-columns",
    "topic": "colunas CSS Grid",
    "purpose": "define as colunas do layout",
    "clues": "grid colunas layout",
    "alts": [
      "grid-auto-flow",
      "gap"
    ]
  },
  {
    "token": "flex-direction",
    "topic": "eixo flexível",
    "purpose": "define o eixo principal da organização flex",
    "clues": "flexbox flex layout",
    "alts": [
      "align-items",
      "gap"
    ]
  },
  {
    "token": "@media",
    "topic": "regra responsiva",
    "purpose": "aplica CSS quando a condição de mídia é atendida",
    "clues": "responsivo media breakpoint",
    "alts": [
      "@keyframes",
      "@import"
    ]
  },
  {
    "token": "clamp",
    "topic": "dimensão CSS flexível",
    "purpose": "limita o valor dentro de um intervalo",
    "clues": "css tipografia responsivo",
    "alts": [
      "minmax",
      "calc"
    ]
  },
  {
    "token": "minmax",
    "topic": "faixa CSS Grid",
    "purpose": "define mínimos e máximos para trilhas",
    "clues": "grid css layout",
    "alts": [
      "clamp",
      "calc"
    ]
  },
  {
    "token": "display",
    "topic": "layout CSS",
    "purpose": "define o modelo de exibição do elemento",
    "clues": "layout css flex grid",
    "alts": [
      "position",
      "visibility"
    ]
  },
  {
    "token": "casefold",
    "topic": "comparação de strings Python",
    "purpose": "normaliza caixa Unicode para comparação",
    "clues": "strings unicode texto",
    "alts": [
      "strip",
      "split"
    ]
  },
  {
    "token": "dataclass",
    "topic": "modelo de dados Python",
    "purpose": "gera métodos comuns de uma classe de dados",
    "clues": "dataclass classe poo",
    "alts": [
      "staticmethod",
      "property"
    ]
  },
  {
    "token": "TaskGroup",
    "topic": "concorrência Python",
    "purpose": "organiza um conjunto de tarefas assíncronas",
    "clues": "async concorrência task",
    "alts": [
      "sleep",
      "gather"
    ]
  },
  {
    "token": "yield",
    "topic": "gerador Python",
    "purpose": "produz um item mantendo o estado da iteração",
    "clues": "iterador generator yield",
    "alts": [
      "return",
      "break"
    ]
  },
  {
    "token": "pathlib",
    "topic": "caminhos Python",
    "purpose": "fornece operações sobre caminhos",
    "clues": "arquivo path caminhos",
    "alts": [
      "json",
      "sys"
    ]
  },
  {
    "token": "json.loads",
    "topic": "JSON Python",
    "purpose": "interpreta texto JSON como objeto Python",
    "clues": "json arquivo persistência",
    "alts": [
      "json.dumps",
      "str"
    ]
  },
  {
    "token": "json.dumps",
    "topic": "JSON Python",
    "purpose": "serializa objeto Python para texto JSON",
    "clues": "json arquivo persistência",
    "alts": [
      "json.loads",
      "str"
    ]
  },
  {
    "token": "sqlite3.connect",
    "topic": "banco SQLite",
    "purpose": "abre uma conexão com um arquivo ou banco temporário",
    "clues": "sqlite banco persistência",
    "alts": [
      "json.dumps",
      "open"
    ]
  },
  {
    "token": "with",
    "topic": "gerenciamento de recursos",
    "purpose": "delimita o uso seguro de recursos",
    "clues": "arquivos with contexto",
    "alts": [
      "try",
      "for"
    ]
  },
  {
    "token": "except",
    "topic": "tratamento de erros",
    "purpose": "captura a exceção correspondente",
    "clues": "erro except tratamento",
    "alts": [
      "finally",
      "return"
    ]
  },
  {
    "token": "raise",
    "topic": "lançamento de erro",
    "purpose": "sinaliza uma falha detectada",
    "clues": "exceção validação erro",
    "alts": [
      "print",
      "return"
    ]
  },
  {
    "token": "lambda",
    "topic": "função anônima",
    "purpose": "descreve uma função de expressão única",
    "clues": "lambda função",
    "alts": [
      "def",
      "return"
    ]
  },
  {
    "token": "def",
    "topic": "declaração Python",
    "purpose": "introduz uma função Python",
    "clues": "função método python",
    "alts": [
      "class",
      "return"
    ]
  },
  {
    "token": "print",
    "topic": "saída Python",
    "purpose": "escreve valores na saída padrão",
    "clues": "saída variável print",
    "alts": [
      "input",
      "return"
    ]
  },
  {
    "token": "PreparedStatement",
    "topic": "SQL parametrizado Java",
    "purpose": "separa comandos de valores em consultas JDBC",
    "clues": "jdbc sql banco",
    "alts": [
      "Statement",
      "ResultSet"
    ]
  },
  {
    "token": "ExecutorService",
    "topic": "concorrência Java",
    "purpose": "gerencia um pool de tarefas concorrentes",
    "clues": "thread concorrência executor",
    "alts": [
      "Future",
      "Thread"
    ]
  },
  {
    "token": "HttpClient",
    "topic": "requisição Java",
    "purpose": "cria um cliente HTTP",
    "clues": "http rede cliente",
    "alts": [
      "HttpRequest",
      "Socket"
    ]
  },
  {
    "token": "System.out.println",
    "topic": "saída Java",
    "purpose": "escreve uma linha no console",
    "clues": "java main console",
    "alts": [
      "System.err.println",
      "return"
    ]
  },
  {
    "token": "record",
    "topic": "modelo Java",
    "purpose": "declara um tipo de dados com métodos padronizados",
    "clues": "record imutabilidade domínio",
    "alts": [
      "class",
      "interface"
    ]
  },
  {
    "token": "implements",
    "topic": "contrato Java",
    "purpose": "declara que uma classe implementa uma interface",
    "clues": "interface contrato polimorfismo",
    "alts": [
      "extends",
      "import"
    ]
  },
  {
    "token": "extends",
    "topic": "herança Java",
    "purpose": "indica um subtipo que estende uma classe",
    "clues": "herança poo",
    "alts": [
      "implements",
      "import"
    ]
  },
  {
    "token": "new",
    "topic": "instanciação Java",
    "purpose": "cria uma instância de classe",
    "clues": "classe objeto construtor",
    "alts": [
      "return",
      "static"
    ]
  },
  {
    "token": "private",
    "topic": "encapsulamento Java",
    "purpose": "restringe acesso direto a um membro",
    "clues": "poo campo classe",
    "alts": [
      "public",
      "static"
    ]
  },
  {
    "token": "public",
    "topic": "visibilidade Java",
    "purpose": "marca um membro como acessível publicamente",
    "clues": "main classe visibilidade",
    "alts": [
      "private",
      "protected"
    ]
  },
  {
    "token": "static",
    "topic": "membro de classe Java",
    "purpose": "associa um membro à classe e não a uma instância",
    "clues": "java main static",
    "alts": [
      "final",
      "private"
    ]
  },
  {
    "token": "List",
    "topic": "coleção Java",
    "purpose": "representa uma coleção ordenada e tipada",
    "clues": "coleção list generic",
    "alts": [
      "Map",
      "Set"
    ]
  },
  {
    "token": "password_hash",
    "topic": "hash de senha PHP",
    "purpose": "cria um hash para armazenamento seguro",
    "clues": "senha hash autenticação",
    "alts": [
      "password_verify",
      "hash"
    ]
  },
  {
    "token": "password_verify",
    "topic": "verificação PHP",
    "purpose": "compara uma senha com o hash armazenado",
    "clues": "senha hash login",
    "alts": [
      "password_hash",
      "hash"
    ]
  },
  {
    "token": "htmlspecialchars",
    "topic": "escape HTML",
    "purpose": "impede que texto seja interpretado como marcação",
    "clues": "xss segurança escape",
    "alts": [
      "strip_tags",
      "htmlentities"
    ]
  },
  {
    "token": "session_start",
    "topic": "sessão PHP",
    "purpose": "inicia ou retoma a sessão no servidor",
    "clues": "sessão login cookie",
    "alts": [
      "session_destroy",
      "header"
    ]
  },
  {
    "token": "json_encode",
    "topic": "JSON PHP",
    "purpose": "serializa dados PHP para formato JSON",
    "clues": "json api encode",
    "alts": [
      "json_decode",
      "serialize"
    ]
  },
  {
    "token": "json_decode",
    "topic": "JSON PHP",
    "purpose": "lê uma string JSON em valores PHP",
    "clues": "json api decode",
    "alts": [
      "json_encode",
      "unserialize"
    ]
  },
  {
    "token": "PDO",
    "topic": "persistência PHP",
    "purpose": "usa uma API de conexão a bancos",
    "clues": "pdo mysql banco",
    "alts": [
      "mysqli",
      "SQLite3"
    ]
  },
  {
    "token": "prepare",
    "topic": "instrução parametrizada",
    "purpose": "prepara um comando SQL para receber valores",
    "clues": "pdo sql prepared",
    "alts": [
      "query",
      "exec"
    ]
  },
  {
    "token": "execute",
    "topic": "execução de statement",
    "purpose": "executa uma instrução preparada",
    "clues": "pdo sql statement",
    "alts": [
      "prepare",
      "fetch"
    ]
  },
  {
    "token": "$_POST",
    "topic": "formulário PHP",
    "purpose": "lê dados enviados pelo método POST",
    "clues": "formulário post entrada",
    "alts": [
      "$_GET",
      "$_SERVER"
    ]
  },
  {
    "token": "$_GET",
    "topic": "parâmetros PHP",
    "purpose": "lê campos enviados na URL",
    "clues": "formulário get consulta",
    "alts": [
      "$_POST",
      "$_COOKIE"
    ]
  },
  {
    "token": "foreach",
    "topic": "iteração PHP",
    "purpose": "percorre valores de uma coleção",
    "clues": "array laço repetição",
    "alts": [
      "while",
      "switch"
    ]
  },
  {
    "token": "match",
    "topic": "seleção PHP",
    "purpose": "produz um resultado conforme o caso correspondente",
    "clues": "match condição expressão",
    "alts": [
      "switch",
      "if"
    ]
  },
  {
    "token": "echo",
    "topic": "saída PHP",
    "purpose": "emite texto na resposta do servidor",
    "clues": "php saída servidor",
    "alts": [
      "print_r",
      "var_dump"
    ]
  },
  {
    "token": "readonly",
    "topic": "propriedade PHP",
    "purpose": "restringe reatribuições da propriedade",
    "clues": "php objeto poo",
    "alts": [
      "private",
      "static"
    ]
  },
  {
    "token": "ROW_NUMBER",
    "topic": "janela SQL",
    "purpose": "atribui numeração sequencial",
    "clues": "window janela rank",
    "alts": [
      "RANK",
      "COUNT"
    ]
  },
  {
    "token": "RANK",
    "topic": "ranking SQL",
    "purpose": "atribui a mesma classificação a empates",
    "clues": "rank janela classificação",
    "alts": [
      "ROW_NUMBER",
      "COUNT"
    ]
  },
  {
    "token": "EXPLAIN",
    "topic": "plano SQL",
    "purpose": "mostra o plano de execução de uma consulta",
    "clues": "índice plano otimização explain",
    "alts": [
      "ANALYZE",
      "ORDER BY"
    ]
  },
  {
    "token": "ROLLBACK",
    "topic": "transação SQL",
    "purpose": "desfaz alterações ainda não confirmadas",
    "clues": "transação rollback integridade",
    "alts": [
      "COMMIT",
      "BEGIN"
    ]
  },
  {
    "token": "COMMIT",
    "topic": "transação SQL",
    "purpose": "confirma as alterações de uma transação",
    "clues": "transação commit consistência",
    "alts": [
      "ROLLBACK",
      "BEGIN"
    ]
  },
  {
    "token": "BEGIN",
    "topic": "transação SQL",
    "purpose": "inicia o bloco transacional",
    "clues": "transação begin",
    "alts": [
      "COMMIT",
      "ROLLBACK"
    ]
  },
  {
    "token": "CREATE INDEX",
    "topic": "índice SQL",
    "purpose": "cria uma estrutura para acelerar certas consultas",
    "clues": "índice performance explain",
    "alts": [
      "CREATE VIEW",
      "CREATE TABLE"
    ]
  },
  {
    "token": "PRIMARY KEY",
    "topic": "chave SQL",
    "purpose": "identifica cada linha de modo único",
    "clues": "modelagem chave integridade",
    "alts": [
      "FOREIGN KEY",
      "UNIQUE"
    ]
  },
  {
    "token": "REFERENCES",
    "topic": "chave estrangeira SQL",
    "purpose": "declara referência a outra tabela",
    "clues": "foreign relacionamento integridade",
    "alts": [
      "CHECK",
      "UNIQUE"
    ]
  },
  {
    "token": "CHECK",
    "topic": "restrição SQL",
    "purpose": "valida um predicado na inserção ou atualização",
    "clues": "constraints integridade modelagem",
    "alts": [
      "DEFAULT",
      "INDEX"
    ]
  },
  {
    "token": "WITH",
    "topic": "CTE SQL",
    "purpose": "nomeia um conjunto intermediário de consulta",
    "clues": "cte subconsulta with",
    "alts": [
      "JOIN",
      "WHERE"
    ]
  },
  {
    "token": "GROUP BY",
    "topic": "agrupamento SQL",
    "purpose": "agrupa registros para agregação",
    "clues": "group agregação agrupamento",
    "alts": [
      "ORDER BY",
      "WHERE"
    ]
  },
  {
    "token": "ORDER BY",
    "topic": "ordenação SQL",
    "purpose": "define a ordem de apresentação dos registros",
    "clues": "order ordenação paginação",
    "alts": [
      "GROUP BY",
      "LIMIT"
    ]
  },
  {
    "token": "LEFT JOIN",
    "topic": "junção SQL",
    "purpose": "preserva linhas da tabela à esquerda",
    "clues": "join relacionamento",
    "alts": [
      "INNER JOIN",
      "CROSS JOIN"
    ]
  },
  {
    "token": "INNER JOIN",
    "topic": "junção SQL",
    "purpose": "retorna correspondências entre tabelas",
    "clues": "join relacionamento",
    "alts": [
      "LEFT JOIN",
      "CROSS JOIN"
    ]
  },
  {
    "token": "EXISTS",
    "topic": "existência SQL",
    "purpose": "testa se a subconsulta produz ao menos uma linha",
    "clues": "subconsulta exists",
    "alts": [
      "COUNT",
      "IN"
    ]
  },
  {
    "token": "HAVING",
    "topic": "filtro agregado SQL",
    "purpose": "filtra grupos após o agrupamento",
    "clues": "agregação having group",
    "alts": [
      "WHERE",
      "LIMIT"
    ]
  },
  {
    "token": "WHERE",
    "topic": "filtro SQL",
    "purpose": "seleciona registros conforme um predicado",
    "clues": "filtro where consulta",
    "alts": [
      "ORDER BY",
      "GROUP BY"
    ]
  },
  {
    "token": "INSERT INTO",
    "topic": "inserção SQL",
    "purpose": "adiciona registros à tabela",
    "clues": "insert inserção crud",
    "alts": [
      "DELETE FROM",
      "SELECT"
    ]
  },
  {
    "token": "UPDATE",
    "topic": "atualização SQL",
    "purpose": "altera registros existentes",
    "clues": "update atualização crud",
    "alts": [
      "INSERT",
      "SELECT"
    ]
  },
  {
    "token": "DELETE FROM",
    "topic": "exclusão SQL",
    "purpose": "remove registros conforme a condição",
    "clues": "delete exclusão crud",
    "alts": [
      "INSERT INTO",
      "UPDATE"
    ]
  },
  {
    "token": "SELECT",
    "topic": "consulta SQL",
    "purpose": "lê colunas ou expressões do banco",
    "clues": "select consulta sql",
    "alts": [
      "UPDATE",
      "INSERT"
    ]
  },
  {
    "token": "CREATE TABLE",
    "topic": "schema SQL",
    "purpose": "declara tabela e tipos das colunas",
    "clues": "schema tabela ddl modelagem",
    "alts": [
      "CREATE VIEW",
      "SELECT"
    ]
  },
  {
    "token": "Content-Type",
    "topic": "HTTP cabeçalho",
    "purpose": "informa o formato do corpo da mensagem",
    "clues": "http header json",
    "alts": [
      "Accept",
      "Authorization"
    ]
  },
  {
    "token": "HTTP/1.1",
    "topic": "HTTP protocolo",
    "purpose": "indica a versão do protocolo",
    "clues": "http resposta status",
    "alts": [
      "JSON",
      "WebSocket"
    ]
  },
  {
    "token": "GET",
    "topic": "método HTTP",
    "purpose": "solicita a representação de um recurso",
    "clues": "get http api",
    "alts": [
      "POST",
      "DELETE"
    ]
  },
  {
    "token": "POST",
    "topic": "método HTTP",
    "purpose": "envia um corpo de dados ao servidor",
    "clues": "post http api",
    "alts": [
      "GET",
      "PATCH"
    ]
  },
  {
    "token": "201",
    "topic": "status HTTP",
    "purpose": "indica recurso criado",
    "clues": "status http criação",
    "alts": [
      "404",
      "500"
    ]
  }
];
