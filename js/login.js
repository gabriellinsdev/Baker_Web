function Login()
{
    event.preventDefault()
    
    sessionStorage.setItem('CD_PADEIRO',  "631254F2-C4DB-47D8-A65F-AB5390A123D9");
    sessionStorage.setItem('NM_PADEIRO',  "GABRIEL (PADEIRO)");
    
    // Redirecionar para a nova URL
    window.location.href = 'http://127.0.0.1:5500/padeiro-configuracoes-gerenciar-produtos.html';
}