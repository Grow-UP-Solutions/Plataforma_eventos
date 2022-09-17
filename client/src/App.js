import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import './App.css';

import {
  Cart,
  Contacto,
  Faq,
  Home,
  Ingresa,
  OrganizaUnEvento,
  Organizer,
  Payment,
  Register,
  SearchResult,
  WorkWithUs,
  WorkWithUsForm,
  EventDetails,
  CategoriesResult,
} from './pages';

import { Footer, Navbar } from './components';

import { Data } from './context/Context';

function App() {
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
          <Route path="/organizerDetails/:id" element={<Organizer />} />
          <Route path="/eventdetails/:id" element={<EventDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/ingresa" element={<Ingresa />} />
          <Route path="/registrate" element={<Register />} />
          <Route path="/organiza-un-evento" element={<OrganizaUnEvento />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/categories" element={<CategoriesResult />} />
          <Route path="/workWithUs" element={<WorkWithUs />} />
          <Route path="/workWithUs/form/:work" element={<WorkWithUsForm />} />
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
