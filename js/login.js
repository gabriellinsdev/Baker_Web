function Login()
{
    event.preventDefault()
    
    sessionStorage.setItem('CD_PADEIRO',  "1383A09C-BA6C-4DE8-91B0-68E07BDFF3C8");
    sessionStorage.setItem('NM_PADEIRO',  "GABRIEL (PADEIRO)");
    sessionStorage.setItem('CD_CLIENTE',  "4E2CCD38-4184-4349-B6B6-4EA74337F673");
    sessionStorage.setItem('NM_CLIENTE',  "PEDRO (CLIENTE))");
    
    // Redirecionar para a nova URL
    window.location.href = 'http://127.0.0.1:5500/padeiro-configuracoes-gerenciar-produtos.html';
}