<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json'); // Informa que o retorno é JSON

// Caminho corrigido para subir um nível e achar o database.php
require_once __DIR__ . '/../database.php'; 

$database = new Database();
$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case 'GET':
        try {
            $resultado = $database->executeQuery('SELECT * FROM produtos');
            $produtos = $resultado->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                'status' => 'success',
                'data'   => $produtos
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        $nome = trim($body['nome'] ?? '');
        $preco = trim($body['preco'] ?? '');
        $categoria_id = trim($body['categoria_id'] ?? '');
        $disponivel = 1;

        if(!$nome || !$preco || !$categoria_id){
            echo json_encode(['status' => 'error', 'message' => 'Campos obrigatórios faltando']);
            break;
        }

        $database->executeQuery(
            "INSERT INTO produtos (nome, preco, categoria_id, disponivel) VALUES (:nome, :preco, :categoria_id, :disponivel)",
            [ ':nome' => $nome, ':preco' => $preco, ':categoria_id' => $categoria_id, ':disponivel' => $disponivel ]
        );

        http_response_code(201);
        echo json_encode([
            'status' => 'success',
            'idProduto' => $database->lastInsertId()
        ]);
        break;

    case 'DELETE':
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $segments = explode('/', trim($path, '/'));
        $id = end($segments);

        if (!is_numeric($id)) {
            echo json_encode(['status' => 'error', 'message' => 'ID inválido']);
            break;
        }

        $database->executeQuery('DELETE FROM produtos WHERE id = :id', [':id' => $id]);
        echo json_encode(['status' => 'success', 'message' => 'Removido']);
        break;
}