import React, { useContext, useEffect, useState } from 'react';
import eventsApi from '../../axios/eventsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { AuthContext } from '../../context/auth/AuthContext';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { Rating } from '@mui/material';
import { IoLocationOutline } from 'react-icons/io5';
import AboutOrganizer from '../../components/Organizer/AboutOrganizer.jsx';
import NextEvents from '../../components/Organizer/NextEvents.jsx';
import Opinions from '../../components/Organizer/Opinions.jsx';
import styles from './OrganizerDetails.module.css';
import swal from 'sweetalert';
import { UIContext } from '../../context/ui';

const OrganizerDetails = () => {

  const id = useParams().id;
  const { user, logged } = useContext(AuthContext);
  const { getEffectRatingOrganizer, ratingOrg } = useContext(UIContext);
  const navigate = useNavigate();
  const [component, setComponent] = useState(null);
  const [nextEvent, setNextEvent] = useState({});
  const [conversation, setConversation] = useState({});
  const [style, setStyle] = useState('');
  const [userDetail, setUserDetail] = useState({
    organizer: {},
  });

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    obtenerDatos();
  }, []);

  useEffect(() => {
    setConversation({
      senderId: user.uid,
      receiverId: id,
    });
  }, []);   

  const obtenerDatos = async () => {
    const data = await eventsApi.get('/users/' + id);
    const json = data.data;
    setNextEvent(json);
    getEffectRatingOrganizer(json.rating);
    setUserDetail({
      organizer: json,
    });
    setComponent(<AboutOrganizer userDetail={json.descriptionOrganizer} />)
    setStyle('aboutOrganizer');
  };

  const handleClickMessages = (e) => {
    e.preventDefault();
    if (conversation.senderId === conversation.receiverId) {
      swal({
        title: 'Mismo usuario de conversación',
        icon: 'warning',
        button: 'Cerrar',
        dangerMode: true,
      });
    }
    else {
      eventsApi.post('/conversation/create', conversation)
      .then((response) => {
        navigate('/user/message');
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
      setComponent(<Opinions userDetail={userDetail.organizer} />);
      setStyle('opinions');
    }
    else {
      console.log('growup');
    }
  };

  return (
    <div className={`${styles.container} `}>
      {userDetail ? (
        <div>
          <div className={styles.top}></div>
          <img
            className={styles.img}
            src={userDetail.organizer.userpicture}
            alt='N'
          />
          <p className={styles.name}>{userDetail.organizer.name}</p>
          <Rating
            className={styles.rating}
            name='read-only'
            value={ratingOrg}
            readOnly
            sx={{ fontSize: 18 }}
          />
          <div className={styles.containerDir}>
            <IoLocationOutline className={styles.icon} />
            <p className={styles.direction}>{userDetail.organizer.direction}</p>
          </div>
          <p className={styles.member}>
            Miembro desde {userDetail.organizer.membership}
          </p>
          <div className={styles.containerMess}>
            <LocalPostOfficeIcon sx={{ fontSize: '1.6rem', color: '#d53e27' }} />
            <button
              className={styles.message}
              onClick={logged === true ? handleClickMessages : handleAlert}
            >
              Enviar Mensaje
            </button>
          </div>
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
              className={style === 'nextEvents' ? styles.btn_c :  styles.btn}
              name='NextEvents'
              onClick={handleInput}
            >
              Próximos Eventos
            </button>
            <div className={styles.vLine}></div>
            <button
              className={style === 'opinions' ? styles.btn_c :  styles.btn}
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
};

export default OrganizerDetails;
