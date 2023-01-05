import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '..';
import styles from './ExpectToAttendUser.module.css';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';
import { fechaActual, hora, minutes } from '../../utils/fechaActual';

const ExpectToAttendUser = ({ myEventsBooked }) => {

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

  const orderByDate = myEventsBooked.sort((a, b) => {
    if (a.dates[0].date < b.dates[0].date) return -1;
    if (b.dates[0].date < a.dates[0].date) return 1;
    return 0;
  });

  orderByDate.map((event) => {
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

  const eventosPublicos = orderByDate.filter((evento) => evento.isOld === false && evento.isPublic === true && evento.inRevision === false);

  const respo = eliminarObjetosDuplicados(eventosPublicos, '_id');

  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 24;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentCard = respo.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Pendientes por asistir</p>

      {currentCard.length > 0 ? (
        <>
          <div className={styles.containercard}>
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
        <>
          <div className={styles.containerSeeEvents}>
            <hr className={styles.hr}></hr>
            <p className={styles.text}>
              Aún no tienes eventos en “Pendientes por Asistir”. ¡Alistate a un evento con “LO QUE QUIERO HACER”!
            </p>
            <button className={styles.btn}>
              <Link to='/'>Ver eventos</Link>
            </button>
            <hr className={styles.hr}></hr>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpectToAttendUser;
