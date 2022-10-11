import React, { useEffect, useState } from "react";
import { IoLocationOutline } from 'react-icons/io5';
import style from './EventLocation.module.css';
import { useSelector } from "react-redux";
import Maps from "../Maps/Maps";

const EventLocation =  ({id}) => {

  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];

  return (
    <div>
      {eventDetails?
    
    <div className={style.container}>
      <div className={style.container_location}>
        <IoLocationOutline className={style.icon}/>
        <p>Ubicacion</p>
      </div>
      
      <br />

      {
        eventDetails.online === 'false' ?
        <div>

          <div>
            <span className={style.city}>{eventDetails.municipio} / </span>
            <span className={style.state}>{eventDetails.departamento}</span>
            <p className={style.texto}>La ubicación exacta se te enviará al adquirir tu entrada</p>
          </div>

          <div className={style.img}>
            <Maps id={id}/>
          </div>

        </div>
        :
        <div>
         <span className={style.city}>En Linea</span>
         <p className={style.texto}>El enlace para el evento se te enviara al momento de adquirir tu cupo</p>
        </div>
      }

      
      <p className={style.description}>{eventDetails.shortDescription}</p>

      <div className={style.line}></div>
    </div>
    :''}

    </div>
  );
};
  
export default EventLocation;