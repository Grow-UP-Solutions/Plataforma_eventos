import React, { useEffect } from 'react';
import styles from './OrganizerDetails.module.css';
import events from '../../api/events';
import users from '../../api/users';
import { Rating } from '@mui/material';
import { animateScroll as scroll } from 'react-scroll';
import { useParams } from "react-router-dom";
import { IoLocationOutline } from 'react-icons/io5';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';


const OrganizerDetails = () => {

    const id = useParams().id
   
    const allUsers = users
    

    const userDetail = allUsers.filter( user => user.name === 'Jean Pierre')[0]

    console.log('user:',userDetail)

    useEffect(() => {
      scroll.scrollToTop()
    }, []);
   


  return (
    <div className={styles.container}>
        <img className={styles.img} src={userDetail.picture} alt='N' />
        <p  className={styles.name}>{userDetail.name}</p>
        <Rating
            className={styles.rating}
            name="read-only"
            value={userDetail.rating}
            readOnly
        />
        <div className={styles.containerDir}>
            <IoLocationOutline className={styles.icon}/>
            <p  className={styles.direction}>{userDetail.direction}</p>
        </div>
        <p className={styles.member}>Miembor desde {userDetail.membership}</p>
        <div className={styles.containerMess}>
            <LocalPostOfficeIcon sx={{ fontSize: '13px', color: '#d53e27' }} />
            <button className={styles.message}>Enviar Mensaje</button>
        </div>
        <div className={styles.containerButtons}>
            <button className={styles.btn}>Sobre El Organizador</button>
            <div className={styles.vLine}></div>
            <button className={styles.btn}>Proximo Evento</button>
            <div className={styles.vLine}></div>
            <button className={styles.btn}>Opiniones</button>
        </div>
    </div>
  );
};

export default OrganizerDetails;
