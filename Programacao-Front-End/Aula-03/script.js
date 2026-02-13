
//* Criando o contador de Itens
var contadorItem = 0

function adicionar(){
    //* Incrementando o contador de Itens
    contadorItem ++

    //* Crio o Item
    let novoItem = document.createElement("li");

    //* Adiciono texto ao meu Item
    novoItem.textContent = contadorItem + " - " + prompt("Digite a tarefa: ");

    //* Atribuo um ID
    novoItem.setAttribute("id", contadorItem);

    //* Cria o botão de remover
    let botaoRemover = document.createElement("button")

    //* Adiciona texto ao botão
    botaoRemover.textContent = "Remover"

    //* Adiciona uma função ao botão
    botaoRemover.setAttribute("onclick",`remover(${contadorItem})`)

    //* Adiciona o Botão ao novo item
    novoItem.appendChild(botaoRemover);
    document.getElementById("lista").appendChild(novoItem);
}


function remover(itemLista){
    var item = document.getElementById(itemLista);
    document.getElementById("lista").removeChild(item);
}

