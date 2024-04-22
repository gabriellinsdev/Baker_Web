var quantidade = 1

let CD_PADEIRO
let NM_PADEIRO

function buscarPadeiroIdeal() {

    // Obter o valor do CEP do input
    var cep = document.getElementById('padeiro_ideal-search').value;

    // Fazer a requisição para a API
    fetch(`https://localhost:7023/LocationNearby?CEP_CLIENTE=${cep}&QT_LINHAS=${quantidade}`, {
        headers:{
            "Content-Type":"application/json",
            "Accept":"*/*"
        },
        mode:"cors"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição');
        }
        return response.json();
    })
    .then(data => {
        var dados = data.data;
        var mensagem = data.mensagem;
        var stacktrace = data.stacktrace;

console.log(dados)

        CD_PADEIRO = dados[0].cD_USUARIO;
        NM_PADEIRO = dados[0].nM_USUARIO;

        document.querySelector('#padeiro').textContent = NM_PADEIRO;

    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function redirectWithUserCode(CD_PADEIRO, NM_PADEIRO) {
    sessionStorage.setItem('CD_PADEIRO',  CD_PADEIRO);
    sessionStorage.setItem('NM_PADEIRO',  NM_PADEIRO);

    var destinationUrl = 'http://127.0.0.1:5500/produtos-do-padeiro2.html'
    
    // Redirecionar para a nova URL
    window.location.href = destinationUrl;
}
