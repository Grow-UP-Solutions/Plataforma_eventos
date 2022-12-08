import React, { useContext, useEffect, useState } from 'react';
import styles from './Verification.module.css';

import { useNavigate, useParams } from 'react-router-dom';

import eventsApi from '../../axios/eventsApi';

import { AuthContext } from '../../context/auth';

import PinField from 'react-pin-field';

const Verification = () => {
  const { path } = useParams();
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [code, setCode] = useState('');

  const [errorMessage, setErrorMessage] = useState({
    hasError: false,
    message: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return navigate('/');
    }
    sendEmail(user.email);
    setUser(user);
  }, []);

  const sendEmail = async (email) => {
    try {
      await eventsApi.post('/users/sendEmailForConfirm', {
        email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = async (code) => {
    setCode(code);
  };

  const confirmAndLog = async (e) => {
    e.preventDefault();
    const userBody = { code };

    try {
      const result = await eventsApi.post('/users/confirmEmail', userBody);

      if (path === 'profile') {
        return window.opener.postMessage(
          { confirm: result.data.success },
          'https://events-jean.vercel.app/user/profile'
        );
      }

      if (result.data.success) {
        const userRegister = await eventsApi.post(`/users/create?codeReferral=${user.codeReferred}`, user);
        localStorage.setItem('token', userRegister.data.token);
        login({ ...userRegister.data });
      } else {
        throw new Error(result.data.message);
      }
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      setErrorMessage({
        hasError: true,
        message: error.response.data.message,
      });
    }
  };

  return (
    <div className={`${styles.pageVerification} container`}>
      <div className={styles.boxContent}>
        <h1 className={styles.title}>Ingresa el código que hemos enviado a tu correo</h1>
        <span className={styles.mail}>{user.email}</span>
        <div className={styles.divisor} />
        <div className={styles.containerInputs}>
          <PinField
            style={{
              border: errorMessage.hasError ? '1px solid #f03e3e' : '',
            }}
            length={6}
            validate={/^[0-9]$/}
            onChange={(code) => handleOnChange(code)}
          />
        </div>
        {errorMessage.hasError && <p className={styles.errorMessage}> {errorMessage.message} </p>}
        <button onClick={confirmAndLog} className={styles.sendCode}>
          Enviar
        </button>
        <div className={styles.divisor} />
        <button onClick={() => sendEmail(user.email)} className={styles.btnReSendCode}>
          Volver a enviar el código
        </button>
      </div>
    </div>
  );
};

export default Verification;
