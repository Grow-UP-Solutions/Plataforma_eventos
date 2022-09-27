import React, { useContext, useState } from 'react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';

import { IconFacebook, IconGoogle } from '../../assets/Icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import useValidateForm from '../../hooks/useValidateForm';
import { UIContext } from '../../context/ui';
import axios from 'axios';

const Register = () => {
  const { toggleScreenLogin } = useContext(UIContext);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    mail: '',
    password: '',
    confirmPassword: '',
    codeReferred: '',
    canReceivedInformation: true,
  });

  const [errorsInputs, handleChangeInputValue] = useValidateForm(
    formData,
    setFormData
  );

  /* FUNCTIONS FOR VISIBLE PASSWORDS */
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

  /* 
  TODO: SEND FORM REGISTER TO BACKEND 
  */
  const onRegister = async (e) => {
    e.preventDefault();
    const userData = {
      name: `${formData.name} ${formData.lastName}`,
      email: formData.mail,
      password: formData.password,
    };

    const result = await axios.post(
      'http://localhost:3001/users/create',
      userData
    );

    console.log(result);
  };

  return (
    <div className={`${styles.pageRegister} container`}>
      <h1 className={styles.title}>Registrate</h1>
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

      {/* FORM */}

      <form onSubmit={onRegister} className={styles.formContainer}>
        <div className={styles.containerInputsForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre(s)</label>
            <input
              autoComplete="off"
              type="text"
              id="name"
              onChange={handleChangeInputValue}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Apellido(s)</label>
            <input
              autoComplete="off"
              type="text"
              id="lastName"
              onChange={handleChangeInputValue}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="mail">Email</label>
            <input
              style={{
                border: errorsInputs.mail === false && '1px solid #C34A33',
              }}
              type="email"
              id="mail"
              onChange={handleChangeInputValue}
              autoComplete="off"
              required
            />
            {errorsInputs.mail === false && (
              <span className={styles.errorMessage}>Formato invalido</span>
            )}
          </div>
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
                <span className={styles.errorMessage}>
                  Las contraseñas no coinciden
                </span>
              )}
            </div>
          </div>
          <div className={styles.formGroupReferred}>
            <label htmlFor="codeReferred">¿Tienes un código de Referido?</label>
            <input
              style={{
                border:
                  errorsInputs.codeReferred === false && '1px solid #C34A33',
              }}
              id="codeReferred"
              onChange={handleChangeInputValue}
              value={formData.codeReferred}
              type="text"
            />
            {errorsInputs.codeReferred === false && (
              <span className={styles.errorMessage}>
                El código no es válido.
              </span>
            )}
          </div>
        </div>

        <div className={styles.divisorWithoutO} />

        <div className={styles.containerDescription}>
          <p>
            Tu información esta segura con nosotros y no se comparte con
            terceros. Todos tus datos serán tratados de conformidad con la
            normatividad de Políticas de Datos y nuestra política de tratamiento
            de datos. Información que está disponible&nbsp;{' '}
            <Link to={'/privacy'}>aquí</Link>.
          </p>
          <p>
            Al proceder con la creación de tu cuenta aceptas la Política de
            &nbsp;
            <Link to={'/'}>
              Tratamiento de Datos, la Política de Seguridad y los Términos y
              Condiciones
            </Link>
            &nbsp;de LO QUE QUIERO HACER S.A.S. Aceptas ser contactado por
            nosotros en relación a los eventos que compres o publiques en la
            Plataforma y confirmas ser mayor de edad.
          </p>
        </div>

        <div className={styles.containerPromotionAndEmails}>
          <input
            id="canReceivedInformation"
            checked={formData.canReceivedInformation}
            type="checkbox"
            onChange={handleChangeInputValue}
          />
          <p>
            Quiero recibir información sobre promociones, actualizaciones y
            eventos que me puedan interesar.
          </p>
        </div>
        <div className={styles.btnRegister}>
          <button>Registrate</button>
        </div>
      </form>
      <div className={styles.divisorWithoutO} />

      <div className={styles.containerOptionLogin}>
        <p>¿Ya tienes cuenta?</p>
        <button onClick={toggleScreenLogin}>Entrar</button>
      </div>
    </div>
  );
};

export default Register;
