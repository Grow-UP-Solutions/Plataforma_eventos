import React from "react";




const EventInfo = ({event}) => {


    return (
      <div >
       {event.pictures.length > 1 ?
        event.pictures.map( picture =>
            <img src={picture} alt="Not Found ):" width="200x" height="300"/>
            )
       : <img src={event.pictures[0]} alt="Not Found ):" width="200x" height="300"/>}
       <p>AddFav</p>
       <p>Link Redes</p>
       <p>{event.name}</p>
       <p>{event.rating}</p>
       <p>Ver Opiniones</p>
       <p>Descripcion Del Evento</p>
       <p>{event.description}</p>
       <p>Ver mas</p>
       <p>Reportar Contenido Inapropiado</p>

      </div>
    );
  };
  
  export default EventInfo;