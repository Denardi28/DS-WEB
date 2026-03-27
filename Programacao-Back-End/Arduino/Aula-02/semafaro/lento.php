<?php

    require "arduino.php";

    $arduino = new Arduino("COM4");

    $arduino->lento();

    echo "MODO LENTO";

?>