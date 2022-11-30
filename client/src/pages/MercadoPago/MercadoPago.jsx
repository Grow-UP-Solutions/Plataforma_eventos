import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './MercadoPago.module.css';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { iconAchPse } from '../../assets/imgs';
import { Link } from 'react-router-dom';
// import { Box, Typography, Stack, Grid, Button, Container } from '@mui/material'
// import { BsFillCheckCircleFill } from 'react-icons/bs'


const MercadoPago = () => {
  const [successInfo, setSucessInfo] = useState(null)
  const url = window.location.href.split('?')[1]
  console.log('url:',url)
  console.log('MercadoPago')

  useEffect(() => {
    console.log('MercadoPago useEffect')
   
  }, [])


  useEffect(() => {
    console.log('MercadoPago useEffect')
    axios
      .get(`https://plataformaeventos-production-e0ed.up.railway.app/mercadoPago/success?${url}`)
      .then((res) => {
      setSucessInfo(res.data) 
      console.log('res,',res)
      }
      )
      
  }, [])

  console.log('successInfo:',successInfo)

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
        <Link to={'/'}>
          <button className={styles.btnSend}>Volver</button>
        </Link>
      </div>
    </div>
  );


}

export default MercadoPago

//http://localhost:8080/feedback?collection_id=1290273508&collection_status=approved&payment_id=1290273508&status=approved&external_reference=a59b17&payment_type=credit_card&merchant_order_id=5143913058&preference_id=1152954796-49f441b2-e9d1-494f-8bdc-571a606e2a63&site_id=MCO&processing_mode=aggregator&merchant_account_id=null
