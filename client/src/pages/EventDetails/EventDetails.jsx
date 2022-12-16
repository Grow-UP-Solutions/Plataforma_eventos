import AddIcon from '@mui/icons-material/Add';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import { Rating } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { Navigation } from 'swiper';
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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Hearts } from 'react-loader-spinner';
import EventDate from '../../components/EventDetails/EventDate';
import formatDateToString from '../../utils/formatDateToString';
import style from './EventDetails.module.css';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';

const EventDetails = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];
  const [getDanger, setGetDanger] = useState(false);
  const [component, setComponent] = useState(null);
  const [description, setDescription] = useState(false);
  const [heart, setHeart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { notes, setNotes } = useContext(stateContext);
  const {
    getEventsFavourites,
    getEffectRatingEvent,
    ratingEvent,
    getEventsWithoutFavourites,
    toggleScreenLogin,
  } = useContext(UIContext);
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
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [heart, user]);

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

  const handleClickWithoutFav = async (e) => {
    e.preventDefault();
    const favorite = {
      idEvent: id,
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

  /* const handleClickLongDescription = (e) => {
    e.preventDefault();
    setDescription(true);
  }; */

  const handleClickShare = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClickCopy = (e) => {
    e.preventDefault();
    swal({
      title: 'Enlace copiado',
      icon: 'success',
      button: 'OK',
    });
  };

  const [reportChecked, setReportChecked] = useState('');
  const [resultMessageReport, setResultMessageReport] = useState(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const handleChangeCheckboxReport = (e) => {
    const value = e.target.value;
    setReportChecked(value);
  };

  const inputReasonForReport = useRef('');

  const sendReportContent = async () => {
    if (Object.keys(user).length === 0) {
      return toggleScreenLogin();
    }

    let reasonToReport = '';

    if (reportChecked === 'Otro') {
      reasonToReport = inputReasonForReport.current.value;
    } else {
      reasonToReport = reportChecked;
    }

    if (reasonToReport === '') {
      return setResultMessageReport({
        success: false,
        message: 'Ingrese una razón al reporte.',
      });
    }

    setIsLoadingReport(true);

    const dataForReport = {
      userReport: { name: user.name, email: user.email },
      eventReport: {
        title: eventDetails.title,
        picture: eventDetails.pictures[0].picture,
        nameOrganizer: eventDetails.organizer.name,
        emailOrganizer: eventDetails.organizer.email,
      },
      dateReport: formatDateToString(new Date()),
      reasonToReport,
    };

    try {
      await eventsApi.put('/events/reportEvent/sendEmail', {
        dataForReport,
      });

      setIsLoadingReport(false);
      setResultMessageReport({
        success: true,
        message: 'Gracias por tu reporte, el cual a sido enviado exitosamente. El contenido será investigado y las debidas acciones serán tomadas.',
      });
    } catch (error) {
      setResultMessageReport({
        success: false,
        message: error.message,
      });
      console.log({ error });
    }
  };

  const handleCloseToMenuReport = async () => {
    setGetDanger(false);
    setReportChecked(null);
  };

  const [openMenuEvent, setOpenMenuEvent] = useState(false);

  const handleCheckOpenMenuEvent = () => {
    setOpenMenuEvent(!openMenuEvent);
  };

  return (
    <div className={`${style.container}`}>
      <div className={style.item1}>
        {eventDetails ? (
          <div className={style.containers}>
            <div className={style.containerSwiper}>
              {eventDetails.pictures.length > 1 ? (
                <div className={style.containerSwiperGeneral}>
                  <Swiper slidesPerView={1} navigation modules={[Navigation]} className='mySwipperEventDetails'>
                    {eventDetails.pictures.map((picture) => (
                      <SwiperSlide>
                        <img className={style.img} src={picture.picture} alt='Not Found ):' />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <img className={style.img} src={eventDetails.pictures[0].picture} alt='Not Found ):' />
              )}
              <div className={style.containerIconFavAndShare}>
                {isLoading ? (
                  <div className={style.container_icon_heart_l}>
                    {/* <Hearts
                    height='40'
                    width='40'
                    color='#d53e27'
                    ariaLabel='hearts-loading'
                    wrapperStyle={{}}
                    wrapperClass=''
                    visible={true}
                  /> */}
                  </div>
                ) : (
                  <>
                    {eventDetails.organizer._id === user.uid ? (
                      ''
                    ) : user.uid && heart ? (
                      <div className={style.container_icon_heart_p} onClick={handleClickWithoutFav}>
                        <FavoriteIcon
                          className={style.icon_heart_p}
                          sx={{ fontSize: 25, color: 'white', margin: 'auto' }}
                        />
                      </div>
                    ) : user.uid && !heart ? (
                      <div className={style.container_icon_heart} onClick={handleClickFav}>
                        <AddIcon className={style.icon_heart} sx={{ fontSize: 30, color: '#868686' }} />
                      </div>
                    ) : (
                      <div className={style.container_icon_heart} onClick={handleAlert}>
                        <AddIcon className={style.icon_heart} sx={{ fontSize: 30, color: '#868686' }} />
                      </div>
                    )}
                  </>
                )}

                <div className={style.container_icon_share} ref={menuRef}>
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

                      <CopyToClipboard text={`https://events-jean.vercel.app//detalles-del-evento/${id}`}>
                        <IoLinkOutline onClick={handleClickCopy} className={style.icons} />
                      </CopyToClipboard>
                    </div>
                  )}
                </div>
              </div>
              <div className={style.auxDivSwiper}></div>
            </div>
            <div className={style.containerEventInformation}>
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

              <p className={style.description}>{eventDetails.longDescription}</p>

              {/* <div className={style.container_plus}>
              <p onClick={handleClickLongDescription}>Ver más</p>
            </div>

            {description ? (
              <p className={style.description}>
                {eventDetails.longDescription}
              </p>
            ) : (
              ""
            )} */}

              <div className={style.line}></div>

              <p onClick={() => setGetDanger(!getDanger)} className={style.report}>
                <WarningOutlinedIcon fontSize='medium' /> Reportar Contenido Inapropiado
              </p>

              {getDanger && (
                <div className={style.containerMenuGetDanger}>
                  <div className={style.closeMenuGetDanger}>
                    <button onClick={handleCloseToMenuReport}>
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
                        <form className={style.formReport} action=''>
                          <div className={style.formGroup}>
                            <input
                              type='checkbox'
                              id='despectivo'
                              value={'Despectivo'}
                              defaultChecked={false}
                              className={style.checkboxReport}
                              checked={reportChecked === 'Despectivo'}
                              onChange={handleChangeCheckboxReport}
                            />
                            <label htmlFor='despectivo'>Dispectivo</label>
                          </div>
                          <div className={style.formGroup}>
                            <input
                              type='checkbox'
                              id='racista'
                              value={'Racista'}
                              defaultChecked={false}
                              className={style.checkboxReport}
                              checked={reportChecked === 'Racista'}
                              onChange={handleChangeCheckboxReport}
                            />
                            <label htmlFor='racista'>Racista</label>
                          </div>
                          <div className={style.formGroup}>
                            <input
                              type='checkbox'
                              id='violencia'
                              value={'Violencia'}
                              defaultChecked={false}
                              className={style.checkboxReport}
                              checked={reportChecked === 'Violencia'}
                              onChange={handleChangeCheckboxReport}
                            />
                            <label htmlFor='violencia'>Incita a la violencia</label>
                          </div>
                          <div className={style.formGroup}>
                            <input
                              type='checkbox'
                              id='sexual'
                              value={'Sexual'}
                              className={style.checkboxReport}
                              checked={reportChecked === 'Sexual'}
                              onChange={handleChangeCheckboxReport}
                            />
                            <label htmlFor='sexual'>Sexual explicito</label>
                          </div>
                          <div className={style.formGroup}>
                            <input
                              type='checkbox'
                              id='otro'
                              value={'Otro'}
                              defaultChecked={false}
                              className={style.checkboxReport}
                              checked={reportChecked === 'Otro'}
                              onChange={handleChangeCheckboxReport}
                            />
                            <label htmlFor='otro'>Otro</label>
                          </div>
                          <div className={`${style.formGroupOtherReason} ${style.formGroup}`}>
                            <label htmlFor='other-reason'>Si otro, indicar cual: </label>
                            <input ref={inputReasonForReport} type='text' id='other-reason' />
                          </div>

                          <div className={style.containerBtn}>
                            <button onClick={sendReportContent} type='button' className={style.btnMenuDanger}>
                              Reportar
                            </button>
                            <button onClick={handleCloseToMenuReport} type='button' className={style.btnMenuDanger}>
                              Cancelar
                            </button>
                            {isLoadingReport && <AiOutlineLoading3Quarters className={style.iconLoadingReport} />}
                          </div>
                          {resultMessageReport && (
                            <p
                              style={{
                                color: resultMessageReport.success ? '#29aa79' : '#d53e27',
                              }}
                              className={style.errorMessageReportEvent}
                            >
                              {resultMessageReport.message}
                            </p>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          ''
        )}

        <EventLocation id={id} />

        <div className={style.containerCommentsEventsScreenHigh}>
          <Element name='comments'>{component ? component : ''}</Element>
        </div>
      </div>

      <EventSideBar id={id} />
      <div className={style.containerCommentsEvents}>
        <EventComments id={id} />
      </div>

      <div className={style.containerMenuOpenEvent}>
        <input
          className={style.checkOpenMenu}
          checked={openMenuEvent}
          onChange={handleCheckOpenMenuEvent}
          type='checkbox'
          id='openMenuEvent'
        />
        <label className={style.containerIconOpenMenu} htmlFor='openMenuEvent'>
          {!openMenuEvent ? (
            <MdOutlineKeyboardArrowUp className={style.iconMenu} />
          ) : (
            <MdOutlineKeyboardArrowDown className={style.iconMenu} />
          )}
        </label>
        <div className={style.containerTableBuy}>
          <EventDate openMenu={handleCheckOpenMenuEvent} id={id} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
