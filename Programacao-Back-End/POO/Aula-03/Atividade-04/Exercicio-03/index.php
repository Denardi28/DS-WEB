<?php

class Fabricante{
    public $nome;
    public $paisOrigem;

    public function __construct($novoNome, $novoPais){
        $this->nome = $novoNome;
        $this->paisOrigem = $novoPais;
    }
}

class Motor{
    public $potencia;
    public $combustivel;

    public function __construct($novaPotencia, $novoCombustivel){
        $this->potencia = $novaPotencia;
        $this->combustivel = $novoCombustivel;
    }
}

class Carro{
    public $modelo;
    public $ano;
    public Fabricante $fabricante;
    public Motor $motor;

    public function __construct($novoModelo, $novoAno, Fabricante $novoFabricante, Motor $novoMotor){
        $this->modelo = $novoModelo;
        $this->ano = $novoAno;
        $this->fabricante = $novoFabricante;
        $this->motor = $novoMotor;
    }

    public function exibirFicha(){
        echo $this->modelo . " | " . $this->ano . "<br>";
        echo "Fabricante: " . $this->fabricante->nome . " | Origem: " . $this->fabricante->paisOrigem . "<br>";
        echo "Motor: " . $this->motor->potencia . " | Combustível: " . $this->motor->combustivel;
    }
}


$honda = new Fabricante("Honda", "Japão");
$motorCivic = new Motor("150cv", "Flex");

$civic = new Carro("Civic", 2024, $honda, $motorCivic);


$civic->exibirFicha();

?>