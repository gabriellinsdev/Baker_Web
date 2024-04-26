let CD_PADEIRO = sessionStorage.getItem('CD_PADEIRO');
let NM_PADEIRO = sessionStorage.getItem('NM_PADEIRO');
let CD_CLIENTE = sessionStorage.getItem('CD_CLIENTE');
let NM_CLIENTE = sessionStorage.getItem('NM_CLIENTE');


const nomePadeiro = document.querySelector('#padeiro1')
nomePadeiro.innerHTML = NM_PADEIRO

function adicionarAoCarrinho(cD_PRODUTO, vL_PRECO) {
    // Criar objeto com os dados necessários para adicionar ao carrinho
    let dadosCarrinho = {
        cD_USUARIO: CD_CLIENTE,
        cD_PRODUTO: cD_PRODUTO,
        qT_PRODUTO: 1, // Definindo a quantidade como 1 por padrão, você pode alterar conforme necessário
        vL_PRECO: vL_PRECO
    };

    console.log(dadosCarrinho)

    // Fazer a requisição para adicionar ao carrinho
    fetch('https://localhost:7023/Carrinho/Save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        mode: 'cors', // Converter objeto para JSON
        body: JSON.stringify(dadosCarrinho)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar ao carrinho');
        }
        return response.json();
    })
    .then(data => {
        // Aqui você pode tratar a resposta da API, se necessário
        console.log('Produto adicionado ao carrinho:', data);
        // Adicione qualquer lógica adicional que você queira executar após adicionar ao carrinho
    })
    .catch(error => {
        console.error('Erro ao adicionar ao carrinho:', error);
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
    
        console.log(dados);
    
        // Selecionar o container onde os produtos serão exibidos
        const containerProdutos = document.querySelector('.produtos_do_padeiro-produtos');        
    
        // Limpar qualquer conteúdo pré-existente dentro do container
        containerProdutos.innerHTML = '';
    
        // Iterar sobre os dados dos produtos e criar elementos HTML para cada um
        dados.forEach(produto => {
            // Criar elementos HTML para representar cada produto
            const produtoElement = document.createElement('div');
            produtoElement.classList.add('produtos_do_padeiro-card-produto');
    
            produtoElement.innerHTML = `
                <div class="produtos_do_padeiro-produto">
                    <img src="data:image/jpeg;base64,${produto.vB_IMAGEM}" class="produtos_do_padeiro-imagem-produto" alt="${produto.nM_PRODUTO}"> 
                    <div class="produtos_do_padeiro-titulo">
                        <h4 class="produtos_do_padeiro-titulo-pao">${produto.nM_PRODUTO}</h4>
                        <h4 class="produtos_do_padeiro-titulo-preco">R$ ${produto.vL_PRECO}</h4>
                    </div>
                    <button class="produtos_do_padeiro-btn-adicionar">Adicionar no Carrinho</button>
                </div>
            `;
    
            // Adicionar evento de clique ao botão "Adicionar no Carrinho"
            const btnAdicionarCarrinho = produtoElement.querySelector('.produtos_do_padeiro-btn-adicionar');
            btnAdicionarCarrinho.addEventListener('click', () => {
                adicionarAoCarrinho(produto.cD_PRODUTO, produto.vL_PRECO);
            });
    
            // Adicionar o elemento do produto ao container de produtos
            containerProdutos.appendChild(produtoElement);
        });
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

buscarProdutosPadeiro();


