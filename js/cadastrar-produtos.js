let CD_PADEIRO = sessionStorage.getItem('CD_PADEIRO');
let NM_PADEIRO = sessionStorage.getItem('NM_PADEIRO');

let PRODUTO = {
    CD_PRODUTO: 0,
    CD_USUARIO: CD_PADEIRO,
    NM_PRODUTO: "Nome do produto",
    DS_PRODUTO: "Descrição do produto",
    DS_CAMINHO_IMAGEM: "C:/Temp/imagem.jpg",
    VL_PRECO: 10.99
};

function inserirProdutoPadeiro(PRODUTO) {
    fetch(`https://localhost:7023/Produtos/Insert?produto=${PRODUTO}`, {
        headers:{
            "Content-Type":"application/json",
            "Accept":"*/*"
        },
        mode:"cors"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao incluir o produto!');
        }
    })
    .then(data => {
        var dados = data.data;
        var mensagem = data.mensagem;
        var stacktrace = data.stacktrace;
    })    
    .catch(error => {
        console.error('Erro ao incluir o produto: ', error);
    });
}