import React from 'react';
import Navbar from '../Header/Navbar';
import CarrouselHome from '../CarrouselHome/CarrouselHome';
import HowItWorks from '../HowItWorks/HowItWorks';
import Footer from '../Footer/Footer';
import Categories from '../Categories/Categories';
import styles from './Home.module.css';

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <CarrouselHome />
        <HowItWorks />
        <Categories />
      </div>
    </>
  );
};

export default Home;
