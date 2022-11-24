import React, { useState } from 'react';
import Card from '../Cards/Card';
import styles from './NextEvents.module.css';
import Pagination from '../../components/Pagination/Pagination';

const NextEvent = ({ nextEvent }) => {
  console.log('nextEvent:',nextEvent)
  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 8;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentCard = nextEvent.myEventsCreated.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  console.log({ currentCard });

  return (
    <div className={styles.container}>
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
              state={nextEvent.myEventsCreated.length}
              paginado={paginado}
              page={currentPage}
            />
          </div>
        </>
      ) : (
        <p className={styles.notHaveEvents}>No ha organizado próximos eventos ...</p>
      )}
    </div>
  );
};

export default NextEvent;
