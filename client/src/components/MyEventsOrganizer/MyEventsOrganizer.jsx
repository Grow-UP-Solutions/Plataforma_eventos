import React, { useEffect, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import basquet from '../../assets/imgs/basquet.svg';
import Card from '../Cards/Card';
import styles from './MyEventsOrganizer.module.css';
import { fechaActual, hora, minutes } from '../../utils/fechaActual';

const MyEventsOrganizer = ({ myEventsCreated, userData }) => {
  //No Mostrar los eventos viejos

  if (fechaActual && myEventsCreated !== undefined) {
    myEventsCreated.map((evento) => {
      evento.dates.map((date) => {
        if (new Date(date.date) < new Date(fechaActual)) {
          if (evento.dates.length === 1) {
            date.isOld = true;
            evento.isOld = true;
          } else {
            date.isOld = true;
          }
        } else if (date.date === fechaActual) {
          if (date.end.slice(0, 2) <= hora && date.end.slice(3, 5) <= minutes + 2) {
            if (evento.dates.length === 1) {
              date.isOld = true;
              evento.isOld = true;
            } else {
              date.isOld = true;
            }
          }
        }
      });
    });
  }

  //si hay un evento en revision que lo saque de publicados

  if (myEventsCreated !== undefined) {
    myEventsCreated.map((evento) => {
      if (evento.inRevision === true) {
        evento.isPublic = false;
      }
    });
  }

  const eventsNotOld = myEventsCreated.filter((e) => e.isOld === false);
  const eventsPublic = eventsNotOld.filter((e) => e.isPublic === true);

  const eventsNoPublicDuplicate = eventsNotOld.filter((e) => e.isPublic === false);

  //busco si hay alguna otra fecha no publica en algun evento y lo pusheo al array de los eventos no publcios
  for (let i = 0; i < myEventsCreated.length; i++) {
    for (let j = 0; j < myEventsCreated[i].dates.length; j++) {
      if (myEventsCreated[i].dates[j].isPublic === false) {
        eventsNoPublicDuplicate.push(myEventsCreated[i]);
      }
    }
  }

  const eventsNoPublic = [];

  //para ver si en el array de los no publicos no hay eventos repetidos
  //puede pasar al estar pusheando fechas y no eventos

  eventsNoPublicDuplicate.forEach(function(item) {
    if (!eventsNoPublic.includes(item)) {
      eventsNoPublic.push(item);
    }
  });

  const deleteEvent = (e) => {};

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
      <h2 className={styles.title}>Organizados por mí</h2>
      {myEventsCreated.length > 0 ? (
        <>
          {eventsPublic && eventsPublic.length <= 3 ? (
            <>
              <p className={styles.title}>Publicados</p>
              <div
                className={styles.containerCard}
                style={{
                  gridTemplateColumns: `repeat(${eventsPublic.length}, 1fr`,
                }}
              >
                {eventsPublic.map((event) => (
                  <div>
                    <Card
                      userData={userData}
                      event={event}
                      listName={'published'}
                      orgEvent={'true'}
                      datePublic={'true'}
                    />
                    {event.inRevision === true ? (
                      <div className={styles.btns}>
                        <Link className={styles.btn}>
                          <span>Evento En Revision</span>
                        </Link>
                      </div>
                    ) : (
                      <div className={styles.btns}>
                        <Link className={styles.btn} to={'/organiza-un-evento-editar/' + event._id}>
                          <BsPencilSquare className={styles.iconEdit} />
                          <span>Editar</span>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : eventsPublic.length > 3 ? (
            <div className={'eventsOrganizerSwiper'}>
              <Swiper
                slidesPerView={cardPerView}
                slidesPerGroup={cardPerView}
                navigation
                spaceBetween={0}
                modules={[Navigation]}
                className={'swiper'}
              >
                {eventsPublic.map((event) => (
                  <div className={styles.card}>
                    <SwiperSlide>
                      <Card
                        userData={userData}
                        event={event}
                        listName={'published'}
                        orgEvent={'true'}
                        datePublic={'true'}
                      />
                      {event.inRevision === false ? (
                        <div className={styles.btns}>
                          <Link className={styles.btn} to={'/organiza-un-evento-editar/' + event._id}>
                            <BsPencilSquare className={styles.iconEdit} />
                            <span>Editar</span>
                          </Link>
                        </div>
                      ) : (
                        <div className={styles.btns}>
                          <Link className={styles.btn}>
                            <span>Evento En Revision</span>
                          </Link>
                        </div>
                      )}
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>
            </div>
          ) : (
            <p className={styles.not_event}>No hay eventos ...</p>
          )}
          <hr className={styles.cardHr}></hr>

          <p className={styles.title}>Por Publicar</p>

          {eventsNoPublic.length && eventsNoPublic.length <= 3 ? (
            <div
              className={styles.containerCard}
              style={{
                gridTemplateColumns: `repeat(${eventsNoPublic.length}, 1fr`,
              }}
            >
              {eventsNoPublic.map((event, index) => (
                <div>
                  <Card
                    userData={userData}
                    event={event}
                    listName={'to-publish'}
                    orgEvent={'true'}
                    datePublic={'false'}
                  />

                  {event.inRevision === false ? (
                    <div className={styles.btns}>
                      <Link className={styles.btn} to={'/organiza-un-evento-editar/' + event._id}>
                        <BsPencilSquare className={styles.iconEdit} />
                        <span>Editar</span>
                      </Link>
                      <button className={styles.btn} onClick={(e) => deleteEvent(e)}>
                        <img src={basquet} alt='n' />
                      </button>
                    </div>
                  ) : (
                    <div className={styles.revisionS}>
                      <span className={styles.revision}>Evento En Revision</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : eventsNoPublic.length > 3 ? (
            <div>
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
                        <Card
                          userData={userData}
                          event={event}
                          listName={'to-publish'}
                          orgEvent={'true'}
                          datePublic={'false'}
                        />
                      </div>
                      {event.inRevision === false ? (
                        <div className={styles.btns}>
                          <Link className={styles.btn} to={'/organiza-un-evento-editar/' + event._id}>
                            <BsPencilSquare className={styles.iconEdit} />
                            <span>Editar</span>
                          </Link>
                          <button className={styles.btn} onClick={(e) => deleteEvent(e)}>
                            <img src={basquet} alt='n' />
                          </button>
                        </div>
                      ) : (
                        <div className={styles.btns}>
                          <Link className={styles.btn}>
                            <span>Evento En Revision</span>
                          </Link>
                        </div>
                      )}
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>
            </div>
          ) : (
            <p className={styles.not_event}>No hay eventos por publicar ...</p>
          )}
        </>
      ) : (
        <div className={styles.containerSeeEvents}>
          <hr className={styles.hr}></hr>
          <p className={styles.text}>Aun no tienes eventos publicados o por publicar. Crea tu evento</p>
          <button className={styles.btn}>
            <Link to='/organiza-un-evento'>Organizar un evento</Link>
          </button>
          <hr className={styles.hr}></hr>
        </div>
      )}
    </div>
  );
};

export default MyEventsOrganizer;
