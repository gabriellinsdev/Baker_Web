buscarUsuario("CD_PADEIRO","NM_PADEIRO","94B4BEE0-FBF3-4AF1-A67D-69710BF12F9B");
buscarUsuario("CD_CLIENTE","NM_CLIENTE","BD180837-2821-4EA4-810C-7C396BAC6742");

function buscarUsuario(cd_key, nm_key, CD_USUARIO) {
  fetch(`https://localhost:7023/Usuario/Get?CD_USUARIO=${CD_USUARIO}`, {
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

      console.log(Usuario);

      sessionStorage.setItem(cd_key, Usuario.cD_USUARIO);
      sessionStorage.setItem(nm_key, Usuario.nM_USUARIO);

      let usuarioElement = document.getElementById("usuario");
      console.log(usuarioElement)
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
