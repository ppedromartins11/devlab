# DevLab 5 — Oficina de código

A Oficina acrescenta um ciclo de prática orientado por comportamento à trilha existente: **ler contrato → escrever/corrigir código → executar testes → interpretar falhas → revisar a solução**.

## Acesso

Abra `#/oficina` no site. Cada card abre `#/missao/<id>`.

| Etapa | Missão | Critério |
| --- | --- | --- |
| Implementar | Maior número | Suportar arrays negativos, decimais e sem mutação |
| Implementar | Celsius/Fahrenheit | Converter corretamente números positivos, negativos e decimais |
| Depurar | Contar pares | Corrigir condição invertida e contar o zero como par |
| Depurar | Preço com desconto | Corrigir percentuais e casos de 0/100% |
| Autonomia | Total do carrinho | Criar função sem starter, incluindo carrinho vazio |
| Autonomia | Títulos pendentes | Criar função sem starter, preservando a ordem e dados de entrada |

Cada missão tem pelo menos cinco casos, totalizando **31 testes**. São casos de comportamento: não é necessário usar uma estrutura sintática específica, desde que a função cumpra o contrato. Existem dicas sob demanda, mas as avaliações de autonomia iniciam com o editor vazio.

## Isolamento

- O código não roda no documento principal do DevLab. Um `iframe` com `sandbox="allow-scripts"`, sem `allow-same-origin`, cria um `Worker` temporário de origem opaca.
- O avaliador envia apenas o texto do código e casos da missão para esse worker. Não é permitido acessar DOM, `localStorage` ou as variáveis da aplicação principal.
- Cada execução tem tempo máximo de 4,5 segundos; o worker e o iframe são removidos ao finalizar.
- Erros de sintaxe, exceções, retorno incorreto e mutação não permitida geram feedback explícito. O DevLab nunca marca uma solução incorreta como aprovada por conter um nome de método ou palavra-chave.
- Este ambiente é um recurso educacional local. Não é uma infraestrutura multiusuário de execução remota com garantia absoluta de isolamento; não cole dados pessoais ou credenciais.

## Progresso

Persistência adicional usa as chaves `devlab-offline-v1:mission-drafts` e `devlab-offline-v1:mission-progress` no armazenamento local existente. Não altera os dados de quiz, notas, exercícios, TaskFlow ou revisões. Alterar o código após uma aprovação invalida o status até os testes passarem novamente.

## Verificação

```bash
node tests/missions.mjs
node tests/smoke.mjs
node tests/learning.mjs
node tests/study-tools.mjs
node scripts/build-static.mjs
```

O teste de navegador opcional `tests/e2e_missions.py` usa Playwright/Chromium e HTML inline com uma simulação de `localStorage` porque algumas execuções automatizadas bloqueiam navegação para `localhost`. Ele cobre reprovação, aprovação, debugging, persistência de estado, alteração do código após aprovação, timeout e layout móvel; a simulação não substitui testes manuais de armazenamento em domínio real.

## Fora do escopo desta primeira entrega

A validação da Oficina é para funções JavaScript puras e síncronas, não para funções que dependem do DOM, backend ou rede. Os 29 exercícios anteriores mantêm sua validação atual. O editor React/Monaco permanece nos fontes, mas o build publicado é a versão estática.
