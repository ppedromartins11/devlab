# DevLab — sistema visual e critérios de qualidade

## Objetivo

A interface deve parecer um ambiente de estudo de programação — não um catálogo de cards de marketing. Priorize leitura, editor, retorno de execução e progresso significativo.

## Direção visual — DevLab 13.0 (dark)

- **Canvas:** `#0B0D12`; **sidebar:** `#0E1016`; **superfície:** `#171A22`; **superfície elevada:** `#20232D`; **borda:** `#30343F`.
- **Texto primário:** `#F2F3F7`; **texto secundário:** `#A7ADBB`; **texto auxiliar:** `#858E9F`.
- **Acento único:** lilás claro `#AAA0FA`, restrito a foco, seleção, progresso e links funcionais.
- **Ação primária:** branco quase neutro `#F1F2F7` com texto grafite. Não adicionar gradientes, efeitos neon, padrões decorativos nem cores por categoria.
- **Marca:** `DevLab` em tipografia sem serifa, símbolo original `</>` em branco sobre fundo grafite. Favicon SVG simplificado com os sinais de código.
- **Componentes:** cards grafite com borda de 1 px, contraste acessível, hierarquia espacial e um único painel educativo por etapa.
- **Editor:** permanece escuro; a prévia em iframe exibe a cor definida pelo próprio projeto do estudante, inclusive branco se o projeto especificar.
- **Tipografia:** fontes de sistema e monoespaçadas no código; foco visível por teclado e modo `prefers-reduced-motion`.

Implementação centralizada em `offline/source/dark-v13.css`, importada depois dos estilos anteriores pelo gerador estático e pela entrada React.

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
