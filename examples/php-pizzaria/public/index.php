<?php
declare(strict_types=1);

session_start();
require_once __DIR__ . '/../src/functions.php';
require_once __DIR__ . '/../src/database.php';

$erro = '';
$pizzas = [];
try {
    $pdo = conexao();
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
        if (!csrfValido((string) ($_POST['csrf'] ?? ''))) {
            http_response_code(403);
            throw new InvalidArgumentException('Token de segurança inválido. Atualize a página.');
        }
        $dados = validarPedido($_POST['pizza_id'] ?? null, $_POST['quantidade'] ?? null, $_POST['cliente'] ?? null);
        $pedidoId = salvarPedido($pdo, $dados);
        $_SESSION['mensagem'] = "Pedido #{$pedidoId} registrado com sucesso!";
        header('Location: /', true, 303);
        exit;
    }
    $pizzas = $pdo->query('SELECT id, nome, preco FROM pizzas WHERE ativo = 1 ORDER BY nome')->fetchAll();
} catch (InvalidArgumentException $e) {
    $erro = $e->getMessage();
} catch (Throwable $e) {
    error_log($e->getMessage());
    http_response_code(503);
    $erro = 'Banco indisponível. Inicie o MySQL, importe database/schema.sql e confira a configuração.';
}
$mensagem = (string) ($_SESSION['mensagem'] ?? '');
unset($_SESSION['mensagem']);
?>
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pizzaria da Turma · Prática PHP</title>
<link rel="stylesheet" href="/style.css">
</head>
<body>
<main class="container">
  <p class="eyebrow">DevLab · Projeto de prova prática</p>
  <h1>Pizzaria da Turma</h1>
  <p>Formulário real com PHP, validação, PDO/MySQL, transação e sessão.</p>
  <?php if ($erro): ?><p class="error" role="alert"><?= escapeHtml($erro) ?></p><?php endif; ?>
  <?php if ($mensagem): ?><p class="success" role="status"><?= escapeHtml($mensagem) ?></p><?php endif; ?>
  <form method="post" action="/" class="form">
    <input type="hidden" name="csrf" value="<?= escapeHtml(csrfToken()) ?>">
    <label for="cliente">Seu nome</label>
    <input id="cliente" name="cliente" required maxlength="100" autocomplete="name">
    <label for="pizza">Pizza</label>
    <select id="pizza" name="pizza_id" required>
      <option value="">Selecione</option>
      <?php foreach ($pizzas as $pizza): ?>
        <option value="<?= (int) $pizza['id'] ?>"><?= escapeHtml($pizza['nome']) ?> — R$ <?= escapeHtml(number_format((float) $pizza['preco'], 2, ',', '.')) ?></option>
      <?php endforeach; ?>
    </select>
    <label for="quantidade">Quantidade</label>
    <input type="number" id="quantidade" name="quantidade" min="1" max="20" value="1" required>
    <button type="submit" <?= $pizzas ? '' : 'disabled' ?>>Registrar pedido</button>
  </form>
  <p class="footnote">Confira pedidos e itens no phpMyAdmin. Para aprofundar: crie CRUD de pizzas e autenticação de administrador.</p>
</main>
</body></html>
