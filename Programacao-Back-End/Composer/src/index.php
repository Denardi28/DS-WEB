<?php
require __DIR__ . '/../vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// Criar um logger
$log = new Logger('meu-app');

// Configurar para salvar em arquivo
$log->pushHandler(new StreamHandler(__DIR__ . '/logs/app.log'));

// Registrar eventos
$log->info('Aplicação iniciada');
$log->warning('Isso é um aviso');
$log->error('Isso é um erro');

echo "Logs registrados! Verifique o arquivo logs/app.log\n";

?>

