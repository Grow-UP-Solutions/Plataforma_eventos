import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '..';
import styles from './ExpectToAttendUser.module.css';

const ExpectToAttendUser = ({ myEventsBooked }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Pendientes por asistir</p>

      <div className={styles.containercard}>
        {myEventsBooked && (
          <>
            {myEventsBooked.map((event) => (
              <div className={styles.card}>
                <Card event={event} />
              </div>
            ))}
          </>
        )}

        {!myEventsBooked && (
          <div className={styles.containerSeeEvents}>
            <div>
              <p className={styles.text}>
                Aún no tienes eventos en “Pendientes por Asistir”. ¡Alistate a un evento con “LO QUE QUIERO HACER”!
              </p>
              <button className={styles.btn}>
                <Link to='/'>Ver eventos</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpectToAttendUser;
