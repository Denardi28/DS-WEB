// Pegando as luzes do seu CSS
const luzVermelha = document.getElementById('luz_vermelha');
const luzAmarela = document.getElementById('luz_amarela');
const luzVerde = document.getElementById('luz_verde');

// Função para apagar todas as luzes (deixar cinza/escuro)
function apagarLuzes() {
    luzVermelha.style.backgroundColor = '#c4050594';
    luzAmarela.style.backgroundColor = '#4e4e00'; 
    luzVerde.style.backgroundColor = '#005500';   
}

// Variável para guardar o "timer" do semáforo, para podermos cancelar se o usuário trocar de modo
let timerSemaforo;

// Função principal que envia o comando e liga o semáforo na tela
function ativarModo(arquivoPhp, tempoDeEspera) {
    // sem recarregar a tela
    fetch(arquivoPhp)
        .then(resposta => console.log('Comando enviado para o Arduino:', arquivoPhp))
        .catch(erro => console.log('Erro de conexão:', erro));

    clearInterval(timerSemaforo);

    let estado = 0; // 0=Verde, 1=Amarelo, 2=Vermelho

    timerSemaforo = setInterval(() => {
        apagarLuzes();

        if (estado === 0) {
            luzVerde.style.backgroundColor = 'lime';
            estado = 1; 
        } 
        else if (estado === 1) {
            luzAmarela.style.backgroundColor = 'yellow'; 
            estado = 2; 
        } 
        else if (estado === 2) {
            luzVermelha.style.backgroundColor = 'red';
            estado = 0; 
        }
    }, tempoDeEspera);
}

// 4. Conectando os botões na função
document.getElementById('btnLento').addEventListener('click', () => {
    ativarModo('lento.php', 20000);
});

document.getElementById('btnMedio').addEventListener('click', () => {
    ativarModo('medio.php', 15000);
});

document.getElementById('btnRapido').addEventListener('click', () => {
    ativarModo('rapido.php', 10000); 
});

// Apaga as luzes assim que a página carrega
apagarLuzes();