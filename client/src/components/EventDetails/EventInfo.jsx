import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import { Rating, useRadioGroup } from '@mui/material';
import React, { useContext, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { AiOutlineClose } from 'react-icons/ai';
import { FaInstagram } from 'react-icons/fa';
import { ImFacebook, ImLinkedin2, ImTwitter } from 'react-icons/im';
import { Navigation, Pagination } from 'swiper';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import { formatDate } from '../../utils/formatDate';
import style from './EventInfo.module.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AuthContext } from '../../context/auth/AuthContext';
import { stateContext } from '../../context/state/stateContext';
import swal from 'sweetalert';
import { UIContext } from '../../context/ui';

const EventInfo = ({ id }) => {
  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];
  const [getDanger, setGetDanger] = useState(false);
  const [check, setCheck] = useState(null);
  const [checked, setChecked] = useState('');
  const { user } = useContext(AuthContext);
  const { notes, setNotes } = useContext(stateContext);
  const { getEventsFavourites } = useContext(UIContext);

  const handleFormatDate = (check) => {
    setCheck(check);
    setChecked(formatDate(check));
  };

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
      const json = await axios.post(
        'https://plataformaeventos-production-6111.up.railway.app/users/notifications',
        fav
      );
      getEventsFavourites(user.uid, favorite);
      setNotes([...notes, json.data]);
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

  // Contenido Inapropiado

  const contenidosInapropiados = ['Despectivo', 'Racista', 'Incita a la violencia', 'Sexual explicito', 'Otro'];

  const [seleccionados, setSeleccionados] = useState([]);
  const [changed, setChanged] = useState(false);
  const [otros, setOtros] = useState([]);

  function handleReport(e) {
    var contenido = e.target.value;
    if (!e.target.checked) {
      let seleccion = seleccionados.filter((c) => c !== e.target.value);
      setSeleccionados(seleccion);
    } else {
      let contenidoCheck = contenidosInapropiados.find((c) => c === contenido);
      setSeleccionados([...seleccionados, contenidoCheck]);
    }
  }

  useEffect(() => {
    var checkeds = document.getElementsByClassName('checkbox');
    for (let i = 0; i < checkeds.length; i++) {
      checkeds[i].checked = false;
    }
    setSeleccionados([]);
  }, [changed]);

  return (
    <div>
      {eventDetails ? (
        <div className={style.container}>
          {/* imagen */}
          <Swiper
            slidesPerView={1}
            spaceBetween={40}
            navigation
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

          <div className={style.container_icon_heart} onClick={user.uid ? handleClickFav : handleAlert}>
            <FavoriteIcon className={style.icon_heart} sx={{ fontSize: 25 }} />
          </div>

          <div className={style.container_icon_share}>
            <input type='checkbox' id='check' />
            <label htmlFor='check' className={style.label}>
              <LaunchOutlinedIcon className={style.icon_share} sx={{ fontSize: 25 }} />
            </label>

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

              <a href='https://www.instagram.com/' target='_blank' rel='noreferrer noopener'>
                <FaInstagram className={style.icons} />
              </a>
            </div>
          </div>

          <div className={style.title}>
            <p>{eventDetails.title}</p>

            <div className={style.container_rating}>
              <Rating
                className={style.rating}
                name='read-only'
                value={eventDetails.rating}
                rating
                readOnly
                sx={{ fontSize: 25 }}
              />
            </div>

            <p className={style.numberRating}>({eventDetails.rating})</p>
          </div>

          <div className={style.container_opinions}>
            <p className={style.opinions}>Ver Opiniones</p>
          </div>

          <p className={style.title_description}>
            <DescriptionOutlinedIcon fontSize='large' /> Descripcion Del Evento
          </p>

          <p className={style.description}>{eventDetails.longDescription}</p>

          <div className={style.container_plus}>
            <p>Ver más</p>
          </div>

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
                    {contenidosInapropiados.map((contenido) => (
                      <div className={style.formGroup}>
                        <input
                          id='check'
                          type='checkbox'
                          value={contenido}
                          onChange={(e) => handleReport(e)}
                          defaultChecked={false}
                          className={style.checkboxReport}
                        />
                        {contenido}
                      </div>
                    ))}
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default EventInfo;
