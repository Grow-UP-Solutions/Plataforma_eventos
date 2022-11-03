import React from 'react';
import Card from '../Cards/Card';
import styles from './MyEventsOrganizer.module.css';
import iconEditar from '../../assets/imgs/iconEditar.svg';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react/swiper-react';
import { Pagination, Scrollbar, Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/navigation/navigation.min.css';

const MyEventsOrganizer = ({ myEventsCreated }) => {

  const eventsPublic = myEventsCreated.filter(e=> e.isPublic===true)
  const eventsNoPublic = myEventsCreated.filter(e=> e.isPublic===false)

  return (
    <div className={styles.container}>
      <p className={styles.title}>Publicados</p>

      <div className={styles.containercard}>
        <Swiper slidesPerView={3} navigation spaceBetween={0} modules={[Navigation]} className={styles.mySwipper}>
          {eventsPublic && eventsPublic.length? (
            eventsPublic.map((event) => (
            <div className={styles.card}>
              <SwiperSlide>
                <Card event={event} listName={'published'} />
                <div className={styles.containerDatos}>
                  <div className={styles.datos}>
                    <p>Fechas:</p>
                    <h4>{event.dates.length}</h4>
                    <button>Ver</button>
                  </div>
                  <div className={styles.datos}>
                    <p>Asistentes:</p>
                    <h4>{event.participants}</h4>
                    <button>Ver</button>
                  </div>
                  <div className={styles.datos}>
                    <p>Ganancias:</p>
                    <h4>$9003</h4>
                    <button>Ver</button>
                  </div>
                </div>
                <Link to={'/oganiza-un-evento-editar/' + event._id}>
                    <button className={styles.btn}>Editar</button>
                </Link>
              </SwiperSlide>
            </div>
          ))):'No tienes eventos creados'}
        </Swiper>
      </div>
      <hr className={styles.cardHr}></hr>

      <p className={styles.title}>Por Publicar</p>

      <div className={styles.containercard}>
        <Swiper slidesPerView={3} navigation spaceBetween={0} modules={[Navigation]} className={styles.mySwipper}>
          {eventsNoPublic.length ? (
            eventsNoPublic.map((event, index) => {
              return (
                <SwiperSlide>
                  <Card event={event} listName={'to-publish'} />
                </SwiperSlide>
              );
            })
          ) : (
            <h5>No Tienes Eventos Por Publicar</h5>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default MyEventsOrganizer;
