import React, { useContext, useEffect, useState } from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Rating } from '@mui/material';
import styles from './Opinions.module.css';
import axios from "axios";
import { AuthContext } from '../../context/auth/AuthContext';
import avatar from '../../assets/imgs/no-avatar.png';
import { format } from "timeago.js";

const Opinions = ({ userDetail }) => {

  const id = userDetail._id;
  const [opinion, setOpinion] = useState([]);
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

  const handlePostComments = async (e) => {
    e.preventDefault();
    const data = {
      idUser: user.uid,
      rating: 5,
      title: user.name,
      opinion: newOpinion,
    }
    try {
      const res = await axios.post('https://plataformaeventos-production-6111.up.railway.app/users/commentOrganizer/' + id, data);
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
    <div className={styles.container}>

      <div className={styles.containerOpinions}>

        <div className={styles.subTitle}>
          <p className={styles.ratNumber}>
            {userDetail.opinionsOrg.length} opiniones -{' '}
            {userDetail.opinionsOrg.rating}% Positivas{' '}
          </p>
        </div>

        {
          opinion ? (
            <>
              <div>
                {
                  opinion.map((o) => (
                    <div className={styles.comment}>
                      <div className={styles.userComment}>
                        <div>
                          <img
                            className={styles.picture}
                            src={avatar}
                            alt="Not Found ):"
                            width="20px"
                            height="30px"
                          />
                        </div>

                        <div className={styles.nameDan}>
                          <div className={styles.infoComment}>
                            <div className={styles.namRat}>
                              <span className={styles.user}>{o.title}</span>
                              <Rating
                                className={styles.rating}
                                name="read-only"
                                value={o.rating}
                                readOnly
                              />
                            </div>
                            <p className={styles.time}>{format(o.time)}</p>
                            <p className={styles.opinion}>{o.opinion}</p>
                          </div>

                          <div
                            className={styles.reportCom}
                            data-hover="Reportar contenido inapropiado"
                          >
                            <ReportProblemIcon
                              sx={{ fontSize: '40px', color: '#cbcbcb' }}
                            />
                          </div>
                        </div>
                      </div>
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
            defaultValue={0}
            precision={0.5}
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
