let CD_PADEIRO = sessionStorage.getItem('CD_PADEIRO');
let NM_PADEIRO = sessionStorage.getItem('NM_PADEIRO');
let CD_CLIENTE = sessionStorage.getItem('CD_CLIENTE');
let NM_CLIENTE = sessionStorage.getItem('NM_CLIENTE');


const nomePadeiro = document.querySelector('#padeiro1')
nomePadeiro.innerHTML = NM_PADEIRO



function preencherProdutosNaPagina(produtos) {
    const produtosContainer = document.querySelector('.produtos_do_padeiro-produtos');

    produtos.forEach(produto => {
        const produtoCard = document.createElement('div');
        produtoCard.classList.add('produtos_do_padeiro-card-produto');

        const produtoInfo = document.createElement('div');
        produtoInfo.classList.add('produtos_do_padeiro-produto');

        const imagem = document.createElement('img');
        imagem.classList.add('produtos_do_padeiro-imagem-produto');
        imagem.src = `data:image/jpeg;base64,${produto.vB_IMAGEM}`;
        imagem.alt = "Imagem do produto";

        const titulo = document.createElement('h4');
        titulo.textContent = produto.nM_PRODUTO;

        const preco = document.createElement('h4');
        preco.textContent = produto.vL_PRECO ? `R$ ${produto.vL_PRECO.toFixed(2)}` : 'Preço indisponível';

        const filtros = document.createElement('div');
        filtros.classList.add('produtos_do_padeiro-filtros');

        const alimentosRestritosXML =  produto.lS_ALIMENTOS_RESTRITOS;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(alimentosRestritosXML, "text/xml");
        const items = xmlDoc.querySelectorAll('ITEM');
        items.forEach(item => {
            const filtroElement = document.createElement('p');
            filtroElement.textContent = item.querySelector('DS_ALIMENTO').textContent;
            filtros.appendChild(filtroElement);
        });

        const botaoAdicionar = document.createElement('button');
        botaoAdicionar.classList.add('produtos_do_padeiro-btn-adicionar');
        botaoAdicionar.textContent = 'Adicionar no Carrinho';

        produtoInfo.appendChild(imagem);
        produtoInfo.appendChild(titulo);
        produtoInfo.appendChild(preco);
        produtoInfo.appendChild(filtros);
        produtoInfo.appendChild(botaoAdicionar);

        produtoCard.appendChild(produtoInfo);
        produtosContainer.appendChild(produtoCard);
    });
}

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
        let produtos = data.data;
        preencherProdutosNaPagina(produtos);
    })  
    .catch(error => {
        console.error('Erro:', error);
    });
}

buscarProdutosPadeiro();


