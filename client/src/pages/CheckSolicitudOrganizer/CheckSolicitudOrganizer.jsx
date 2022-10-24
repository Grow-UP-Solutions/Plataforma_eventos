import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import styles from './CheckSolicitudOrganizer.module.css';

const CheckSolicitudOrganizer = () => {
  const { token } = useParams();
  const [userData, setUserData] = useState({});
  localStorage.setItem('token-organizer', token);

  useEffect(() => {
    checkValidateTokenToOrganizer();
  }, []);

  const checkValidateTokenToOrganizer = async () => {
    const result = await eventsApi.get('/users/setOrganizer');
    console.log({ result });
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
            <td>Jean Pierre</td>
            <td>jeanpipoxi@gmail.com</td>
            <td>72710575</td>
            <td>123128937</td>
            <td>935797308</td>
            <td>UX123</td>
          </tr>
        </table>

        <div className={styles.containerButton}>
          <button className={styles.btnSuccess}>Aceptar</button>
          <button className={styles.btnCancel}>Rechazar</button>
        </div>
      </div>
    </div>
  );
};

export default CheckSolicitudOrganizer;
