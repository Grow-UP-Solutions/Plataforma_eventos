import React, { useState, useEffect } from 'react';
import style from './CarrouselHome.module.css'; 
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination , Scrollbar , Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import Search from '../Search/Search';

const CarrouselHome = () => {

  const images = [
    {
      id: 1,
      title: 'image1',
      url: 'https://res.cloudinary.com/djsp3n1qy/image/upload/v1663114004/Plataforma_Eventos/gas1_wm6wph.jpg'
    },
    {
      id: 2,
      title: 'image2',
      url: 'https://res.cloudinary.com/djsp3n1qy/image/upload/v1663113988/Plataforma_Eventos/gas2_corxwc.jpg'
    },
  ];
  
  return (
    <div className={style.container}>
      <Swiper
        slidesPerView={1}
        spaceBetween={70}
        pagination={{
          clickable: true,
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Pagination , Navigation]}
        className={style.mySwipper}
      >
          
        {
          images.length ? (
              images.map((e) => {
                return (
                  <SwiperSlide>
                    <div key={e.id}>
                        <img className={style.img} src={e.url} alt={e.title} />
                    </div>
                  </SwiperSlide>
                )
              })
            ) : (
          <h5>No hay imagenes</h5>
          )
        }

      </Swiper> 

      <div className={style.container_p}>
        <p>Aqui va un texto de</p>
        <p>enganche grande</p>
        <p className={style.item_p}>Aqui un texto que acompañe el titulo de enganche</p>
      </div>

      <div className={style.search}>
        <Search/>
      </div>
      
    </div>
  );
}

export default CarrouselHome;
