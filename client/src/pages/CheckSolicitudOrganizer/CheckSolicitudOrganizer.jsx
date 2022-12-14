import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import styles from './CheckSolicitudOrganizer.module.css';
import { animateScroll as scroll } from 'react-scroll';
const CheckSolicitudOrganizer = () => {
  const { token } = useParams();
  const [userData, setUserData] = useState({});
  const [modalResultMessage, setModalResultMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  localStorage.setItem('token-organizer', token);

  useEffect(() => {
    checkValidateTokenToOrganizer();
  }, []);

  const checkValidateTokenToOrganizer = async () => {
    try {
      const result = await eventsApi.get('/users/checkValidateTokenOrganizer');
      setUserData(result.data);
    } catch (error) {
      navigate('/');
    }
  };

  const acceptOrReject = async (option) => {
    try {
      setIsLoading(true);
      const { data } = await eventsApi.post('/users/acceptOrRejectedOrganizer', { option, id: userData.id });
      const message = data.message;
      if (message === 'Aceptado') {
        setModalResultMessage(`Usted ha aceptado al usuario ${userData.name}, ahora es organizador.`);
      } else if (message === 'Rechazado') {
        setModalResultMessage(`Usted ha rechazado la solicitud de organizador a ${userData.name}.`);
      }
      setUserData(data.user);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div className={`${styles.page} container`}>
      <h1 className={styles.titlePage}>Solicitud para ser Organizador</h1>

      <div className={styles.listData}>
        <div>
          <ul className={styles.itemsUser}>
            <li>
              <span>Nombre: </span>
              {userData.name}
            </li>
            <li>
              <span>Correo: </span>
              {userData.email}
            </li>
            <li>
              <span>C??dula: </span>
              {userData.document}
            </li>
            <li>
              <span>T??lefono: </span>
              {userData.tel}
            </li>
            <li>
              <span>Celular: </span>
              {userData.phone}
            </li>
            <li>
              <span>Ux: </span>
              {userData.idUser}
            </li>
            <li>
              <span>Zx: </span>
              {userData.idOrganizer}
            </li>
            <li>
              <span>RUT: {userData.rut ? 'Si' : 'No'}</span>
            </li>
          </ul>
        </div>

        <div className={styles.containerImgUserDesc}>
          <img className={styles.imgUser} src={userData.image} alt='user-picture' />
          <p>{userData.description}</p>
        </div>
      </div>

      <div className={styles.containerImageDocuments}>
        <img src={userData.documentFront} alt='dni' />
        <img src={userData.backDocument} alt='dni' />
        {userData.rut && <img src={userData.imageRut} alt='dni' />}
      </div>

      {modalResultMessage && (
        <>
          <p className={styles.messageResult}>{modalResultMessage}</p>
        </>
      )}

      <div className={styles.containerButton}>
        {isLoading ? (
          <AiOutlineLoading3Quarters className={styles.iconLoading} />
        ) : (
          <>
            <button onClick={() => acceptOrReject('accept')} className={styles.btnSuccess}>
              Aceptar
            </button>
            <button onClick={() => acceptOrReject('reject')} className={styles.btnCancel}>
              Rechazar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckSolicitudOrganizer;
