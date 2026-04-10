var divResposta = document.getElementById("resposta")
var inputNome = document.getElementById("nome")

document.addEventListener('DOMContentLoaded', getCategorias)
document.getElementById('botaoEnviar').addEventListener('click', postCategoria)

async function getCategorias() {
    try {
        
        var requisicao = await fetch("http://localhost/cafeteria-api/controllers/categorias.php")
        var resposta = await requisicao.json()

        console.log(resposta)

        const linhas = resposta.data.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td><button onclick="deleteCategoria(${item.id})">Deletar</button></td>
            </tr>
        `).join("");
        
        divResposta.innerHTML = `
            <table class="sua-classe">
                <thead>
                    <tr>
                        <th colspan="3"><center>Categorias Cadastradas</center></th>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    ${linhas}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error("Erro ao carregar categorias:", error);
    }
}

async function postCategoria() {
    if (!inputNome.value.trim()) {
        alert("Digite o nome da categoria!");
        return;
    }

    try {
        
        var requisicao = await fetch("http://localhost/cafeteria-api/controllers/categorias.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: inputNome.value })
        })

        var resposta = await requisicao.json()
        console.log(resposta)
        
        inputNome.value = ""
        getCategorias()
    } catch (error) {
        console.error("Erro ao postar categoria:", error);
    }
}

async function deleteCategoria(id) {
    if (!confirm("Ao excluir esta categoria, todos os produtos vinculados a ela também serão apagados. Deseja continuar?")) {
        return;
    }

    try {
        
        var requisicao = await fetch("http://localhost/cafeteria-api/controllers/categorias.php?id=" + id, {
            method: "DELETE"
        })

        var resposta = await requisicao.json()
        console.log(resposta)

        if (resposta.status === 'success') {
            alert(resposta.message);
        } else {
            alert("Erro: " + resposta.message);
        }

        getCategorias()
    } catch (error) {
        console.error("Erro ao deletar categoria:", error);
    }
}