import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Peliculas.css';

function Peliculas() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filterYear, setFilterYear] = useState(''); // Estado para el filtro por año
  const moviesPerPage = 30;

  useEffect(() => {
    fetch('/sample.json') 
      .then(response => response.json())
      .then(data => {
        const moviesData = data.entries.filter(entry => entry.programType === "movie");
        setMovies(moviesData);
      });
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  // Aplica el filtro por año antes de paginar las películas
  const filteredMovies = movies.filter(movie => {
    if (!filterYear) return true; // Si no hay filtro de año, muestra todas las películas
    return movie.releaseYear === parseInt(filterYear); // Parsea el año como entero antes de comparar
  });

  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

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

      <div className="movie-list">
        {currentMovies.map(movie => (
          <div key={movie.title} className="movie-item" onClick={() => setSelectedMovie(movie)}>
            <img 
              src={movie.images['Poster Art'].url} 
              alt={movie.title} 
              className="movie-image"
            />
            <div className="movie-info">
              <Link to={`/pelicula/${encodeURIComponent(movie.title)}`} className="movie-title">
                {movie.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(Math.ceil(filteredMovies.length / moviesPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Peliculas;
