<?php
 abstract class Produto {
    public $nome;
    public $preco;
    public $estoque = 30;
    public function calcularDesconto(){}
    public function definirPreco($preco){
        $this->preco = $preco;
    }
    public function verDados(){
        echo " Nome: ";
        echo $this->nome . "<br/>";
        echo " Estoque: ";
        echo $this->estoque . "<br/>";
    }
}


class Eletronico extends Produto {
        public function calcularDesconto(){
        if ($this->estoque < 5) {
           echo "O novo Preço com desconto é: "; 
           echo $this->preco - ($this->preco * 0.2);
        } else{
           echo "O novo Preço com desconto é: "; 
           echo $this->preco - ($this->preco * 0.1); 
        }
    
    }
}


$preco = 5000;
$eletronico = new Eletronico();
$eletronico->nome = "Celular";
$eletronico->definirPreco($preco);
$eletronico->verDados();
$eletronico->calcularDesconto();


echo "<br>";

class Roupa extends Produto {
    public function calcularDesconto(){
        if ($this->estoque < 5) {
           echo "O novo Preço com desconto é: "; 
           echo $this->preco - ($this->preco * 0.3);
        } else{
           echo "O novo Preço com desconto é: "; 
           echo $this->preco - ($this->preco * 0.2); 
        }
    
    }
}

$preco = 200;
$roupa = new Roupa();
$roupa->nome = "Calça";
$roupa->definirPreco($preco);
$roupa->verDados();
$roupa->calcularDesconto();
?>