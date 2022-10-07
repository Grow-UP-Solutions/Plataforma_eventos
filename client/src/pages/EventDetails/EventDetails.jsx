import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventInfo from '../../components/EventDetails/EventInfo';
import EventLocation from '../../components/EventDetails/EventLocation';
import EventComments from '../../components/EventDetails/EventComments';
import EventSideBar from '../../components/EventDetails/EventSideBar';
import style from './EventDetails.module.css';
import { animateScroll as scroll } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../redux/actions';

const EventDetails = () => {

  const id = useParams().id;
  const dispatch = useDispatch();
  //const allEvents = useSelector((state) => state.events);
  //const eventDetails = allEvents.filter((event) => event._id === id)[0];
  
  useEffect(() => {
    dispatch(getEvents);
    scroll.scrollToTop();
  }, [dispatch]);

  return (
    <div className={`${style.container} container`}>
      <div className={style.item1}>
        <EventInfo id={id} />
        <EventLocation id={id} />
        <EventComments id={id} />
      </div>

      <div className={style.item2}>
        <EventSideBar id={id} />
      </div>
    </div>
  );
};

export default EventDetails;
