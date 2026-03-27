<?php

require "arduino.php";

$arduino = new Lampada("COM5");

$arduino->desligarP();

?>