import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, { useContext, useEffect, useRef, useState } from 'react';

/* import { Calendar } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file */

import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { iconArrowLeft, iconArrowRight } from '../../assets/imgs';
import eventsApi from '../../axios/eventsApi';
import { AuthContext } from '../../context/auth';
import { stateContext } from '../../context/state/stateContext';
import { UIContext } from '../../context/ui';
import { administracion, comision, iva, ivaOrg } from '../../utils/administracion';
import { formatDate } from '../../utils/formatDate';
import styles from './EventDate.module.css';
import EventDateMap from './EventDateMap';
import { administracion, iva } from '../../utils/administracion';

import { Calendar } from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { myCustomLocale } from '../../utils/customLocaleDate';

import moment from 'moment';

const EventDate = ({ id, openMenu }) => {
  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];
  const [getNewDate, setGetNewDate] = useState(false);
  const [date, setDate] = useState(null);
  const [dateFormatted, setDateFormatted] = useState('');
  const navigate = useNavigate();
  const { toggleScreenLogin } = useContext(UIContext);
  const { user, logged, logout } = useContext(AuthContext);
  const { carrito, setCarrito } = useContext(stateContext);
  const { dateToBuy, setDateToBuy } = useContext(stateContext);
  const [resultFormNewDate, setResultFormNewDate] = useState(false);
  const [isLoadingNewDate, setIsLoadingNewDate] = useState(false);
  const { valorTotal, setValorTotal } = useContext(stateContext);
  const { subTotal, setSubTotal } = useContext(stateContext);

  useEffect(() => {
    setCarrito([]);
    setDateToBuy([]);
    setValorTotal(0);
  }, []);

  const fecha = new Date();
  // const hora = fecha.getHours();
  // const minutes = fecha.getMinutes();
  const dateActual = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

  const handleFormatDate = (date) => {
    setDate(date);
    setDateFormatted(formatDate(date));
  };

  const handleFormSolicitudNewDate = () => {
    setResultFormNewDate(false);
    setGetNewDate(!getNewDate);
    if (window.innerWidth <= 800) openMenu(false);
  };

  const inputTimeStart = useRef(null);
  const inputTimeEnd = useRef(null);
  const inputCoupons = useRef(null);

  const sendEmailToNewDate = async () => {
    if (Object.keys(user).length === 0) {
      return toggleScreenLogin();
    }

    setIsLoadingNewDate(true);

    const dataForEmail = {
      user: { name: user.name, email: user.email },
      dateFormatted,
      start: inputTimeStart.current.value,
      end: inputTimeEnd.current.value,
      coupons: inputCoupons.current.value,
      event: {
        title: eventDetails.title,
        picture: eventDetails.pictures[0].picture,
      },
      emailOrganizer: eventDetails.organizer.email,
    };

    try {
      await eventsApi.put('/users/sendEmailToEventNewDate', { dataForEmail });
      setIsLoadingNewDate(false);
      setResultFormNewDate({
        success: true,
        message: 'Se ha enviado la solicitud',
      });
    } catch (error) {
      setResultFormNewDate({
        success: false,
        message: 'Intentelo de nuevo',
      });
      console.log({ error: error.message });
    }
  };

  const dateSelected = (e, price) => {
    const fechaElegida = e.target.value;

    const priceOrg = price - price * comision - price * comision * ivaOrg;

    if (!e.target.checked) {
      let seleccion = carrito.filter((f) => f.idDate !== fechaElegida);
      let carritoElegido = carrito.filter((f) => f.idDate === fechaElegida);
      let seleccionDate = dateToBuy.filter((d) => d._id !== fechaElegida);
      setCarrito(seleccion);

      setDateToBuy(seleccionDate);

      if (carrito.length > 1) {
        const valorT = valorTotal - carritoElegido[0].subtotal;
        setValorTotal(valorT);
        setSubTotal(subTotal - carritoElegido[0].subtotal);
      } else {
        setValorTotal(0);
        setSubTotal(0);
      }
    } else {
      setCarrito([
        ...carrito,
        {
          idDate: fechaElegida,
          quantity: 1,
          price: price,
          unit_price: price,
          codigoDescuento: '',
          codigoReferido: '',
          codigoCorrecto: '',
          subtotal: price,
          descuento: '',
          priceOrg: priceOrg,
          ganancias: priceOrg,
        },
      ]);

      // const total = fechaElegida.price + administracion + iva
      // setValorTotal(total)

      for (let i = 0; i < eventDetails.dates.length; i++) {
        if (eventDetails.dates[i]._id === fechaElegida) {
          const datesChoosen = eventDetails.dates[i];
          setDateToBuy([...dateToBuy, datesChoosen]);
          const total = eventDetails.dates[i].price + administracion + iva;
          if (valorTotal === 0) {
            setValorTotal(total);
            setSubTotal(eventDetails.dates[i].price);
          } else {
            const totalVariasFecchas = valorTotal + eventDetails.dates[i].price;
            setValorTotal(totalVariasFecchas);
            setSubTotal(subTotal + eventDetails.dates[i].price);
          }
        }
      }
    }
  };

  //COMPRAR

  const comprar = (e) => {
    if (!logged) {
      toggleScreenLogin();
    } else if (logged && carrito.length > 0) {
      navigate(`/cart/${id}`);
    } else if (logged && carrito.length === 0) {
      swal('Debes seleccionar al menos una fecha');
    }
  };

  // {`/cart/${id}`}

  //CARRITO

  return (
    <div>
      {eventDetails ? (
        <div className={styles.container}>
          <div className={styles.containerIconOpenMenuDate}></div>

          <div className={styles.containerTitle}>
            <CalendarMonthIcon
              sx={{
                fontSize: '16px',
                color: '#585858',
                '& :hover': { color: '#ef5350' },
              }}
            />
            <p className={styles.title}>Próximas Fechas</p>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Precio</th>
                <th>Cupos Dispopnibles</th>
                <th>Cupos a Comprar</th>
              </tr>
            </thead>
            <tbody>
              {eventDetails.dates.map((date) =>
                moment(date.date) > moment(dateActual) ? (
                  <tr>
                    <td>
                      <input
                        type='checkBox'
                        class={styles.checkBox}
                        value={date._id}
                        onChange={(e) => dateSelected(e, date.price)}
                      />
                    </td>

                    <td>{date.date}</td>

                    <td>
                      {date.start}-{date.end}
                    </td>

                    <td>{date.price}</td>

                    <td>{date.cupos}</td>

                    {carrito.length > 0 ? (
                      carrito.map((c) =>
                        c.idDate === date._id ? <EventDateMap id={date._id} cupos={date.cupos} /> : ''
                      )
                    ) : (
                      <td className={styles.containerNumberBuyCuposDisable}>
                        <button>
                          <img src={iconArrowLeft} alt='icon-left' />
                        </button>
                        <span>-</span>
                        <button>
                          <img src={iconArrowRight} alt='icon-left' />
                        </button>
                      </td>
                    )}
                  </tr>
                ) : (
                  'no'
                )
              )}
            </tbody>

            {/* {eventDetails.dates.map((date) => {
                date.date > dateActual ?
               ' Si'
                // <tbody>
                //     <tr>
                //       <td>
                //         <input
                //           type='checkBox'
                //           class={styles.checkBox}
                //           value={date._id}
                //           onChange={(e) => dateSelected(e, date.price)}
                //         />
                //       </td>

                //       <td>{date.date}</td>

                //       <td>
                //         {date.start}-{date.end}
                //       </td>

                //       <td>{date.price}</td>

                //       <td>{date.cupos}</td>

                //       {carrito.length > 0 ? (
                //         carrito.map((c) =>
                //           c.idDate === date._id ? <EventDateMap id={date._id} cupos={date.cupos} /> : ''
                //         )
                //       ) : (
                //         <td className={styles.containerNumberBuyCuposDisable}>
                //           <button>
                //             <img src={iconArrowLeft} alt='icon-left' />
                //           </button>
                //           <span>-</span>
                //           <button>
                //             <img src={iconArrowRight} alt='icon-left' />
                //           </button>
                //         </td>
                //       )}
                //     </tr>
                // </tbody>
                :'NO'
                }
              )} */}
          </table>
          <div className={styles.containerBtnBuy}>
            <button className={styles.button} onClick={(e) => comprar(e)}>
              Comprar
            </button>
          </div>

          <div className={styles.containerMenuBuyEvent}>
            <div className={styles.containerTableDates}>
              <table className={styles.tableMenuDate}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Precio (COP)</th>
                  </tr>
                </thead>
                <tbody>
                  {eventDetails.dates.map((date) => {
                    if (moment(date.date) > moment(dateActual)) {
                      return (
                        <tr>
                          <td>
                            <input
                              type='checkBox'
                              class={styles.checkBox}
                              value={date._id}
                              onChange={(e) => dateSelected(e, date.price)}
                            />
                          </td>

                          <td>{date.date}</td>

                          <td>{date.start}</td>

                          <td>${date.price}</td>
                        </tr>
                      );
                    } else {
                      return '';
                    }
                  })}
                </tbody>
              </table>
              <button className={styles.btnMenuBuy} onClick={(e) => comprar(e)}>
                Comprar
              </button>
            </div>
          </div>

          <p className={styles.parrafo}>
            Nuevas fechas pueden ser solicitadas en cuyo caso un mínimo aplicaría de cupos a ser adquiridos por el
            solicitante, será sujeto a aprobación de fecha
          </p>
          <div className={styles.containerBtnSolitudNewDate}>
            <p onClick={handleFormSolicitudNewDate} className={styles.parrafo2}>
              Solicitar nuevas fechas
            </p>
          </div>
          {/* MENU GET NEW DATE */}

          <div
            style={{
              display: getNewDate ? 'block' : 'none',
            }}
            className={styles.containerMenuGetDate}
          >
            <div className={styles.closeMenuGetDate}>
              <button onClick={() => setGetNewDate(false)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className={styles.containerDescription}>
              <h2 className={styles.menuTitle}>Solicitar nueva fecha</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quod beatae molestiae eius cum, dolorem
                necessitatibus quibusdam ipsum earum, voluptates repudiandae.
              </p>
            </div>
            <div className={styles.containerDate}>
              <h2 className={styles.menuTitle}>Mi calendario</h2>
              <div className={styles.containerFormDate}>
                <Calendar
                  calendarClassName='calendar-eventDetail'
                  colorPrimary={'#D53E27'}
                  value={date}
                  onChange={(item) => handleFormatDate(item)}
                  locale={myCustomLocale}
                />
                <div className={styles.menuOptions}>
                  <form action=''>
                    <div className={styles.formGroup}>
                      <label htmlFor='date'>Fecha</label>
                      <input type='text' id='date' value={dateFormatted} />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor='time'>Horas</label>
                      <div className={styles.containerInputTime}>
                        <input type='time' ref={inputTimeStart} />
                        <input type='time' ref={inputTimeEnd} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor='people'>Número de participantes</label>
                      <input ref={inputCoupons} min={1} type='number' id='people' />
                    </div>
                    <div className={styles.containerBtn}>
                      <button type='button' onClick={sendEmailToNewDate} className={styles.btnMenuDate}>
                        Enviar
                      </button>
                    </div>

                    {isLoadingNewDate && <AiOutlineLoading3Quarters className={styles.loadingNewDate} />}

                    {resultFormNewDate && (
                      <p
                        style={{
                          color: resultFormNewDate.success ? '#29aa79' : '#d53e27',
                        }}
                        className={styles.successSolicitudNewDate}
                      >
                        {resultFormNewDate.message}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default EventDate;
