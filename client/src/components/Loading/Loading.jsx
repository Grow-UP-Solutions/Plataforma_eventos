import React from 'react';

import styles from './Loading.module.css';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <AiOutlineLoading3Quarters className={styles.iconLoading} />
    </div>
  );
};

export default Loading;
