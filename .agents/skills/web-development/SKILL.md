---
name: web-development
description: Construir e manter o DevLab em JavaScript, HTML, CSS, React e TypeScript; garantir segurança da prévia, persistência, integridade das aulas e qualidade do código.
---

# Desenvolvimento Web — DevLab

## Arquitetura existente
- `src/course.js`: única fonte das aulas, exercícios, projetos e unidades.
- `src/learning.js` e `src/runtime-check.js`: progresso e avaliações.
- `src/preview.js`: documento do iframe isolado e exportação.
- `offline/source/app.js`: interface publicada e lógica do editor leve.
- `src/styles.css` + `src/workspace.css`: base e sistema visual; a versão offline incorpora ambos.
- `offline/build_standalone.py` gera `offline/index.html`; `node scripts/build-static.mjs` gera `dist/` para Vercel.
- `src/App.jsx` e `src/main.jsx`: alternativa React/Monaco, não confundir com deploy estático.

## Regras de implementação
- Não quebre IDs de aulas ou chaves `devlab-offline-v1:*`; o progresso do estudante depende deles.
- Não introduza dependências remotas para a navegação, tarefas ou o editor básico.
- Código do aluno executa exclusivamente no `iframe sandbox="allow-scripts"`, sem `allow-same-origin`.
- Escapar texto do usuário antes de inserir via `innerHTML`; não renderizar código arbitrário no contexto do aplicativo.
- Usar validação de comportamento quando possível; verificações sintáticas apenas não provam a solução.
- Novos exemplos JavaScript devem executar; novas aulas TypeScript precisam compilar.
- Separar arquivos por responsabilidade e usar nomes compreensíveis de aluno/desenvolvedor.

## Comandos de entrega
```bash
python offline/build_standalone.py
npm run build:static
npm test
```

Para React: `npm install && npm run build`, quando o registro npm estiver acessível.
