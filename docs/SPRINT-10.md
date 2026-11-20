# Sprint 10 — Formação Backend e Full-Stack

## Objetivo

Expandir o DevLab de JavaScript/frontend para fundamentos de backend com material autoral, práticas reproduzíveis no Node.js, SQL e segurança sem transformar uma demonstração local em um produto falsamente apresentado como pronto para produção.

## Entregas

- 25 aulas novas divididas em cinco percursos de cinco aulas: Node.js; HTTP e REST; PostgreSQL; autenticação e autorização; testes, deploy e projeto final.
- Cada aula tem objetivos, dois blocos de teoria, exemplo de código, pergunta de três alternativas com explicação, missão e três critérios de revisão manual.
- Rota `#/backend` com catálogo; `#/backend/trilha/<id>` com currículo; `#/backend/aula/<id>` com aulas; `#/backend/lab` com simulador HTTP.
- Laboratório HTTP didático, **inteiramente local e sem requisição de rede**, que ensina 200, 201, 204, 400, 401, 403, 404, 405 e 422, incluindo autorização por objeto. As identidades são escolhidas pelo aluno para testar cenários; não há login real.
- Projeto ZIP por aula contendo API Node real em memória, endpoints HTTP CRUD, validação JSON e testes com `node:test`/`fetch`. Pode rodar com `node --test` e `node src/server.js` sem baixar pacotes nos dois primeiros percursos.
- Nos três percursos avançados: arquivos SQL de migração, consultas PostgreSQL parametrizadas e configuração de `pg` com `DATABASE_URL` local de exemplo. Esta camada **não está conectada à API em memória**: é uma atividade de integração.
- Nos percursos de segurança: funções isoladas de hash de senha usando scrypt + salt, token de sessão aleatório, cookie HttpOnly e verificação de dono com testes. **O login, a sessão persistida, o rate limiting, o anti-CSRF e a autorização na API principal são tarefas a implementar**; não utilizar o starter com contas reais.
- No percurso final: frontend de demonstração servido pela própria API em `/` e `/main.js`, com `fetch` real de criação e listagem no mesmo domínio (ainda usando memória).
- Persistência da formação em novas chaves `devlab-offline-v1:backend-quiz`, `:backend-checklist`, `:backend-notes`, sem alterar as chaves anteriores. O laboratório de simulação é volátil de propósito.

## Segurança e limites

1. A versão hospedada continua sendo um site estático. Ela **não hospeda PostgreSQL, API real, autenticação nem terminal remoto**. O servidor funcional é um projeto para baixar e executar localmente.
2. O simulador **não é** um teste automatizado do código escrito pelo aluno: é um recurso para visualizar o protocolo. Checklist de prática é revisão manual, não certificação nem avaliação de segurança.
3. Banco e auth são um **scaffold educacional**. Falta integração completa entre roteador, `pg` e sessão antes de receber qualquer dado real. Nunca inserir segredos no DevLab ou commitar `.env`.
4. O frontend de demonstração do percurso final usa API real local, mas armazenamento temporário e nenhuma autenticação.
5. Rotas existentes de 29 aulas JavaScript/TypeScript, 25 aulas frontend, Oficina e Workspace são preservadas. O React/Monaco alternativo continua sem esta paridade; produção usa `offline/index.html`.
6. A versão de `pg` indicada no exemplo é um intervalo para instalação no ambiente local, não uma dependência instalada no deploy estático. Verificar atualizações de segurança antes de publicar qualquer API.

## Verificação

```bash
python offline/build_standalone.py
node scripts/build-static.mjs
npm test
python tests/e2e_backend.py  # exige Playwright e um Chromium instalado; usa set_content devido à política de navegação da sandbox
```

`tests/backend.mjs` verifica os contratos das aulas, estrutura dos 25 starters, exportação ZIP, fluxos 401/403/404, CRUD simulado e **executa testes HTTP de projetos Node exportados em subprocessos reais**, sem serviços externos. `tests/e2e_backend.py` verifica a interface e a preservação de dados usando um localStorage simulado apenas na automação; não substitui o teste de persistência no domínio real.

## Referências para aprofundar

- Node.js, guia oficial: https://nodejs.org/en/learn
- HTTP, MDN: https://developer.mozilla.org/pt-BR/docs/Web/HTTP
- PostgreSQL, documentação oficial: https://www.postgresql.org/docs/current/
- node-postgres, consultas parametrizadas: https://node-postgres.com/features/queries
- OWASP, API Security Top 10: https://owasp.org/www-project-api-security/

Estes links foram usados para conferir princípios técnicos; exemplos, textos e código da formação são originais do DevLab.
