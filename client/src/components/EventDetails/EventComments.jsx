import React, { useContext, useEffect, useState } from "react";
import styles from './EventComments.module.css';
import foto from '../../assets/imgs/comments.png'
import { Rating } from '@mui/material';
import eventsApi from "../../axios/eventsApi";
import { useSelector } from "react-redux";
import { AuthContext } from '../../context/auth/AuthContext';
import CardComments from "../CardComments/CardComments";
import swal from 'sweetalert';
import { UIContext } from "../../context/ui";

const EventComments =  ({ id }) => {

  const [opinion, setOpinion] = useState([]);
  const [newOpinion, setNewOpinion] = useState('');
  const [number, setNumber] = useState(0);
  const [value, setValue] = useState(0);
  const { user } = useContext(AuthContext);
  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];
  const { getRatingEvent } = useContext(UIContext);
   
  useEffect(() => {
    const getAllComments = async() => {
      try {
        const res = await eventsApi.get('/events/' + id);
        setOpinion(res.data.opinions);
        if(eventDetails.opinions.length > 0) {
          setNumber(calcRatingEffect());
        }
        else {
          setNumber(0);
        }
      } 
      catch (error) {
        console.log(error)
      }
    }
    getAllComments();
  }, [id]);

  const calcRatingEffect = () => {
    const ratings = eventDetails.opinions.map(e => e.rating);
    const suma = ratings.reduce((prev, current) => prev + current);
    const result = (suma / eventDetails.opinions.length).toFixed(1);
    return result;
  }

  const calcRating = (num) => {
    if (opinion.length === 0) {
      const resu = (num / 1).toFixed(1);
      return resu;
    }
    else {
      const ratings = opinion.map(e => e.rating);
      const suma = ratings.reduce((prev, current) => prev + current);
      const otherSuma = suma + num;
      const total = opinion.length + 1;
      const result = (otherSuma / total).toFixed(1);
      return result;
    }
  }

  const handlePostComments = async (e) => {
    e.preventDefault();
    const data = {
      idUser: user.uid,
      rating: value,
      title: user.name,
      opinion: newOpinion,
    }
    try {
      const res = await eventsApi.post('/events/opinionsGenerate/' + id, data);
      setOpinion([...opinion, res.data]);
      setNewOpinion('');
      setValue(0);
      setNumber(calcRating(res.data.rating));
      getRatingEvent(id, {rating: calcRating(res.data.rating)});
    } 
    catch (error) {
      console.log(error)
    }
  }

  const handleAlert = (e) => {
    e.preventDefault();
    swal({
      title: 'Debes estar registrado para poder enviar un comentario',
      icon: 'warning',
      button: 'Cerrar',
      dangerMode: true,
    });
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
            <p className={styles.ratNumber}>
              {opinion.length} opiniones - {number} de 5 Positivas 
            </p>
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
              value={value}
              precision={0.5} 
              onChange={(e) => setValue(e.target.value)}
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