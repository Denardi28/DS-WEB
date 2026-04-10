<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header('Content-Type: application/json');

require_once __DIR__ . '/../database.php';
$database = new Database();

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

switch($method){
    case 'GET':
        $sql = "SELECT p.*, (SELECT COALESCE(SUM(quantidade * preco), 0) FROM pedido_itens WHERE pedido_id = p.id) as total FROM pedidos p ORDER BY p.id DESC";
        $resultado = $database->executeQuery($sql);
        echo json_encode(['status' => 'success', 'data' => $resultado->fetchAll(PDO::FETCH_ASSOC)]);
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        $cliente = trim($body['cliente'] ?? '');
        if(!$cliente){
            echo json_encode(['status' => 'error', 'message' => 'Cliente não informado']);
            break;
        }
        $database->executeQuery("INSERT INTO pedidos (cliente) VALUES (:cliente)", [':cliente' => $cliente]);
        echo json_encode(['status' => 'success', 'id' => $database->lastInsertId()]);
        break;

    case 'DELETE':
        if (!$id) {
            echo json_encode(['status' => 'error', 'message' => 'ID não informado']);
            break;
        }

        try {
            // 1. Remove os itens vinculados ao pedido primeiro
            $database->executeQuery("DELETE FROM pedido_itens WHERE pedido_id = :id", [':id' => $id]);
            
            // 2. Agora remove o pedido
            $database->executeQuery('DELETE FROM pedidos WHERE id = :id', [':id' => $id]);

            echo json_encode(['status' => 'success', 'message' => 'Pedido e itens removidos']);
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;
}