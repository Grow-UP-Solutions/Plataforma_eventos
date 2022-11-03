import React from 'react';
import styles from './Card.module.css';
import add from '../../assets/imgs/add.svg';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { iconAdd } from '../../assets/imgs';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import { AuthContext } from '../../context/auth/AuthContext';


const Card = ({ event, listName }) => {
  const { toggleScreenLogin } = useContext(UIContext);
  const currentYear = new Date().getFullYear();
  const numCadena = currentYear + '';
 

  const { user } = useContext(AuthContext);
  const id = user.uid;
 

  const cover = event.pictures.filter(picture=>picture.isCover===true)[0]
  console.log('cover:',cover)
  

  return (
    <div className={styles.card}>
      {event.pictures.length?
       (
        cover !== undefined ?
          <img
            className={styles.cardImgEvent}
            src={event.pictures.cover}
            alt='Not Found ):'
            width='200x'
            height='300'
          /> : 
          <img
            className={styles.cardImgEvent}
            src={event.pictures[0].picture}
            alt='Not Found ):'
            width='200x'
            height='300'
          />
        )
      :'N'}

      <div className={styles.cardText}>
        {event.dates && event.dates.length > 1 ? (
          <select className={styles.cardDate}>
            {event.dates.map((date, index) =>    
              date.cupos > 0 && date.isPublic===true && date.inRevision===false  ? (
                date.dateFormated.slice(date.dateFormated.length-4) === numCadena ? (
                  <option key={index} value={date.date}>
                    {date.dateFormated.slice(0, date.dateFormated.length-7)}
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
        ) : event.dates[0].cupos === 0 && event.dates[0].isPublic === true && event.dates[0].inRevision===false ? (
          <p className={styles.cardCuposCurrent}>Cupos LLenos</p>
        ) : event.dates[0].dateFormated.slice(event.dates[0].dateFormated.length-4) === numCadena && event.dates[0].isPublic===true && event.dates[0].inRevision===false? (
          <p className={styles.cardDateCurrent}>{event.dates[0].dateFormated.slice(0,event.dates[0].dateFormated.length-7)}</p>
        ) : event.dates[0].isPublic===true && event.dates[0].inRevision===false ? (
          <p className={styles.cardDateCurrent}>{event.dates[0].dateFormated}</p>
        ) : ''}

        {
        user && user.uid === event.organizer._id ? 
        '':
        <div className={styles.cardAddFav}>
        <input type='checkbox' id={`${event._id}-${listName}`} />
        <label htmlFor={`${event._id}-${listName}`}>
          <img src={iconAdd} alt='iconAdd' />
        </label>

        <div className={styles.cardAddFavMenu}>
          <p>
            Para agregar este evento a tu lista{' '}
            <a
              onClick={(e) => {
                e.preventDefault();
                toggleScreenLogin();
              }}
              href='#'
            >
              Ingresa
            </a>{' '}
            o <Link to={'/registrate'}>Registrate</Link>
          </p>
        </div>
        </div>      
        }
      

        <div className={styles.cardRating}>
          <Rating
            className={styles.rating}
            value={event.rating}
            name='half-rating'
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
        <p className={styles.cardDescription}>{event.shortDescription.slice(0, 70)}</p>
      </div>

      <hr className={styles.cardHr}></hr>

      {event.organizer.userpicture && event.organizer.name ? (
        <div>
          <div className={styles.cardOrgInfo}>
            <Link className={styles.link} to={`/sobre-el-organizador/${event.organizer._id}`}>
              <img
                className={styles.cardOrgPicture}
                src={event.organizer.userpicture}
                alt='Not Found ):'
                width='2px'
                height='3px'
              />
            </Link>
            <Link className={styles.link} to={`/sobre-el-organizador/${event.organizer._id}`}>
              <p className={styles.cardOrgName}>{event.organizer.name}</p>
            </Link>
            <div className={styles.vLine}></div>
            <p className={styles.cardPrice}>${event.price}</p>
            <div className={styles.vLine}></div>
            <Link className={styles.link} to={`/detalles-del-evento/${event._id}`}>
              <p className={styles.cardDetails}>Ver más</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.cardOrgInfo}>
          <p className={styles.cardPrice}>${event.price}</p>
          <div className={styles.vLine}></div>
          <Link className={styles.link} to={`/detalles-del-evento/${event._id}`}>
            <p className={styles.cardDetails}>Ver más</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Card;
