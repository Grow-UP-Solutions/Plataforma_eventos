import React, { useContext, useEffect, useState } from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Rating } from '@mui/material';
import styles from './Opinions.module.css';
import axios from "axios";
import { AuthContext } from '../../context/auth/AuthContext';
import avatar from '../../assets/imgs/no-avatar.png';
import { format, register } from "timeago.js";
import swal from 'sweetalert';

const localeFunc = (number, index, total_sec) => {
  // number: the timeago / timein number;
  // index: the index of array below;
  // total_sec: total seconds between date to be formatted and today's date;
  return [
    ['justo ahora', 'en un rato'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'en %s horas'],
    ['hace 1 día', 'en 1 día'],
    ['hace %s días', 'en %s días'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['hace 1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años'],
  ][index];
};
register('es_ES', localeFunc);

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
                            <p className={styles.time}>{format(o.time, 'es_ES')}</p>
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
            //defaultValue={0}
            precision={0.5}
            value={value}
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
