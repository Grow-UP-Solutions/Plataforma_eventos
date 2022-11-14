import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Rating } from '@mui/material';
import React, { useContext, useState, useEffect, useRef } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { AiOutlineClose } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';
import { ImFacebook, ImLinkedin2, ImTwitter } from 'react-icons/im';
import { IoLinkOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll, Element, scroller } from 'react-scroll';
import swal from 'sweetalert';
import { Navigation, Pagination } from 'swiper';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import eventsApi from '../../axios/eventsApi';
import EventComments from '../../components/EventDetails/EventComments';
import EventLocation from '../../components/EventDetails/EventLocation';
import EventSideBar from '../../components/EventDetails/EventSideBar';
import { AuthContext } from '../../context/auth/AuthContext';
import { stateContext } from '../../context/state/stateContext';
import { UIContext } from '../../context/ui';
import { getEvents } from '../../redux/actions';
// import { formatDate } from '../../utils/formatDate';
import style from './EventDetails.module.css';

const EventDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];
  const [getDanger, setGetDanger] = useState(false);
  // const [check, setCheck] = useState(null);
  const [checked] = useState('');
  const [component, setComponent] = useState(null);
  const [description, setDescription] = useState(false);
  const [heart, setHeart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { notes, setNotes } = useContext(stateContext);
  const { getEventsFavourites, getEffectRatingEvent, ratingEvent } = useContext(UIContext);
  const menuRef = useRef();

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    dispatch(getEvents);
  }, [dispatch]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const data = await eventsApi.get('/events/' + id);
      const json = data.data;
      getEffectRatingEvent(json.rating);
    };
    obtenerDatos();
  }, [eventDetails]);

  useEffect(() => {
    const getFav = async () => {
      try {
        const res = await eventsApi.get('/users/' + user.uid);
        setHeart(res.data.myFavorites.find((e) => e._id === id));
      } catch (error) {
        console.log(error);
      }
    };
    getFav();
  }, [user.uid]);

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
        console.log('dropdown:', menuRef.current);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  /* const handleFormatDate = (check) => {
    setCheck(check);
    setChecked(formatDate(check));
  }; */

  const handleClickFav = async (e) => {
    e.preventDefault();
    const fav = {
      type: 'favoritos',
      idUser: user.uid,
    };
    const favorite = {
      idEvent: id,
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

  const handleAlert = (e) => {
    e.preventDefault();
    swal({
      title: 'Debes estar registrado para poder agregar un evento como Favorito',
      icon: 'warning',
      button: 'Cerrar',
      dangerMode: true,
    });
  };

  const handleClickWatchComments = (e) => {
    e.preventDefault();
    setComponent(<EventComments id={id} />);
    scroller.scrollTo('comments');
  };

  const handleClickLongDescription = (e) => {
    e.preventDefault();
    setDescription(true);
  };

  const handleClickShare = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${style.container} container`}>
      <div className={style.item1}>
        {eventDetails ? (
          <div className={style.containers}>
            <Swiper
              slidesPerView={1}
              spaceBetween={40}
              navigation
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Pagination, Navigation]}
              className={style.mySwipper}
            >
              {eventDetails.pictures.length > 1 ? (
                eventDetails.pictures.map((picture) => (
                  <SwiperSlide>
                    <img className={style.img} src={picture.picture} alt='Not Found ):' />
                  </SwiperSlide>
                ))
              ) : (
                <img className={style.img} src={eventDetails.pictures[0].picture} alt='Not Found ):' />
              )}
            </Swiper>

            {eventDetails.organizer._id === user.uid ? (
              ''
            ) : user.uid && heart ? (
              <div className={style.container_icon_heart_p}>
                <FavoriteIcon className={style.icon_heart_p} sx={{ fontSize: 25, color: 'white', margin: 'auto' }} />
              </div>
            ) : user.uid && !heart ? (
              <div className={style.container_icon_heart} onClick={user.uid ? handleClickFav : handleAlert}>
                <AddIcon className={style.icon_heart} sx={{ fontSize: 30, color: '#868686' }} />
              </div>
            ) : (
              <div className={style.container_icon_heart} onClick={user.uid ? handleClickFav : handleAlert}>
                <AddIcon className={style.icon_heart} sx={{ fontSize: 30, color: '#868686' }} />
              </div>
            )}

            <div className={style.container_icon_share} ref={menuRef}>
              {/*  <input type='checkbox' id='check' /> */}
              <div className={style.label} onClick={handleClickShare}>
                <LaunchOutlinedIcon className={style.icon_share} sx={{ fontSize: 25 }} />
              </div>

              {isOpen && (
                <div className={style.redes}>
                  <a href='https://www.facebook.com/' target='_blank' rel='noreferrer noopener'>
                    <ImFacebook className={style.icons} />
                  </a>

                  <a href='https://www.twitter.com/' target='_blank' rel='noreferrer noopener'>
                    <ImTwitter className={style.icons} />
                  </a>

                  <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer noopener'>
                    <ImLinkedin2 className={style.icons} />
                  </a>

                  <a href='https://web.whatsapp.com/' target='_blank' rel='noreferrer noopener'>
                    <FaWhatsapp className={style.icons} />
                  </a>

                  <a href={eventDetails.link} target='_blank' rel='noreferrer noopener'>
                    <IoLinkOutline className={style.icons} />
                  </a>
                </div>
              )}
            </div>

            <div className={style.title}>
              <p>{eventDetails.title}</p>

              <div className={style.container_rating}>
                <Rating
                  className={style.rating}
                  name='half-rating'
                  value={ratingEvent}
                  precision={0.5}
                  readOnly
                  sx={{ fontSize: 25 }}
                />
              </div>

              <p className={style.numberRating}>({ratingEvent})</p>
            </div>

            <div className={style.container_opinions}>
              <p className={style.opinions} onClick={handleClickWatchComments}>
                Ver Opiniones
              </p>
            </div>

            <p className={style.title_description}>
              <DescriptionOutlinedIcon fontSize='large' /> Descripcion Del Evento
            </p>

            <p className={style.description}>{eventDetails.shortDescription}</p>

            <div className={style.container_plus}>
              <p onClick={handleClickLongDescription}>Ver más</p>
            </div>

            {description ? <p className={style.description}>{eventDetails.longDescription}</p> : ''}

            <div className={style.line}></div>

            {/* <p className={style.report}>
              <WarningOutlinedIcon fontSize="medium"/>   Reportar Contenido Inapropiado
            </p> */}

            <p onClick={() => setGetDanger(!getDanger)} className={style.report}>
              <WarningOutlinedIcon fontSize='medium' /> Reportar Contenido Inapropiado
            </p>

            {getDanger && (
              <div className={style.containerMenuGetDanger}>
                <div className={style.closeMenuGetDanger}>
                  <button onClick={() => setGetDanger(false)}>
                    <AiOutlineClose />
                  </button>
                </div>
                <div className={style.containerDescription}>
                  <h2 className={style.menuTitle}>
                    ¿Por qué consideras que el contenido de esta opinión es inapropiado?{' '}
                  </h2>
                </div>
                <div className={style.containerDanger}>
                  <div className={style.containerFormDanger}>
                    <div className={style.menuOptions}>
                      <form action=''>
                        <div className={style.formGroup}>
                          <label htmlFor='check'>
                            <input type='checkbox' id='check' value={checked} defaultChecked={false} />
                            Despectivo
                          </label>
                        </div>
                        <div className={style.formGroup}>
                          <label htmlFor='check'>
                            <input type='checkbox' id='check' value={checked} defaultChecked={false} />
                            Racista
                          </label>
                        </div>
                        <div className={style.formGroup}>
                          <label htmlFor='check'>
                            <input type='checkbox' id='check' value={checked} defaultChecked={false} />
                            Incita a la violencia
                          </label>
                        </div>
                        <div className={style.formGroup}>
                          <label htmlFor='check'>
                            <input type='checkbox' id='check' value={checked} defaultChecked={false} />
                            Sexual explicito
                          </label>
                        </div>
                        <div className={style.formGroup}>
                          <label htmlFor='check'>
                            <input type='checkbox' id='check' value={checked} defaultChecked={false} />
                            Otro
                          </label>
                        </div>
                        <div className={style.formGroup}>
                          <label htmlFor='check'>Si otro, indicar cual: </label>
                          <input type='text' id='check' value={checked} />
                        </div>
                        <div className={style.containerBtn}>
                          <button type='submit' className={style.btnMenuDanger}>
                            Reportar
                          </button>
                          <button type='submit' className={style.btnMenuDanger}>
                            Cancelar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          ''
        )}

        <EventLocation id={id} />

        <Element name='comments'>{component ? component : ''}</Element>
      </div>

      <div className={style.item2}>
        <EventSideBar id={id} />
      </div>
    </div>
  );
};

export default EventDetails;
