import React, { useContext, useState } from 'react';
import styles from './Login.module.css';

import { UIContext } from '../../context/ui';
import { AuthContext } from '../../context/auth/';

import { IconFacebook, IconGoogle } from '../../assets/Icons';
import { CgClose } from 'react-icons/cg';

import useValidateForm from '../../hooks/useValidateForm';
import axios from 'axios';

const Login = () => {
  const { login } = useContext(AuthContext);
  const { toggleScreenLogin } = useContext(UIContext);
  const [saveSession, setSaveSession] = useState(false);
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  });

  const [errorsInputs, handleChangeInputValue] = useValidateForm(
    formData,
    setFormData
  );

  /* 
    TODO: LOGIN
  */

  const [errorLogin, setErrorLogin] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();

    if (errorLogin) setErrorLogin(false);

    const user = {
      email: formData.mail,
      password: formData.password,
    };

    let result;
    try {
      result = await axios.post('http://localhost:3001/users/login', user);

      localStorage.setItem(('token', result.data.token));

      login(result.data);
      toggleScreenLogin();
    } catch (error) {
      setErrorLogin(true);
    }
  };

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
        <form onSubmit={onLogin} className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="mail">Usuario</label>
            <input
              required
              onChange={handleChangeInputValue}
              type="mail"
              id="mail"
            />
            {errorsInputs.mail === false && (
              <span>Ingrese un correo válido</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              required
              onChange={handleChangeInputValue}
              type="password"
              id="password"
            />
          </div>
          {errorLogin && (
            <div className={styles.messageError}>
              <p>Correo o contraseña incorrectos</p>
            </div>
          )}
          <div className={styles.optionLogin}>
            <div className={styles.checkboxRemember}>
              <input
                checked={saveSession}
                onChange={() => setSaveSession(!saveSession)}
                type="checkbox"
              />
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
