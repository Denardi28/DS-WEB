//TODO: ============================== SOMA DE NÚMEROS ====================================

function SomarNumeros(num1, num2){
    return num1 + num2;
}

let resultado = SomarNumeros(5,10);
console.log(resultado);

// ========================== TRABALHANDO COM DATA E HORA ==================================

let DataAtual = new Date();
console.log(DataAtual.toISOString());

let ano = DataAtual.getFullYear();
let mes = DataAtual.getMonth() + 1;
let dia = DataAtual.getDate();
let hora = DataAtual.getHours();
let minuto = DataAtual.getMinutes();
let segundo = DataAtual.getSeconds();

console.log(`${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`);


//! ================================= OUTRO EXEMPLO ========================================

let hoje = new Date();
let DiasParaAdicionar = 7;

//* Cria uma nova data a partir da data atual

let NovaData = new Date(hoje);
NovaData.setDate(NovaData.getDate() + DiasParaAdicionar);

console.log(NovaData.toLocaleDateString);

//TODO: ============================== DIFERENÇA DE DIAS ====================================

let data1 = new Date('2025-03-19');
let data2 = new Date('2025-03-25');

//Diferença em milisegundos

let DiferencasMs = data1 - data2;

//! =================================== MODIFICANDO O DOM =====================================

document.getElementById("conteudo").innerHTML = "<p>Olá, Mundo!</p>";   
var valor = document.getElementById("conteudo").innerHTML;
console.log(valor);


//* =================================== CARREGAR UMA IMAGEM ===================================

document.getElementById("foto").setAttribute("src", "Vader.webp");

console.log(document.getElementById("foto").getAttribute("src"));

//TODO: =============================== USANDO O STYLE =======================================

document.getElementById("conteudo").style.backgroundColor = "lightblue";
document.getElementById("foto").style.width = "300px";

//====================================== CRIANDO UMA FUNÇÃO PARA UM BOTÃO =====================

function MudaTamanho(){
    document.getElementById("foto").style.width = "1000px";
}



