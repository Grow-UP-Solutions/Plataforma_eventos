import React from 'react';
import styles from './Card.module.css';
import add from '../../assets/imgs/add.svg';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';

import { iconAdd } from '../../assets/imgs';

const Card = ({ event }) => {
  

  return (
    <div className={styles.card}>
      <img
        className={styles.cardImgEvent}
        src={event.pictures[0]}
        alt="Not Found ):"
        width="200x"
        height="300"
      />
      <div className={styles.cardText}>
        {event.cupos === 0 ? (
          <p className={styles.cardCupos}>Cupos llenos</p>
        ) : event.date &&  event.date.length > 1 ?  (
          event.date.map((event) => (
            <ul>
              <li className={styles.cardDate}>{event.dates}</li>
            </ul>
          ))
        ) : (
          <p className={styles.cardDate}>{event.dates[0].date}</p>
        )}

        <div className={styles.cardAddFav}>
          <input type="checkbox" id={event.id} />
          <label htmlFor={event.id}>
            <img src={iconAdd} alt="iconAdd" />
          </label>

          <div className={styles.cardAddFavMenu}>
            <p>
              Para agregar este evento a tu lista <a href="#">Ingresa</a> o{' '}
              <a href="#">Regístrate</a>
            </p>
          </div>
        </div>

        <div className={styles.cardRating}>
          <Rating
            className={styles.rating}
            name="read-only"
            value={event.rating}
            readOnly
          />
          <span>({event.rating})</span>
        </div>
        <p className={styles.cardTitle}>{event.name}</p>
        <p className={styles.cardNick}>{event.nick}</p>
        <p className={styles.cardDescription}>{event.description}</p>
      </div>
      <hr className={styles.cardHr}></hr>
      <div className={styles.cardOrgInfo}>
        <Link className={styles.link} to={`/organizerId/${event.organizer.id}`}>
          <img
            className={styles.cardOrgPicture}
            src={event.organizer.picture}
            alt="Not Found ):"
            width="2px"
            height="3px"
          />
        </Link>
        <Link className={styles.link} to={`/organizerId/${event.organizer.id}`}>
          <p className={styles.cardOrgName}>{event.organizer.name}</p>
        </Link>
        <div className={styles.vLine}></div>
        <p className={styles.cardPrice}>{event.price}</p>
        <div className={styles.vLine}></div>
        <Link className={styles.link} to={`/eventdetails/${event.id}`}>
          <p className={styles.cardDetails}>Ver más</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
