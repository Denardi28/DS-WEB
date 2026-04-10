<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header('Content-Type: application/json');

require_once __DIR__ . '/../database.php';
$database = new Database();

$method = $_SERVER['REQUEST_METHOD'];

// GET: Lista os itens de um pedido específico
if ($method === 'GET') {
    try {
        $pedido_id = $_GET['id_pedido'] ?? null;
        $sql = "SELECT i.*, p.nome AS nome_produto 
                FROM pedido_itens i 
                JOIN produtos p ON i.produto_id = p.id 
                WHERE i.pedido_id = :id";
        $res = $database->executeQuery($sql, [':id' => $pedido_id]);
        echo json_encode(['status' => 'success', 'data' => $res->fetchAll(PDO::FETCH_ASSOC)]);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

// POST: Adiciona um novo item ao pedido
if ($method === 'POST') {
    try {
        $body = json_decode(file_get_contents('php://input'), true);
        
        $prod = $database->executeQuery("SELECT preco FROM produtos WHERE id = :id", [
            ':id' => $body['id_produto']
        ])->fetch(PDO::FETCH_ASSOC);

        $sql = "INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco) 
                VALUES (:ped, :prod, :qtd, :pre)";
        
        $database->executeQuery($sql, [
            ':ped'  => $body['id_pedido'],
            ':prod' => $body['id_produto'],
            ':qtd'  => $body['quantidade'],
            ':pre'  => $prod['preco']
        ]);

        echo json_encode(['status' => 'success']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

// DELETE: Remove um item específico pelo ID do item
if ($method === 'DELETE') {
    try {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            echo json_encode(['status' => 'error', 'message' => 'ID não informado']);
            exit;
        }

        $database->executeQuery("DELETE FROM pedido_itens WHERE id = :id", [':id' => $id]);
        echo json_encode(['status' => 'success', 'message' => 'Item removido']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}