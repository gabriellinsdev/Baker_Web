let map

let CD_PADEIRO1
let CD_PADEIRO2
let CD_PADEIRO3

let NM_PADEIRO1
let NM_PADEIRO2
let NM_PADEIRO3

window.buscarPadeirosProximos = buscarPadeirosProximos;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -23.533773, lng: -46.625290 },
    zoom: 12,
  });
}

window.initMap = initMap;

function buscarPadeirosProximos() {
    initMap()

    var cep = document.getElementById('padeiros_proximos-search').value;
    var quantidade = 3;

    fetch(`https://localhost:7023/LocationNearby?CEP_CLIENTE=${cep}&QT_LINHAS=${quantidade}`, {
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
        var dados = data.data;
        var mensagem = data.mensagem;
        var stacktrace = data.stacktrace;

        console.log(dados[0].nM_USUARIO)


        CD_PADEIRO1 = dados[0].cD_USUARIO;
        NM_PADEIRO1 = dados[0].nM_USUARIO;
        CD_PADEIRO2 = dados[1].cD_USUARIO;
        NM_PADEIRO2 = dados[1].nM_USUARIO;
        CD_PADEIRO3 = dados[2].cD_USUARIO;
        NM_PADEIRO3 = dados[2].nM_USUARIO;


        document.querySelector('#padeiro1').textContent = NM_PADEIRO1;
        document.querySelector('#padeiro2').textContent = NM_PADEIRO2;
        document.querySelector('#padeiro3').textContent = NM_PADEIRO3;
       
        let somaLat = dados.reduce((total, dados) => total + dados.cD_LATITUDE, 0)
        let mediaLat = somaLat / dados.length

        let somaLong = dados.reduce((total, dados) => total + dados.cD_LONGITUDE, 0)
        let mediaLong = somaLong / dados.length

        map.setCenter({ lat: mediaLat, lng: mediaLong })

        for (var i = 0; i < Math.min(dados.length, 3); i++) {
            var padeiro = dados[i];
            var marker = new google.maps.Marker({
                position: { lat: padeiro.cD_LATITUDE, lng: padeiro.cD_LONGITUDE },
                map: map,
                title: padeiro.nM_USUARIO
            });
        }
    })
    .catch(error => {
        console.error('Erro:', error.data);
    });
}

function redirectWithUserCode(CD_PADEIRO, NM_PADEIRO) {
    sessionStorage.setItem('CD_PADEIRO',  CD_PADEIRO);
    sessionStorage.setItem('NM_PADEIRO',  NM_PADEIRO);

    var destinationUrl = 'http://127.0.0.1:5500/produtos-do-padeiro2.html'
    
    // Redirecionar para a nova URL
    window.location.href = destinationUrl;
}

