import React from 'react';
import styles from './Card.module.css';
import add from '../../assets/imgs/add.svg';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';

import { iconAdd } from '../../assets/imgs';

const Card = ({ event }) => {

  
  const currentYear = new Date().getFullYear()

  

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
        {/* {event.cupos === 0 ? (
          <p className={styles.cardCupos}>Cupos llenos</p>
        ) : event.dates &&  event.dates.length > 1 ?  (
          event.dates.map((date) => (
            <ul>
              { date.date.slice(11,15) === currentYear ?
              <li className={styles.cardDate}>{date.date.slice(0,8)}</li>
              :<li className={styles.cardDate}>{date.date}</li>
            }
            </ul>
          ))
        ) : (
          
          event.dates && event.dates[0].date.slice(11,15) === currentYear ?          
          <p className={styles.cardDate}>{event.dates[0].date.slice(0,8)}</p>
          : <p className={styles.cardDate}>{event.dates[0].date}</p>
        
        )} */}

        {
          event.dates && event.dates.length > 1 ?
          (
            event.dates.map(
              (date) =>(
                <ul className={styles.ul}>
                  { date.cupos === 0 ? 
                     <li className={styles.cardCupos}>Cupos Llenos</li> 
                     : (
                     date.year === currentYear ?
                     <li className={styles.cardDate}>{date.date.slice(0,8)}</li>
                     :
                     <li className={styles.cardDate}>{date.date}</li>
                     )
                  
                }
                </ul>
              )
            )
          )
          :
          event.dates[0].cupos === 0 ?
          <p className={styles.cardCuposCurrent}>Cupos LLenos</p>
          : (
            event.dates[0].year === 2022 ?
            <p className={styles.cardDateCurrent}>{event.dates[0].date.slice(0,8)}</p>
            :
            <p className={styles.cardDateCurrent}>{event.dates[0].date}</p>
          )
          
        }

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
            value={event.rating}
            name="half-rating" 
            defaultValue={2.5} 
            precision={0.5} 
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
        <Link className={styles.link} to={`/organizerDetails/${event.organizer.id}`}>
          <img
            className={styles.cardOrgPicture}
            src={event.organizer.picture}
            alt="Not Found ):"
            width="2px"
            height="3px"
          />
        </Link>
        <Link className={styles.link} to={`/organizerDetails/${event.organizer.id}`}>
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
