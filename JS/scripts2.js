// script de menu.html



// Função para exibir os dados da mesa e número de pessoas salvos no sessionStorage
function exibirDadosMesa() {
    // Recupera os valores do número da mesa e de pessoas do sessionStorage
    const numMesa = sessionStorage.getItem("numMesa");
    const numPessoas = sessionStorage.getItem("numPessoas");

    // Se ambos os valores estiverem disponíveis
    if (numMesa && numPessoas) {
        // Exibe as informações da mesa e do número de pessoas na página
        document.getElementById('infoMesa').innerText = `Mesa: ${numMesa}, Pessoas: ${numPessoas}`;
        
        // Chama a função para calcular o valor total com base no número de pessoas
        calcularValorTotal(numPessoas); 
    } else {
        // Se os dados não estiverem disponíveis, exibe uma mensagem de erro
        document.getElementById('infoMesa').innerText = "Informações da mesa não disponíveis.";
    }
}





// Função para calcular o valor total por pessoa
function calcularValorTotal(numPessoas) {
    const valorPorPessoa = 25.00; // Valor fixo por pessoa
    const total = valorPorPessoa * numPessoas; // Calcula o total multiplicando pelo número de pessoas
    
    // Exibe o valor total na página
    document.getElementById('valorTotal').innerText = "Valor total: R$ " + total.toFixed(2);
}

// Função para calcular o total de pratos selecionados
function calcularTotal() {
    let total = 0; // Inicializa o total em 0
    // Array com os pratos disponíveis e suas informações (checkbox, quantidade e preço)
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

    // Percorre cada prato e calcula o total dos selecionados
    pratos.forEach(prato => {
        if (prato.checkbox.checked) { // Verifica se o prato foi selecionado
            const quantidade = parseInt(prato.quantidade.value) || 0; // Obtém a quantidade ou usa 0 se estiver vazio
            total += quantidade * prato.preco; // Soma o preço total dos pratos selecionados
        }
    });

    // Exibe o valor total dos pratos e o valor por pessoa
    const numPessoas = parseInt(sessionStorage.getItem("numPessoas")) || 0;

    document.getElementById('valorTotal').innerText = "Valor total: R$ " + (total + (25 * sessionStorage.getItem("numPessoas"))).toFixed(2);
}

// Função para salvar o pedido no localStorage
function salvarPedido() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || []; // Recupera os pedidos anteriores ou inicializa com um array vazio
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

    let pedidoAtual = []; // Array para armazenar os itens do pedido atual

    // Percorre os pratos e verifica se foram selecionados
    pratos.forEach(prato => {
        if (prato.checkbox.checked) { // Se o prato estiver selecionado
            const quantidade = parseInt(prato.quantidade.value) || 0; // Obtém a quantidade
            if (quantidade > 0) { // Se a quantidade for maior que 0
                // Adiciona o prato ao pedido atual
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
    
        if (numMesa) { // Verifica se numMesa está definido
            const novoPedido = {
                itens: pedidoAtual,
                status: "Pendente",
                mesa: numMesa,
                numPessoas: numPessoas || "Desconhecido"
            };
    
            // Salva o pedido no Firebase
            set(ref(db, 'pedidos/' + userId + '/' + numMesa), novoPedido)
                .then(() => {
                    alert("Pedido salvo com sucesso!");
                })
                .catch((error) => {
                    console.error("Erro ao salvar o pedido: ", error);
                });
        } else {
            alert("Número da mesa não está definido.");
        }
    } else {
        alert("Nenhum prato selecionado.");
    }

// Função para carregar o status dos pedidos da mesa atual
function carregarStatusPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || []; // Recupera os pedidos do localStorage
    const statusPedidosDiv = document.getElementById('statusPedidos'); // Elemento onde os pedidos serão exibidos
    const numMesa = sessionStorage.getItem('numMesa');

    statusPedidosDiv.innerHTML = ''; // Limpa o conteúdo anterior

    if (pedidos.length === 0) { // Se não houver pedidos
        statusPedidosDiv.innerHTML = "<p>Nenhum pedido foi feito.</p>";
    } else {
        // Filtra os pedidos que pertencem à mesa atual
        const pedidosMesa = pedidos.filter(pedido => pedido.mesa === numMesa);

        if (pedidosMesa.length === 0) {
            statusPedidosDiv.innerHTML = "<p>Nenhum pedido feito para sua mesa.</p>";
        } else {
            // Exibe os pedidos filtrados
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




 

      

        if (pedidoAtual.length > 0) {
            const numMesa = sessionStorage.getItem('numMesa');
            const numPessoas = sessionStorage.getItem('numPessoas');

            const novoPedido = {
                itens: pedidoAtual,
                status: "Pendente",
                mesa: numMesa || "Desconhecida",
                numPessoas: numPessoas || "Desconhecido"
            };

            // Salva o pedido no Firebase
            set(ref(db, 'pedidos/' + userId + '/' + numMesa), novoPedido)
                .then(() => {
                    alert("Pedido salvo com sucesso!");
                })
                .catch((error) => {
                    console.error("Erro ao salvar o pedido: ", error);
                });
        } else {
            alert("Nenhum prato selecionado.");
        }
    }


// Função que verifica mudanças no status dos pedidos a cada 5 segundos

// Executa as funções assim que a página for carregada
document.addEventListener('DOMContentLoaded', function () {
    exibirDadosMesa();
    carregarStatusPedidos();
    verificarMudancasPedidos(); 
});
