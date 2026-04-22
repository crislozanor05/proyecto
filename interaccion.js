// Configuración de la API
const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=54da2176";

// 1. Función para buscar películas (Fetch) [cite: 8, 9]
async function searchMovies(query) {
  const response = await fetch(API_URL + query);
  const data = await response.json();
  displayMovies(data.results); // Uso de arrays [cite: 9]
}

// 2. Función para mostrar resultados en el HTML [cite: 6, 9]
function displayMovies(movies) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  movies.forEach((movie) => {
    // Bucle [cite: 9]
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button onclick="saveFavorite(${JSON.stringify(movie).replace(/"/g, "&quot;")})">⭐ Favorito</button>
        `;
    container.appendChild(card);
  });
}

// 3. Uso de LocalStorage
function saveFavorite(movie) {
  let favorites = JSON.parse(localStorage.getItem("myMovies")) || [];
  favorites.push(movie); // Objeto añadido al array [cite: 9]
  localStorage.setItem("myMovies", JSON.stringify(favorites));
  alert(`${movie.title} añadida a favoritos!`);
}

// Evento del botón de búsqueda
if (document.getElementById("searchBtn")) {
  document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("movieInput").value;
    if (query) searchMovies(query);
  });
}
