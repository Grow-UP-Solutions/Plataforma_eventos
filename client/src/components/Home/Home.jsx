import React from 'react';
import Navbar from '../Header/Navbar';
import CarrouselHome from '../CarrouselHome/CarrouselHome';
import HowItWorks from '../HowItWorks/HowItWorks';
import Footer from '../Footer/Footer';

const Home = () => {

  return (
    <div>
      <Navbar />
      <CarrouselHome />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default Home;
