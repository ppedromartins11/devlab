# Pizzaria da Turma — prática para prova de PHP

Este é um **projeto de estudo**, não um sistema pronto para comércio ou acesso público. O objetivo é compreender a integração HTML → POST → validação PHP → PDO/MySQL → transação → confirmação. Não há login administrativo, controle de estoque ou pagamento.

## Instalar no XAMPP (Windows)

1. Abra o XAMPP e inicie **Apache e MySQL**. Confira `php -v` e se `pdo_mysql` está habilitado no `php.ini`.
2. No phpMyAdmin (`http://localhost/phpmyadmin`), importe `database/schema.sql`. Ele cria `devlab_pizzaria`, três tabelas e três pizzas de exemplo.
3. Abra a pasta do projeto no VS Code e, no terminal (com PHP no PATH), rode `php -S localhost:8000 -t public`.
4. Abra `http://localhost:8000`. Preencha cliente, pizza e quantidade; envie o pedido.
5. No phpMyAdmin, consulte `pedidos` e `itens_pedido` para confirmar as inserções. Após atualizar a página, o pedido não deve ser enviado novamente.
6. Rode `php tests/test_functions.php` para verificar as regras sem precisar de MySQL.

## Configuração de banco

Por padrão, a aplicação de estudo tenta `127.0.0.1`, banco `devlab_pizzaria`, usuário `root` e senha vazia, **apenas para um XAMPP local de laboratório**. Caso seu MySQL use outras credenciais, configure as variáveis `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS` no ambiente do processo do PHP. Não inclua segredos no Git.

## Sugestões de prova prática

- Básico: explique `$_POST`/`$_GET`, arrays, `foreach`, `require_once` e o formulário.
- Intermediário: implemente um CRUD de pizzas usando consultas preparadas, com validação.
- Avançado: faça autenticação administrativa com `password_hash`, `password_verify`, sessões, CSRF, autorização por rota, paginação e testes de fluxo.

## Segurança e limites

- A saída para HTML é escapada, CSRF é conferido, e SQL usa parâmetros. Há transação em pedido + item.
- Para produção ainda seriam necessários HTTPS, credenciais específicas e não triviais, políticas de acesso, rate limiting, logs, backups, tratamento de concorrência e auditoria de autenticação.
- O servidor PHP integrado é apenas para desenvolvimento. Não exponha este projeto diretamente na internet.
