import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Navigation, Pagination } from 'swiper';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import eventsApi from '../../axios/eventsApi';
import { AuthContext } from '../../context/auth/AuthContext';
import { UIContext } from '../../context/ui';
import Card from '../Cards/Card';
import styles from './Events.module.css';

const Events = () => {
  //Fecha actual
  const fecha = new Date();
  const hora = fecha.getHours();
  const minutes = fecha.getMinutes();
  const dateActual = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

  const todosLosEventos = useSelector((state) => state.events);

  const allEvents = todosLosEventos.filter((event) => event.isPublic === true && event.inRevision === false);

  //POPULARES//

  const orderByRating = allEvents.sort((a, b) => {
    if (a.rating > b.rating) return -1;
    if (b.rating > a.rating) return 1;
    return 0;
  });
  const mostPopular = orderByRating.slice(0, 20);

  //ESTA SEMANA//

  let curr = new Date();
  let week = [];

  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
  }

  let weekEvents = [];

  for (let a = 1; a <= week.length; a++) {
    allEvents.map((evento) => {
      evento.dates.map((date) => {
        if (date.date === week[a] && !weekEvents.includes(evento)) {
          weekEvents.push(evento);
        }
      });
    });
  }

  const eventsWeek = weekEvents.filter((e) => e !== undefined);

  //FRESQUITOS//
  const newEvents = allEvents.slice(allEvents.length - 18);
  const newEventsReverse = newEvents.reverse();

  //USUARIO//
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData();
  }, [user]);

  useEffect(() => {}, [userData]);

  const getUserData = async () => {
    let userResult = {};
    if (user.uid) {
      userResult = await eventsApi.get(`/users/${user.uid}`);
      setUserData(userResult.data);
      setGetFav(userResult.data.myFavorites);
    }
  };

  const [cardPerView, setCardPerView] = useState(4);

  useEffect(() => {
    if (window.innerWidth <= 623) return setCardPerView(2.1);
    if (window.innerWidth <= 692) return setCardPerView(2.3);
    if (window.innerWidth <= 1160) return setCardPerView(2.5);
    if (window.innerWidth <= 1490) return setCardPerView(3.5);
  }, [window.innerWidth]);

  window.onresize = function() {
    if (window.innerWidth <= 623) return setCardPerView(2.1);
    if (window.innerWidth <= 692) return setCardPerView(2.3);
    if (window.innerWidth <= 1160) return setCardPerView(2.5);
    if (window.innerWidth <= 1490) return setCardPerView(3.5);
  };

  //MI LISTA
  const { /* eventsFavourites, */ setGetFav } = useContext(UIContext);

  return (
    <>
      <div className={`${styles.cardsSection} container`}>
        <p className={styles.titleCards}>Populares</p>
        <div className={styles.cardsCarousel}>
          <Swiper
            slidesPerView={cardPerView}
            slidesPerGroup={cardPerView === 4 ? 4 : Math.trunc(cardPerView - 0.5)}
            navigation
            spaceBetween={0}
            modules={[Navigation]}
            className={styles.mySwipper}
          >
            {mostPopular.length ? (
              mostPopular.map((event, index) => {
                return (
                  <SwiperSlide key={`${event._id}-popu`}>
                    <Card event={event} listName={'populares'} />
                  </SwiperSlide>
                );
              })
            ) : (
              <p className={styles.not_event}>No hay eventos ...</p>
            )}
          </Swiper>
        </div>
        <p className={styles.titleCards}>Esta Semana</p>
        <div className={styles.cardsCarousel}>
          <Swiper
            slidesPerView={cardPerView}
            slidesPerGroup={cardPerView === 4 ? 4 : Math.trunc(cardPerView - 0.5)}
            spaceBetween={0}
            navigation
            modules={[Pagination, Navigation]}
            className={styles.mySwipper}
          >
            {eventsWeek.length && eventsWeek !== undefined ? (
              eventsWeek.map((event, index) => {
                return (
                  <SwiperSlide key={`${event._id}-week`}>
                    <Card event={event} listName={'week'} />
                  </SwiperSlide>
                );
              })
            ) : (
              <p className={styles.not_event}>No hay eventos ...</p>
            )}
          </Swiper>
        </div>
        <p className={styles.titleCards}>Fresquitos</p>
        <div className={styles.cardsCarousel}>
          <Swiper
            slidesPerView={cardPerView}
            slidesPerGroup={cardPerView === 4 ? 4 : Math.trunc(cardPerView - 0.5)}
            spaceBetween={0}
            navigation
            modules={[Pagination, Navigation]}
            className={styles.mySwipper}
          >
            {newEventsReverse.length ? (
              newEventsReverse.map((event) => {
                return (
                  <SwiperSlide key={`${event._id}-newEvent`}>
                    <Card event={event} listName={'fresquitos'} />
                  </SwiperSlide>
                );
              })
            ) : (
              <p className={styles.not_event}>No hay eventos ...</p>
            )}
          </Swiper>
        </div>
        {Object.keys(user).length > 0 && (
          <>
            <p className={styles.titleCards}>Mi Lista</p>
            <div className={styles.cardsCarousel}>
              <Swiper
                slidesPerView={cardPerView}
                slidesPerGroup={cardPerView === 4 ? 4 : Math.trunc(cardPerView - 0.5)}
                spaceBetween={0}
                navigation
                modules={[Pagination, Navigation]}
                className={styles.mySwipper}
              >
                {userData.myFavorites !== undefined ? (
                  userData.myFavorites.map((event) => {
                    return (
                      <SwiperSlide key={`${event._id}-favourites`}>
                        <Card event={event} listName={'miLista'} />
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <p className={styles.not_event}>No tienes eventos agregados a: Mi Lista ...</p>
                )}
              </Swiper>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Events;
