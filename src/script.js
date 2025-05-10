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
navigator.geolocation.getCurrentPosition(
  (position) => {
    const latitude = position.coords.latitude;
    latitude = document.getElementById("latitude");
    const longitude = position.coords.longitude;
    longitude = document.getElementById("longitude");
    console.log("Sua posição:", latitude, longitude);
  },
  (error) => {
    console.error("Erro ao obter localização:", error);
  }
  
);
