import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Series.css';

function Series() {
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [filterYear, setFilterYear] = useState(''); // Estado para el filtro por año
  const seriesPerPage = 30;

  useEffect(() => {
    fetch('/sample.json') 
      .then(response => response.json())
      .then(data => {
        const seriesData = data.entries.filter(entry => entry.programType === "series");
        setSeries(seriesData);
      });
  }, []);

  const indexOfLastSerie = currentPage * seriesPerPage;
  const indexOfFirstSerie = indexOfLastSerie - seriesPerPage;

  // Aplica el filtro por año antes de paginar las series
  const filteredSeries = series.filter(serie => {
    if (!filterYear) return true; // Si no hay filtro de año, muestra todas las series
    return serie.releaseYear === parseInt(filterYear); // Parsea el año como entero antes de comparar
  });

  const currentSeries = filteredSeries.slice(indexOfFirstSerie, indexOfLastSerie);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleYearFilterChange = event => {
    setFilterYear(event.target.value); // Actualiza el estado del filtro de año
  };

  return (
    <div className="App">
      {/* Input para filtrar por año */}
      <input
        className="filter-year-input"
        type="text"
        value={filterYear}
        onChange={handleYearFilterChange}
        placeholder="Filtrar por año de lanzamiento"
      />

      <div className="series-list">
        {currentSeries.map(serie => (
          <div key={serie.title} className="serie-item" onClick={() => setSelectedSerie(serie)}>
            <img 
              src={serie.images['Poster Art'].url} 
              alt={serie.title} 
              className="serie-image"
            />
            <div className="serie-info">
              <Link to={`/serie/${encodeURIComponent(serie.title)}`} className="serie-title">
                {serie.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(Math.ceil(filteredSeries.length / seriesPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Series;
