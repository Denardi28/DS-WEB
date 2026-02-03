var cap = prompt("Qual a capital investida: ");

var mes = prompt("Quanto meses serão investidos: ");

var juros = prompt("Qual a taxa de juros: ");

var resultado = (cap * (1+(juros/100)) ** mes);

alert("O resultado é: " + resultado.toFixed(2));
console.log(resultado.toFixed(2));

