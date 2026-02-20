
//* ======================== EVENTOS DO MOUSE ==========================

var area = document.getElementById("area");
var mensagem = document.getElementById("mensagem")
var coordenadas = document.getElementById("posicao")


area.addEventListener("click", function () {
    mensagem.textContent = "Clique simples detectado!";
});

area.addEventListener("dblclick", function () {
    if (area.style.background == "lightgreen") {
        area.style.background = "white";
    } else {
        area.style.background = "lightgreen";
    }
});

area.addEventListener("mouseenter", function () {
    mensagem.textContent = "O mouse entrou na área!";
});

area.addEventListener("mouseleave", function () {
    mensagem.textContent = "O mouse saiu da área!";
});

area.addEventListener("mousemove", function (event) {
    coordenadas.textContent = "X:" + event.clientX + " Y:" + event.clientY;
});

area.addEventListener("contextmenu", function (event) {
    event.preventDefault(); //! Retira a ação padrão já configurada
    alert("Botão direito clicado!");
});


//* ======================== EVENTOS DO TECLADO ==========================

var campo = document.getElementById("resultado");

document.addEventListener("keydown", function (event) {
    console.log("Tecla pressionada: " + event.key);
    campo.textContent = "Tecla pressionada: " + event.key;
});

document.addEventListener("keyup", function (event) {
    console.log("Tecla liberada: " + event.key);
});

document.addEventListener("keypress", function (event) {
    console.log("Caractere digitado: " + event.key);
});

//* ======================== EVENTOS DO FORMULÁRIO ==========================

var form = document.getElementById("meuFormulario");

form.addEventListener("submit", function (event) {
    event.preventDefault(); //Impede o comportamento padrãodo navegador
    alert("Formulário enviado!");
});

var selectCurso = document.getElementById("curso");

selectCurso.addEventListener("change", function () {
    console.log("Curso selecionado: " + selectCurso.value);

});

var nome = document.getElementById("nome");

nome.addEventListener("input", function () {
    console.log("Digitando: " + nome.value);
});

nome.addEventListener("focus", function () {
    nome.style.background = "#e0f7ff";
});

nome.addEventListener("blur", function () {
    nome.style.background = "white";
});
//* ======================== EVENTOS DA JANELA ==========================

window.addEventListener("load", function () {
    console.log("Página totalmente carregada!");
});

window.addEventListener("scroll", function () {
    console.log("Scroll atual: " + window.scrollY);
});

window.addEventListener("resize", function () {
    console.log("Nova largura: " + window.innerWidth);
});