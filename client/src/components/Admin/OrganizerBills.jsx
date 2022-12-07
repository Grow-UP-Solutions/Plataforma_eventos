import React, { useEffect, useState } from 'react';
import style from './OrganizerBills.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { fechaActual } from '../../utils/fechaActual';
import { Link } from 'react-router-dom';

const OrganizerBills = () => {
  const [state, fetchUsers] = useFetch();
  const navigate = useNavigate();
  const id = useParams().id;
  const [userData, setUserData] = useState({});
  const [billNumber, setBillNumber] = useState();

  useEffect(() => {
    getUserData();
  }, [id]);

  const getUserData = async () => {
    if (id) {
      const userResult = await eventsApi.get(`/users/${id}`);
      setUserData(userResult.data);
    }
  };

  console.log('userData:', userData);

  const [currentPage, setCurretPage] = useState(1);
  const billsPerPage = 6;
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  //const currentBill = userData.factura.slice(indexOfFirstBill, indexOfLastBill);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  useEffect(
    function() {
      fetchUsers({
        url: 'https://reqres.in/api/users',
        method: 'GET',
      });
    },
    [fetchUsers]
  );

  function handleChange(e) {
    e.preventDefault();
    setBillNumber(e.target.value);
  }

  const pagar = async (e, eventId, dateId, pendingEarnigs) => {
    e.preventDefault();

    const payload = {
      datePay: fechaActual,
      billNumber: billNumber,
      idEvent: eventId,
      idDate: dateId,
      idOrg: id,
      ganancia: pendingEarnigs,
    };

    console.log('payload', payload);

    try {
      const { data } = await eventsApi.put('/mercadoPago/adminPaymentOrganizer', payload);
      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  };

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
                        <td>{date.isPay === false ? 'PENDIENTE' : 'PAGADO'}</td>
                        <td>
                          <input
                            type='text'
                            placeholder='Numero de factura'
                            name='billNumber'
                            value={billNumber}
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </td>
                        <td>{date.overallEarnings}</td>
                        <td>
                          <button onClick={(e) => pagar(e, event._id, date._id, date.overallEarnings)}>Pagar</button>
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
            <p className={style.exit} onClick={() => navigate('/user/profile')}>
              Salir
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default OrganizerBills;
