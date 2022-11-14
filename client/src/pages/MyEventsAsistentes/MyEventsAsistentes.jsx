import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './MyEventsAsistentes.module.css';
import { getUsers } from '../../redux/actions';


const MyEventsAsistentes = () => {

    const dispatch = useDispatch()

   
    useEffect(() => {
        dispatch(getUsers);
      }, []);
    const eventid = useParams().eventId
    const dateid = useParams().dateId

    const allUsers = useSelector(state=>state.users)
    const allEvents = useSelector(state=>state.events)
    const event = allEvents.filter(e=>e._id===eventid)
    // const dateEvent = event[0].dates.filter(d=>d._id===dateid)
    

    console.log('eventid:',eventid)
    console.log('dateid:',dateid)
    console.log('allEvents:',allEvents)
    console.log('event:',event)
    console.log('allUsers:',allUsers)
//    console.log('dateEvent:',dateEvent)


    return(
        <div>
            <div>
                <p>Asistentes al Evento</p>
                
                {event&&
                <div>
                <p>{event[0].title}</p>
                 <p>{event[0].municipio}</p>
                 <p>{event[0].departamento}</p>
                </div>
                }
               
                {event&&
                event.dates.map(d=>
                d._id===dateid?
                <div classname={styles.flex}>
                    <p>{d.dateFormated}</p>
                    <p>{d.start}</p>
                    <p>{d.end}</p>
                </div>
                :'no')}
              
               
            </div>
        </div>
    )
}

export default MyEventsAsistentes;