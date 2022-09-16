import React from 'react';

import styles from './Payment.module.css';

import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';

import { iconAchPse } from '../../assets/imgs';

const Payment = () => {
  return (
    <div className={`${styles.pagePayment} container`}>
      <div className={styles.containerLogoPayment}>
        <span>Pago PSE </span>
        <img src={iconAchPse} alt="icon-pse" />
      </div>
      <div className={styles.containerListOptions}>
        <div className={`${styles.containerOption} ${styles.optionReject} `}>
          <AiOutlineCloseCircle className={styles.optionIcon} />
          <p>Transacción Rechazada</p>
        </div>
        <div className={`${styles.containerOption}  ${styles.optionAprobed}`}>
          <AiOutlineCheckCircle className={styles.optionIcon} />
          <p>Transacción Aprobada</p>
        </div>
        <div className={`${styles.containerOption} ${styles.optionPending}`}>
          <BiTime className={styles.optionIcon} />
          <p>Transacción pendiente</p>
        </div>
      </div>
      <div className={styles.containerPaymentDetails}>
        <ul>
          <li>
            <p>
              <span>Código de la transacción:</span>
              8936372823
            </p>
          </li>
          <li>
            <p>
              <span>Destino de pago:</span>
              Lo que quiero hacer S.A.S
            </p>
          </li>
          <li>
            <p>
              <span>Motivo:</span>
              Evento "Hiking with my dog"
            </p>
          </li>
          <li>
            <p>
              <span>Fecha de pago:</span>
              Mayo 20 2019
            </p>
          </li>
          <li>
            <p>
              <span>Valor de transacción:</span>
              34.000$
            </p>
          </li>
          <li>
            <p>
              <span>Costo de la transacción:</span>
              34.000$
            </p>
          </li>
          <li>
            <p>
              <span>Referencia:</span>
              C.C:1017127341
            </p>
          </li>
        </ul>
      </div>
      <div className={styles.containerBtn}>
        <button className={styles.btnSend}>Volver</button>
      </div>
    </div>
  );
};

export default Payment;
