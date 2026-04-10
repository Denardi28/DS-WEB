<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path   = trim($path, '/');
$segments = explode('/', $path);


$endpoint = $segments[1] ?? ''; 

switch ($endpoint) {
    case 'categorias':
        require_once 'controllers/categorias.php';
        break;
    case 'produtos':
        require_once 'controllers/produtos.php';
        break;
    case 'pedidos':
        require_once 'controllers/pedidos.php';
        break;
    case 'pedido_itens': // Endpoint para os itens
        require_once 'controllers/itens-pedidos.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Endpoint nao encontrado.']);
}