    <?php

if(isset($_POST['modo'])){

    $modo = $_POST['modo'];

    shell_exec("echo $modo > COM4");

    echo "Modo enviado: ".$modo;
    }

?>

