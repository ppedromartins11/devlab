# DevLab — Auditoria da referência pedagógica Mimo (novembro de 2026)

## Escopo e limites da comparação

Esta é uma análise **da experiência pública** do [Mimo](https://mimo.org/), da [visão dos cursos](https://mimo.org/courses), da [experiência no aplicativo](https://mimo.org/mimo-coding-app) e da [descrição das trilhas](https://mimo.org/learn-to-code). Não houve acesso ao aplicativo fechado, código proprietário, algoritmos, dados internos, assinaturas nem cópia de recursos visuais. As interfaces públicas podem variar por plataforma, plano e atualização.

O objetivo não é reproduzir o Mimo pixel a pixel. O DevLab deve aprender com princípios pedagógicos universais — prática ativa, granularidade, feedback imediato, dicas, retomada e projetos — utilizando design, código, textos e exercícios originais.

## Diagnóstico antes da Sprint 21

| Princípio observado no Mimo | DevLab antes da revisão | Lacuna concreta |
| --- | --- | --- |
| Lições curtas, uma competência de cada vez | Aulas com teoria e exercícios extensos, sobretudo nos módulos guiados | Concepção mais textual que interativa |
| Aprendizagem ativa | Editor JS/TS e projetos, mas Python/Java/PHP/SQL com execução externa | Pouca intervenção do aluno dentro da explicação |
| Feedback rápido e contextual | Quizzes com confirmação e erros genéricos | Erro pouco instrutivo; aluno não sabe o que rever |
| Dicas progressivas | Presentes em partes de missões JS, pouco disponíveis nas aulas guiadas | Falta de apoio em passos |
| Percurso contínuo | Trilhas, progresso local, retorno à última aula JS/TS | Ação curta de continuidade pouco visível |
| Projetos de aplicação | TaskFlow, Oficina, Workspace e projetos guiados | Aulas avançadas de linguagens não têm execução automática |
| Gamificação | XP e sequência de dias | Não deve substituir evidência prática nem incentivar acertos vazios |

## O que a Sprint 21 acrescentou

- **31 microdesafios autorais** diretamente associados a aulas de JavaScript, TypeScript, Python, Java, PHP, SQL, Frontend e Backend. Cada um contém código com lacuna, objetivo, resposta, **duas dicas progressivas** e explicação do raciocínio.
- **Resposta digitada e feedback imediato**, com destaque de erro e acerto. O desafio é uma verificação textual de sintaxe/leitura, **não executa código nem avalia competência prática**.
- **Retomada rápida de cinco minutos** na página inicial, usando microdesafio pendente e, quando pertinente, última aula com atividade ainda não completada.
- **Feedback contextual para alternativas erradas** em quizzes de linguagens guiadas, em vez de apenas toast genérico.
- **Posição dentro da aula** visível para cursos guiados de três e quatro etapas, sem bloqueio de navegação e sem obrigar o aluno a acertar para acessar teoria, práticas ou documentação.
- **Persistência isolada** em quatro novas chaves locais: micro-completed, micro-drafts, micro-attempts, micro-hints (prefixo devlab-offline-v1:). Nenhuma chave anterior é apagada, renomeada ou migrada.
- Layout responsivo no mesmo design system grafite do DevLab, foco visível por teclado, mensagens em role=status, e suporte a redução de movimento.

## Cobertura e limitações

O DevLab mantém **129 aulas na Biblioteca de Linguagens** e dezenas de aulas compartilhadas em Frontend/Backend. Esta sprint inclui 31 atividades direcionadas; **não é correto afirmar que todas as aulas já contam com micropráticas equivalentes**. Nos demais conteúdos, continuam existindo perguntas de compreensão, exercícios no editor ou checklists. Ampliar gradualmente a cobertura com questões escritas e verificações adequadas será um projeto curricular próprio.

Aulas JS e TS com editor e verificação funcional mantêm essa execução. Para Python, Java, PHP e SQL, o programa precisa ser executado **localmente**, com runtime e ambiente apropriados; preencher a lacuna **não substitui testes**. Os checklists de execução são autodeclarados.

**Vídeos:** não foram integrados nesta sprint. Diferentemente da mera exibição de vídeos, a meta principal é a interação do aluno com o código. Vídeos com licença autorizada podem ser um recurso complementar após curadoria pedagógica e jurídica.

## Critérios da próxima etapa

1. Um microdesafio de compreensão ou código em toda aula em que a intervenção faça sentido, com revisão técnica de cada enunciado.
2. Mais testes de comportamento para código JavaScript/TypeScript e feedback por falha, sem usar somente comparação de texto.
3. Laboratórios Python/Java/PHP/SQL em ambientes isolados ou testes executados pelo aluno, sem conectar exercícios destrutivos ao banco Supabase real.
4. Retomada que considere todas as linguagens com histórico real de progresso e, em sprint própria, sincronização autenticada com RLS.
5. Testes E2E de foco, teclado, mobile, erros de resposta, conteúdo longo e salvamento.

## Segurança e direitos autorais

- O DevLab não reutiliza textos, ícones, ilustrações, elementos de marca, layout exato ou código do Mimo.
- Resposta de microdesafio é tratada como **texto**, não submetida a eval/Function nem à prévia de código.
- Código do aluno nas aulas originais permanece no iframe sandbox de origem opaca. Nunca inserir execução nova no contexto principal.
- Progresso é registro de estudo, não certificado de proficiência; evitar metáforas que indiquem validação automática de código onde só houve comparação textual.

## Arquivos e verificações

- Dados e correção: src/micro-lessons.js
- UI e persistência: offline/source/micro-lessons-ui.js
- Tema: offline/source/micro-v21.css
- Integração: offline/build_standalone.py, offline/source/app.js, learning-shell.js, pathways-ui.js e php-ui.js
- Testes: node --test tests/micro-lessons.mjs, npm test, npm run build:static
- E2E opcional: python tests/e2e_micro.py, conforme ambiente com Chromium e Playwright
