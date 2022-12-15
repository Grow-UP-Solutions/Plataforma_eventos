import React, { useEffect, useState } from 'react';
import style from './Orders.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { fechaActual } from '../../utils/fechaActual';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Orders = () => {
  
  const navigate = useNavigate();
 
  const [userData, setUserData] = useState({});

  const [load, setLoad] = useState(true);

  const [orden, setOrden] = useState(true);

  
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    
      const userResult = await eventsApi.get(`/users`);
      setUserData(userResult.data);
      setLoad(false)

      const ordenesTotal = []
      

      const ordenes = userResult.data.map(u => u.ordenes.map(orden=>

        ordenesTotal.push(orden)
      ))

      setOrden(ordenesTotal)
    
  };

  console.log('userData:',userData)

  

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
              {userData !== undefined &&
                userData.slice(indexOfFirsOrder, indexOfLastOrder).map((user) =>
                user.ordenes.map(order =>
                    <tr key={user._id} className={style.tbody}>
                        <td>
                          {user.firstName}
                        </td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.document}</td>
                        <td>{user.city}</td>
                        <td>{user.direction}</td>
                        <td>{user.tel}</td>
                        <td>{order.fechaDePago.slice(0,10)}</td>
                        <td>{order.motivo}</td>
                        <td> ${new Intl.NumberFormat('de-DE').format(order.valorDeLaTransaccion)}</td>
                       
                        <td>
                        <Link to={`/detalle-de-orden/${order._id}/${user._id}`}>{order._id}</Link>
                        </td>
                      </tr>
                    )
                    
                )}
            </tbody>
          </div>

          {orden !== undefined &&
            
                  <div className={style.container_pagination}>
                    <Pagination ordersPerPage={ordersPerPage} state={orden.length} paginado={paginado} />
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

export default Orders;



