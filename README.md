## DevLab Sprint 22 — desafios e prática em todas as aulas

A biblioteca tem **179 aulas únicas**, incluindo JS/TS, Python, Java, PHP, SQL, Frontend e Backend. Todas agora exibem **(1) um desafio curto de completar código e (2) um exercício prático com código inicial editável**, vinculado ao assunto da própria aula. As 32 atividades existentes continuam, e os novos desafios são derivados dos exemplos de suas respectivas aulas com regras de conceitos.

A correção da lacuna é textual; a aplicação prática requer execução no editor original ou no ambiente local adequado. **Não se trata de um compilador universal nem de avaliação automática de competência**. O progresso anterior permanece preservado; novos rascunhos são salvos separadamente.

[Escopo, metodologia, cobertura e limitações da Sprint 22](docs/SPRINT-22-PRACTICE-ALL.md).

---

## DevLab 21 — Microaprendizagem interativa

A auditoria das referências públicas do Mimo identificou que o DevLab tinha boa cobertura curricular, mas menor **frequência de interação nas aulas guiadas**. Esta evolução introduz **32 microdesafios autorais de código**: leia, complete a lacuna, receba feedback imediato, consulte até duas dicas e aplique em exercícios maiores. Há uma sugestão de prática rápida na página inicial e um indicador de sequência nas aulas guiadas.

O código é corrigido por **comparação textual**, não executado; acertar uma lacuna não comprova domínio de programação. Exercícios e projetos maiores permanecem necessários. **Não foram reutilizados textos, visual, marca ou código do Mimo.**

As novas chaves de progresso com prefixo devlab-offline-v1:micro- não alteram o progresso salvo. Validação: npm test, npm run build:static e, com Playwright/Chromium instalados, python tests/e2e_micro.py.

[Auditoria Mimo × DevLab](docs/ESTUDO-MIMO-E-IMPLEMENTACAO.md).

---

# DevLab 19 — Aprendizado progressivo, do básico ao avançado

**Objetivo atual: aprender programação de verdade**, sem treinamento para provas nem objetivos acadêmicos pontuais. A Biblioteca de Linguagens reúne **129 aulas**: JavaScript (33), TypeScript (15), Python (17), Java (17), PHP (32) e SQL/PostgreSQL (15), com fundamentos, aplicações, testes, depuração e projetos integradores.

A metodologia incentiva prever a saída, explicar conceitos, executar código, modificar o exemplo, testar erros e construir uma solução própria. Quizzes e checklists mostram **atividade registrada**, não certificam que o aluno domina o assunto.

