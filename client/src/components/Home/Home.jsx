import React, { useEffect } from 'react';
import Navbar from '../Header/Navbar';
import CarrouselHome from '../CarrouselHome/CarrouselHome';
import HowItWorks from '../HowItWorks/HowItWorks';
import Footer from '../Footer/Footer';
import Categories from '../Categories/Categories';
import Events from '../Events/Events';
import styles from './Home.module.css';
import { animateScroll as scroll } from 'react-scroll';

const Home = () => {

  useEffect(() => {
    scroll.scrollToTop()
  }, []);

  return (
    <div className={styles.container}>
      <CarrouselHome />
      <HowItWorks />
      <Events/>
      <Categories />
    </div>
  );
};

export default Home;
