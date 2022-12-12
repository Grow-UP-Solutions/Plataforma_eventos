import React, { useEffect, useState } from 'react';
import style from './Bills.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { fechaActual } from '../../utils/fechaActual';
import Loading from '../Loading/Loading';

const Bills = () => {
  const [state, fetchUsers] = useFetch();
  const navigate = useNavigate();
  const id = useParams().id;
  const [userData, setUserData] = useState({});
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getUserData();
  }, [id]);

  const getUserData = async () => {
    if (id) {
      const userResult = await eventsApi.get(`/users/${id}`);
      setUserData(userResult.data);
    }
    setLoad(false)
  };

  console.log('userData:', userData);

  const [currentPage, setCurretPage] = useState(1);
  const billsPerPage = 6;
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  

 if(load){
  return(
    <Loading />
  )
 }else{
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
            {userData.myEventsCreated !== undefined &&
              userData.myEventsCreated.slice(indexOfFirstBill, indexOfLastBill).map((event) =>
                event.dates.map((date) =>
                  date.sells > 0 ? (
                    <tr key={event._id} className={style.tbody}>
                      <td className={style.tbody_name}>
                        <img
                          src={event.pictures[0].picture}
                          alt={''}
                          style={{ maxWidth: '20%', borderRadius: '100px' }}
                        />
                        <p>{event.title}</p>
                      </td>
                      <td>{date.date}</td>
                      <td>{date.isPay === false ? 'PENDIENTE' : date.datePay}</td>
                      <td>{date.isPay === false ? 'PENDIENTE' : date.billNumber}</td>
                      <td>{date.overallEarnings}</td>
                      <td>
                        <input type='checkbox' />
                      </td>
                    </tr>
                  ) : (
                    ''
                  )
                )
              )}
          </tbody>
        </div>

        <div className={style.container_download}>
          <div className={style.container_one}>
            <DescriptionOutlinedIcon fontSize='large' color='#d53e27' />
            <p>Descargar factura de selecionados (PDF)</p>
          </div>

          <div className={style.container_two}>
            <DescriptionOutlinedIcon fontSize='large' />
            <p>Descargar reporte de páginas (EXCEL)</p>
          </div>
        </div>
        {userData.myEventsCreated !== undefined && (
          <div className={style.container_pagination}>
            <Pagination billsPerPage={billsPerPage} state={userData.myEventsCreated.length} paginado={paginado} />
          </div>
        )}

        <div className={style.container_exit}>
          <p className={style.exit} onClick={() => navigate('/usuario/finanzas')}>
            Salir
          </p>
        </div>
      </div>
    </div>
  );
 }
};

export default Bills;
