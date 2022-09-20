import React from 'react';
import Card from '../Cards/Card';
import styles from './NextEvents.module.css';

const NextEvent = ({ userDetail }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containercard}>
        {userDetail.myEventsCreated.map((event) => (
          <div className={styles.card}>
            <Card event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextEvent;
