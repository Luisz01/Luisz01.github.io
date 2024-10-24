//index.html
function salvarDados() {
    // Obtém o valor do campo de input com id "num" (número da mesa) e armazena na variável 'numMesa'
    const numMesa = document.getElementById("num").value;

    // Obtém o valor do campo de input com id "numeroPess" (número de pessoas) e armazena na variável 'numPessoas'
    const numPessoas = document.getElementById("numeroPess").value;

    // Verifica se os campos 'numMesa' e 'numPessoas' estão vazios
    if (!numMesa || !numPessoas) {
        // Se algum campo estiver vazio, exibe um alerta para o usuário
        alert("Por favor, preencha todos os campos.");
        return false; // Interrompe a execução da função e impede o envio do formulário
    }

    // Armazena o número da mesa no 'sessionStorage' (dados são mantidos apenas enquanto a sessão do navegador estiver ativa)
    sessionStorage.setItem("numMesa", numMesa);

    // Armazena o número de pessoas no 'sessionStorage'
    sessionStorage.setItem("numPessoas", numPessoas);

    // Redireciona o usuário para a página "menu.html" após salvar os dados
    window.location.href = "menu.html";

    // Retorna 'false' para evitar o comportamento padrão do envio do formulário (caso esteja dentro de um form)
    return false;
}
