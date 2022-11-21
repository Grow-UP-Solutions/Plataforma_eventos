import React, { useContext, useState ,useEffect } from 'react';
import styles from './EventDate.module.css';
import { Calendar } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { AiOutlineClose } from 'react-icons/ai';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { UIContext } from '../../context/ui';
import EventDateMap from './EventDateMap';
import { iconArrowLeft, iconArrowRight } from '../../assets/imgs';
import { stateContext } from '../../context/state/stateContext';
import swal from 'sweetalert';

const EventDate = ({ id }) => {

  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];
  const [getNewDate, setGetNewDate] = useState(false);
  const [date, setDate] = useState(null);
  const [dateFormatted, setDateFormatted] = useState('');
  const navigate = useNavigate();
  const { toggleScreenLogin } = useContext(UIContext);
  const { user, logged, logout } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const { carrito, setCarrito } = useContext(stateContext);
  const { dateToBuy, setDateToBuy } = useContext(stateContext);
  
  

//   if(eventDetails!==undefined){
//   eventDetails.dates.map((d)=>{
//   d.checked=false})
// }
  useEffect(() => {
    
      setCarrito([])
      setDateToBuy([])
    
  },[])



  const fecha = new Date();
  const hora = fecha.getHours();
  const minutes = fecha.getMinutes();
  const dateActual = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

  const handleFormatDate = (date) => {
    setDate(date);
    setDateFormatted(formatDate(date));
  };


  const [dateId, setDateId] = useState(0);

  const dateSelected = (e,price) => {
    const administracion = price*0.16
    const iva = price*0.19
    const finalPrice = price + administracion + iva
    e.preventDefault()
    setChecked(true)
    const fechaElegida = e.target.value
    if (!e.target.checked) {
      console.log('No checke')
        let seleccion = carrito.filter((f)=>f.idDate !== fechaElegida )
        setCarrito(seleccion)
        let datesC = dateToBuy.filter((d)=>d._id!==fechaElegida)
        setDateToBuy(datesC)
     }else{
      setCarrito([...carrito, {
        idDate:fechaElegida, 
        quantity:0,
        unit_price:finalPrice,
        title:'',
      }])

      
      for(let i = 0 ; i<eventDetails.dates.length ; i++){
        if(eventDetails.dates[i]._id===fechaElegida){
          const datesChoosen=eventDetails.dates[i]
          console.log('datesChoosen',datesChoosen)
          setDateToBuy([
            ...dateToBuy,datesChoosen
           
          ])
        }
      }
      
     }
  }


  
  //COMPRAR


  const comprar = (e) => {
    if (!logged) {
      toggleScreenLogin();
    }
    else if (logged && checked) {
      navigate(`/cart/${id}`);
    }
    else if (logged && !checked) {
      swal('Debes seleccionar al menos una fecha');
    }
  }

  // {`/cart/${id}`}

  //CARRITO
 

  return (
    <div>
    {eventDetails?
    <div className={styles.container}>
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
      <div>
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
            {eventDetails.dates.map((date) => {
              if (date.date > dateActual) {
                return (
                  <tr>

                    <td>
                      <input
                        type="checkBox"
                        class={styles.checkBox}
                        value={date._id}
                        onChange={(e) => dateSelected(e,date.price)}                
                      />
                    </td>

                    <td>{date.date}</td>

                    <td>{date.start}-{date.end}</td>

                    <td>{date.price}</td>

                    <td>{date.cupos}</td>

                    {/* <td className={styles.containerNumberBuyCupos}>

                      <button
                        onClick={() => handleNumberBuyCupos(date.cuposToBuy - 1, date._id )}
                      >
                        <img src={iconArrowLeft} alt="icon-left" />
                      </button>

                      <span>{date.cuposToBuy}</span>

                      <button
                        onClick={() => handleNumberBuyCupos(date.cuposToBuy + 1, date._id )}
                      >
                        <img src={iconArrowRight} alt="icon-left" />
                      </button>

                    </td> */}
                    

                    {carrito.length > 0?
                     carrito.map((c)=>
                     c.idDate === date._id?
                     <EventDateMap id={date._id}/>
                     :
                     ''
                     )
                        : <td className={styles.containerNumberBuyCuposDisable}>
                            <button>
                              <img src={iconArrowLeft} alt="icon-left" />
                            </button>           
                            <span>-</span>               
                            <button>
                              <img src={iconArrowRight} alt="icon-left" />
                            </button>
                          </td>
                          }
                   

                  </tr>
                )}
              else {return ''}
            })}
          </tbody>
        </table>
      </div>

        <button className={styles.button}  onClick={(e) => comprar(e)}>Comprar</button>
    

      {/* <Link to={`/cart/${id}`}>
        <button className={styles.button}  onClick={(e) => comprar(e)}>Comprar</button>
      </Link> */}
      <p className={styles.parrafo}>
        Nuevas fechas pueden ser solicitadas en cuyo caso un mínimo aplicaría de
        cupos a ser adquiridos por el solicitante, será sujeto a aprobación de
        fecha
      </p>
      <p onClick={() => setGetNewDate(!getNewDate)} className={styles.parrafo2}>
        Solicitar nuevas fechas
      </p>

      {/* MENU GET NEW DATE */}

      {getNewDate && (
        <div className={styles.containerMenuGetDate}>
          <div className={styles.closeMenuGetDate}>
            <button onClick={() => setGetNewDate(false)}>
              <AiOutlineClose />
            </button>
          </div>
          <div className={styles.containerDescription}>
            <h2 className={styles.menuTitle}>Solicitar nueva fecha</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              quod beatae molestiae eius cum, dolorem necessitatibus quibusdam
              ipsum earum, voluptates repudiandae.
            </p>
          </div>
          <div className={styles.containerDate}>
            <h2 className={styles.menuTitle}>Mi calendario</h2>
            <div className={styles.containerFormDate}>
              <Calendar
                className={styles.calendar}
                color={'#D53E27'}
                locale={locales['es']}
                date={date}
                onChange={(item) => handleFormatDate(item)}
              />
              <div className={styles.menuOptions}>
                <form action="">
                  <div className={styles.formGroup}>
                    <label htmlFor="date">Fecha</label>
                    <input type="text" id="date" value={dateFormatted} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="time">Horas</label>
                    <div className={styles.containerInputTime}>
                      <input type="time" />
                      <input type="time" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="people">Número de participantes</label>
                    <input type="number" id="people" />
                  </div>
                  <div className={styles.containerBtn}>
                    <button type="submit" className={styles.btnMenuDate}>
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    :''}

    </div>
  );
};

export default EventDate;