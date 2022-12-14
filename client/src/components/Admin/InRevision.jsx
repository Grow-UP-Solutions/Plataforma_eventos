import React, { useEffect, useState } from 'react';
import style from './InRevision.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { fechaActual } from '../../utils/fechaActual';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const InRevision = () => {
  
  const navigate = useNavigate();
 
  const [events, setEvents] = useState({});

  const [load, setLoad] = useState(true);

  
  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    
      const userResult = await eventsApi.get(`/events`);
      setEvents(userResult.data);
      setLoad(false)
    
  };

  

  const [currentPage, setCurretPage] = useState(1);
  const eventsPerPage = 25;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const paginado = (pageNumber) => setCurretPage(pageNumber);

 

  const setRevisionDate = async (e, idEvent , idDate) =>{
    e.preventDefault();

    const payload = {
        idEvent: idEvent,
        idDate : idDate
    }

    console.log('p', payload );

    try {
        const { data } = await eventsApi.put('events/inRevision/acceptOrReject', payload);
        console.log({ data });
        setTimeout(function(){
          getEvents();
      }, 500);
      } catch (error) {
        console.log({ error });
      }

  }

  const setRevisionEvent = async (e, idEvent ) =>{
    e.preventDefault();

    const payload = {
        idEvent: idEvent,
    }

    console.log('p', payload );

    try {
        const { data } = await eventsApi.put('events/inRevision/acceptOrReject', payload);
        console.log({ data });
        setTimeout(function(){
          getEvents();
      }, 2000);
      } catch (error) {
        console.log({ error });
      }

  }


 



  if(load){
    return(
      <Loading />
    )
   }else{
    return (
      <div className={style.container}>
        <div className={style.container_titles}>
          <h1>Revision de Eventos</h1>
          <h5>{fechaActual}</h5>
        </div>

        <div className={style.container_table}>
          <div className={style.container_headbody}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th_first}>Nombre del evento</th>
                <th>Fecha del evento</th>
                <th>Organizador</th>
                <th>Estado</th>
                <th>Modificar fecha</th>
                <th>Modificar evento</th>
              </tr>
            </thead>

            <tbody>
              {events !== undefined &&
                events.slice(indexOfFirstEvent, indexOfLastEvent).map((event) =>
                  event.dates.map((date) =>
                    
                      <tr key={event._id} className={style.tbody}>
                        <td className={style.tbody_name}>
                          <img
                            src={event.pictures[0].picture}
                            alt={''}
                            style={{ maxWidth: '20%', borderRadius: '100px' }}
                          />
                          <p>{event.title}</p>
                        </td>
                        <td>{date.date}</td>
                        <td>{event.organizer.name}</td>
                        <td>{date.inRevision === false ? 'ACTIVO' : 'EN REVISION'}</td>
                        <td>
                          {
                             date.inRevision === false ?
                              <button className={style.aRevision} onClick={(e) => setRevisionDate(e, event._id, date._id )}>
                                Agregar fecha a Revision
                              </button>
                             :

                             <button className={style.activar} onClick={(e) => setRevisionDate(e, event._id, date._id )}>
                              Activar
                             </button>
                          }
                        </td>
                        <td>
                          {event.inRevision === false ?
                            <button className={style.aRevision} onClick={(e) => setRevisionEvent(e, event._id )}>
                              Agregar evento a Revision
                            </button>
                            :
                            <button className={style.activar} onClick={(e) => setRevisionEvent(e, event._id )}>
                              Activar Evento'
                            </button>
                          }
                    
                        </td>
                      </tr>
                    
                  )
                )}
            </tbody>
          </div>

         
          {events!== undefined && (
            <div className={style.container_pagination}>
              <Pagination eventsPerPage={eventsPerPage} state={events.length} paginado={paginado} />
            </div>
          )}

          <div className={style.container_exit}>
            <p className={style.exit} onClick={() => navigate('/lista-de-organizadores')}>
              Salir
            </p>
          </div>
        </div>
      </div>
    );
  }

};

export default InRevision;
