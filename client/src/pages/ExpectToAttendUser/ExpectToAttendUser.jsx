import React from 'react';
import { Card } from '../../components';
import styles from './ExpectToAttendUser.module.css';
import users from '../../api/users';

const ExpectToAttendUser = () => {

  const userDetail = users.filter((user) => user.name === 'Jean Pierre')[0];


  return (
    <div className={styles.container}>

      <p className={styles.title}>Pendientes por asistir</p>

      <div className={styles.containercard}>
        {
           userDetail.myEventsBooked.map((event) => (
          <div className={styles.card}>
            <Card event={event} />
          </div>
        ))
        }
      </div>
    </div>
  );
};

export default ExpectToAttendUser;
