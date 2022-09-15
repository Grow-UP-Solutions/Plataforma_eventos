import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import Contacto from './pages/Contacto/Contacto';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import EventDetails from './components/EventDetails/EventDetails';
import OrganizerDetails from './components/Organizer/OrganizerDetailes';
import Cart from './pages/Cart/Cart';
import OrganizaUnEvento from './components/OrganizaUnEvento/OrganizaUnEvento';
import Ingresa from './components/Ingresa/Ingresa';
import Register from './components/Register/Register';


function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [navBar, setNavBar] = useState(false);

  console.log(navBar);

  return (
    <div className="App">
      <Navbar upper={navBar} />
      <Routes>
        <Route path="/" element={<Home handleNav={setNavBar} />} />
        <Route path="/contactanos" element={<Contacto />} />
        <Route path="/eventdetails/:id" element={<EventDetails />} />
        <Route path="/organizerDetails/:id" element={<OrganizerDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ingresa" element={<Ingresa />} />
        <Route path="/registrate" element={<Register />} />
        <Route path="/organiza-un-evento" element={<OrganizaUnEvento />} />
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
