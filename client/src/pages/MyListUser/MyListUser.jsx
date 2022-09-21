import React from 'react';
import { Card } from '../../components';
import styles from './MyListUser.module.css';
import users from '../../api/users';

const MyListUser = () => {

  const userDetail = users.filter((user) => user.name === 'Jean Pierre')[0];


  return (
    <div className={styles.container}>

      <p className={styles.title}>Mi Lista</p>

      <div className={styles.containercard}>
        {userDetail.myEventsBooked ? 
           userDetail.myEventsBooked.map((event) => (
          <div className={styles.card}>
            <Card event={event} />
          </div>
        )): 
        <div className={styles.containerSeeEvents}>
          <hr className={styles.hr}></hr>
            <p className={styles.text}>Aún no tienes eventos en “Mi lista”. ¡Prográmate con “LO QUE QUIERO HACER”!</p>
            <button className={styles.btn}>Ver eventos</button>
          <hr  className={styles.hr}></hr>
        </div>
       
        
        }
      </div>
    </div>
  );
};

export default MyListUser;
