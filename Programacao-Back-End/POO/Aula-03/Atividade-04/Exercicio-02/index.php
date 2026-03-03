<?php

class Artista{
    public $nome;
    public $genero;

    public function __construct($novoNome, $novoGenero){
        $this->nome = $novoNome;
        $this->genero = $novoGenero;
    }
}

class Musica{
    public $titulo;
    public $dura;
    public Artista $artista;

    public function __construct($novoTitulo, $novaDura, Artista $novoArtista){
        $this->titulo = $novoTitulo;
        $this->dura = $novaDura;
        $this->artista = $novoArtista;
    }
    
    public function exibirinfo() {
        echo $this->titulo . " | " . $this->dura . "<br>";
        echo "Artista: " . $this->artista->nome . " | Gênero: " . $this->artista->genero;
    }
}

$Henrique = new Artista("Henrique e Juliano", "Sertanejo");

$ele = new Musica("Ele quer ser Eu", "3.47", $Henrique);

$ele->exibirinfo();

?>