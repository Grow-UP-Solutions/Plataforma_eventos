import React from "react";



const EventDate = ({event}) => {

   
    return (
      <div >
       <p>Proximas Fechas</p>

       {event.date ?
            event.date.map( date =>
                <div>
                    <p>{date}</p>
                </div>)
            :'No hay fechas'
        }
    <p>{event.time}</p>
    <p>{event.price}</p>
    <p>{event.cupos}</p>
    <p>Cupos a comprar</p>
    <button>Comprar</button>
    <p>Nuevas fechas pueden ser solicitadas en cuyo caso un mínimo aplicaría de cupos a ser adquiridos por el solicitante, será sujeto a aprobación de fecha</p>
    <p>Solicitar nuevas fechas</p>
    <button>Aqui</button>
    


    
      </div>
    );
  };
  
  export default EventDate;