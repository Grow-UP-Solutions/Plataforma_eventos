import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Rating } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import swal from 'sweetalert';
import { format, register } from 'timeago.js';
import eventsApi from '../../axios/eventsApi';
import { Loading } from '../../components';
import AboutOrganizer from '../../components/Organizer/AboutOrganizer.jsx';
import NextEvents from '../../components/Organizer/NextEvents.jsx';
import Opinions from '../../components/Organizer/Opinions.jsx';
import { AuthContext } from '../../context/auth/AuthContext';
import { stateContext } from '../../context/state/stateContext';
import { UIContext } from '../../context/ui';
import styles from './OrganizerDetails.module.css';

const localeFunc = (number, index, total_sec) => {
  return [
    ['ahora', 'en un rato'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'en %s horas'],
    ['hace 1 día', 'en 1 día'],
    ['hace %s días', 'en %s días'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['hace 1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años'],
  ][index];
};
register('es_ES', localeFunc);

const OrganizerDetails = () => {
  const id = useParams().id;
  const { user, logged } = useContext(AuthContext);
  const { getEffectRatingOrganizer, ratingOrg } = useContext(UIContext);
  const { conversa } = useContext(stateContext);
  const navigate = useNavigate();
  const [component, setComponent] = useState(null);
  const [nextEvent, setNextEvent] = useState({});
  const [conversation, setConversation] = useState({});
  const [style, setStyle] = useState('');
  const [load, setLoad] = useState(true);
  const [userDetail, setUserDetail] = useState({
    organizer: {},
  });
  const [eventsFromOrg , setEventsFromOrg] = useState([])

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    obtenerDatos();
  }, [user]);

  // useEffect(() => {
  //   obtenerDatosLog();
  // }, [user]);

  useEffect(() => {
    setConversation({
      senderId: user.uid,
      receiverId: id,
    });
  }, []);

  

  const obtenerDatos = async () => {
    const data = await eventsApi.get('/users/' + id);
    const json = data.data;
    

    const eventsUserLog = data.data.myEventsCreated.filter(event => event.generalBuyers.filter(
      buyer=>buyer === user.uid))
   
    
    
    setNextEvent(json);
    getEffectRatingOrganizer(json.rating);
    setUserDetail({
      organizer: json,
    });
    setComponent(<AboutOrganizer userDetail={json.descriptionOrganizer} />);
    setStyle('aboutOrganizer');
    setLoad(false);
    setEventsFromOrg(eventsUserLog)
  };

  //Filtrar y ver si hay eventos comprados a este org//

  // const obtenerDatosLog = async () => {

  //   const dataLog = await eventsApi.get('/users/' + user.uid);
  //   const eventsBookedOrg = dataLog.data.myEventsBooked.filter(event => event.organizer === id)
  //   setEventsFromOrg(eventsBookedOrg)
  //   console.log('dataLog.data',dataLog.data)

  // }

  

  const handleClickMessages = (e) => {
    e.preventDefault();
    const array = conversa.map((e) => e.members).flat();
    const json = array.includes(id);
    if (conversation.senderId === conversation.receiverId) {
      swal({
        title: 'Mismo usuario de conversación',
        icon: 'warning',
        button: 'Cerrar',
        dangerMode: true,
      });
    } else if (json === true) {
      navigate('/usuario/mensajes');
    } else {
      eventsApi.post('/conversation/create', conversation).then((response) => {
        navigate('/usuario/mensajes');
      });
    }
  };

  const handleAlert = (e) => {
    e.preventDefault();
    swal({
      title: 'Debes estar registrado para poder enviar un mensaje',
      icon: 'warning',
      button: 'Cerrar',
      dangerMode: true,
    });
  };

  const handleInput = (e) => {
    const name = e.target.name;
    if (name === 'AboutOrganizer') {
      setComponent(<AboutOrganizer userDetail={userDetail.organizer.descriptionOrganizer} />);
      setStyle('aboutOrganizer');
    }
    if (name === 'NextEvents') {
      setComponent(<NextEvents nextEvent={nextEvent} />);
      setStyle('nextEvents');
    }
    if (name === 'Opinions') {
      setComponent(<Opinions userDetail={userDetail.organizer}  eventsFromOrg={eventsFromOrg[0].generalBuyers[0]} />);
      setStyle('opinions');
    } else {
      console.log('growup');
    }
  };

  if (load) {
    return <Loading />;
  } else {
    return (
      <div className={`${styles.container} `}>
        {userDetail ? (
          <div>
            <div className={styles.top}></div>
            <img className={styles.img} src={userDetail.organizer.userpicture} alt='organizer' />
            <p className={styles.name}>{userDetail.organizer.name}</p>
            <Rating
              className={styles.rating}
              name='half-rating'
              precision={0.5}
              value={ratingOrg}
              readOnly
              sx={{ fontSize: 18 }}
            />
            <div className={styles.containerDir}>
              <IoLocationOutline className={styles.icon} />
              <p className={styles.direction}>
                {userDetail.organizer.direction} - {userDetail.organizer.city}
              </p>
            </div>

            <p className={styles.member}>Miembro desde {format(userDetail.organizer.createdAt, 'es_ES')}</p>


            {eventsFromOrg !== undefined &&

              eventsFromOrg.length>0 ?
              <div className={styles.containerMess}>
                <LocalPostOfficeIcon sx={{ fontSize: '1.6rem', color: '#d53e27' }} />
                <button className={styles.message} onClick={logged === true ? handleClickMessages : handleAlert}>
                  Enviar Mensaje
                </button>
              </div>
              :''
            }
         

            <div className={styles.containerButtons}>
              <button
                className={style === 'aboutOrganizer' ? styles.btn_c : styles.btn}
                name='AboutOrganizer'
                onClick={handleInput}
              >
                Sobre El Organizador
              </button>
              <div className={styles.vLine}></div>
              <button
                className={style === 'nextEvents' ? styles.btn_c : styles.btn}
                name='NextEvents'
                onClick={handleInput}
              >
                Próximos Eventos
              </button>
              <div className={styles.vLine}></div>
              <button
                className={style === 'opinions' ? styles.btn_c : styles.btn}
                name='Opinions'
                onClick={handleInput}
              >
                Opiniones
              </button>
            </div>

            <div>
              <div className={styles.containerSection}>{component}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
};

export default OrganizerDetails;
