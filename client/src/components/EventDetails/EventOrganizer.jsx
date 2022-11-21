import React, { useContext, useEffect, useState } from 'react';
import styles from './EventOrganizer.module.css';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Link, useNavigate } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../context/auth/AuthContext';
import { stateContext } from '../../context/state/stateContext';
import swal from 'sweetalert';

const EventOrganizer = ({ id }) => {
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
    const array = conversa.map((e) => e.members).flat();
    const json = array.includes(eventDetails.organizer._id);
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

  const handleClickEventsOrganizer = async (e) => {
    e.preventDefault();
    setResult(eventDetails.organizer._id);
    navigate('/resulteventsorganizer/');
  };

  return (
    <div>
      {eventDetails ? (
        <div className={styles.container}>
          <div className={styles.containerTop}>
            <p className={styles.title}>Organizador</p>
            <div className={styles.btn}>
              <LocalPostOfficeIcon sx={{ fontSize: '13px', color: '#d53e27' }} />
              <button className={styles.button} onClick={conversation.senderId ? handleClickMessages : handleAlert}>
                Enviar Mensaje
              </button>
            </div>
          </div>
          <div className={styles.orgCont}>
            <Link className={styles.link} to={`/sobre-el-organizador/${eventDetails.organizer._id}`}>
              <img className={styles.orgImg} src={eventDetails.organizer.userpicture} alt='N' />
            </Link>

            <div className={styles.orgSubCont}>
              <p className={styles.orgName}>{eventDetails.organizer.name}</p>
              <p className={styles.orgMembership}>Miembro desde {eventDetails.organizer.membership}</p>
            </div>
          </div>
          <p className={styles.orgDescription}>{eventDetails.organizer.descriptionOrganizer}</p>
          <button className={styles.button2} onClick={handleClickEventsOrganizer}>
            Otros eventos organizados por {eventDetails.organizer.name}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default EventOrganizer;
