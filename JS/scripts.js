
        function salvarDados() {
            const numMesa = document.getElementById("num").value;
            const numPessoas = document.getElementById("numeroPess").value;

            if (!numMesa || !numPessoas) {
                alert("Por favor, preencha todos os campos.");
                return false;
            }

            sessionStorage.setItem("numMesa", numMesa);
            sessionStorage.setItem("numPessoas", numPessoas);

            // Redirecionar para a página do menu
            window.location.href = "menu.html";
            return false; // Evita o envio do formulário padrão
        }
 