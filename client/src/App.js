import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import './App.css';
import {
  Cart,
  Contacto,
  Faq,
  Home,
  Ingresa,
  EventCreate,
  EventCreateForm,
  Organizer,
  Payment,
  Register,
  SearchResult,
  WorkWithUs,
  WorkWithUsForm,
  EventDetails,
  CategoriesResult,
  User,
  Message,
} from './pages';
import { Footer, Login, Navbar } from './components';
import { Data } from './context/state/stateProvider';
import PanelPrivacy from './pages/PanelPrivacy/PanelPrivacy';
import Notifications from './components/Notifications/Notifications';
import Bills from './components/Finance/Bills';
import { UIContext } from './context/ui';
import { useDispatch } from 'react-redux';
import { getCategories, getEvents, getUsers } from './redux/actions';

function App() {

  const [navBar, setNavBar] = useState(false);
  const dispatch = useDispatch();
  const { isMenuLoginOpen } = useContext(UIContext);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getCategories());
    dispatch(getUsers());
    scroll.scrollToTop();
  }, []);

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
          <Route path="/organiza-un-evento" element={<EventCreate />} />
          <Route path="/oganiza-un-evento-form" element={<EventCreateForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/categories" element={<CategoriesResult />} />
          <Route path="/workWithUs" element={<WorkWithUs />} />
          <Route path="/workWithUs/form/:work" element={<WorkWithUsForm />} />
          <Route path="/user/profile" element={<User />} />
          <Route path="/privacy" element={<PanelPrivacy />} />
          <Route path="/user/message" element={<Message />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bills" element={<Bills />} />
        </Routes>
        <div className="container">
          <Footer />
        </div>
        <div className="footer_extra">
          <p>© 2019 LO QUE QUIERO HACER S.A.S</p>
        </div>
        {isMenuLoginOpen && <Login />}
      </Data>
    </div>
  );
}

export default App;
