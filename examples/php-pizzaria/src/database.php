<?php
declare(strict_types=1);

function conexao(): PDO
{
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $db = getenv('DB_NAME') ?: 'devlab_pizzaria';
    $user = getenv('DB_USER') ?: 'root';
    $pass = getenv('DB_PASS') ?: '';
    return new PDO(
        "mysql:host={$host};dbname={$db};charset=utf8mb4",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
         PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
         PDO::ATTR_EMULATE_PREPARES => false]
    );
}

function salvarPedido(PDO $pdo, array $dados): int
{
    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare('SELECT id, preco FROM pizzas WHERE id = :id AND ativo = 1');
        $stmt->execute(['id' => $dados['pizza_id']]);
        $pizza = $stmt->fetch();
        if (!$pizza) {
            throw new InvalidArgumentException('A pizza escolhida não está disponível.');
        }
        $stmt = $pdo->prepare('INSERT INTO pedidos (cliente) VALUES (:cliente)');
        $stmt->execute(['cliente' => $dados['cliente']]);
        $pedidoId = (int) $pdo->lastInsertId();
        $stmt = $pdo->prepare('INSERT INTO itens_pedido (pedido_id, pizza_id, quantidade, preco_unitario) VALUES (:pedido, :pizza, :quantidade, :preco)');
        $stmt->execute([
            'pedido' => $pedidoId,
            'pizza' => $pizza['id'],
            'quantidade' => $dados['quantidade'],
            'preco' => $pizza['preco'],
        ]);
        $pdo->commit();
        return $pedidoId;
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        throw $e;
    }
}
