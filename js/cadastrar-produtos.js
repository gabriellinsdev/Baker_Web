let cd_padeiro = sessionStorage.getItem('cd_padeiro');

// Função para enviar os dados para a API
function cadastrarProduto(event) {
    var produto = {
        CD_PRODUTO: 0,
        CD_USUARIO: 0,
        NM_PRODUTO: document.getElementById("nome-do-produto").value,
        DS_CAMINHO_IMAGEM: document.getElementById("produto-imagem").value,
        VL_PRECO: document.getElementById("preco-do-produto").value
    }

    // Impedir o comportamento padrão de submissão do formulário
    event.preventDefault();


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
        // Processar a resposta da API, se necessário
        console.log('Resposta da API:', data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}