# DevLab 19 — Aprender programação do básico ao avançado

## Direção pedagógica

O DevLab é uma plataforma de **aprendizagem prática contínua**, não de preparação para provas, concursos, certificações ou trabalhos de disciplina. As aulas priorizam construir compreensão transferível: compreender o problema → explicar o raciocínio → executar um exemplo → modificar o programa → resolver exercício diferente → testar casos-limite → construir projeto → revisar erros.

Nenhuma plataforma garante “100% de aprendizado” por quantidade de aulas ou marcação de checklist. No DevLab, progresso é um **registro de estudo e prática autodeclarada**. A competência precisa ser comprovada em projetos executados, revisão independente e testes funcionais.

## Cobertura atual do catálogo

| Linguagem | Aulas | Modalidade | Tópicos principais |
|---|---:|---|---|
| JavaScript | 33 | 24 interativas + 9 guiadas | Lógica, DOM, APIs, closures, protótipos, generators, concorrência, segurança, arquitetura, desempenho e projeto |
| TypeScript | 15 | 5 interativas + 10 guiadas | Tipos, interfaces, generics, strict, unions, narrowing, utility types, validação runtime, async, DOM, testes |
| Python | 17 | Guiadas com execução local | Tipos, fluxo, estruturas, funções, venv, strings, sets, dataclasses, JSON, iteradores, testes, HTTP, asyncio, SQLite, arquitetura |
| Java | 17 | Guiadas com execução local | JDK, condições, POO, coleções, testes, Maven, contratos, records, generics, Streams, IO, concorrência, HTTP, JDBC, projeto |
| PHP | 32 | Guiadas com execução local | Sintaxe, controle, arrays, formulários, sessões, PDO/MySQL, POO, segurança, APIs e aplicação de pedidos |
| SQL (PostgreSQL) | 15 | Guiadas com SQL executado em laboratório local | SELECT, WHERE, ORDER BY, JOIN, GROUP BY, EXISTS, schema, constraints, transações, índices, CTE, janelas, planos, RLS e projeto |

**Total:** 129 aulas no catálogo de linguagens. Aulas compartilhadas nas trilhas Frontend/Backend/Full-Stack preservam suas identificações originais. Não somar duplicatas de carreira como se fossem novos conteúdos.

## Como comprovar o aprendizado

Para cada aula, o estudante deve ser capaz de:

1. Explicar o conceito em linguagem própria e prever a saída de um exemplo sem consultá-lo.
2. Executar o exemplo no ambiente apropriado, identificar diferenças e resolver erros reais.
3. Adaptar o exemplo para um problema distinto — não apenas trocar nomes de variáveis.
4. Verificar no mínimo o caso comum, o caso vazio/inválido e um caso-limite relevante.
5. Documentar a decisão técnica e o que foi aprendido ou não compreendido.
6. Ao fechar cada etapa, integrar as competências em um projeto e demonstrar comportamento reproduzível.

**Critério para chamar um conceito de dominado:** o aluno consegue reproduzir a solução do zero com documentação como referência, explicar o *porquê* e mostrar os testes executados. O DevLab não atribui certificação automática de domínio.

## Diferenças técnicas importantes

- A versão publicada é HTML/JavaScript estático, gerado por `offline/build_standalone.py`, e incorpora as novas aulas de `src/extended-language-curriculum.js`.
- JS e TS **mantêm** suas 24 e 5 aulas anteriores no editor legado, e adicionam aprofundamentos guiados; Python, Java, SQL e PHP são cursos guiados.
- O navegador do DevLab **não executa Python, Java, SQL ou PHP**. Os exemplos devem ser executados em Python, JDK, PostgreSQL/psql e PHP CLI/XAMPP locais. Os questionários verificam somente compreensão conceitual; os checklists são autodeclarados.
- SQL deve ser executado em **banco de desenvolvimento isolado**, nunca no Supabase de produção para exercícios potencialmente destrutivos.
- O link legado `#/linguagem/php/simulado` continua funcionando para preservar bookmarks e `php-exam-state`, mas a interface descreve o módulo como **revisão de conceitos**, sem meta de prova.
- O exemplo de aplicação de pedidos mantém o ZIP legado para preservar links existentes; o estudo é sobre arquitetura e implementação, não sobre uma prova de pizzaria.
- IDs anteriores, rotas e chaves de `localStorage` permanecem intactos. O login da Sprint 18 ainda **não sincroniza** progresso entre dispositivos.

## Próximas auditorias de profundidade

A ampliação de conteúdo é real, mas este commit **não valida automaticamente os projetos feitos pelos alunos**. Para continuar até níveis profissionais mais profundos, ainda cabem laboratórios avançados de observabilidade, testes de integração, arquitetura distribuída, Docker/CI, profiling, banco em carga concorrente, Java virtual threads e migrações SQL em cenários reais. O escopo depende de infraestrutura de execução segura e não deve ser prometido como já implementado.

## Garantia de qualidade desta sprint

- `npm test` e `node --test tests/curriculum-mastery.mjs`.
- `node scripts/build-static.mjs`, recompilando HTML com conteúdo novo.
- Validação de IDs, estrutura de aulas, exemplos JS/TS e sintaxe Python/Java quando runtimes disponíveis.
- Navegador: cursos, navegação entre aulas, persistência de quizzes/notas/checklists, 320/390/768/1440 px, editor anterior e prévia isolada.
- Nenhuma migração de dados ou mudança nas políticas de acesso Supabase foi feita nesta sprint.
