const hamburguer = document.getElementById("hamburguer");
// Atribui a constante 'hamburguer' o elemento 'hamburguer'
const navMenu = document.getElementById("nav-menu");
// Atribui a constante 'navMenu' o elemento 'nav-menu'

// alterna a classe 'open' no menu ao clicar no hamburguer
hamburguer.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  // adiciona ou remove a classe 'open' no menu

  // ajusta a posição do menu
  if (navMenu.classList.contains("open")) {
    
    navMenu.style.position = "absolute"; // posição na página
    navMenu.style.top = "50px"; // distância do topo do head
    navMenu.style.left = "5px"; // fixa ao lado esquerdo do hamburguer
    navMenu.style.backgroundColor = "#333"; // cor do plano de fundo
    navMenu.style.borderRadius = "5px"; // bordas arredondadas
    navMenu.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"; // Altera o Estilo da Caixa
    navMenu.style.zIndex = "1000"; // Garante que o menu fique acima dos outros elementos
    navMenu.style.width = "200px"; // Largura do Menu

  } else {
    // remove os estilos para voltar ao estado original
    navMenu.style.position = ""; // posição na página
    navMenu.style.top = ""; // distância do topo do head
    navMenu.style.left = ""; // fixa ao lado esquerdo do hamburguer
    navMenu.style.backgroundColor = ""; // cor do plano de fundo
    navMenu.style.borderRadius = ""; // bordas arredondadas
    navMenu.style.boxShadow = ""; // Altera o Estilo da Caixa
    navMenu.style.zIndex = ""; // Garante que o menu fique acima dos outros elementos
    navMenu.style.width = ""; // Largura do Menu
  }
});

/*
const user = document.getElementById("user");
// Atribui a constante 'user' o elemento 'user'
const navMenuUser = document.getElementById("nav-menu-user");
// Atribui a constante 'navMenuUser' o elemento 'nav-menu-user'

// alterna a classe 'open' no menu ao clicar no hamburguer
user.addEventListener("click", () => {
  navMenuUser.classList.toggle("open");
  // adiciona ou remove a classe 'open' no menu

  // ajusta a posição do menu
  if (navMenuUser.classList.contains("open")) {
    
    navMenuUser.style.position = "absolute"; // posição na página
    navMenuUser.style.top = "50px"; // distância do topo do head
    navMenuUser.style.right = "5px"; // fixa ao lado esquerdo do hamburguer
    navMenuUser.style.backgroundColor = "#333"; // cor do plano de fundo
    navMenuUser.style.borderRadius = "5px"; // bordas arredondadas
    navMenuUser.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"; // Altera o Estilo da Caixa
    navMenuUser.style.zIndex = "1000"; // Garante que o menu fique acima dos outros elementos
    navMenuUser.style.width = "200px"; // Largura do Menu

  } else {
    // remove os estilos para voltar ao estado original
    navMenuUser.style.position = ""; // posição na página
    navMenuUser.style.top = ""; // distância do topo do head
    navMenuUser.style.left = ""; // fixa ao lado esquerdo do hamburguer
    navMenuUser.style.backgroundColor = ""; // cor do plano de fundo
    navMenuUser.style.borderRadius = ""; // bordas arredondadas
    navMenuUser.style.boxShadow = ""; // Altera o Estilo da Caixa
    navMenuUser.style.zIndex = ""; // Garante que o menu fique acima dos outros elementos
    navMenuUser.style.width = ""; // Largura do Menu
  }
});
*/
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180; // diferença de latitude em radianos
  const dLon = (lon2 - lon1) * Math.PI / 180; // diferença de longitude em radianos
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // retorna a distância em km
}

// Obtém a localização atual do usuário
navigator.geolocation.getCurrentPosition(pos => {
  const userLat = pos.coords.latitude;
  const userLng = pos.coords.longitude;

  // Busca os pontos no servidor (dados.php)
  fetch('dados.php')
    .then(response => response.json())
    .then(pontos => {
      // Calcula a distância de cada ponto até o usuário
      pontos.forEach(ponto => {
        ponto.distancia = calcularDistancia(userLat, userLng, ponto.latitude, ponto.longitude);
      });

      // Ordena os pontos pela menor distância
      pontos.sort((a, b) => a.distancia - b.distancia);

      // Seleciona o container onde os pontos serão exibidos
      const container = document.getElementById('lista-pontos');
      container.innerHTML = '';

      // Cria os elementos HTML para cada ponto
      pontos.forEach(ponto => {
        const div = document.createElement('div');
        div.className = 'quadrado-direita';
        div.innerHTML = `
          <h1 class="q-h1">${ponto.nome}</h1>
          <h3 class="q-h1">Endereço: ${ponto.endereco}</h3>
          <h3 class="q-h1">Horário: ${ponto.horario}</h3>
          <p class="q-h1">Distância aproximada: ${ponto.distancia.toFixed(2)} km</p>
          <img class="imagem-coleta" src="./img/${ponto.imagem}" alt="${ponto.nome}">
        `;
        container.appendChild(div);
      });
    });
}, () => {
  // Caso a geolocalização não funcione
  alert("Não foi possível obter sua localização.");
});

// Cria o mapa no centro do Brasil inicialmente
const map = L.map('map').setView([-23.5, -47.45], 13);

// Adiciona o fundo do mapa (tiles do OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Ícone personalizado para o usuário
const userIcon = L.icon({
  iconUrl: './img/user-location.png', // opcional, ou use o padrão
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Pega localização do usuário
navigator.geolocation.getCurrentPosition(pos => {
  const userLat = pos.coords.latitude;
  const userLng = pos.coords.longitude;

  // Mostra posição do usuário no mapa
  L.marker([userLat, userLng], { icon: userIcon }).addTo(map)
    .bindPopup('Você está aqui!')
    .openPopup();

  // Busca os pontos no servidor
  fetch('dados.php')
    .then(response => response.json())
    .then(pontos => {
      pontos.forEach(ponto => {
        // Adiciona um marcador para cada ponto
        const marker = L.marker([ponto.latitude, ponto.longitude]).addTo(map);
        marker.bindPopup(`
          <strong>${ponto.nome}</strong><br>
          ${ponto.endereco}<br>
          ${ponto.horario}<br>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${ponto.latitude},${ponto.longitude}" target="_blank">Como chegar</a>
        `);
      });
    });
});
