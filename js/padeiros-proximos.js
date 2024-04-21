let map

let cd_Usuario1
let cd_Usuario2
let cd_Usuario3

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
        var padeiros = data.data;

        document.querySelector('#padeiro1').textContent = padeiros[0].nM_USUARIO;
        document.querySelector('#padeiro2').textContent = padeiros[1].nM_USUARIO;
        document.querySelector('#padeiro3').textContent = padeiros[2].nM_USUARIO;

        cd_Usuario1 = padeiros[0].cD_USUARIO;
        cd_Usuario2 = padeiros[1].cD_USUARIO;
        cd_Usuario3 = padeiros[2].cD_USUARIO;

        
        let somaLat = padeiros.reduce((total, padeiro) => total + padeiro.cD_LATITUDE, 0)
        let mediaLat = somaLat / padeiros.length

        let somaLong = padeiros.reduce((total, padeiro) => total + padeiro.cD_LONGITUDE, 0)
        let mediaLong = somaLong / padeiros.length

        map.setCenter({ lat: mediaLat, lng: mediaLong })

        for (var i = 0; i < Math.min(padeiros.length, 3); i++) {
            var padeiro = padeiros[i];
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

function redirectWithUserCode(userCode) {
    sessionStorage.setItem('cd_padeiro',  userCode);

    var destinationUrl = 'http://127.0.0.1:5500/produtos-do-padeiro2.html'
    
    // Redirecionar para a nova URL
    window.location.href = destinationUrl;
}

window.buscarPadeirosProximos = buscarPadeirosProximos;