**Acesso:** [DevLab](https://devlab-zeta.vercel.app) · Rotas `#/linguagens`, `#/trilhas`, `#/frontend`, `#/backend`. Python, Java, PHP e SQL precisam de runtimes locais; a interface não finge executar esses programas no navegador. O editor JavaScript/TypeScript anterior continua funcionando.

**Segurança e progresso:** IDs, exercícios e registros locais anteriores foram preservados. O login não sincroniza progresso entre aparelhos nesta fase, e os laboratórios de banco não devem utilizar o Supabase de produção.

Leia [Sprint 19 — Aprendizagem](docs/SPRINT-19-APRENDIZAGEM.md) para conteúdo, método, limites e testes. Valide com `npm test`, `node --test tests/curriculum-mastery.mjs` e `npm run build:static`.

---

## Histórico das sprints anteriores

## DevLab 16.0 — PHP do extremo básico ao avançado

A Biblioteca de Linguagens ganhou a trilha **PHP**: [32 aulas em 8 módulos](docs/SPRINT-16.md) cobrindo sintaxe, formulários `$_GET`/`$_POST`, arrays, sessões, PHP/MySQL com PDO e SQL preparado, POO, segurança, APIs e projeto de pizzaria. Abra `#/linguagem/php` no DevLab. O **simulado de 24 questões** está em `#/linguagem/php/simulado`, com correção explicada.

O site DevLab continua sendo estático; **PHP não é executado no navegador**. Copie os exemplos para o PHP CLI ou XAMPP, e use o [starter PHP/MySQL](examples/php-pizzaria/README.md) (também disponível na interface como ZIP). O progresso da trilha é guardado nas mesmas chaves locais usadas por Python/Java e as revisões anteriores permanecem intactas.

Verifique com `node --test tests/php.mjs`, `python tests/e2e_php.py`, `php examples/php-pizzaria/tests/test_functions.php` e `npm test`.

# DevLab 15.0 — Correção do editor e auditoria de regressão

O editor de aulas não mostrava HTML, CSS ou JavaScript em alguns navegadores após o tema escuro. O conteúdo continuava no `textarea`, mas o fundo opaco imposto pelo CSS de formulários escondia a camada de realce de sintaxe (`#syntax-layer`).

**Correção:** o seletor global de formulários ignora `#code-editor`; o editor mantém fundo e texto digitável transparentes, com cursor visível, deixando o conteúdo colorido do `<pre>` aparecer. A alteração não apaga `localStorage` nem modifica os exercícios.

**Testes:** `npm test`, `python tests/e2e_editor_visibility.py` (7 larguras, edição, troca de HTML/CSS/JS/TS, prévia, restauração), `python tests/e2e_route_audit.py` (111 rotas em 390 e 1440 px) e os demais scripts `tests/e2e_*.py`. O teste automatizado de Chromium usa HTML inline + armazenamento simulado por restrição de localhost no ambiente de validação. Não substitui uma inspeção em Safari/iOS real.

**Limites:** não é possível garantir ausência de todos os bugs somente com testes automatizados. O tema escuro continua permitindo que a prévia do site do estudante tenha fundo claro.

---

# DevLab 14.0 — Trilhas profissionais e linguagens independentes

O início agora separa três **trilhas por objetivo profissional** — Frontend, Backend e Full-Stack — de uma **biblioteca de linguagens**: JavaScript, TypeScript, Python, Java e SQL. A arquitetura usa a estrutura pública de competências do [roadmap.sh](https://roadmap.sh/) como referência, com textos e atividades originais. Os checkpoints levam a projetos práticos, e cada etapa mostra aulas existentes, competências e referência complementar.

- Aulas compartilhadas entre carreiras usam o **mesmo progresso existente** (79 aulas anteriores); não exigem repetição e não foram apagadas.
- Python e Java têm **cinco novas aulas introdutórias cada**, com conceitos, exemplos, perguntas e exercícios. O programa deve ser executado no VS Code com Python/JDK: o navegador não avalia essa execução.
- Checklists dos projetos e das novas aulas de Python/Java são **revisão manual**, não testes automáticos da solução.
- O tema escuro, o Workspace, a Oficina, o TaskFlow e a Jornada Profissional foram preservados.
- Documentação curricular e detalhes técnicos: [Sprint 14 — Trilhas e roadmap](docs/SPRINT-14-TRILHAS-ROADMAP.md).

---

# DevLab 13.0 — identidade dark minimalista

A interface publicada agora usa fundo grafite em todo o aplicativo, logotipo tipográfico `</>` e detalhes lilás discretos somente para seleção, foco e progresso. A página inicial traz um resumo real das 79 aulas (29 JS/TS + 25 frontend + 25 backend), trilhas e acesso à Oficina, Workspace, Revisões e Jornada Profissional. O campo de busca global foi movido para a barra superior e responde a `Ctrl+K`/`Cmd+K`.

- **Não houve migração** das chaves `devlab-offline-v1:*`; dados existentes continuam salvos.
- O preview do código do estudante permanece branco quando o HTML/CSS do próprio projeto assim define.
- A versão estática de produção e a variante React consomem os tokens de `offline/source/dark-v13.css`; a React ainda não implementa todos os módulos da interface estática.
- A nova identidade inclui favicon SVG gerado no HTML e arquivo em `assets/favicon.svg`.
- Para testar: `npm test`, `python tests/e2e_dark_theme.py`, `node scripts/build-static.mjs`. O teste visual requer Chromium e Playwright.

[Identidade e checklist](docs/SPRINT-13.md).

---

# DevLab 12 — experiência de aprendizagem modular

A navegação agora está organizada em **Aprender / Praticar / Construir**, com uma página inicial mais enxuta. Aulas frontend/backend foram divididas em cinco módulos independentes, e projetos profissionais em quatro etapas. A busca de aulas não remonta toda a página a cada digitação. Nenhuma aula, exercício ou dado salvo foi removido.

[Detalhes da refatoração, arquivos e testes](docs/SPRINT-12.md).

---

# DevLab — Aprenda construindo

## DevLab 11.0 — Jornada profissional e portfólio

A rota `#/carreira` agora reúne **3 projetos integradores**, **laboratório Git simulado** e **portfólio exportável**. Projetos frontend podem abrir no Workspace; os starters Node.js são ZIPs para executar no VS Code com `npm test`. O portfólio pode ser exportado como HTML ou Markdown.

**Limite pedagógico:** checklists e evidências são autodeclarados, não certificados ou auditorias de segurança. A simulação de Git não executa comandos reais nem publica no GitHub. Os dados ficam no navegador e não são sincronizados.

[Arquitetura, exemplos e validação da Sprint 11](docs/SPRINT-11.md).

## DevLab 10.0 — Formação Backend e Full-Stack

A Sprint 10 acrescenta **25 aulas em cinco percursos**: Node.js, HTTP/REST, PostgreSQL, autenticação/autorização e testes/deploy/full-stack. A formação está disponível em `#/backend`; o laboratório HTTP em `#/backend/lab`. No total, o DevLab passa a ter **79 aulas** (29 originais + 25 de frontend + 25 de backend), além de missões e projetos.

- Cada aula contém teoria, exemplo, pergunta com feedback, tarefa prática e checklist **manual**.
- O simulador HTTP permite inspecionar status, JSON, autorização por recurso e identidades fictícias. **Não é uma API real**.
- Cada aula exporta um ZIP com **API Node executável**, testes HTTP com `node:test`, validações e CRUD em memória. O percurso final inclui frontend que faz `fetch` real à API local.
- Os projetos avançados incluem SQL com relações e consultas parametrizadas, funções seguras de hashing e sessões testadas isoladamente. **PostgreSQL e login não estão ligados às rotas da API inicial**; a integração é parte do exercício, e os starters não são sistemas seguros para produção.
- Progresso, quiz e anotações usam chaves novas no armazenamento local. Nenhuma chave anterior foi migrada ou apagada.
- O deploy continua sendo a versão HTML estática. Para executar Node e PostgreSQL, extraia o projeto ZIP no VS Code e siga o README do starter.

[Arquitetura, escopo e roteiro de testes da Sprint 10](docs/SPRINT-10.md).

## Sprint 9 — Formação frontend (HTML, CSS, JavaScript, TypeScript e React)

A versão 9 acrescenta **25 aulas em 5 percursos** com teoria original, exemplos curtos, pergunta de fixação, tarefa prática, checklist de revisão e anotações por aula. As **29 aulas de JavaScript e TypeScript anteriores permanecem preservadas**, assim como a Oficina, o TaskFlow e o Workspace. São 54 aulas no catálogo total, distribuídas entre o currículo anterior (29) e a formação complementar (25).

- Rota publicada: [`#/frontend`](https://devlab-zeta.vercel.app/#/frontend).
- HTML, CSS e JavaScript avançado: crie um projeto separado diretamente no Workspace, com HTML, CSS e módulos JS.
- TypeScript e React: baixe um **starter ZIP Vite** com README, arquivos `.ts`/`.jsx`, scripts npm e instruções para abrir no VS Code. Esses projetos **não executam TSX/React no Workspace estático**.
- Quiz com correção imediata; checklist de verificação **manual** — não é avaliação automática do código do aluno.
- Progresso da Formação salvo em novas chaves de `localStorage`, sem apagar as aulas existentes.
- Também foi corrigido o gerador estático, que removia acidentalmente `export` em algumas funções escritas dentro de strings dos starters do Workspace.

[Documentação da Sprint 9](docs/SPRINT-9.md).

---


## DevLab 8.0 — Workspace profissional (arquivos reais)

O novo caminho `#/workspace` abre um ambiente com **explorador de arquivos**, pastas, abas, editor, prévia, console e projetos separados. O projeto inicial TaskFlow modular tem `index.html`, CSS e dois módulos JavaScript conectados com `import/export`. É possível adicionar/renomear/excluir arquivos, editar e executar o projeto, copiar o TaskFlow das aulas para outro projeto e **exportar ZIP** para o VS Code.

O Workspace publica a versão estática, e pode carregar Monaco pelo CDN quando há conexão; caso contrário mantém o editor nativo completo. Os dados ficam no armazenamento local e **não** substituem o progresso anterior. Consulte [arquitetura, testes, instruções e limites](docs/SPRINT-8.md).



## DevLab 7.0 — avaliação por contratos e casos-limite

- **27 das 29 aulas** agora têm testes automatizados: 12 com interações de DOM e **15 novos contratos** de funções, incluindo as cinco aulas de TypeScript. Os dois marcos finais de produto e README continuam orientativos, pois exigem evidências de entrega, não apenas uma saída de função.
- Os novos contratos executam em um **Web Worker dentro de iframe de origem opaca**, com teto de 5 segundos, comparação estrutural de arrays/objetos, checagem de não mutação quando aplicável, casos-limite, Promise assíncrona e mensagens de erro por caso. O avaliador nunca executa a função do aluno na origem da aplicação.
- Em TypeScript o DevLab **verifica anotações de parâmetros, retorno, generics e interface com AST**, transpila e executa os casos. **Não é um typecheck completo** com bibliotecas de tipos; use `tsc --noEmit` em projetos reais.
- A prévia bloqueia **alguns padrões óbvios** de laços ilimitados antes de executar o JS (por exemplo `while(true)` e `for(;;)`). Isso **não garante interromper qualquer loop em handlers de DOM**: o sandbox limita permissões de origem, mas o iframe ainda pode bloquear a thread principal. Não execute código desconhecido. A solução robusta exigirá prévia em processo isolado/serviço próprio.
- A versão em produção continua estática. O código React/Monaco acompanha as alterações, mas seu build não foi validado localmente por indisponibilidade de npm neste ambiente.
- **Progresso preservado**: exercícios salvos, quizzes e marcos anteriores continuam no mesmo armazenamento local. Nas 15 aulas com novo contrato, refaça a verificação para comprovar o novo requisito.

Documentação detalhada em [docs/SPRINT-7.md](docs/SPRINT-7.md). Para executar: `npm test` (dependências locais) ou, com o ZIP offline, os scripts Node diretamente. Testes de navegador opcionais: `python tests/e2e_sprint7.py` (Chromium/Playwright).

## DevLab 6.0 — teste o comportamento, não apenas as palavras

Aulas selecionadas agora possuem um **avaliador funcional no iframe da prévia**. Ao verificar a solução, o DevLab executa interações com DOM, eventos, formulários, estado e armazenamento e mostra quais critérios foram aprovados ou reprovados.

- **12 aulas de JavaScript** com casos observáveis. Destaque: formulário recusa espaços, normaliza títulos, cadastra tarefas e limpa o campo; eventos são testados com dois nomes; contador deve incrementar duas vezes.
- **17 aulas restantes** mantêm o teste orientativo que já existia. O app diferencia os dois tipos de avaliação.
- A aprovação automática mais recente é invalidada se você alterar o código depois de passar; seus dados anteriores não são apagados.
- A lista de testes fica visível após a aprovação, com ação explícita para continuar no TaskFlow.
- Incluído teste Node independente e roteiro de teste no Chromium (`tests/e2e_lesson_assessment.py`).

[Detalhes de arquitetura, cobertura e limites](docs/AVALIACAO-AULAS.md).



Plataforma de estudo pessoal de **JavaScript e TypeScript** com teoria em unidades, exercícios por aula, editor de código, visualização da página em tempo real, console e projeto integrador TaskFlow.

O conteúdo, o design e o código são próprios. A organização em **curso → unidades → aulas** foi inspirada na estrutura pública de [mauriciodesouza.dev/estudo/cursos/csharp](https://mauriciodesouza.dev/estudo/cursos/csharp); não foi feita cópia de código, materiais didáticos ou identidade visual do site consultado.

## DevLab 4.0 — revisão espaçada e desafios de produto

A versão **publicada** agora possui duas áreas novas, organizadas a partir da análise de seis plataformas de ensino: **Revisão espaçada** e **Desafios independentes**. O estudo comparativo com links e decisões de design está em [`docs/REFERENCIAS-PEDAGOGICAS.md`](docs/REFERENCIAS-PEDAGOGICAS.md).

- **Revisão ativa:** depois do acerto no quiz, uma revisão é agendada para o dia seguinte. Revele a resposta somente após tentar recordar e escolha *Preciso praticar*, *Lembrei* ou *Muito fácil*. O sistema reagenda em intervalos progressivos (1, 3, 7, 14 e 30 dias). A avaliação é feita pelo próprio aluno.
- **Briefings com projeto próprio:** Conversor de temperatura, Rastreador de hábitos e Quiz de JavaScript, cada um com descrição, código inicial com `TODO`, critérios de aceitação e checklist de conferência **manual**.
- **Três espaços de edição:** exercícios por aula, TaskFlow compartilhado e um código salvo individualmente para cada desafio, com abas HTML/CSS/JS e prévia em `iframe` isolado.
- **Anotações por aula:** campo particular salvo automaticamente no navegador, sem cadastro e sem enviar para servidores externos.
- **Correção de interface:** trocar para a aba HTML ou CSS não volta a selecionar JS ao renderizar.

`npm test` inclui `tests/study-tools.mjs` para revisão, intervalos, validação de briefs e checklists. O projeto utiliza o mesmo `localStorage` de antes; o progresso anterior é preservado.

**Nota de escopo:** as novas telas estão na versão estática que é enviada à Vercel. A variante React + Monaco permanece incluída no repositório, mas ainda não implementa esses novos módulos. A checklist e a classificação de recordação não são verificações automáticas de correção.

## DevLab 3.0 — interface de trabalho e skills do projeto

A interface de produção recebeu um redesenho editorial: superfícies claras para leitura, um editor escuro com hierarquia própria, componentes mais discretos, controles focados em tarefas e rótulos diretos. A mudança visual foi implementada em `src/workspace.css` e incorporada na versão offline pelo gerador; não substitui nem apaga o armazenamento local usado para salvar o progresso.

**Skills locais instaladas no repositório (compatíveis com agentes que leem `SKILL.md`):**

- `.agents/skills/frontend-ui/SKILL.md` — direção visual, UX, acessibilidade e responsividade.
- `.agents/skills/web-development/SKILL.md` — arquitetura, JavaScript/React, exercício, prévia segura e persistência.
- `.agents/skills/web-quality/SKILL.md` — testes, integração e critérios de publicação.

`AGENTS.md` aponta para as skills. São instruções de trabalho para agentes de código, não bibliotecas ou plugins de execução. A instalação automática de skills externas com `npx skills` foi tentada, mas o acesso ao registro npm falhou neste ambiente; estas skills locais foram escritas especificamente para o DevLab. A documentação visual está em [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md).

**Atalho:** `Ctrl+Enter` (ou `Cmd+Enter`) atualiza a prévia na aula. Em mobile, a navegação abre em um painel lateral e o menu fecha com `Esc` em teclados compatíveis.

## DevLab 2.0 — experiência inspirada no Mimo

Esta versão traz o percurso **Aprender → Praticar → Construir**: teoria curta, quiz de fixação com feedback instantâneo, exercícios de código, verificação orientativa e aplicação ao projeto TaskFlow. O progresso conta XP e sequência de estudo, sem vidas, anúncios ou bloqueios artificiais. As 29 aulas possuem perguntas originais; 9 exercícios têm também testes observáveis no iframe.

As funcionalidades foram inspiradas em características publicamente descritas em [Mimo](https://mimo.org/mimo-coding-app), mas não foram copiados materiais, identidade visual ou código da plataforma. Consulte [Estudo funcional e implementação](docs/ESTUDO-MIMO-E-IMPLEMENTACAO.md).

**Publicação Vercel:** importe o repositório; a configuração `vercel.json` faz deploy da versão standalone sem instalar dependências. Na versão publicada, o compilador TypeScript é carregado sob demanda de uma CDN, exigindo internet ao acessar lições TS. O ZIP original mantém o compilador local para uso offline. Localmente você pode usar `npm run build:static` para gerar `dist/`. A versão React+Monaco continua acessível por `npm install` e `npm run dev`.

**Importante:** o progresso permanece no navegador, não sincroniza entre dispositivos; a verificação estrutural de exercícios não é prova de correção, exceto os testes funcionais pontuais indicados.

## Começar agora — sem npm

1. Extraia o ZIP.
2. Abra **`offline/index.html`** no navegador. É uma versão que roda sem instalação de bibliotecas.
3. Clique em **JavaScript → Fundamentos → O que são HTML, CSS e JavaScript**.
4. Altere o código na aba `script.js`: a prévia é atualizada após uma breve pausa, ou clique em **Executar**.
5. Use **Exercício da aula** para testar ideias e **Projeto guiado** para editar um TaskFlow compartilhado entre as aulas.

Para usar o VS Code, abra a pasta `offline/` e use a extensão **Live Server**, clicando em “Go Live”. Isso oferece uma origem `http://localhost` estável para o armazenamento no navegador e evita as limitações que alguns navegadores impõem a arquivos `file://`.

A versão offline inclui realce básico, numeração de linhas, indentação com Tab, abas HTML/CSS/JS/TS, prévia isolada, console de erros, salvamento local e exportação. Para experimentar um editor **Monaco (motor do VS Code)**, use a versão React abaixo.

## Versão avançada — React + Monaco

Abra a raiz do projeto num terminal e execute:

```bash
npm install
npm run dev
```

Abra a URL local exibida pelo Vite, normalmente `http://localhost:5173`.

Este aplicativo usa React, Monaco Editor, Vite e o compilador TypeScript. O preview roda em `iframe sandbox="allow-scripts"`. A versão React tem editor completo com realce de sintaxe, sugestões e edição em abas, além das mesmas aulas e do TaskFlow.

**Validação:** os fontes React passaram na análise sintática JSX. O build React ainda não pôde ser executado no ambiente de criação porque o acesso ao registro npm estava indisponível. A versão offline não precisa dessa instalação.

## Como o curso funciona

- **JavaScript:** 24 aulas distribuídas em 6 unidades: fundamentos, lógica, dados, DOM, web real e projeto final.
- **TypeScript:** 5 aulas da segunda trilha, abordando compilação, tipos, interfaces, funções e generics.
- **Aula:** teoria curta + conceitos + exemplo + desafio + editor HTML/CSS/JS (ou TS) + prévia + console.
- **Projeto evolutivo:** TaskFlow começa como um esqueleto com tarefas `TODO`. A cada aula, o aluno implementa melhorias. Os marcos do projeto são marcados manualmente; o progresso das aulas depende do quiz e do exercício validado.
- **Progresso:** conclusão de aulas e código são gravados no `localStorage` deste navegador/dispositivo, sem autenticação, cadastro, backend ou envio de dados.
- **Segurança:** a prévia executa código num `iframe` isolado, sem a permissão `allow-same-origin`. Para o exercício de persistência, a prévia recebe uma implementação de `localStorage` ligada ao armazenamento local do DevLab. **Não execute código de terceiros no laboratório.**

## Exportação de código

No editor, clique em **Exportar** para baixar um documento `.html` com HTML, CSS e JavaScript incorporados. No modo TypeScript, a exportação gera o arquivo `.ts`, não uma página HTML pronta. Para um projeto com vários arquivos e build, use a versão React e o repositório como base.

## Estrutura de arquivos

```text
devlab-javascript/
├── offline/
│   ├── index.html              # site independente de pacotes
│   ├── source/app.js           # lógica da versão offline
│   ├── source/study.css         # telas de revisão e desafios
│   ├── source/offline-extra.css
│   ├── build_standalone.py     # recompila offline/index.html
│   └── vendor/typescript.js    # compilador TS para a versão offline
├── src/
│   ├── App.jsx                 # aplicação React
│   ├── course.js               # unidades, aulas, exemplos, desafios, TaskFlow
│   ├── study-tools.js           # plano de revisão e briefings independentes
│   ├── preview.js              # construção da prévia segura
│   ├── monacoSetup.js          # editor Monaco e workers locais
│   ├── main.jsx
│   └── styles.css              # visual desktop e mobile
├── docs/TRILHA.md              # planejamento didático
├── tests/smoke.mjs             # testes de sintaxe/consistência
├── index.html                  # ponto de entrada React
├── package.json
└── vite.config.js
```

Para alterar ou acrescentar aulas, edite **`src/course.js`**. Na versão offline, execute `python offline/build_standalone.py` para reconstruir o site com as mudanças. Na versão React, o Vite aplica mudanças diretamente em desenvolvimento.

## Verificações automáticas

```bash
node tests/smoke.mjs
```

O teste valida contagem das aulas, conteúdo necessário, sintaxe dos exercícios JavaScript, compilação dos exercícios TypeScript, geração de prévia e exportação. Nesta revisão, o Chromium com Playwright executou localmente os fluxos de página inicial, navegação, aula, quiz, editor, prévia e atalho nas larguras 390, 768 e 1440px. A validação visual precisa ser repetida no endereço final da Vercel quando o ambiente de navegação permitir.

## Limitações importantes

- Trata-se de um **laboratório client-side**. Não executa Node.js, bibliotecas instaladas via npm dentro da prévia, banco de dados ou autenticação real.
- As conclusões de aulas e marcos do projeto são **manuais**, não correções automáticas dos desafios.
- A compilação TypeScript da prévia remove anotações de tipo, mas não substitui uma verificação completa `tsc` do projeto. O Monaco da versão React fornece diagnóstico de tipos no editor.
- O compilador TypeScript incluído em `offline/vendor/` é distribuído sob Apache 2.0; veja `LICENSE-typescript.txt` ao lado dele.
- Em navegação privada ou bloqueio de armazenamento local, o progresso pode não ser persistido.

## DevLab 5.0 — Oficina de código

A área **Oficina** (`#/oficina`) oferece seis missões que verificam saídas de funções JavaScript com 31 casos automatizados: duas implementações, dois bugs para corrigir e duas avaliações de autonomia com editor vazio. Os testes executam em um Worker dentro de um iframe de origem opaca, com timeout, feedback por caso e salvamento local independente das aulas.

**Detalhes, limitações, arquitetura e testes:** [docs/OFICINA.md](docs/OFICINA.md).

Rode `node tests/missions.mjs` para conferir os contratos das missões; o workflow do GitHub Actions inclui essa verificação.
