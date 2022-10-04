import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import { Rating } from '@mui/material';
import React, { useState } from 'react';
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

const EventInfo = ({ id }) => {

 
  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];
 


  const [getDanger, setGetDanger] = useState(false);
  const [check, setCheck] = useState(null);
  const [checked, setChecked] = useState('');
  

  const handleFormatDate = (check) => {
    setCheck(check);
    setChecked(formatDate(check));
  };

 

  return (
    <div>
      {eventDetails?
  
    <div className={style.container}>
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
              <img className={style.img} src={picture.picture} alt="Not Found ):" />
            </SwiperSlide>
          ))
        ) : (
          <img
            className={style.img}
            src={eventDetails.pictures[0].picture}
            alt="Not Found ):"
          />
        )}
      </Swiper>

      <div className={style.container_icon_heart}>
        <FavoriteIcon className={style.icon_heart} sx={{ fontSize: 25 }} />
      </div>

      <div className={style.container_icon_share}>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className={style.label}>
          <LaunchOutlinedIcon
            className={style.icon_share}
            sx={{ fontSize: 25 }}
          />
        </label>

        <div className={style.redes}>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <ImFacebook className={style.icons} />
          </a>

          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <ImTwitter className={style.icons} />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <ImLinkedin2 className={style.icons} />
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaInstagram className={style.icons} />
          </a>
        </div>
      </div>

      <div className={style.title}>
        <p>{eventDetails.title}</p>

        <div className={style.container_rating}>
          <Rating
            className={style.rating}
            name="read-only"
            value={eventDetails.rating}
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
        <DescriptionOutlinedIcon fontSize="large" /> Descripcion Del Evento
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
        <WarningOutlinedIcon fontSize="medium" /> Reportar Contenido Inapropiado
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
              ¿Por qué consideras que el contenido de esta opinión es
              inapropiado?{' '}
            </h2>
          </div>
          <div className={style.containerDanger}>
            <div className={style.containerFormDanger}>
              <div className={style.menuOptions}>
                <form action="">
                  <div className={style.formGroup}>
                    <label htmlFor="check">
                      <input
                        type="checkbox"
                        id="check"
                        value={checked}
                        defaultChecked={false}
                      />
                      Despectivo
                    </label>
                  </div>
                  <div className={style.formGroup}>
                    <label htmlFor="check">
                      <input
                        type="checkbox"
                        id="check"
                        value={checked}
                        defaultChecked={false}
                      />
                      Racista
                    </label>
                  </div>
                  <div className={style.formGroup}>
                    <label htmlFor="check">
                      <input
                        type="checkbox"
                        id="check"
                        value={checked}
                        defaultChecked={false}
                      />
                      Incita a la violencia
                    </label>
                  </div>
                  <div className={style.formGroup}>
                    <label htmlFor="check">
                      <input
                        type="checkbox"
                        id="check"
                        value={checked}
                        defaultChecked={false}
                      />
                      Sexual explicito
                    </label>
                  </div>
                  <div className={style.formGroup}>
                    <label htmlFor="check">
                      <input
                        type="checkbox"
                        id="check"
                        value={checked}
                        defaultChecked={false}
                      />
                      Otro
                    </label>
                  </div>
                  <div className={style.formGroup}>
                    <label htmlFor="check">Si otro, indicar cual: </label>
                    <input type="text" id="check" value={checked} />
                  </div>
                  <div className={style.containerBtn}>
                    <button type="submit" className={style.btnMenuDanger}>
                      Reportar
                    </button>
                    <button type="submit" className={style.btnMenuDanger}>
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

      :''}

    </div>

  );
};

export default EventInfo;
