import React from 'react';
import styles from './AboutOrganizer.module.css';

const AboutOrganizer = ({ userDetail }) => {
  return (
    <div className={styles.container}>
      <p className={styles.description}>{userDetail}</p>
    </div>
  );
};

export default AboutOrganizer;
