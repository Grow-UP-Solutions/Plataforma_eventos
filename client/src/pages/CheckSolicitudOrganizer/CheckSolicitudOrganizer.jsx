import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import styles from './CheckSolicitudOrganizer.module.css';

const CheckSolicitudOrganizer = () => {
  const { token } = useParams();
  const [userData, setUserData] = useState({});
  const [modalResultMessage, setModalResultMessage] = useState('');
  const navigate = useNavigate();
  localStorage.setItem('token-organizer', token);

  useEffect(() => {
    checkValidateTokenToOrganizer();
  }, []);

  const checkValidateTokenToOrganizer = async () => {
    try {
      const result = await eventsApi.get('/users/checkValidateTokenOrganizer');
      console.log({ result });
      setUserData(result.data);
    } catch (error) {
      navigate('/');
    }
  };

  const acceptOrReject = async (option) => {
    try {
      const { data } = await eventsApi.post('/users/acceptOrRejectedOrganizer', { option, id: userData.id });
      const message = data.message;
      const referenciaZ = userData.referenciaU.replace('U', 'Z');
      if (message === 'Aceptado') {
        setModalResultMessage(`Usted ha aceptado al usuario ${userData.name}, ahora es organizador.`);

        setUserData({
          ...userData,
          referenciaZ,
        });
      } else if (message === 'Rechazado') {
        setModalResultMessage(`Usted ha rechazado la solicitud de organizador a ${userData.name}.`);
        setUserData({
          ...userData,
          referenciaZ: '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${styles.page} container`}>
      <div>
        <h1 className={styles.titlePage}>Solicitud para ser Organizador</h1>

        <table className={styles.table}>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Cedula</th>
            <th>Telefono</th>
            <th>Celular</th>
            <th>Referencia U</th>
            <th>Referencia Z</th>
          </tr>
          <tr>
            <td>{userData.name}</td>
            <td>{userData.email}</td>
            <td>{userData.document}</td>
            <td>{userData.tel}</td>
            <td>{userData.phone}</td>
            <td>{userData.referenciaU}</td>
            <td>{userData.referenciaZ}</td>
          </tr>
        </table>

        {modalResultMessage && (
          <>
            <p className={styles.messageResult}>{modalResultMessage}</p>
          </>
        )}

        <div className={styles.containerButton}>
          <button onClick={() => acceptOrReject('accept')} className={styles.btnSuccess}>
            Aceptar
          </button>
          <button onClick={() => acceptOrReject('reject')} className={styles.btnCancel}>
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckSolicitudOrganizer;
