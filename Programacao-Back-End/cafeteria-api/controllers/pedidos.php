<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header('Content-Type: application/json');
require_once __DIR__ . '/../database.php';
$database = new Database();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        try {
            $sql = "SELECT p.id, p.cliente, p.criado_em,
                    (SELECT COALESCE(SUM(i.quantidade * i.preco), 0) 
                     FROM pedido_itens i WHERE i.pedido_id = p.id) AS total 
                    FROM pedidos p";
            $resultado = $database->executeQuery($sql);
            echo json_encode(['status' => 'success', 'data' => $resultado->fetchAll()]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        $cliente = trim($body['cliente'] ?? '');
        $database->executeQuery("INSERT INTO pedidos (cliente, criado_em) VALUES (:c, NOW())", [':c' => $cliente]);
        echo json_encode(['status' => 'success']);
        break;

    case 'DELETE':
        $path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
        $id = end($path);
        if(is_numeric($id)) {
            $database->executeQuery("DELETE FROM pedidos WHERE id = :id", [':id' => $id]);
        }
        echo json_encode(['status' => 'success']);
        break;
}