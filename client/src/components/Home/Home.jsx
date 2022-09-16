import React, { useEffect } from 'react';
import Navbar from '../Header/Navbar';
import CarrouselHome from '../CarrouselHome/CarrouselHome';
import HowItWorks from '../HowItWorks/HowItWorks';
import Footer from '../Footer/Footer';
import Categories from '../Categories/Categories';
import Events from '../Events/Events';
import { animateScroll as scroll } from 'react-scroll';
import { InView } from 'react-intersection-observer';
const Home = ({ handleNav }) => {
  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div>
      <InView
        rootMargin="-100px"
        as="div"
        onChange={(inView, entry) => handleNav(inView)}
      >
        <CarrouselHome />
      </InView>
      <HowItWorks />
      <Events />
      <Categories />
    </div>
  );
};

export default Home;
