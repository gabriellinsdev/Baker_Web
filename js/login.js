function Login()
{
    event.preventDefault()
    
    sessionStorage.setItem('cd_padeiro',  "63BEDCEA-3E70-4077-9222-600752170489");
    
    // Redirecionar para a nova URL
    window.location.href = 'http://127.0.0.1:5500/padeiro-configuracoes-vendas.html';
}