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

  /*  useEffect(() => {
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
 */
  const acceptOrReject = async (option) => {
    try {
      const { data } = await eventsApi.post('/users/acceptOrRejectedOrganizer', { option, id: userData.id });
      const message = data.message;
      const referenciaZ = userData.referenciaU.replace('U', 'Z');
      console.log({ referenciaZ });
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
      <h1 className={styles.titlePage}>Solicitud para ser Organizador</h1>
      {/*      <td>{userData.name}</td>
            <td>{userData.email}</td>
            <td>{userData.document}</td>
            <td>{userData.tel}</td>
            <td>{userData.phone}</td>
            <td>{userData.referenciaU}</td>
            <td>{userData.referenciaZ}</td> */}

      <div className={styles.listData}>
        <ul className={styles.itemsUser}>
          <li>
            <span>Nombre: </span>Jean Pierre Huaman Gomez{' '}
          </li>
          <li>
            <span>Correo: </span>jeanpier.dev@outlook.com{' '}
          </li>
          <li>
            <span>Cédula: </span>72710575
          </li>
          <li>
            <span>Télefono: </span>935797308
          </li>
          <li>
            <span>Celular: </span>935797308{' '}
          </li>
          <li>
            <span>Referencia U: </span> 123
          </li>
          <li>
            <span>Referencia Z: </span> 123{' '}
          </li>
        </ul>

        <div className={styles.containerImgUserDesc}>
          <img
            className={styles.imgUser}
            src={'https://estaticos.sport.es/resources/jpg/0/7/leo-messi-ficha-bio-utilizar-1375639723270.jpg'}
            alt='user-picture'
          />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia reprehenderit nulla iusto facilis
            similique. Magnam voluptas laboriosam ratione rem, sed reiciendis repudiandae tempore impedit assumenda
            deserunt quas repellendus. Ipsam, explicabo.
          </p>
        </div>
      </div>

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
  );
};

export default CheckSolicitudOrganizer;
