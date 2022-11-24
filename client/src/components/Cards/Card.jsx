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
import eventsApi from '../../axios/eventsApi';
import { AiOutlineClose } from 'react-icons/ai';
import { Hearts } from 'react-loader-spinner';

const Card = ({ event, listName, orgEvent }) => {
  const { toggleScreenLogin, getEventsFavourites, getEventsWithoutFavourites } = useContext(UIContext);
  const { notes, setNotes } = useContext(stateContext);
  const currentYear = new Date().getFullYear();
  const numCadena = currentYear + '';
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [heart, setHeart] = useState([]);
  const [local, setLocal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef();

  const fecha = new Date();
  const hora = fecha.getHours();
  const minutes = fecha.getMinutes();
  const dateActual = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

  if (dateActual && orgEvent !== 'true') {
    event.dates.map((date) => {
      if (new Date(date.date) < new Date(dateActual)) {
        if (event.dates.length === 1) {
          date.isPublic = false;
          event.isPublic = false;
        } else {
          date.isPublic = false;
        }
      } else if (date.date === dateActual) {
        if (date.end.slice(0, 2) <= hora && date.end.slice(3, 5) <= minutes + 2) {
          if (event.dates.length === 1) {
            date.isPublic = false;
            event.isPublic = false;
          } else {
            date.isPublic = false;
          }
        }
      }
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const myUser = async () => {
      try {
        const json = await eventsApi.get('/users/' + user.uid);
        setHeart(json.data.myFavorites.find((e) => e._id === event._id));
      } catch (error) {
        console.log(error);
      }
    };

    if (Object.keys(user).length > 0) {
      myUser();
    }
  }, [user.uid]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current === null || menuRef.current === undefined) {
      } else if (!menuRef.current.contains(e.target)) {
        setLocal(false);
        setGetDates(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [heart, user]);

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

  const handleClickWithoutFav = async (e) => {
    e.preventDefault();
    const favorite = {
      idEvent: event._id,
    };
    try {
      getEventsWithoutFavourites(user.uid, favorite);
      setHeart(false);
      swal({
        text: 'Evento retirado de "Mi Lista"',
        icon: 'success',
        button: 'OK',
      });
    } catch (error) {
      console.log(error);
    }
  };

  //PRECIO FECHA HOME//

  const firstPublicDate = event.dates.find((date) => date.isPublic === true);

  const [price, setPrice] = useState(firstPublicDate !== undefined ? firstPublicDate.price : '');

  function handlePrice(e) {
    setPrice(e.target.value);
  }

  // PORTADA//
  const portada = event.pictures.filter((p) => p.cover === true)[0];

  const handleClickOpenDrop = (e) => {
    e.preventDefault();
    setLocal(!local);
  };

  //MIS EVENTOS CARD

  const [getDates, setGetDates] = useState(false);
  const [getAssistants, setGetAssistants] = useState(false);
  const [selectedDateId, setSelectedDateId] = useState(event.dates[0]._id);
  const [selectedDate, setSelectedDate] = useState('');
  const [datePrice, setDatePrice] = useState(undefined);

  const handleDates = (e) => {
    e.preventDefault();
    setGetDates(!getDates);
  };

  const chooseDate = (e, dateId, dateF, datePrice) => {
    e.preventDefault();
    setSelectedDateId(dateId);
    setGetDates(false);
    setSelectedDate(dateF);
    setDatePrice(datePrice);
  };

  const handleEarns = (e) => {
    e.preventDefault();
    setGetDates(!getDates);
  };

  return (
    <div className={orgEvent === 'true' ? styles.cardOrg : styles.card}>
      {portada ? (
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
      )}

      <div className={styles.cardText}>
        {orgEvent === 'true' && selectedDate === '' ? (
          <p className={styles.cardDateCurrent}>{event.dates[0].dateFormated.replace('de', '/')}</p>
        ) : orgEvent === 'true' && selectedDate !== '' ? (
          <p className={styles.cardDateCurrent}>{selectedDate.replace('de', '/')}</p>
        ) : orgEvent !== 'true' ? (
          <div>
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
                        {date.dateFormated.replace('de', '/')}
                      </option>
                    )
                  ) : (
                    'N'
                  )
                )}
              </select>
            ) : event.dates[0].cupos === 0 &&
              event.dates[0].isPublic === true &&
              event.dates[0].inRevision === false ? (
              <p className={styles.cardCuposCurrent}>Cupos LLenos</p>
            ) : event.dates[0].dateFormated.slice(event.dates[0].dateFormated.length - 4) === numCadena &&
              event.dates[0].isPublic === true &&
              event.dates[0].inRevision === false ? (
              <p className={styles.cardDateCurrent}>
                {event.dates[0].dateFormated.slice(0, event.dates[0].dateFormated.length - 7)}
              </p>
            ) : event.dates[0].isPublic === true && event.dates[0].inRevision === false ? (
              <p className={styles.cardDateCurrent}>{event.dates[0].dateFormated.replace('de', '/')}</p>
            ) : (
              ''
            )}

            {/* FAVORITO */}
            {isLoading ? (
              <div className={styles.cardAddLoad}>
                <Hearts
                  height='40'
                  width='40'
                  color='#d53e27'
                  ariaLabel='hearts-loading'
                  wrapperStyle={{}}
                  wrapperClass=''
                  visible={true}
                />
              </div>
            ) : (
              <div>
                {event.organizer._id === user.uid || orgEvent === 'true' ? (
                  ''
                ) : user.uid && !heart ? (
                  <div className={styles.cardAddFav} onClick={handleClickFav}>
                    <input type='checkbox' id={`${event._id}-${listName}`} />
                    <label htmlFor={`${event._id}-${listName}`}>
                      <AddIcon className={styles.iconAddFavEvent} sx={{ fontSize: 30, color: '#868686' }} />
                    </label>
                  </div>
                ) : user.uid && heart ? (
                  <div className={styles.cardAddFavHeart} onClick={handleClickWithoutFav}>
                    <input type='checkbox' id={`${event._id}-${listName}`} />
                    <label htmlFor={`${event._id}-${listName}`}>
                      <FavoriteIcon className={styles.iconFavEvent} sx={{ fontSize: 25, color: 'white' }} />
                    </label>
                  </div>
                ) : (
                  <div className={styles.cardAddFav} ref={menuRef}>
                    <input type='checkbox' id={`${event._id}-${listName}`} />
                    <label htmlFor={`${event._id}-${listName}`} onClick={handleClickOpenDrop}>
                      <AddIcon
                        sx={{
                          fontSize: 30,
                          color: '#868686',
                          cursor: 'pointer',
                        }}
                      />
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
              </div>
            )}
          </div>
        ) : (
          ''
        )}

        {/* RATING */}
        <div className={styles.cardRating}>
          <Rating
            className={styles.rating}
            value={event.rating}
            name='half-rating'
            defaultValue={2.5}
            precision={0.5}
            readOnly
          />
          <span className={styles.numberRating}>({event.rating})</span>
        </div>

        {/* TITULO */}
        <p className={styles.cardTitle} title={event.title}>
          {event.title}
        </p>

        <p className={styles.cardDescription}>{event.shortDescription.slice(0, 70)}</p>
      </div>

      <hr className={styles.cardHr}></hr>

      {organizer.length === 1 ? (
        organizer[0].userpicture && organizer[0].name ? (
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
            <Link to={`/sobre-el-organizador/${organizer[0]._id}`}>
              <p className={styles.cardOrgName}>{organizer[0].name}</p>
            </Link>
            <div className={styles.vLine}></div>
            {/* PRICE */}
            {orgEvent === 'true' && datePrice === undefined ? (
              <div>
                <p className={styles.cardPrice}>${event.dates[0].price}</p>
              </div>
            ) : orgEvent === 'true' && datePrice !== undefined ? (
              <div>
                <p className={styles.cardPrice}>${datePrice}</p>
              </div>
            ) : orgEvent === undefined && datePrice === undefined && price !== '' ? (
              <p className={styles.cardPrice}>${price}</p>
            ) : (
              <p className={styles.cardPrice}>${event.dates[0].price}</p>
            )}
            <div className={styles.vLine}></div>
            <Link className={styles.link} to={`/detalles-del-evento/${event._id}`}>
              <p className={styles.cardDetails}>Ver más</p>
            </Link>
          </div>
        ) : (
          <div className={styles.cardOrgInfo}>
            {/* PRICE */}
            {orgEvent === 'true' && datePrice === undefined ? (
              <div>
                <p className={styles.cardPrice}>${event.dates[0].price}</p>
              </div>
            ) : orgEvent === 'true' && datePrice !== undefined ? (
              <div>
                <p className={styles.cardPrice}>${datePrice}</p>
              </div>
            ) : orgEvent === undefined && datePrice === undefined && price !== '' ? (
              <p className={styles.cardPrice}>${price}</p>
            ) : (
              <p className={styles.cardPrice}>${event.dates[0].price}</p>
            )}
            <div className={styles.vLine}></div>

            {/* VER MAS */}
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
            <Link to={`/sobre-el-organizador/${event.organizer._id}`}>
              <p className={styles.cardOrgName}>{event.organizer.name}</p>
            </Link>
            <div className={styles.vLine}></div>
            {/* PRICE */}
            {orgEvent === 'true' && datePrice === undefined ? (
              <div>
                <p className={styles.cardPrice}>${event.dates[0].price}</p>
              </div>
            ) : orgEvent === 'true' && datePrice !== undefined ? (
              <div>
                <p className={styles.cardPrice}>${datePrice}</p>
              </div>
            ) : orgEvent === undefined && datePrice === undefined && price !== '' ? (
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
          {/* PRICE */}
          {orgEvent === 'true' && datePrice === undefined ? (
            <div>
              <p className={styles.cardPrice}>${event.dates[0].price}</p>
            </div>
          ) : orgEvent === 'true' && datePrice !== undefined ? (
            <div>
              <p className={styles.cardPrice}>${datePrice}</p>
            </div>
          ) : orgEvent === undefined && datePrice === undefined && price !== '' ? (
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

      {/* CARD ORGANIZADOR */}
      {orgEvent === 'true' && (
        <div className={styles.containerDatos}>
          <div className={styles.datos}>
            {event.dates.length > 1 ? (
              <div className={styles.subDatos}>
                <p>Fechas:</p>
                <h4>{event.dates.length}</h4>
                <button onClick={(e) => handleDates(e)}>Ver</button>
                {getDates && (
                  <div className={styles.containerMenuGetDates} ref={menuRef}>
                    <div className={styles.closeMenuGetDate}>
                      {/* <button onClick={() => setGetDates(false)}>
                          <AiOutlineClose />
                        </button> */}
                    </div>
                    <div className={styles.container_choosedate}>
                      {event.dates.map((date) => (
                        <p
                          style={{
                            color: '#868686',
                            fontFamily: 'Raleway',
                            fontSize: '1.5rem',
                            margin: '1rem auto',
                          }}
                          onClick={(e) => chooseDate(e, date._id, date.dateFormated, date.price)}
                        >
                          {date.date}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              ''
            )}
            <div className={styles.subDatos}>
              <p>Asistentes:</p>
              {event.dates.map((date) =>
                date._id === selectedDateId ? (
                  date.buyers.length > 1 ? (
                    <h4>{date.buyers.length}</h4>
                  ) : date.buyers.length === 0 ? (
                    <h4>0</h4>
                  ) : date.buyers !== undefined ? (
                    <h4>0</h4>
                  ) : (
                    <h4>0</h4>
                  )
                ) : (
                  ''
                )
              )}
              <Link to={`/usuario/asistentes-al-evento/${event._id}/${selectedDateId}`}>
                <button>Ver</button>
              </Link>
            </div>
            <div className={styles.subDatos}>
              <p>Ganancias:</p>
              <h4>{event.dates.length}</h4>
              <button onClick={(e) => handleEarns(e)}>Ver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
