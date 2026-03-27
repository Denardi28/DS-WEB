<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Botão|Arduino</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <h1>Botão|Arduino</h1>

<div class="botao">
    <div id="vermelho" class="luz"></div>
</div>

<div class="controles">
    <button onclick="executarComando(event, 'ligar.php', 'ligar')" style="background: #8cff21;">Ligar</button>
    <button onclick="executarComando(event, 'piscar.php', 'piscar')" style="background: #dffe14;">Piscar</button>
    <button onclick="executarComando(event, 'desligar.php', 'desligar')" style="background: #ff0000;">Desligar</button><br>
    <button onclick="executarComando(event, 'desligarP.php', 'desligar')" style="background: #ffbb00;">Desligar Piscar</button>
</div>
<?php

class Lampada {
    private $porta;

    public function __construct($porta){
        $this->porta = $porta;
    }

    private function enviarComando($comando){

        $cmd = "echo " . $comando . " > " . $this->porta;
        exec($cmd);
    }

    public function ligar(){
        $this->enviarComando("L");
    }

    public function desligar(){
    $this->enviarComando("D");
    }

    public function piscar(){
    $this->enviarComando("P");
    }

    public function desligarP(){
    $this->enviarComando("A");
    }
}
?>

</body>
    <script src="script.js"></script>
</html>
