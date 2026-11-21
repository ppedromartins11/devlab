# DevLab — sistema visual e critérios de qualidade

## Objetivo

A interface deve parecer um ambiente de estudo de programação — não um catálogo de cards de marketing. Priorize leitura, editor, retorno de execução e progresso significativo.

## Direção visual

- Superfície de leitura: `#f7f7f5`, branco `#ffffff` e texto `#1e2827`.
- Cor funcional: verde escuro `#225d4c` para ações, seleção e progresso; feedback negativo tem cor própria.
- Editor: `#111821`; manter a prévia branca, como uma página web.
- Sem gradientes decorativos, brilhos neon, sombras flutuantes ou botões sem função.
- Tipografia: fontes nativas do sistema, hierarquia por tamanho, peso e espaço.
- Borda de 1px, raio de 6–9px, divisões discretas; não transformar toda informação em card.
- Rótulos sempre escritos para o estudante: “Editor e pré-visualização”, “Exercício”, “Projeto TaskFlow”.
- Contraste e foco devem funcionar no teclado. Respeitar `prefers-reduced-motion`.

## Fluxo principal

`Trilha → Aula → Aprender → Praticar → Construir → Próxima aula`.

A navegação não deve exigir uma ordem artificial. O editor da aula é independente do código persistente do TaskFlow; o aluno pode praticar sem alterar o projeto.

## Critério para aceitar uma alteração

1. O aluno entende em 5 segundos onde está e qual é a próxima ação.
2. O editor continua funcional, com prévia isolada e console.
3. A mudança não apaga progresso existente no armazenamento local.
4. Testar as larguras 390px, 768px e 1440px, estados vazio/erro/concluído, teclado e toque.
5. Não introduzir cópias de interface, conteúdo ou identidade visual de serviços terceiros.

## Atualização visual — Sprint 12

- Menu compacto: início, quatro percursos em Aprender, três atividades em Praticar e três ferramentas em Construir. A árvore de aulas aparece dentro do percurso, não no menu permanente.
- Aulas frontend/backend: conceito, exemplo, pergunta, prática e revisão aparecem **uma etapa por vez**, navegáveis por botões ou teclas de seta. Caderno e metodologia ficam em seções expansíveis.
- Projetos profissionais: briefing, requisitos, revisão e evidências ficam em etapas separadas; checklists preservam a marcação existente.
- Página inicial: uma ação principal para continuar, escolha de trilhas e links de prática, sem banners redundantes.
- A busca é incremental e não remonta a aplicação inteira; preserva o editor e a prévia ativos.
