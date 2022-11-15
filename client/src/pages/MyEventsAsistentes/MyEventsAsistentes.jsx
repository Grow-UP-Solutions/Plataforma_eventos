import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './MyEventsAsistentes.module.css';
import { getUsers } from '../../redux/actions';
import eventsApi from "../../axios/eventsApi";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import { stateContext } from '../../context/state/stateContext';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../context/auth/AuthContext';
import { AiFillCodeSandboxCircle } from 'react-icons/ai';



const MyEventsAsistentes = () => {

  const dispatch = useDispatch()
  const eventid = useParams().eventId
  const dateid = useParams().dateId
  const [all , setAll] = useState([])
  const [todosEvents , setTodosEvents] = useState([])
  const [date , setDate] = useState([])
  const [buyers , setBuyers] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
  
    const getAllUsers = async () => {
      const res = await eventsApi.get('/users');
      setAll(res.data)
    }
    getAllUsers();

    const getAllEvents = async () => {
      const json = await eventsApi.get('/events');
      setTodosEvents(json.data)
    }
    getAllEvents();
  }, []);

 
  const event = todosEvents.filter(e=>e._id===eventid)



  useEffect(() => {
  
    if(todosEvents.length>1){
    const fecha= event[0].dates.find(d=>d._id===dateid)  
    setDate(fecha)
    }

  }, [todosEvents]);

  useEffect(() => {
  
  console.log('effect')
  console.log('d:',date)
    if(date !== undefined){
      const idBuyers = date.buyers
      if(idBuyers!==undefined){
        const allBuyers = []
      for(let j = 0 ; j<idBuyers.length ; j++){
        const buyer = all.find(a=>a._id === idBuyers[j])
        allBuyers.push(buyer)
        console.log('allBuyers:',allBuyers)
        setBuyers(allBuyers)
      }}
    }

  }, [date]);



  
// SELECCION DE CHECKBOX
  const [seleccionados, setSeleccionados] = useState([])
  
  const selectBuyer = (e) => {
    e.preventDefault()
 
    var buyerId = e.target.value
    console.log('buyerId',buyerId)
    if (!e.target.checked) {
      let seleccion = seleccionados.filter((buyer) => buyer !== buyerId)
      setSeleccionados(seleccion)
    } else {
      let buyerCheck = date.buyers.find((buyer) => buyer === buyerId)
      console.log('buyerCheck',buyerCheck)
      setSeleccionados([...seleccionados, buyerCheck])
    }
  
  }

  const selectAll = (e) => {
    e.preventDefault()
 
   if(e.target.checked){
    setSeleccionados([])
    setSeleccionados(date.buyers)
   }else{
    setSeleccionados([])
   }
  
  }






  //MENSAJES
  const { user } = useContext(AuthContext);

  const { setResult, conversa } = useContext(stateContext);
  console.log('conversa:',conversa)
  const [conversation, setConversation] = useState([])

  useEffect(() => {
    setConversation({
      senderId: user.uid,
      receiverId: seleccionados,
    })
  }, [user]);


  const handleOneMessage = (e, buyerId) => {
    e.preventDefault();
    const array = conversa.map((e) => e.members).flat();
    const json = array.includes(buyerId)
    setConversation({
      senderId: user.uid,
      receiverId: buyerId,
    })
  
    if (json === true) {
      navigate('/usuario/mensajes');
    } else {
      eventsApi.post('/conversation/create', conversation).then((response) => {
        navigate('/usuario/mensajes');
      });
    }
  };


  const handleManyMessages = (e) => {
  e.preventDefault();
  const array = conversa.map((e) => e.members).flat();
  for(let i = 0 ; i <array.length ; i++){

  const json = seleccionados.includes(array[i])

  setConversation({
    senderId: user.uid,
    receiverId: array[i],
  })

  if (json === true) {
    navigate('/usuario/mensajes');
  } else {
    eventsApi.post('/conversation/create', conversation).then((response) => {
      navigate('/usuario/mensajes');
    });
  }}
};


  
  



  return(
      <div className={styles.container}>
          {event.length===1&&
              <div className={styles.containerTop}>
                <p className={styles.title}>Asistentes al evento</p>   
                <p className={styles.eventTitle}>{event[0].title}</p>
                <p className={styles.location}>{event[0].municipio} - {event[0].departamento} </p>
                {
                  event[0].dates.map(d=>
                  d._id===dateid?
                  <div>
                    <p className={styles.date}>{d.dateFormated} - {d.start} - {d.end} </p>
                    {buyers.length > 1 ?                     
                        <div className={styles.containerTable}>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <th>
                                <input
                                      type="checkbox"
                                      class={styles.checkBox}
                                      value={buyers._id}
                                      onChange={(e) => selectAll(e)}
                                      defaultChecked={false}
                                    ></input>
                                </th>
                                <th>Seleccionar Todos</th>
                                <th>Usuario</th>
                                <th>Cupos Comprados</th>
                                <th>
                                  <th>
                                    <div className={styles.btnTop}>
                                      <LocalPostOfficeIcon sx={{ fontSize: '13px', color: '#d53e27' }} />
                                      <button className={styles.button} >
                                       Descargar Lista
                                      </button>
                                    </div>
                                  </th>
                                  <th>
                                    <div className={styles.btnTop}>
                                      <LocalPostOfficeIcon sx={{ fontSize: '30px', color: '#d53e27' }} />
                                      <button className={styles.button} 
                                        onClick={(e)=>handleManyMessages(e)} >
                                        Enviar Mensaje a seleccionados
                                      </button>
                                    </div>
                                  </th>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {buyers.map(b=>(
                                <tr >
                                  <td>

                                      <input
                                      type="checkbox"
                                      class={styles.checkBox}
                                      value={b._id}
                                      onChange={(e) => selectBuyer(e)}
                                      defaultChecked={false}
                                      checked={seleccionados.includes(b)}
                                    ></input>
   
                                  </td>
                                  <td><img className={styles.userImg} src={b.userpicture} alt='img-user' /></td>
                                  <td>{b.name}</td>
                                  <td>FALTA ESTE VALOR</td>
                                  <td>
                                    <div className={styles.btn}>
                                      <LocalPostOfficeIcon sx={{ fontSize: '13px', color: '#d53e27' }} />
                                      <button className={styles.button}  onClick={(e)=>handleOneMessage(e ,b._id)}  >
                                        Enviar Mensaje
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      
                      :'no hay buyers'
                    }
                  </div>
                :'')
                }
              </div>  
            }
      </div>
  )
}

export default MyEventsAsistentes;