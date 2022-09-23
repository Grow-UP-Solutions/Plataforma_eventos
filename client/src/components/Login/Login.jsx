import React, { useContext } from 'react';

import styles from './Login.module.css';

import { IconFacebook, IconGoogle } from '../../assets/Icons';

import { CgClose } from 'react-icons/cg';

import { UIContext } from '../../context/ui';

const Login = () => {
  const { toggleScreenLogin } = useContext(UIContext);

  return (
    <div className={styles.containerLogin}>
      <div className={styles.contentBox}>
        <CgClose onClick={toggleScreenLogin} className={styles.closeIcon} />
        <h1 className={styles.title}>Ingresa</h1>
        <div className={styles.loginProviders}>
          <button className={styles.providerFacebook}>
            <IconFacebook />
            <span>Ingresa con Facebook</span>
          </button>
          <button className={styles.providerGoogle}>
            <IconGoogle />
            <span>Ingresa con Google</span>
          </button>
        </div>
        <div className={styles.divisor}>
          <div className={styles.lineOfDivisor} />
          <p>O</p>
          <div className={styles.lineOfDivisor} />
        </div>
        <form className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="mail">Usuario</label>
            <input type="mail" id="mail" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" />
          </div>

          <div className={styles.optionLogin}>
            <div className={styles.checkboxRemember}>
              <input type="checkbox" />
              <span>Recuérdame</span>
            </div>

            <div className={styles.forgetPassword}>
              <button>¿Olvidaste tu contraseña?</button>
            </div>
          </div>

          <button className={styles.btnLogin}>Ingresar</button>
        </form>
        <div className={styles.divisorWithoutO} />

        <div className={styles.containerOptionLogin}>
          <p>¿No tienes cuenta?</p>
          <button>Crear cuenta</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
