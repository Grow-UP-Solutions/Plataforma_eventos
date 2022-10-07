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
import { AuthContext } from '../../context/auth/AuthContext';

const EventDetails = () => {

  const [conversation, setConversation] = useState({});
  const { user } = useContext(AuthContext);
  const id = useParams().id;
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];
  
  useEffect(() => {
    dispatch(getEvents);
    scroll.scrollToTop();
    user ?
    setConversation({
      senderId: user.uid,
      receiverId: eventDetails.organizer._id,
    }) : 
    setConversation({})
  }, [dispatch]);

  return (
    <div className={`${style.container} container`}>
      <div className={style.item1}>
        <EventInfo event={eventDetails} />
        <EventLocation event={eventDetails} />
        <EventComments event={eventDetails} />
      </div>

      <div className={style.item2}>
        <EventSideBar event={eventDetails} conversation={conversation}/>
      </div>
    </div>
  );
};

export default EventDetails;
