import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './Card.module.css';
import { Link, useResolvedPath } from 'react-router-dom';
import { Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UIContext } from '../../context/ui';
import { AuthContext } from '../../context/auth/AuthContext';
import { stateContext } from '../../context/state/stateContext';
import swal from 'sweetalert';
import { iconAdd } from '../../assets/imgs';
import eventsApi from '../../axios/eventsApi';

const Card = ({ event, listName }) => {
  const { toggleScreenLogin, getEventsFavourites } = useContext(UIContext);
  const { notes, setNotes } = useContext(stateContext);
  const currentYear = new Date().getFullYear();
  const numCadena = currentYear + '';
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [heart, setHeart] = useState([]);
  const [local, setLocal] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {}, [allUsers]);

  useEffect(() => {
    const myUser = async () => {
      try {
        const json = await eventsApi.get('/users/' + user.uid);
        setHeart(json.data.myFavorites.find((e) => e._id === event._id));
      } catch (error) {
        console.log(error);
      }
    };
    myUser();
  }, [user.uid]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current === null || menuRef.current === undefined) {
        console.log('soy user');
      } else if (!menuRef.current.contains(e.target)) {
        setLocal(false);
        console.log(menuRef.current);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const getUsers = async () => {
    try {
      let userResult = await eventsApi.get(`/users`);
      setAllUsers(userResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  const organizer = allUsers.filter((user) => user._id === event.organizer);

  //const fav = myFav.includes(e => e.myFavorites._id === event._id);

  //const cover = event.pictures.filter(picture=>picture.isCover===true)[0]

  const handleClickFav = async (e) => {
    e.preventDefault();
    const fav = {
      type: 'favoritos',
      idUser: user.uid,
    };

    const favorite = {
      idEvent: event._id,
    };

    try {
      const json = await eventsApi.post('/users/notifications', fav);
      getEventsFavourites(user.uid, favorite);
      setNotes([...notes, json.data]);
      setHeart(true);
      swal({
        text: 'Evento agregado como favorito',
        icon: 'success',
        button: 'OK',
      });
    } catch (error) {
      console.log(error);
    }
  };

  //precio de cada fecha//
  const [price, setPrice] = useState('');

  function handlePrice(e) {
    setPrice(e.target.value);
  }

  //let portada = event.pictures.filter((p) => p.cover === true)[0];
 

  const handleClickOpenDrop = (e) => {
    e.preventDefault();
    setLocal(!local);
  };

  return (
    <div className={styles.card}>
      {/* {portada ? (
        <Link to={`/detalles-del-evento/${event._id}`}>
          <img className={styles.cardImgEvent} src={portada.picture} alt='Not Found ):' width='200x' height='300' />
        </Link>
      ) : (
        <Link to={`/detalles-del-evento/${event._id}`}>
          <img
            className={styles.cardImgEvent}
            src={event.pictures[0].picture}
            alt='Not Found ):'
            width='200x'
            height='300'
          />
        </Link>
      )} */}
      {event.pictures.length && event.pictures !== undefined
        ? event.pictures.map((p) =>
            p.cover === true ? (
              <Link to={`/detalles-del-evento/${event._id}`}>
                <img className={styles.cardImgEvent} src={p.picture} alt='Not Found ):' width='200x' height='300' />
              </Link>
            ) : (
              <Link to={`/detalles-del-evento/${event._id}`}>
                <img
                  className={styles.cardImgEvent}
                  src={event.pictures[0].picture}
                  alt='Not Found ):'
                  width='200x'
                  height='300'
                />
              </Link>
            )
          )
        : 'N'}

      <div className={styles.cardText}>
        {event.dates && event.dates.length > 1 ? (
          <select className={styles.cardDate} onChange={(e) => handlePrice(e)}>
            {event.dates.map((date, index) =>
              date.cupos > 0 && date.isPublic === true && date.inRevision === false ? (
                date.dateFormated.slice(date.dateFormated.length - 4) === numCadena ? (
                  <option key={index} value={date.price}>
                    {date.dateFormated.slice(0, date.dateFormated.length - 7)}
                  </option>
                ) : (
                  <option key={index} value={date.price}>
                    {date.dateFormated}
                  </option>
                )
              ) : (
                'N'
              )
            )}
          </select>
        ) : event.dates[0].cupos === 0 && event.dates[0].isPublic === true && event.dates[0].inRevision === false ? (
          <p className={styles.cardCuposCurrent}>Cupos LLenos</p>
        ) : event.dates[0].dateFormated.slice(event.dates[0].dateFormated.length - 4) === numCadena &&
          event.dates[0].isPublic === true &&
          event.dates[0].inRevision === false ? (
          <p className={styles.cardDateCurrent}>
            {event.dates[0].dateFormated.slice(0, event.dates[0].dateFormated.length - 7)}
          </p>
        ) : event.dates[0].isPublic === true && event.dates[0].inRevision === false ? (
          <p className={styles.cardDateCurrent}>{event.dates[0].dateFormated}</p>
        ) : (
          ''
        )}

        {event.organizer._id === user.uid ? (
          ''
        ) : user.uid && !heart ? (
          <div className={styles.cardAddFav} onClick={handleClickFav}>
            <input type='checkbox' id={`${event._id}-${listName}`} />
            <label htmlFor={`${event._id}-${listName}`}>
              <AddIcon sx={{ fontSize: 30, color: '#868686' }} />
            </label>
          </div>
        ) : user.uid && heart ? (
          <div className={styles.cardAddFavHeart}>
            <input type='checkbox' id={`${event._id}-${listName}`} />
            <label htmlFor={`${event._id}-${listName}`}>
              <FavoriteIcon sx={{ fontSize: 25, color: 'white' }} />
            </label>
          </div>
        ) : (
          <div className={styles.cardAddFav} ref={menuRef}>
            <input type='checkbox' id={`${event._id}-${listName}`} />
            <label htmlFor={`${event._id}-${listName}`} onClick={handleClickOpenDrop}>
              <AddIcon sx={{ fontSize: 30, color: '#868686', cursor: 'pointer' }} />
            </label>
            {local && (
              <div className={styles.cardAddFavMenu}>
                <p>
                  Para agregar este evento a tu lista{' '}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      toggleScreenLogin();
                    }}
                    href='/'
                  >
                    Ingresa
                  </a>{' '}
                  o <Link to={'/registrate'}>Registrate</Link>
                </p>
              </div>
            )}
          </div>
        )}

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

        <p className={styles.cardDescription}>{event.shortDescription.slice(0, 70)}</p>
      </div>

      <hr className={styles.cardHr}></hr>

      {organizer.length === 1 ? (
        organizer[0].userpicture && organizer[0].name ? (
          <div>
            <div className={styles.cardOrgInfo}>
              <Link className={styles.link} to={`/sobre-el-organizador/${organizer[0]._id}`}>
                <img
                  className={styles.cardOrgPicture}
                  src={organizer[0].userpicture}
                  alt='Not Found ):'
                  width='2px'
                  height='3px'
                />
              </Link>
              <Link className={styles.link} to={`/sobre-el-organizador/${organizer[0]._id}`}>
                <p className={styles.cardOrgName}>{organizer[0].name}</p>
              </Link>
              <div className={styles.vLine}></div>
              {price ? (
                <p className={styles.cardPrice}>${price}</p>
              ) : (
                <p className={styles.cardPrice}>${event.dates[0].price}</p>
              )}
              <div className={styles.vLine}></div>
              <Link className={styles.link} to={`/detalles-del-evento/${event._id}`}>
                <p className={styles.cardDetails}>Ver más</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.cardOrgInfo}>
            {price ? (
              <p className={styles.cardPrice}>${price}</p>
            ) : (
              <p className={styles.cardPrice}>${event.dates[0].price}</p>
            )}
            <div className={styles.vLine}></div>
            <Link className={styles.link} to={`/detalles-del-evento/${event._id}`}>
              <p className={styles.cardDetails}>Ver más</p>
            </Link>
          </div>
        )
      ) : event.organizer.userpicture && event.organizer.name ? (
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
            {price ? (
              <p className={styles.cardPrice}>${price}</p>
            ) : (
              <p className={styles.cardPrice}>${event.dates[0].price}</p>
            )}
            <div className={styles.vLine}></div>
            <Link className={styles.link} to={`/detalles-del-evento/${event._id}`}>
              <p className={styles.cardDetails}>Ver más</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.cardOrgInfo}>
          {price ? (
            <p className={styles.cardPrice}>${price}</p>
          ) : (
            <p className={styles.cardPrice}>${event.dates[0].price}</p>
          )}
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
