import React, { useContext, useEffect, useState } from 'react';
import styles from './Register.module.css';

import { AuthContext } from '../../context/auth';

import { Link, useNavigate } from 'react-router-dom';
import { IconFacebook, IconGoogle } from '../../assets/Icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';

import useValidateForm from '../../hooks/useValidateForm';
import { UIContext } from '../../context/ui';
import eventsApi from '../../axios/eventsApi';
import { animateScroll as scroll } from 'react-scroll';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
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

  const [errorsInputs, handleChangeInputValue] = useValidateForm(formData, setFormData);

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

  /* Error registrandose */
  const [messageError, setMessageError] = useState({
    error: false,
    message: '',
  });

  const [succesData, setSuccesData] = useState(false);

  const onRegister = async (e) => {
    e.preventDefault();

    if (formData.codeReferred.length === 0) {
      setIsValidCodeReferred(true);
    }

    const hasError = Object.values(errorsInputs).includes(false);
    if (hasError || !isValidCodeReferred)
      return setMessageError({
        error: true,
        message: 'Ingrese los datos correctamente',
      });

    if (formData.name === '' || formData.password === '' || formData.confirmPassword === '') {
      return setMessageError({
        error: true,
        message: 'Ingrese los datos correctamente',
      });
    }

    const userData = {
      name: `${formData.name} ${formData.lastName}`,
      firstName: formData.name,
      lastName: formData.lastName,
      email: formData.mail,
      password: formData.password,
      canReceivedInformation: formData.canReceivedInformation,
      codeReferred: formData.codeReferred,
    };

    try {
      setMessageError({
        error: false,
        message: '',
      });

      localStorage.setItem('user', JSON.stringify(userData));
      setSuccesData(true);
    } catch (error) {
      setMessageError({
        error: true,
        message: error.response.data.message,
      });
    }
  };

  const navigateVerificate = () => {
    setSuccesData(false);

    navigate('/verificarmail/register');
  };

  const registerWithProvider = async (provider) => {
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
            const { name, email, id } = event.data._json;

            user = {
              email,
              name,
              firstName: name.split(' ')[0],
              lastName: name.split(' ')[1],
              password: id + 'aA@',
              registerProvider: provider,
            };
          }

          if (provider === 'google') {
            const { sub, name, email, family_name, given_name } = event.data._json;

            user = {
              email,
              name,
              firstName: given_name,
              lastName: family_name,
              password: sub + 'aA@',
              registerProvider: provider,
            };
          }

          try {
            const userRegister = await eventsApi.post('/users/create', user);
            localStorage.setItem('user', JSON.stringify(userRegister.data));
            localStorage.setItem('token', userRegister.data.token);
            login(userRegister.data);
            navigate('/');
          } catch (error) {
            setMessageError({
              error: true,
              message: error.response.data.message,
            });
          }
          popup.close();
        }
      }
    });
  };

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const [isValidCodeReferred, setIsValidCodeReferred] = useState(true);

  const handleCodeReferred = async (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setFormData({
      ...formData,
      [id]: value,
    });

    setIsValidCodeReferred(false);

    if (value.length === 8) {
      try {
        await eventsApi.post('/users/checkValidateCodeReferred', {
          code: value,
        });

        setIsValidCodeReferred(true);
      } catch (error) {
        setIsValidCodeReferred(false);
      }
    }
  };

  return (
    <div className={`${styles.pageRegister} container`}>
      <h1 className={styles.title}>Registrate</h1>
      <div className={styles.loginProviders}>
        <button onClick={() => registerWithProvider('facebook')} className={styles.providerFacebook}>
          <IconFacebook />
          <span>Ingresa con Facebook</span>
        </button>
        <button onClick={() => registerWithProvider('google')} className={styles.providerGoogle}>
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
            <label htmlFor='name'>Nombre(s)</label>
            <input autoComplete='off' type='text' id='name' onChange={handleChangeInputValue} required />
            {errorsInputs.name === false && (
              <span className={styles.errorMessage}>No ingresar palabras ofensivas.</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='lastName'>Apellido(s)</label>
            <input autoComplete='off' type='text' id='lastName' onChange={handleChangeInputValue} required />
            {errorsInputs.lastName === false && (
              <span className={styles.errorMessage}>No ingresar palabras ofensivas.</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='mail'>Email</label>
            <input
              style={{
                border: errorsInputs.mail === false && '1px solid #C34A33',
              }}
              type='email'
              id='mail'
              onChange={handleChangeInputValue}
              autoComplete='off'
              required
            />
            {errorsInputs.mail === false && <span className={styles.errorMessage}>Formato invalido</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='password'>Contraseña</label>
            <div className={styles.containerInputForPassword}>
              <input
                style={{
                  border: errorsInputs.password === false && '1px solid #C34A33',
                }}
                type={isPasswordVisible.password ? 'text' : 'password'}
                id='password'
                placeholder='Entre 12 y 20 caracteres que idealmente incluya combinación de una mayúscula, números y caracteres especiales (* / - _ & @^)'
                required
                onChange={handleChangeInputValue}
                autoComplete='off'
                className={styles.inputPassword}
              />

              {!isPasswordVisible.password ? (
                <FiEye onClick={() => handleChangeVisiblePassword('password')} className={styles.iconVisiblePassword} />
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
          <div className={styles.formGroupReferred}>
            <label htmlFor='codeReferred'>¿Tienes un código de Referido?</label>
            <input
              style={{
                border: errorsInputs.codeReferred === false && '1px solid #C34A33',
              }}
              id='codeReferred'
              onChange={handleCodeReferred}
              value={formData.codeReferred}
              type='text'
            />
            {!isValidCodeReferred && <span className={styles.errorMessage}>El código no es válido.</span>}
          </div>
          {messageError.error && (
            <div className={styles.messageError}>
              <p>{messageError.message}</p>
            </div>
          )}
        </div>

        <div className={styles.divisorWithoutO} />

        <div className={styles.containerDescription}>
          <p>
            Tu información esta segura con nosotros y no se comparte con terceros. Todos tus datos serán tratados de
            conformidad con la normatividad de Políticas de Datos y nuestra política de tratamiento de datos.
            Información que está disponible&nbsp; <Link to={'/privacidad'}>aquí</Link>.
          </p>
          <p>
            Al proceder con la creación de tu cuenta aceptas la Política de &nbsp;
            <Link to={'/privacidad'}>Tratamiento de Datos, la Política de Seguridad y los Términos y Condiciones</Link>
            &nbsp;de LO QUE QUIERO HACER S.A.S. Aceptas ser contactado por nosotros en relación a los eventos que
            compres o publiques en la Plataforma y confirmas ser mayor de edad.
          </p>
        </div>

        <div className={styles.containerPromotionAndEmails}>
          <input
            id='canReceivedInformation'
            checked={formData.canReceivedInformation}
            type='checkbox'
            onChange={handleChangeInputValue}
          />
          <p>Quiero recibir información sobre promociones, actualizaciones y eventos que me puedan interesar.</p>
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

      {succesData && (
        <div className={styles.overlay}>
          <div className={styles.boxContent}>
            <MdOutlineClose onClick={() => setSuccesData(false)} className={styles.iconOverlay} />
            <div className={styles.containerInfoOverlay}>
              <h2>Ya casi eres parte de 'LO QUE QUIERO HACER'</h2>
              <p>
                Hemos enviado un código de validación a tu correo electrónico, lo necesitarás para finalizar tu proceso
                de registro. Recuerda ver la lista de no deseados y agréganos a tu lista de contactos.
              </p>
              <button onClick={() => navigateVerificate()} className={styles.btnOverlay}>
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
