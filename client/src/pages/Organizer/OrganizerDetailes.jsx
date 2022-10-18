import React, { useContext, useEffect, useState } from 'react';
import styles from './OrganizerDetails.module.css';
import { Rating } from '@mui/material';
import { animateScroll as scroll } from 'react-scroll';
import { useNavigate, useParams } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import AboutOrganizer from '../../components/Organizer/AboutOrganizer.jsx';
import NextEvents from '../../components/Organizer/NextEvents.jsx';
import Opinions from '../../components/Organizer/Opinions.jsx';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { AuthContext } from '../../context/auth/AuthContext';
import { getEvents } from '../../redux/actions';

const OrganizerDetails = () => {

  const id = useParams().id;
  const [component, setComponent] = useState('');
  const [nextEvent, setNextEvent] = useState({});
  const [conversation, setConversation] = useState({});
  const { user, logged } = useContext(AuthContext);
  const navigate = useNavigate();
  const allEvents = useSelector((state) => state.events);
  console.log('allEvents:', allEvents);
  const userDetail = allEvents.filter((e) => e.organizer._id === id)[0];
  console.log('userDetails:', userDetail);

  useEffect(() => {
    obtenerDatos();
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    setConversation({
      senderId: user.uid,
      receiverId: id,
    })
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch('https://plataformaeventos-production-6111.up.railway.app/users/' + id);
    const json = await data.json();
    setNextEvent(json);
  } 

  const handleClickMessages = (e) => {
    e.preventDefault();
    axios.post('https://plataformaeventos-production-6111.up.railway.app/conversation/create', conversation)
    .then((response) => {
      navigate('/user/message');
    });
  }

  const handleAlert = (e) => {
    e.preventDefault();
    alert('Debes estar registrado para poder enviar mensajes');
  }

  const handleInput = (e) => {
    const name = e.target.name;
    if (name === 'AboutOrganizer')
      setComponent(<AboutOrganizer userDetail={userDetail.organizer} />);
    if (name === 'NextEvents')
      setComponent(<NextEvents nextEvent={nextEvent} />);
    if (name === 'Opinions') setComponent(<Opinions userDetail={userDetail.organizer} />);
  };

  return (
    <div className={`${styles.container} `}>
      {userDetail?
      <div>
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
        <button className={styles.message} onClick={logged === true ? handleClickMessages: handleAlert}>
          Enviar Mensaje
        </button>
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
    :''}
    </div>
  );
};

export default OrganizerDetails;
