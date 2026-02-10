<?php

    class vaso_sanitario {
        public $modelo; //! Atributo
        public $tamanho; //! Atributo
        public $cor; //! Atributo
        public $marca; //! Atributo
        public $material; //! Atributo

        public function fechar_a_tampa() { //* Método

            return "Fechar a tampa do vaso de cor ".$this->cor;

        }
        
        public function dar_descarga() { //* Método

            return "<br> Dar Descarga no vaso de modelo ".$this->modelo;

        }

        public function limpar() { //* Método

            return "<br> Limpar o vaso da marca ".$this->marca;

        }
    }


     class notebook {
        public $modelo; //! Atributo
        public $tamanho; //! Atributo
        public $cor; //! Atributo
        public $marca; //! Atributo
        public $armazenamento; //! Atributo

        public function jogar() { //* Método

            return "<br> Jogar Jogos no notebook de tamanho ".$this->tamanho;

        }

        public function ligar() { //* Método

            return "<br> Ligar o notebook com o armazenamento ".$this->armazenamento;

        }

        public function digitar() { //* Método

            return "<br> Digitar no notebook de cor ".$this->cor;

        }
    }

    class aparelho_dental {
        public $modelo; //! Atributo
        public $tamanho; //! Atributo
        public $cor; //! Atributo
        public $marca; //! Atributo
        public $tipo; //! Atributo

        public function guardar() { //* Método

            return "<br> Guardar o aparelho da marca na Caixa ".$this->marca;

        }

        public function lavar() { //* Método

            return "<br> Lavar o aparelho do tipo ".$this->tipo;

        }

        public function usar() { //* Método

            return "<br> usar o aparelho de modelo ".$this->modelo;

        }
    }

     class camiseta{
        public $modelo; //! Atributo
        public $tamanho; //! Atributo
        public $cor; //! Atributo
        public $marca; //! Atributo
        public $material; //! Atributo

        public function vestir() { //* Método

            return "<br> Vestir a camiseta de cor ".$this->cor;

        }

        public function lavar() { //* Método

            return "<br> Lavar a camiseta do material ".$this->material;

        }

        public function usar() { //* Método

            return "<br> Rasgar a camiseta do tamanho ".$this->tamanho;

        }
    }

     class peruca {
        public $tipo; //! Atributo
        public $tamanho; //! Atributo
        public $cor; //! Atributo
        public $marca; //! Atributo
        public $material; //! Atributo

        public function colar() { //* Método

            return "<br> Colar a Peruca do tipo ".$this->tipo;

        }

        public function usar() { //* Método

            return "<br> Usar a Peruca de tamanho ".$this->tamanho;

        }

        public function lavar() { //* Método

            return "<br> Lavar a Peruca de marca ".$this->marca;

        }
    }

    //! ========================== VASO SANITÁRIO ==============================

    $branco = new vaso_sanitario(); //Inicio do Objeto
    $branco -> cor = "branco"; //* Atribuindo valor a um atributo
    echo $branco -> fechar_a_tampa(); //Todo Exibindo um atributo 

    $e32s = new vaso_sanitario(); //Inicio do Objeto
    $e32s -> modelo = "E32S"; //* Atribuindo valor a um atributo
    echo $e32s -> dar_descarga(); //Todo Exibindo um atributo 

    $deca = new vaso_sanitario(); //Inicio do Objeto
    $deca -> marca = "Deca"; //* Atribuindo valor a um atributo
    echo $deca -> limpar(); //Todo Exibindo um atributo 

    //! ========================== NOTEBOOK ==============================

    $pol24 = new notebook(); //Inicio do Objeto
    $pol24 -> tamanho = "24 polegadas"; //* Atribuindo valor a um atributo
    echo $pol24 -> jogar(); //Todo Exibindo um atributo 

    $tb1 = new notebook(); //Inicio do Objeto
    $tb1 -> armazenamento = "1 TB"; //* Atribuindo valor a um atributo
    echo $tb1 -> ligar(); //Todo Exibindo um atributo 

    $preto = new notebook(); //Inicio do Objeto
    $preto -> cor = "preto"; //* Atribuindo valor a um atributo
    echo $preto -> digitar(); //Todo Exibindo um atributo 

    //! ========================== APARELHO DENTAL ==============================

    $smile = new aparelho_dental(); //Inicio do Objeto
    $smile -> marca = "SouSmile"; //* Atribuindo valor a um atributo
    echo $smile -> guardar(); //Todo Exibindo um atributo 

    $fixo = new aparelho_dental(); //Inicio do Objeto
    $fixo -> tipo = "Fixo"; //* Atribuindo valor a um atributo
    echo $fixo -> lavar(); //Todo Exibindo um atributo 

    $ss90 = new aparelho_dental(); //Inicio do Objeto
    $ss90 -> modelo = "SS90"; //* Atribuindo valor a um atributo
    echo $ss90 -> usar(); //Todo Exibindo um atributo 

    //! ========================== CAMISETA ==============================

    $marrom = new camiseta(); //Inicio do Objeto
    $marrom -> cor = "Marrom"; //* Atribuindo valor a um atributo
    echo $marrom -> vestir(); //Todo Exibindo um atributo 

    $algodao = new camiseta(); //Inicio do Objeto
    $algodao -> material = "Algodão"; //* Atribuindo valor a um atributo
    echo $algodao -> lavar(); //Todo Exibindo um atributo 

    $g = new camiseta(); //Inicio do Objeto
    $g -> tamanho = "G"; //* Atribuindo valor a um atributo
    echo $g -> usar(); //Todo Exibindo um atributo 

     //! ========================== PERUCA ==============================

    $liso = new peruca(); //Inicio do Objeto
    $liso -> tipo = "Liso"; //* Atribuindo valor a um atributo
    echo $liso -> colar(); //Todo Exibindo um atributo 

    $grande = new peruca(); //Inicio do Objeto
    $grande -> tamanho = "grande"; //* Atribuindo valor a um atributo
    echo $grande -> usar(); //Todo Exibindo um atributo 
    
    $Fiszpan = new peruca(); //Inicio do Objeto
    $Fiszpan -> marca = "Fiszpan"; //* Atribuindo valor a um atributo
    echo $Fiszpan -> lavar(); //Todo Exibindo um atributo 

?>