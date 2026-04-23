//Configuración de la API
const API_KEY = "54da2176";
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

//buscar pelis
async function searchMovies(query) {
  try {
    const response = await fetch(BASE_URL + query);
    const data = await response.json();

    // devuelve los resultados
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      document.getElementById("results").innerHTML =
        `<p>No se encontraron resultados para: ${query}</p>`;
    }
  } catch (error) {
    console.error("Error al conectar con la API:", error);
  }
}

// mostrar resultados
function displayMovies(movies) {
  const container = document.getElementById("results");
  if (!container) return;

  container.innerHTML = "";

  movies.forEach((movie) => {
    // En OMDB las propiedades empiezan con mayúscula: Title, Poster, Year
    const card = document.createElement("div");
    card.className = "movie-card";

    // Verificar si hay imagen
    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=Sin+Imagen";

    card.innerHTML = `
            <img src="${poster}" alt="${movie.Title}">
            <div class="card-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <button class="btn-fav" onclick='saveFavorite(${JSON.stringify(movie).replace(/'/g, "&apos;")})'>
                    Añadir a Favoritos
                </button>
            </div>
        `;
    container.appendChild(card);
  });
}

// LOCALSTORAGE (Guardar datos)
function saveFavorite(movie) {
  // Obtener lo que ya hay en LocalStorage o crear un array vacío
  let favorites = JSON.parse(localStorage.getItem("myMovies")) || [];

  // Comprobar si la película ya está en favoritos para no repetirla
  const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);

  if (!exists) {
    favorites.push(movie); // Añadimos el objeto al array
    localStorage.setItem("myMovies", JSON.stringify(favorites));
    alert(`"${movie.Title}" se ha guardado en tus favoritos.`);
  } else {
    alert("Esta película ya está en tu lista de favoritos.");
  }
}

// cargar favoritos
function loadFavorites() {
  const favContainer = document.getElementById("favoritesList");
  if (!favContainer) return;

  const favorites = JSON.parse(localStorage.getItem("myMovies")) || [];
  favContainer.innerHTML = "";

  if (favorites.length === 0) {
    favContainer.innerHTML = "<p>Aún no tienes películas favoritas.</p>";
    return;
  }

  favorites.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <button class="btn-delete" onclick="removeFavorite('${movie.imdbID}')">Eliminar</button>
        `;
    favContainer.appendChild(card);
  });
}

// Eliminar de favoritos
function removeFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("myMovies")) || [];
  favorites = favorites.filter((movie) => movie.imdbID !== id);
  localStorage.setItem("myMovies", JSON.stringify(favorites));
  loadFavorites(); // Recargar la lista
}

// inicio
document.addEventListener("DOMContentLoaded", () => {
  // Evento para el botón de búsqueda
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = document.getElementById("movieInput").value;
      if (query) searchMovies(query);
    });
  }

  // Si estamos en la página de favoritos, los cargar al iniciar
  if (document.getElementById("favoritesList")) {
    loadFavorites();
  }
});

//carrusel
async function loadCarousel() {
  const track = document.getElementById("carousel");
  if (!track) return;

  // Buscar películas en la api
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=54da2176&s=action`,
  );
  const data = await response.json();

  if (data.Search) {
    const movies = [...data.Search, ...data.Search];

    movies.forEach((movie) => {
      const img = document.createElement("img");
      img.src =
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/200x300";
      img.alt = movie.Title;
      track.appendChild(img);
    });
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadCarousel);
