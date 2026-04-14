var divResposta = document.getElementById("resposta")
var inputNome = document.getElementById("nome")
var inputCategoria = document.getElementById("categoria_id")

document.addEventListener('DOMContentLoaded', () => {
    getItens()
    getCategorias()
})

document.getElementById('botaoEnviar').addEventListener('click', postItem)

async function getItens() {
    var requisicao = await fetch("http://localhost/meus-planos-api/itens")
    var resposta = await requisicao.json()

    const linhas = resposta.data.map(item => `
        <tr>
            <td>
                <input type="checkbox" ${item.feito == 1 ? 'checked' : ''} 
                onchange="toggleFeito(${item.id}, this.checked)">
            </td>
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.categoria_nome}</td>
            <td><button onclick="deleteProduto(${item.id})" class="btn-excluir">Deletar</button></td>
        </tr>
    `).join("")
    
    divResposta.innerHTML = `
        <table class="sua-classe">
            <thead>
                <tr><th colspan="5"><center>Itens Cadastrados</center></th></tr>
                <tr>   
                    <th>Status</th>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>${linhas}</tbody>
        </table>
    `
}

async function getCategorias() {
    var requisicao = await fetch("http://localhost/meus-planos-api/categorias")
    var resposta = await requisicao.json()

    const select = document.getElementById("categoria_id")
    if (select) {
        select.innerHTML = `<option value="">Selecione uma categoria</option>` + 
        resposta.data.map(cat => `
            <option value="${cat.id}">${cat.nome}</option>
        `).join("")
    }
}

async function toggleFeito(id, status) {
    await fetch("http://localhost/meus-planos-api/itens/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feito: status ? 1 : 0 })
    })
    getItens()
}

async function postItem() {
    if (!inputNome.value || !inputCategoria.value) {
        alert("Preencha todos os campos!");
        return;
    }

    await fetch("http://localhost/meus-planos-api/itens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: inputNome.value,
            categoria_id: inputCategoria.value
        })
    })

    inputNome.value = ""
    inputCategoria.value = ""
    getItens()
}

async function deleteProduto(id) {
    if (!confirm("Deletar este item?")) return;

    await fetch("http://localhost/meus-planos-api/itens/" + id, {
        method: "DELETE"
    })
    getItens()
}