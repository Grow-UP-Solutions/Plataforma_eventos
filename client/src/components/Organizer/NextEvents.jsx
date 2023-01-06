import React, { useState } from 'react';
import Card from '../Cards/Card';
import styles from './NextEvents.module.css';
import Pagination from '../../components/Pagination/Pagination';
import { fechaActual, hora, minutes } from '../../utils/fechaActual';

const NextEvent = ({ nextEvent }) => {

  const events = nextEvent.myEventsCreated

  function eliminarObjetosDuplicados(arr, prop) {
    var nuevoArray = [];
    var lookup  = {};

    for (var i in arr) {
      lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
      nuevoArray.push(lookup[i]);
    }

    return nuevoArray;
  }

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




  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 8;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentCard = respo.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  return (
    <div className={styles.container}>
      {currentCard.length > 0 ? (
        <>
          <div
            className={styles.containercard}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${currentCard.length > 3 ? '4' : currentCard.length}, 1fr`,
            }}
          >
            {currentCard.map((event) => (
              <div className={styles.card}>
                <Card event={event} />
              </div>
            ))}
          </div>

          <div className={styles.container_pagination}>
            <Pagination
              billsPerPage={CardPerPage}
              state={respo.length}
              paginado={paginado}
              page={currentPage}
            />
          </div>
        </>
      ) : (
        <p className={styles.notHaveEvents}>No ha organizado próximos eventos...</p>
      )}
    </div>
  );
};

export default NextEvent;
