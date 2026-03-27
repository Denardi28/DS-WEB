let intervaloPiscar = null;
const led = document.getElementById('vermelho'); 

function limparEstado() {
    if (intervaloPiscar) {
        clearInterval(intervaloPiscar);
        intervaloPiscar = null;
    }
    led.classList.remove('ativo');
    led.style.background = "#333"; 
    led.style.boxShadow = "none";
}

function executarComando(event, url, acao) {
    if(event) event.preventDefault();

    fetch(url);

    limparEstado();

    if (acao === 'ligar') {
        led.classList.add('ativo');
        led.style.background = "#8cff21"; 
        led.style.boxShadow = "0 0 25px #8cff21";
    } 
    else if (acao === 'piscar') {
        intervaloPiscar = setInterval(() => {
            if (led.style.background === "rgb(140, 255, 33)") { 
                led.style.background = "#333";
                led.style.boxShadow = "none";
            } else {
                led.style.background = "#8cff21";
                led.style.boxShadow = "0 0 25px #8cff21";
            }
        }, 500);
    }
}