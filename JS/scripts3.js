//visual_pedidos.html

// Função para carregar e exibir todos os pedidos no localStorage
function carregarTodosPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || []; // Recupera os pedidos do localStorage, ou inicializa como array vazio
    const todosPedidosDiv = document.getElementById('todosPedidos'); // Elemento onde os pedidos serão exibidos

    todosPedidosDiv.innerHTML = ''; // Limpa o conteúdo anterior

    // Se não houver pedidos, exibe uma mensagem indicando isso
    if (pedidos.length === 0) {
        todosPedidosDiv.innerHTML = "<p>Nenhum pedido foi feito.</p>";
    } else {
        // Para cada pedido, cria um conteúdo HTML exibindo as informações do pedido
        pedidos.forEach((pedidoObj, index) => {
            // Exibe as informações da mesa, número de pessoas e os itens do pedido
            let conteudoPedido = `<h3>Pedido ${index + 1} - Mesa ${pedidoObj.mesa} (${pedidoObj.numPessoas} pessoa(s))</h3>`;

            // Para cada item no pedido, exibe o nome do prato, quantidade e o preço total
            pedidoObj.itens.forEach(item => {
                conteudoPedido += `<p>${item.nome} - Quantidade: ${item.quantidade} - Preço total: R$ ${item.total.toFixed(2)}</p>`;
            });

            // Exibe o status do pedido e adiciona um botão para marcar como entregue
            conteudoPedido += `<p><strong>Status:</strong> ${pedidoObj.status}</p>`;
            conteudoPedido += `<button onclick="marcarComoEntregue(${index})">Marcar como Entregue</button>`;

            // Adiciona o conteúdo do pedido ao elemento HTML
            todosPedidosDiv.innerHTML += `<div>${conteudoPedido}</div><hr>`;
        });
    }
}

// Função para marcar um pedido como entregue
function marcarComoEntregue(indicePedido) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || []; // Recupera os pedidos do localStorage

    // Verifica se o pedido com o índice especificado existe
    if (pedidos[indicePedido]) {
        // Atualiza o status do pedido para "Entregue"
        pedidos[indicePedido].status = "Entregue";

        // Remove o pedido da lista após marcá-lo como entregue
        pedidos.splice(indicePedido, 1);

        // Atualiza o localStorage com os pedidos atualizados
        localStorage.setItem('pedidos', JSON.stringify(pedidos));

        // Recarrega a lista de pedidos para refletir a mudança
        carregarTodosPedidos();
        alert("Pedido marcado como entregue e removido.");
    }
}

// Função que verifica atualizações nos pedidos a cada 5 segundos
function verificarAtualizacoes() {
    setInterval(carregarTodosPedidos, 5000); // Recarrega a lista de pedidos a cada 5 segundos
}

// Função que é executada quando a página termina de carregar
document.addEventListener('DOMContentLoaded', function () {
    carregarTodosPedidos(); // Carrega todos os pedidos ao iniciar a página
    verificarAtualizacoes(); // Inicia o intervalo para verificar atualizações
});
