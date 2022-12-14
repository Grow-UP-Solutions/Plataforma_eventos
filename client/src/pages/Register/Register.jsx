import React, { useContext, useEffect, useState } from 'react';
import styles from './Register.module.css';

import { AuthContext } from '../../context/auth';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { IconGoogle } from '../../assets/Icons';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { animateScroll as scroll } from 'react-scroll';
import eventsApi from '../../axios/eventsApi';
import { stateContext } from '../../context/state/stateContext';
import { UIContext } from '../../context/ui';
import useValidateForm from '../../hooks/useValidateForm';

const Register = () => {
  const { setResult } = useContext(stateContext);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toggleScreenLogin } = useContext(UIContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    mail: '',
    password: '',
    confirmPassword: '',
    codeReferred: '',
    canReceivedInformation: true,
  });

  useEffect(() => {
    if (Object.keys(user).length > 0) navigate('/');
  }, [user]);

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

    setIsLoading(true);

    try {
      setMessageError({
        error: false,
        message: '',
      });
      await eventsApi.post('/users/verifyEmailNotUsing', { email: userData.email });
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
      setSuccesData(true);
    } catch (error) {
      setIsLoading(false);
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
      setIsValidCodeReferred(true);
      try {
        await eventsApi.post('/users/checkValidateCodeReferred', {
          code: value,
        });

        setIsValidCodeReferred(true);
      } catch (error) {
        console.log({ error });
        setIsValidCodeReferred(false);
      }
    }
  };

  return (
    <div className={`${styles.pageRegister} container`}>
      <h1 className={styles.title}>Registrate</h1>
      <div className={styles.loginProviders}>
        {/*  <button onClick={() => registerWithProvider('facebook')} className={styles.providerFacebook}>
          <IconFacebook />
          <span>Ingresa con Facebook</span>
        </button> */}
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
            <label htmlFor='password'>Contrase??a</label>
            <div className={styles.containerInputForPassword}>
              <input
                style={{
                  border: errorsInputs.password === false && '1px solid #C34A33',
                }}
                type={isPasswordVisible.password ? 'text' : 'password'}
                id='password'
                placeholder='Entre 12 y 20 caracteres con n??mero(s), letra(s), y alguno(s) de estos especiales (* / - _ & @^)'
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
                <span className={styles.errorMessage}>Contrase??a sin el formato especificado.</span>
              )}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='confirmPassword'>Confirmar contrase??a</label>
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
                <span className={styles.errorMessage}>Las contrase??as no coinciden</span>
              )}
            </div>
          </div>
          <div className={styles.formGroupReferred}>
            <label htmlFor='codeReferred'>??Tienes un c??digo de Referido?</label>
            <input
              style={{
                border: errorsInputs.codeReferred === false && '1px solid #C34A33',
              }}
              id='codeReferred'
              onChange={handleCodeReferred}
              value={formData.codeReferred}
              type='text'
            />
            {!isValidCodeReferred && <span className={styles.errorMessage}>El c??digo no es v??lido.</span>}
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
            Tu informaci??n esta segura con nosotros y no se comparte con terceros. Todos tus datos ser??n tratados de
            conformidad con la normatividad de Pol??ticas de Datos y nuestra pol??tica de tratamiento de datos.
            Informaci??n que est?? disponible&nbsp; <Link to={'/docs/privacidad/usuario'}>aqu??</Link>.
          </p>
          <p>
            Al proceder con la creaci??n de tu cuenta aceptas la &nbsp;
            <Link to={'/docs/privacidad/usuario'}>Pol??tica de Privacidad</Link>, la{' '}
            <Link to={'/docs/seguridad/usuario'}>Pol??tica de Seguridad</Link> y los{' '}
            <Link to={'/docs/terminos-condiciones/usuario'}>T??rminos y Condiciones</Link>
            &nbsp;de LO QUE QUIERO HACER S.A.S. Aceptas ser contactado por nosotros en relaci??n a los eventos que
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
          <p>Quiero recibir informaci??n sobre promociones, actualizaciones y eventos que me puedan interesar.</p>
        </div>
        <div className={styles.btnRegister}>
          {isLoading ? <AiOutlineLoading3Quarters className={styles.isLoading} /> : <button>Registrate</button>}
        </div>
      </form>
      <div className={styles.divisorWithoutO} />

      <div className={styles.containerOptionLogin}>
        <p>??Ya tienes cuenta?</p>
        <button onClick={toggleScreenLogin}>Entrar</button>
      </div>

      {succesData && (
        <div className={styles.overlay}>
          <div className={styles.boxContent}>
            <MdOutlineClose onClick={() => setSuccesData(false)} className={styles.iconOverlay} />
            <div className={styles.containerInfoOverlay}>
              <h2>Ya casi eres parte de 'LO QUE QUIERO HACER'</h2>
              <p>
                Para finalizar tu proceso de registro haz click en Continuar y te enviemos un c??digo de validaci??n a tu
                correo electr??nico. Recuerda ver el buz??n de no deseados y agregarnos a tu lista de contactos.
              </p>
              <button onClick={() => navigateVerificate()} className={styles.btnOverlay}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
