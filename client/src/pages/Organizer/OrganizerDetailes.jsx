import React, { useEffect } from 'react';
import styles from './OrganizerDetails.module.css';
import { Rating } from '@mui/material';
import { animateScroll as scroll } from 'react-scroll';
import { useParams } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import AboutOrganizer from '../../components/Organizer/AboutOrganizer.jsx';
import NextEvents from '../../components/Organizer/NextEvents.jsx';
import Opinions from '../../components/Organizer/Opinions.jsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const OrganizerDetails = () => {

  const id = useParams().id;
  const [component, setComponent] = useState('');
  const events = useSelector((state) => state.events);
  const userDetail = events.filter((e) => e.organizer._id === id)[0];
  console.log('userdetail:', userDetail);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    if (name === 'AboutOrganizer')
      setComponent(<AboutOrganizer userDetail={userDetail.organizer} />);
    if (name === 'NextEvents')
      setComponent(<NextEvents userDetail={userDetail.organizer} />);
    if (name === 'Opinions') setComponent(<Opinions userDetail={userDetail.organizer} />);
  };

  return (
    <div className={`${styles.container} `}>
      <div className={styles.top}></div>
      <img className={styles.img} src={userDetail.organizer.picture} alt="N" />
      <p className={styles.name}>{userDetail.organizer.name}</p>
      <Rating
        className={styles.rating}
        name="read-only"
        value={userDetail.organizer.rating}
        readOnly
      />
      <div className={styles.containerDir}>
        <IoLocationOutline className={styles.icon} />
        <p className={styles.direction}>{userDetail.organizer.direction}</p>
      </div>
      <p className={styles.member}>Miembor desde {userDetail.organizer.membership}</p>
      <div className={styles.containerMess}>
        <LocalPostOfficeIcon sx={{ fontSize: '13px', color: '#d53e27' }} />
        <button className={styles.message}>Enviar Mensaje</button>
      </div>
      <div className={styles.containerButtons}>
        <button
          className={styles.btn}
          name="AboutOrganizer"
          onClick={handleInput}
        >
          Sobre El Organizador
        </button>
        <div className={styles.vLine}></div>
        <button className={styles.btn} name="NextEvents" onClick={handleInput}>
          Próximos Eventos
        </button>
        <div className={styles.vLine}></div>
        <button className={styles.btn} name="Opinions" onClick={handleInput}>
          Opiniones
        </button>
      </div>
      <div>
        <div className={styles.containerSection}>{component}</div>
      </div>
    </div>
  );
};

export default OrganizerDetails;
