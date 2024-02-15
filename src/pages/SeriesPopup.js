
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/PopupS.css';

function SeriesPopup() {
  const { title } = useParams();
  const [seriesPopup, setSeriesPopup] = useState(null);

  useEffect(() => {
    fetch('/sample.json') 
      .then(response => response.json())
      .then(data => {
        // Buscar la serie con el título correspondiente en los datos
        const series = data.entries.find(entry => entry.title === title);
        setSeriesPopup(series);
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
      });
  }, [title]);

  if (!seriesPopup) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="series-popup">
      <h1>Detalles de la Serie: {seriesPopup.title}</h1>
      <p>{seriesPopup.description}</p>
      <p>Año de lanzamiento: {seriesPopup.releaseYear}</p>
      <img src={seriesPopup.images['Poster Art'].url} alt={seriesPopup.title} />
    </div>
  );
}

export default SeriesPopup;
