let CD_PADEIRO = sessionStorage.getItem('CD_PADEIRO');
let NM_PADEIRO = sessionStorage.getItem('NM_PADEIRO');

buscarVendasPorPadeiro();

function buscarVendasPorPadeiro() {
    // Fazer a requisição para a API
    fetch(`https://localhost:7023/Padeiros/SalesReport?CD_USUARIO=${CD_PADEIRO}`, {
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
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}