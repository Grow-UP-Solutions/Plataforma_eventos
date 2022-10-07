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
  Messages,
  Verification,
  ChangePassword,
} from './pages';
import EventEdit from './pages/EventEdit/EventEdit';
import { Footer, Login, Navbar } from './components';
import { Data } from './context/state/stateProvider';
import PanelPrivacy from './pages/PanelPrivacy/PanelPrivacy';
import Notifications from './components/Notifications/Notifications';
import Bills from './components/Finance/Bills';
import { UIContext } from './context/ui';
import { useDispatch } from 'react-redux';
import { getEvents } from './redux/actions';
import { AuthContext } from './context/auth';
import { Edit } from '@mui/icons-material';

function App() {
  const [navBar, setNavBar] = useState(false);
  const dispatch = useDispatch();
  const { isMenuLoginOpen, getCategories } = useContext(UIContext);
  const { checkAuthToken } = useContext(AuthContext);

  const { user, logged } = useContext(AuthContext);

  useEffect(() => {
    checkAuthToken();
  }, []);

  useEffect(() => {
    dispatch(getEvents());
    getCategories();
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
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/registrate" element={<Register />} />
          <Route path="/organiza-un-evento" element={<EventCreate />} />
          <Route path="/oganiza-un-evento-form" element={<EventCreateForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/categories" element={<CategoriesResult />} />
          <Route path="/workWithUs" element={<WorkWithUs />} />
          <Route path="/workWithUs/form/:work" element={<WorkWithUsForm />} />
          <Route path="/user/profile" element={<User />} />
          <Route path="/privacy" element={<PanelPrivacy />} />
          <Route path="/user/message" element={<Messages />} />
          <Route path="/user/notifications" element={<Notifications />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/verificarmail" element={<Verification />} />
          <Route path="/cambiarContrasenia" element={<ChangePassword />} />
          <Route path="/edita-un-evento" element={<EventEdit />} />
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
