const urlParams = new URLSearchParams(window.location.search);
const pedidoId = urlParams.get('id');

const selectProdutos = document.getElementById('selectProduto');
const inputQtd = document.getElementById('quantidade');
const tabelaCorpo = document.getElementById('corpoTabelaItens');
const spanTotal = document.getElementById('totalGeral');

document.addEventListener('DOMContentLoaded', () => {
    if (!pedidoId) {
        window.location.href = "pedidos.html";
        return;
    }
    carregarProdutos();
    carregarItensDoPedido();
});

async function carregarProdutos() {
    try {
        const req = await fetch("http://localhost/cafeteria-api/controllers/produtos.php");
        const res = await req.json();
        
        if (res.status === 'success') {
            selectProdutos.innerHTML = '<option value="">Selecione um produto...</option>';
            res.data.forEach(prod => {
                const option = document.createElement('option');
                option.value = prod.id;
                option.textContent = `${prod.nome} - R$ ${parseFloat(prod.preco).toFixed(2)}`;
                selectProdutos.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

async function adicionarItem() {
    const idProd = selectProdutos.value;
    const qtd = inputQtd.value;
    if (!idProd || qtd < 1) return;

    try {
        await fetch("http://localhost/cafeteria-api/controllers/itens-pedidos.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_pedido: pedidoId,
                id_produto: idProd,
                quantidade: qtd
            })
        });
        carregarItensDoPedido();
    } catch (error) {
        console.error(error);
    }
}

async function carregarItensDoPedido() {
    try {
        const req = await fetch(`http://localhost/cafeteria-api/controllers/itens-pedidos.php?id_pedido=${pedidoId}`);
        const res = await req.json();

        if (res.status === 'success') {
            let total = 0;
            tabelaCorpo.innerHTML = "";
            res.data.forEach(item => {
                const subtotal = item.quantidade * item.preco;
                total += subtotal;
                tabelaCorpo.innerHTML += `
                    <tr>
                        <td>${item.nome_produto}</td>
                        <td>${item.quantidade}</td>
                        <td>R$ ${parseFloat(item.preco).toFixed(2)}</td>
                        <td>R$ ${subtotal.toFixed(2)}</td>
                    </tr>`;
            });
            if(spanTotal) spanTotal.textContent = `R$ ${total.toFixed(2)}`;
        }
    } catch (error) {
        console.error(error);
    }
}