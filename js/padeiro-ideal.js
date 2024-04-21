var quantidade = 1

let cd_Usuario1

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
        var padeiros = data.data;

console.log(padeiros)

        document.querySelector('#padeiro1').textContent = padeiros[0].nM_USUARIO;

        cd_Usuario1 = padeiros[0].cD_USUARIO;
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function redirectWithUserCode(userCode) {
    sessionStorage.setItem('cd_padeiro',  userCode);

    var destinationUrl = 'http://127.0.0.1:5500/produtos-do-padeiro2.html'
    
    // Redirecionar para a nova URL
    window.location.href = destinationUrl;
}