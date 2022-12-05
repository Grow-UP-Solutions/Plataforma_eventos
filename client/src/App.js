import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import './App.css';
import { Footer, Login, Navbar } from './components';
import Bills from './components/Finance/Bills';
import Notifications from './components/Notifications/Notifications';
import { AuthContext } from './context/auth';
import { UIContext } from './context/ui';
import {
  Cart,
  CategoriesResult,
  ChangePassword,
  Contacto,
  EventCreate,
  EventCreateForm,
  EventEdit,
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
  MyEventsAsistentes,
  MercadoPago,
  MercadoPagoFail
} from './pages';
import EventsOrganizerResult from './pages/EventsOrganizerResult/EventsOrganizerResult';
import News from './pages/News/News';
import PanelPrivacy from './pages/PanelPrivacy/PanelPrivacy';
import Press from './pages/Press/Press';
import { getEvents } from './redux/actions';
import RutaPrivada from './router/RutaPrivada';

function App() {

  const [navBar, setNavBar] = useState(false);
  const dispatch = useDispatch();
  const { isMenuLoginOpen, getCategories, getAllEvents } = useContext(UIContext);
  const { checkAuthToken } = useContext(AuthContext);

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
      <Navbar upper={navBar} />
      <Routes>

        {/* RUTAS PUBLICAS */}
        <Route path='/' element={<Home handleNav={setNavBar} />} />
        <Route path='/contactanos' element={<Contacto />} />
        <Route path='/preguntas-frecuentes' element={<Faq />} />
        <Route path='/sobre-el-organizador/:id' element={<Organizer />} />
        <Route path='/detalles-del-evento/:id' element={<EventDetails />} />
        <Route path='/resultados-de-busqueda/:data' element={<SearchResult />} />
        <Route path='/registrate' element={<Register />} />
        <Route path='/organiza-un-evento/beneficios' element={<EventCreate />} />
        <Route path='/resultado-categoria/:data' element={<CategoriesResult />} />
        <Route path='/empleo' element={<WorkWithUs />} />
        <Route path='/noticias' element={<News />} />
        <Route path='/prensa' element={<Press />} />
        <Route path='/empleo/aplicar/:work' element={<WorkWithUsForm />} />
        <Route path='/privacidad' element={<PanelPrivacy />} />
        <Route path='/seguridad' element={<PanelPrivacy />} />
        <Route path='/terminos' element={<PanelPrivacy />} />
        <Route path='/resultado-eventos-organizador/:id' element={<EventsOrganizerResult />} />
        <Route path={'/mercadoPago/success'} element={<MercadoPago />} />
<<<<<<< HEAD
        <Route path='/admin/check-solicitud-organizador/:token' element={<CheckSolicitudOrganizer />} />
        <Route path='/verificarmail/:path' element={<Verification />} />
        <Route path='/cambiar-password/:token' element={<ChangePassword />} />
=======
        <Route path={'/mercadoPago/fail'} element={<MercadoPagoFail />} />

>>>>>>> Guille

        {/* RUTAS PRIVADAS */}
        <Route path='/oganiza-un-evento' 
          element={
            <RutaPrivada>
              <EventCreateForm />
            </RutaPrivada>
          } 
        />
        
        <Route path='/oganiza-un-evento-editar/:id' 
          element={
            <RutaPrivada>
              <EventEdit />
            </RutaPrivada>
          } 
        />
        
        <Route path='/cart/:id' 
          element={
            <RutaPrivada>
              <Cart />
            </RutaPrivada>
          } 
        />

        <Route path='/payment' 
          element={
            <RutaPrivada>
              <Payment />
            </RutaPrivada>
          } 
        />

        <Route path='/usuario/:option' 
          element={
            <RutaPrivada>
              <UserPage />
            </RutaPrivada>
          }
        />

        <Route path='/usuario/mensajes' 
          element={
            <RutaPrivada>
              <Messages />
            </RutaPrivada>
          }
        />

        <Route path='/usuario/notificaciones' 
          element={
            <RutaPrivada>
              <Notifications />
            </RutaPrivada>
          } 
        />

        <Route path='/facturas' 
          element={
            <RutaPrivada>
              <Bills />
            </RutaPrivada>
          } 
        />

        <Route path='/edita-un-evento' 
          element={
            <RutaPrivada>
              <EventEdit />
            </RutaPrivada>
          } 
        />

        <Route path='/usuario/asistentes-al-evento/:eventId/:dateId' 
          element={
            <RutaPrivada>
              <MyEventsAsistentes />
            </RutaPrivada>
          } 
        />

      </Routes>

      <div className='container_footer'>
        <Footer />
      </div>
      <div className='footer_extra'>
        <p>© 2019 LO QUE QUIERO HACER S.A.S</p>
      </div>
      {isMenuLoginOpen && <Login />}
    </div>
  );
}

export default App;
