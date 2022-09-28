import React from 'react';

import styles from './ChangePassword.module.css';

const ChangePassword = () => {
  return (
    <div className={`${styles.page} container`}>
      <div className={styles.container}>
        <div className={styles.containerImg}></div>

        <div className={styles.containerInfo}>
          <h1 className={styles.title}>Cambiar contraseña</h1>
          <form>
            <div className="formGroup">
              <label htmlFor="password">Ingresa una contraseña nueva</label>
              <input type="text" id="password" />
            </div>
            <div className="formGroup">
              <label htmlFor="confirmPassword">
                Repite la nueva contraseña
              </label>
              <input type="text" id="password" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
