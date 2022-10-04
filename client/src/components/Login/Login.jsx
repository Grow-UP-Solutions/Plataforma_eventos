import React, { useContext, useState } from 'react';
import styles from './Login.module.css';

import { AuthContext } from '../../context/auth/';
import { UIContext } from '../../context/ui';

import { CgClose } from 'react-icons/cg';
import { IconFacebook, IconGoogle } from '../../assets/Icons';

import { useNavigate } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import useValidateForm from '../../hooks/useValidateForm';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { toggleScreenLogin } = useContext(UIContext);

  const [modalChangePassword, setModalChangePassword] = useState({
    attemps: 0,
  });

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

  const [errorLogin, setErrorLogin] = useState({
    result: false,
    message: '',
  });

  const onLogin = async (e) => {
    e.preventDefault();

    if (errorLogin) setErrorLogin(false);

    const user = {
      email: formData.mail,
      password: formData.password,
    };

    let result;

    try {
      result = await eventsApi.post('/users/login', user);

      localStorage.setItem('token', result.data.token);

      login(result.data);
      toggleScreenLogin();
    } catch (error) {
      setErrorLogin({
        result: true,
        message: error.response.data.message,
      });

      setModalChangePassword({
        attemps: modalChangePassword.attemps + 1,
      });
    }
  };

  const loginWithProvider = async (provider) => {
    const popup = window.open(
      `${process.env.REACT_APP_API_URL}/users/login/${provider}`,
      'targetWindow',
      `toolbar=no, location=no, status=no,menubar=no, scrollbars=yes, resizable=yes,width=620, height=700`
    );

    window.addEventListener('message', async (event) => {
      if (event.origin === `${process.env.REACT_APP_API_URL}`) {
        if (event.data) {
          let user = {};

          if (provider === 'facebook') {
            const { email, id } = event.data._json;

            user = {
              email,
              password: id + 'aA@',
            };
          }

          if (provider === 'google') {
            const { sub, email } = event.data._json;

            user = {
              email,
              password: sub + 'aA@',
            };
          }

          try {
            const userLog = await eventsApi.post('/users/login', user);
            localStorage.setItem('user', JSON.stringify(userLog.data));
            localStorage.setItem('token', userLog.data.token);
            login(userLog.data);
            toggleScreenLogin();
          } catch (error) {
            setErrorLogin(true);
          }
          popup.close();
        }
      }
    });
  };

  const navigateToRegister = () => {
    toggleScreenLogin();
    navigate('/registrate');
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.contentBox}>
        <CgClose onClick={toggleScreenLogin} className={styles.closeIcon} />
        <h1 className={styles.title}>Ingresa</h1>
        <div className={styles.loginProviders}>
          <button
            onClick={() => loginWithProvider('facebook')}
            className={styles.providerFacebook}
          >
            <IconFacebook />
            <span>Ingresa con Facebook</span>
          </button>
          <button
            onClick={() => loginWithProvider('google')}
            className={styles.providerGoogle}
          >
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
          {errorLogin.result && (
            <div className={styles.messageError}>
              <p>{errorLogin.message}</p>
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
          <button onClick={navigateToRegister}>Crear cuenta</button>
        </div>

        {modalChangePassword.attemps >= 3 && (
          <div className={styles.containerModalChangePassword}>
            <p>
              Has intentado entrar muchas veces con contraseña incorrecta. Para
              tu seguridad cambia tu clave.
            </p>
            <button>Cambiar clave</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
