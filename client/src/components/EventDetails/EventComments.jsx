import React from "react";




const EventComments =  ({event}) => {

   
    return (
      <div >
        <p>Opiniones del Evento</p>
        <p>{event.opinions.length}</p>
        <span>{event.rating}</span>
       {event.opinions.length > 0 ? 
         event.opinions.map( opinion => 
            <div>
                <p>{opinion.user}</p>
                <p>{opinion.rating}</p>
                <p>{opinion.time}</p>
                <img src={opinion.picture} alt="Not Found ):" width="20px" height="30px"/>
                <p>{opinion.opinion}</p>
                <p>Reportar contenido inapropiado</p>
            </div>)
         
       : 'No hay comentarios'}

        <textarea
            type='text'
            placeholder="Escribe un Comentario"
          />
         <input
            type='numbre'
            placeholder="Rate"
            />
        
        <button>Enviar</button>
      </div>
    );
  };
  
  export default EventComments;