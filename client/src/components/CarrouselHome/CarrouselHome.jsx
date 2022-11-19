import React from 'react';
import { Link } from 'react-router-dom';
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
        'https://images.unsplash.com/photo-1518528802892-ec2191995c99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 2,
      title: 'image2',
      url:
        'https://images.unsplash.com/photo-1518528802892-ec2191995c99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 3,
      title: 'image3',
      url:
        'https://images.unsplash.com/photo-1518528802892-ec2191995c99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 4,
      title: 'image4',
      url:
        'https://images.unsplash.com/photo-1518528802892-ec2191995c99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 5,
      title: 'image5',
      url:
        'https://images.unsplash.com/photo-1518528802892-ec2191995c99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
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
        modules={[Autoplay, Pagination, Navigation]}
        className={style.mySwipper}
      >
        {images.length ? (
          images.map((e) => {
            return (
              <SwiperSlide key={e.id}>
                <img className={style.img} src={e.url} alt={e.title} />
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
      <div className={style.containerBtnOrganizerEvent}>
        <Link to={'/oganiza-un-evento'}>Organiza un evento</Link>
      </div>
    </div>
  );
};

export default CarrouselHome;
