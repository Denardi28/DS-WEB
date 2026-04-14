var divResposta = document.getElementById("resposta")
var inputNome = document.getElementById("nome")

document.addEventListener('DOMContentLoaded', getCategorias)
document.getElementById('botaoEnviar').addEventListener('click', postCategoria)

async function getCategorias() {
    try {
        var requisicao = await fetch("http://localhost/meus-planos-api/categorias")
        var resposta = await requisicao.json()

        const linhas = resposta.data.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td><button onclick="deleteCategoria(${item.id})" class="btn-excluir">Deletar</button></td>
            </tr>
        `).join("");
        
        divResposta.innerHTML = `
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>${linhas}</tbody>
            </table>
        `;
    } catch (error) {
        console.error(error);
    }
}

async function postCategoria() {
    var nome = inputNome.value.trim()
    if (!nome) return;

    await fetch("http://localhost/meus-planos-api/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome })
    })
    inputNome.value = ""
    getCategorias()
}

async function deleteCategoria(id) {
    if (!id || !confirm("Excluir?")) return;
    
    await fetch("http://localhost/meus-planos-api/categorias/" + id, {
        method: "DELETE"
    })
    getCategorias()
}