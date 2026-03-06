document.getElementById("formulario").addEventListener("submit", function (event) {

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let confirma_senha = document.getElementById("confirma_senha").value;
    let cpf = document.getElementById("cpf").value;
    let telefone = document.getElementById("telefone").value;
    let cep = document.getElementById("cep").value;
    let data_nascimento = document.getElementById("data_nascimento").value;
    let valor = document.getElementById("valor").value;
    let url = document.getElementById("url").value;
    let cartao = document.getElementById("cartao").value;

    let valido = true;

    //*================================== VERIFICAÇÃO NOME ========================================= 

    let nomeregex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (nome === "") {
        document.getElementById("erro-nome").textContent = "Preencha o nome";
        valido = false;
    }

    else if (nome.length < 3) {
        document.getElementById("erro-nome").textContent = "O nome precisa ter no mínimo 3 caracteres";
        valido = false;
    }
    else if (nome.length > 50) {
        document.getElementById("erro-nome").textContent = "O nome pode ter no máximo 50 caracteres";
        valido = false;
    }
    else if (!nomeregex.test(nome)) {
        document.getElementById("erro-nome").textContent = "O nome só pode conter letras";
        valido = false;
    }
    else {
        document.getElementById("erro-nome").textContent = "";
    }

    //*================================== VERIFICAÇÃO EMAIL ========================================= 

    let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        document.getElementById("erro-email").textContent = "Preencha o email";
        valido = false;
    }

    else if (!email.includes("@")) {
        document.getElementById("erro-email").textContent = "O email precisa ter arroba";
        valido = false;
    }
    else if (!emailregex.test(email)) {
        document.getElementById("erro-email").textContent = "O email está inválido ou sem domínio";
        valido = false;
    }
    else {
        document.getElementById("erro-email").textContent = "";
    }

    //*================================== VERIFICAÇÃO SENHA ========================================= 

    let senharegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&]).{8,}$/;

    if (senha === "") {
        document.getElementById("erro-senha").textContent = "Preencha a senha";
        valido = false;
    }
    else if (senha.length < 8) {
        document.getElementById("erro-senha").textContent = "A senha precisa ter no mínimo 8 caracteres";
        valido = false;
    }
    else if (!senharegex.test(senha)) {
        document.getElementById("erro-senha").textContent = "A senha precisa ter 1 maiúscula, 1 minúscula, 1 número e 1 símbolo";
        valido = false;
    }
    else if (confirma_senha !== senha) {
        document.getElementById("erro-senha").textContent = "A senha está diferente";
        valido = false;
    }
    else {
        document.getElementById("erro-senha").textContent = "";
    }

    //*================================== VERIFICAÇÃO CPF OU CNPJ ========================================= 

    function validarCPF(cpf) {

        cpf = cpf.replace(/\D/g, "");

        if (cpf.length !== 11) return false;

        if (/^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++)
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);

        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11))
            resto = 0;

        if (resto !== parseInt(cpf.substring(9, 10)))
            return false;

        soma = 0;

        for (let i = 1; i <= 10; i++)
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);

        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11))
            resto = 0;

        if (resto !== parseInt(cpf.substring(10, 11)))
            return false;

        return true;
    }

    let cpfregex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (cpf === "") {
        document.getElementById("erro-cpf").textContent = "Preencha o cpf";
        valido = false;
    }

    else if (!cpfregex.test(cpf)) {
        document.getElementById("erro-cpf").textContent = "O CPF deve estar no formato 000.000.000-00";
        valido = false;
    }
    else if (!validarCPF(cpf)) {
        document.getElementById("erro-cpf").textContent = "CPF inválido";
        valido = false;
    }
    else {
        document.getElementById("erro-cpf").textContent = "";
    }

    //*================================== VERIFICAÇÃO TELEFONE ========================================= 

    let telefoneregex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

    if (telefone === "") {
        document.getElementById("erro-telefone").textContent = "Preencha o telefone";
        valido = false;
    }

    else if (!telefoneregex.test(telefone)) {
        document.getElementById("erro-telefone").textContent = "O Telefone deve estar no formato (00) 00000-0000";
        valido = false;
    }
    else {
        document.getElementById("erro-telefone").textContent = "";
    }

    //*================================== VERIFICAÇÃO CEP ========================================= 

    let cepregex = /^\d{5}-\d{3}$/;

    if (cep === "") {
        document.getElementById("erro-cep").textContent = "Preencha o cep";
        valido = false;
    }
    if (!cepregex.test(cep)) {
        document.getElementById("erro-cep").textContent = "O CEP deve estar no formato 00000-000";
        valido = false;
    }
    else {
        document.getElementById("erro-cep").textContent = "";
    }

    //*================================== VERIFICAÇÃO DATA DE NASCIMENTO ========================================= 

    let data = new Date(data_nascimento);

    if (data_nascimento === "") {
        document.getElementById("erro-data-nascimento").textContent = "Preencha a data";
        valido = false;
    }
    else if (isNaN(data.getTime())) {
        document.getElementById("erro-data-nascimento").textContent = "Data inválida";
        valido = false;
    }
    else {
        document.getElementById("erro-data-nascimento").textContent = "";
    }

    //*================================== VERIFICAÇÃO URL ========================================= 

    let urlregex = /^https?:\/\//;

    if (url === "") {
        document.getElementById("erro-url").textContent = "Preencha a URL";
        valido = false;
    }
    if (!urlregex.test(url)) {
        document.getElementById("erro-url").textContent = "A URL deve iniciar com https:// ou http://";
        valido = false;
    }
    else {
        document.getElementById("erro-url").textContent = "";
    }

    //*================================== VERIFICAÇÃO VALOR ========================================= 

    let valorregex = /^\d{1,3}(\.\d{3})*,\d{2}$/;

    if (valor === "") {
        document.getElementById("erro-valor").textContent = "Preencha o valor";
        valido = false;
    }

    else if (!valorregex.test(valor)) {
        document.getElementById("erro-valor").textContent = "O valor deve estar no formato 1.299,90";
        valido = false;
    }

    else {

        let numero = parseFloat(valor.replace(/\./g, "").replace(",", "."));

        if (numero < 0 || numero > 1000) {
            document.getElementById("erro-valor").textContent = "O valor deve estar entre 0 e 1000";
            valido = false;
        }

        else {
            document.getElementById("erro-valor").textContent = "";
        }

    }

    //*================================== VERIFICAÇÃO CARTÃO ========================================= 

    let cartaoregex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;

    if (cartao === "") {
        document.getElementById("erro-cartao").textContent = "Preencha o Cartão";
        valido = false;
    }
    else if (!cartaoregex.test(cartao)) {
        document.getElementById("erro-cartao").textContent = "Cartão inválido. Use 16 dígitos";
        valido = false;
    }
    else {

        let numero = cartao.replace(/\s/g, "");
        let bandeira = "";

        if (/^4/.test(numero)) {
            bandeira = "Visa";
        }
        else if (/^5[1-5]/.test(numero)) {
            bandeira = "MasterCard";
        }
        else if (/^3[47]/.test(numero)) {
            bandeira = "American Express";
        }
        else if (/^6011/.test(numero)) {
            bandeira = "Discover";
        }
        else {
            bandeira = "Bandeira desconhecida";
        }

        document.getElementById("erro-cartao").textContent = "Bandeira: " + bandeira;
    }

    //*================================== VERIFICAÇÃO FINAL ========================================= 

    if (!valido) {
        event.preventDefault();
    }

});