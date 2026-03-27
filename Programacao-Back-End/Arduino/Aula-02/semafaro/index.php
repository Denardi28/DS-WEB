<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semaforo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <h1>Semáforo</h1>

    <div id="semaforo"> 
        <div id="luz_vermelha"></div>
        <div id="luz_amarela"></div>
        <div id="luz_verde"></div>
    </div>


        <?php

        if(isset($_POST['modo'])){

        $modo = $_POST['modo'];

        shell_exec("echo $modo > COM4");

        echo "Modo enviado: ".$modo;
    }

?>
    <form method="post">
        <button name="modo" value="lenta">Velocidade Lenta</button>
        <button name="modo" value="media">Velocidade Média</button>
        <button name="modo" value="rapida">Velocidade Rápida</button>
    </form>
    

    <script src="script.js"></script>
</body>

</html>
