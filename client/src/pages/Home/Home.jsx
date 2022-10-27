import React, { useContext, useEffect } from 'react';
import { InView } from 'react-intersection-observer';
import { animateScroll as scroll } from 'react-scroll';
import eventsApi from '../../axios/eventsApi';
import { AuthContext } from '../../context/auth';
import { stateContext } from '../../context/state/stateContext';
import {
  CarrouselHome,
  Categories,
  Events,
  HowItWorks,
} from '../../components';

const Home = ({ handleNav }) => {

  const { user } = useContext(AuthContext);
  const { setNotes, setMsg } = useContext(stateContext);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    getUserData();
  }, [user]);

  const getUserData = async () => {
    let userResult = {};
    if (user.uid) {
      userResult = await eventsApi.get('/users/' + user.uid);
      setNotes(userResult.data.notifications.filter((e) => e.read === false));
      setMsg(userResult.data.message.filter((e) => e.read === false));
    }
    else {
      console.log('no hay user');
    }
  };

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
