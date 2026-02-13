//* Criando o contador de Itens
var contadorItem = 0

function cadastrar(){
    //* Incrementando o contador de Itens
    contadorItem ++

    //* Crio o Item
    let novoItem = document.createElement("li");
    let nome = document.getElementById("nome").value
    let email = document.getElementById("email").value
    let RM = document.getElementById("RM").value
    let telefone = document.getElementById("telefone").value
    let turma = document.getElementById("turma").value

    //* Adiciono texto ao meu Item
    novoItem.innerHTML = 
    contadorItem + " - <br>" +
    "Nome: " + nome + "<br>" +
    "Email: " + email + "<br>" +
    "RM: " + RM + "<br>" +
    "Telefone: " + telefone + "<br>" +
    "Turma: " + turma + "<br>";


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