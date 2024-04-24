function Login()
{
    event.preventDefault()
    
    sessionStorage.setItem('CD_PADEIRO',  "5E61535B-E527-485F-9196-282E3E9169E4");
    sessionStorage.setItem('NM_PADEIRO',  "GABRIEL (PADEIRO)");
    
    // Redirecionar para a nova URL
    window.location.href = 'http://127.0.0.1:5500/padeiro-configuracoes-gerenciar-produtos.html';
}