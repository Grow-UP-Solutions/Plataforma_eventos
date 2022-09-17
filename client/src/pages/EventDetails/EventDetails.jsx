import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import EventInfo from '../../components/EventDetails/EventInfo';
import EventLocation from '../../components/EventDetails/EventLocation';
import EventComments from '../../components/EventDetails/EventComments';
import EventSideBar from '../../components/EventDetails/EventSideBar';
import style from './EventDetails.module.css';
import events from '../../api/events';
import { animateScroll as scroll } from 'react-scroll';

const EventDetails = () => {
  const id = useParams().id;
  console.log('id:', id);

  const allEvents = events;

  const eventDetails = allEvents.filter((event) => event.id === id)[0];
  console.log('eventDetails:', eventDetails);

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