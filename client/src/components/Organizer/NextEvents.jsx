import React, { useEffect } from 'react';
import styles from './NextEvents.module.css';
import Card from '../Cards/Card';

const NextEvent = ({userDetail}) => {

  return (
    <div className={styles.container}>
     <div className={styles.containercard}>
      {
        userDetail.myEventsCreated.map( (event) =>
        <div className={styles.card}>
        <Card event={event} />
        </div>
        )
      }
     </div>
    </div>
  );
};

export default NextEvent;