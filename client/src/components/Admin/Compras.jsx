import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { fechaActual } from '../../utils/fechaActual';
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import style from './Compras.module.css';
import { animateScroll as scroll } from 'react-scroll';
import ExportExcel from 'react-export-excel';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const Compras = () => {

  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [sells, setSells] = useState(true);
  const ExcelFile = ExportExcel.ExcelFile;
  const ExcelSheet = ExportExcel.ExcelSheet;
  const ExcelColumn = ExportExcel.ExcelColumn;

  useEffect(() => {
    getsells();
  }, []);

  const getsells = async () => {
    const sellResult = await eventsApi.get(`/order`);
    setSells(sellResult.data);
    setLoad(false);

    console.log(new Intl.NumberFormat('de-DE').format(parseInt(sellResult.data[0].adminEarns)));

    const ordenesTotal = [];
  };

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const [currentPage, setCurretPage] = useState(1);
  const ordersPerPage = 25;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirsOrder = indexOfLastOrder - ordersPerPage;
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  if (load) {
    return <Loading />;
  } else {
    return (
      <div className={style.container}>
        <div className={style.container_titles}>
          <h1>Lista de compras</h1>
          <h5>{fechaActual}</h5>
        </div>

        <div>
          <DescriptionOutlinedIcon sx={{ fontSize: '3rem', color: '#d53e27' }} />
          <ExcelFile
            element={<button>Descargar Lista</button>}
            filename='Excel Listado Compras'
          >
            <ExcelSheet data={sells} name='Compras' >
              <ExcelColumn label='Nombre evento' value='eventName' />
              <ExcelColumn label='Nombre comprador' value='buyerName' />
              <ExcelColumn label='Apellido comprador' value='buyerLastName' />
              <ExcelColumn label='Nombre organizador' value='organizerName' />
              <ExcelColumn label='Apellido organizador' value='organizerLastName' />
              <ExcelColumn label='Valor recaudado por LQQH' value='adminEarns' />
              <ExcelColumn label='Neto para el organizador' value='comision' /> 
            </ExcelSheet>

          </ExcelFile>
        </div>

        <div className={style.container_table}>
          <table className={style.table}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th>Codigo del Organizador</th>
                <th>Nombre del Organizador</th>

                <th>El Organizador es declarante?</th>
                <th>Codigo del Evento</th>
                <th>Nombre del Evento</th>
                <th>Fecha del Evento</th>
                <th>Hora del Evento</th>
                <th>Cupos Comprados</th>
                <th>Codigo de Descuento</th>
                <th>Nº Compra</th>
                <th>Fecha de Compra</th>
                <th>Hora de Compra</th>
                <th>Codigo del Comprador</th>
                <th>Nombre del Comprador</th>
                <th>Apellido del Comprador</th>
                <th>Cedula de ciudadania del Comprador</th>
                <th>Ciudad de domicilio del Comprador</th>
                <th>Direccion del Comprador</th>
                <th>Telefono del Comprador</th>
                <th>Valor Recadudado por LQQH</th>
                <th>Total neto para el Organizador</th>
              </tr>
            </thead>

            <tbody>
              {sells !== undefined &&
                sells.slice(indexOfFirsOrder, indexOfLastOrder).map((sell) => (
                  <tr key={sell._id} className={style.tbody}>
                    <td>{sell.idOrganizer}</td>
                    <td>
                      {sell.organizerName} {sell.organizerLastName}
                    </td>
                    <td>{sell.organizerisDeclarant ? 'Si' : 'No'}</td>
                    <td>{sell.idEvent}</td>
                    <td>{sell.eventName}</td>
                    <td>
                      {sell.eventDate.map((date) => (
                        <tr>
                          <td>{date.date}</td>
                        </tr>
                      ))}
                    </td>
                    <td>
                      {sell.eventDate.map((date) => (
                        <tr>
                          <td>
                            {date.start}-{date.end}
                          </td>
                        </tr>
                      ))}
                    </td>
                    <td>
                      {sell.eventDate.map((date) => (
                        <tr>
                          <td>{date.cantidad}</td>
                        </tr>
                      ))}
                    </td>
                    <td>
                      {sell.eventDate.map((date) => (
                        <tr>
                          <td>{date.codigo !== null ? date.codigo : '-'}</td>
                        </tr>
                      ))}
                    </td>
                    <td>{sell.idCompra}</td>
                    <td>{sell.dateBuy}</td>
                    <td>{sell.timeBuy}</td>
                    <td>{sell.idBuyer}</td>
                    <td>{sell.buyerName}</td>
                    <td>{sell.buyerLastName}</td>
                    <td>{sell.buyerDni}</td>
                    <td>{sell.buyerCity}</td>
                    <td>{sell.buyerAddress}</td>
                    <td>{sell.buyerPhone}</td>
                    <td>${new Intl.NumberFormat('de-DE').format(parseInt(sell.adminEarns))}</td>
                    <td>${new Intl.NumberFormat('de-DE').format(parseInt(sell.organizerEarns))}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {sells !== undefined && (
          <div className={style.container_pagination}>
            <Pagination ordersPerPage={ordersPerPage} state={sells.length} paginado={paginado} page={currentPage}/>
          </div>
        )}

        <div className={style.container_exit}>
          <p className={style.exit} onClick={() => navigate('/admin')}>
            Salir
          </p>
        </div>
      </div>
    );
  }
};

export default Compras;
