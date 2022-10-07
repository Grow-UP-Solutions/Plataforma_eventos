import React from 'react';
import styles from './EventOrganizer.module.css';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector } from "react-redux";

const EventOrganizer = ({ id, conversation }) => {

  const navigate = useNavigate();
  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];

  const handleClickMessages = (e) => {
    e.preventDefault();
    axios.post('https://plataformaeventos-production-6111.up.railway.app/conversation/create', conversation)
    .then((response) => {
      console.log('axios response', response.data);
    });
    navigate('/user/message');
  }

  const handleAlert = (e) => {
    e.preventDefault();
    alert('Debes estar registrado para poder enviar mensajes');
  }
 
  return (
    <div>
      {eventDetails?
    <div className={styles.container}>
      <div className={styles.containerTop}>
        <p className={styles.title}>Organizador</p>
        <div className={styles.btn}>
          <LocalPostOfficeIcon sx={{ fontSize: '13px', color: '#d53e27' }} />
          <button className={styles.button} onClick={conversation.senderId ? handleClickMessages: handleAlert}>
            Enviar Mensaje
          </button>
        </div>
      </div>
      <div className={styles.orgCont}>
      <Link
          className={styles.link}
          to={`/organizerDetails/${eventDetails.organizer._id}`}
        >
        <img className={styles.orgImg} src={eventDetails.organizer.picture} alt="N" />
        </Link>

        <div className={styles.orgSubCont}>
          <p className={styles.orgName}>{eventDetails.organizer.name}</p>
          <p className={styles.orgMembership}>
            Miembro desde {eventDetails.organizer.membership}
          </p>
        </div>
      </div>
      <p className={styles.orgDescription}>
        {eventDetails.organizer.descriptionOrganizer}
      </p>
      <button className={styles.button2}>
        Otros eventos organizados por {eventDetails.organizer.name}
      </button>
    </div>
      :''}

      </div>
  );
};

export default EventOrganizer;
