import React from 'react';
// import users from '../../api/users';
import styles from './GoodPracticeOrg.module.css';

const GoodPracticeOrg = () => {
  // const userDetail = users.filter((user) => user.name === 'Jean Pierre')[0];

  return (
    <div className={styles.container}>
      <p className={styles.title}>Buenas prácticas de un Organizador</p>
      <p className={styles.texto}> texto texto texto texto texto texto v texto texto v texto</p>
    </div>
  );
};

export default GoodPracticeOrg;
