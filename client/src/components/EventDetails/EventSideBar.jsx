import React from "react";
import EventDate from "./EventDate";
import EventOrganizer from "./EventOrganizer";



const EventSideBar = ({event}) => {

   
    return (
      <div >
        <EventDate event={event}/>
        <p>Accesibilidad y requerimientos especiales</p>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna</p>
        <EventOrganizer event={event}/> 
      </div>
    );
  };
  
  export default EventSideBar;