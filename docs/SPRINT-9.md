# Sprint 9 — Formação frontend

## Objetivo

Acrescentar uma trilha de aprendizagem progressiva com conteúdo autoral e atividades práticas, reutilizando o Workspace existente e preservando as 29 aulas antigas.

## O que está implementado

| Trilha | Aulas | Prática |
|---|---:|---|
| HTML semântico | 5 | Semântica, regiões, links e imagens, formulários, tabelas e teclado |
| CSS e layout | 5 | Cascata, box model, Flexbox, Grid, responsividade e foco |
| JavaScript avançado | 5 | Módulos, coleções imutáveis, async/await, fetch, testes e depuração |
| TypeScript aplicado | 5 | Unions, narrowing, generics, DOM tipado e compilação estrita |
| React em projetos | 5 | JSX, composição, estado, listas, formulários e efeitos |

**Total:** 25 aulas adicionais, 25 perguntas de compreensão, 75 itens de checklist de revisão manual, 25 projetos iniciais, preservadas as 29 aulas originais (54 no total).

Em cada aula há objetivo mensurável, dois parágrafos explicativos, exemplo curto, quiz original, tarefa prática e três critérios de aceitação. As notas, os quizzes e os checklists são persistidos em chaves novas `devlab-offline-v1:frontend-*`, sem modificar os dados de aulas anteriores.

## Projetos

### HTML, CSS e JavaScript

Ao clicar em **Criar projeto no Workspace**, é criada uma **cópia separada** com `index.html`, `styles/style.css`, `src/main.js`, `src/utils.js`. A criação é idempotente por aula: ao voltar à mesma atividade o aluno reabre seu projeto e preserva suas mudanças. O editor executa import/export entre módulos no iframe isolado. Nenhuma atualização sobrescreve o TaskFlow.

### TypeScript e React

Ao clicar em **Baixar projeto inicial**, o navegador gera um ZIP válido sem bibliotecas externas:

- TypeScript: `package.json`, `tsconfig.json` com `strict: true`, `index.html`, `src/main.ts` e README. Commands `npm install`, `npm run dev`, `npm run typecheck`.
- React: Vite, plugin React, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/styles.css` e README. Commands `npm install`, `npm run dev`, `npm run build`.

O Workspace atual não compila TSX/JSX. Não prometemos preview React dentro dele: o aluno executa esses projetos no VS Code usando Node.js e Vite.

## Avaliação e honestidade pedagógica

- O quiz tem **correção automática da alternativa**.
- O checklist registra **autorrelato do aluno**, e **não executa testes automáticos** do código do projeto.
- A indicação de aula “revisada” exige quiz correto + os três itens marcados, mas **não é certificação de domínio**.
- As verificações automáticas de código das 27 aulas antigas e as missões da Oficina não foram alteradas.
- Projetos não são preenchidos com a solução final: os starters contêm TODOs e requisitos.

## Segurança e limites

- A exportação ZIP valida caminhos e extensões; não aceita caminhos com `..` fora do projeto.
- A prévia Workspace continua em iframe sandbox sem acesso à origem do DevLab.
- Nenhum serviço de backend ou conta foi adicionado. O armazenamento continua local ao navegador.
- O Monaco é carregado pela CDN, com fallback nativo. TS e React exigem Node e dependências no computador do aluno.
- Não cole segredos, tokens ou dados pessoais nos exercícios.

## Verificações

```bash
npm test
node --test tests/frontend.mjs
python tests/e2e_frontend.py
python tests/e2e_frontend_exports.py
node scripts/build-static.mjs
```

Os scripts Playwright usam Chromium local e HTML inline porque o ambiente de teste bloqueia acesso por URL a localhost/file. Isso não substitui um teste de navegação na URL real de produção, sobretudo se estiver protegida por autenticação Vercel.

## Próxima sprint

Construir a formação backend de maneira incremental: fundamentos de HTTP, APIs Node.js, validação, PostgreSQL, autenticação, autorização e testes. Evitar simular um servidor real dentro do iframe sem informar as limitações.
