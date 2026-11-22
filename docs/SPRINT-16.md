# Sprint 16 — Formação PHP para provas

## Objetivo

Adicionar PHP como linguagem independente na Biblioteca do DevLab, sem reordenar JavaScript/TypeScript nem reiniciar progresso anterior. Conteúdo autoral baseado no [manual oficial](https://www.php.net/manual/pt_BR/), com exemplos destinados a PHP **8.2+** e foco em prova teórica e exercício prático usando XAMPP e MySQL.

## Sequência sugerida

| Unidade | Aulas | Cobertura |
|---|---:|---|
| 1. Primeiros passos | 4 | Cliente/servidor, tags, echo, tipos, strings |
| 2. Lógica e funções | 4 | Comparações, condições, laços, funções e tipos |
| 3. Arrays e dados | 4 | Listas, mapas, map/filter, JSON |
| 4. Formulários | 4 | GET/POST, validação, escaping, redirecionamento |
| 5. Arquivos e sessões | 4 | include/require, cookies, sessão, uploads |
| 6. PDO/MySQL | 4 | Modelagem, conexão, consultas preparadas, CRUD/transações |
| 7. POO | 4 | Classes, interfaces/enums, exceções, Composer |
| 8. Segurança e integração | 4 | Hash de senhas, XSS/CSRF/SQL injection, APIs, pizzaria |

**Total:** 32 aulas, cada uma com 2 explicações técnicas, exemplo PHP, questão com justificativa, prática local e 3 critérios de revisão. O simulado tem **24 questões** em modo prova, correção final, revisão e salvamento local. A atividade prática de PHP não é corrigida automaticamente pelo DevLab: o checklist é autodeclarado.

## Percurso de estudos antes da prova

1. Execute o exemplo no PHP local (XAMPP ou `php exemplo.php`) e explique o resultado sem olhar a resposta.
2. Responda à questão da aula e justifique por que as alternativas restantes estão incorretas.
3. Adapte o código, valide entradas incorretas e marque os critérios **somente depois de executar**.
4. Faça o simulado sem consulta. Refaça os módulos errados e um exercício de CRUD PHP/MySQL.
5. Termine com o projeto de pizzaria: importe `database/schema.sql`, cadastre um pedido, confirme `pedidos` e `itens_pedido` e explique cada arquivo.

## Projeto prático

`examples/php-pizzaria` e `offline/downloads/php-pizzaria-prova.zip` contêm o mesmo starter: index PHP, formulário, PDO, transação, CSRF, escaping, SQL MySQL, CSS e testes CLI. Um CRUD de administrador/login completo não é implementado; são evoluções para o aluno. MySQL não é executado nem disponibilizado pela Vercel.

## Limites e segurança

- A Vercel hospeda o DevLab estático: **nenhum PHP é executado no site**.
- Não use `php -S` para servir um site público; é servidor local de desenvolvimento.
- Os exemplos do manual variam conforme as versões. Use instalação corrigida/suportada; XAMPP e PDO MySQL precisam estar configurados.
- O projeto usa padrão `root` e senha vazia **somente como facilidade de laboratório XAMPP local**. Use contas restritas em sistemas reais.
- O simulado verifica conceitos teóricos e não prova, sozinho, capacidade de implementar software.

## Testes

```sh
npm test
python tests/e2e_php.py
python tests/e2e_pathways.py
php examples/php-pizzaria/tests/test_functions.php
npm run build:static
```

A regressão visual usa Chromium com HTML inline e armazenamento simulado, pois `file://`/localhost são bloqueados pelo navegador de testes nesta infraestrutura. Isso **não** equivale a validar MySQL/XAMPP de ponta a ponta em um navegador físico; o teste de MySQL deve ser realizado no computador do aluno.
