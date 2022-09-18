import React from 'react';
import styles from './AboutOrganizer.module.css';

const AboutOrganizer = ({ userDetail }) => {
  console.log(userDetail);

  return (
    <div className={styles.container}>
      <p className={styles.description}>{userDetail.descriptionOrganizer}</p>
    </div>
  );
};

export default AboutOrganizer;
