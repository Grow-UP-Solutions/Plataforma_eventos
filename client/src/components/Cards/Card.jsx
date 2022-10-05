import React from 'react';
import styles from './Card.module.css';
import add from '../../assets/imgs/add.svg';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { iconAdd } from '../../assets/imgs';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';

const Card = ({ event }) => {

  const { toggleScreenLogin } = useContext(UIContext);
  const currentYear = new Date().getFullYear();
  const numCadena= currentYear + ''
  const añoActual = numCadena.slice(2,4)

  console.log(event)
  


  
  return (
    <div className={styles.card}>
      <img
        className={styles.cardImgEvent}
        src={event.pictures[0].picture}
        alt="Not Found ):"
        width="200x"
        height="300"
      />
      <div className={styles.cardText}>
        {event.dates && event.dates.length > 1 ? (
          <select className={styles.cardDate}>
            {event.dates.map((date, index) =>
              event.cupos > 0 ? (
                date.date.slice(8,10) === añoActual ? (
                  <option key={index} value={date.date}>
                    {date.date.slice(0, 5)}
                  </option>
                ) : (
                  <option key={index} value={date.date}>
                    {date.date}
                  </option>
                )
              ) : (
                'N'
              )
            )}
          </select>
        ) : event.cupos === 0 ? (
          <p className={styles.cardCuposCurrent}>Cupos LLenos</p>
        ) : event.dates[0].date.slice(8,10)=== añoActual ? (
          <p className={styles.cardDateCurrent}>
            {event.dates[0].date.slice(0, 5)}
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
              Para agregar este evento a tu lista{' '}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  toggleScreenLogin();
                }}
                href="#"
              >
                Ingresa
              </a>{' '}
              o <Link to={'/registrate'}>Registrate</Link>
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

        <p className={styles.cardTitle} title={event.title}>
          {event.title}
        </p>

        <p className={styles.cardNick}>Segundo Titulo</p>
        <p className={styles.cardDescription}>{event.shortDescription.slice(0,70)}</p>
      </div>
      <hr className={styles.cardHr}></hr>
      {event.organizer.picture && event.organizer.name?
        <div>
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
            <p className={styles.cardPrice}>${event.price}</p>
            <div className={styles.vLine}></div>
            <Link className={styles.link} to={`/eventdetails/${event._id}`}>
              <p className={styles.cardDetails}>Ver más</p>
            </Link>
            </div>
            </div>
          :
          <div className={styles.cardOrgInfo}>
            <p className={styles.cardPrice}>${event.price}</p>
            <div className={styles.vLine}></div>
            <Link className={styles.link} to={`/eventdetails/${event._id}`}>
              <p className={styles.cardDetails}>Ver más</p>
            </Link>
          </div>
        }
         
    </div>
  );
};

export default Card;
