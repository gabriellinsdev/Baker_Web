var quantidade = 1;
let CD_PADEIRO;
let NM_PADEIRO;

function desabilitaAlimentoRestrito() {
  if (
    document.querySelector("#padeiro-ideal_caseiro-sim").checked ||
    document.querySelector("#padeiro-ideal_caseiro-nao").checked
  ) {
    document.querySelector("#padeiro-ideal_lactose-sim").checked = false;
    document.querySelector("#padeiro-ideal_gluten-sim").checked = false;
    document.querySelector("#padeiro-ideal_lowcarb-sim").checked = false;

    document.querySelector("#padeiro-ideal_lactose-nao").checked = false;
    document.querySelector("#padeiro-ideal_gluten-nao").checked = false;
    document.querySelector("#padeiro-ideal_lowcarb-nao").checked = false;
  }
}

function desabilitaAlimentoCaseiros() {
  if (
    document.querySelector("#padeiro-ideal_lactose-sim").checked ||
    document.querySelector("#padeiro-ideal_gluten-sim").checked ||
    document.querySelector("#padeiro-ideal_lowcarb-sim").checked ||
    document.querySelector("#padeiro-ideal_lactose-nao").checked ||
    document.querySelector("#padeiro-ideal_gluten-nao").checked ||
    document.querySelector("#padeiro-ideal_lowcarb-nao").checked
  ) {
    document.querySelector("#padeiro-ideal_caseiro-sim").checked = false;
    document.querySelector("#padeiro-ideal_caseiro-nao").checked = false;
  }
}

function buscarPadeiroIdeal() {
  // Obter o valor do CEP do input
  var cep = document.getElementById("padeiro_ideal-search").value;

  // Construir o XML baseado nas respostas dos checkboxes
  const gluten = document.querySelector("#padeiro-ideal_gluten-sim").checked
    ? ""
    : "1";
  const lactose = document.querySelector("#padeiro-ideal_lactose-sim").checked
    ? ""
    : "2";
  const lowCarb = document.querySelector("#padeiro-ideal_lowcarb-sim").checked
    ? ""
    : "3";
  const caseiros = document.querySelector("#padeiro-ideal_caseiro-sim").checked
    ? "4"
    : "";

  const xmlString = `<ALIMENTOSRESTRITOS>${
    lactose
      ? `<ITEM><CD_ALIMENTO_RESTRITO>${lactose}</CD_ALIMENTO_RESTRITO></ITEM>`
      : ""
  }${
    gluten
      ? `<ITEM><CD_ALIMENTO_RESTRITO>${gluten}</CD_ALIMENTO_RESTRITO></ITEM>`
      : ""
  }${
    lowCarb
      ? `<ITEM><CD_ALIMENTO_RESTRITO>${lowCarb}</CD_ALIMENTO_RESTRITO></ITEM>`
      : ""
  }${
    caseiros
      ? `<ITEM><CD_ALIMENTO_RESTRITO>${caseiros}</CD_ALIMENTO_RESTRITO></ITEM>`
      : ""
  }</ALIMENTOSRESTRITOS>`;

  console.log(xmlString);

  // Fazer a requisição para a API
  fetch(
    `https://localhost:7023/ListarPadeirosProximos?CEP_CLIENTE=${cep}&QT_LINHAS=${quantidade}&LS_ALIMENTOS_RESTRITOS=${encodeURIComponent(
      xmlString
    )}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      mode: "cors",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao fazer a requisição");
      }
      return response.json();
    })
    .then((data) => {
      var dados = data.data;
      var mensagem = data.mensagem;
      var stacktrace = data.stacktrace;

      console.log(dados);

      CD_PADEIRO = dados[0].cD_USUARIO;
      NM_PADEIRO = dados[0].nM_USUARIO;

      document.querySelector("#padeiro").textContent = NM_PADEIRO;
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

function redirectWithUserCode(CD_PADEIRO, NM_PADEIRO) {
  sessionStorage.setItem("CD_PADEIRO", CD_PADEIRO);
  sessionStorage.setItem("NM_PADEIRO", NM_PADEIRO);

  var destinationUrl = "http://127.0.0.1:5500/produtos-do-padeiro2.html";

  // Redirecionar para a nova URL
  window.location.href = destinationUrl;
}
