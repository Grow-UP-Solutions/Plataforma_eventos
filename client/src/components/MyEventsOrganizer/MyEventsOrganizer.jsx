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
import { BsCamera, BsCardImage, BsInfoCircle, BsPencilSquare } from 'react-icons/bs';
import basquet from '../../assets/imgs/basquet.svg';
import { AiOutlineClose } from 'react-icons/ai';
import { useContext, useState, useEffect, useRef } from 'react';

const MyEventsOrganizer = ({ myEventsCreated, userData }) => {
  const fecha = new Date();
  const hora = fecha.getHours();
  const minutes = fecha.getMinutes();
  const dateActual = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

  if (dateActual && myEventsCreated !== undefined) {
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

  const deleteEvent = (e) => {
    console.log('borrar evento');
  };

  const [cardPerView, setCardPerView] = useState(3);

  useEffect(() => {
    if (window.innerWidth <= 623) return setCardPerView(2.1);
    if (window.innerWidth <= 692) return setCardPerView(2.3);
    if (window.innerWidth <= 1160) return setCardPerView(2.5);
    if (window.innerWidth <= 1490) return setCardPerView(3);
  }, [window.innerWidth]);

  window.onresize = function() {
    if (window.innerWidth <= 623) return setCardPerView(2.1);
    if (window.innerWidth <= 692) return setCardPerView(2.3);
    if (window.innerWidth <= 1160) return setCardPerView(2.5);
    if (window.innerWidth <= 1490) return setCardPerView(3);
  };

  return (
    <div className={styles.container}>
      {myEventsCreated.length > 0 ? (
        <>
          <p className={styles.title}>Publicados</p>

          {eventsPublic && eventsPublic.length <= 3 ? (
            <div
              className={styles.containerCard}
              style={{
                gridTemplateColumns: `repeat(${eventsPublic.length}, 1fr`,
              }}
            >
              {eventsPublic.map((event) => (
                <div>
                  <Card userData={userData} event={event} listName={'published'} orgEvent={'true'} />
                  <Link className={styles.btn} to={'/oganiza-un-evento-editar/' + event._id}>
                    <BsPencilSquare className={styles.iconEdit} />
                    <span>Editar</span>
                  </Link>
                </div>
              ))}
            </div>
          ) : eventsPublic.length > 3 ? (
            <Swiper
              slidesPerView={cardPerView}
              slidesPerGroup={cardPerView}
              navigation
              spaceBetween={0}
              modules={[Navigation]}
              className={styles.mySwipper}
            >
              {eventsPublic.map((event) => (
                <div className={styles.card}>
                  <SwiperSlide>
                    <Card userData={userData} event={event} listName={'published'} orgEvent={'true'} />
                    <Link className={styles.btn} to={'/oganiza-un-evento-editar/' + event._id}>
                      <BsPencilSquare className={styles.iconEdit} />
                      <span>Editar</span>
                    </Link>
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          ) : (
            <p className={styles.not_event}>No hay eventos ...</p>
          )}
          <hr className={styles.cardHr}></hr>

          <p className={styles.title}>Por Publicar</p>

          {eventsNoPublic && eventsNoPublic.length <= 3 ? (
            <div
              className={styles.containerCard}
              style={{
                gridTemplateColumns: `repeat(${eventsNoPublic.length}, 1fr`,
              }}
            >
              {eventsNoPublic.map((event, index) => (
                <div>
                  <Card userData={userData} event={event} listName={'to-publish'} orgEvent={''} />
                  <div className={styles.btns}>
                    <Link className={styles.btn} to={'/oganiza-un-evento-editar/' + event._id}>
                      <BsPencilSquare className={styles.iconEdit} />
                      <span>Editar</span>
                    </Link>
                    <button className={styles.btn} onClick={(e) => deleteEvent(e)}>
                      <img src={basquet} alt='n' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : eventsNoPublic.length > 3 ? (
            <Swiper
              slidesPerView={cardPerView}
              slidesPerGroup={cardPerView === 3 ? 3 : Math.trunc(cardPerView - 0.5)}
              navigation
              spaceBetween={0}
              modules={[Navigation]}
              className={styles.mySwipper}
            >
              {eventsNoPublic.map((event, index) => (
                <div className={styles.card}>
                  <SwiperSlide>
                    <div>
                      <Card userData={userData} event={event} listName={'to-publish'} orgEvent={''} />
                    </div>
                    <div className={styles.btns}>
                      <Link className={styles.btn} to={'/oganiza-un-evento-editar/' + event._id}>
                        <BsPencilSquare className={styles.iconEdit} />
                        <span>Editar</span>
                      </Link>
                      <button className={styles.btn} onClick={(e) => deleteEvent(e)}>
                        <img src={basquet} alt='n' />
                      </button>
                    </div>
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          ) : (
            <p className={styles.not_event}>No hay eventos por publicar ...</p>
          )}
        </>
      ) : (
        <div>
          <p className={styles.not_event}>Aun no tienes eventos publicados o por publicar. Crea tu evento</p>
          <p className={styles.not_event}>
            <a href='/oganiza-un-evento' target='_blank'>
              aqui
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default MyEventsOrganizer;
