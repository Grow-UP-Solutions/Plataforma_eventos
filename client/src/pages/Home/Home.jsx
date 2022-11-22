import React, { useContext, useEffect } from "react";
import { InView } from "react-intersection-observer";
import { animateScroll as scroll } from "react-scroll";
import eventsApi from "../../axios/eventsApi";
import { AuthContext } from "../../context/auth";
import { stateContext } from "../../context/state/stateContext";
import {
  CarrouselHome,
  Categories,
  Events,
  HowItWorks,
} from "../../components";

const Home = ({ handleNav }) => {
  const { user } = useContext(AuthContext);
  const { setNotes, setMsg, setConversa } = useContext(stateContext);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    getUserData();
  }, [user]);

  useEffect(() => {
    getConversations();
  }, [user]);

  const getUserData = async () => {
    let userResult = {};
    if (user.uid) {
      userResult = await eventsApi.get("/users/" + user.uid);
      const result = userResult.data.message.filter((e) => e.read === false);
      const final = result.filter((e) => e.sender !== user.uid);
      setNotes(userResult.data.notifications.filter((e) => e.read === false));
      setMsg(final);
    }
  };

  const getConversations = async () => {
    let conversaResult = {};
    if (user.uid) {
      conversaResult = await eventsApi.get("/conversation/" + user.uid);
      setConversa(conversaResult.data);
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
