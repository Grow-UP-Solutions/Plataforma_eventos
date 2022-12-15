import React, { useEffect, useState } from 'react';
import style from './Compras.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { fechaActual } from '../../utils/fechaActual';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Compras = () => {
  
  const navigate = useNavigate();
 
  const [load, setLoad] = useState(true);

  const [sells, setSells] = useState(true);

  
  useEffect(() => {
    getsells();
  }, []);

  const getsells = async () => {
    
      const sellResult = await eventsApi.get(`/orders`);
      setSells(sellResult.data);
      setLoad(false)

      const ordenesTotal = []
    
  };

  

  const [currentPage, setCurretPage] = useState(1);
  const ordersPerPage = 10;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirsOrder = indexOfLastOrder - ordersPerPage;
  const paginado = (pageNumber) => setCurretPage(pageNumber);




 

  

 



  if(load){
    return(
      <Loading />
    )
   }else{
    return (
      <div className={style.container}>
        <div className={style.container_titles}>
          <h1>Lista de compras</h1>
          <h5>{fechaActual}</h5>
        </div>

        <div className={style.container_table}>
          <div className={style.container_headbody}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th_first}>Nombre del Comprador</th>
                <th className={style.th_first}>Apellido del Comprador</th>
                <th>Email del Comprador</th>
                <th>Cedula de Ciudadania del Comprador</th>
                <th>Ciudad de Domicilio del Comprador</th>
                <th>Direccion del Comprador</th>
                <th>Telefono del Comprador</th>
                <th>Fecha de Compra</th>
                <th>Evento</th>
                <th>Monto de la compra</th>

                <th>Nº Identificacion de Compra</th>
               
              </tr>
            </thead>

            <tbody>
              {sells !== undefined &&
                sells.slice(indexOfFirsOrder, indexOfLastOrder).map((sell) =>
                sell.ordenes.map(order =>
                    <tr key={sell._id} className={style.tbody}>
                        <td>
                          {sell.firstName}
                        </td>
                        <td>{sell.lastName}</td>
                        <td>{sell.email}</td>
                        <td>{sell.document}</td>
                        <td>{sell.city}</td>
                        <td>{sell.direction}</td>
                        <td>{sell.tel}</td>
                        <td>{order.fechaDePago.slice(0,10)}</td>
                        <td>{order.motivo}</td>
                        <td> ${new Intl.NumberFormat('de-DE').format(order.valorDeLaTransaccion)}</td>
                       
                        <td>
                        <Link to={`/detalle-de-orden/${order._id}/${sell._id}`}>{order._id}</Link>
                        </td>
                      </tr>
                    )
                    
                )}
            </tbody>
          </div>

          {sells !== undefined &&
            
                  <div className={style.container_pagination}>
                    <Pagination ordersPerPage={ordersPerPage} state={sells.length} paginado={paginado} />
                  </div>
          }

         
         
            
          

          <div className={style.container_exit}>
            <p className={style.exit} onClick={() => navigate('/admin')}>
              Salir
            </p>
          </div>
        </div>
      </div>
    );
  }

};

export default Compras;



