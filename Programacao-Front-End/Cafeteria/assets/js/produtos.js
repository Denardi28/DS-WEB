var divResposta = document.getElementById("resposta")

var inputNome = document.getElementById("nome")
var inputPreco = document.getElementById("preco")
var inputCategoria = document.getElementById("categoria_id")

document.addEventListener('DOMContentLoaded', () => {
    getProdutos()
    getCategorias()
})

document.getElementById('botaoEnviar').addEventListener('click', postProduto)

async function getProdutos() {
    
    var requisicao = await fetch("http://localhost/cafeteria-api/controllers/produtos.php")
    var resposta = await requisicao.json()

    console.log(resposta)

    const linhas = resposta.data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>R$ ${parseFloat(item.preco).toFixed(2)}</td>
            <td>${item.categoria_id}</td>
            <td>${item.disponivel == 1 ? 'Sim' : 'Não'}</td>
            <td><button onclick="deleteProduto(${item.id})" class="btn-excluir">Deletar</button></td>
        </tr>
    `).join("")
    
    divResposta.innerHTML = `
        <table class="sua-classe">
            <thead>
                <tr>
                    <th colspan="6"><center>Produtos Cadastrados</center></th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Categorias</th>
                    <th>Disponível</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                ${linhas}
            </tbody>
        </table>
    `
}

async function getCategorias() {
    
    var requisicao = await fetch("http://localhost/cafeteria-api/controllers/categorias.php")
    var resposta = await requisicao.json()

    const select = document.getElementById("categoria_id")
    if (select) {
        select.innerHTML = `<option value="">Selecione uma categoria</option>` + 
        resposta.data.map(cat => `
            <option value="${cat.id}">${cat.nome}</option>
        `).join("")
    }
}

async function postProduto() {
    if (!inputNome.value || !inputPreco.value || !inputCategoria.value) {
        alert("Preencha todos os campos!");
        return;
    }

    
    var requisicao = await fetch("http://localhost/cafeteria-api/controllers/produtos.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: inputNome.value,
            preco: inputPreco.value,
            categoria_id: inputCategoria.value
        })
    })

    var resposta = await requisicao.json()
    
    inputNome.value = ""
    inputPreco.value = ""
    inputCategoria.value = ""

    getProdutos()
}

async function deleteProduto(id) {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return;

    
    var requisicao = await fetch("http://localhost/cafeteria-api/controllers/produtos.php?id=" + id, {
        method: "DELETE"
    })

    var resposta = await requisicao.json()
    console.log(resposta)

    if (resposta.status === 'success') {
        alert("Produto removido!");
    } else {
        alert("Erro: " + resposta.message);
    }

    getProdutos()
}