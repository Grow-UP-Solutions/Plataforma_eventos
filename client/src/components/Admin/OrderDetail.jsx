import React, { useEffect, useState } from 'react';
import style from './OrderDetail.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { fechaActual } from '../../utils/fechaActual';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { animateScroll as scroll } from 'react-scroll';
const OrderDetail = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const [order, setOrder] = useState({});

  const [load, setLoad] = useState(true);

  const orderId = useParams().orderId;
  const userId = useParams().userId;

  useEffect(() => {
    getUsers();
  }, [userId]);
  useEffect(() => {
    scroll.scrollToTop();
  }, []);
  const getUsers = async () => {
    const userResult = await eventsApi.get(`/users/${userId}`);
    setUserData(userResult.data);
    setLoad(false);
    const value = userResult.data.ordenes.filter((order) => order._id === orderId)[0];
    setOrder(value);
  };

  if (load) {
    return <Loading />;
  } else {
    return (
      <div className={style.containerAdminProfile}>
        <h1>Detalles de la Compra</h1>
        {order !== undefined && (
          <div className={style.containerAdmin}>
            <p className={style.h2}>Orden Id: {order._id}</p>
            <p className={style.h2}>Evento: {order.motivo}</p>
            <p className={style.h2}>Codigo de La Transaccion: {order.codigoDeLaTransaccion}</p>
            <p className={style.h2}>Destino de Pago: {order.DestinoDePago}</p>
            <p className={style.h2}>Fecha de Pago: {order.fechaDePago.slice(0, 10)}</p>
            <p className={style.h2}>
              Valor de la Transaccion: ${new Intl.NumberFormat('de-DE').format(order.valorDeLaTransaccion)}
            </p>
            <p className={style.h2}>
              Costo de la Transaccion: ${new Intl.NumberFormat('de-DE').format(order.costoDeLaTransaccion)}
            </p>
            <p className={style.h2}>Referencia: {order.referencia}</p>

            {order.cuposComprados.map((cupo) => (
              <div>
                <p className={style.h2}>Fecha Comprada: {cupo.idDate}</p>
                <p className={style.h2}>Cantidad de Cupos: {cupo.cantidad}</p>
              </div>
            ))}
          </div>
        )}

        <Link className={style.exit} to='/ordenes'>
          <button className={style.exit}>Ir a Todas Las Compras</button>
        </Link>
      </div>
    );
  }
};

export default OrderDetail;

// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import styles from '../../../Styles/adminUserProfile.module.css'
// import { Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'
// import AdminOrderStatusCancelled from './ManejoDeEstados/AdminOrderStatusCancelled'
// import AdminOrderStatusCreated from './ManejoDeEstados/AdminOrderStatusCreated'
// import AdminOrderStatusComplete from './ManejoDeEstados/AdminOrderStatusComplete'
// import AdminOrderStatusProcessing from './ManejoDeEstados/AdminOrderStatusProcessing'
// import { useState } from 'react'
// import { setOrderStatus, getAllOrders, deleteOrder } from '../../../actions'
// import { animateScroll as scroll, Element } from 'react-scroll'
// import Alert from '../../../functions/Alert'

// export default function AdminOrderDetails() {
//   const allOrders = useSelector((state) => state.orders)
//   const dispatch = useDispatch()

//   const id = useParams().id
//   const order = allOrders.filter((order) => order._id === id)[0]

//   const ordersIds = [id]

//   // const [seleccionados, setSeleccionados] = useState([id])
//   const [changed, setChanged] = useState(false)

//   function changeCreated() {
//     console.log('estoy')
//     dispatch(setOrderStatus({ ordersIds, status: 'Creada' }))
//     setTimeout(function () {
//       dispatch(getAllOrders())
//     }, 1000)
//   }
//   function changeProcessing() {
//     console.log('estoy')
//     dispatch(setOrderStatus({ ordersIds, status: 'Procesando' }))
//     setTimeout(function () {
//       dispatch(getAllOrders())
//     }, 1000)
//   }

//   function changeShipped() {
//     console.log('estoy')
//     dispatch(setOrderStatus({ ordersIds, status: 'Enviada' }))
//     setTimeout(function () {
//       dispatch(getAllOrders())
//     }, 1000)
//   }

//   function changeCompletada() {
//     console.log('estoy')
//     dispatch(setOrderStatus({ ordersIds, status: 'Completada' }))
//     setTimeout(function () {
//       dispatch(getAllOrders())
//     }, 1000)
//   }

//   function changeCancelled() {
//     console.log('estoy')
//     dispatch(setOrderStatus({ ordersIds, status: 'Cancelada' }))
//     setTimeout(function () {
//       dispatch(getAllOrders())
//     }, 1000)
//   }

//   useEffect(() => {
//     scroll.scrollToTop()
//   }, [])

//   function handleDeleteOrder(id) {
//     dispatch(deleteOrder(id))
//     Alert('Orden Eliminada', 'updateOrder')
//     navigate('/admin')
//     dispatch(getAllOrders())
//   }

//   return (
//     <div className={styles.containerAdminProfile}>
//       <NavLink className={` ${styles.buttonBack}`} to='/adminorders'>
//         <button className={`${styles.button} `}>Ir a Todas Las Ordenes</button>
//       </NavLink>

//       <h2>Cambiar el Estado de la orden</h2>
//       <div className={styles.containerAdmin}>
//         <button
//           className={`${styles.button} `}
//           onClick={() => changeCreated(ordersIds)}
//         >
//           Creada
//         </button>
//         <button
//           className={`${styles.button} `}
//           onClick={() => changeProcessing(ordersIds)}
//         >
//           Procesando
//         </button>
//         <button
//           className={`${styles.button} `}
//           onClick={() => changeShipped(ordersIds)}
//         >
//           Enviada
//         </button>
//         <button
//           className={`${styles.button} `}
//           onClick={() => changeCompletada(ordersIds)}
//         >
//           Completada
//         </button>
//         <button
//           className={`${styles.button} `}
//           onClick={() => changeCancelled(ordersIds)}
//         >
//           Cancelada
//         </button>
//       </div>
//       <div>
//         <h1>Detalles de Orden</h1>
//         <div className={styles.containerAdmin}>
//           <p className={styles.h2}>Orden Id: {order._id}</p>

//           <Link to={`/adminuserprofile/${order.usuario[0]._id}`}>
//             {order.usuario[0].email}
//           </Link>
//           <p className={styles.h2}>Fecha: {order.fecha}</p>
//           <p className={styles.h2}>Total precio : {order.total}</p>
//           <p className={styles.h2}>
//             Producto:
//             {order.produt.map((product) => (
//               <li>{product}</li>
//             ))}
//           </p>
//           <p className={styles.h2}>Cantidad: {order.quantity}</p>
//           <p className={styles.h2}>Direccion: {order.usuario[0].address}</p>
//           <p className={styles.h2}>Codigo Postal: {order.usuario[0].postal}</p>
//           <p className={styles.h2}>Ciudad: {order.usuario[0].ciudad}</p>
//           <p className={styles.h2}>Pais: {order.usuario[0].country}</p>
//           <p className={styles.h2}>Telefono: {order.usuario[0].phone}</p>
//           <p className={styles.h2}>Estado de Pago: {order.status}</p>
//           <p className={styles.h2}>Estado de Orden: {order.status_order}</p>
//         </div>
//       </div>
//       <button
//         className={`${styles.button} `}
//         onClick={() => handleDeleteOrder(id)}
//       >
//         Borrar Orden
//       </button>
//     </div>
//   )
// }

// //CAMBIAR EL ESTADO
