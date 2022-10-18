import React, { useContext, useEffect, useState } from "react";
import styles from './EventComments.module.css';
import foto from '../../assets/imgs/comments.png'
import { Rating } from '@mui/material';
import axios from "axios";
import { useSelector } from "react-redux";
import { AuthContext } from '../../context/auth/AuthContext';
import CardComments from "../CardComments/CardComments";

const EventComments =  ({ id }) => {

  const [opinion, setOpinion] = useState([]);
  const [newOpinion, setNewOpinion] = useState('');
  const { user } = useContext(AuthContext);
  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];

  useEffect(() => {
    const getAllComments = async() => {
      try {
        const res = await axios.get('https://plataformaeventos-production-6111.up.railway.app/events/' + id);
        setOpinion(res.data.opinions);
      } catch (error) {
        console.log(error)
      }
    }
    getAllComments();
  }, [id]);

  const handlePostComments = async (e) => {
    e.preventDefault();
    const data = {
      idUser: user.uid,
      rating: 5,
      title: user.name,
      opinion: newOpinion,
    }
    try {
      const res = await axios.post('https://plataformaeventos-production-6111.up.railway.app/events/opinionsGenerate/' + id, data);
      setOpinion([...opinion, res.data]);
      setNewOpinion('');
    } catch (error) {
      console.log(error)
    }
  }

  const handleAlert = (e) => {
    e.preventDefault();
    alert('Debes estar registrado para poder enviar un comentario');
  }

  return (
    <div>
      {
        eventDetails ?
  
        <div className={styles.container} >
          <div className={styles.header}>
            <img  className={styles.img} src={foto} alt='N'/>
            <span className={styles.title}>Opiniones del Evento</span>
          </div>

          <div className={styles.subTitle}>
            <p className={styles.ratNumber}>{eventDetails.opinions.length} opiniones - {eventDetails.rating}% Positivas </p>
          </div>

          {
            opinion ? (
              <>
                <div>
                  {
                    opinion.map((o) => (
                      <div key={o._id} className={styles.comment}>
                        <CardComments o={o}/>

                        <hr className={styles.hr}></hr>
                      </div>
                    )) 
                  }
                </div>
              </>
            ) : <p>''</p>
          }

          <textarea 
            className={styles.textarea}
            type='text'
            placeholder="Escribe un Comentario"
            value={newOpinion}
            onChange={(e) => setNewOpinion(e.target.value)}
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
            <button className={styles.button} onClick={user.uid ? handlePostComments : handleAlert}>Enviar</button>
          </div>

        </div>
        : ''
      }

    </div>
  );
};
  
export default EventComments;