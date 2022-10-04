import React from 'react';
import styles from './EventOrganizer.module.css';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const EventOrganizer = ({ id }) => {

  console.log('id:',id)

  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];
 
  return (
    <div>
      {eventDetails?
    <div className={styles.container}>
      <div className={styles.containerTop}>
        <p className={styles.title}>Organizador</p>
        <div className={styles.btn}>
          <LocalPostOfficeIcon sx={{ fontSize: '13px', color: '#d53e27' }} />
          <button className={styles.button}>Enviar Mensaje</button>
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
