import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import eventsApi from '../../axios/eventsApi';
import useFetch from '../../hooks/useFetch';
import { fechaActual } from '../../utils/fechaActual';
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import style from './Bills.module.css';
import ExportExcel from 'react-export-excel';

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

const Bills = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getUserData();
  }, [id]);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const getUserData = async () => {
    if (id) {
      const userResult = await eventsApi.get(`/users/${id}`);
      setUserData(userResult.data);
    }
    setLoad(false);
  };

  const [currentPage, setCurretPage] = useState(1);
  const billsPerPage = 25;
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  if (load) {
    return <Loading />;
  } else {
    return (
      <div className={style.container}>
        <div className={style.container_titles}>
          <h1>Histórico de facturas</h1>
          <h3>{userData.name}</h3>
          <h5>{fechaActual}</h5>
        </div>

        <div className={style.container_table}>
          <table className={style.container_headbody}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th_first}>Nombre del evento</th>
                <th className={style.thDate}>Fecha del evento</th>
                <th className={style.thStart}>Hora inicio del evento</th>
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
                          <img src={event.pictures[0].picture} alt={''} style={{ borderRadius: '10px' }} />
                          <p>{event.title}</p>
                        </td>
                        <td className={style.tdDate}>{date.date}</td>
                        <td className={style.tdStart}>{date.start}</td>
                        <td>{date.isPay === false ? 'PENDIENTE' : date.datePay}</td>
                        <td>{date.isPay === false ? 'PENDIENTE' : date.billNumber}</td>
                        <td>${new Intl.NumberFormat('de-DE').format(Math.round(date.overallEarnings))}</td>
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
          </table>

          <div className={style.container_download}>
            {/* <div className={style.container_one}>
              <DescriptionOutlinedIcon fontSize='large' color='#d53e27' />
              <p>Descargar factura de selecionados (PDF)</p>
            </div> */}

            <div className={style.container_two}>
              <DescriptionOutlinedIcon fontSize='large' />
              <ExcelFile element={<p>Descargar reporte de páginas (EXCEL)</p>} filename='Excel Reporte de Pagina'>
                <ExcelSheet data={data} name='Reporte'>
                  <ExcelColumn label='nombre' value='name' />
                </ExcelSheet>
              </ExcelFile>
            </div>
          </div>
          {userData.myEventsCreated !== undefined && (
            <div className={style.container_pagination}>
              <Pagination ordersPerPage={billsPerPage} state={userData.myEventsCreated.length} paginado={paginado} />
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
