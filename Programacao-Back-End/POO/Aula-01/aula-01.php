<?php

    class Pessoa {
        public $nome; //! Atributo

        public function falar() { //* Método

            return "O meu nome é".$this -> nome;

        }
    }   

$Denardi = new Pessoa ();
$Denardi->nome = "Guilherme Denardi";
echo $Denardi->falar();
?>

