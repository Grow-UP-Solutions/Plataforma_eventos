import React from 'react';
import styles from './HowItWorks.module.css';
import { iconHowIt1, iconHowIt2, iconHowIt3 } from '../../assets/imgs';

const HowItWorks = () => {
  
  return (
    <div className={styles.sectionHowItWorks}>
      <h2 className={styles.titleHowItWorks}>¿Cómo funciona?</h2>
      <div className={styles.howItWorks}>
        <div className={styles.items}>
          <span>1</span>
          <img src={iconHowIt1} alt="logo-icon-howitworks" />
          <p>¡Escoge lo que quieres hacer!</p>
        </div>
        <div className={styles.items}>
          <span>2</span>
          <img src={iconHowIt2} alt="logo-icon-howitworks" />
          <p>¡Inscribete en el evento!</p>
        </div>
        <div className={styles.items}>
          <span>3</span>
          <img src={iconHowIt3} alt="logo-icon-howitworks" />
          <p>¡Asiste y disfruta!</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
