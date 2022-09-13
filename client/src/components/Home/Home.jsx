import React from 'react';
import Navbar from '../Header/Navbar';
import CarrouselHome from '../CarrouselHome/CarrouselHome';
import HowItWorks from '../HowItWorks/HowItWorks';
import Footer from '../Footer/Footer';
import Card from '../Cards/Card'
import events from '../../api/events'
import styles from './Home.module.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
//import 'swiper/css'
// import 'swiper/css/pagination'

const Home = () => {


  
  // var scrollPerClick;
  // var ImagePadding = 20;

  // var scrollAmount=0;

  // function sliderScrollLeft(){
  //   events.scroolTo({
  //     top:0,
  //     left:(scrollAmount -= scrollPerClick),
  //     behavior:'smooth'
  //   })
  //   if (scrollAmount < 0){
  //     scrollAmount=0
  //   }
  // }

  // function sliderScrollRight(){
  //   if(scrollAmount <= events.scrollWidth - events.clientWidth){
  //     events.scrollTo({
  //       top:0,
  //       left:(scrollAmount += scrollPerClick),
  //       behavior:'smooth'
  //     })
  //   }

  // }

  return (
    <div>
      <Navbar />
      <CarrouselHome />
      <HowItWorks />
      <div className={styles.cardsSection}>
        <p className={styles.titleCards}>Populares</p>
          <div className={styles.cardsCarousel}>
          <Swiper
              slidesPerView={4}
              spaceBetween={10}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className={styles.mySwipper}
            >
                {events.length ? (
                  events.map((event, index) => {
                    return (
                      <SwiperSlide>
                      <div key={index}>
                          <Card event={event}/>
                      </div>
                      </SwiperSlide>
                    )
                  })
                ) : (
              <h5>No hay eventos</h5>
              )}
           </Swiper>
          </div>
          <a className={styles.switchLeft}>{'<'}</a>
          <a className={styles.switchRigth}>{'>'}</a>
        <p className={styles.titleCards}>Esta Semana</p>
          <div className={styles.cardsCarousel}>
            {events.length ? (
              events.map((event, index) => {
                return (
                  <div key={index}>
                      <Card event={event}/>
                  </div>
                )
              })
            ) : (
          <h5>No hay eventos</h5>
          )}
          </div>
          {/* <a className={styles.switchLeft} onClick={()=>sliderScrollLeft()}>{'<'}</a>
          <a className={styles.switchRigth} onClick={()=>sliderScrollRight()}>{'>'}</a> */}
        <p className={styles.titleCards}>Fresquitos</p>
          <div className={styles.cardsCarousel}>
            {events.length ? (
              events.map((event, index) => {
                return (
                  <div key={index}>
                      <Card event={event}/>
                  </div>
                )
              })
            ) : (
          <h5>No hay eventos</h5>
          )}
          
          <a className={styles.switchLeft}>{'<'}</a>
          <a className={styles.switchRigth}>{'>'}</a>
          </div>
        <p className={styles.titleCards}>Mi Lista</p>
          <div className={styles.cardsCarousel}>
            {events.length ? (
              events.map((event, index) => {
                return (
                  <div key={index}>
                      <Card event={event}/>
                  </div>
                )
              })
            ) : (
          <h5>No hay eventos</h5>
          )}
          </div>
          <a className={styles.switchLeft}>{'<'}</a>
          <a className={styles.switchRigth}>{'>'}</a>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
