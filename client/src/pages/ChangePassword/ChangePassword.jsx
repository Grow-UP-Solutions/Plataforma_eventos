import React from 'react';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IconChangePassword } from '../../assets/Icons';
import useValidateForm from '../../hooks/useValidateForm';

import styles from './ChangePassword.module.css';

const ChangePassword = () => {
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

  return (
    <div className={`${styles.page} container`}>
      <div className={styles.container}>
        <div className={styles.containerImg}>
          <IconChangePassword />
        </div>

        <div className={styles.containerInfo}>
          <h1 className={styles.title}>Cambiar contraseña</h1>
          <form className={styles.formContainer}>
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
