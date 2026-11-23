/* DevLab 19 — aprofundamentos autorais. Código executado localmente pelo aluno, não no navegador. */
export const extendedPythonLessons = [
  {
    "id": "py-venv",
    "title": "Ambientes virtuais e dependências",
    "goal": "Isolar pacotes por projeto e tornar a instalação reproduzível.",
    "theory": [
      "Um ambiente virtual contém um interpretador e pacotes isolados do sistema. Ele evita que o projeto A dependa acidentalmente das versões instaladas no projeto B.",
      "Crie o ambiente com python -m venv .venv, ative conforme seu sistema e instale dependências pelo gerenciador escolhido. O diretório .venv não deve ser versionado; registre apenas requisitos e instruções."
    ],
    "example": "from pathlib import Path\nimport sys\nprint('Python:', sys.version.split()[0])\nprint('Pasta do projeto:', Path.cwd())\nprint('Ambiente virtual:', sys.prefix != sys.base_prefix)",
    "question": "Por que não versionar a pasta .venv?",
    "choices": [
      "Porque todos os projetos usam os mesmos pacotes",
      "Porque o ambiente depende de máquina e sistema",
      "Porque Python não permite isso"
    ],
    "answer": 1,
    "explanation": "Um ambiente virtual contém caminhos e binários locais; declare dependências e recrie-o.",
    "task": "Prepare projeto com .venv, README e dependências explicitamente registradas. Teste em uma segunda pasta.",
    "checks": [
      "Execute em ambiente ativado e desativado.",
      "Não versiona .venv.",
      "Documente instalação e reprodução."
    ],
    "docs": "https://docs.python.org/3/tutorial/venv.html",
    "level": "Fundamentos",
    "moduleId": "python-expansion"
  },
  {
    "id": "py-strings",
    "title": "Strings, f-strings e Unicode",
    "goal": "Tratar texto e entradas sem suposições sobre caracteres.",
    "theory": [
      "Strings são sequências imutáveis de caracteres Unicode. Use strip para remover espaços externos, casefold para comparação sem diferenciar maiúsculas e minúsculas, e métodos de string com clareza.",
      "Uma string vazia pode ser diferente de uma entrada ausente. Valide tamanho e conteúdo antes de processar. Para arquivos, declare encoding='utf-8'."
    ],
    "example": "nomes = ['  Ana  ', 'ÁLVARO', 'joão']\nnormalizados = [nome.strip().casefold() for nome in nomes]\nprint(sorted(normalizados))",
    "question": "Qual método é adequado para comparação de texto sem diferenciar caixa?",
    "choices": [
      "casefold()",
      "append()",
      "pop()"
    ],
    "answer": 0,
    "explanation": "casefold é voltado para comparação de strings, considerando casos Unicode.",
    "task": "Crie uma busca por nome que normalize entrada e nomes cadastrados sem modificar a lista original.",
    "checks": [
      "Teste acentos e maiúsculas.",
      "Teste entrada vazia.",
      "Mantenha os valores originais intactos."
    ],
    "docs": "https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str",
    "level": "Fundamentos",
    "moduleId": "python-expansion"
  },
  {
    "id": "py-sets-tuples",
    "title": "Tuplas, conjuntos e complexidade",
    "goal": "Escolher estruturas conforme acesso, unicidade e mutabilidade.",
    "theory": [
      "Tuplas agrupam valores em sequência e não permitem alterar seus elementos. Sets representam conjuntos de valores únicos; teste de pertencimento é geralmente eficiente.",
      "A escolha da estrutura determina como você implementa invariantes. Um conjunto não conserva duplicatas e não deve ser usado quando a ordem ou repetição dos dados for requisito central."
    ],
    "example": "usuarios = ['ana', 'bia', 'ana', 'leo']\nunicos = set(usuarios)\nprint(len(unicos))\nponto = (12, 8)\nx, y = ponto\nprint(x + y)",
    "question": "Qual estrutura elimina duplicatas?",
    "choices": [
      "list",
      "set",
      "tuple"
    ],
    "answer": 1,
    "explanation": "set contém valores distintos; list preserva repetições.",
    "task": "Detecte e relate IDs duplicados em uma importação e escreva testes para lista vazia.",
    "checks": [
      "Mostre quais IDs duplicaram.",
      "Preserve a ordem de importação no relatório.",
      "Teste todos distintos e todos iguais."
    ],
    "docs": "https://docs.python.org/3/tutorial/datastructures.html",
    "level": "Intermediário",
    "moduleId": "python-expansion"
  },
  {
    "id": "py-comprehensions",
    "title": "Comprehensions e geradores",
    "goal": "Transformar dados com clareza e controlar uso de memória.",
    "theory": [
      "List comprehensions criam listas a partir de uma iteração. Generator expressions produzem elementos sob demanda, úteis quando não é necessário materializar tudo.",
      "Não concentre lógica complexa e múltiplos efeitos colaterais em uma única comprehension. Prefira uma função explícita quando as transformações são difíceis de explicar."
    ],
    "example": "pedidos = [{'valor': 10, 'ativo': True}, {'valor': 8, 'ativo': False}]\nvalores = (p['valor'] for p in pedidos if p['ativo'])\nprint(sum(valores))",
    "question": "Qual expressão calcula os valores sem criar uma lista intermediária?",
    "choices": [
      "(p['valor'] for p in pedidos)",
      "[p for p in pedidos]",
      "{p: 1 for p in pedidos}"
    ],
    "answer": 0,
    "explanation": "A expressão entre parênteses retorna um iterador gerador.",
    "task": "Calcule total de vendas válidas, separando filtro e regra de soma e cobrindo entrada vazia.",
    "checks": [
      "Inclua vendas canceladas.",
      "Garanta total zero para lista vazia.",
      "Compare uma lista com um gerador."
    ],
    "docs": "https://docs.python.org/3/howto/functional.html",
    "level": "Intermediário",
    "moduleId": "python-expansion"
  },
  {
    "id": "py-dataclasses",
    "title": "Dataclasses e modelagem de domínio",
    "goal": "Representar entidades com campos e regras verificáveis.",
    "theory": [
      "Dataclasses reduzem código repetitivo de inicialização e representação de objetos. Tipos anotados ajudam ferramentas de análise, mas não validam entradas automaticamente em tempo de execução.",
      "Use __post_init__ para rejeitar estados inválidos e prefira métodos com intenção explícita. frozen=True impede reatribuição de atributos, mas não congela objetos mutáveis internos."
    ],
    "example": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Produto:\n    nome: str\n    preco: float\n    def __post_init__(self):\n        if not self.nome.strip() or self.preco < 0:\n            raise ValueError('produto inválido')\n\nprint(Produto('Caderno', 12.5))",
    "question": "O que __post_init__ permite fazer?",
    "choices": [
      "Validar os dados após a inicialização gerada",
      "Instalar pacotes automaticamente",
      "Gravar dados em SQL"
    ],
    "answer": 0,
    "explanation": "Esse método é executado após o __init__ gerado e pode verificar invariantes.",
    "task": "Modele Pedido e ItemPedido, recusando quantidades inválidas e calculando total sem print na regra.",
    "checks": [
      "Teste preço negativo.",
      "Teste pedido vazio.",
      "Calcule um pedido de vários itens."
    ],
    "docs": "https://docs.python.org/3/library/dataclasses.html",
    "level": "Intermediário",
    "moduleId": "python-expansion"
  },
  {
    "id": "py-files-json",
    "title": "Arquivos, JSON e operações seguras",
    "goal": "Persistir dados de modo reproduzível e tratar erros de leitura.",
    "theory": [
      "Pathlib abstrai caminhos de arquivo. JSON é interoperável, porém representa um conjunto restrito de tipos e não deve ser usado para serializar objetos Python arbitrários.",
      "Use with para fechar arquivos, encoding explícito, json.loads para entrada e json.dumps para saída. Trate JSON inválido sem apagar o arquivo original."
    ],
    "example": "from pathlib import Path\nimport json\np = Path('tarefas.json')\ndados = [{'titulo': 'Estudar', 'feito': False}]\np.write_text(json.dumps(dados, ensure_ascii=False, indent=2), encoding='utf-8')\nprint(json.loads(p.read_text(encoding='utf-8')))",
    "question": "Qual operação converte texto JSON em objeto Python?",
    "choices": [
      "json.loads",
      "json.dumps",
      "str"
    ],
    "answer": 0,
    "explanation": "loads interpreta uma string JSON; dumps serializa objetos compatíveis.",
    "task": "Crie um repositório local de tarefas que salva e carrega JSON e recusa arquivo corrompido.",
    "checks": [
      "Teste arquivo ausente.",
      "Teste JSON inválido.",
      "Teste roundtrip com acentos."
    ],
    "docs": "https://docs.python.org/3/library/json.html",
    "level": "Intermediário",
    "moduleId": "python-expansion"
  },
  {
    "id": "py-iterators",
    "title": "Iteradores, yield e processamento incremental",
    "goal": "Percorrer dados grandes sem carregar tudo em memória.",
    "theory": [
      "Um iterador devolve um elemento por chamada de next. Um gerador com yield mantém seu estado entre iterações, útil para leitura por linhas e pipelines de dados.",
      "Geradores são consumíveis: repetir um for sobre o mesmo gerador não recria dados. Se precisar percorrer novamente, chame a função geradora mais uma vez."
    ],
    "example": "def pares(limite):\n    for numero in range(limite):\n        if numero % 2 == 0:\n            yield numero\n\nprint(list(pares(8)))\nprint(sum(pares(100)))",
    "question": "Quantas vezes um gerador pode ser percorrido sem recriá-lo após exaustão?",
    "choices": [
      "Indefinidamente",
      "Uma vez até a exaustão",
      "Apenas duas vezes"
    ],
    "answer": 1,
    "explanation": "Depois que o gerador foi consumido ele precisa ser recriado para repetir o percurso.",
    "task": "Leia um CSV grande linha a linha e gere um relatório sem criar uma lista com todas as linhas.",
    "checks": [
      "Teste arquivo vazio.",
      "Ignore cabeçalho.",
      "Conte linhas inválidas separadamente."
    ],
    "docs": "https://docs.python.org/3/howto/functional.html",
    "level": "Intermediário",
    "moduleId": "python-expansion"
  },
  {
    "id": "py-testing-advanced",
    "title": "Testes parametrizados, mocks e regressão",
    "goal": "Testar regras, entradas inválidas e dependências de forma determinística.",
    "theory": [
      "Um teste unitário verifica comportamento observável, não detalhes de implementação. Use subTest para cenários e mock apenas quando for necessário isolar relógio, rede ou outra dependência externa.",
      "Um mock que responde sempre com o esperado não demonstra que banco ou API reais funcionam. Testes de integração devem verificar o contrato externo de modo isolado."
    ],
    "example": "import unittest\n\ndef dobro(n): return n * 2\n\nclass TestDobro(unittest.TestCase):\n    def test_casos(self):\n        for entrada, saida in [(0, 0), (2, 4), (-3, -6)]:\n            with self.subTest(entrada=entrada):\n                self.assertEqual(dobro(entrada), saida)\n\nunittest.main()",
    "question": "Qual teste valida a integração com um banco real?",
    "choices": [
      "Um mock de banco",
      "Um teste que usa banco isolado e verifica resultado",
      "Um teste que só verifica a importação"
    ],
    "answer": 1,
    "explanation": "Somente a execução contra dependência real pode verificar seu comportamento de integração.",
    "task": "Implemente testes para um cálculo de desconto cobrindo limites, valores negativos e arredondamento.",
    "checks": [
      "Execute os testes antes e depois de corrigir um bug.",
      "Cubra erro conhecido.",
      "Não use testes que sempre retornam True."
    ],
    "docs": "https://docs.python.org/3/library/unittest.html",
    "level": "Intermediário",
    "moduleId": "python-expansion"
  },
  {
    "id": "py-http",
    "title": "HTTP e consumo resiliente de APIs",
    "goal": "Consultar APIs com timeout, validação e tratamento de erros.",
    "theory": [
      "Requisições de rede podem falhar por atraso, DNS, conexão e status HTTP. Defina timeout e valide o status antes de usar o corpo retornado.",
      "Nunca pressuponha que JSON remoto possui todas as propriedades. Para testar offline, injete um cliente falso que devolve respostas controladas, e mantenha um teste de integração separado."
    ],
    "example": "from urllib.request import Request, urlopen\nimport json\n\ndef consultar(url):\n    req = Request(url, headers={'Accept': 'application/json'})\n    with urlopen(req, timeout=5) as resposta:\n        return json.load(resposta)\n\n# Passe uma URL HTTPS de uma API que você controla e trate erros na aplicação.",
    "question": "Por que definir timeout?",
    "choices": [
      "Para impedir que a chamada espere indefinidamente",
      "Para garantir resposta 200",
      "Para não precisar validar JSON"
    ],
    "answer": 0,
    "explanation": "Timeout limita o tempo de espera, mas não elimina falhas que precisam ser tratadas.",
    "task": "Crie um cliente para uma API pública de demonstração: valide status, timeout e ausência de campos.",
    "checks": [
      "Implemente tratamento de falha HTTP.",
      "Teste resposta JSON inválida.",
      "Teste com cliente injetado, sem depender da rede."
    ],
    "docs": "https://docs.python.org/3/library/urllib.request.html",
    "level": "Avançado",
    "moduleId": "python-expansion"
  },
  {
    "id": "py-async",
    "title": "Concorrência assíncrona com asyncio",
    "goal": "Executar tarefas I/O-bound sem bloquear desnecessariamente.",
    "theory": [
      "async def define corrotinas e await suspende o trabalho atual quando a operação é aguardável. Concorrência assíncrona não torna cálculos intensivos de CPU mais rápidos por si só.",
      "TaskGroup aguarda tarefas relacionadas e propaga falhas de forma estruturada. Evite perder referências a tarefas disparadas e inclua cancelamento e encerramento no desenho."
    ],
    "example": "import asyncio\n\nasync def tarefa(nome, atraso):\n    await asyncio.sleep(atraso)\n    return nome\n\nasync def main():\n    async with asyncio.TaskGroup() as grupo:\n        a = grupo.create_task(tarefa('A', 0.01))\n        b = grupo.create_task(tarefa('B', 0.02))\n    print(a.result(), b.result())\n\nasyncio.run(main())",
    "question": "Em qual cenário asyncio normalmente ajuda?",
    "choices": [
      "Cálculo pesado de imagens",
      "Muitas operações de rede aguardando I/O",
      "Substituir validação de dados"
    ],
    "answer": 1,
    "explanation": "asyncio permite alternar entre operações que aguardam I/O; CPU-bound exige outro planejamento.",
    "task": "Implemente três tarefas assíncronas, limite o paralelismo e lide com uma falha simulada.",
    "checks": [
      "Espere todas as tarefas previstas.",
      "Propague erros sem ocultá-los.",
      "Demonstre que uma falha não deixa processos pendurados."
    ],
    "docs": "https://docs.python.org/3/library/asyncio-task.html",
    "level": "Avançado",
    "moduleId": "python-expansion"
  },
  {
    "id": "py-sqlite",
    "title": "Persistência relacional com sqlite3",
    "goal": "Substituir arquivos JSON por banco relacional e consultas parametrizadas.",
    "theory": [
      "sqlite3 permite persistência transacional sem servidor separado. Crie schema com chaves, restrições e índices pertinentes à consulta.",
      "Use parâmetros '?' para valores, nunca interpolação de entrada do usuário em SQL. Controle a conexão e transações; valide casos de duplicidade e integridade."
    ],
    "example": "import sqlite3\nwith sqlite3.connect(':memory:') as db:\n    db.execute('CREATE TABLE tarefas(id INTEGER PRIMARY KEY, titulo TEXT NOT NULL)')\n    db.execute('INSERT INTO tarefas(titulo) VALUES (?)', ('Estudar',))\n    print(db.execute('SELECT titulo FROM tarefas WHERE id = ?', (1,)).fetchone())",
    "question": "Qual consulta usa valores parametrizados corretamente?",
    "choices": [
      "f'SELECT * FROM t WHERE id = {id}'",
      "'SELECT * FROM t WHERE id = ?' com parâmetros",
      "Concatenar valor ao SQL"
    ],
    "answer": 1,
    "explanation": "Placeholders mantêm valores separados do comando SQL.",
    "task": "Construa CRUD de tarefas com sqlite3, testes de persistência, UNIQUE e rollback.",
    "checks": [
      "Teste reinicialização da conexão.",
      "Teste valor inválido.",
      "Teste rollback após erro."
    ],
    "docs": "https://docs.python.org/3/library/sqlite3.html",
    "level": "Intermediário",
    "moduleId": "python-expansion"
  },
  {
    "id": "py-design",
    "title": "Arquitetura, CLI e projeto integrador",
    "goal": "Entregar aplicação Python modular e verificável.",
    "theory": [
      "Separe domínio, persistência e apresentação, evitando que regra de negócio dependa da entrada do terminal. Defina interfaces claras entre módulos.",
      "Uma CLI com argparse é útil para operacionalizar o programa. A conclusão exige README, testes, organização de dependências e validação de casos de falha, não apenas imprimir uma mensagem de sucesso."
    ],
    "example": "import argparse\n\ndef executar(argv=None):\n    parser = argparse.ArgumentParser()\n    parser.add_argument('titulo')\n    args = parser.parse_args(argv)\n    print('Criada:', args.titulo)\n\nif __name__ == '__main__':\n    executar()",
    "question": "Por que separar regra de negócio da CLI?",
    "choices": [
      "Para poder testar regras sem depender de input()",
      "Para eliminar todo erro",
      "Para não criar funções"
    ],
    "answer": 0,
    "explanation": "A separação permite testar o domínio com entradas controladas e reutilizá-lo em outras interfaces.",
    "task": "Entregue gerenciador de tarefas com CLI, SQLite, testes unitários e de integração, README e tratamento de erros.",
    "checks": [
      "Implemente fluxo completo de criação e conclusão.",
      "Execute testes de persistência e validação.",
      "Documente instalação, execução, arquitetura e limites."
    ],
    "docs": "https://docs.python.org/3/library/argparse.html",
    "level": "Avançado",
    "moduleId": "python-expansion"
  }
];

