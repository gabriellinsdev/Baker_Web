let CD_PADEIRO = sessionStorage.getItem('CD_PADEIRO');
let NM_PADEIRO = sessionStorage.getItem('NM_PADEIRO');



function inserirProdutoPadeiro() {
    let formData = new FormData();
    formData.append('cD_PRODUTO', '0');
    formData.append('cD_USUARIO', CD_PADEIRO);
    formData.append('nM_PRODUTO', document.getElementById('nome-do-produto').value);
    formData.append('dS_PRODUTO', "teste ");
    formData.append('vL_PRECO', document.getElementById('preco-do-produto').value);
    formData.append('fF_IMAGEM', document.getElementById('produto-imagem').files[0]);
    formData.append('vB_IMAGEM', null);



    fetch('https://localhost:7023/Produtos/Insert', {
        method: 'POST',
        mode: 'cors',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao incluir o produto!');
        }
        // Verifica o status da resposta para determinar o sucesso da inclusão
        if (response.status === 200) {
            console.log('Inclusão efetuada com sucesso!');
            window.alert("Produto cadastrado com sucesso");
            // Aqui você pode fazer alguma ação adicional, se necessário
        } else {
            throw new Error('Erro ao incluir o produto!');
        }
    })    
    .catch(error => {
        console.error('Erro ao incluir o produto: ', error);
    });
}
