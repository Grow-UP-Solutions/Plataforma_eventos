import React from "react";
import {mapa} from '../../assets/imgs/mapa.png'



const EventLocation =  ({event}) => {

   


    return (
      <div >
        <p>Ubicacion</p>
        <span>{event.city}</span>
        <span>{event.state}</span>
        <p>La ubicación exacta se te enviará al adquirir tu entrada</p>
        <div>MAPA</div>
        <p>{event.description}</p>
      </div>
    );
  };
  
  export default EventLocation;