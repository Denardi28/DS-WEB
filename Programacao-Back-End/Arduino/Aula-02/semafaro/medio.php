<?php

    require "arduino.php";

    $arduino = new Arduino("COM4");

    $arduino->medio();

    echo "MODO MÉDIO";

?>