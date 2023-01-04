import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '..';
import styles from './ExpectToAttendUser.module.css';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';

const ExpectToAttendUser = ({ myEventsBooked }) => {
  const orderByDate = myEventsBooked.sort((a, b) => {
    if (a.dates[0].date < b.dates[0].date) return -1;
    if (b.dates[0].date < a.dates[0].date) return 1;
    return 0;
  });

  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 24;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentCard = orderByDate.slice(indexOfFirstCard, indexOfLastCard);
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
              state={myEventsBooked.length}
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
