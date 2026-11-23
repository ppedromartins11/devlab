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
