import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { stateContext } from '../../context/state/stateContext';
import styles from './MercadoPago.module.css';
// import { Box, Typography, Stack, Grid, Button, Container } from '@mui/material'
// import { BsFillCheckCircleFill } from 'react-icons/bs'
import { animateScroll as scroll } from 'react-scroll';
const MercadoPago = () => {
  const [successInfo, setSucessInfo] = useState(null);
  const url = window.location.href.split('?')[1];
  const { notes, setNotes } = useContext(stateContext);

  useEffect(() => {
    if (!successInfo) {
      eventsApi.get(`/mercadoPago/success?${url}`).then((res) => {
        setSucessInfo(res.data);
        notifications(res.data.oganizadorId, res.data.motivo, res.data.totalCupos, res.data.nameBuyer);
      });
    }
  }, [successInfo]);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const notifications = async (idOrganizer, titleEvent, totalCupos, buyerName) => {
    const create = {
      type: 'successBuyEvent',
      idUser: idOrganizer,
      title: titleEvent,
      userName: buyerName,
      totalCupos,
    };
    const json = await eventsApi.post('/users/notifications', create);
    setNotes([...notes, json.data]);
  };

  if (successInfo !== null) {
    return (
      <div className={`${styles.pagePayment} container`}>
        {/* <div className={styles.containerLogoPayment}>
          <span>Pago PSE </span>
          <img src={iconAchPse} alt="icon-pse" />
        </div> */}
        <div className={styles.containerListOptions}>
          {/* <div className={`${styles.containerOption} ${styles.optionReject} `}>
            <AiOutlineCloseCircle className={styles.optionIcon} />
            <p>Transacción Rechazada</p>
          </div> */}
          <div className={`${styles.containerOption}  ${styles.optionAprobed}`}>
            <AiOutlineCheckCircle className={styles.optionIcon} />
            <p>Transacción Aprobada</p>
          </div>
          {/* <div className={`${styles.containerOption} ${styles.optionPending}`}>
            <BiTime className={styles.optionIcon} />
            <p>Transacción pendiente</p>
          </div> */}
        </div>
        <div className={styles.containerPaymentDetails}>
          <ul>
            <li>
              <p>
                <span>Código de la transacción:</span>
                {successInfo.codigoDeLaTransaccion}
              </p>
            </li>
            <li>
              <p>
                <span>Destino de pago:</span>
                {successInfo.DestinoDePago}
              </p>
            </li>
            <li>
              <p>
                <span>Motivo:</span>
                Evento {successInfo.motivo}
              </p>
            </li>
            <li>
              <p>
                <span>Fecha de pago:</span>
                {successInfo.fechaDePago.slice(0, 10)}
              </p>
            </li>
            <li>
              <p>
                <span>Valor de transacción:</span>
                {new Intl.NumberFormat('de-DE').format(parseInt(successInfo.valorDeLaTransaccion))}$
              </p>
            </li>
            <li>
              <p>
                <span>Costo de la transacción:</span>
                {new Intl.NumberFormat('de-DE').format(parseInt(successInfo.costoDeLaTransaccion))}$
              </p>
            </li>
            <li>
              <p>
                <span>Referencia:</span>
                C.C:{successInfo.referencia}
              </p>
            </li>
          </ul>
        </div>
        <div className={styles.containerBtn}>
          <Link to={'/'}>
            <button className={styles.btnSend}>Volver</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default MercadoPago;

//http://localhost:8080/feedback?collection_id=1290273508&collection_status=approved&payment_id=1290273508&status=approved&external_reference=a59b17&payment_type=credit_card&merchant_order_id=5143913058&preference_id=1152954796-49f441b2-e9d1-494f-8bdc-571a606e2a63&site_id=MCO&processing_mode=aggregator&merchant_account_id=null
