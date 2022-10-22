import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import './App.css';
import { Footer, Login, Navbar } from './components';
import Bills from './components/Finance/Bills';
import Notifications from './components/Notifications/Notifications';
import { AuthContext } from './context/auth';
import { Data } from './context/state/stateProvider';
import { UIContext } from './context/ui';
import {
  Cart,
  CategoriesResult,
  ChangePassword,
  Contacto,
  EventCreate,
  EventCreateForm,
  EventDetails,
  Faq,
  Home,
  Messages,
  Organizer,
  Payment,
  Register,
  SearchResult,
  UserPage,
  Verification,
  WorkWithUs,
  WorkWithUsForm,
  CheckSolicitudOrganizer,
} from './pages';
import EventEdit from './pages/EventEdit/EventEdit';
import EventsOrganizerResult from './pages/EventsOrganizerResult/EventsOrganizerResult';
import PanelPrivacy from './pages/PanelPrivacy/PanelPrivacy';
import { getEvents } from './redux/actions';

function App() {
  const [navBar, setNavBar] = useState(false);
  const dispatch = useDispatch();
  const { isMenuLoginOpen, getCategories, getAllEvents } = useContext(UIContext);
  const { checkAuthToken, checkUserLocalStorage } = useContext(AuthContext);

  /* useEffect(() => {
    checkUserLocalStorage();
  }, []); */

  useEffect(() => {
    checkAuthToken();
  }, []);

  useEffect(() => {
    getCategories();
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    dispatch(getEvents());
    getAllEvents();
  }, []);

  return (
    <div className='App'>
      <Data>
        <Navbar upper={navBar} />
        <Routes>
          <Route path='/' element={<Home handleNav={setNavBar} />} />
          <Route path='/contactanos' element={<Contacto />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/organizerDetails/:id' element={<Organizer />} />
          <Route path='/eventdetails/:id' element={<EventDetails />} />
          <Route path='/cart/:id' element={<Cart />} />
          <Route path='/search' element={<SearchResult />} />
          <Route path='/registrate' element={<Register />} />
          <Route path='/organiza-un-evento' element={<EventCreate />} />
          <Route path='/oganiza-un-evento-form' element={<EventCreateForm />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/categories' element={<CategoriesResult />} />
          <Route path='/workWithUs' element={<WorkWithUs />} />
          <Route path='/workWithUs/form/:work' element={<WorkWithUsForm />} />
          <Route path='/user/profile' element={<UserPage />} />
          <Route path='/privacy' element={<PanelPrivacy />} />
          <Route path='/user/message' element={<Messages />} />
          <Route path='/user/notifications' element={<Notifications />} />
          <Route path='/bills' element={<Bills />} />
          <Route path='/verificarmail/:path' element={<Verification />} />
          <Route path='/resulteventsorganizer' element={<EventsOrganizerResult />} />
          <Route path='/cambiarContrasenia/:token' element={<ChangePassword />} />
          <Route path='/edita-un-evento' element={<EventEdit />} />
          <Route path='/admin/check-solicitud-organizador/:token' element={<CheckSolicitudOrganizer />} />
        </Routes>
        <div className='container'>
          <Footer />
        </div>
        <div className='footer_extra'>
          <p>© 2019 LO QUE QUIERO HACER S.A.S</p>
        </div>
        {isMenuLoginOpen && <Login />}
      </Data>
    </div>
  );
}

export default App;
