window.onload = function (e) {

    var txtEmail = document.getElementById("txtEmail");

    var txtSenha = document.getElementById("txtSenha");

    txtEmail.focus();

    var form = document.getElementById("frmLogin");

    form.onsubmit = function (e) {

        e.preventDefault();

        if (txtEmail.value == "") {

            var mensagem = "Os campos acima são obrigatórios";

            exibirErro(mensagem);
        }
        else if (txtSenha.value == "") {

            var mensagem = "Os campos acima são obrigatórios";

            exibirErro(mensagem);
        }
        else {
            realizarLogin(txtEmail.value, txtSenha.value);
        }
    };

    function exibirErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "Block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    };

    function realizarLogin(email, senha) {

        var data = JSON.stringify({
            "email": email,
            "senha": senha
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
                    exibirErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44325/api/usuario/Login");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    };
}