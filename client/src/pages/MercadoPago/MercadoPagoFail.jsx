import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import styles from './MercadoPagoFail.module.css';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { iconAchPse } from '../../assets/imgs';
import { Link } from 'react-router-dom';
import { formatDateForm } from '../../utils/formatDateForm';
import { stateContext } from '../../context/state/stateContext';
// import { Box, Typography, Stack, Grid, Button, Container } from '@mui/material'
// import { BsFillCheckCircleFill } from 'react-icons/bs'


const MercadoPagoFail = () => {
  const [successInfo, setSucessInfo] = useState(null)
  const url = window.location.href.split('?')[1]
  const { code , setCode } = useContext(stateContext);
  console.log('url:',url)
  console.log('MercadoPago')
  console.log('code',code)

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

  if(successInfo !== null){
    return (
   
      <div className={`${styles.pagePayment} container`}>
        {/* <div className={styles.containerLogoPayment}>
          <span>Pago PSE </span>
          <img src={iconAchPse} alt="icon-pse" />
        </div> */}
        <div className={styles.containerListOptions}>
          <div className={`${styles.containerOption} ${styles.optionReject} `}>
            <AiOutlineCloseCircle className={styles.optionIcon} />
            <p>Transacción Rechazada</p>
          </div>
          {/* <div className={`${styles.containerOption}  ${styles.optionAprobed}`}>
            <AiOutlineCheckCircle className={styles.optionIcon} />
            <p>Transacción Aprobada</p>
          </div> */}
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
                Evento "Hiking with my dog"
              </p>
            </li>
            <li>
              <p>
                <span>Fecha de pago:</span>
               {successInfo.fechaDePago.slice(0,10)}
              </p>
            </li>
            <li>
              <p>
                <span>Valor de transacción:</span>
               {successInfo.valorDeLaTransaccion}$
              </p>
            </li>
            <li>
              <p>
                <span>Costo de la transacción:</span>
               {successInfo.costoDeLaTransaccion}$
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
     
    )}else{
      return(
        <div>
        Loading
        </div>
      )
    }

  }


export default MercadoPagoFail