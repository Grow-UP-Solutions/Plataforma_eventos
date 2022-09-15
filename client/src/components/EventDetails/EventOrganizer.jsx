import React from 'react';
import styles from './EventOrganizer.module.css';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

const EventOrganizer = ({ event }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerTop}>
        <p className={styles.title}>Organizador</p>
        <div className={styles.btn}>
          <LocalPostOfficeIcon sx={{ fontSize: '13px', color: '#d53e27' }} />
          <button className={styles.button}>Enviar Mensaje</button>
        </div>
      </div>
      <div className={styles.orgCont}>
        <img className={styles.orgImg} src={event.organizer.picture} alt="N" />
        <div className={styles.orgSubCont}>
          <p className={styles.orgName}>{event.organizer.name}</p>
          <p className={styles.orgMembership}>
            Miembro desde {event.organizer.membership}
          </p>
        </div>
      </div>
      <p className={styles.orgDescription}>
        {event.organizer.descriptionOrganizer}
      </p>
      <button className={styles.button2}>
        Otros eventos organizados por {event.organizer.name}
      </button>
    </div>
  );
};

export default EventOrganizer;