export const extendedJavaLessons = [
  {
    "id": "java-build",
    "title": "Maven, módulos e organização",
    "goal": "Criar projetos Java com dependências e execução reproduzível.",
    "theory": [
      "Maven organiza compilação, testes e dependências por meio do pom.xml. A estrutura src/main/java e src/test/java separa produto e testes.",
      "Dependências externas devem ter versão e procedência revisadas. Use o wrapper quando disponível e não adicione JARs manualmente sem justificativa."
    ],
    "example": "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Projeto Java pronto para compilar\");\n  }\n}",
    "question": "Qual arquivo declara dependências em um projeto Maven?",
    "choices": [
      "package.json",
      "pom.xml",
      "Cargo.toml"
    ],
    "answer": 1,
    "explanation": "pom.xml descreve as dependências e o ciclo de build Maven.",
    "task": "Crie projeto Maven, documente comandos de build, execute testes e faça um build limpo.",
    "checks": [
      "Build sem arquivos temporários antigos.",
      "README com instruções reproduzíveis.",
      "Teste e compilação executam sem IDE."
    ],
    "docs": "https://dev.java/learn/",
    "level": "Fundamentos",
    "moduleId": "java-expansion"
  },
  {
    "id": "java-strings",
    "title": "String, igualdade e imutabilidade",
    "goal": "Tratar texto sem erro de comparação e entradas inválidas.",
    "theory": [
      "String é imutável. Métodos como strip criam novos objetos; comparar texto pelo conteúdo exige equals, e não ==.",
      "Para construir grandes textos em laço, StringBuilder evita concatenações repetitivas. Considere locale e Unicode para casos que exigem regras regionais."
    ],
    "example": "public class Main {\n public static void main(String[] args) {\n  String nome = \"  Ana  \".strip();\n  String outro = new String(\"Ana\");\n  System.out.println(nome.equals(outro));\n }\n}",
    "question": "Qual operação compara o conteúdo de String?",
    "choices": [
      "==",
      "equals",
      "="
    ],
    "answer": 1,
    "explanation": "equals testa o conteúdo textual, enquanto == compara referências.",
    "task": "Implemente busca em catálogo por nome, tratando vazio e espaços externos.",
    "checks": [
      "Teste String vazia.",
      "Teste textos equivalentes de instâncias diferentes.",
      "Evite == para conteúdo."
    ],
    "docs": "https://dev.java/learn/language-basics/",
    "level": "Fundamentos",
    "moduleId": "java-expansion"
  },
  {
    "id": "java-interfaces",
    "title": "Interfaces e polimorfismo",
    "goal": "Separar contratos de implementações.",
    "theory": [
      "Uma interface especifica comportamentos públicos. Diferentes implementações podem cumprir o mesmo contrato, permitindo trocar persistência sem reescrever domínio.",
      "Polimorfismo não exige herança de implementação. Prefira composição e interfaces pequenas, com testes para cada implementação."
    ],
    "example": "interface Notificador { void enviar(String mensagem); }\nclass ConsoleNotificador implements Notificador {\n public void enviar(String mensagem) { System.out.println(mensagem); }\n}\npublic class Main {\n public static void main(String[] args) { Notificador n = new ConsoleNotificador(); n.enviar(\"Olá\"); }\n}",
    "question": "Qual benefício uma interface oferece?",
    "choices": [
      "Garantia de execução em paralelo",
      "Contrato comum para implementações diferentes",
      "Elimina todos os testes"
    ],
    "answer": 1,
    "explanation": "Interfaces permitem acoplamento ao contrato, não a uma classe concreta.",
    "task": "Modele serviço de notificações com interface e implementações de console e memória.",
    "checks": [
      "Teste contrato das duas implementações.",
      "Não acople domínio à saída de console.",
      "Trate mensagem vazia."
    ],
    "docs": "https://dev.java/learn/",
    "level": "Intermediário",
    "moduleId": "java-expansion"
  },
  {
    "id": "java-records",
    "title": "Records, imutabilidade e validação",
    "goal": "Modelar valores simples com invariantes.",
    "theory": [
      "Record gera construtor, acessores, equals, hashCode e toString para componentes. É adequado a modelos de valor, respostas e eventos.",
      "Valide componentes no construtor compacto. Record é raso: um componente do tipo lista ainda pode conter objeto mutável, exigindo cópia defensiva."
    ],
    "example": "record Produto(String nome, double preco) {\n Produto { if (nome == null || nome.isBlank() || preco < 0) throw new IllegalArgumentException(); }\n}\npublic class Main {\n public static void main(String[] args) { System.out.println(new Produto(\"Livro\", 25)); }\n}",
    "question": "Um record torna uma List interna automaticamente imutável?",
    "choices": [
      "Sim",
      "Não, a imutabilidade é rasa",
      "Somente no modo debug"
    ],
    "answer": 1,
    "explanation": "Record não congela objetos armazenados em seus componentes.",
    "task": "Modele um registro PedidoItem com validação e cópia segura de coleções onde necessário.",
    "checks": [
      "Teste criação inválida.",
      "Teste equals para valores equivalentes.",
      "Evite expor coleção mutável."
    ],
    "docs": "https://dev.java/learn/",
    "level": "Intermediário",
    "moduleId": "java-expansion"
  },
  {
    "id": "java-generics",
    "title": "Generics, Optional e tipos",
    "goal": "Evitar conversões inseguras e valores ausentes ambíguos.",
    "theory": [
      "Generics permitem escrever coleções e abstrações parametrizadas por tipo. A verificação ocorre na compilação, evitando casts desnecessários.",
      "Optional<T> comunica ausência em retorno de busca, mas não substitui validação de argumentos nem deve ser usado indiscriminadamente como campo de entidade."
    ],
    "example": "import java.util.*;\npublic class Main {\n static Optional<String> buscar(Map<Integer,String> dados, int id) { return Optional.ofNullable(dados.get(id)); }\n public static void main(String[] args) { System.out.println(buscar(Map.of(1,\"Ana\"), 2).orElse(\"não encontrado\")); }\n}",
    "question": "Qual tipo expressa um resultado de busca que pode não existir?",
    "choices": [
      "Optional<T>",
      "int[]",
      "StringBuilder"
    ],
    "answer": 0,
    "explanation": "Optional permite distinguir resultado presente e ausente explicitamente.",
    "task": "Construa repositório em memória genérico que retorna Optional e nunca lança NullPointerException em busca ausente.",
    "checks": [
      "Teste item presente.",
      "Teste id inexistente.",
      "Evite casts não verificados."
    ],
    "docs": "https://dev.java/learn/api/",
    "level": "Intermediário",
    "moduleId": "java-expansion"
  },
  {
    "id": "java-streams",
    "title": "Stream API e operações funcionais",
    "goal": "Filtrar, transformar e agregar dados sem efeitos colaterais.",
    "theory": [
      "Stream API processa sequências com filter, map, sorted e collect. Operações intermediárias são avaliadas somente quando uma operação terminal é executada.",
      "Não modifique a coleção de origem durante o pipeline. Paralelismo não garante desempenho melhor e pode introduzir condições de corrida."
    ],
    "example": "import java.util.*;\npublic class Main {\n public static void main(String[] args) {\n  List<Integer> notas = List.of(4,7,9,10);\n  int total = notas.stream().filter(n -> n >= 7).mapToInt(Integer::intValue).sum();\n  System.out.println(total);\n }\n}",
    "question": "Em um Stream, qual operação dispara o processamento?",
    "choices": [
      "filter",
      "map",
      "sum"
    ],
    "answer": 2,
    "explanation": "sum é terminal e efetua o processamento das etapas anteriores.",
    "task": "Agregue pedidos por status e calcule total, primeiro com loops e depois com Streams.",
    "checks": [
      "Teste lista vazia.",
      "Compare resultados das duas soluções.",
      "Não introduza mutação compartilhada no pipeline."
    ],
    "docs": "https://dev.java/learn/api/collections-and-streams/streams/",
    "level": "Intermediário",
    "moduleId": "java-expansion"
  },
  {
    "id": "java-exceptions",
    "title": "Exceções e try-with-resources",
    "goal": "Tratar falhas sem ocultar contexto.",
    "theory": [
      "Checked exceptions exigem tratamento ou declaração. Exceções de domínio devem comunicar invariantes violados e não ser substituídas por retornos silenciosos.",
      "try-with-resources fecha recursos AutoCloseable mesmo quando ocorre exceção. Evite capturar Exception apenas para imprimir e continuar em estado incoerente."
    ],
    "example": "import java.io.*;\npublic class Main {\n public static void main(String[] args) throws IOException {\n  try (StringReader reader = new StringReader(\"abc\")) { System.out.println((char) reader.read()); }\n }\n}",
    "question": "Qual recurso fecha AutoCloseable automaticamente?",
    "choices": [
      "try-with-resources",
      "System.out.println",
      "break"
    ],
    "answer": 0,
    "explanation": "try-with-resources fecha recursos ao sair do bloco.",
    "task": "Implemente leitor de arquivo com erro distinguível para arquivo ausente e conteúdo inválido.",
    "checks": [
      "Teste caminho inexistente.",
      "Feche recursos mesmo com falha.",
      "Não esconda mensagens relevantes de erro."
    ],
    "docs": "https://dev.java/learn/",
    "level": "Intermediário",
    "moduleId": "java-expansion"
  },
  {
    "id": "java-files",
    "title": "Arquivos, Paths e codificação",
    "goal": "Persistir texto e dados de modo portátil.",
    "theory": [
      "java.nio.file.Path representa caminhos; Files fornece leitura e escrita com APIs adequadas. Use UTF-8 explicitamente para comportamento consistente.",
      "Separe serialização, validação e persistência. Não use nome fornecido por usuário sem resolver e verificar o destino, especialmente em upload."
    ],
    "example": "import java.nio.file.*;\nimport java.nio.charset.StandardCharsets;\npublic class Main {\n public static void main(String[] args) throws Exception {\n  Path arquivo = Files.createTempFile(\"devlab-\", \".txt\");\n  Files.writeString(arquivo, \"Olá\", StandardCharsets.UTF_8);\n  System.out.println(Files.readString(arquivo, StandardCharsets.UTF_8));\n  Files.deleteIfExists(arquivo);\n }\n}",
    "question": "Qual API representa um caminho no Java moderno?",
    "choices": [
      "Path",
      "JButton",
      "Scanner apenas"
    ],
    "answer": 0,
    "explanation": "Path é abstração para caminhos em java.nio.file.",
    "task": "Crie armazenamento CSV pequeno com validação de linhas e leitura e escrita UTF-8.",
    "checks": [
      "Cubra arquivo vazio.",
      "Cubra linha inválida.",
      "Não deixe arquivos temporários de teste."
    ],
    "docs": "https://dev.java/learn/api/",
    "level": "Intermediário",
    "moduleId": "java-expansion"
  },
  {
    "id": "java-concurrency",
    "title": "Threads e concorrência segura",
    "goal": "Executar tarefas independentes e proteger estado compartilhado.",
    "theory": [
      "Threads permitem concorrência, mas ordem e agendamento são não determinísticos. Acesso simultâneo a estado mutável pode produzir data race.",
      "ExecutorService gerencia tarefas; use try/finally e shutdown, e evite usar sleep como mecanismo de sincronização. Testes devem observar resultado e término."
    ],
    "example": "import java.util.concurrent.*;\npublic class Main {\n public static void main(String[] args) throws Exception {\n  ExecutorService executor = Executors.newFixedThreadPool(2);\n  try { Future<Integer> resultado = executor.submit(() -> 2 + 2); System.out.println(resultado.get()); }\n  finally { executor.shutdown(); }\n }\n}",
    "question": "O que Future.get faz?",
    "choices": [
      "Obtém o resultado quando disponível",
      "Sempre executa imediatamente",
      "Ignora falhas das tarefas"
    ],
    "answer": 0,
    "explanation": "Future.get aguarda resultado e pode propagar erro da tarefa.",
    "task": "Processe várias tarefas em pool limitado, registre resultados e encerre executor mesmo com falha.",
    "checks": [
      "Teste tarefa que falha.",
      "Não compartilhe lista mutável sem proteção.",
      "Encerre o pool corretamente."
    ],
    "docs": "https://dev.java/learn/",
    "level": "Avançado",
    "moduleId": "java-expansion"
  },
  {
    "id": "java-http",
    "title": "Cliente HTTP, JSON e contratos",
    "goal": "Consumir serviços com timeout, erros e respostas inesperadas.",
    "theory": [
      "HttpClient da biblioteca padrão permite operações HTTP síncronas e assíncronas. O sucesso do envio não implica status 200: verifique código e conteúdo.",
      "Valide JSON antes de assumir campos. Para testes, isole o transporte da regra de negócio e use um servidor de teste, não requisições externas imprevisíveis."
    ],
    "example": "import java.net.http.*;\nimport java.net.*;\nimport java.time.Duration;\npublic class Main {\n public static void main(String[] args) throws Exception {\n  HttpRequest req = HttpRequest.newBuilder(URI.create(\"https://example.com\"))\n   .timeout(Duration.ofSeconds(5)).GET().build();\n  System.out.println(req.uri()); // Não envia requisição neste exemplo\n }\n}",
    "question": "Um status 404 deve ser tratado como conteúdo válido da entidade?",
    "choices": [
      "Sim, sempre",
      "Não, é recurso não encontrado",
      "Somente em GET com JSON"
    ],
    "answer": 1,
    "explanation": "404 representa ausência de recurso; o cliente precisa tratar esse cenário.",
    "task": "Crie cliente HTTP com endpoint configurável, timeout, tratamento de 4xx/5xx e testes com servidor local.",
    "checks": [
      "Teste sucesso e 404.",
      "Teste timeout.",
      "Não registre tokens nos logs."
    ],
    "docs": "https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.html",
    "level": "Avançado",
    "moduleId": "java-expansion"
  },
  {
    "id": "java-jdbc",
    "title": "Persistência com JDBC e transações",
    "goal": "Conectar uma aplicação Java a SQL de forma segura.",
    "theory": [
      "JDBC fornece Connection, PreparedStatement e ResultSet para conversar com bancos. PreparedStatement parametriza valores, reduzindo risco de injeção SQL.",
      "Uma operação com múltiplas alterações deve usar transação. Configure rollback ao falhar, preserve credenciais fora do código e feche recursos."
    ],
    "example": "import java.sql.*;\npublic class Main {\n public static void main(String[] args) throws Exception {\n  try (Connection c = DriverManager.getConnection(\"jdbc:derby:memory:demo;create=true\")) {\n   try (PreparedStatement ps = c.prepareStatement(\"SELECT ?\")) { ps.setInt(1, 7); }\n  } catch (SQLException e) { System.out.println(\"Driver e banco são necessários: \" + e.getSQLState()); }\n }\n}",
    "question": "Por que usar PreparedStatement?",
    "choices": [
      "Para concatenar SQL mais rápido",
      "Para separar valores do comando SQL",
      "Para remover necessidade de transações"
    ],
    "answer": 1,
    "explanation": "PreparedStatement evita tratar entradas como parte da sintaxe SQL.",
    "task": "Implemente CRUD com banco local configurado, migração SQL e testes transacionais isolados.",
    "checks": [
      "Teste SQL com caracteres especiais.",
      "Teste rollback ao falhar.",
      "Guarde credenciais fora do repositório."
    ],
    "docs": "https://dev.java/learn/",
    "level": "Avançado",
    "moduleId": "java-expansion"
  },
  {
    "id": "java-design",
    "title": "Projeto final Java: camadas e testes",
    "goal": "Entregar serviço consistente de ponta a ponta.",
    "theory": [
      "Separe domínio, aplicação, repositórios e interface HTTP/CLI. O domínio não deve conhecer SQL, REST ou estruturas específicas do framework.",
      "Um projeto é validado por regras, testes de unidade e integração, documentação de execução, tratamento de erros e análise de limitações. Um checklist sozinho não certifica domínio."
    ],
    "example": "interface Repositorio { void salvar(String titulo); }\nclass Servico {\n private final Repositorio repo;\n Servico(Repositorio repo) { this.repo = repo; }\n void criar(String titulo) { if (titulo == null || titulo.isBlank()) throw new IllegalArgumentException(); repo.salvar(titulo); }\n}\npublic class Main {\n public static void main(String[] args) { new Servico(t -> System.out.println(t)).criar(\"Aprender\"); }\n}",
    "question": "Qual dependência é preferível no domínio?",
    "choices": [
      "Interface de persistência",
      "Driver JDBC concreto",
      "Framework de UI"
    ],
    "answer": 0,
    "explanation": "O domínio depende de um contrato, permitindo diferentes implementações.",
    "task": "Entregue API ou CLI Java com Maven, validação, persistência, testes JUnit e README de execução.",
    "checks": [
      "Mostre fluxo completo de criação e consulta.",
      "Cubra falhas e persistência com testes.",
      "Documente arquitetura e decisões."
    ],
    "docs": "https://dev.java/learn/",
    "level": "Avançado",
    "moduleId": "java-expansion"
  }
];

