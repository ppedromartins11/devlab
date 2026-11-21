# DevLab 12.0 — Aprendizagem modular e interface limpa

## Objetivo

Reduzir a densidade visual e transformar cada tela em uma decisão clara: **aprender, praticar ou construir**. A mudança é de navegação e apresentação, sem remover aulas ou alterar chaves de progresso.

## Implementado

1. **Navegação:** menu compacto agrupado em três áreas, sem 29 aulas permanentemente expandidas. Busca global de aulas de JavaScript, TypeScript, frontend e backend.
2. **Home:** foco na última aula, quatro trilhas e três ações de prática; removidos banners promocionais redundantes.
3. **Aulas frontend/backend:** cinco módulos (Entender, Exemplo, Responder, Praticar e Revisar). Apenas um painel fica visível. Anotações e orientações são expansíveis.
4. **Jornada Profissional:** cada projeto separa briefing, requisitos, revisão e evidências. A área de Git mantém seu simulador e apresenta exemplos sob demanda.
5. **Aulas originais:** na etapa Aprender, o editor de código fica oculto para leitura e quiz; reaparece em Praticar e Construir.
6. **Otimização:** seleção de módulos altera apenas o DOM necessário, sem recriar todo o editor. A busca também atualiza somente os resultados sem chamar `render()` a cada tecla. O índice de aulas é calculado uma vez.

## Arquitetura

- `src/learning-navigation.js`: modelo puro de navegação, busca e validação de etapa.
- `offline/source/learning-shell.js`: composição UI e navegação modular via event delegation.
- `offline/source/learning-v12.css`: estilos exclusivos e responsivos, importados **depois** das camadas legadas.
- `offline/build_standalone.py`: incorpora os módulos sem nova dependência.
- `tests/learning-navigation.mjs` e `tests/e2e_clean_ux.py`: regressão e testes funcionais.

## Garantias e limites

As rotas antigas, 79 aulas (29 JS/TS, 25 frontend e 25 backend), 6 missões e dados locais continuam intactos. A aprovação dos checklists frontend/backend/carreira permanece **manual**, enquanto os testes existentes da Oficina e da trilha JS/TS permanecem automáticos. O editor React/Monaco é uma variante separada e não recebeu paridade visual nesta sprint; a aplicação Vercel usa a versão estática.

## Verificação local

```bash
python offline/build_standalone.py
npm test
npm run build:static
python tests/e2e_clean_ux.py
python tests/e2e_frontend.py
python tests/e2e_frontend_exports.py
python tests/e2e_backend.py
python tests/e2e_career.py
```

Não interpretar o status de compilação como comprovação de acesso público: a Vercel pode exigir autenticação.
