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

let CD_PRODUTO = 1;

buscarProdutosPadeiro()

function alterarProdutoPadeiro(PRODUTO) {
    fetch(`https://localhost:7023/Produtos/Update?C?produto=${PRODUTO}`, {
        headers:{
            "Content-Type":"application/json",
            "Accept":"*/*"
        },
        mode:"cors"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao alterar o produto!');
        }
    })
    .then(data => {
        var dados = data.data;
        var mensagem = data.mensagem;
        var stacktrace = data.stacktrace;
    })    
    .catch(error => {
        console.error('Erro ao alterar o produto: ', error);
    });
}

function excluirProdutoPadeiro(CD_PRODUTO) {
    fetch(`https://localhost:7023/Produtos/Delete?cd_produto=${CD_PRODUTO}`, {
        headers:{
            "Content-Type":"application/json",
            "Accept":"*/*"
        },
        mode:"cors"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir o produto!');
        }
    })
    .then(data => {
        var dados = data.data;
        var mensagem = data.mensagem;
        var stacktrace = data.stacktrace;
    })    
    .catch(error => {
        console.error('Erro ao excluir o produto: ', error);
    });
}

function buscarProdutosPadeiro() {
    // Fazer a requisição para a API
    fetch(`https://localhost:7023/Produtos/List?CD_USUARIO=${CD_PADEIRO}`, {
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