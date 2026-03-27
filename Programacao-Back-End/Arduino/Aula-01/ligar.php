<?php

    require "arduino.php";

    $arduino = new Arduino("COM5");

    $arduino->ligar();

    echo "LED LIGADO";

?>