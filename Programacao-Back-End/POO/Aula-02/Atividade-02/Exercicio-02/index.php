<?php
    abstract class Animal {
        public function fazerSom(){}
        public function mover(){
            return "Anda" ;
    }
    }

    class sapo extends Animal {
        public function fazerSom() {
        echo "O sapo faz o som: kré-kré!";
    }
    
    }

     class tartaruga extends Animal {
        public function fazerSom() {
        echo "A tartaruga faz o som: uuh";
    }
     }

     class cavalo extends Animal {
        public function fazerSom() {
        echo "O cavalo faz o som: iiirrrrí!";
    }
    public function mover(){
        echo "Ele Galopa e " . parent::mover();
    }
     }
    
    $sapo = new sapo();
    $sapo->fazerSom();

    echo "<br>";
    echo "<hr>";

    $cavalo = new cavalo();
    $cavalo->fazerSom();
    echo "<br>";
    $cavalo->mover();

    echo "<br>";
    echo "<hr>";

    $tartaruga = new tartaruga();
    $tartaruga->fazerSom();
?>