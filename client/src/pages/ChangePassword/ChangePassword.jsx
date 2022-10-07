import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../context/auth';
import { useNavigate, useParams } from 'react-router-dom';

import eventsApi from '../../axios/eventsApi';
import useValidateForm from '../../hooks/useValidateForm';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IconChangePassword } from '../../assets/Icons';
import styles from './ChangePassword.module.css';

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
  const [successMessage, setSuccessMessage] = useState({
    isSuccess: true,
    message: '',
  });

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errorsInputs, handleChangeInputValue] = useValidateForm(
    formData,
    setFormData
  );

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
    console.log({ logged, user });

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
      return setErrorMessage({
        isFail: true,
        message: 'Por favor complete los campos correctamente',
      });
    }

    try {
      const result = await eventsApi.post('/users/changePassword', {
        email,
        password,
      });

      setSuccessMessage({
        isSuccess: true,
        message: 'Contraseña cambiada exitosamente',
      });

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${styles.page} container`}>
      <div className={styles.container}>
        <div className={styles.containerImg}>
          <IconChangePassword />
        </div>

        <div className={styles.containerInfo}>
          <h1 className={styles.title}>Cambiar contraseña</h1>
          <form onSubmit={changePassword} className={styles.formContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <div className={styles.containerInputForPassword}>
                <input
                  style={{
                    border:
                      errorsInputs.password === false && '1px solid #C34A33',
                  }}
                  type={isPasswordVisible.password ? 'text' : 'password'}
                  id="password"
                  placeholder="Entre 12 y 20 caracteres que idealmente incluya combinación de letras, números y caracteres especiales (* / - _ & @^)"
                  required
                  onChange={handleChangeInputValue}
                  autoComplete="off"
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
                  <span className={styles.errorMessage}>
                    Contraseña sin el formato especificado.
                  </span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <div className={styles.containerInputForPassword}>
                <input
                  style={{
                    border:
                      errorsInputs.confirmPassword === false &&
                      '1px solid #C34A33',
                  }}
                  type={isPasswordVisible.confirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  required
                  onChange={handleChangeInputValue}
                />

                {!isPasswordVisible.confirmPassword ? (
                  <FiEye
                    onClick={() =>
                      handleChangeVisiblePassword('confirmPassword')
                    }
                    className={styles.iconVisiblePassword}
                  />
                ) : (
                  <FiEyeOff
                    onClick={() =>
                      handleChangeVisiblePassword('confirmPassword')
                    }
                    className={styles.iconVisiblePassword}
                  />
                )}
                {errorsInputs.confirmPassword === false && (
                  <span className={styles.errorMessage}>
                    Las contraseñas no coinciden
                  </span>
                )}
              </div>
            </div>
            {errorMessage.isFail && (
              <div>
                <p className={styles.containerErrorMessageGeneral}>
                  {errorMessage.message}
                </p>
              </div>
            )}

            {successMessage.isSuccess && (
              <div>
                <p className={styles.containerSuccessMessageGeneral}>
                  {successMessage.message}
                </p>
              </div>
            )}

            <div className={styles.btnCambiar}>
              <button>Cambiar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
