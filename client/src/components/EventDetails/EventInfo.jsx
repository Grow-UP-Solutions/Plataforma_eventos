import React from "react";
import style from './EventInfo.module.css'; 
import FavoriteIcon from '@mui/icons-material/Favorite';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { Rating } from '@mui/material';
import { ImFacebook, ImTwitter, ImLinkedin2 } from 'react-icons/im';
import { FaInstagram } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination , Scrollbar , Navigation } from 'swiper';
import { useState } from "react";
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/navigation/navigation.min.css';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AiOutlineClose } from 'react-icons/ai';
import { Calendar } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { formatDate } from '../../utils/formatDate';

const EventInfo = ({event}) => {

  const [getDanger, setGetDanger] = useState(false);
  const [check, setCheck] = useState(null);
  const [checked, setChecked] = useState('');

  const handleFormatDate = (check) => {
    setCheck(check);
    setChecked(formatDate(check));
  };


  return (
    <div className={style.container}>

      <Swiper
        slidesPerView={1}
        spaceBetween={40}
        navigation
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Pagination , Navigation]}
        className={style.mySwipper}
      >
        {
          event.pictures.length > 1 ?
          event.pictures.map(picture =>
            <SwiperSlide>
              <img className={style.img} src={picture} alt="Not Found ):"/>
            </SwiperSlide>
          ) :
          <img className={style.img} src={event.pictures[0]} alt="Not Found ):"/>
        }
      </Swiper>
      
      <div className={style.container_icon_heart}>
        <FavoriteIcon className={style.icon_heart} sx={{ fontSize: 25 }}/>
      </div>

      <div className={style.container_icon_share}>
        <input type="checkbox" id="check"/>
        <label htmlFor="check" className={style.label}>
          <LaunchOutlinedIcon className={style.icon_share} sx={{ fontSize: 25 }}/>
        </label>

        <div className={style.redes}>
          <a href='https://www.facebook.com/'
            target='_blank'
            rel='noreferrer noopener'
          >
            <ImFacebook className={style.icons}/>
          </a>

          <a href='https://www.twitter.com/'
            target='_blank'
            rel='noreferrer noopener'
          >
            <ImTwitter className={style.icons}/>
          </a>
          
          <a href='https://www.linkedin.com/'
            target='_blank'
            rel='noreferrer noopener'
          >
            <ImLinkedin2 className={style.icons}/>
          </a>

          <a href='https://www.instagram.com/'
            target='_blank'
            rel='noreferrer noopener'
          >
            <FaInstagram className={style.icons}/>
          </a>
  
        </div>
      </div>

      <div className={style.title}>
        <p>{event.name}</p>

        <div className={style.container_rating}>
          <Rating
            className={style.rating}
            name="read-only"
            value={event.rating}
            readOnly
            sx={{ fontSize: 25 }}
          />
        </div>

        <p className={style.numberRating}>({event.rating})</p>
      </div>

      <div className={style.container_opinions}>
        <p className={style.opinions}>Ver Opiniones</p>
      </div>
      
      <p className={style.title_description}>
        <DescriptionOutlinedIcon fontSize="large" />  Descripcion Del Evento
      </p>

      <p className={style.description}>{event.description}</p>
      
      <div className={style.container_plus}>
        <p>Ver más</p>
      </div>

      <div className={style.line}></div>

      {/* <p className={style.report}>
        <WarningOutlinedIcon fontSize="medium"/>   Reportar Contenido Inapropiado
      </p> */}

      <p onClick={() => setGetDanger(!getDanger)} className={style.report}>
        <WarningOutlinedIcon fontSize="medium"/>   Reportar Contenido Inapropiado
      </p>

      {getDanger && (
        <div className={style.containerMenuGetDanger}>
          <div className={style.closeMenuGetDanger}>
            <button onClick={() => setGetDanger(false)}>
              <AiOutlineClose />
            </button>
          </div>
          <div className={style.containerDescription}>
            <h2 className={style.menuTitle}>¿Por qué consideras que el contenido de esta opinión es inapropiado? </h2>
          </div>
          <div className={style.containerDanger}>
           
            <div className={style.containerFormDanger}>
              
              <div className={style.menuOptions}>
                <form action="">
                  <div className={style.formGroup}>
                    <label htmlFor="check">
                    <input type="checkbox" id="check" value={checked} defaultChecked={false} />
                    Despectivo</label>
                  </div>
                  <div className={style.formGroup}>
                  <label htmlFor="check">
                    <input type="checkbox" id="check" value={checked} defaultChecked={false} />
                    Racista</label>
                  </div>
                  <div className={style.formGroup}>
                  <label htmlFor="check">
                    <input type="checkbox" id="check" value={checked} defaultChecked={false} />
                    Incita a la violencia</label>
                  </div>
                  <div className={style.formGroup}>
                  <label htmlFor="check">
                    <input type="checkbox" id="check" value={checked} defaultChecked={false} />
                    Sexual explicito</label>
                  </div>
                  <div className={style.formGroup}>
                  <label htmlFor="check">
                    <input type="checkbox" id="check" value={checked} defaultChecked={false} />
                    Otro</label>
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
  );
};
  
export default EventInfo;