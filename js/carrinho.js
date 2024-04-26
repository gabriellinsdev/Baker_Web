let CD_PADEIRO = sessionStorage.getItem('CD_PADEIRO');
let NM_PADEIRO = sessionStorage.getItem('NM_PADEIRO');
let CD_CLIENTE = sessionStorage.getItem('CD_CLIENTE');
let NM_CLIENTE = sessionStorage.getItem('NM_CLIENTE');

function listarCarrinho() {
    fetch(`https://localhost:7023/Carrinho/List?CD_USUARIO=${CD_CLIENTE}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        mode: 'cors'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.data)
        // Chamada à função para exibir os produtos do carrinho na página
        exibirProdutosCarrinho(data.data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function exibirProdutosCarrinho(dadosCarrinho) {
    // Selecionar o container onde os produtos do carrinho serão exibidos
    const carrinhoProdutosContainer = document.querySelector('.carrinho-produtos');

    // Limpar qualquer conteúdo pré-existente dentro do container
    carrinhoProdutosContainer.innerHTML = '';

    // Iterar sobre os dados do carrinho e criar elementos HTML para cada produto
    dadosCarrinho.forEach(produto => {
        // Criar elementos HTML para representar cada produto no carrinho
        const produtoElement = document.createElement('section');
        produtoElement.classList.add('carrinho-produto-adicionado');

        produtoElement.innerHTML = `
            <div class="carrinho-img-produto">
                <img src="img/pao${produto.cD_PRODUTO}.png" alt="algum pao" class="img-carrinho">
            </div>
            <div class="carrinho-info-produtos">
                <h4>Produto ${produto.cD_PRODUTO}</h4>
                <p>Quantidade: ${produto.qT_PRODUTO}</p>
                <p>Preço: R$ ${produto.vL_PRECO.toFixed(2)}</p>
            </div>
            <div class="carrinho-btns">
                <div class="carrinho-adc-exc">
                    <button class="carrinho-btn-controle">-</button>
                    <button class="carrinho-btn-controle">${produto.qT_PRODUTO}</button>
                    <button class="carrinho-btn-controle">+</button>
                </div>
                <button class="carrinho-excluir-produto">Remover</button> 
            </div>`;

        // Adicionar o elemento do produto ao container de produtos do carrinho
        carrinhoProdutosContainer.appendChild(produtoElement);
    });
}

// Chamar a função listarCarrinho para buscar e exibir os produtos do carrinho
listarCarrinho();
