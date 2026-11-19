# Sprint 8 — Workspace de desenvolvimento

## O que é

O Workspace é uma área nova (`#/workspace`) para praticar a organização de projetos reais com arquivos HTML, CSS, JavaScript e módulos ES. Não substitui o exercício por aula, o TaskFlow compartilhado, a Oficina ou os testes das versões anteriores.

## Usando

1. Abra `Workspace` na barra lateral.
2. Experimente o projeto `TaskFlow modular`: `src/main.js` importa `adicionarTarefa` de `src/tasks.js`.
3. Digite uma tarefa na prévia e observe a lista e a saída do console.
4. Crie `src/helpers.js`; importe com `import { minhaFuncao } from './helpers.js'` em `src/main.js`.
5. Adicione pastas e arquivos pelo explorador. O campo de caminho aceita `src/components/Card.js`, criando também a pasta `components`.
6. Exporte `ZIP` para abrir a pasta no VS Code; `index.html` já tem o CSS e o JS inicial configurados.

O botão `Trazer TaskFlow das aulas` cria **outro projeto** com uma cópia do HTML, CSS e JS já salvos no TaskFlow anterior. O original não é modificado.

## Detalhes técnicos

- `src/workspace-engine.js`: regras puras para criar, renomear e excluir arquivos, restringir caminhos, resolver imports relativos, gerar HTML para a prévia e exportar ZIP sem dependências.
- `offline/source/workspace-ui.js`: interface publicada, gerenciamento de arquivos, autosave, console, Monaco opcional e mensagens do iframe.
- `offline/source/workspace-v8.css`: interface responsiva.
- `offline/build_standalone.py`: inclui o engine e a UI no `offline/index.html` que a Vercel publica.
- `tests/workspace.mjs`: testes unitários, ZIP, validação de caminhos e resolução de módulos.
- `tests/e2e_workspace.py`: teste de navegador do fluxo completo; em ambiente de automação usa mock de localStorage, não comprova persistência real no domínio.

### Execução dos módulos

O site resolve caminhos relativos, como `./tasks.js` e `../utils.js`, e transforma cada arquivo JS em URL Blob **dentro** do iframe de prévia. Um import-map faz os módulos se referirem uns aos outros. Isso permite importar funções e executar módulos com o navegador, sem `eval` na página principal nem build remoto.

O iframe tem `sandbox="allow-scripts allow-forms"`, mas **não** `allow-same-origin`. Formulários funcionam, porém o código não pode acessar o DOM ou localStorage da plataforma. O ambiente injeta uma implementação local de storage para que exemplos possam persistir dados entre execuções de prévia.

O sistema preserva mensagens do console e apresenta falhas de resolução de módulos. A análise dos imports usa um subconjunto pragmático da sintaxe comum de import/export; **não** substitui um bundler completo ou um parser formal.

### Editor

O editor **Monaco** é carregado sob demanda pelo navegador a partir de um CDN. Sem rede, o site mantém um editor nativo com sintaxe colorida, numeração de linhas, indentação com Tab e atalho Ctrl/Cmd+Enter. O ZIP offline não inclui o Monaco localmente. A variante React/Monaco pré-existente no repositório não foi unificada nesta sprint.

### Armazenamento

Cada projeto é salvo nas chaves `devlab-offline-v1:workspace-projects` e `devlab-offline-v1:workspace-active`; a memória virtual da prévia usa `devlab-offline-v1:workspace-preview:<id>`. As chaves anteriores de aula, Oficina e TaskFlow não são alteradas. Há limites de 32 arquivos, 100 KB por arquivo e 480 KB no total por projeto para reduzir riscos de travamento e esgotamento de quota.

**Atenção**: o localStorage do navegador não é backup. Exporte ZIP regularmente; trocar de navegador ou limpar dados locais remove o progresso não exportado.

## Limitações conhecidas

- Não é um VS Code completo: não há terminal, npm, backend, Git remoto, npm package resolution, servidor Node, depurador com breakpoints ou suporte a TypeScript com múltiplos arquivos no Workspace. Essas atividades precisam ser feitas no VS Code real após exportar.
- O renderizador combina os arquivos CSS do projeto e usa um `index.html` como ponto de entrada. Recursos relativos binários (imagens e fontes) ainda não têm suporte por conta própria; em projetos exportados o navegador pode resolver esses arquivos normalmente se existirem.
- Imports dinâmicos **calculados** e pacotes externos não são suportados no preview. Imports relativos estáticos e `import('./arquivo.js')` literal são suportados.
- O isolamento do iframe evita acesso à origem principal, mas não deve ser tratado como isolamento absoluto de código de terceiros. O navegador pode continuar fazendo requisições a endereços públicos. Não cole credenciais ou execute código desconhecido.
- Loops síncronos infinitos dentro da prévia podem bloquear a aba. A proteção da Oficina/avaliação por Worker não é automaticamente aplicada a projetos arbitrários no Workspace.
- A verificação de importações usa transformação lexical para os casos didáticos conhecidos, não AST de um bundler profissional. Não garante suporte a todas as combinações possíveis de JavaScript.

## Testes

```bash
node --test tests/workspace.mjs
node tests/smoke.mjs
node tests/learning.mjs
node tests/study-tools.mjs
node tests/missions.mjs
node tests/lesson-assessment.mjs
node tests/lesson-contracts.mjs
node tests/preview-guard.mjs
node scripts/build-static.mjs
python tests/e2e_workspace.py  # requer Playwright e Chromium
```

A publicação na Vercel usa a versão estática testada. A interface React/Monaco permanece nos fontes como alternativa experimental e ainda precisa de validação do build de produção.
