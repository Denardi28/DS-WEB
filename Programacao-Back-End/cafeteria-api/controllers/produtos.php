<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS"); // DELETE adicionado aqui
header('Content-Type: application/json');

require_once __DIR__ . '/../database.php'; 
$database = new Database();

$method = $_SERVER['REQUEST_METHOD'];

// Captura o ID vindo do parâmetro ?id= (enviado pelo seu JS)
$id = $_GET['id'] ?? null;

switch($method){
    case 'GET':
        try {
            $resultado = $database->executeQuery('SELECT * FROM produtos');
            echo json_encode([
                'status' => 'success',
                'data'   => $resultado->fetchAll(PDO::FETCH_ASSOC)
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
        // Validação do ID
        if (!$id || !is_numeric($id)) {
            echo json_encode(['status' => 'error', 'message' => 'ID inválido ou não informado']);
            break;
        }

        try {
            // 1. Remove os itens de pedidos que usam este produto para evitar erro de chave estrangeira
            $database->executeQuery('DELETE FROM pedido_itens WHERE produto_id = :id', [':id' => $id]);

            // 2. Remove o produto
            $stmt = $database->executeQuery('DELETE FROM produtos WHERE id = :id', [':id' => $id]);

            if ($stmt->rowCount() === 0) {
                echo json_encode(['status' => 'error', 'message' => 'Produto não encontrado']);
            } else {
                echo json_encode(['status' => 'success', 'message' => 'Produto removido com sucesso']);
            }
        } catch (Exception $e) {
            echo json_encode(['status' => 'error', 'message' => 'Erro ao deletar: ' . $e->getMessage()]);
        }
        break;
}