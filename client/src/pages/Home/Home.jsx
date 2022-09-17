import React, { useEffect } from 'react';
import { InView } from 'react-intersection-observer';
import { animateScroll as scroll } from 'react-scroll';

import {
  CarrouselHome,
  Categories,
  Events,
  HowItWorks,
} from '../../components';

const Home = ({ handleNav }) => {
  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div>
      <InView
        rootMargin="-150px"
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
