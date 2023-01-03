import React, { useContext, useEffect, useState } from 'react';
import styles from './EventOrganizer.module.css';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Link, useNavigate } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { format, register } from 'timeago.js';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../context/auth/AuthContext';
import { stateContext } from '../../context/state/stateContext';
import swal from 'sweetalert';

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

const EventOrganizer = ({ id, userBuyOrg }) => {
  const [conversation, setConversation] = useState({});
  const { user } = useContext(AuthContext);
  const { setResult, conversa } = useContext(stateContext);
  const navigate = useNavigate();
  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];

  useEffect(() => {
    const addUserId = async () => {
      try {
        const res = await eventsApi.get('/users/' + eventDetails.organizer._id);
        setConversation({
          senderId: user.uid,
          receiverId: res.data._id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    addUserId();
  }, []);

  const handleClickMessages = (e) => {
    e.preventDefault();
    if (conversation.senderId === conversation.receiverId) {
      swal({
        title: 'Mismo usuario de conversación',
        icon: 'warning',
        button: 'Cerrar',
        dangerMode: true,
      });
    } else {
      eventsApi.post('/conversation/create', conversation).then((response) => {
        navigate(`/usuario/mensajes/${response.data._id}`);
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

  const handleClickEventsOrganizer = async (e) => {
    e.preventDefault();
    const data = eventDetails.organizer._id;
    setResult(data);
    navigate('/resultado-eventos-organizador/' + id);
  };

  return (
    <div>
      {eventDetails ? (
        <div className={styles.container}>
          <div className={styles.containerTop}>
            <p className={styles.title}>Organizador</p>
            {userBuyOrg !== undefined && userBuyOrg.length > 0 ? (
              <div className={styles.btn}>
                <LocalPostOfficeIcon sx={{ fontSize: '13px', color: '#d53e27' }} />
                <button className={styles.button} onClick={conversation.senderId ? handleClickMessages : handleAlert}>
                  Enviar Mensaje
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={styles.orgCont}>
            <Link className={styles.link} to={`/sobre-el-organizador/${eventDetails.organizer._id}`}>
              <img className={styles.orgImg} src={eventDetails.organizer.userpicture} alt='N' />
            </Link>

            <div className={styles.orgSubCont}>
              <p className={styles.orgName}>{eventDetails.organizer.name}</p>
              <p className={styles.orgMembership}>Miembro desde {format(eventDetails.organizer.createdAt, 'es_ES')}</p>
            </div>
          </div>
          <p className={styles.orgDescription}>{eventDetails.organizer.descriptionOrganizer}</p>
          <button className={styles.button2} onClick={handleClickEventsOrganizer}>
            Próximos eventos organizados por {eventDetails.organizer.name}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default EventOrganizer;
