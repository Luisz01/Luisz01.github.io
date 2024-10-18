function carregarTodosPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const todosPedidosDiv = document.getElementById('todosPedidos');

    todosPedidosDiv.innerHTML = ''; // Limpa o conteúdo anterior

    if (pedidos.length === 0) {
        todosPedidosDiv.innerHTML = "<p>Nenhum pedido foi feito.</p>";
    } else {
        pedidos.forEach((pedidoObj, index) => {
            let conteudoPedido = `<h3>Pedido ${index + 1} - Mesa ${pedidoObj.mesa} (${pedidoObj.numPessoas} pessoa(s))</h3>`;

            pedidoObj.itens.forEach(item => {
                conteudoPedido += `<p>${item.nome} - Quantidade: ${item.quantidade} - Preço total: R$ ${item.total.toFixed(2)}</p>`;
            });

            conteudoPedido += `<p><strong>Status:</strong> ${pedidoObj.status}</p>`;
            conteudoPedido += `<button onclick="marcarComoEntregue(${index})">Marcar como Entregue</button>`;
            todosPedidosDiv.innerHTML += `<div>${conteudoPedido}</div><hr>`;
        });
    }
}

function marcarComoEntregue(indicePedido) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

    if (pedidos[indicePedido]) {
        // Atualiza o status do pedido para "Entregue"
        pedidos[indicePedido].status = "Entregue";

        // Remove o pedido da lista após marcar como entregue
        pedidos.splice(indicePedido, 1);

        // Atualiza o localStorage
        localStorage.setItem('pedidos', JSON.stringify(pedidos));

        // Atualiza a exibição
        carregarTodosPedidos();
        alert("Pedido marcado como entregue e removido.");
    }
}

function verificarAtualizacoes() {
    setInterval(carregarTodosPedidos, 5000); // Atualiza a lista a cada 5 segundos
}

document.addEventListener('DOMContentLoaded', function () {
    carregarTodosPedidos();
    verificarAtualizacoes();
});