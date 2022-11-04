import React from 'react';
import styles from './Events.module.css';
import Card from '../Cards/Card';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react/swiper-react';
import { Pagination, Scrollbar, Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import { useSelector } from 'react-redux';
import { useContext,useRef, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { useEffect } from 'react';
import eventsApi from '../../axios/eventsApi';

const Events = () => {
  const todosLosEventos = useSelector((state) => state.events);
  const allEvents = todosLosEventos.filter(event=> event.isPublic===true && event.inRevision===false)
  

  //POPULARES//
  const orderByRating = allEvents.sort((a,b)=>{
    if (a.rating > b.rating) return -1
    if (b.rating > a.rating) return 1
    return 0
  })
  const mostPopular = orderByRating.slice(0,20)

  
//ESTA SEMANA//

  let curr = new Date 
  let week = []

for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i 
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
  week.push(day)
}

let weekEvents = []

for (let a = 1; a <= week.length; a++) {
  for(let b = 0; b < allEvents.length; b++){
   let evento = allEvents[b].dates.filter(date=>date.date === week[a])[0]
   weekEvents.push(evento)
  }
}

const eventsWeek = weekEvents.filter(e=>e !== undefined)
console.log('eventsWeek:',eventsWeek)

//FRESQUITOS//

  const newEvents = allEvents.slice(allEvents.length-20)
  const newEventsReverse = newEvents.reverse()

  
//USUARIO//
  const { user } = useContext(AuthContext);
  const id = user.uid;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData();
   }, [user]);

  useEffect(() => {}, [userData]);
 

  const getUserData = async () => {
      let userResult = {}
      if(user.uid){
        userResult= await eventsApi.get(`/users/${user.uid}`);
        setUserData(userResult.data)
      }
    }

console.log('userData.myFavorites:',userData.myFavorites)

  return (
    <div className={styles.cardsSection}>
      <p className={styles.titleCards}>Populares</p>
      <div className={styles.cardsCarousel}>
        <Swiper slidesPerView={4.2} navigation spaceBetween={0} modules={[Navigation]} className={styles.mySwipper}>
          {mostPopular.length ? (
            mostPopular.map((event, index) => {
              return (
                <SwiperSlide key={event.id}>
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
          slidesPerView={4.2}
          spaceBetween={0}
          navigation
          modules={[Pagination, Navigation]}
          className={styles.mySwipper}
        >
          {eventsWeek.length && eventsWeek !== undefined? (
            eventsWeek.map((event, index) => {
              return (
                <SwiperSlide key={event.id}>
                  <div key={index}>
                    <Card event={event} listName={'week'} />
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
          {newEventsReverse.length ? (
            newEventsReverse.map((event, index) => {
              return (
                <SwiperSlide key={index}>
                  <div>
                    <Card event={event} listName={'fresquitos'} />
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
          {userData.myFavorites !== undefined ? (
            userData.myFavorites.map((event, index) => {
              return (
                <SwiperSlide key={index}>
                  <div>
                    <Card event={event} listName={'miLista'} />
                  </div>
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
