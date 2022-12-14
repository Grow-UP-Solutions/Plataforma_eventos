import React, { useEffect, useState } from 'react';
import style from './InRevision.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { animateScroll as scroll } from 'react-scroll';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { fechaActual, hora, minutes } from '../../utils/fechaActual';

const InRevision = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState({});

  const [load, setLoad] = useState(true);

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const getEvents = async () => {
    const userResult = await eventsApi.get(`/events`);

    const eventos = userResult.data;

    if (fechaActual && eventos !== undefined) {
      eventos.map((evento) => {
        evento.dates.map((date) => {
          if (new Date(date.date) < new Date(fechaActual)) {
            if (evento.dates.length === 1) {
              date.isOld = true;
              evento.isOld = true;
            } else {
              date.isOld = true;
            }
          } else if (date.date === fechaActual) {
            if (date.end.slice(0, 2) <= hora && date.end.slice(3, 5) <= minutes + 2) {
              if (evento.dates.length === 1) {
                date.isOld = true;
                evento.isOld = true;
              } else {
                date.isOld = true;
              }
            }
          }
        });
      });
    }

    const eventsNotOld = eventos.filter((e) => e.isOld === false);

    setEvents(eventsNotOld);
    setLoad(false);
  };

  const [currentPage, setCurretPage] = useState(1);
  const eventsPerPage = 25;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  const setRevisionDate = async (e, idEvent, idDate) => {
    e.preventDefault();

    const payload = {
      idEvent: idEvent,
      idDate: idDate,
    };

    try {
      const { data } = await eventsApi.put('events/inRevision/acceptOrReject', payload);
      setTimeout(function() {
        getEvents();
      }, 500);
    } catch (error) {
      console.log({ error });
    }
  };

  const setRevisionEvent = async (e, idEvent) => {
    e.preventDefault();

    const payload = {
      idEvent: idEvent,
    };

    try {
      const { data } = await eventsApi.put('events/inRevision/acceptOrReject', payload);
      setTimeout(function() {
        getEvents();
      }, 2000);
    } catch (error) {
      console.log({ error });
    }
  };

  if (load) {
    return <Loading />;
  } else {
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
                    date.isOld === false ? (
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
                          {date.inRevision === false ? (
                            <button
                              className={style.aRevision}
                              onClick={(e) => setRevisionDate(e, event._id, date._id)}
                            >
                              Agregar fecha a Revision
                            </button>
                          ) : (
                            <button className={style.activar} onClick={(e) => setRevisionDate(e, event._id, date._id)}>
                              Activar
                            </button>
                          )}
                        </td>
                        <td>
                          {event.inRevision === false ? (
                            <button className={style.aRevision} onClick={(e) => setRevisionEvent(e, event._id)}>
                              Agregar evento a Revision
                            </button>
                          ) : (
                            <button className={style.activar} onClick={(e) => setRevisionEvent(e, event._id)}>
                              Activar Evento'
                            </button>
                          )}
                        </td>
                      </tr>
                    ) : (
                      ''
                    )
                  )
                )}
            </tbody>
          </div>

          {events !== undefined && (
            <div className={style.container_pagination}>
              <Pagination ordersPerPage={eventsPerPage} state={events.length} paginado={paginado} />
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
