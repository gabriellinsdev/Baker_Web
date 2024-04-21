let cd_padeiro = sessionStorage.getItem('cd_padeiro');
console.log(cd_padeiro)


function buscarVendasPorPadeiro() {
    // Fazer a requisição para a API
    fetch(`https://localhost:7023/Padeiros/SalesReport?CD_USUARIO=${cd_padeiro}`, {
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
        console.log('Vendas do padeiro:', data);
        // Faça o que desejar com as vendas, como exibí-las na página
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

// Exemplo de uso: buscar vendas para o padeiro com ID 123
buscarVendasPorPadeiro(123);
