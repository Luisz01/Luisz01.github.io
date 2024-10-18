function exibirDadosMesa() {
    const numMesa = sessionStorage.getItem("numMesa");
    const numPessoas = sessionStorage.getItem("numPessoas");

    if (numMesa && numPessoas) {
        document.getElementById('infoMesa').innerText = `Mesa: ${numMesa}, Pessoas: ${numPessoas}`;
        calcularValorTotal(numPessoas); // Calcula e exibe o valor total
    } else {
        document.getElementById('infoMesa').innerText = "Informações da mesa não disponíveis.";
    }
}

function calcularValorTotal(numPessoas) {
    const valorPorPessoa = 25.00; // Valor por pessoa
    const total = valorPorPessoa * numPessoas;
    document.getElementById('valorTotal').innerText = "Valor total: R$ " + total.toFixed(2);
}

function calcularTotal() {
    let total = 0;
    const pratos = [
        { checkbox: document.getElementById('churrasco'), quantidade: document.getElementById('quantidadeChurrasco'), nome: 'Churrasco', preco: 20 },
        { checkbox: document.getElementById('mocoto'), quantidade: document.getElementById('quantidadeMocoto'), nome: 'Mocotó', preco: 20 },
        { checkbox: document.getElementById('cozidao'), quantidade: document.getElementById('quantidadeCozidao'), nome: 'Cozidão', preco: 20 },
        { checkbox: document.getElementById('assadoPanela'), quantidade: document.getElementById('quantidadeAssadoPanela'), nome: 'Assado de Panela', preco: 20 },
        { checkbox: document.getElementById('bifeAcebolado'), quantidade: document.getElementById('quantidadeBifeAcebolado'), nome: 'Bife Acebolado', preco: 20 },
        { checkbox: document.getElementById('feijoada'), quantidade: document.getElementById('quantidadeFeijoada'), nome: 'Feijoada', preco: 20 },
        { checkbox: document.getElementById('filePeixe'), quantidade: document.getElementById('quantidadeFilePeixe'), nome: 'Filé de Peixe Escabeche', preco: 20 },
        { checkbox: document.getElementById('figado'), quantidade: document.getElementById('quantidadeFigado'), nome: 'Fígado', preco: 20 }
    ];

    pratos.forEach(prato => {
        if (prato.checkbox.checked) {
            const quantidade = parseInt(prato.quantidade.value) || 0;
            total += quantidade * prato.preco;
        }
    });

    document.getElementById('valorTotal').innerText = "Valor total: R$ " + (total + (25 * sessionStorage.getItem("numPessoas"))).toFixed(2);
}

function salvarPedido() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pratos = [
        { checkbox: document.getElementById('churrasco'), quantidade: document.getElementById('quantidadeChurrasco'), nome: 'Churrasco', preco: 20 },
        { checkbox: document.getElementById('mocoto'), quantidade: document.getElementById('quantidadeMocoto'), nome: 'Mocotó', preco: 20 },
        { checkbox: document.getElementById('cozidao'), quantidade: document.getElementById('quantidadeCozidao'), nome: 'Cozidão', preco: 20 },
        { checkbox: document.getElementById('assadoPanela'), quantidade: document.getElementById('quantidadeAssadoPanela'), nome: 'Assado de Panela', preco: 20 },
        { checkbox: document.getElementById('bifeAcebolado'), quantidade: document.getElementById('quantidadeBifeAcebolado'), nome: 'Bife Acebolado', preco: 20 },
        { checkbox: document.getElementById('feijoada'), quantidade: document.getElementById('quantidadeFeijoada'), nome: 'Feijoada', preco: 20 },
        { checkbox: document.getElementById('filePeixe'), quantidade: document.getElementById('quantidadeFilePeixe'), nome: 'Filé de Peixe Escabeche', preco: 20 },
        { checkbox: document.getElementById('figado'), quantidade: document.getElementById('quantidadeFigado'), nome: 'Fígado', preco: 20 }
    ];

    let pedidoAtual = [];

    pratos.forEach(prato => {
        if (prato.checkbox.checked) {
            const quantidade = parseInt(prato.quantidade.value) || 0;
            if (quantidade > 0) {
                pedidoAtual.push({
                    nome: prato.nome,
                    quantidade: quantidade,
                    preco: prato.preco,
                    total: quantidade * prato.preco
                });
            }
        }
    });

    if (pedidoAtual.length > 0) {
        const numMesa = sessionStorage.getItem('numMesa');
        const numPessoas = sessionStorage.getItem('numPessoas');

        pedidos.push({
            itens: pedidoAtual,
            status: "Pendente",
            mesa: numMesa || "Desconhecida",
            numPessoas: numPessoas || "Desconhecido"
        });
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        alert("Pedido salvo com sucesso!");
    } else {
        alert("Nenhum prato selecionado.");
    }
}

function carregarStatusPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const statusPedidosDiv = document.getElementById('statusPedidos');
    const numMesa = sessionStorage.getItem('numMesa');

    statusPedidosDiv.innerHTML = ''; // Limpa o conteúdo anterior

    if (pedidos.length === 0) {
        statusPedidosDiv.innerHTML = "<p>Nenhum pedido foi feito.</p>";
    } else {
        const pedidosMesa = pedidos.filter(pedido => pedido.mesa === numMesa);

        if (pedidosMesa.length === 0) {
            statusPedidosDiv.innerHTML = "<p>Nenhum pedido feito para sua mesa.</p>";
        } else {
            pedidosMesa.forEach((pedidoObj, index) => {
                if (pedidoObj.status !== "Entregue") {
                    let conteudoPedido = `<h3>Pedido ${index + 1} - Mesa ${pedidoObj.mesa}</h3>`;

                    pedidoObj.itens.forEach(item => {
                        conteudoPedido += `<p>${item.nome} - Quantidade: ${item.quantidade} - Status: ${pedidoObj.status}</p>`;
                    });

                    statusPedidosDiv.innerHTML += `<div>${conteudoPedido}</div><hr>`;
                }
            });
        }
    }
}

function verificarMudancasPedidos() {
    setInterval(carregarStatusPedidos, 5000);
}

document.addEventListener('DOMContentLoaded', function () {
    exibirDadosMesa();
    carregarStatusPedidos();
    verificarMudancasPedidos();
});