import React from "react";
import mapa from '../../assets/imgs/mapa2.png'
import { IoLocationOutline } from 'react-icons/io5';
import style from './EventLocation.module.css';

const EventLocation =  ({event}) => {

  return (
    <div className={style.container}>
      <div className={style.container_location}>
        <IoLocationOutline className={style.icon}/>
        <p>Ubicacion</p>
      </div>
      
      <br />

      {
        event.enLinea === false ?
        <div>
          <div>
            <span className={style.city}>{event.city} / </span>
            <span className={style.state}>{event.state}</span>
            <p className={style.texto}>La ubicación exacta se te enviará al adquirir tu entrada</p>
          </div>
            <div className={style.img}>
            <img src={mapa} alt="imagen_mapa" />
          </div>
        </div>
        :
        <div>
         <span className={style.city}>En Linea</span>
         <p className={style.texto}>El enlace para el evento se te enviara al momento de adquirir tu cupo</p>
        </div>
      }

      
      <p className={style.description}>{event.description}</p>

      <div className={style.line}></div>
    </div>
  );
};
  
export default EventLocation;