buscarUsuario("CD_PADEIRO","NM_PADEIRO","13AAFADD-331D-4C7E-AED2-E48BD131B463");
buscarUsuario("CD_CLIENTE","NM_CLIENTE","B0EB1CAB-FBEA-45AC-941E-C772F77E5685");

function buscarUsuario(cd_key, nm_key, CD_USUARIO) {
  fetch(`${BASE_URL_API2}/Usuario/Get?CD_USUARIO=${CD_USUARIO}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    mode: "cors",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao fazer a requisição");
      }
      return response.json();
    })
    .then((data) => {
      var Usuario = data.data;
      var mensagem = data.mensagem;
      var stacktrace = data.stacktrace;
      sessionStorage.setItem(cd_key, Usuario.cD_USUARIO);
      sessionStorage.setItem(nm_key, Usuario.nM_USUARIO);

      let usuarioElement = document.getElementById("usuario");
      if (cd_key == "CD_PADEIRO") {
        usuarioElement.value = Usuario.nM_USUARIO;
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

function Login() {
  event.preventDefault();
window.location.href = "http://127.0.0.1:5500/padeiro-configuracoes-gerenciar-produtos.html";

}
