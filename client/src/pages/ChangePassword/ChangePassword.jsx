import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../context/auth';
import { useNavigate, useParams } from 'react-router-dom';

import eventsApi from '../../axios/eventsApi';
import useValidateForm from '../../hooks/useValidateForm';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IconChangePassword } from '../../assets/Icons';
import styles from './ChangePassword.module.css';
import { animateScroll as scroll } from 'react-scroll';
const ChangePassword = () => {
  const { token } = useParams();
  const { logged, user } = useContext(AuthContext);

  localStorage.setItem('token-pass', token);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    isFail: false,
    message: '',
  });
  const [modalSuccessChangePassword, setModalSuccessChangePassword] = useState(false);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errorsInputs, handleChangeInputValue] = useValidateForm(formData, setFormData);
  const [modalErrorForgetPassword, setModalErrorForgetPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChangeVisiblePassword = (option) => {
    setIsPasswordVisible({
      ...isPasswordVisible,
      [option]: !isPasswordVisible[option],
    });
  };

  useEffect(() => {
    if (logged || Object.keys(user).length > 0) {
      return navigate('/');
    }

    setTimeout(() => {
      verifyToken();
    }, 500);
  }, []);

  const verifyToken = async () => {
    try {
      const result = await eventsApi.get('/users/mail/validateTokenPassword');
      setEmail(result.data.email);
    } catch (error) {
      navigate('/');
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const { confirmPassword, password } = formData;

    if (confirmPassword === '' || password === '') {
      return setModalErrorForgetPassword(true);
    }

    try {
      await eventsApi.post('/users/changePassword', {
        email,
        password,
      });

      setModalSuccessChangePassword(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scroll.scrollToTop();
  }, []);
  return (
    <div className={`${styles.page} container`}>
      <div className={styles.container}>
        <div className={styles.containerImg}>
          <IconChangePassword styles={styles.imgCandado} />
        </div>

        <div className={styles.containerInfo}>
          <h1 className={styles.title}>Cambiar contraseña</h1>
          <form onSubmit={changePassword} className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label htmlFor='password'>Contraseña</label>
              <div className={styles.containerInputForPassword}>
                <input
                  style={{
                    border: errorsInputs.password === false && '1px solid #C34A33',
                  }}
                  type={isPasswordVisible.password ? 'text' : 'password'}
                  id='password'
                  placeholder='Entre 12 y 20 caracteres con número(s), letra(s), y alguno(s) de estos especiales (* / - _ & @^)'
                  required
                  onChange={handleChangeInputValue}
                  autoComplete='off'
                />

                {!isPasswordVisible.password ? (
                  <FiEye
                    onClick={() => handleChangeVisiblePassword('password')}
                    className={styles.iconVisiblePassword}
                  />
                ) : (
                  <FiEyeOff
                    onClick={() => handleChangeVisiblePassword('password')}
                    className={styles.iconVisiblePassword}
                  />
                )}
                {errorsInputs.password === false && (
                  <span className={styles.errorMessage}>Contraseña sin el formato especificado.</span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='confirmPassword'>Confirmar contraseña</label>
              <div className={styles.containerInputForPassword}>
                <input
                  style={{
                    border: errorsInputs.confirmPassword === false && '1px solid #C34A33',
                  }}
                  type={isPasswordVisible.confirmPassword ? 'text' : 'password'}
                  id='confirmPassword'
                  required
                  onChange={handleChangeInputValue}
                />

                {!isPasswordVisible.confirmPassword ? (
                  <FiEye
                    onClick={() => handleChangeVisiblePassword('confirmPassword')}
                    className={styles.iconVisiblePassword}
                  />
                ) : (
                  <FiEyeOff
                    onClick={() => handleChangeVisiblePassword('confirmPassword')}
                    className={styles.iconVisiblePassword}
                  />
                )}
                {errorsInputs.confirmPassword === false && (
                  <span className={styles.errorMessage}>Las contraseñas no coinciden</span>
                )}
              </div>
            </div>

            <div className={styles.btnCambiar}>
              <button>Cambiar</button>
            </div>
          </form>

          {modalSuccessChangePassword && (
            <div className={styles.overlayErrorModalPassword}>
              <div className={styles.containerErrorModalPassword}>
                <p>
                  Hemos enviado un código de validación a tu correo electrónico, revísalo para finalizar tu proceso de
                  cambio de clave. Recuerda ver la lista de no deseados y agregárnos a la lista blanca de contáctos.
                </p>
                <button
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {modalErrorForgetPassword && (
            <div className={styles.overlayErrorModalPassword}>
              <div className={styles.containerErrorModalPassword}>
                <p>Información en casilla(s) esta incompleta o con formato incorrecto. Por favor revisar</p>
                <button
                  onClick={() => {
                    setModalErrorForgetPassword(false);
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
