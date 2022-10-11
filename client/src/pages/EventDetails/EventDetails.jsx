import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import EventComments from '../../components/EventDetails/EventComments';
import EventInfo from '../../components/EventDetails/EventInfo';
import EventLocation from '../../components/EventDetails/EventLocation';
import EventSideBar from '../../components/EventDetails/EventSideBar';
import { getEvents } from '../../redux/actions';
import style from './EventDetails.module.css';

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
