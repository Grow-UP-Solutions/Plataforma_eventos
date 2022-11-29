import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { Box, Typography, Stack, Grid, Button, Container } from '@mui/material'
// import { BsFillCheckCircleFill } from 'react-icons/bs'


import { Link } from 'react-router-dom'

const MercadoPago = () => {
  const [successInfo, setSucessInfo] = useState(null)
  const url = window.location.href.split('?')[1]
  console.log('url:',url)

  useEffect(() => {
    axios
      .get(`https://plataformaeventos-production-e0ed.up.railway.app/mercadoPago/success?${url}`)
      .then((res) => setSucessInfo(res.data))
  }, [])

  console.log('successInfo:',successInfo)

  return(
    <div>MERCAGO PAGO</div>
  )


}

export default MercadoPago

//http://localhost:8080/feedback?collection_id=1290273508&collection_status=approved&payment_id=1290273508&status=approved&external_reference=a59b17&payment_type=credit_card&merchant_order_id=5143913058&preference_id=1152954796-49f441b2-e9d1-494f-8bdc-571a606e2a63&site_id=MCO&processing_mode=aggregator&merchant_account_id=null
