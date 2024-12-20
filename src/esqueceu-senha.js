window.onload = function (e) {

    var txtEmail = document.getElementById("txtEmail");

    txtEmail.focus();

    var form = document.getElementById("frmEsqueceu")

    form.onsubmit = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        if (email == "") {

            var mensagem = "Informe o email";

            exibirErro(mensagem);
        }
        else {
            enviarEmail(email);
        }
    };
    function exibirErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout (function () {
            spnErro.style.display = "none";
        }, 5000); 
    }; 

    function enviarEmail(email) {

        var data = JSON.stringify({
            "email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    alert('Email enviado');
                }
                else {
                    exibirErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44325/api/usuario/EsqueceuSenha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    };
}
   