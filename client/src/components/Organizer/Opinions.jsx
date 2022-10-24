import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import styles from './Opinions.module.css';
import axios from "axios";
import { AuthContext } from '../../context/auth/AuthContext';
import swal from 'sweetalert';
import CardComments from '../CardComments/CardComments';

const Opinions = ({ userDetail }) => {

  const id = userDetail._id;
  const [opinion, setOpinion] = useState([]);
  const [value, setValue] = useState(0);
  const [newOpinion, setNewOpinion] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getAllComments = async() => {
      try {
        const res = await axios.get('https://plataformaeventos-production-6111.up.railway.app/users/' + id);
        setOpinion(res.data.opinionsOrg);
      } catch (error) {
        console.log(error)
      }
    }
    getAllComments();
  }, [id]);

  const calcRating = () => {
    if (userDetail.opinionsOrg.length > 0) {
      const ratings = userDetail.opinionsOrg.map(e => e.rating);
      const suma = ratings.reduce((prev, current) => prev + current);
      const result = (suma / userDetail.opinionsOrg.length).toFixed(1);     
      return result;
    }
    console.log('no hay opiniones de este organizador');
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
      const res = await axios.post('https://plataformaeventos-production-6111.up.railway.app/users/commentOrganizer/' + id, data);
      setOpinion([...opinion, res.data]);
      setNewOpinion('');
      setValue(0);
      console.log('data:', data);
      console.log('res.data:', res.data);
    } catch (error) {
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
    <div className={styles.container}>

      <div className={styles.containerOpinions}>

        <div className={styles.subTitle}>
          <p className={styles.ratNumber}>
            {userDetail.opinionsOrg.length} opiniones -{' '}
            {calcRating() ? calcRating() : '0'} de 5 Positivas{' '}
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
          ) : <p>No hay comentarios</p>
        }

        <textarea
          className={styles.textarea}
          type="text"
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
    </div>
  );
};

export default Opinions;