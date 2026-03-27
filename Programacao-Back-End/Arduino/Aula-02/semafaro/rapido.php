<?php

    require "arduino.php";

    $arduino = new Arduino("COM4");

    $arduino->rapido();

    echo "MODO RÁPIDO";

?>