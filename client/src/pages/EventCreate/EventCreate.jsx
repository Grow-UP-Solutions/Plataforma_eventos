import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import swal from 'sweetalert';
import icon1 from '../../assets/imgs/icon-eventcreate1.svg';
import icon2 from '../../assets/imgs/icon-eventcreate2.svg';
import icon3 from '../../assets/imgs/icon-eventcreate3.svg';
import icon4 from '../../assets/imgs/icon-eventcreate4.svg';
import icon5 from '../../assets/imgs/icon-eventcreate5.svg';
import icon6 from '../../assets/imgs/icon-eventcreate6.svg';
import eventsApi from '../../axios/eventsApi';
import { AuthContext } from '../../context/auth';
import { UIContext } from '../../context/ui';
import styles from './EventCreate.module.css';

const EventCreate = () => {
  const { toggleScreenLogin } = useContext(UIContext);
  const { user, logged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    getUserData();
  }, [user]);

  const [userData, setUserData] = useState({});

  useEffect(() => {}, [userData]);

  const getUserData = async () => {
    let userResult = {};
    if (user.uid) {
      userResult = await eventsApi.get(`/users/${user.uid}`);
      setUserData(userResult.data);
    }
  };

  useEffect(() => {
    if (userData.isOrganizer === true) {
      navigate('/organiza-un-evento');
    }
  }, [userData]);

  function ingreso(e) {
    if (logged && userData.isProfileCompleted === false) {
      swal({
        title: ' Por favor completa tu perfil para convertirte en Organizador',
        buttons: ['Cerrar', 'Continuar'],
      }).then((continuar) => {
        if (continuar) {
          navigate('/usuario/perfil');
        }
      });
    } else if (
      logged &&
      userData.isProfileCompleted === true &&
      userData.isOrganizer === false &&
      userData.isProccessingToOrganizer === false
    ) {
      swal({
        title: 'Aplica para ser organizador',
        buttons: ['Cerrar', 'Continuar'],
      }).then((continuar) => {
        if (continuar) {
          navigate('/usuario/perfil');
        }
      });
    } else if (
      logged &&
      userData.isProfileCompleted === true &&
      userData.isOrganizer === false &&
      userData.isProccessingToOrganizer === true
    ) {
      swal({
        title: 'Aplica para ser organizador',
        buttons: ['Cerrar', 'Continuar'],
      }).then((continuar) => {
        if (continuar) {
          swal({
            title:
              'Tu solicitud para ser Organizador ya est?? en proceso de verificaci??n. Te estaremos escribiendo muy pronto con el resultado',
          });
        }
      });
    } else if (!logged) {
      swal({
        title: 'Ingresa para comenzar ',
        buttons: ['Cerrar', 'Ingresar'],
      }).then((ingresar) => {
        if (ingresar) {
          toggleScreenLogin();
          if (userData.isOrganizer) {
            navigate('/organiza-un-evento');
          }
        }
      });
      // .then((logged)=>{
      //   if(logged && user.organizer){
      //     console.log('soy organizador')
      //     navigate('/organiza-un-evento')
      //   }
      // })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerPortada}>
        <img
          src={
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
          }
          alt='Creacion de un evento'
          className={styles.imgPortada}
        />

        <div className={styles.containerTextPortada}>
          <p className={styles.titlePortada}>Gana dinero</p>
          <p className={styles.titlePortada}>con tu talento</p>

          <div>
            <p className={styles.subTitlePortada}>Comparte tu talento con otros mientras ganas dinero</p>
            <p className={styles.subTitlePortada}>haciendo lo que m??s disfrutas</p>
          </div>

          <button className={styles.btn} onClick={(e) => ingreso(e)}>
            Comenzar
          </button>
        </div>
      </div>

      <div className={styles.containerContent}>
        <div className={styles.header}>
          <p>Ventajas</p>
        </div>

        <div className={styles.containerItems}>
          <div className={styles.items}>
            <img className={styles.img} src={icon1} alt='n' />
            <p className={styles.title}>Comodidad</p>
            <p className={styles.subTitle}>Puedes realizar tu evento desde tu propia casa u otro sitio que elijas</p>
          </div>
          <div className={styles.items}>
            <img className={styles.img} src={icon2} alt='n' />
            <p className={styles.title}>Flexibilidad</p>
            <p className={styles.subTitle}>
              Puedes controlar los precios, cantidad de asistentes, fechas y horas de tus eventos. T?? pones las reglas.
            </p>
          </div>
          <div className={styles.items}>
            <img className={styles.img} src={icon3} alt='n' />
            <p className={styles.title}>Control</p>
            <p className={styles.subTitle}>
              {' '}
              Estas en control total de tus finanzas a trav??s de las herramientas digitales disponibles en tu perfil.{' '}
            </p>
          </div>
          <div className={styles.items}>
            <img className={styles.img} src={icon4} alt='n' />
            <p className={styles.title}>Acceso</p>
            <p className={styles.subTitle}>Tienes acceso a lista de asistentes para cada evento</p>
          </div>
          <div className={styles.items}>
            <img className={styles.img} src={icon5} alt='n' />
            <p className={styles.title}>Acompa??amiento</p>
            <p className={styles.subTitle}>Cuentas con nuestro apoyo en cada paso de tu publicaci??n. </p>
          </div>
          <div className={styles.items}>
            <img className={styles.img} src={icon6} alt='n' />
            <p className={styles.title}>Gu??a</p>
            <p className={styles.subTitle}>
              Cuentas con gu??as del organizador para ayudarte a crear un evento exitoso y popular que maximice tus
              ingresos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreate;
