import React from 'react';
import events from '../../api/events'
import styles from './Card.module.css';
import add from '../../assets/imgs/add.svg'


const Card = ({event}) => {

    console.log('evento:', event)

  return (
      <div className={styles.card}>
        <img className={styles.cardImgEvent}
              src={event.pictures[0]}
              alt='Not Found ):'
              width='200x'
              height='300'
            />
        <div className={styles.cardText}>
            <p className={styles.cardDate}>{event.date}</p>
            <div className={styles.cardAddFav}>
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,200,0,0" />
              <span class="material-symbols-outlined">add</span>
            </div>
            <p className={styles.cardRating}>{event.rating}</p>
            <p className={styles.cardTitle}>{event.name}</p>
            <p className={styles.cardNick}>{event.nick}</p>
            <p className={styles.cardDescription}>{event.description}</p>
        </div>
        <hr className={styles.cardHr} ></hr>
        <div className={styles.cardOrgInfo}>
            <img className={styles.cardOrgPicture}
              src={event.organizer.picture}
              alt='Not Found ):'
              width='2px'
              height='3px'
            />
            <p className={styles.cardOrgName}>{event.organizer.name}</p>
            <div className={styles.vLine}></div>
            <p className={styles.cardPrice}>{event.price}</p>
            <div className={styles.vLine}></div>
            <p className={styles.cardDetails}>Ver más</p>
        </div>
        
      </div>
  );
}

export default Card;
