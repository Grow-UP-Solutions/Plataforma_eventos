import React from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Rating } from '@mui/material';
import styles from './Opinions.module.css';

const Opinions = ({ userDetail }) => {
  console.log('opinionUse:', userDetail);

  return (
    <div className={styles.container}>
      <div className={styles.containerOpinions}>
        <div className={styles.subTitle}>
          <p className={styles.ratNumber}>
            {userDetail.opinionsOrg.length} opiniones -{' '}
            {userDetail.opinionsOrg.rating}% Positivas{' '}
          </p>
        </div>
        {userDetail.opinionsOrg.length > 0
          ? userDetail.opinionsOrg.map((opinion) => (
              <div className={styles.comment}>
                <div className={styles.userComment}>
                  <div>
                    <img
                      className={styles.picture}
                      src={opinion.picture}
                      alt="Not Found ):"
                      width="20px"
                      height="30px"
                    />
                  </div>
                  <div className={styles.nameDan}>
                    <div className={styles.infoComment}>
                      <div className={styles.namRat}>
                        <span className={styles.user}>{opinion.user}</span>
                        <Rating
                          className={styles.rating}
                          name="read-only"
                          value={userDetail.rating}
                          readOnly
                        />
                      </div>
                      <p className={styles.time}>{opinion.time}</p>
                      <p className={styles.opinion}>{opinion.opinion}</p>
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
                <hr className={styles.hr}></hr>
              </div>
            ))
          : 'No hay comentarios'}

        <textarea
          className={styles.textarea}
          type="text"
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
          <button className={styles.button}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Opinions;
