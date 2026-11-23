# DevLab Sprint 22 — Exercícios em todas as aulas

## Escopo real

O inventário do código atual reúne **179 posições de aula (176 IDs distintos)**, sem contar reaproveitamentos das trilhas profissionais como novos conteúdos:

| Origem | Aulas |
|---|---:|
| JavaScript (editor) | 24 |
| TypeScript (editor) | 5 |
| Python (guiadas) | 17 |
| Java (guiadas) | 17 |
| PHP (guiadas) | 32 |
| SQL/PostgreSQL (guiadas) | 15 |
| JavaScript e TypeScript avançados (guiadas) | 19 |
| Frontend (HTML, CSS, JavaScript, TypeScript, React) | 25 |
| Backend (Node.js, HTTP, PostgreSQL, autenticação, qualidade) | 25 |
| **Total de posições** | **179** |

**Há três identificadores reutilizados em cursos diferentes**: `api-json`, `ts-generics` e `ts-dom`. Os microdesafios recebem escopo por curso quando necessário, preservando os IDs e o progresso legado.

**Cobertura:** as 32 atividades autorais existentes são preservadas. As demais **147** são geradas de forma determinística **a partir do código e do objetivo da aula respectiva**, usando um banco de regras de conceitos de programação. Não usam um exercício genérico repetido em todas as páginas.

## Duas atividades em cada aula

**1 — Complete o código (curta):** exibe trecho de código da aula, com um termo ou instrução removida. O estudante pode digitar ou selecionar sugestões por toque; após submeter, recebe feedback. Há duas dicas progressivas. A correção compara **texto normalizado** com a resposta esperada, não executa nem testa algoritmos.

**2 — Exercício prático:** painel expansível com enunciado **original da própria aula**, critérios a validar e código inicial **editável no navegador**. O rascunho é salvo separadamente, pode ser copiado e continua no editor oficial da aula (JS/TS) ou num ambiente de execução local (Python, Java, PHP, SQL e módulos de infraestrutura). O DevLab não finge executar linguagem de backend no navegador.

## Localização no produto

- Na etapa conceitual de todas as **29 aulas JS/TS com editor**, aparece a sequência curta e a prática editável, sem substituir o editor da Oficina ou do TaskFlow.
- Em todas as **100 aulas guiadas**, inclusive PHP e SQL, as tarefas ficam junto da explicação. A prática longa continua disponível em sua própria etapa.
- Nas **50 aulas Frontend/Backend**, a microatividade aparece na primeira etapa; o botão de prática direciona para a etapa correta.
- O resumo inicial sugere uma aula com microdesafio ainda pendente, inclusive fora de JavaScript.
- Respostas, tentativas, dicas e rascunhos permanecem separados por ID, sem apagar versões antigas.

## Segurança e acessibilidade

- Todo texto de aluno é tratado como texto e escapa HTML antes de renderizar. **Jamais executar código digitado no contexto principal** do DevLab.
- O editor/prévia JS/TS anterior mantém isolamento no iframe sandbox.
- A marcação de conclusão de lacuna não substitui execução de testes nem certifica proficiência.
- Campos e botões têm rótulos, feedback via role=status, foco de teclado e layout responsivo.
- A implementação não usa código, imagens, personagens, textos ou identidade proprietária do Mimo.

## Limitações assumidas

As 147 lacunas derivadas são tecnicamente ligadas aos exemplos reais, mas isso **não equivale à revisão pedagógica manual de cada variação**. A seleção automática do token pode dar preferência a uma instrução secundária do exemplo. A qualidade deve ser revisada progressivamente por pessoas com experiência em cada linguagem, começando pelas aulas mais acessadas.

A prática editável de Python, Java, PHP, SQL, Frontend e Backend salva rascunho no navegador, mas não compila, não executa e não prova o comportamento. A execução real depende dos runtimes do aluno ou de infraestrutura segura futura. A avaliação automatizada de código JS/TS permanece a que já existia na plataforma.

## Validação

- `node --test tests/micro-coverage.mjs`: lista fechada de 179 IDs; todas as aulas devem ter lacuna, resposta, duas dicas, prática, código inicial, critérios e rota.
- `node --test tests/micro-lessons.mjs`: regressão das 32 atividades anteriores.
- `npm test`: suíte completa da plataforma.
- `node scripts/build-static.mjs`: reconstrução da versão publicada.
- `python tests/e2e_micro.py`: smoke opcional de navegador com Chromium e Playwright, além de testes manuais em Safari/iOS.

**Política de publicação:** se qualquer teste obrigatório falhar, não publicar a alteração em produção. Nenhuma migration ou modificação de Supabase é necessária.
