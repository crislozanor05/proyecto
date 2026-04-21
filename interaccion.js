function buscarPeliculas() {
  let texto = document.getElementById("busqueda").value;

  fetch("http://www.omdbapi.com/?i=tt3896198&apikey=54da2176")
    .then(function (respuesta) {
      return respuesta.json();
    })

    .then(function (datos) {
      let resultado = document.getElementById("resultado");
      resultado.innerHTML = "";

      let peliculas = datos.Search;

      for (let i = 0; i < peliculas.length; i++) {
        let peli = peliculas[i];

        resultado.innerHTML += `
          <div>
            <img src="${peli.Poster}">
            <p>${peli.Title}</p>
          </div>
        `;
      }
    });
}
