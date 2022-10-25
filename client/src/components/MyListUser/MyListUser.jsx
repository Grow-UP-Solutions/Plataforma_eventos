import React from 'react';
import { Card } from '..';
import styles from './MyListUser.module.css';
import { Link } from 'react-router-dom';

const MyListUser = ({ myFavorites }) => {
  
  return (
    <div className={styles.container}>
      <p className={styles.title}>Mi Lista</p>

      <div className={styles.containercard}>
        {myFavorites.length > 0 ? (
          myFavorites.map((event) => (
            <div className={styles.card}>
              <Card event={event} />
            </div>
          ))
        ) : (
          <div className={styles.containerSeeEvents}>
            <hr className={styles.hr}></hr>
            <p className={styles.text}>Aún no tienes eventos en “Mi lista”. ¡Prográmate con “LO QUE QUIERO HACER”!</p>
            <button className={styles.btn}>
              <Link to='/'>Ver eventos</Link>
            </button>
            <hr className={styles.hr}></hr>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListUser;
