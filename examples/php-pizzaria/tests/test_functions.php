<?php
declare(strict_types=1);
require_once __DIR__ . '/../src/functions.php';

function igual(mixed $actual, mixed $expected, string $name): void {
    if ($actual !== $expected) throw new RuntimeException("Falha: {$name}");
}
igual(escapeHtml('<b>'), '&lt;b&gt;', 'escaping HTML');
igual(escapeHtml("Ana's"), 'Ana&#039;s', 'aspas HTML');
$valid = validarPedido('2', '3', 'Ana');
igual($valid['pizza_id'], 2, 'id');
igual($valid['quantidade'], 3, 'quantidade');
igual($valid['cliente'], 'Ana', 'nome');
$invalid = [
    ['0', '1', 'Ana'], ['1', '0', 'Ana'], ['1', '21', 'Ana'],
    ['1', '2', '   '], ['abc', '2', 'Ana'],
];
foreach ($invalid as $input) {
    try { validarPedido(...$input); } catch (InvalidArgumentException $e) { continue; }
    throw new RuntimeException('Entrada inválida foi aceita');
}
$_SESSION = [];
$token = csrfToken();
igual(strlen($token), 64, 'CSRF tamanho');
igual(csrfValido($token), true, 'CSRF válido');
igual(csrfValido($token . 'x'), false, 'CSRF inválido');
echo "OK — validação, escaping e token CSRF\n";
