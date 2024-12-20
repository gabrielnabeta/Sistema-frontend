window.onload = function (e) {

    var txtNome = document.getElementById("txtNome");

    txtNome.focus();

    var form = document.getElementById("frmCadastro");

    form.onsubmit = function (e) {

        e.preventDefault();

        var nome = txtNome.value;

        var sobrenome = document.getElementById("txtSobrenome").value;

        var senha = document.getElementById("txtSenha").value;

        var telefone = document.getElementById("txtTelefone").value;

        var email = document.getElementById("txtEmail").value;

        var genero = document.getElementById("txtGenero").value;

        if (nome == "" ||
            sobrenome == "" ||
            email == "" ||
            telefone == "" ||
            senha == "" ||
            genero == "") {
        
            var mensagem = "Os campos acima são obrigatórios";

            exibirErro(mensagem);
        }
        else {
            cadastrar(nome, sobrenome, email, telefone, senha, genero);
        }
    };

    function exibirErro(mensagem) {

        var spnErro = document.getElementById("spnErro"); 

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);  
    };

    function cadastrar(nome, sobrenome, email, telefone, senha, genero) {

        var data = JSON.stringify({
            "nome": nome,
            "sobrenome": sobrenome,
            "email": email,
            "telefone": telefone,
            "senha": senha,
            "genero": genero
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {

                    localStorage.setItem("usuarioGuid", result.usuarioGuid);

                    window.location.href = "home.html";
                }
                else {
                    exibirErro;
                }
            }
        });

        xhr.open("POST", "https://localhost:44325/api/usuario/Cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    };
}