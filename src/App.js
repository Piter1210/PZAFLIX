import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/Inicio.css';
import './css/Peliculas.css' ;
import'./css/Series.css';// Supongo que tienes un archivo App.css donde defines estilos generales
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Peliculas from './pages/Peliculas';
import Series from './pages/Series';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Peliculas" element={<Peliculas />} />
          <Route path="/Series" element={<Series />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
