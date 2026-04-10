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
        $resultado = $database->executeQuery('SELECT * FROM categorias');
        echo json_encode([
            'status' => 'success',
            'data'   => $resultado->fetchAll(PDO::FETCH_ASSOC)
        ]);
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        $nome = trim($body['nome'] ?? '');
        if(!$nome){
            echo json_encode(['status' => 'error', 'message' => 'Nome não informado']);
            break;
        }
        $database->executeQuery("INSERT INTO categorias (nome) VALUES (:nome)", [':nome' => $nome]);
        echo json_encode(['status' => 'success', 'message' => 'Categoria cadastrada']);
        break;

    case 'DELETE':
        if (!$id) {
            echo json_encode(['status' => 'error', 'message' => 'ID não informado']);
            break;
        }

        try {
            // 1. Remove os produtos desta categoria primeiro
            $database->executeQuery("DELETE FROM produtos WHERE categoria_id = :id", [':id' => $id]);
            
            // 2. Agora remove a categoria
            $database->executeQuery('DELETE FROM categorias WHERE id = :id', [':id' => $id]);

            echo json_encode(['status' => 'success', 'message' => 'Categoria e seus produtos removidos']);
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;
}