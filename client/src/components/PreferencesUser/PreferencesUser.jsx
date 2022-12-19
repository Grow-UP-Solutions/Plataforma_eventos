import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import eventsApi from '../../axios/eventsApi';
import { AuthContext } from '../../context/auth/AuthContext';

import styles from './PreferencesUser.module.css';

const opcionesEliminar = [
  'Tengo otra cuenta de Lo que quiero hacer',
  'Mala experiencia con eventos/organizador',
  'No encuentro lo que necesito en Lo que quiero hacer',
  'La plataforma es difícil de entender',
  'Otro',
];

const PreferencesUser = ({ userData }) => {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const [userConfigs, setUserConfigs] = useState({
    canReceivedInformation: userData.canReceivedInformation,
    canNotificationMyEvents: userData.canNotificationMyEvents,
    reasonForElimination: '',
  });

  const [modalVerifyPassword, setModalVerifyPassword] = useState(false);
  const [modalConfirmDeleteAccount, setModalConfirmDeleteAccount] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [modalDeleteAccount, setModalDeleteAccount] = useState(false);
  const [password, setPassword] = useState('');

  const [otherReason, setOtherReason] = useState('');

  const handleOnChangeOtherReason = (e) => {
    setOtherReason(e.target.value);
  };

  const handleCheckPromotionEvents = async (e) => {
    const isChecked = e.target.checked;

    setUserConfigs({
      ...userConfigs,
      canReceivedInformation: !userConfigs.canReceivedInformation,
    });

    try {
      await eventsApi.put(`/users/updateCanReceiveInformation/${userData._id}`, {
        canReceivedInformation: isChecked,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckNotificaionMyEvents = async (e) => {
    const isChecked = e.target.checked;

    setUserConfigs({
      ...userConfigs,
      canNotificationMyEvents: !userConfigs.canNotificationMyEvents,
    });

    try {
      await eventsApi.put(`/users/updateCanNotificationMyEvents/${userData._id}`, {
        canNotificationMyEvents: isChecked,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;

    setUserConfigs({
      ...userConfigs,
      reasonForElimination: value,
    });
  };

  const openModalVerifyPassword = async () => {
    setModalVerifyPassword(!modalVerifyPassword);
  };

  const verifyPassword = async () => {
    try {
      const { data } = await eventsApi.post(`/users/isSamePassword/${userData._id}`, { password });
      if (data.success) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const openModalDeleteAccount = async () => {
    const isCorrectPassword = await verifyPassword();
    if (!isCorrectPassword) return setErrorMessagePassword('Contraseña incorrecta.');
    return setModalConfirmDeleteAccount(true);
  };

  const deleteAccount = async () => {
    let reasonForDeleteAccount = otherReason;

    if (userConfigs.reasonForElimination !== 'Otro') {
      reasonForDeleteAccount = userConfigs.reasonForElimination;
    }

    try {
      await eventsApi.delete(`/users/delete/${userData._id}`, {
        reasonForDeleteAccount,
      });
      logout();
      setModalConfirmDeleteAccount(false);
      return setModalDeleteAccount(true);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerSub}>
        <div className={styles.containerSub1}>
          <p className={styles.title}>Opciones de notificación</p>
          <p className={styles.texto}>Promociones o eventos que pueden ser de mi interés</p>
          <div className={styles.cont_txt_btn}>
            <p className={styles.texto}>
              Recordatorio de fechas de eventos en{' '}
              <Link to='/usuario/mi-lista' className={styles.btn}>
                Mi lista.
              </Link>{' '}
            </p>
          </div>
        </div>

        <div className={styles.containerCheckBox}>
          <p className={styles.titleOpcion}>Correo</p>
          <div className={styles.cont_check}>
            <input
              onChange={handleCheckPromotionEvents}
              checked={userConfigs.canReceivedInformation}
              type='checkbox'
              className={styles.check}
            />
          </div>
          <div className={styles.cont_check}>
            <input
              onChange={handleCheckNotificaionMyEvents}
              checked={userConfigs.canNotificationMyEvents}
              type='checkbox'
              className={styles.check}
            />
          </div>
        </div>
      </div>

      <div className={`${styles.containerSub} ${styles.containerDeleteAccount} `}>
        <div className={styles.containerSub2}>
          <p className={styles.title}>Eliminar Cuenta</p>
          <p className={styles.texto}>Quiero eliminar mi cuenta</p>
          <div>
            <select onChange={handleSelectChange} className={styles.select} defaultValue='default'>
              <option value='default' disabled>
                Escoge una opcion
              </option>
              {opcionesEliminar &&
                opcionesEliminar.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className={styles.contbutton}>
          {userConfigs.reasonForElimination !== '' && (
            <button onClick={openModalVerifyPassword} className={styles.button}>
              Eliminar Cuenta
            </button>
          )}
        </div>

        {modalVerifyPassword && (
          <>
            <div className={styles.containerVerifyPassword}>
              <div className={styles.inputPasswordContainer}>
                <p>Ingresa su contraseña actual:</p>
                <input
                  id='field1'
                  autoComplete='new-password'
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                />
                {errorMessagePassword && <p className={styles.errorMessagePassword}>{errorMessagePassword}</p>}
              </div>
              <div className={styles.containerBtns}>
                <button onClick={openModalDeleteAccount} className={styles.btnSuccess}>
                  Eliminar
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {userConfigs.reasonForElimination === 'Otro' && (
        <div className={styles.containerSub3}>
          <p className={styles.titleOptionSelect}>¿Cuál?: *Opcional</p>
          <textarea
            onChange={handleOnChangeOtherReason}
            name='other-option'
            id='other-option'
            className={styles.textarea}
          />
        </div>
      )}

      {modalConfirmDeleteAccount && (
        <div className={styles.overlayModalDeleteAccount}>
          <div className={styles.containerModalDeleteAccount}>
            <h3>¿Estás seguro?</h3>
            <p>
              Si procedes, toda tu información será borrada con excepción de la requerida para efecto de cumplimiento de
              normativa tributarios en caso de que aplique. Cualquier saldo a tu favor generado por tu código de
              Referidos también será eliminado. Ver sección &&&&& en{' '}
              <Link to={'/docs/terminos-condiciones/usuario'} target='_blank' rel='noopener noreferrer'>
                Términos y Condiciones
              </Link>
              .
            </p>
            <div className={styles.containerBtnsDeleteAccount}>
              <button onClick={() => navigate('/')} className={styles.btnSuccess}>
                Pensándolo bien me quedo
              </button>
              <button onClick={deleteAccount} className={styles.btnCancel}>
                Proceder
              </button>
            </div>
          </div>
        </div>
      )}

      {modalDeleteAccount && (
        <div className={styles.overlayModalDeleteAccount}>
          <div className={styles.containerModalDeleteAccount}>
            <h3>Tu cuenta ha sido eliminada</h3>
            <p>
              Tus datos, cuentas de inicio y listas de eventos guardadas fueron eliminadas, esperamos que vuelvas pronto
              a <strong>!Lo que quiero hacer¡</strong>
            </p>
            <div className={styles.containerBtnsDeleteAccount}>
              <button
                onClick={() => {
                  navigate('/');
                }}
                className={styles.btnSuccess}
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesUser;
