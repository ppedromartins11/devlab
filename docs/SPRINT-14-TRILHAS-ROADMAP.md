# Sprint 14 — Trilhas profissionais e biblioteca de linguagens

## Objetivo

Separar o estudo por **objetivo de carreira** (Frontend, Backend, Full-Stack) do estudo por **linguagem** (JavaScript, TypeScript, Python, Java, SQL). A pessoa deve saber por que estuda um conceito, como praticá-lo e o que entregar antes de avançar.

## Referências consultadas

- [roadmap.sh — Frontend](https://roadmap.sh/frontend): fundamentos da internet, HTML semântico, formulários, acessibilidade, CSS, layouts, JavaScript, Git, gerenciadores de pacotes e frameworks.
- [roadmap.sh — Backend](https://roadmap.sh/backend): linguagem de programação, HTTP, bancos de dados, APIs, segurança, testes, observabilidade e deployment.
- [roadmap.sh — Full Stack](https://roadmap.sh/full-stack): checkpoints sucessivos de páginas estáticas, interatividade, frontend, backend, dados, implantação e automação.
- [roadmap.sh — catálogo](https://roadmap.sh/roadmaps/): percursos individuais por linguagem, incluindo JavaScript, TypeScript, Python, Java e SQL.
- [roadmap.sh — projetos frontend](https://roadmap.sh/frontend/projects) e [backend](https://roadmap.sh/backend/projects): importância de consolidar o conhecimento com projetos independentes, dos exercícios básicos até soluções integradas.
- Para o conteúdo novo de Python e Java, os exemplos se apoiam na [documentação oficial do Python](https://docs.python.org/3/tutorial/) e em [dev.java](https://dev.java/learn/), com links individuais por aula.

**Autoria e propriedade intelectual:** o DevLab usa os *nomes genéricos de competências* e a ideia de progressão pública dos roadmaps como referências curriculares. As descrições, a organização de etapas, as perguntas, as atividades e os checklists são escritos especificamente para o DevLab. Não há transcrição de guias, reutilização de diagramas, raspagem de textos, ilustrações de terceiros nem falsa atribuição de endosso pelo roadmap.sh.

## Arquitetura e rotas

| Tela | Rota | Descrição |
|---|---|---|
| Início | `#/inicio` | Visão geral, três carreiras, acesso rápido às linguagens e prática |
| Trilhas | `#/trilhas` | Frontend, Backend, Full-Stack |
| Uma trilha | `#/trilha/frontend` | Seis etapas progressivas, aulas compartilhadas, projeto e referências |
| Linguagens | `#/linguagens` | JavaScript, TypeScript, Python, Java, SQL |
| Uma linguagem | `#/linguagem/python` | Aulas próprias de Python e Java ou links a aulas existentes |
| Aula guiada | `#/linguagem/aula/py-intro` | Entender → Responder → Praticar, anotações e checklist |
| Aulas anteriores | rotas antigas | Continuam funcionando e preservam IDs e armazenamento |

## Cobertura entregue

### Frontend (6 etapas)

1. Fundamentos da Web.
2. HTML semântico, formulários e acessibilidade.
3. CSS, responsividade e layouts.
4. JavaScript, DOM, eventos, API e dados locais.
5. TypeScript e componentes React.
6. Testes, qualidade e deploy.

### Backend (6 etapas)

1. Linguagem, terminal e internet.
2. Node.js, npm, módulos e testes.
3. HTTP, APIs e CRUD.
4. PostgreSQL, queries parametrizadas e transações.
5. Sessões, autenticação, autorização e segurança.
6. Testes de integração, CI/CD, logs e deploy.

### Full-Stack (6 etapas)

1. Web e versionamento.
2. Frontend com JavaScript e React.
3. Backend Node e APIs REST.
4. PostgreSQL, sessão e propriedade de dados.
5. Integração ponta a ponta e testes.
6. Projeto final e publicação.

**Compartilhamento de progresso:** as aulas existentes são referenciadas por tipo+ID e utilizam exatamente os mesmos registros de conclusão. Uma aula revisada em Backend também aparece como revisada quando reutilizada em Full-Stack. Não há migração nem cópia do histórico anterior.

### Linguagens

- **JavaScript:** curso anterior de 24 aulas, editor e avaliação existentes.
- **TypeScript:** curso anterior de cinco aulas com compilação e validações existentes.
- **SQL:** reutiliza cinco aulas do módulo PostgreSQL, com exercícios externos e revisão de checklists.
- **Python:** cinco aulas originais sobre variáveis, controle, coleções, funções e testes.
- **Java:** cinco aulas originais sobre compilação, controle, classes, coleções e testes.

Python e Java não possuem execução de código dentro do DevLab, nem avaliação automática do programa. As novas aulas incluem pergunta de conceito, revisão autodeclarada, anotações locais e atividades que devem ser realizadas com Python/JDK no VS Code.

## Salvamento, acessibilidade e desempenho

- A aplicação mantém as chaves anteriores de `localStorage`; não reinicia a conclusão das 79 aulas já existentes.
- Novas chaves: `devlab-offline-v1:pathway-checkpoints`, `devlab-offline-v1:language-quiz`, `devlab-offline-v1:language-checks` e `devlab-offline-v1:language-notes`.
- Checkpoints de projeto são explicitamente **autodeclarados**; a aprovação de uma pergunta de Python/Java valida apenas a resposta conceitual.
- O conteúdo novo fica em `src/learning-pathways.js` e `src/language-curriculum.js`; páginas e estilos em `offline/source/pathways-ui.js` e `pathways-v14.css`.
- O build estático concatena módulos no mesmo `offline/index.html`, sem novas dependências de runtime. O tema continua grafite/escuro, com roxo sutil no foco e progresso.
- Checklists utilizam `label` nativo e persistência local, painéis de etapas usam `details/summary`, e inputs mantêm nomes acessíveis.

## Limites e próximos passos

- Os roadmaps públicos são mais extensos que os conteúdos atualmente ensinados no DevLab. Tópicos como DNS avançado, escalabilidade, caching, Docker e observabilidade são **objetivos complementares**, não novas aulas completas. Links externos fornecem referência até que haja material autoral e prática testada.
- Os projetos de consolidação das trilhas não são corrigidos automaticamente: é necessária revisão externa dos artefatos e testes.
- Não há execução Python/JDK no navegador, conta de usuário nem sincronização entre dispositivos.
- A variante React/Monaco é um caminho de desenvolvimento separado; a versão publicada pela Vercel continua sendo o HTML estático gerado.

## Testes

```bash
npm test
node scripts/build-static.mjs
python tests/e2e_pathways.py
python tests/e2e_frontend.py
python tests/e2e_backend.py
python tests/e2e_workspace.py
python tests/e2e_career.py
```

Playwright usa HTML inline e um `localStorage` simulado porque o ambiente de teste pode bloquear `localhost`. Esse teste cobre a interface e o comportamento do navegador, não a disponibilidade pública da Vercel.
