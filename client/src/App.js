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
import Faq from './pages/FAQ/Faq';
import SearchResut from './components/SearchResult/SearchResut';
import { Data } from './context/Context';
import OrganizaUnEvento from './components/OrganizaUnEvento/OrganizaUnEvento';
import Ingresa from './components/Ingresa/Ingresa';
import Register from './components/Register/Register';
import Payment from './pages/Payment/Payment';
import CategoriesResult from './components/CategoriesResult/CategoriesResult';
import { animateScroll as scroll } from 'react-scroll';

function App() {
  
  const location = useLocation();

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const [navBar, setNavBar] = useState(false);

  return (
    <div className="App">
      <Data>
        <Navbar upper={navBar} />
        <Routes>
          <Route path="/" element={<Home handleNav={setNavBar} />} />
          <Route path="/contactanos" element={<Contacto />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/organizerDetails/:id" element={<OrganizerDetails />} />
          <Route path="/eventdetails/:id" element={<EventDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResut />} />
          <Route path="/ingresa" element={<Ingresa />} />
          <Route path="/registrate" element={<Register />} />
          <Route path="/organiza-un-evento" element={<OrganizaUnEvento />} />
          <Route path="/payment" element={<Payment />} />
         
          <Route path="/categories" element={<CategoriesResult />} />
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
