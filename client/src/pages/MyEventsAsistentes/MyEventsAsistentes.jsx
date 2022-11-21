
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MyEventsAsistentes.module.css';
import eventsApi from "../../axios/eventsApi";
import { stateContext } from '../../context/state/stateContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const MyEventsAsistentes = () => {

  const eventid = useParams().eventId;
  const dateid = useParams().dateId;
  const { user } = useContext(AuthContext);
  const [all , setAll] = useState([]);
  const [todosEvents , setTodosEvents] = useState([]);
  const [event, setEvent] = useState([]);
  const [date , setDate] = useState([]);
  const [buyers , setBuyers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await eventsApi.get('/users');
      setAll(res.data);
    }
    getAllUsers();
  }, []);

  useEffect(() => {
    const getAllEvents = async () => {
      const json = await eventsApi.get('/events');
      const event = json.data.filter(e => e._id === eventid);
      const fecha= event[0].dates.find(d=>d._id===dateid);
      setTodosEvents(json.data);
      setEvent(event);
      setDate(fecha);

    }
    getAllEvents();
  }, []);

  useEffect(() => {

    setTimeout(() => {
      if (date !== undefined) {
        const idBuyers = date.buyers;
        if (idBuyers!== undefined) {
          const allBuyers = [];
          for (let j = 0 ; j < idBuyers.length ; j++) {
            const buyer = all.find(a=>a._id === idBuyers[j]);
            allBuyers.push(buyer);
            setBuyers(allBuyers);
          }
        }
      }
    }, 1500);
    
  }, [date]);

  // SELECCION DE CHECKBOX
  const [seleccionados, setSeleccionados] = useState([]);
  
  const selectBuyer = (e) => {
    e.preventDefault();
    let buyerId = e.target.value;
    
    if (!e.target.checked) {
      let seleccion = seleccionados.filter((buyer) => buyer !== buyerId);
      setSeleccionados(seleccion);
    } 
    else {
      let buyerCheck = date.buyers.find((buyer) => buyer === buyerId);
      console.log('buyerCheck',buyerCheck);
      setSeleccionados([...seleccionados, buyerCheck]);
    }
  }

  const selectAll = (e) => {
    e.preventDefault()
 
    if(e.target.checked){
      setSeleccionados([]);
      setSeleccionados(date.buyers);
    }
    else{
      setSeleccionados([]);
    }
  }

  const saber = (a) => {
    let gast = seleccionados.includes(a);
    return gast;
  }

  //MENSAJES
  const { setResult, conversa } = useContext(stateContext);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    setConversation({
      senderId: user.uid,
      receiverId: '',
    })
  }, [user]);

  const handleOneMessage = (e, buyerId) => {
    e.preventDefault();
    const array = conversa.map((e) => e.members).flat();
    const json = array.includes(buyerId);
    const data = {
      senderId: user.uid,
      receiverId: buyerId,
    };
  
    if (json === true) {
      return  navigate('/usuario/mensajes');
    } 

    else {
      return eventsApi.post('/conversation/create', data).then((response) => {
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
      } 
      else {
        eventsApi.post('/conversation/create', conversation).then((response) => {
          navigate('/usuario/mensajes');
        });
      }
    }
  };

  //SALIR
  const handleClickExit = (e) => {
    e.preventDefault();
    navigate('/usuario/perfil');
  }  

  return (
    <div className={styles.container}>
      {
        event.length === 1 &&
        <div className={styles.containerTop}>
          <p className={styles.title}>Asistentes al evento</p>   
          <p className={styles.eventTitle}>{event[0].title}</p>
          <p className={styles.location}>{event[0].municipio} - {event[0].departamento} </p>
          
          {
            event[0].dates.map(d => d._id === dateid ?
            <div>
              <p className={styles.date}>{d.dateFormated} - {d.start} - {d.end} </p>
              {
                buyers.length > 1 ?                     
                <div className={styles.containerTable}>
                  <table className={styles.table}>
                    <thead>
                      <tr>

                        <th className={styles.input}>  
                          <input
                            type="checkbox"
                            onChange={(e) => selectAll(e)}
                            defaultChecked={false}
                            value={buyers._id}
                            class={styles.checkBox}
                          />
                          <p>Selecciona con doble click</p>
                        </th>
                        <th>Seleccionar Todos</th>
                        <th>Usuario</th>
                        <th>Cupos Comprados</th>
                        <th className={styles.two}>
                          
                          <div className={styles.btnTop1}>
                            <DescriptionOutlinedIcon sx={{ fontSize: '3rem', color: '#d53e27' }} />
                            <button className={styles.button} >
                              Descargar Lista
                            </button>
                          </div>
                          
                          <div className={styles.btnTop2}>
                            <MailOutlineIcon sx={{ fontSize: '3rem', color: '#d53e27' }} />
                            <button className={styles.button} 
                              onClick={(e)=>handleManyMessages(e)} 
                            >
                              <p>Enviar Mensaje a</p>
                              <p>seleccionados</p>
                            </button>
                            
                          </div>
                          
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyers.map(b=>(
                        <tr key={b._id}>
                          
                          <td className={styles.input}>

                            <input
                              type="checkbox"
                              onChange={(e) => selectBuyer(e)}
                              value={b._id}
                              className={styles.checkBox}
                              checked={saber(b._id) ? true : false}
                            />
                            <p>Selecciona con doble click</p>
    
                          </td>
                          <td><img className={styles.userImg} src={b.userpicture} alt='img-user' /></td>
                          <td>{b.name}</td>
                          <td>1</td>
                          <td>
                            <div className={styles.btn}>
                              <MailOutlineIcon sx={{ fontSize: '2rem', color: '#d53e27' }} />
                              <p className={styles.button1}  onClick={(e)=>handleOneMessage(e ,b._id)}  >
                                Enviar Mensaje
                              </p>
                            </div>
                          </td>
                        </tr>
                          
                      ))}
                    </tbody>
                  </table>
                </div> :'no hay buyers'
              }
            </div> : '')
          }
        </div>      
      }
      <div className={styles.container_exit}>
        <p className={styles.exit} onClick={handleClickExit}>Salir</p>
      </div>     
    </div>
  );
}

export default MyEventsAsistentes;