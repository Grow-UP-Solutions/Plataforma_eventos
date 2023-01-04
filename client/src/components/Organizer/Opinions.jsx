import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import styles from './Opinions.module.css';
import eventsApi from '../../axios/eventsApi';
import { AuthContext } from '../../context/auth/AuthContext';
import swal from 'sweetalert';
import CardComments from '../CardComments/CardComments';
import { UIContext } from '../../context/ui';

const Opinions = ({ userDetail, eventsFromOrg }) => {
  const id = userDetail._id;
  const [opinion, setOpinion] = useState([]);
  const [number, setNumber] = useState(0);
  const [value, setValue] = useState(0);
  const [newOpinion, setNewOpinion] = useState('');
  const { user } = useContext(AuthContext);
  const { getRatingOrganizer } = useContext(UIContext);
  const [assisted, setAssisted] = useState(false);

  const fecha = new Date();
  const hora = fecha.getHours();
  const minutes = fecha.getMinutes();
  const dateActual = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

  useEffect(() => {
    if (eventsFromOrg[0] !== undefined) {
      const comprador = eventsFromOrg[0].generalBuyers.filter((b) => b.buyer === user.uid);
      const fecha = comprador[0];

      fecha.dates.map((date) => {
        if (new Date(date.date) < new Date(dateActual)) {
          setAssisted(true);
        } else if (date.date === dateActual) {
          if (date.end.slice(0, 2) <= hora && date.end.slice(3, 5) <= minutes + 2) {
            setAssisted(true);
          }
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const res = await eventsApi.get('/users/' + id);
        setOpinion(res.data.opinionsOrg);

        if (userDetail.opinionsOrg.length > 0) {
          setNumber(calcRatingEffect());
        } else {
          setNumber(0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllComments();
  }, [userDetail]);

  //RTING//

  const calcRatingEffect = () => {
    const opinionsRated = userDetail.opinionsOrg.filter((e) => e.rating > 0);
    const ratings = opinionsRated.map((e) => e.rating);
    const suma = ratings.reduce((prev, current) => prev + current);
    const result = (suma / opinionsRated.length).toFixed(1);
    return result;
  };

  const calcRating = (num) => {
    if (opinion.length === 0) {
      const resu = (num / 1).toFixed(1);
      return resu;
    } else {
      const opinionsWithRanking = opinion.filter((e) => e.rating > 0);
      const ratings = opinionsWithRanking.map((e) => e.rating);
      const suma = ratings.reduce((prev, current) => prev + current);
      const otherSuma = suma + num;
      const total = opinionsWithRanking.length + 1;
      const result = (otherSuma / total).toFixed(1);
      return result;
    }
  };

  // const calcRatingEffect = () => {
  //   const ratings = userDetail.opinionsOrg.map((e) => e.rating );
  //   const suma = ratings.reduce((prev, current) => prev + current);
  //   const result = (suma / userDetail.opinionsOrg.length).toFixed(1);
  //   return result;
  // };

  // const calcRating = (num) => {
  //   if (opinion.length === 0) {
  //     const resu = (num / 1).toFixed(1);
  //     return resu;
  //   } else {
  //     const ratings = opinion.map((e) => e.rating);
  //     const suma = ratings.reduce((prev, current) => prev + current);
  //     const otherSuma = suma + num;
  //     const total = opinion.length + 1;
  //     const result = (otherSuma / total).toFixed(1);
  //     return result;
  //   }
  // };

  const handlePostComments = async (e) => {
    e.preventDefault();
    const data = {
      idUser: user.uid,
      rating: value,
      title: user.name,
      opinion: newOpinion,
      picture: eventsFromOrg[0].generalBuyers[0].pictureBuyer,
      dateEvent: eventsFromOrg[0].generalBuyers[0].dates[0].date,
      eventTitle: eventsFromOrg[0].generalBuyers[0].eventTitle,
    };

    try {
      const res = await eventsApi.post('/users/commentOrganizer/' + id, data);
      setOpinion([...opinion, res.data]);
      setNewOpinion('');
      setValue(0);
      setNumber(calcRating(res.data.rating));
      getRatingOrganizer(id, { rating: calcRating(res.data.rating) });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlert = (e) => {
    e.preventDefault();
    swal({
      title: 'Debes estar registrado para poder enviar un comentario',
      icon: 'warning',
      button: 'Cerrar',
      dangerMode: true,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerOpinions}>
        <div className={styles.subTitle}>
          <p className={styles.ratNumber}>
            {opinion.length} opiniones - {number} de 5 Positivas{' '}
          </p>
        </div>

        {/* VER OPINIONES */}

        {opinion ? (
          <>
            <div>
              {opinion.map((o) => (
                <div key={o._id} className={styles.comment}>
                  <CardComments organizer={userDetail} o={o} />

                  <hr className={styles.hr}></hr>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No hay comentarios</p>
        )}

        {/* ESCRIBIR OPINION */}
        {assisted === true && eventsFromOrg !== undefined ? (
          <div>
            <textarea
              className={styles.textarea}
              type='text'
              placeholder='Escribe un Comentario'
              value={newOpinion}
              onChange={(e) => setNewOpinion(e.target.value)}
            />

            <div className={styles.contRate}>
              <p className={styles.pRate}>Rate:</p>

              <Rating
                className={styles.rating}
                name='half-rating'
                value={value}
                precision={0.5}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <div className={styles.contBtn}>
              <button className={styles.button} onClick={user.uid ? handlePostComments : handleAlert}>
                Enviar
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Opinions;
