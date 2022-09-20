import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import Search from '../Search/Search';
import style from './CarrouselHome.module.css';

const CarrouselHome = () => {
  const images = [
    {
      id: 1,
      title: 'image1',
      url:
        'https://res.cloudinary.com/djsp3n1qy/image/upload/v1663114004/Plataforma_Eventos/gas1_wm6wph.jpg',
    },
    {
      id: 2,
      title: 'image2',
      url:
        'https://res.cloudinary.com/djsp3n1qy/image/upload/v1663113988/Plataforma_Eventos/gas2_corxwc.jpg',
    },
    {
      id: 3,
      title: 'image3',
      url:
        'https://res.cloudinary.com/djsp3n1qy/image/upload/v1663114004/Plataforma_Eventos/gas1_wm6wph.jpg',
    },
    {
      id: 4,
      title: 'image4',
      url:
        'https://res.cloudinary.com/djsp3n1qy/image/upload/v1663113988/Plataforma_Eventos/gas2_corxwc.jpg',
    },
    {
      id: 5,
      title: 'image5',
      url:
        'https://res.cloudinary.com/djsp3n1qy/image/upload/v1663114004/Plataforma_Eventos/gas1_wm6wph.jpg',
    },
  ];

  return (
    <div id="hero" className={style.container}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Autoplay, Pagination, Navigation]}
        className={style.mySwipper}
      >
        {images.length ? (
          images.map((e) => {
            return (
              <SwiperSlide>
                <div key={e.id}>
                  <img className={style.img} src={e.url} alt={e.title} />
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <h5>No hay imagenes</h5>
        )}
      </Swiper>

      <div className={style.container_p}>
        <p>Aqui va un texto de</p>
        <p>enganche grande</p>
        <p className={style.item_p}>
          Aqui un texto que acompañe el titulo de enganche
        </p>
      </div>

      <div className={style.search}>
        <Search />
      </div>
    </div>
  );
};

export default CarrouselHome;
