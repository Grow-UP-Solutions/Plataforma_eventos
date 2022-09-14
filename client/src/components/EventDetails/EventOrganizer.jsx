import React from "react";


const EventOrganizer = ({event}) => {

   
    return (
      <div >
       <p>Organizador</p>
       <button>Enviar Mensaje</button>
        <img src={event.organizer.picture} alt='N'/>
        <p>{event.organizer.name}</p>
        <p>{event.organizer.membership}</p>
        <p>{event.organizer.descriptionOrganizer}</p>
        <p>Otros eventos organizados por Bruno Días</p>
       

    <button>Comprar</button>
      </div>
    );
  };
  
  export default EventOrganizer;