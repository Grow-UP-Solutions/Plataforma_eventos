import React from 'react';
import { Card } from '..';
import styles from './MyListUser.module.css';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';
import { FaCaretSquareRight } from 'react-icons/fa';

const MyListUser = ({ myFavorites, myEventsBooked }) => {

  const eventos = myFavorites.concat(myEventsBooked)

  const eventosPublicos = eventos.filter(evento=>evento.isPublic === true && evento.inRevision===false)

  const orderByDate = eventosPublicos.sort((a, b) => {
    if (a.dates[0].date < b.dates[0].date) return -1;
    if (b.dates[0].date < a.dates[0].date) return 1;
    return 0;
  });


  const [currentPage, setCurretPage] = useState(1);
  const CardPerPage = 6;
  const indexOfLastCard = currentPage * CardPerPage;
  const indexOfFirstCard = indexOfLastCard - CardPerPage;
  const currentCard = orderByDate.slice(indexOfFirstCard, indexOfLastCard);
  const paginado = (pageNumber) => setCurretPage(pageNumber);

  
  


  
  return (
    <div className={styles.container}>
      <p className={styles.title}>Mi Lista</p>

      <div className={styles.containercard}>
        {currentCard.length > 0 ? (
          currentCard.map((event) => (
            <div className={styles.card}>
              <Card event={event} isFavorite={false} />
            </div>
          ))
        ) : (
          <div className={styles.containerSeeEvents}>
            <hr className={styles.hr}></hr>
            <p className={styles.text}>Aún no tienes eventos en “Mi lista”. ¡Prográmate con “LO QUE QUIERO HACER”!</p>
            <button className={styles.btn}>
              <Link to='/'>Ver eventos</Link>
            </button>
            <hr className={styles.hr}></hr>
          </div>
        )}
      </div>

      <div className={styles.container_pagination}>
        <Pagination billsPerPage={CardPerPage} state={eventosPublicos.length} paginado={paginado} page={currentPage} />
      </div>
    </div>
  );
};

export default MyListUser;



