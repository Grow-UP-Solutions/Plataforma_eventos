import React from "react";
import styles from './EventComments.module.css';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';




const EventComments =  ({event}) => {



    return (
      <div className={styles.container} >
        <p className={styles.title}>Opiniones del Evento</p>
        <p className={styles.ratNumber}>{event.opinions.length} opiniones - </p>
        <span className={styles.ratProm}>{event.rating} Positivas</span>
       {event.opinions.length > 0 ? 
         event.opinions.map( opinion => 
            <div className={styles.comment}>
              <div className={styles.userComment}>
                <img src={opinion.picture} alt="Not Found ):" width="20px" height="30px"/>
                <div  className={styles.infoComment}>
                  <span  className={styles.user}>{opinion.user}</span>
                  <span  className={styles.rating}>{opinion.rating}</span>
                  <p  className={styles.time}>{opinion.time}</p>
                  <p  className={styles.opinion}>{opinion.opinion}</p>
                </div>
                  <ReportProblemIcon></ReportProblemIcon>
                </div>
                <hr></hr>
            </div>)
         
       : 'No hay comentarios'}

        <textarea 
            className={styles.textarea}
            type='text'
            placeholder="Escribe un Comentario"
          />
         <input
            className={styles.rate}
            type='numbre'
            placeholder="Rate"
            />
        
        <button  className={styles.button}>Enviar</button>
      </div>
    );
  };
  
  export default EventComments;