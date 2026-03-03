<?php
class Pessoa {
    public $nome = "Guilherme";
    protected $idade = 48;
    public function verDados(){
        echo " Nome: ";
        echo $this->nome . "<br/>";
        echo " Idade: ";
        echo $this->idade . "<br/>";
    }
}

class Funcionario extends Pessoa {
    public $salario;

    public function definirSalario($salario){
        $this->salario = $salario;
    }
}

class Gerente extends Funcionario {
    public function calcularBonus(){
        echo "O novo salário é: ";
        echo $this->salario + ($this->salario * 0.2);
    }
}

$salario = 5000;

$Denardi = new Gerente();
$Denardi->definirSalario($salario);
$Denardi->verDados();
$Denardi->calcularBonus();


echo "<br>";

class Desenvolvedor extends Funcionario {
    public function calcularBonus(){
        echo "O novo salário é: ";
        echo $this->salario + ($this->salario * 0.1);
    }
}

$salario = 2000;
$Daniel = new Desenvolvedor();
$Daniel->definirSalario($salario);
$Daniel->verDados();
$Daniel->calcularBonus();
?>
