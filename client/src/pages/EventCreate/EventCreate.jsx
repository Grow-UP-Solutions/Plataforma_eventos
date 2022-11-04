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

const EventCreate = () => {

  const { toggleScreenLogin } = useContext(UIContext);
  const { user, logged, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  

  useEffect(() => {
    getUserData();
  }, [user]);

  const getUserData = async () => {
    let userResult = {};
    if (user.uid) {
      userResult = await eventsApi.get('/users/' + user.uid);
    }
  };

  function ingreso(){
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
 

  return (
    <div className={styles.container}>
      <img src={foto} alt="n" />

      {!logged ? 
        (
        <div className={styles.containerBtn}>
          <button className={styles.btn} onClick={ingreso}>Comenzar</button>
        </div>
        )
        :''
      }
      

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
