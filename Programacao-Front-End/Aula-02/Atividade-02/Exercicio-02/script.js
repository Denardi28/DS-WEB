function Mudaimagem(){
    document.getElementById("foto").setAttribute("src", "imagem1.jpg");
}
function Mudaimagem2(){
    document.getElementById("foto").setAttribute("src", "imagem2.jpg"); 
}

function Aparecer_cons(){
    var resultado = document.getElementById("foto").getAttribute("src");
    console.log(resultado);
    
}
