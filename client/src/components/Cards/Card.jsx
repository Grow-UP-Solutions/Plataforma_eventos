import React from 'react';
import styles from './Card.module.css';
import add from '../../assets/imgs/add.svg';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { iconAdd } from '../../assets/imgs';

const Card = ({ event }) => {

  const currentYear = new Date().getFullYear();

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
        {event.dates && event.dates.length > 1 ? (
          <select className={styles.cardDate}>
            {event.dates.map((date, index) =>
              date.cupos > 0 ? (
                date.year === currentYear ? (
                  <option key={index} value={date._id}>
                    {date.date.slice(0, 8)}
                  </option>
                ) : (
                  <option key={index} value={date._id}>
                    {date.date}
                  </option>
                )
              ) : (
                'N'
              )
            )}
          </select>
        ) : event.dates[0].cupos === 0 ? (
          <p className={styles.cardCuposCurrent}>Cupos LLenos</p>
        ) : event.dates[0].year === currentYear ? (
          <p className={styles.cardDateCurrent}>
            {event.dates[0].date.slice(0, 8)}
          </p>
        ) : (
          <p className={styles.cardDateCurrent}>{event.dates[0].date}</p>
        )}

        <div className={styles.cardAddFav}>
          <input type="checkbox" id={event._id} />
          <label htmlFor={event._id}>
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
            value={event.rating}
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />
          <span>({event.rating})</span>
        </div>

        <p className={styles.cardTitle} title={event.name}>
          {event.name}
        </p>

        <p className={styles.cardNick}>{event.nick}</p>
        <p className={styles.cardDescription}>{event.description}</p>
      </div>
      <hr className={styles.cardHr}></hr>
      <div className={styles.cardOrgInfo}>
        <Link
          className={styles.link}
          to={`/organizerDetails/${event.organizer._id}`}
        >
          <img
            className={styles.cardOrgPicture}
            src={event.organizer.picture}
            alt="Not Found ):"
            width="2px"
            height="3px"
          />
        </Link>
        <Link
          className={styles.link}
          to={`/organizerDetails/${event.organizer._id}`}
        >
          <p className={styles.cardOrgName}>{event.organizer.name}</p>
        </Link>
        <div className={styles.vLine}></div>
        <p className={styles.cardPrice}>{event.price}</p>
        <div className={styles.vLine}></div>
        <Link className={styles.link} to={`/eventdetails/${event._id}`}>
          <p className={styles.cardDetails}>Ver más</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
