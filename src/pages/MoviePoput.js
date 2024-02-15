
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/PopupM.css'

function MoviePopup() {
  const { title } = useParams();
  const [moviePopup, setMoviePopup] = useState(null);

  useEffect(() => {
    fetch('/sample.json') 
      .then(response => response.json())
      .then(data => {
        // Buscar la película con el título correspondiente en los datos
        const movie = data.entries.find(entry => entry.title === title);
        setMoviePopup(movie);
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
      });
  }, [title]);

  if (!moviePopup) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="movie-popup">
      <h1>Detalles de la Película: {moviePopup.title}</h1>
      <p>{moviePopup.description}</p>
      <p>Año de lanzamiento: {moviePopup.releaseYear}</p>
      <img src={moviePopup.images['Poster Art'].url} alt={moviePopup.title} />
    </div>
  );
}

export default MoviePopup;
