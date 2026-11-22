<?php
declare(strict_types=1);

function escapeHtml(string $text): string
{
    return htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function validarPedido(mixed $pizzaId, mixed $quantidade, mixed $cliente): array
{
    $pizza = filter_var($pizzaId, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    $qtd = filter_var($quantidade, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 20]]);
    $nome = is_string($cliente) ? trim($cliente) : '';
    if ($pizza === false || $qtd === false || $nome === '' || strlen($nome) > 100) {
        throw new InvalidArgumentException('Informe pizza, quantidade (1–20) e nome válido.');
    }
    return ['pizza_id' => $pizza, 'quantidade' => $qtd, 'cliente' => $nome];
}

function csrfToken(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function csrfValido(string $recebido): bool
{
    return is_string($_SESSION['csrf'] ?? null) && hash_equals($_SESSION['csrf'], $recebido);
}
