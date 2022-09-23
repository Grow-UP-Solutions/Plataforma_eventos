import React from 'react';
import styles from './Events.module.css';
import Card from '../Cards/Card';
import events from '../../api/events';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react/swiper-react';
import { Pagination, Scrollbar, Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/navigation/navigation.min.css';

const Events = () => {
  const eventsShow = events.slice(0, 20);

  return (
    <div className={styles.cardsSection}>
      <p className={styles.titleCards}>Populares</p>
      <div className={styles.cardsCarousel}>
        <Swiper
          slidesPerView={4.2}
          navigation
          spaceBetween={0}
          modules={[Navigation]}
          className={styles.mySwipper}
        >
          {eventsShow.length ? (
            eventsShow.map((event, index) => {
              return (
                <SwiperSlide key={event.id}>
                  <Card event={event} />
                </SwiperSlide>
              );
            })
          ) : (
            <h5>No hay eventos</h5>
          )}
        </Swiper>
      </div>
      <p className={styles.titleCards}>Esta Semana</p>
      <div className={styles.cardsCarousel}>
        <Swiper
          slidesPerView={4.2}
          spaceBetween={0}
          navigation
          modules={[Pagination, Navigation]}
          className={styles.mySwipper}
        >
          {eventsShow.length ? (
            eventsShow.map((event, index) => {
              return (
                <SwiperSlide key={event.id}>
                  <div key={index}>
                    <Card event={event} />
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <h5>No hay eventos</h5>
          )}
        </Swiper>
      </div>
      <p className={styles.titleCards}>Fresquitos</p>
      <div className={styles.cardsCarousel}>
        <Swiper
          slidesPerView={4.2}
          spaceBetween={0}
          navigation
          modules={[Pagination, Navigation]}
          className={styles.mySwipper}
        >
          {eventsShow.length ? (
            eventsShow.map((event, index) => {
              return (
                <SwiperSlide key={index}>
                  <div>
                    <Card event={event} />
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <h5>No hay eventos</h5>
          )}
        </Swiper>
      </div>
      <p className={styles.titleCards}>Mi Lista</p>
      <div className={styles.cardsCarousel}>
        <Swiper
          slidesPerView={4.2}
          spaceBetween={0}
          navigation
          modules={[Pagination, Navigation]}
          className={styles.mySwipper}
        >
          {eventsShow.length ? (
            eventsShow.map((event, index) => {
              return (
                <SwiperSlide key={index}>
                  <div>
                    <Card event={event} />
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <h5>No hay eventos</h5>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Events;
