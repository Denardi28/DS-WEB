let divResposta;
let inputCliente;

document.addEventListener('DOMContentLoaded', () => {
    divResposta = document.getElementById("resposta");
    inputCliente = document.getElementById("cliente");
    const btn = document.getElementById('botaoEnviar');
    if (btn) btn.addEventListener('click', postPedido);
    getPedidos();
});

async function getPedidos() {
    try {
        const req = await fetch("http://localhost/cafeteria-api/pedidos");
        
        if (!req.ok) {
            const erroRaw = await req.text();
            console.error("Erro do PHP:", erroRaw);
            return;
        }

        const res = await req.json();
        if (res.status === 'success') {
            const linhas = res.data.map(item => `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.cliente}</td>
                    <td>R$ ${parseFloat(item.total || 0).toFixed(2)}</td>
                    <td>${item.criado_em}</td>
                    <td>
                        <button onclick="verPedido(${item.id})">Visualizar</button>
                        <button onclick="deletePedido(${item.id})">Deletar</button>
                    </td>
                </tr>
            `).join("");

            divResposta.innerHTML = `<table border="1">
                <thead><tr><th>ID</th><th>Cliente</th><th>Total</th><th>Data</th><th>Ações</th></tr></thead>
                <tbody>${linhas}</tbody></table>`;
        }
    } catch (e) {
        console.error("Falha Crítica:", e);
    }
}

async function postPedido() {
    const nome = inputCliente.value.trim();
    if (!nome) return;
    await fetch("http://localhost/cafeteria-api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente: nome })
    });
    inputCliente.value = "";
    getPedidos();
}

function verPedido(id) {
    window.location.href = `detalhes_pedido.html?id=${id}`;
}

async function deletePedido(id) {
    if (confirm("Excluir?")) {
        await fetch(`http://localhost/cafeteria-api/pedidos/${id}`, { method: "DELETE" });
        getPedidos();
    }
}