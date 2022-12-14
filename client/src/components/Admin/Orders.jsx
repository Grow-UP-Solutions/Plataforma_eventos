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
                <th className={style.th_first}>Nombre</th>
                <th className={style.th_first}>Apellido</th>
                <th>Email</th>
                <th>Fecha</th>
                <th>Evento</th>
                <th>Nº</th>
               
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
                        <td>{order.fechaDePago.slice(0,10)}</td>
                        <td>{order.motivo}</td>
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



