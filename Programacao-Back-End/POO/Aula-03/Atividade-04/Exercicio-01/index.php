<?php

class Dono{
    public $nome;
    public $telefone;

    public function __construct($novoNome, $novoTelefone){
        $this->nome = $novoNome;
        $this->telefone = $novoTelefone;
    }
}

class Animal{
    public $nome;
    public $especie;
    public Dono $dono;

    public function __construct($novoNome, $novaEspecie, Dono $novoDono){
        $this->nome = $novoNome;
        $this->especie = $novaEspecie;
        $this->dono = $novoDono;
    }
    
    public function exibir() {
        echo $this->nome . " | " . $this->especie . "<br>";
        echo "Dono: " . $this->dono->nome . " | Tel: " . $this->dono->telefone;
    }
}

$Denardi = new Dono("Denardi", "(15) 997167729");

$Cachorro = new Animal("Mili", "Cachorro", $Denardi);

$Cachorro->exibir();

?>