import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigation, Pagination } from 'swiper';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import eventsApi from '../../axios/eventsApi';
import { AuthContext } from '../../context/auth/AuthContext';
import Card from '../Cards/Card';
import styles from './Events.module.css';

const Events = () => {
  const todosLosEventos = useSelector((state) => state.events);
  // const events = todosLosEventos.map((e)=>{
  //   e.dates.map((d)=>{
  //     if(d.date<dateActual){
  //       d.isPublic= false
  //     }
  //   })
  // })
  const allEvents = todosLosEventos.filter((event) => event.isPublic === true && event.inRevision === false);
  

  //Fecha actual
  var fecha = new Date();
  console.log('fecha:',fecha)
  var hora = fecha.getHours()
  console.log('hora:',hora)
  var minutes = fecha.getMinutes()
  console.log('minutes:',minutes)
  var dateActual = fecha.getFullYear() + "-" + (fecha.getMonth() +1) + "-" + fecha.getDate()  ;
  console.log('dateActual:',dateActual)

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
    for (let b = 0; b < allEvents.length; b++) {
      let evento = allEvents[b].dates.filter((date) => date.date === week[a])[0];
      weekEvents.push(evento);
    }
  }

  const eventsWeek = weekEvents.filter((e) => e !== undefined);

  //FRESQUITOS//

  const newEvents = allEvents.slice(allEvents.length - 20);
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
    }
  };

  return (
    <div className={styles.cardsSection}>
      <p className={styles.titleCards}>Populares</p>
      <div className={styles.cardsCarousel}>
        <Swiper
          slidesPerView={4}
          slidesPerGroup={4}
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
            <h5>No hay eventos</h5>
          )}
        </Swiper>
      </div>
      <p className={styles.titleCards}>Esta Semana</p>
      <div className={styles.cardsCarousel}>
        <Swiper
          slidesPerView={4}
          slidesPerGroup={4}
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
            <h5>No hay eventos</h5>
          )}
        </Swiper>
      </div>
      <p className={styles.titleCards}>Fresquitos</p>
      <div className={styles.cardsCarousel}>
        <Swiper
          slidesPerView={4}
          slidesPerGroup={4}
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
            <h5>No hay eventos</h5>
          )}
        </Swiper>
      </div>
      <p className={styles.titleCards}>Mi Lista</p>
      <div className={styles.cardsCarousel}>
        <Swiper
          slidesPerView={4}
          slidesPerGroup={4}
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
            <h5>No tienes eventos agregados a: Mi Lista</h5>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Events;
