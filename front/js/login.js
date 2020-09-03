function autenticar(event) {
    event.preventDefault(); // interrompe a execução padrão do envio automatico

    let usuario = document.getElementById("txtUsuario");
    let senha = document.getElementById("txtSenha");

    // conteudo do corpo da mensagem
    let loginMsg = {
        email : usuario.value,
        cpf: usuario.value,
        senha: senha.value
    }

    let cabecalho = {
        method: 'POST',
        body: JSON.stringify(loginMsg),
        headers: {
            'Content-type' : 'application/json'
        }
    }

    // envia o pedido parao servidor, e so continua qd chegar a resposta(then)
    fetch('http://localhost:8080/usuario/login',cabecalho)
    .then( res => tratarResposta(res))  // arrow function chamando a função tratarResposta
                                        // res é a resposta que veio do backend(servidor)


}


function tratarResposta (res){
    if(res.status == 200){
        res.json().then( res => fazerLogin());
    }else{
        document.getElementById("msgErro").innerHTML = "Usuário/Senha inválidos"

    }

}

function fazerLogin(res){
    // arammazenar no localStorage os dados do usuário que fez o login
    localStorage.setItem("userLogged", JSON.stringify(res));
    window.location="relatorio.html";
}