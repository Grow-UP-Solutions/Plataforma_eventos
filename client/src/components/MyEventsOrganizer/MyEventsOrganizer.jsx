import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import Card from '../Cards/Card';
import styles from './MyEventsOrganizer.module.css';

const MyEventsOrganizer = ({ myEventsCreated, userData }) => {
  const fecha = new Date();
  const hora = fecha.getHours();
  const minutes = fecha.getMinutes();
  const dateActual = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

  if (dateActual) {
    myEventsCreated.map((evento) => {
      evento.dates.map((date) => {
        if (new Date(date.date) < new Date(dateActual)) {
          if (evento.dates.length === 1) {
            date.isPublic = false;
            evento.isPublic = false;
          } else {
            date.isPublic = false;
          }
        } else if (date.date === dateActual) {
          if (date.end.slice(0, 2) <= hora && date.end.slice(3, 5) <= minutes + 2) {
            if (evento.dates.length === 1) {
              date.isPublic = false;
              evento.isPublic = false;
            } else {
              date.isPublic = false;
            }
          }
        }
      });
    });
  }

  const eventsPublic = myEventsCreated.filter((e) => e.isPublic === true);
  const eventsNoPublic = myEventsCreated.filter((e) => e.isPublic === false);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Publicados</p>

      <div className={styles.containercard}>
        <Swiper
          slidesPerView={3}
          slidesPerGroup={3}
          navigation
          spaceBetween={0}
          modules={[Navigation]}
          className={styles.mySwipper}
        >
          {eventsPublic && eventsPublic.length
            ? eventsPublic.map((event) => (
                <div className={styles.card}>
                  <SwiperSlide>
                    <Card userData={userData} event={event} listName={'published'} />
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
              ))
            : 'No tienes eventos creados'}
        </Swiper>
      </div>
      <hr className={styles.cardHr}></hr>

      <p className={styles.title}>Por Publicar</p>

      <div className={styles.containercard}>
        <Swiper
          lidesPerView={3}
          slidesPerGroup={3}
          navigation
          spaceBetween={0}
          modules={[Navigation]}
          className={styles.mySwipper}
        >
          {eventsNoPublic.length ? (
            eventsNoPublic.map((event, index) => (
              <div className={styles.card}>
                <SwiperSlide>
                  <div>
                    <Card userData={userData} event={event} listName={'to-publish'} />
                  </div>
                  <div>
                    <Link to={'/oganiza-un-evento-editar/' + event._id}>
                      <button className={styles.btn}>Editar</button>
                    </Link>
                  </div>
                </SwiperSlide>
              </div>
            ))
          ) : (
            <h5>No Tienes Eventos Por Publicar</h5>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default MyEventsOrganizer;
