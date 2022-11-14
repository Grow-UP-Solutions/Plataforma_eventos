import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './MyEventsAsistentes.module.css';
import { getUsers } from '../../redux/actions';
import eventsApi from "../../axios/eventsApi";


const MyEventsAsistentes = () => {

    const dispatch = useDispatch()

   

      const [all , setAll] = useState([])

      useEffect(() => {
      
        const getAllUsers = async () => {
          const res = await eventsApi.get('/users');
          setAll(res.data)
        }
        getAllUsers();
      }, []);



    const eventid = useParams().eventId
    const dateid = useParams().dateId
    const allEvents = useSelector(state=>state.events)
    const event = allEvents.filter(e=>e._id===eventid)
    // const dateEvent = event[0].dates.filter(d=>d._id===dateid)

    console.log('all',all)

  
      const[buyers , setBuyers] = useState([])

        if(event.length===1){
            const date = event[0].dates.filter(d=>d._id===dateid)[0]
            console.log('buyers:',date.buyers)
            setBuyers(date.buyers)
        }

const asistEvents = []





    return(
        <div>
            {event.length===1&&
                <div>
                <p>Asistentes al Evento</p>
                
                
                <div>
                <p>{event[0].title}</p>
                <p>{event[0].municipio}</p>
                <p>{event[0].departamento}</p>
                </div>
            
                
                
                {event[0].dates.map(d=>
                d._id===dateid?
                <div classname={styles.flex}>
                    <p>{d.dateFormated}</p>
                    <p>{d.start}</p>
                    <p>{d.end}</p>
                </div>
                :'')}


                

            
                </div>  
             }
            
        </div>
    )
}

export default MyEventsAsistentes;