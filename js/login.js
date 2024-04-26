function Login()
{
    event.preventDefault()
    
    sessionStorage.setItem('CD_PADEIRO',  "3DF2E404-B148-404E-B4CE-F52748F93072");
    sessionStorage.setItem('NM_PADEIRO',  "GABRIEL (PADEIRO)");
    sessionStorage.setItem('CD_CLIENTE',  "AFDAA35C-5094-435E-B014-C3EB083AC714");
    sessionStorage.setItem('NM_CLIENTE',  "PEDRO (CLIENTE))");
    
    // Redirecionar para a nova URL
    window.location.href = 'http://127.0.0.1:5500/padeiro-configuracoes-gerenciar-produtos.html';
}