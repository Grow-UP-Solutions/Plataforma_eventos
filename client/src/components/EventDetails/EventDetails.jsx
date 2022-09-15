import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventInfo from './EventInfo';
import EventLocation from './EventLocation';
import EventComments from './EventComments';
import EventSideBar from './EventSideBar';
import style from './EventDetails.module.css';
import events from '../../api/events';
import { animateScroll as scroll } from 'react-scroll';

const EventDetails = () => {
  const id = useParams().id;

  const allEvents = events;

  const eventDetails = allEvents.filter((event) => event.name === 'Music')[0];

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div className={`${style.container} container`}>
      <div className={style.item1}>
        <EventInfo event={eventDetails} />
        <EventLocation event={eventDetails} />
        <EventComments event={eventDetails} />
      </div>

      <div className={style.item2}>
        <EventSideBar event={eventDetails} />
      </div>
    </div>
  );
};

export default EventDetails;
