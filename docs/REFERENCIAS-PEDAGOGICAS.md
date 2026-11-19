# DevLab 4.0 — estudo comparativo das plataformas de ensino

> Análise de padrões pedagógicos visíveis nas páginas públicas. Não utilizamos código-fonte, recursos visuais, enunciados, marcas ou materiais proprietários de terceiros.

## Referências consultadas (19/11/2026)

| Plataforma | Padrão observado | Adaptação original no DevLab |
|---|---|---|
| [freeCodeCamp](https://www.freecodecamp.org/learn/) | Construção por desafios e projetos para consolidar fundamentos | Requisitos verificáveis, projetos independentes, testes de conteúdo |
| [The Odin Project](https://www.theodinproject.com/paths/2) | Currículo estruturado com aprendizagem baseada em projetos | TaskFlow permanece como projeto longitudinal, acrescido de projetos isolados |
| [Scrimba](https://scrimba.com/learn/learnjavascript) | Exercícios diretamente no contexto do código e interrupções de prática | Editor existente integrado aos briefings, sem vídeos/copiar interface |
| [Exercism](https://exercism.org/tracks/javascript) | Prática repetida por conceito e análise/reflexão | Revisão espaçada e registro do que o aluno aprendeu; **sem** alegação de mentoria real |
| [Codecademy](https://www.codecademy.com/pages/workspaces) | Área livre para experimentar além de exercícios avaliados | Código de cada briefing persistido separadamente do exercício e do TaskFlow |
| [Frontend Mentor](https://www.frontendmentor.io/) | Brief de produto, critérios claros, resolução independente | 3 briefings originais com objetivos, requisitos e checklist manual |

## Justificativas didáticas

1. **Recuperação ativa em vez de releitura passiva.** Após acertar o quiz, o conceito é colocado na revisão do dia seguinte. Ao revisitar, a resposta fica oculta até o aluno tentar recordar. O aluno avalia a facilidade; o intervalo cresce. Trata-se de um agendador simples, **não** de um modelo adaptativo validado cientificamente.
2. **Transferência de aprendizado.** O aluno aplica a mesma linguagem em pequenos problemas diferentes do TaskFlow. Cada código inicial contém tarefas `TODO` e não resolve automaticamente os requisitos.
3. **Critérios de aceitação.** Cada projeto contém quatro condições observáveis. A marcação é manual e explicitamente sinalizada; não existe teste automatizado dos três projetos.
4. **Metacognição.** Cada aula tem um campo privado para escrever um resumo ou uma dúvida, persistido no navegador.
5. **Edição real.** O laboratório dos briefs contém HTML, CSS e JS, prévia isolada, console e exportação. Corrigimos o reset indevido das abas HTML/CSS em `render()`.

## Limites e próximos incrementos

- A revisão e o código são salvos no navegador; não são sincronizados entre dispositivos.
- A produção da Vercel usa a versão estática de `offline/index.html`. Os fontes React + Monaco são uma implementação alternativa; ainda não possuem paridade de todas as novas telas.
- A checklist não prova que o código funciona; o aluno deve executar e testar na prévia.
- O algoritmo de intervalos é uma heurística simples (1, 3, 7, 14 e 30 dias).
- Não adicionamos cópia de vídeo-aulas, mentores automáticos ou certificados sem avaliação comprovável.

## Verificação

`npm test` executa verificações de conteúdo, checkpoints e funções do plano de revisão. Os testes de navegador cobrem fluxo da home para a revisão, inscrição pós-quiz, alternância das três abas do editor, preview, notas e checklist, com verificação mobile de overflow.
