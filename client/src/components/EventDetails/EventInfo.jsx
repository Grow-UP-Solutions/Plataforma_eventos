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
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/navigation/navigation.min.css';

const EventInfo = ({event}) => {


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

      <div className={style.redes}>
        <ImFacebook  className={style.icons}/>
        <ImTwitter className={style.icons}/>
        <ImLinkedin2 className={style.icons}/>
        <FaInstagram className={style.icons}/>
      </div>
      
      <div className={style.container_icon_heart}>
        <FavoriteIcon className={style.icon_heart} sx={{ fontSize: 25 }}/>
      </div>

      <div className={style.container_icon_share}>
        <LaunchOutlinedIcon className={style.icon_share} sx={{ fontSize: 25 }}/>
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
        <p>Ver mas</p>
      </div>

      <p className={style.report}>
        <WarningOutlinedIcon fontSize="medium"/>   Reportar Contenido Inapropiado
      </p>

    </div>
  );
};
  
export default EventInfo;