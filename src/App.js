import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/Inicio.css';
import './css/Peliculas.css';
import './css/Series.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Peliculas from './pages/Peliculas';
import Series from './pages/Series';
import MoviePopup from './pages/MoviePoput';
import SeriesPopup from './pages/SeriesPopup';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/series" element={<Series />} />
          <Route path="/pelicula/:title" element={<MoviePopup />} /> {/* Ruta para los detalles de la película */}
          <Route path="/serie/:title" element={<SeriesPopup />} /> {/* Ruta para los detalles de la serie*/}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
