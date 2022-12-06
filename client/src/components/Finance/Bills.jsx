import React, { useEffect, useState } from 'react';
import style from './Bills.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import {fechaActual} from '../../utils/fechaActual'


const Bills = () => {

  const [state, fetchUsers] = useFetch();
  const [currentPage, setCurretPage] = useState(1);
  const navigate = useNavigate();
  const billsPerPage = 5;
  const indexOfLastBills = currentPage * billsPerPage;
  const indexOfFirstBills = indexOfLastBills - billsPerPage; 
  const id = useParams().id;
  console.log('id:',id)
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserData();
  }, [id]);

  const getUserData = async () => {
    if (id) {
      const userResult = await eventsApi.get(`/users/${id}`)
      setUserData(userResult.data)
    }}

  console.log('data:',userData)
  
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
                <th>Fecha del evento</th>
                <th>Fecha de facturacion</th>
                <th>Número de factura</th>
                <th>Tu ganancia</th>
              </tr>
            </thead>

            <tbody>
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

          <div className={style.container_pagination}>
            <Pagination 
              billsPerPage={billsPerPage}
              state={state.data.data.length}
              paginado={paginado}
            />
          </div>

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

export default Bills;
