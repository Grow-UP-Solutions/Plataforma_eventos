import React, { useEffect, useState } from 'react';
import style from './OrganizerBills.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import {fechaActual} from '../../utils/fechaActual'
import { Link } from 'react-router-dom';



const OrganizerBills = () => {

  const [state, fetchUsers] = useFetch();
  const navigate = useNavigate();
  const id = useParams().id;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData();
  }, [id]);

  const getUserData = async () => {
    if (id) {
      const userResult = await eventsApi.get(`/users/${id}`)
      setUserData(userResult.data)
    }}

    console.log('userData:',userData)


    
    const [currentPage, setCurretPage] = useState(1);
    const billsPerPage = 6;
    const indexOfLastBill = currentPage * billsPerPage;
    const indexOfFirstBill = indexOfLastBill - billsPerPage;
    //const currentBill = userData.factura.slice(indexOfFirstBill, indexOfLastBill);
    const paginado = (pageNumber) => setCurretPage(pageNumber);
  
  
  

  useEffect(
    function () {
      fetchUsers({
        url: "https://reqres.in/api/users",
        method: "GET"
      });
    },
    [fetchUsers]
  );

  const pagar = async(e,idOrg ,idFactura ,ganancia,numeroDeFactura)=>{
    e.preventDefault()
    console.log('pagar')
    console.log(id)
    console.log(ganancia)
    console.log(numeroDeFactura)

    const payload={
        idOrg:idOrg,
        idFactura: idFactura,
        ganancia: ganancia,
        numeroDeFactura: numeroDeFactura
    }

    console.log('payload',payload)

    //const json = await eventsApi.post('/mercadoPago/orden', payload);
  }



  if (state.isLoading) {
    return <div>Cargando usuarios...</div>;
  }

  if (state.isFailed) {
    return <div>Fallo recuperando los usuarios</div>;
  }

  if (state.isSuccess) {
    return (
      <div className={style.container}>

        <div className={style.container_titles}>
          <h1>Histórico de facturas</h1>
          <h3>{userData.name}</h3>
          <h5>{fechaActual}</h5>
        </div>

        <div className={style.container_table}>
          <div className={style.container_headbody}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th_first}>Nombre del evento</th>
                <th>Fecha de facturacion</th>
                <th>Número de factura</th>
                <th>A pagar</th>
              </tr>
            </thead>

            {/* <tbody>
              {
                
                state.data.data.slice(indexOfFirstBills, indexOfLastBills).map((e) => (
                  <tr key={e.id} className={style.tbody}>
                    <td className={style.tbody_name}>
                      <img src={userData.userpicture} alt={e.first_name} 
                        style={{maxWidth: '20%', borderRadius: '100px'}}
                      />
                      <p>Hiking with my dog</p> 
                    </td>
                    <td>{e.email}</td>
                    <td>xxxxxxx</td>
                    <td>xxxxxxx</td>
                    <td>$500.000</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                ))
              }
            </tbody> */}

             <tbody>
              {userData.factura !== undefined &&
                
                userData.factura.slice(indexOfFirstBill, indexOfLastBill).map((factura) => (
                  <tr key={factura._id} className={style.tbody}>
                    <td className={style.tbody_name}>
                      <img src={userData.userpicture} alt={userData.first_name} 
                        style={{maxWidth: '20%', borderRadius: '100px'}}
                      />
                      <p>{factura.evento}</p> 
                    </td>
                    <td>{factura.isPay===false? 'PENDIENTE': factura.fechaDeFacturacion }</td>
                    <td>{factura.isPay===false? 'PENDIENTE': factura.numeroDeFactura }</td>
                    <td>{factura.ganancia}</td>
                    {/* <td><input type="checkbox" /></td> */}
                    <td>
                        <button onClick={(e)=>pagar(e, userData._id, factura._id , factura.ganancia, factura.numeroDeFactura )}>Pagar</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>


          </div>

          <div className={style.container_download}>
            <div className={style.container_one}>
              <DescriptionOutlinedIcon fontSize="large" color='#d53e27'/>
              <p>Descargar factura de selecionados (PDF)</p>
            </div>

            <div className={style.container_two}>
              <DescriptionOutlinedIcon fontSize="large" />
              <p>Descargar reporte de páginas (EXCEL)</p>
            </div>
          </div>
          {userData.factura !== undefined &&
          <div className={style.container_pagination}>
            <Pagination 
              billsPerPage={billsPerPage}
              state={userData.factura.length}
              paginado={paginado}
            />
          </div>
          }

          <div className={style.container_exit}>
            <p className={style.exit} onClick={() => navigate('/user/profile')}>
              Salir
            </p>
          </div>
      
        </div>
        
      </div>
    );
  }
  return null;
}

export default OrganizerBills;
