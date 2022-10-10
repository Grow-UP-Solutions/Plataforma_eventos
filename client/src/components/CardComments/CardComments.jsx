
import React from 'react';
import styles from './CardComments.module.css';
import avatar from '../../assets/imgs/no-avatar.png';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Rating } from '@mui/material';
import { format } from "timeago.js";

const CardComments = ({ o }) => {

  return (
    <div className={styles.userComment}>
      <div>
        <img className={styles.picture} src={avatar} alt="Not Found ):" width="20px" height="30px"/>
      </div>

      <div className={styles.nameDan}>
        <div  className={styles.infoComment}>
          <div className={styles.namRat}>
            <span className={styles.user}>{o.title}</span>
            <Rating
              className={styles.rating}
              name="read-only"
              value={o.rating}
              readOnly
            />
          </div>
          <p  className={styles.time}>{format(o.time)}</p>
          <p  className={styles.opinion}>{o.opinion}</p>
        </div>

        <div className={styles.reportCom} data-hover='Reportar contenido inapropiado'>
          <ReportProblemIcon sx={{ fontSize: '40px', color: '#cbcbcb'  }}/>
        </div>
      </div>
    </div>           
  );
}

export default CardComments;
