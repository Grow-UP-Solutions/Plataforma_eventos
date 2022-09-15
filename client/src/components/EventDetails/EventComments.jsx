import React from "react";
import styles from './EventComments.module.css';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import foto from '../../assets/imgs/comments.png'
import { Rating } from '@mui/material';




const EventComments =  ({event}) => {



    return (
      <div className={styles.container} >
        <div className={styles.header}>
        <img  className={styles.img} src={foto} alt='N'/>
        <span className={styles.title}>Opiniones del Evento</span>
        </div>
        <div className={styles.subTitle}>
          <p className={styles.ratNumber}>{event.opinions.length} opiniones - {event.rating}% Positivas </p>
         
        </div>
       {event.opinions.length > 0 ? 
         event.opinions.map( opinion => 
            <div className={styles.comment}>
              <div className={styles.userComment}>
                <div>
                  <img  className={styles.picture} src={opinion.picture} alt="Not Found ):" width="20px" height="30px"/>
                </div>
                <div className={styles.nameDan}>
                  <div  className={styles.infoComment}>
                    <div className={styles.namRat}>
                      <span className={styles.user}>{opinion.user}</span>
                      <Rating
                        className={styles.rating}
                        name="read-only"
                        value={event.rating}
                        readOnly
                      />
                    </div>
                    <p  className={styles.time}>{opinion.time}</p>
                    <p  className={styles.opinion}>{opinion.opinion}</p>
                  </div>
                    <ReportProblemIcon sx={{ fontSize: '40px', color: '#cbcbcb' }}/>
                </div>
              </div>
                <hr className={styles.hr}></hr>
            </div>)
         
       : 'No hay comentarios'}

        <textarea 
            className={styles.textarea}
            type='text'
            placeholder="Escribe un Comentario"
          />
        <div className={styles.contRate}>
          <p className={styles.pRate}>Rate:</p>
         
        <Rating
            className={styles.rating}
            name="half-rating" 
            defaultValue={0}
            precision={0.5} 
          
          />
        </div>
        <div className={styles.contBtn}>
          <button  className={styles.button}>Enviar</button>
        </div>
      </div>
    );
  };
  
  export default EventComments;