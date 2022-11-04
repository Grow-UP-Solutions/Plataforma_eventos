import React, { useContext } from 'react';
import styles from './Card.module.css';
import { Link, useResolvedPath } from 'react-router-dom';
import { Rating } from '@mui/material';
import { iconAdd } from '../../assets/imgs';
import { UIContext } from '../../context/ui';
import { AuthContext } from '../../context/auth/AuthContext';
import { stateContext } from '../../context/state/stateContext';
import swal from 'sweetalert';
import eventsApi from "../../axios/eventsApi";
import { useState } from 'react';


const Card = ({ event, listName }) => {

  const { toggleScreenLogin, getEventsFavourites } = useContext(UIContext);
  const { user } = useContext(AuthContext);
  const { notes, setNotes } = useContext(stateContext);
  const currentYear = new Date().getFullYear();
  const numCadena = currentYear + '';
 

  const id = user.uid;
 
  //const cover = event.pictures.filter(picture=>picture.isCover===true)[0]

 console.log('event',event)

  const handleClickFav = async (e) => {
    e.preventDefault();
    const fav = {
      type: 'favoritos',
      idUser: user.uid
    }
    const favorite = {
      idEvent: event._id
    }
    try {
      const json = await eventsApi.post('/users/notifications', fav);
      getEventsFavourites(user.uid, favorite);
      setNotes([...notes, json.data]);
      swal({
        text: 'Evento agregado como favorito',
        icon: 'success',
        button: 'OK',
      });
    } 
    catch (error) {
      console.log(error)
    }
  }

  //precio de cada fecha//
  const [price , setPrice] = useState('')

  function handlePrice(e){
    setPrice(e.target.value)
  }

  

  return (
    <div className={styles.card}>
      {event.pictures.length && event.pictures !== undefined?
        event.pictures.map(p=>(
        p.cover === true ?
        <img
          className={styles.cardImgEvent}
          src={p.picture}
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
        ))
      :'N'}

      <div className={styles.cardText}>
        {event.dates && event.dates.length > 1 ? (
          <select className={styles.cardDate} onChange={(e)=>handlePrice(e)}>
            {event.dates.map((date, index) =>    
              date.cupos > 0 && date.isPublic===true && date.inRevision===false  ? (
                date.dateFormated.slice(date.dateFormated.length-4) === numCadena ? (
                  <option key={index} value={date.price}>
                    {date.dateFormated.slice(0, date.dateFormated.length-7)}
                  </option>
                ) : (
                  <option key={index} value={date.price}>
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

        {event.organizer._id === user.uid ?
          '' :
          (
          user.uid ?
          <div className={styles.cardAddFav} onClick={handleClickFav}>
            <input type='checkbox' id={`${event._id}-${listName}`} />
            <label htmlFor={`${event._id}-${listName}`}>
              <img src={iconAdd} alt='iconAdd' />
            </label>
          </div> :
          <div className={styles.cardAddFav} >
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
          )
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
            {price ?
              <p className={styles.cardPrice}>${price}</p>
              : <p className={styles.cardPrice}>${event.dates[0].price}</p>
            }
            <div className={styles.vLine}></div>
            <Link className={styles.link} to={`/detalles-del-evento/${event._id}`}>
              <p className={styles.cardDetails}>Ver más</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.cardOrgInfo}>
          {price ?
           <p className={styles.cardPrice}>${price}</p>
           : <p className={styles.cardPrice}>${event.dates[0].price}</p>
          }
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
