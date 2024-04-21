let cd_padeiro = sessionStorage.getItem('cd_padeiro');

function buscarProdutosPadeiro(idPadeiro) {
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
        // Processar os dados retornados pela API
        console.log('Produtos do padeiro:', data);
        // Faça o que desejar com as vendas, como exibí-las na página
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}


function excluirProdutoPadeiro() {
    var url = 'URL_DA_SUA_API/' + idProduto;

    // Configurar a requisição HTTP DELETE
    var options = {
        method: 'DELETE'
    };

    // Fazer a requisição para a API
    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir o produto');
        }
        console.log('Produto excluído com sucesso!');
        // Atualizar a interface ou tomar outras ações necessárias após excluir o produto
    })
    .catch(error => {
        console.error('Erro ao excluir o produto:', error);
    });
}

function alterarProdutoPadeiro(idProduto, novoProduto) {
    // URL da sua API para alterar o produto
    var url = 'URL_DA_SUA_API/' + idProduto;

    // Configurar os dados da requisição HTTP PUT com o novo produto
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoProduto)
    };

    // Fazer a requisição para a API
    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao alterar o produto');
        }
        console.log('Produto alterado com sucesso!');
        // Atualizar a interface ou tomar outras ações necessárias após alterar o produto
    })
    .catch(error => {
        console.error('Erro ao alterar o produto:', error);
    });
}


// Exemplo de uso das funções
var idProdutoExcluir = 123; // Substitua 123 pelo ID do produto a ser excluído
excluirProdutoPadeiro(idProdutoExcluir);

var idProdutoAlterar = 456; // Substitua 456 pelo ID do produto a ser alterado
var novoProduto = {
    NM_PRODUTO: "Novo nome do produto",
    DS_CAMINHO_IMAGEM: "nova/imagem.jpg",
    VL_PRECO: 10.99
};
alterarProdutoPadeiro(idProdutoAlterar, novoProduto);


// Exemplo de uso: buscar vendas para o padeiro com ID 123
buscarProdutosPadeiro(123);