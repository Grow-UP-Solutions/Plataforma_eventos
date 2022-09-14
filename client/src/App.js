import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home/Home';
import Contacto from './pages/Contacto/Contacto';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import EventDetails from './components/EventDetails/EventDetails';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactanos" element={<Contacto />} />
        <Route path="/eventdetails/:id" element={<EventDetails />} />
      </Routes>
      <div className="container">
        <Footer />
      </div>
      <div className="footer_extra">
        <p>© 2019 LO QUE QUIERO HACER S.A.S</p>
      </div>
    </div>
  );
}

export default App;
