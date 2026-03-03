<?php
class Documento {
    private $numero;

    public function getNumero(){
        return $this->numero;
    }

    public function setNumero($novoNumero){
        $this->numero = $novoNumero;
    }
}

class CPF extends Documento {

    public function validaCPF($numero){

        // Remove caracteres que não são números
        $numero = preg_replace('/[^0-9]/', '', $numero);

        // Verifica se tem 11 dígitos
        if (strlen($numero) != 11) {
            return false;
        }

        // Verifica sequência repetida
        if (preg_match('/(\d)\1{10}/', $numero)) {
            return false;
        }

        // Validação dos dígitos
        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $numero[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($numero[$t] != $d) {
                return false;
            }
        }

        return true;
    }
}

$Denardi = new CPF();
$cpfTeste = "000.000.000-00";
if($Denardi->validaCPF($cpfTeste)){
    echo "CPF Válido";
    echo "<br>";
    echo $cpfTeste;
} else {
    echo "CPF Inválido";
    echo "<br>";
    echo $cpfTeste;
}


