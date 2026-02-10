function MudarConteudo(){
    document.getElementById("conteudo").style.backgroundColor = "greenyellow";
    document.getElementById("conteudo").innerHTML = "<p>Palmeiras não tem Mundial!</p>";   
}

var valor = document.getElementById("conteudo").innerHTML;
console.log(valor);
