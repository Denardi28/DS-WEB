<?php
    class Veiculo {
        public $marca;
        public $modelo;
        private $velocidade = "90km";
        public function acelerar(){}
        public function getVelo(){
            echo $this->velocidade;
        }
    }

    class moto extends Veiculo {
        public function acelerar(){
            echo "A moto acelera com a mão e a velocidade é:";
        }
    }

    class carro extends Veiculo {
        public function acelerar(){
            echo "O carro acelera com o pé e a velocidade é: ";
    }
    }


    $moto = new moto();
    $moto->acelerar();
    echo "<br>";
    $moto->getVelo();

    echo "<br>";
    echo "<hr>";

    $carro = new carro();
    $carro->acelerar();
    echo "<br>";
    $carro->getVelo();
?>