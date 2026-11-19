---
name: frontend-ui
description: Planejar, revisar e implementar interfaces funcionais do DevLab com hierarquia visual clara, responsividade, boa tipografia e acessibilidade. Use em alterações visuais ou novas telas.
---

# Frontend UI — DevLab

## Antes de editar
- Leia `docs/DESIGN-SYSTEM.md` e compare a tela existente com o fluxo real de aprendizagem.
- Confirme qual interface está publicada: `offline/index.html` é a versão de produção, `src/` também contém a versão React.
- Identifique o objetivo, o conteúdo principal, a ação primária e o feedback do usuário na tela.

## Direção de design
- Prefira composição editorial e componentes de uso real, sem gradientes, neon, emblemas ou sombras decorativas.
- Padronize largura de leitura, espaço, raio de borda, fonte, contraste e estados de interação.
- Evite slogans genéricos, “cards para tudo” e indicadores que não ajudam na decisão.
- Use cores semanticamente: verde para progresso/ação, vermelho para erro, neutros para informação.
- Projete desktop (1440px), tablet (768px) e celular (390px). O editor não pode criar rolagem horizontal na página.
- Todo botão tem ação; todo controle apresenta estados hover/focus/disabled e nome acessível.

## Conclusão
- Compare início, aula e projeto, com conteúdo curto e longo.
- Teste teclado, orientação de foco e `prefers-reduced-motion`.
- Explique mudanças por problema resolvido, não por adjetivos visuais.
