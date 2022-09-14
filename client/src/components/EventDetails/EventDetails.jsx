import React from "react";
import { useParams } from "react-router-dom";
import EventInfo from "./EventInfo";
import EventLocation from "./EventLocation";
import EventComments from "./EventComments";
import EventSideBar from "./EventSideBar";

import events from '../../api/events';


const EventDetails = () => {

    const id = useParams().id
   
    const allEvents = events

    const eventDetails = allEvents.filter( event => event.name === 'Music')[0]
   
    return (
      <div >
        <EventInfo event={eventDetails}/>
        <EventLocation event={eventDetails}/>
        <EventComments event={eventDetails}/>
        <EventSideBar event={eventDetails}/>
      </div>
    );
  };
  
  export default EventDetails;