import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import icon1 from '../../assets/imgs/icon-eventcreate1.svg';
import icon2 from '../../assets/imgs/icon-eventcreate2.svg';
import icon3 from '../../assets/imgs/icon-eventcreate3.svg';
import icon4 from '../../assets/imgs/icon-eventcreate4.svg';
import icon5 from '../../assets/imgs/icon-eventcreate5.svg';
import icon6 from '../../assets/imgs/icon-eventcreate6.svg';
import foto from '../../assets/imgs/orgEvento.png';
import styles from './EventCreate.module.css';
import { UIContext } from '../../context/ui';
import { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { AuthContext } from '../../context/auth';
import eventsApi from '../../axios/eventsApi';
import { useNavigate } from 'react-router-dom';
import { resolveBreakpointValues } from '@mui/system/breakpoints';
import { animateScroll as scroll } from 'react-scroll';

const EventCreate = () => {

  const { toggleScreenLogin } = useContext(UIContext);
  const { user, logged, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    getUserData();
  }, [user]);


  const id = user.uid;
  const [userData, setUserData] = useState({});


  useEffect(() => {}, [userData]);

  const getUserData = async () => {
    let userResult = {};
    if (user.uid) {
      userResult = await eventsApi.get(`/users/${user.uid}`);
      setUserData(userResult.data);
    }
  };

  // function ingreso1(e){
  //   e.preventDefault();
  //   swal({
  //     title: ' Por favor completa tu perfil para convertirte en Organizador',
  //     buttons: ['Cerrar', 'Continuar'],
  //   }).then((continuar) => {
  //     if (continuar) {
  //       console.log('perfil incompleto')
  //       navigate('/usuario/perfil')
  //     }
  //   })
  // }

  // function ingreso2(e){
  //   e.preventDefault();
  //     swal({
  //       title: 'Aplica para ser organizador',
  //       buttons: ['Cerrar', 'Continuar'],
  //     }).then((continuar) => {
  //       if (continuar) {
  //         console.log('perfil completo pero no org')
  //         navigate('/usuario/perfil')
  //       }
  //     })
  // }

  // function ingreso3(e){
  //   e.preventDefault();
  //   swal({
  //       title: 'Aplica para ser organizador',
  //       buttons: ['Cerrar', 'Continuar'],
  //     }).then((continuar) => {
  //       if (continuar) {
  //         console.log('perfil completo pero no org y solicitud ya esta en proceso')
  //         swal({
  //           title: 'Tu solicitud para ser Organizador ya está en proceso de verificación. Te estaremos escribiendo muy pronto con el resultado',
  //         })
  //       }
  //     })
  // }

  // function ingreso4(e){
  //   e.preventDefault();
  //   swal({
  //       title: 'Ingresa para comenzar ',
  //       buttons: ['Cerrar', 'Ingresar'],
  //     }).then((ingresar) => {
  //       if (ingresar) {
  //         console.log('ingreso')
  //         toggleScreenLogin()
  //       }
  //     })
  //     .then((logged)=>{
  //       if(logged && user.organizer){
  //         console.log('soy organizador')
  //         navigate('/oganiza-un-evento')
  //       }
  //     })
  // }

  function ingreso(e){
    if(logged && userData.isProfileCompleted === false){
      swal({
        title: ' Por favor completa tu perfil para convertirte en Organizador',
        buttons: ['Cerrar', 'Continuar'],
      }).then((continuar) => {
        if (continuar) {
          console.log('perfil incompleto')
          navigate('/usuario/perfil')
        }
      })
    } else if(logged && userData.isProfileCompleted === true && userData.isOrganizer === false && userData.isProccessingToOrganizer === false){
      swal({
        title: 'Aplica para ser organizador',
        buttons: ['Cerrar', 'Continuar'],
      }).then((continuar) => {
        if (continuar) {
          console.log('perfil completo pero no org')
          navigate('/usuario/perfil')
        }
      })
    } else if(logged && userData.isProfileCompleted === true  && userData.isOrganizer === false && userData.isProccessingToOrganizer === true){
      swal({
        title: 'Aplica para ser organizador',
        buttons: ['Cerrar', 'Continuar'],
      }).then((continuar) => {
        if (continuar) {
          console.log('perfil completo pero no org y solicitud ya esta en proceso')
          swal({
            title: 'Tu solicitud para ser Organizador ya está en proceso de verificación. Te estaremos escribiendo muy pronto con el resultado',
          })
        }
      })
    }else if(!logged){
      swal({
        title: 'Ingresa para comenzar ',
        buttons: ['Cerrar', 'Ingresar'],
      }).then((ingresar) => {
        if (ingresar) {
          console.log('ingreso')
          toggleScreenLogin()
        }
      })
      .then((logged)=>{
        if(logged && user.organizer){
          console.log('soy organizador')
          navigate('/oganiza-un-evento')
        }
      })
    }   
  }
 

  return (
    <div className={styles.container}>
      <img src={foto} alt="n" />

      <div className={styles.containerBtn}>
            <button className={styles.btn} onClick={(e)=>ingreso(e)}>Comenzar</button>
      </div>

      {/* {
        logged && userData && userData.isProfileCompleted === false ?
        (
          <div className={styles.containerBtn}>
            <button className={styles.btn} onClick={(e)=>ingreso1(e)}>Comenzar</button>
          </div>
        ) : logged && userData && userData.isProfileCompleted === true && userData.isOrganizer === false && userData.isProccessingToOrganizer === false ?
        (
          <div className={styles.containerBtn}>
            <button className={styles.btn} onClick={(e)=>ingreso2(e)}>Comenzar</button>
          </div>
        ) :  logged && userData && userData.isProfileCompleted === true  && userData.isOrganizer === false && userData.isProccessingToOrganizer === true ?
        (
          <div className={styles.containerBtn}>
            <button className={styles.btn} onClick={(e)=>ingreso3(e)}>Comenzar</button>
          </div>
        ) : !logged ?
        (
          <div className={styles.containerBtn}>
            <button className={styles.btn} onClick={(e)=>ingreso4(e)}>Comenzar</button>
          </div>
        ) :''
      } */}
      

      <div className={styles.containerContent}>
        <div className={styles.header}>
          <p className={styles.title}>Beneficios de Organizar un evento</p>
        </div>

        <div className={styles.containerItems}>
          <div className={styles.items}>
            <img className={styles.img} src={icon1} alt="n" />
            <p className={styles.title}>Comodidad</p>
            <p className={styles.subTitle}>
              Puedes realizar tu evento desde tu propia casa u otro sitio que
              elijas
            </p>
          </div>
          <div className={styles.items}>
            <img className={styles.img} src={icon2} alt="n" />
            <p className={styles.title}>Flexibilidad</p>
            <p className={styles.subTitle}>
              Puedes controlar los precios, cantidad de asistentes, fechas y
              horas de tus eventos. Tú pones las reglas.
            </p>
          </div>
          <div className={styles.items}>
            <img className={styles.img} src={icon3} alt="n" />
            <p className={styles.title}>Control</p>
            <p className={styles.subTitle}>
              {' '}
              Estas en control total de tus finanzas a través de las
              herramientas digitales disponibles en tu perfil.{' '}
            </p>
          </div>
          <div className={styles.items}>
            <img className={styles.img} src={icon4} alt="n" />
            <p className={styles.title}>Acceso</p>
            <p className={styles.subTitle}>
              Tienes acceso a lista de asistentes para cada evento
            </p>
          </div>
          <div className={styles.items}>
            <img className={styles.img} src={icon5} alt="n" />
            <p className={styles.title}>Acompañamiento</p>
            <p className={styles.subTitle}>
              Cuentas con nuestro apoyo en cada paso de tu publicación.{' '}
            </p>
          </div>
          <div className={styles.items}>
            <img className={styles.img} src={icon6} alt="n" />
            <p className={styles.title}>Guía</p>
            <p className={styles.subTitle}>
              Cuentas con guías del organizador para ayudarte a crear un evento
              exitoso y popular que maximice tus ingresos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreate;
