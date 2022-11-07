import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    canReceiveInformation: userData.canReceiveInformation,
    canNotificationMyEvents: userData.canNotificationMyEvents,
    reasonForElimination: '',
  });

  const [modalVerifyPassword, setModalVerifyPassword] = useState(false);
  const [modalConfirmDeleteAccount, setModalConfirmDeleteAccount] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [modalDeleteAccount, setModalDeleteAccount] = useState(false);
  const [password, setPassword] = useState('');

  const handleCheckPromotionEvents = async (e) => {
    const isChecked = e.target.checked;

    setUserConfigs({
      ...userConfigs,
      canReceiveInformation: !userConfigs.canReceiveInformation,
    });

    try {
      await eventsApi.put(`/users/updateCanReceiveInformation/${userData._id}`, {
        canReceiveInformation: isChecked,
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
    setModalVerifyPassword(true);
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
    try {
      await eventsApi.delete(`/users/delete/${userData._id}`);
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
            <p className={styles.texto}>Recordatorio de fechas de eventos en</p>
            <button className={styles.btn}>Mi lista</button>
          </div>
        </div>

        <div className={styles.containerSub1}>
          <p className={styles.titleOpcion}>Correo</p>
          <div className={styles.cont_check}>
            <input
              onChange={handleCheckPromotionEvents}
              checked={userConfigs.canReceiveInformation}
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

      <div className={styles.containerSub}>
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
          <button onClick={openModalVerifyPassword} className={styles.button}>
            Eliminar Cuenta
          </button>
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

      <div className={styles.containerSub3}>
        <p className={styles.titleOptionSelect}>¿Cuál?: *Opcional</p>
        <textarea name='other-option' id='other-option' cols='60' rows='10' className={styles.textarea}></textarea>
      </div>

      {modalConfirmDeleteAccount && (
        <div className={styles.overlayModalDeleteAccount}>
          <div className={styles.containerModalDeleteAccount}>
            <h3>¿Estás seguro?</h3>
            <p>
              Si procedes, toda tu información será borada con excepción de la requerida para efecto de cumplimiento de
              normativa tributarios en caso de que aplique. Cualquier saldo a tu favor generado por tu código de
              Referidos también será eliminado. Ver sección &&&&& en Términos y Condiciones.
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
