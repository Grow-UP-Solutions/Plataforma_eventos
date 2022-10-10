import React from "react";
import mapa from '../../assets/imgs/mapa2.png'
import { IoLocationOutline } from 'react-icons/io5';
import style from './EventLocation.module.css';
import { useSelector } from "react-redux";
//import Maps from "../Maps/Maps";

const EventLocation =  ({id}) => {

  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];
  //const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${'AIzaSyBr-FUseqSbsY6EMqIGNnGmegD39R--nBA'}`;

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
        eventDetails.onLine === false ?
        <div>
          <div>
            <span className={style.city}>{eventDetails.municipio} / </span>
            <span className={style.state}>{eventDetails.departamento}</span>
            <p className={style.texto}>La ubicación exacta se te enviará al adquirir tu entrada</p>
          </div>

          <div className={style.img}>

              

            {/* <Maps 
              googleMapURL={mapURL}
              containerElement={<div style={{height: '400px'}}/>}
              mapElement={<div style={{height: '100%'}}/>}
              loadingElement={<p>Cargando</p>} 
            /> */}

            <img src={mapa} alt="imagen_mapa" />
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