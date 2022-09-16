import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './components/Home/Home';
import Contacto from './pages/Contacto/Contacto';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import EventDetails from './components/EventDetails/EventDetails';
import Cart from './pages/Cart/Cart';
import Faq from './pages/FAQ/Faq';
import SearchResut from './components/SearchResult/SearchResut';
import { Data } from './context/Context';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <Data>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactanos" element={<Contacto />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/eventdetails/:id" element={<EventDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResut />} />
        </Routes>
        <div className="container">
          <Footer />
        </div>
        <div className="footer_extra">
          <p>© 2019 LO QUE QUIERO HACER S.A.S</p>
        </div>
      </Data>
    </div>
  );
}

export default App;