export const guidedSqlLessons = [
  {
    "id": "sql-intro",
    "title": "PostgreSQL, tabelas e SELECT",
    "goal": "Executar consultas e distinguir schema, tabela, linha e coluna.",
    "theory": [
      "SQL é uma linguagem declarativa: você descreve quais dados deseja, e o banco escolhe como obtê-los. PostgreSQL oferece psql e ferramentas gráficas para trabalhar com consultas.",
      "Comece com tabelas temporárias em um banco local isolado. Entenda que SELECT não altera dados, enquanto INSERT, UPDATE e DELETE modificam registros."
    ],
    "example": "CREATE TEMP TABLE livros (id integer, titulo text);\nINSERT INTO livros VALUES (1, 'Algoritmos'), (2, 'Banco de Dados');\nSELECT id, titulo FROM livros;",
    "question": "Qual comando consulta linhas sem modificá-las?",
    "choices": [
      "SELECT",
      "UPDATE",
      "DROP"
    ],
    "answer": 0,
    "explanation": "SELECT recupera dados; UPDATE e DROP alteram o banco.",
    "task": "Crie uma tabela temporária com três registros e execute consultas selecionando colunas específicas.",
    "checks": [
      "Use um banco de desenvolvimento.",
      "Explique cada coluna do resultado.",
      "Evite SELECT * como padrão em API pública."
    ],
    "docs": "https://www.postgresql.org/docs/current/tutorial-sql.html",
    "level": "Fundamentos",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-filter",
    "title": "WHERE, NULL e operadores",
    "goal": "Filtrar registros corretamente, incluindo valores ausentes.",
    "theory": [
      "WHERE aceita condições com AND, OR, IN, BETWEEN e LIKE. SQL usa lógica de três valores: verdadeiro, falso e desconhecido (NULL).",
      "Comparar NULL com '=' não funciona como em linguagens tradicionais; use IS NULL ou IS NOT NULL. Parênteses deixam a precedência de AND e OR explícita."
    ],
    "example": "CREATE TEMP TABLE produtos (nome text, preco numeric, ativo boolean);\nINSERT INTO produtos VALUES ('A', 10, true),('B', null, true),('C', 20, false);\nSELECT nome FROM produtos WHERE ativo AND preco IS NOT NULL AND preco >= 10;",
    "question": "Como filtrar valores SQL ausentes?",
    "choices": [
      "= NULL",
      "IS NULL",
      "== NULL"
    ],
    "answer": 1,
    "explanation": "NULL exige IS NULL ou IS NOT NULL.",
    "task": "Crie filtros por preço e status, compare resultados com e sem parênteses e trate NULL.",
    "checks": [
      "Teste nulos.",
      "Teste limite de preço.",
      "Explique AND versus OR."
    ],
    "docs": "https://www.postgresql.org/docs/current/queries-table-expressions.html",
    "level": "Fundamentos",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-sort",
    "title": "ORDER BY, LIMIT e paginação",
    "goal": "Ordenar consultas com resultados determinísticos.",
    "theory": [
      "Sem ORDER BY o banco não garante a ordem das linhas. LIMIT restringe a saída, e OFFSET pula registros, mas pode ser caro em tabelas grandes.",
      "Para paginação consistente, use uma chave de desempate estável. Para volumes grandes, avalie paginação por cursor com índice apropriado."
    ],
    "example": "CREATE TEMP TABLE atividades (id int, pontos int);\nINSERT INTO atividades VALUES (1,10),(2,20),(3,20);\nSELECT * FROM atividades ORDER BY pontos DESC, id ASC LIMIT 2;",
    "question": "Por que incluir id como critério de desempate?",
    "choices": [
      "Para mudar os pontos",
      "Para garantir ordenação estável",
      "Para desativar índices"
    ],
    "answer": 1,
    "explanation": "id define uma ordem quando os pontos são iguais.",
    "task": "Implemente duas páginas de registros ordenadas e explique risco de OFFSET com inserções concorrentes.",
    "checks": [
      "Ordene por coluna mais id.",
      "Teste empates.",
      "Compare LIMIT/OFFSET com cursor."
    ],
    "docs": "https://www.postgresql.org/docs/current/queries-limit.html",
    "level": "Fundamentos",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-joins",
    "title": "INNER e LEFT JOIN",
    "goal": "Relacionar tabelas sem duplicar informações.",
    "theory": [
      "JOIN combina linhas por condição de relacionamento. INNER JOIN retorna somente combinações correspondentes; LEFT JOIN preserva todas as linhas da tabela à esquerda.",
      "Chaves estrangeiras protegem relações e impedem referências inválidas. Multiplicidade importa: uma venda com três itens aparece três vezes quando associada à tabela itens."
    ],
    "example": "CREATE TEMP TABLE clientes (id int PRIMARY KEY, nome text);\nCREATE TEMP TABLE pedidos (id int, cliente_id int);\nINSERT INTO clientes VALUES (1,'Ana'),(2,'Bia');\nINSERT INTO pedidos VALUES (10,1);\nSELECT c.nome,p.id FROM clientes c LEFT JOIN pedidos p ON p.cliente_id=c.id ORDER BY c.id;",
    "question": "Qual JOIN preserva clientes sem pedidos?",
    "choices": [
      "INNER JOIN",
      "LEFT JOIN",
      "CROSS JOIN"
    ],
    "answer": 1,
    "explanation": "LEFT JOIN preserva todas as linhas da tabela à esquerda.",
    "task": "Modele clientes e pedidos, liste clientes sem pedidos e justifique os relacionamentos.",
    "checks": [
      "Teste cliente sem pedido.",
      "Teste cliente com múltiplos pedidos.",
      "Não confunda duplicação de JOIN com duplicação de registros."
    ],
    "docs": "https://www.postgresql.org/docs/current/tutorial-join.html",
    "level": "Fundamentos",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-group",
    "title": "GROUP BY e agregação",
    "goal": "Produzir métricas de dados sem confundir linhas e grupos.",
    "theory": [
      "COUNT, SUM, AVG, MIN e MAX agregam valores. GROUP BY forma grupos com as mesmas chaves, e HAVING filtra resultados já agregados.",
      "COUNT(*) conta linhas; COUNT(coluna) ignora NULL nessa coluna. Separe filtros antes da agregação em WHERE de condições após agregação em HAVING."
    ],
    "example": "CREATE TEMP TABLE vendas (loja text, valor numeric);\nINSERT INTO vendas VALUES ('A',10),('A',20),('B',5);\nSELECT loja, SUM(valor) AS total FROM vendas GROUP BY loja HAVING SUM(valor)>15 ORDER BY loja;",
    "question": "Qual cláusula filtra grupos agregados?",
    "choices": [
      "WHERE",
      "HAVING",
      "OFFSET"
    ],
    "answer": 1,
    "explanation": "HAVING aplica condição ao resultado de uma agregação.",
    "task": "Relate total e quantidade de vendas por loja, inclusive loja sem vendas com LEFT JOIN.",
    "checks": [
      "Compare COUNT(*) e COUNT(valor).",
      "Teste grupo vazio.",
      "Ordene o resultado explicitamente."
    ],
    "docs": "https://www.postgresql.org/docs/current/queries-table-expressions.html",
    "level": "Fundamentos",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-subqueries",
    "title": "Subconsultas e EXISTS",
    "goal": "Expressar filtros relacionais sem trazer dados desnecessários.",
    "theory": [
      "EXISTS verifica se uma subconsulta retorna ao menos uma linha. É frequentemente mais adequado que contar todas as correspondências para uma decisão booleana.",
      "Uma subconsulta correlacionada depende da linha externa. Entenda o relacionamento e compare com JOIN quando precisar de colunas adicionais."
    ],
    "example": "CREATE TEMP TABLE usuarios (id int PRIMARY KEY);\nCREATE TEMP TABLE acessos (user_id int);\nINSERT INTO usuarios VALUES (1),(2);\nINSERT INTO acessos VALUES (1);\nSELECT u.id FROM usuarios u WHERE EXISTS (SELECT 1 FROM acessos a WHERE a.user_id=u.id);",
    "question": "Qual expressão verifica existência de registros relacionados?",
    "choices": [
      "EXISTS",
      "ORDER BY",
      "DISTINCT ON"
    ],
    "answer": 0,
    "explanation": "EXISTS retorna verdadeiro quando a subconsulta produz uma linha.",
    "task": "Retorne usuários com e sem acessos usando EXISTS e NOT EXISTS, comparando com LEFT JOIN.",
    "checks": [
      "Teste ausência de acessos.",
      "Teste múltiplos acessos.",
      "Explique por que contagem não é necessária."
    ],
    "docs": "https://www.postgresql.org/docs/current/functions-subquery.html",
    "level": "Intermediário",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-schema",
    "title": "DDL, tipos e normalização",
    "goal": "Criar esquema consistente com entidades e relacionamentos.",
    "theory": [
      "CREATE TABLE define colunas, tipos e restrições. A normalização reduz redundância e anomalias de atualização; não crie colunas repetidas pedido1, pedido2 e pedido3.",
      "Escolha tipos coerentes: numeric para valores financeiros que precisam de exatidão decimal, timestamptz para instantes, boolean para estados binários."
    ],
    "example": "CREATE TEMP TABLE produtos (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, nome text NOT NULL, preco numeric(12,2) NOT NULL CHECK (preco>=0));\nINSERT INTO produtos(nome, preco) VALUES('Caneta',3.50);\nSELECT * FROM produtos;",
    "question": "Qual tipo é apropriado para preço decimal exato?",
    "choices": [
      "float sem critério",
      "numeric",
      "text sempre"
    ],
    "answer": 1,
    "explanation": "numeric preserva precisão decimal definida, adequada a valores financeiros.",
    "task": "Modele clientes, pedidos e itens normalizados com PK, FK e UNIQUE pertinentes.",
    "checks": [
      "Elimine grupo repetido.",
      "Explique dependências de chaves.",
      "Teste INSERT inválido."
    ],
    "docs": "https://www.postgresql.org/docs/current/ddl.html",
    "level": "Intermediário",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-constraints",
    "title": "Integridade: PK, FK, UNIQUE e CHECK",
    "goal": "Impedir dados inválidos no próprio banco.",
    "theory": [
      "PRIMARY KEY identifica uma linha. FOREIGN KEY impede referências inexistentes; UNIQUE evita duplicidade e CHECK descreve invariantes sobre valores.",
      "Validação da interface melhora usabilidade, mas não substitui restrições no banco. Use ON DELETE com uma regra de negócio justificável, não CASCADE indiscriminado."
    ],
    "example": "CREATE TEMP TABLE categorias(id int PRIMARY KEY);\nCREATE TEMP TABLE itens(id int PRIMARY KEY, categoria_id int REFERENCES categorias(id), quantidade int NOT NULL CHECK(quantidade>=0));\nINSERT INTO categorias VALUES (1);\nINSERT INTO itens VALUES (10,1,2);",
    "question": "Quem garante a integridade mesmo quando a API falha na validação?",
    "choices": [
      "Apenas HTML",
      "Restrições do banco",
      "A cor do formulário"
    ],
    "answer": 1,
    "explanation": "Restrições são aplicadas a todas as operações de escrita.",
    "task": "Crie INSERTs válidos e inválidos para PK, FK, UNIQUE e CHECK, anotando as mensagens.",
    "checks": [
      "Valide chave inexistente.",
      "Valide quantidade negativa.",
      "Explique a política de exclusão."
    ],
    "docs": "https://www.postgresql.org/docs/current/ddl-constraints.html",
    "level": "Intermediário",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-transactions",
    "title": "Transações e atomicidade",
    "goal": "Garantir que alterações relacionadas aconteçam juntas.",
    "theory": [
      "Uma transação agrupa operações. COMMIT confirma; ROLLBACK desfaz operações ainda não confirmadas. Essa atomicidade é essencial para pedidos, estoque e transferências.",
      "Concorrência e isolamento influenciam o resultado de transações simultâneas. Mesmo após validar saldo, uma transação concorrente pode exigir bloqueios ou atualização condicional."
    ],
    "example": "CREATE TEMP TABLE contas(id int PRIMARY KEY, saldo numeric);\nINSERT INTO contas VALUES(1,100),(2,0);\nBEGIN;\nUPDATE contas SET saldo=saldo-20 WHERE id=1 AND saldo>=20;\nUPDATE contas SET saldo=saldo+20 WHERE id=2;\nCOMMIT;\nSELECT * FROM contas ORDER BY id;",
    "question": "Qual comando desfaz mudanças ainda não confirmadas?",
    "choices": [
      "ROLLBACK",
      "COMMIT",
      "EXPLAIN"
    ],
    "answer": 0,
    "explanation": "ROLLBACK cancela a transação atual antes de COMMIT.",
    "task": "Implemente transferência com débito condicional, rollback e verificação de saldo total.",
    "checks": [
      "Teste saldo insuficiente.",
      "Teste falha no segundo UPDATE.",
      "Explique como evitar corrida entre operações."
    ],
    "docs": "https://www.postgresql.org/docs/current/tutorial-transactions.html",
    "level": "Intermediário",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-index",
    "title": "Índices e custo de consultas",
    "goal": "Criar índices baseados em consultas reais.",
    "theory": [
      "Um índice acelera certas buscas e ordenações, mas ocupa armazenamento e aumenta o custo de escrita. Não indexe todas as colunas indiscriminadamente.",
      "EXPLAIN mostra o plano de execução; EXPLAIN ANALYZE executa a consulta e mede estatísticas. Em tabela pequena, sequential scan pode ser a melhor escolha."
    ],
    "example": "CREATE TEMP TABLE logs(id serial PRIMARY KEY, usuario_id int, criado_em timestamptz DEFAULT now());\nCREATE INDEX logs_usuario_criado ON logs(usuario_id,criado_em DESC);\nEXPLAIN SELECT * FROM logs WHERE usuario_id=10 ORDER BY criado_em DESC LIMIT 20;",
    "question": "Qual ferramenta mostra como o banco planeja executar SELECT?",
    "choices": [
      "EXPLAIN",
      "ROLLBACK",
      "TRUNCATE"
    ],
    "answer": 0,
    "explanation": "EXPLAIN apresenta operações e estimativas do plano de consulta.",
    "task": "Compare um SELECT com e sem índice em dados de teste, sem afirmar ganho quando tabela é pequena.",
    "checks": [
      "Registre planos.",
      "Meça com dados suficientes.",
      "Considere custo de INSERT."
    ],
    "docs": "https://www.postgresql.org/docs/current/using-explain.html",
    "level": "Intermediário",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-cte",
    "title": "CTEs e consultas em etapas",
    "goal": "Organizar consultas complexas em partes legíveis.",
    "theory": [
      "WITH define CTEs nomeadas usadas na consulta seguinte. Podem ajudar a separar etapas de filtragem e agregação sem criar tabela persistente.",
      "CTEs não garantem por si só melhor performance. Compare planos e prefira nomes que expliquem o significado de cada conjunto."
    ],
    "example": "CREATE TEMP TABLE pagamentos(valor numeric, status text);\nINSERT INTO pagamentos VALUES(15,'pago'),(20,'pago'),(30,'pendente');\nWITH pagos AS (SELECT valor FROM pagamentos WHERE status='pago')\nSELECT COUNT(*) AS quantidade, SUM(valor) AS total FROM pagos;",
    "question": "CTE é definida com qual palavra?",
    "choices": [
      "WITH",
      "INTO",
      "GROUP"
    ],
    "answer": 0,
    "explanation": "WITH declara um resultado intermediário nomeado.",
    "task": "Escreva um relatório de pagamentos com CTE para filtrar e outro para agrupar.",
    "checks": [
      "Confira resultado com versão direta.",
      "Dê nomes semânticos às etapas.",
      "Compare planos se houver custo elevado."
    ],
    "docs": "https://www.postgresql.org/docs/current/queries-with.html",
    "level": "Intermediário",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-window",
    "title": "Window functions e rankings",
    "goal": "Analisar linhas mantendo detalhe por registro.",
    "theory": [
      "Funções de janela como ROW_NUMBER, RANK e SUM(...) OVER(...) calculam métricas relacionadas sem colapsar todas as linhas em grupos.",
      "PARTITION BY separa janelas lógicas; ORDER BY da janela determina sequência do cálculo. Diferencie RANK com empates de ROW_NUMBER."
    ],
    "example": "CREATE TEMP TABLE notas(turma text, aluno text, nota int);\nINSERT INTO notas VALUES('A','Ana',9),('A','Bia',9),('B','Leo',7);\nSELECT turma,aluno,nota,RANK() OVER(PARTITION BY turma ORDER BY nota DESC) AS posicao FROM notas;",
    "question": "Qual função mantém empates na mesma posição?",
    "choices": [
      "ROW_NUMBER",
      "RANK",
      "COUNT(*)"
    ],
    "answer": 1,
    "explanation": "RANK atribui posição igual aos empates e pula posições seguintes.",
    "task": "Calcule classificação por turma, média por grupo e total acumulado por data.",
    "checks": [
      "Teste empate.",
      "Teste grupos distintos.",
      "Explique a diferença para GROUP BY."
    ],
    "docs": "https://www.postgresql.org/docs/current/tutorial-window.html",
    "level": "Intermediário",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-plans",
    "title": "EXPLAIN ANALYZE e otimização",
    "goal": "Detectar gargalos com evidências, sem palpite.",
    "theory": [
      "EXPLAIN ANALYZE executa a consulta de verdade. Em comandos que alteram dados, envolva em transação e ROLLBACK se estiver testando; evite usá-lo em produção sem entender impactos.",
      "Observe linhas estimadas versus reais, scans, joins e índices utilizados. Corrija primeiro modelo, consulta ou índice quando existir evidência de gargalo."
    ],
    "example": "CREATE TEMP TABLE metricas(id int PRIMARY KEY, valor int);\nINSERT INTO metricas SELECT n,n*2 FROM generate_series(1,1000) AS n;\nANALYZE metricas;\nEXPLAIN (ANALYZE, BUFFERS) SELECT * FROM metricas WHERE id=500;",
    "question": "O que diferencia EXPLAIN ANALYZE?",
    "choices": [
      "Ele executa a consulta",
      "Ele não acessa tabelas",
      "Ele cria índice automaticamente"
    ],
    "answer": 0,
    "explanation": "EXPLAIN ANALYZE mede execução real e deve ser usado com cuidado.",
    "task": "Compare planos para filtro por id e valor em tabela de teste, registrando evidências.",
    "checks": [
      "Registre tempo e linhas.",
      "Compare estimativas e realidade.",
      "Evite executar consultas destrutivas no banco real."
    ],
    "docs": "https://www.postgresql.org/docs/current/using-explain.html",
    "level": "Avançado",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-security",
    "title": "SQL seguro, roles e RLS",
    "goal": "Projetar autorização na camada de dados.",
    "theory": [
      "SQL parametrizado evita que valores do usuário sejam interpretados como sintaxe de consulta. Nunca use concatenação de dados não confiáveis em cláusulas dinâmicas.",
      "PostgreSQL permite políticas de Row Level Security por usuário e função, mas ativar RLS sem políticas apropriadas bloqueia acesso. Para Supabase, vincule dados ao auth.uid() em políticas corretas."
    ],
    "example": "CREATE TEMP TABLE exemplo_privado(id int PRIMARY KEY, dono_id int NOT NULL, titulo text);\nINSERT INTO exemplo_privado VALUES(1,1,'A');\nSELECT * FROM exemplo_privado WHERE dono_id=1;\n-- Este filtro sozinho não implementa autorização; configure RLS em uma tabela real de laboratório.",
    "question": "Por que filtrar dono_id apenas na interface não protege dados?",
    "choices": [
      "Porque requisições podem ser feitas sem a interface",
      "Porque SELECT não suporta WHERE",
      "Porque RLS dispensa testes"
    ],
    "answer": 0,
    "explanation": "A verificação deve ocorrer no servidor ou nas políticas do banco, não só no navegador.",
    "task": "Modele políticas de propriedade em banco de testes e comprove que contas distintas não compartilham linhas.",
    "checks": [
      "Teste dono e não dono.",
      "Não exponha service_role no frontend.",
      "Documente GRANT e RLS."
    ],
    "docs": "https://www.postgresql.org/docs/current/ddl-rowsecurity.html",
    "level": "Avançado",
    "moduleId": "sql-expansion"
  },
  {
    "id": "sql-project",
    "title": "Projeto SQL: dados, consultas e migrações",
    "goal": "Entregar um esquema reproduzível com testes reais.",
    "theory": [
      "Um projeto de dados deve ter schema versionado, massa de teste, consultas com objetivos claros e regras de integridade aplicadas ao banco.",
      "Uma resposta correta em questão objetiva não prova domínio: reproduza o modelo em um banco limpo, valide consultas e registre decisões, limitações e plano de restauração."
    ],
    "example": "CREATE TEMP TABLE tarefas (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, titulo text NOT NULL, concluida boolean NOT NULL DEFAULT false);\nINSERT INTO tarefas(titulo) VALUES('Construir sistema'),('Escrever testes');\nSELECT concluida,COUNT(*) FROM tarefas GROUP BY concluida;",
    "question": "Qual evidência demonstra que o schema é reproduzível?",
    "choices": [
      "Um print da interface",
      "Executar migrações em banco vazio",
      "Memorizar comandos"
    ],
    "answer": 1,
    "explanation": "Aplicar o schema em ambiente limpo comprova que sua instalação é reproduzível.",
    "task": "Entregue projeto de pedidos com schema normalizado, migrações, constraints, consultas, plano e testes em banco local.",
    "checks": [
      "Execute do zero em banco isolado.",
      "Teste integridade e transação.",
      "Documente setup, rollback e consultas."
    ],
    "docs": "https://www.postgresql.org/docs/current/sql.html",
    "level": "Avançado",
    "moduleId": "sql-expansion"
  }
];

