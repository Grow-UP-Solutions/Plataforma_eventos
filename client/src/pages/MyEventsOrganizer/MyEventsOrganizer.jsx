import React from 'react';
import { Card } from '../../components';
import styles from './MyEventsOrganizer.module.css';
import users from '../../api/users';
import iconEditar from '../../assets/imgs/iconEditar.svg'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react/swiper-react';
import { Pagination, Scrollbar, Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/navigation/navigation.min.css';

const MyEventsOrganizer = () => {

  const userDetail = users.filter((user) => user.name === 'Jean Pierre')[0];


  return (
    <div className={styles.container}>

      <p className={styles.title}>Publicados</p>

      <div className={styles.containercard}>
      <Swiper
          slidesPerView={3}
          navigation
          spaceBetween={0}
          modules={[Navigation]}
          className={styles.mySwipper}
        >
        {
           userDetail.myEventsCreated.map((event) => (
          <div className={styles.card}>
            <SwiperSlide> 
            <Card event={event} />
            <div className={styles.containerDatos}>
                <div className={styles.datos}>
                    <p>Fechas:</p>
                    <h4>{event.dates.length}</h4>
                    <button>Ver</button>
                </div>
                <div  className={styles.datos}>
                    <p>Asistentens:</p>
                    <h4>{event.participants}</h4>
                    <button >Ver</button>
                    
                </div>
                <div  className={styles.datos}>
                    <p>Ganancias:</p>
                    <h4>9003</h4>
                    <button>Ver</button>
                </div>
            </div>
            <button className={styles.btn}>Editar</button>
            </SwiperSlide> 
          </div>
        ))
        }
        </Swiper>

      </div>

      <p className={styles.title}>Por Publicar</p>

        <div className={styles.containercard}>
        <Swiper
          slidesPerView={3}
          navigation
          spaceBetween={0}
          modules={[Navigation]}
          className={styles.mySwipper}
        >
        {
            userDetail.myEventsCreated.map((event) => (
            <SwiperSlide>       
            <Card event={event} />        
            </SwiperSlide>
        ))
        }
        </Swiper>
        </div>
    </div>
  );
};

export default MyEventsOrganizer;
