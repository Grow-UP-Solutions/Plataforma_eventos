import React, { useState } from "react";
import styles from './EventComments.module.css';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import foto from '../../assets/imgs/comments.png'
import { Rating } from '@mui/material';
import axios from "axios";

const EventComments =  ({ event }) => {

  const initialState = {
    idUser: '',
    rating: '',
    title: '',
    opinion: '',
  }
  const id = event._id;
  const [comments, setComments] = useState(initialState);

  const handleChangeComments = (e) => {
    e.preventDefault();
    setComments({
      idUser: '633201b25ffdf5ee2d2facb1',
      rating: event.rating,
      title: 'Nombre',
      opinion: e.target.value,
    })
  }

  const handlePostComments = (e) => {
    e.preventDefault();
    axios.post('https://plataformaeventos-production-6111.up.railway.app/events/opinionsGenerate/' + id, comments)
    .then((response) => {
      console.log('axios response', response.data);
    });
    setComments(initialState);
  }

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
          <div key={opinion._id} className={styles.comment}>
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
                  <div className={styles.reportCom} data-hover='Reportar contenido inapropiado'>
                  <ReportProblemIcon sx={{ fontSize: '40px', color: '#cbcbcb'  }}/>
                  </div>
              </div>
            </div>
              <hr className={styles.hr}></hr>
          </div>)
        
      : 'No hay comentarios'}

      <textarea 
        className={styles.textarea}
        type='text'
        placeholder="Escribe un Comentario"
        value={comments.opinion}
        onChange={handleChangeComments}
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
        <button className={styles.button} onClick={handlePostComments}>Enviar</button>
      </div>

    </div>
  );
};
  
export default EventComments;