export const extendedJavaScriptLessons = [
  {
    "id": "js-closures",
    "title": "Escopo léxico e closures",
    "goal": "Escrever funções que preservam estado sem expor mutações globais.",
    "theory": [
      "Closures permitem que uma função acesse variáveis do escopo onde foi criada, mesmo após esse escopo terminar. Isso é útil para encapsular estado.",
      "Evite esconder dependências importantes em closures de difícil teste. Compare com funções puras quando não houver necessidade de estado."
    ],
    "example": "function contador() { let n = 0; return () => ++n; }\nconst proximo = contador();\nconsole.log(proximo(), proximo());",
    "question": "Por que o contador mantém n entre chamadas?",
    "choices": [
      "A função fecha sobre o ambiente léxico",
      "A variável vira global",
      "O JavaScript reinicia n"
    ],
    "answer": 0,
    "explanation": "A função retornada preserva referência à variável do ambiente onde foi criada.",
    "task": "Implemente limitador de tentativas com closure, sem permitir zerar o estado por fora.",
    "checks": [
      "Crie instâncias independentes.",
      "Teste limite alcançado.",
      "Não use variável global."
    ],
    "docs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
    "level": "Avançado",
    "moduleId": "javascript-expansion"
  },
  {
    "id": "js-prototypes",
    "title": "Objetos, protótipos e classes",
    "goal": "Entender delegação e composição sem confundir instância e classe.",
    "theory": [
      "JavaScript usa delegação por protótipos para herança de comportamento. A sintaxe class facilita a definição, mas continua usando a cadeia de protótipos.",
      "Prefira composição quando herança produzir acoplamento desnecessário. Não modifique protótipos globais de tipos nativos em aplicações comuns."
    ],
    "example": "class Produto { constructor(nome) { this.nome = nome; } resumo() { return this.nome; } }\nconst p = new Produto('Livro');\nconsole.log(p.resumo(), Object.getPrototypeOf(p) === Produto.prototype);",
    "question": "Onde costuma estar o método resumo de uma instância criada com class?",
    "choices": [
      "No protótipo da classe",
      "Em uma variável global",
      "No JSON de cada instância"
    ],
    "answer": 0,
    "explanation": "Métodos de classe são disponibilizados pelo protótipo, não recriados por padrão para cada objeto.",
    "task": "Compare fábrica com composição e classe para modelar três tipos de notificação.",
    "checks": [
      "Teste comportamento de instâncias.",
      "Evite herança profunda.",
      "Explique a cadeia de protótipos."
    ],
    "docs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain",
    "level": "Avançado",
    "moduleId": "javascript-expansion"
  },
  {
    "id": "js-iterators",
    "title": "Iteradores, generators e transformação incremental",
    "goal": "Processar sequências preguiçosamente sem materializar tudo.",
    "theory": [
      "Um iterable implementa Symbol.iterator. Um generator com function* cria valores sob demanda e mantém estado entre yields.",
      "Generators podem ser consumidos uma única vez. Para percorrer dados repetidamente, crie um novo iterator ou materialize quando necessário."
    ],
    "example": "function* numeros(max) { for (let i=0;i<max;i++) yield i; }\nconsole.log([...numeros(4)]);\nconsole.log([...numeros(4)].reduce((a,b)=>a+b,0));",
    "question": "Qual palavra produz um valor de um generator?",
    "choices": [
      "yield",
      "throw",
      "static"
    ],
    "answer": 0,
    "explanation": "yield entrega um item da sequência e suspende o generator.",
    "task": "Crie um paginador generator que percorre lotes sem carregar todos os registros.",
    "checks": [
      "Teste zero elementos.",
      "Teste tamanho não múltiplo do lote.",
      "Explique o consumo único."
    ],
    "docs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators",
    "level": "Avançado",
    "moduleId": "javascript-expansion"
  },
  {
    "id": "js-async-cancel",
    "title": "Promises, concorrência e cancelamento",
    "goal": "Tratar operações assíncronas com controle de falhas.",
    "theory": [
      "Promise.all falha quando uma promessa rejeita; Promise.allSettled reúne resultados e falhas. O uso depende do contrato do produto.",
      "AbortController sinaliza cancelamento para APIs que o suportam, como fetch. Cancelar uma requisição não desfaz automaticamente um efeito que já ocorreu no servidor."
    ],
    "example": "async function executar() {\n const jobs = [Promise.resolve(1), Promise.reject(new Error('falha'))];\n console.log((await Promise.allSettled(jobs)).map(r => r.status));\n}\nexecutar();",
    "question": "Quando usar Promise.allSettled?",
    "choices": [
      "Quando precisa registrar sucesso e falha de todas as operações",
      "Quando quer ignorar resultados",
      "Quando quer bloquear o event loop"
    ],
    "answer": 0,
    "explanation": "allSettled permite inspecionar resultados de todas as operações sem abortar o conjunto na primeira rejeição.",
    "task": "Implemente busca com debounce, AbortController e tratamento de requisição fora de ordem.",
    "checks": [
      "Teste cancelamento.",
      "Teste falha de rede.",
      "Impeça resultado antigo de sobrescrever o novo."
    ],
    "docs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled",
    "level": "Avançado",
    "moduleId": "javascript-expansion"
  },
  {
    "id": "js-modules-advanced",
    "title": "Módulos ES, imports e dependências",
    "goal": "Organizar um sistema sem criar acoplamentos circulares.",
    "theory": [
      "Módulos ES têm escopo próprio e exports explícitos. Imports estáticos permitem análise antes da execução, enquanto import() pode carregar um módulo sob demanda.",
      "Evite dependências circulares entre regras e interface. Separe contratos compartilhados em módulo próprio quando necessário."
    ],
    "example": "// math.js: export const dobro = n => n * 2;\n// main.js: import {dobro} from './math.js';\nconst dobrar = n => n * 2;\nconsole.log(dobrar(4));",
    "question": "Qual vantagem do import estático?",
    "choices": [
      "Declara dependências antes da execução",
      "Converte JavaScript em SQL",
      "Executa código em sandbox automaticamente"
    ],
    "answer": 0,
    "explanation": "Imports estáticos expõem dependências, facilitando análise e organização.",
    "task": "Divida projeto em domínio, persistência e interface com testes sem dependências circulares.",
    "checks": [
      "Faça um diagrama dos imports.",
      "Teste módulos isoladamente.",
      "Explique uso justificado de import() dinâmico."
    ],
    "docs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
    "level": "Avançado",
    "moduleId": "javascript-expansion"
  },
  {
    "id": "js-error-handling",
    "title": "Erros, invariantes e contratos",
    "goal": "Criar funções previsíveis sob entradas inválidas.",
    "theory": [
      "throw interrompe a execução normal e sinaliza erro. Capture exceções apenas onde exista estratégia útil de recuperação ou tradução.",
      "Evite retornar sucesso falso quando validação falhar. Uma API pode usar Result como objeto discriminado, mas todo chamador precisa tratar ambas as possibilidades."
    ],
    "example": "function dividir(a,b) { if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) throw new RangeError('entrada inválida'); return a/b; }\ntry { console.log(dividir(10,0)); } catch (e) { console.log(e.name); }",
    "question": "Por que não capturar erros só para ignorá-los?",
    "choices": [
      "Porque oculta problemas e estados inconsistentes",
      "Porque o JavaScript não permite",
      "Porque sempre aumenta o desempenho"
    ],
    "answer": 0,
    "explanation": "Silenciar falhas quebra a rastreabilidade e pode manter estado inválido.",
    "task": "Crie camada de validação e trate erros com mensagens úteis, preservando causa para logs internos.",
    "checks": [
      "Teste divisão por zero e NaN.",
      "Não exponha dados sensíveis.",
      "Teste sucesso e falha."
    ],
    "docs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
    "level": "Avançado",
    "moduleId": "javascript-expansion"
  },
  {
    "id": "js-performance",
    "title": "Performance e análise de gargalos",
    "goal": "Medir custos antes de otimizar código.",
    "theory": [
      "Operações de DOM e cálculo pesado podem comprometer resposta da interface. Use Performance API e DevTools para investigar antes de aplicar otimizações.",
      "Big O descreve crescimento do custo de algoritmos. Um Map pode oferecer buscas eficientes por chave; comparar comportamento com dados representativos evita micro-otimizações inúteis."
    ],
    "example": "const itens = Array.from({length:1000},(_,id)=>({id}));\nconst indice = new Map(itens.map(x=>[x.id,x]));\nconsole.log(indice.get(900));",
    "question": "Por que medir antes e depois de otimizar?",
    "choices": [
      "Para provar que a mudança melhora o cenário real",
      "Para reduzir número de arquivos",
      "Para eliminar testes"
    ],
    "answer": 0,
    "explanation": "Métricas mostram se a otimização ajuda ou piora o comportamento observado.",
    "task": "Compare buscas por array e Map, registre medidas em diferentes tamanhos e avalie troca por memória.",
    "checks": [
      "Mantenha mesma entrada nos testes.",
      "Meça várias amostras.",
      "Explique trade-offs."
    ],
    "docs": "https://developer.mozilla.org/en-US/docs/Web/API/Performance_API",
    "level": "Avançado",
    "moduleId": "javascript-expansion"
  },
  {
    "id": "js-security",
    "title": "Segurança no navegador e tratamento de entradas",
    "goal": "Evitar XSS, vazamento de dados e confiança indevida no cliente.",
    "theory": [
      "Use textContent para texto não confiável, evitando inserir HTML arbitrário com innerHTML. Dados vindos da rede também não são automaticamente seguros.",
      "Validação client-side é experiência de uso, não autorização. Segredos nunca devem ser embutidos no JavaScript publicado; privilégios são controlados pelo backend."
    ],
    "example": "const textoRecebido = '<img src=x onerror=alert(1)>';\nconst elemento = document.createElement('p');\nelemento.textContent = textoRecebido;\nconsole.log(elemento.textContent);",
    "question": "Qual opção coloca texto externo sem interpretá-lo como HTML?",
    "choices": [
      "innerHTML",
      "textContent",
      "eval"
    ],
    "answer": 1,
    "explanation": "textContent mantém o valor como texto em vez de interpretar elementos e handlers.",
    "task": "Faça formulário que renderiza nomes com segurança e valide acesso a dados no servidor.",
    "checks": [
      "Teste string HTML maliciosa como texto.",
      "Não use eval.",
      "Explique por que ocultar botão não autoriza operação."
    ],
    "docs": "https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS",
    "level": "Avançado",
    "moduleId": "javascript-expansion"
  },
  {
    "id": "js-final-project",
    "title": "Projeto JavaScript completo e manutenção",
    "goal": "Consolidar estado, interfaces, módulos e testes.",
    "theory": [
      "Construção de software exige organizar regras, interface, armazenamento e erros de forma verificável. Um projeto em funcionamento deve ter cenários de teste e documentação de uso.",
      "Defina um contrato mínimo de entradas, saídas e limitações. Faça revisão de acessibilidade, desempenho básico e regressões quando alterar funcionalidades."
    ],
    "example": "const criarTarefa = titulo => { const texto = titulo.trim(); if (!texto) throw new Error('Título obrigatório'); return {id:crypto.randomUUID(), titulo:texto, feito:false}; };\nconsole.log(criarTarefa('Aprender'))",
    "question": "Qual evidência comprova que uma regra funciona?",
    "choices": [
      "Teste executado com casos válidos e inválidos",
      "Marcar uma opção sem executar",
      "Um screenshot sem contexto"
    ],
    "answer": 0,
    "explanation": "Execução reproduzível e testes de comportamento oferecem evidência; apenas leitura não basta.",
    "task": "Entregue gerenciador de tarefas modular com filtros, persistência, testes, acessibilidade e README.",
    "checks": [
      "Teste CRUD e persistência.",
      "Teste entradas inválidas e navegação por teclado.",
      "Documente como reproduzir os resultados."
    ],
    "docs": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing",
    "level": "Avançado",
    "moduleId": "javascript-expansion"
  }
];
