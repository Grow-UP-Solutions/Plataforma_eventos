import React from "react";
import { useParams } from "react-router-dom";
import EventInfo from "./EventInfo";
import EventLocation from "./EventLocation";
import EventComments from "./EventComments";
import EventSideBar from "./EventSideBar";
import style from './EventDetails.module.css';  
import events from '../../api/events';


const EventDetails = () => {

    const id = useParams().id
   
    const allEvents = events

    const eventDetails = allEvents.filter( event => event.name === 'Music')[0]
   
    return (
      <div className={style.container}>
        <div className={style.item1}>
          <EventInfo event={eventDetails}/>
        </div>

        <div className={style.item2}>
          <EventSideBar event={eventDetails}/>
        </div>
        
        <div className={style.item3}>
          <EventLocation event={eventDetails}/>
        </div>
        
        <div className={style.item4}>
          <EventComments event={eventDetails}/>
        </div>
      </div>
    );
  };
  
  export default EventDetails;