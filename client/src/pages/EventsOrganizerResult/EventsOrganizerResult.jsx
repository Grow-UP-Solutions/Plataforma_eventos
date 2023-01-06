import React, { useContext, useEffect, useState } from 'react';
import { stateContext } from '../../context/state/stateContext';
import style from './EventsOrganizerResult.module.css';
import { Card } from '../../components';
import Pagination from '../../components/Pagination/Pagination';
import { animateScroll as scroll } from 'react-scroll';
import eventsApi from '../../axios/eventsApi';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components';
import { fechaActual, hora, minutes } from '../../utils/fechaActual';

const EventsOrganizerResult = () => {

  const id = useParams().id;
  const { result } = useContext(stateContext);
  const [local, setLocal] = useState([]);
  const [name, setName] = useState('');
  const [load, setLoad] = useState(true);
  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 8;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentCard = local.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    const getEventsOrganizer = async () => {
      const res = await eventsApi.get('/users/' + result);
      const events = res.data.myEventsCreated.filter((e) => e._id !== id);

      events.map((event) => {
        if (fechaActual) {
          event.dates.map((date) => {
            if (new Date(date.date) < new Date(fechaActual)) {
              if (event.dates.length === 1) {
                date.isOld = true;
                event.isOld = true;
              } else {
                date.isOld = true;
              }
            } else if (date.date === fechaActual) {
              if (date.end.slice(0, 2) <= hora && date.end.slice(3, 5) <= minutes + 2) {
                if (event.dates.length === 1) {
                  date.isOld = true;
                  event.isOld = true;
                } else {
                  event.isOld = true;
                }
              }
            }
          });
        }
      });

      function eliminarObjetosDuplicados(arr, prop) {
        var nuevoArray = [];
        var lookup = {};
    
        for (var i in arr) {
          lookup[arr[i][prop]] = arr[i];
        }
    
        for (i in lookup) {
          nuevoArray.push(lookup[i]);
        }
    
        return nuevoArray;
      }

      // filtrar los eventos actuales por fecha: fechas viejas no mostrar
      const eventsToShow = [];

      for (let i = 0; i < events.length; i++) {
        for (let j = 0; j < events[i].dates.length; j++) {
          if (
            events[i].dates[j].isOld === false &&
            events[i].dates[j].isPublic === true &&
            events[i].dates[j].inRevision === false
          ) {
            eventsToShow.push(events[i]);
          }
        }
      }

      // sacar eventos repetidos
      /* eventsToShow.forEach(function(item) {
        if (!eventsToShow.includes(item)) {
          eventsToShow.push(item);
        }
      }); */

      const respo = eliminarObjetosDuplicados(eventsToShow, '_id');

      setLocal(respo);
      setName(res.data.name);
      setLoad(false);
    };
    getEventsOrganizer();
  }, []);

  if (load) {
    return <Loading />;
  } else {
    return (
      <div className={style.container}>
        <p className={style.title}>Otros eventos de {name}</p>
        <div className={style.containerCard}>
          {currentCard.length ? (
            currentCard.map((event, index) => {
              return (
                <div key={index} className={style.card}>
                  <Card event={event} />
                </div>
              );
            })
          ) : (
            <p className={style.not_event}>No hay eventos ...</p>
          )}
        </div>

        <div className={style.container_pagination}>
          <Pagination ordersPerPage={CardPerPage} state={local.length} paginado={paginado} page={currentPage} />
        </div>
      </div>
    );
  }
};

export default EventsOrganizerResult;
