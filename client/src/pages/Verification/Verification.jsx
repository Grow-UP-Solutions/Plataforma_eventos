import React, { useContext, useEffect, useState } from 'react';

import styles from './Verification.module.css';

import { AiOutlineMinus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import eventsApi from '../../axios/eventsApi';

import { AuthContext } from '../../context/auth';

const Verification = () => {
  const { login } = useContext(AuthContext);

  const [user, setUser] = useState({});
  const [code, setCode] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  });

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
      const result = await eventsApi.post('/users/sendEmailForConfirm', {
        email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = async (e) => {
    setCode({
      ...code,
      [e.target.name]: e.target.value,
    });
  };

  const confirmAndLog = async () => {
    const userBody = {
      code:
        code.input1 +
        code.input2 +
        code.input3 +
        code.input4 +
        code.input5 +
        code.input6,
    };

    try {
      const result = await eventsApi.post('/users/confirmEmail', userBody);

      if (result.data.success) {
        const userRegister = await eventsApi.post('/users/create', user);
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
        <h1 className={styles.title}>
          Ingresa el código que hemos enviado a tu correo
        </h1>
        <span className={styles.mail}>{user.email}</span>
        <div className={styles.divisor} />
        <div className={styles.containerInputs}>
          <input
            name='input1'
            type='number'
            pattern='[0-9]*'
            value={code.input1}
            onChange={handleOnChange}
          />
          <input
            name='input2'
            value={code.input2}
            type='number'
            pattern='[0-9]*'
            onChange={handleOnChange}
          />
          <input
            name='input3'
            value={code.input3}
            type='number'
            pattern='[0-9]*'
            onChange={handleOnChange}
          />
          <AiOutlineMinus className={styles.iconMinus} />
          <input
            name='input4'
            value={code.input4}
            type='number'
            pattern='[0-9]*'
            onChange={handleOnChange}
          />
          <input
            name='input5'
            value={code.input5}
            type='number'
            pattern='[0-9]*'
            onChange={handleOnChange}
          />
          <input
            name='input6'
            value={code.input6}
            type='number'
            pattern='[0-9]*'
            onChange={handleOnChange}
          />
        </div>

        {errorMessage.hasError && (
          <p className={styles.errorMessage}> {errorMessage.message} </p>
        )}

        <button onClick={confirmAndLog} className={styles.sendCode}>
          Enviar
        </button>
        <div className={styles.divisor} />
        <button
          onClick={() => sendEmail(user.email)}
          className={styles.btnReSendCode}
        >
          Volver a enviar el código
        </button>
      </div>
    </div>
  );
};

export default Verification;
